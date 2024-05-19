import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh space-y-2 text-center">
      <p className="text-5xl font-bold">Make attendance easy</p>
      <Link href={"/dashboard"}>
        <Button size={"sm"}>Go to dashboard</Button>
      </Link>
    </div>
  );
}
