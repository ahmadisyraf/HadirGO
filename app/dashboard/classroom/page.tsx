"use client";

import { Check, Copy, LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import useSWR from "swr";
import { useCookies } from "next-client-cookies";
import JoinClassroom from "./JoinClassroom";
import CreateClassroom from "./CreateClassroom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Classroom() {
  const cookies = useCookies();
  const userid = cookies.get("userid");
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    userid ? `/api/participant/${userid}` : null,
    fetcher
  );

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
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Classroom</h1>
      </div>
      <div className="flex flex-row-reverse items-center space-x-3 w-full">
        <div className="ml-2">
          <CreateClassroom />
        </div>
        <div>
          <JoinClassroom />
        </div>
      </div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          {data?.map((d: any, index: number) => (
            <div key={index}>
              <Link href={`/dashboard/classroom/${d.classroom.id}`}>
                <Card className="p-5 text-left space-y-3 w-full">
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">
                      {d.classroom.classname}
                    </p>
                    <p className="font-medium">{d.classroom.subject}</p>
                    <p className="text-sm">Section {d.classroom.section}</p>
                  </div>
                  <div className="border border-dashed rounded-lg p-3 relative flex flex-row items-center justify-between">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="absolute top-2 right-2 h-[30px] w-[30px]"
                      onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(d.classroom.classcode);
                        setCopied(d.classroom.classcode);
                      }}
                    >
                      {d.classroom.classcode == copied ? (
                        <Check size={15} />
                      ) : (
                        <Copy size={15} />
                      )}
                    </Button>
                    <div>
                      <p className="font-medium text-sm">Share this code:</p>
                      <p className="font-semibold text-lg">
                        {d.classroom.classcode}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no classroom
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start manage your attendance once you create or join
              classroom
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
