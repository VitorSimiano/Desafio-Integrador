"use client";

import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any[];
}

export function LineChartComponent({
  data,
}: Props) {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="cliente" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="mediaDias"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}