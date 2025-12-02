"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { BaseChart } from "./base-chart";
import type { CompetencyRadarData } from "@/types";

interface CompetencyRadarChartProps {
  title: string;
  data: CompetencyRadarData[];
}

export function CompetencyRadarChart({ title, data }: CompetencyRadarChartProps) {
  return (
    <BaseChart title={title}>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="competency"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Radar
            name="Nota"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
}

