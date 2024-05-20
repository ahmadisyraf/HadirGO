import { cookies } from "next/headers";
import HistoryScreen from "./HistoryScreen/page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getHistory(userId: string | undefined) {
  const response = await fetch(
    `${baseUrl}/api/attendance/all-class/${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Something wrong");
  }

  return response.json();
}

export default async function History() {
  const userId = cookies().get("userId")?.value;
  const history = await getHistory(userId);

  return <HistoryScreen history={history} />;
}
