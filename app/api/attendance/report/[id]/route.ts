import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getMonthName(monthNumber: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNumber - 1];
}

interface Params {
  params: { id: string };
}

interface AttendanceRecord {
  createdAt: Date;
  userId: string;
}

interface MonthlyAttendance {
  month: string;
  year: number;
  attend: number;
  absent: number;
}

export async function GET(request: NextRequest, { params }: Params) {
  const classroomId = params.id;

  try {
    // Fetch all attendance records for the classroom
    const attendanceRecords: AttendanceRecord[] = await prisma.attendance.findMany({
      where: {
        classroomId: classroomId,
      },
    });

    // Fetch the total number of participants in the class
    const totalParticipants = await prisma.participant.count({
      where: {
        classroomId: classroomId,
      },
    });

    // Group by month and year
    const monthlyCount = attendanceRecords.reduce(
      (acc: { [key: string]: { month: string; year: number; attend: number; userSet: Set<string> } }, record) => {
        const date = new Date(record.createdAt);
        const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = { month: getMonthName(month), year, attend: 0, userSet: new Set<string>() };
        }

        // Count unique users who attended
        if (!acc[key].userSet.has(record.userId)) {
          acc[key].userSet.add(record.userId);
          acc[key].attend += 1;
        }

        return acc;
      },
      {}
    );

    // Convert the grouped result into an array
    const formattedMonthlyCount: MonthlyAttendance[] = Object.values(monthlyCount).map(({ month, year, attend, userSet }) => ({
      month,
      year,
      attend,
      absent: totalParticipants - attend,
    }));

    return NextResponse.json(formattedMonthlyCount, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
