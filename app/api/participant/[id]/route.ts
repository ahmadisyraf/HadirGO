import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { classcode } = await request.json();

  if (!id) {
    return NextResponse.json("User id required", { status: 401 });
  }

  if (!classcode) {
    return NextResponse.json("Classroom id required", { status: 401 });
  }

  try {
    const getParticipant = await prisma.participant.findFirst({
      where: {
        userId: id,
        classroom: {
          classcode: classcode,
        },
      },
    });

    if (getParticipant) {
      return NextResponse.json("Already join the class", {
        status: 404,
        statusText: "Already join the class",
      });
    }

    const getClass = await prisma.classroom.findFirst({
      where: {
        classcode: classcode,
      },
    });

    if (!getClass) {
      return NextResponse.json("Classroom not exist", {
        status: 404,
        statusText: "Classroom not exist",
      });
    }

    const classid = getClass?.id;

    const postParticpant = await prisma.participant.create({
      data: {
        classroom: {
          connect: {
            id: classid,
          },
        },
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json(postParticpant, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json("User id required", { status: 401 });
  }

  try {
    const getClassrooms = await prisma.participant.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        classroom: {
          include: {
            user: true,
            Attendance: true,
          },
        },
      },
    });

    return NextResponse.json(getClassrooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const classroomId = params.id;
  const { userId, deleteUserId } = await request.json();

  if (!userId || !deleteUserId) {
    return NextResponse.json({ error: "User id required" }, { status: 401 });
  }

  if (!classroomId) {
    return NextResponse.json(
      { error: "Classroom id required" },
      { status: 401 }
    );
  }

  try {
    const isOwner = await prisma.classroom.findFirst({
      where: {
        id: classroomId,
        userId,
      },
    });

    if (!isOwner) {
      return NextResponse.json("Only instructor can kick student", {
        status: 400,
        statusText: "Only instructor can kick student",
      });
    }
    const deleteUser = await prisma.participant.deleteMany({
      where: {
        userId: deleteUserId,
        classroomId,
      },
    });

    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
