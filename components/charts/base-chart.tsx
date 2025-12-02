"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BaseChartProps {
  title: string;
  children: React.ReactNode;
}

export function BaseChart({ title, children }: BaseChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

