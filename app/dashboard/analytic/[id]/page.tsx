"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useSWR from "swr";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Analytic({ params }: { params: { id: string } }) {
  const classroomId = params.id;
  const { data, error } = useSWR(
    `/api/attendance/report/${classroomId}`,
    fetcher
  );

  const { data: totalUser } = useSWR(
    `/api/participant/report/${classroomId}`,
    fetcher
  );

  const printRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const element = printRef.current;
    if (!element) return; // Ensure the element is not null
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("analytics.pdf");
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>
        <p className="text-2xl font-semibold">Analytics</p>
      </div>
      <Card className="p-3 space-y-2">
        <p className="text-sm font-semibold">Total students</p>
        {/* Assuming totalStudents is available in your data */}
        <p className="text-4xl font-semibold">{totalUser}</p>
      </Card>
      <Card className="p-3" ref={printRef}>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar dataKey="attend" fill="#8884d8" />
            <Bar dataKey="absent" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Button onClick={generatePDF}>Generate PDF</Button>
    </main>
  );
}
