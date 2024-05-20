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
import { DeleteParticipant } from "./DeleteParticipant";
import ShareQrCode from "./ShareQrCode";

export default function ParticipantScreen({ participants }: any) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          {participants[0]?.classroom.classname}
        </h1>
      </div>
      <div className="flex flex-row-reverse">
        <DeleteClassroom classroomId={participants[0]?.classroom.id} />
        <ShareQrCode classcode={participants[0]?.classroom.classcode} />
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="">Join Date</TableHead>
              <TableHead></TableHead>
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
                <TableCell>
                  <DeleteParticipant
                    classroomId={d.classroom.id}
                    deleteUserId={d.user.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}
