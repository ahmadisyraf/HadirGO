import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { classroomId, userId } = await request.json();

  if (!classroomId || !userId) {
    return NextResponse.json("All field required", { status: 401 });
  }

  try {
    const isParticipant = await prisma.participant.findFirst({
      where: {
        userId,
        classroomId,
      },
    });

    if (!isParticipant) {
      return NextResponse.json("Non participant", {
        status: 404,
        statusText: "Sorry, participant only can fill the attendance",
      });
    }

    const currentDate = new Date();
    const formattedDate = new Date(currentDate.toDateString()); // Extract only the date part

    const alreadyAttend = await prisma.attendance.findFirst({
      where: {
        AND: {
          userId,
          classroomId,
          createdAt: {
            gte: formattedDate,
            lt: new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      },
    });

    if (alreadyAttend) {
      return NextResponse.json("You already attend the class", {
        status: 401,
        statusText: "You already attend the class",
      });
    }

    const postAttendance = await prisma.attendance.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        classroom: {
          connect: {
            id: classroomId,
          },
        },
      },
    });

    return NextResponse.json(postAttendance, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 500 });
  }
}
