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
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/classroom/${params.id}`,
    fetcher
  );
  const router = useRouter();
  const cookies = useCookies();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAttendance = async () => {
    setLoading(true);
    await fetch("/api/attendance", {
      method: "POST",
      body: JSON.stringify({
        classroomId: params.id,
        userId: cookies.get("userid"),
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Your attendance has been recorded 🎉",
            description: "Thank you for attending the class!!",
          });
        } else {
          toast({
            title: `${res.statusText} ⛔️`,
            description: "Please try again or contact classroom owner",
          });
        }
        router.push("/dashboard/classroom");
      })
      .catch((error) => {
        toast({
          title: "Opps! something wrong ⛔️",
          description: "Please contact our support",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center h-dvh w-full">
        <div className="text-center flex flex-col items-center justify-center">
          <LoaderCircle size={30} className="animate-spin" />
          <p>Fetching data, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 md:px-20 h-dvh flex flex-row items-center justify-center shadow">
      <Card className="p-5 max-w-md">
        <p className="text-lg font-semibold">Attend {data.classname}?</p>
        <p className="text-md text-gray-500">
          Please click proceed to fill in attendance of your class
        </p>
        {/* <p>{params.id}</p> */}
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
          <Button variant={"outline"} size={"sm"} className="mr-2">
            Go back
          </Button>
        </div>
      </Card>
    </div>
  );
}
