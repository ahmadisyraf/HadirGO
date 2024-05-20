import { UserProfile } from "@clerk/nextjs";

export default function Profile() {
  return (
    <div className="flex flex-row items-center justify-center h-dvh">
      <UserProfile />
    </div>
  );
}
