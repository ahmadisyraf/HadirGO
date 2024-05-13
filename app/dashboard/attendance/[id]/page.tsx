"use client";

import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareQrCode from "./ShareQrCode";

export default function Classroom({ params }: { params: { id: string } }) {
  const classid = params.id;
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `/api/attendance/${classid}`,
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

  if (data && data.length <= 0) {
    return (
      <div className="flex flex-row items-center justify-center h-dvh w-full">
        <p className="text-lg font-semibold">No attendance found</p>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {data[0].classroom.classname} Attendance
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <ShareQrCode classid={classid} />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">Attend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {d.user.firstname} {d.user.lastname}
                </TableCell>
                <TableCell className="font-medium">{d.user.email}</TableCell>
                <TableCell className="font-medium">{d.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
