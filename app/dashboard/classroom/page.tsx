"use client";

import { Button } from "@/components/ui/button";
import { Copy, LoaderCircle, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import { useCookies } from "next-client-cookies";
import JoinClassroom from "./join-classroom";
import CreateClassroom from "./create-classroom";

export default function Classroom() {
  const cookies = useCookies();
  const userid = cookies.get("userid");
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
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
          <CreateClassroom />
          <JoinClassroom />
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          {data?.map((d: any, index: number) => (
            <div key={index}>
              <Card className="p-5 text-left space-y-3 w-full">
                <div className="space-y-1">
                  <p className="font-semibold text-lg">
                    {d.classroom.classname}
                  </p>
                  <p className="font-medium">{d.classroom.subject}</p>
                  <p className="text-sm">Section {d.classroom.section}</p>
                </div>
                <div className="border border-dashed rounded-lg p-3 relative flex flex-row items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Class code:</p>
                    <p className="font-semibold text-lg">
                      {d.classroom.classcode}
                    </p>
                  </div>
                </div>
              </Card>
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
