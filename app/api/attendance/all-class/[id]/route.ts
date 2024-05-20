import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json("User id required", { status: 401 });
  }

  try {
    const fetchAttendance = await prisma.attendance.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        classroom: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(fetchAttendance, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 500 });
  }
}
