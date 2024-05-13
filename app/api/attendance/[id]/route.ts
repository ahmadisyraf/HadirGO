import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const classroomId = params.id;

  if (!classroomId) {
    return NextResponse.json("Class id required", { status: 401 });
  }

  try {
    const fetchAttendance = await prisma.attendance.findMany({
      where: {
        classroomId,
      },
      include: {
        user: true,
        classroom: true,
      },
    });

    return NextResponse.json(fetchAttendance, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 500 });
  }
}
