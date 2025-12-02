"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BaseChart } from "./base-chart";
import type { ComparisonData } from "@/types";

interface ComparisonBarChartProps {
  title: string;
  data: ComparisonData[];
}

export function ComparisonBarChart({ title, data }: ComparisonBarChartProps) {
  return (
    <BaseChart title={title}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            domain={[0, 5]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="institutionName"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={150}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
}

