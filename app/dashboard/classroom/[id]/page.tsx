import ParticipantScreen from "./ParticipantScreen";

export const revalidate = 0;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getParticipant(classId: string) {
  const response = await fetch(
    `${baseUrl}/api/participant/all-participant/${classId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Something wrong");
  }

  return response.json();
}

export default async function Participant({
  params,
}: {
  params: { id: string };
}) {
  const classId = params.id;
  const participants = await getParticipant(classId);

  return <ParticipantScreen participants={participants} />;
}
