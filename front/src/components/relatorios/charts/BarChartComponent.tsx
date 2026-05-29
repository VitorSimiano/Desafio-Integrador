"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export function BarChartComponent({
  data,
}: Props) {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="nome" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}