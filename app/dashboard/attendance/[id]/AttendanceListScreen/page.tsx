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
import ShareQrCode from "../ShareQrCode";
import ReportDialog from "../ReportDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AttendanceListScren({ attendance, classId }: any) {
  if (attendance && attendance.length <= 0) {
    return (
      <div className="flex flex-row items-center justify-center h-dvh w-full">
        <p className="text-lg font-semibold">No attendance found</p>
      </div>
    );
  }

  console.log(attendance);

  return (
    <main className="flex flex-col p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {attendance[0].classroom.classname} Attendance
        </h1>
      </div>
      <div className="flex flex-row-reverse space-x-2">
        {/* <ReportDialog classroomId={classId} /> */}
        <Link href={`/dashboard/analytic/${attendance[0].classroom.id}`}>
          <Button size={"sm"} variant={"outline"} className="ml-2">
            See analytics
          </Button>
        </Link>
        <ShareQrCode classid={classId} />
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
