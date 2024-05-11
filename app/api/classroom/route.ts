import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { subject, section, classname, userid } = await request.json();

  if (!subject || !section || !classname) {
    return NextResponse.json("All field required", { status: 401 });
  }

  if (!userid) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const postClassroom = await prisma.classroom.create({
      data: {
        subject,
        section,
        classname,
        classcode: nanoid(),
        user: {
          connect: {
            id: userid,
          },
        },
      },
    });

    const addAsParticipant = await prisma.participant.create({
      data: {
        user: {
          connect: {
            id: userid,
          },
        },
        classroom: {
          connect: {
            id: postClassroom.id,
          },
        },
      },
    });

    return NextResponse.json(postClassroom, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
