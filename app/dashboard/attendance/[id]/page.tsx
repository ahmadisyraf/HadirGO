import AttendanceListScren from "./AttendanceListScreen/page";

export const revalidate = 0;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getAttendance(classId: string | undefined) {
  const response = await fetch(`${baseUrl}/api/attendance/${classId}`);

  if (!response.ok) {
    throw new Error("Something wrong");
  }

  return response.json();
}

export default async function Classroom({
  params,
}: {
  params: { id: string };
}) {
  const classId = params.id;

  const attendance = await getAttendance(classId);

  return <AttendanceListScren attendance={attendance} classId={classId} />;
}
