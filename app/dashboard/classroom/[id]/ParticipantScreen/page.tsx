"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import DeleteClassroom from "./DeleteClassroom";

export default function ParticipantScreen({ participants }: any) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {participants[0].classroom.classname}
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <DeleteClassroom classroomId={participants[0].classroom.id} />
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead className="w-[100px]">Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((d: any, index: number) => (
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
