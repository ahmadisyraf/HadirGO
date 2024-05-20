import { cookies } from "next/headers";
import ClassroomScreen from "./ClassroomScreen";

export const revalidate = 0;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getClassrooms(userId: string | undefined) {

  const response = await fetch(`${baseUrl}/api/participant/${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Something wrong");
  }

  return response.json();
}

export default async function Classroom() {
  const userId = cookies().get("userId")?.value;

  const classrooms = await getClassrooms(userId);

  return <ClassroomScreen classrooms={classrooms} />;
}
