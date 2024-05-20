import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const classroomId = params.id;

  if (!classroomId) {
    return NextResponse.json("Classroom id required", { status: 401 });
  }

  try {
    const countUser = await prisma.participant.count({
      where: {
        classroomId,
      },
    });

    return NextResponse.json(countUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
