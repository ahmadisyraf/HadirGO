"use client";

import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
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

export default function Classroom() {
  const cookies = useCookies();
  const userid = cookies.get("userid");
  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/participant/${userid}`,
    fetcher
  );

  console.log(data);
  if (isLoading) {
    return <p>Loadng...</p>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Classroom</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Classroom</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"}>
              <Plus size={18} className="mr-1" />
              New classroom
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/classroom/join-classroom")}
            >
              Join class
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                router.push("/dashboard/classroom/create-classroom")
              }
            >
              Create class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <div
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
      </div> */}
      <div
        className="flex rounded-lg border border-dashed shadow-sm p-5 md:p-10"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
          {data?.map((d: any, index: number) => (
            <Card className="p-5 text-left space-y-3 w-full" key={index}>
              <div className="space-y-1">
                <p className="font-semibold text-lg">{d.classroom.classname}</p>
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

                <Button size={"icon"} variant={"outline"}>
                  <Copy size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
