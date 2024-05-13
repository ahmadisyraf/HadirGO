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
import ShareQrCode from "../ShareQrCode";

export default function AttendanceListScren({ attendance }: any) {
  if (attendance && attendance.length <= 0) {
    return (
      <div className="flex flex-row items-center justify-center h-dvh w-full">
        <p className="text-lg font-semibold">No attendance found</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {attendance[0].classroom.classname} Attendance
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <ShareQrCode classid={attendance.classroomId} />
      </div>

      <Card className="w-full relative mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">Attend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((d: any, index: number) => (
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
