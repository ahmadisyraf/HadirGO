import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useSWR from "swr";

const COLORS = ["#0088FE", "#FF8042"];

export default function ReportDialog({ classroomId }: { classroomId: string }) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `/api/attendance/report/${classroomId}`,
    fetcher
  );

  const isLoading = !data && !error;

  const pieChartData = data?.flatMap((item: any) => [
    { name: `${item.month} - Attend`, value: item.attend },
    { name: `${item.month} - Absent`, value: item.absent },
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          Show Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>This month attendance report</DialogTitle>
          <DialogDescription>
            This report shows the attendance statistics.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[500px]">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
