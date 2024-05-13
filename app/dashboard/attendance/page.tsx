"use client";
import useSWR from "swr";
import { useCookies } from "next-client-cookies";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function Attendance() {
  const cookies = useCookies();
  const userid = cookies.get("userid");

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
        <h1 className="text-lg font-semibold md:text-2xl">Attendance</h1>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          {data?.map((d: any, index: number) => (
            <div key={index}>
              <Link href={`/dashboard/attendance/${d.classroom.id}`}>
                <Card className="p-5 text-left space-y-3 w-full">
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">
                      {d.classroom.classname}
                    </p>
                    <p className="font-medium">{d.classroom.subject}</p>
                    <p className="text-sm">Section {d.classroom.section}</p>
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
