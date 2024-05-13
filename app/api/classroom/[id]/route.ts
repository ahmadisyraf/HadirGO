import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json("Classroom id required", { status: 401 });
  }
  try {
    const fetchClassrooms = await prisma.classroom.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json(fetchClassrooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const classroomId = params.id;

  if (!classroomId) {
    return NextResponse.json("Class id required", { status: 401 });
  }

  try {
    const deleteAttendance = await prisma.attendance.deleteMany({
      where: {
        classroomId,
      },
    });
    
    const deleteParticipant = await prisma.participant.deleteMany({
      where: {
        classroomId,
      },
    });

    const deleteClassroom = await prisma.classroom.delete({
      where: {
        id: classroomId,
      },
    });

    return NextResponse.json(deleteClassroom, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 500 });
  }
}
