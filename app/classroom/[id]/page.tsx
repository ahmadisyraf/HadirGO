"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCookies } from "next-client-cookies";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import useSWR from "swr";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Attendance({ params }: { params: { id: string } }) {
  const classcode = params.id;
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const router = useRouter();
  const cookies = useCookies();
  const userId = cookies.get("userId");

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAttendance = async () => {
    setLoading(true);
    await fetch(`/api/participant/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        classcode,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          toast({
            title: "Successfuly join classroom 🎉",
            description: "Continue to fill in attendance.",
          });
        } else {
          toast({
            title: `${res.statusText} ⛔️`,
            description: "We unable to join you to classroom",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Oops! something wrong ⛔️",
          description: error,
        });
      })
      .finally(() => {
        setLoading(false);
        router.push("/dashboard");
      });
  };

  return (
    <div className="px-5 md:px-20 h-dvh flex flex-row items-center justify-center shadow">
      <Card className="p-5 max-w-md">
        <p className="text-lg font-semibold">Join classroom?</p>
        <p className="text-sm text-gray-500">
          Please click proceed to join classroom.
        </p>
        <div className="flex flex-row-reverse items-center mt-5">
          <Button
            variant={"default"}
            size={"sm"}
            onClick={handleAttendance}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={18} className="mr-2 animate-spin" /> Saving
              </>
            ) : (
              "Proceed"
            )}
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className="mr-2"
            onClick={() => router.push("/dashboard")}
          >
            Go back
          </Button>
        </div>
      </Card>
    </div>
  );
}
