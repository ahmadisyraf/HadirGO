import ParticipantScreen from "./ParticipantScreen/page";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const revalidate = 0;

async function getParticipant(classId: string) {
  const response = await fetch(
    `${baseUrl}/api/participant/all-participant/${classId}`
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

  return <ParticipantScreen participants={participants} />
}
