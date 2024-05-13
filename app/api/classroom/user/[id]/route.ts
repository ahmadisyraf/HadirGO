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
    const fetchClassrooms = await prisma.classroom.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(fetchClassrooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
