import { type NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface EmailAddresses {
  emailAddress: string;
}

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: EmailAddresses[];
  hasImage: boolean;
  imageUrl: string | null;
}

export async function GET(request: NextRequest) {
  const user: User | null = await currentUser();
  const cookieStore = cookies();

  if (!user) {
    return new NextResponse(null, { status: 200 });
  }

  const userObject = {
    clerkid: user?.id,
    firstname: user?.firstName,
    lastname: user?.lastName,
    email: user?.emailAddresses?.[0].emailAddress,
    image: user?.hasImage ? user.imageUrl : null,
  };

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: userObject.email,
      },
    });

    if (findUser) {
      cookieStore.set("userId", findUser.id);
      return NextResponse.json(findUser, { status: 200 });
    }

    const createUser = await prisma.user.create({
      data: {
        clerkid: userObject.clerkid,
        firstname: userObject.firstname,
        lastname: userObject.lastname,
        email: userObject.email,
        image: userObject.image,
      },
    });

    cookieStore.set("userId", createUser.id);

    return NextResponse.json(createUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
