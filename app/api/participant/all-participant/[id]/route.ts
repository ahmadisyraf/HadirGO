import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const classid = params.id;

  if (!classid) {
    return NextResponse.json("Class id required", { status: 401 });
  }

  try {
    const findClassParticipant = await prisma.participant.findMany({
      where: {
        classroomId: classid,
      },
      include: {
        classroom: true,
        user: true,
      },
    });

    return NextResponse.json(findClassParticipant, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 500 });
  }
}
