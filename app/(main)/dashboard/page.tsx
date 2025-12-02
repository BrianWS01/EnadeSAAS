"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/ui/kpi-card";
import { HistoricalLineChart } from "@/components/charts/line-chart";
import { AlertTriangle, TrendingUp, GraduationCap, BarChart3 } from "lucide-react";
import type { KPIData, HistoricalData } from "@/types";

const mockKPIs: KPIData[] = [
  {
    label: "Média Geral ENADE",
    value: "3.45",
    variation: 2.3,
    trend: "up",
  },
  {
    label: "Total de Cursos",
    value: "24",
    variation: 0,
    trend: "stable",
  },
  {
    label: "Alertas Ativos",
    value: "5",
    variation: -16.7,
    trend: "down",
  },
  {
    label: "Cursos Acima da Média",
    value: "15",
    variation: 7.1,
    trend: "up",
  },
];

const mockHistoricalData: HistoricalData[] = [
  { year: 2014, value: 3.2 },
  { year: 2017, value: 3.4 },
  { year: 2020, value: 3.3 },
  { year: 2023, value: 3.45 },
];

const mockCourses = [
  { id: "1", name: "Administração", note: 3.8, variation: 5.6, trend: "up" as const },
  { id: "2", name: "Engenharia Civil", note: 3.5, variation: -2.1, trend: "down" as const },
  { id: "3", name: "Direito", note: 4.2, variation: 8.3, trend: "up" as const },
  { id: "4", name: "Medicina", note: 4.5, variation: 1.2, trend: "up" as const },
  { id: "5", name: "Psicologia", note: 3.1, variation: -5.8, trend: "down" as const },
];

const mockAlerts = [
  {
    id: "1",
    course: "Engenharia Civil",
    type: "Queda de desempenho",
    severity: "high" as const,
  },
  {
    id: "2",
    course: "Psicologia",
    type: "Abaixo da média nacional",
    severity: "medium" as const,
  },
  {
    id: "3",
    course: "Administração",
    type: "Alta taxa de ausência",
    severity: "low" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Visão geral do desempenho institucional no ENADE
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} data={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <HistoricalLineChart title="Evolução Histórica da Média ENADE" data={mockHistoricalData} />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alertas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-secondary"
                >
                  <AlertTriangle
                    className={`mt-0.5 h-5 w-5 ${
                      alert.severity === "high"
                        ? "text-red-500"
                        : alert.severity === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{alert.course}</p>
                    <p className="text-sm text-muted-foreground">{alert.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ranking de Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCourses.map((course, index) => (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-secondary"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted-foreground">Nota: {course.note}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`flex items-center gap-1 ${
                      course.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <TrendingUp
                      className={`h-4 w-4 ${course.trend === "down" ? "rotate-180" : ""}`}
                    />
                    <span className="text-sm font-medium">
                      {course.variation > 0 ? "+" : ""}
                      {course.variation.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

