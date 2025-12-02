"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/ui/kpi-card";
import { HistoricalLineChart } from "@/components/charts/line-chart";
import { ComparisonBarChart } from "@/components/charts/bar-chart";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import type { KPIData, HistoricalData, ComparisonData } from "@/types";

const mockKPIs: KPIData[] = [
  {
    label: "Média Geral ENADE",
    value: "3.45",
    variation: 2.3,
    trend: "up",
  },
  {
    label: "Total de Cursos Avaliados",
    value: "24",
    variation: 4.3,
    trend: "up",
  },
  {
    label: "Cursos Acima da Média Nacional",
    value: "15",
    variation: 7.1,
    trend: "up",
  },
  {
    label: "Taxa de Participação",
    value: "87.5%",
    variation: -2.1,
    trend: "down",
  },
];

const mockHistoricalData: HistoricalData[] = [
  { year: 2014, value: 3.2 },
  { year: 2017, value: 3.4 },
  { year: 2020, value: 3.3 },
  { year: 2023, value: 3.45 },
];

const mockTopCourses: ComparisonData[] = [
  { institutionName: "Medicina", score: 4.5, year: 2023 },
  { institutionName: "Direito", score: 4.2, year: 2023 },
  { institutionName: "Ciência da Computação", score: 3.9, year: 2023 },
  { institutionName: "Administração", score: 3.8, year: 2023 },
  { institutionName: "Engenharia Civil", score: 3.5, year: 2023 },
];

const mockAlerts = [
  {
    id: "1",
    course: "Engenharia Civil",
    courseId: "2",
    type: "Queda de desempenho",
    description: "Redução de 2.1% em relação ao ciclo anterior",
    severity: "high" as const,
  },
  {
    id: "2",
    course: "Psicologia",
    courseId: "5",
    type: "Abaixo da média nacional",
    description: "0.8 pontos abaixo da média nacional",
    severity: "medium" as const,
  },
  {
    id: "3",
    course: "Administração",
    courseId: "1",
    type: "Taxa de ausência elevada",
    description: "28% de ausência no último ENADE",
    severity: "low" as const,
  },
];

const mockCoursesByArea = [
  { area: "Ciências da Saúde", count: 8, avgScore: 4.1 },
  { area: "Engenharias", count: 6, avgScore: 3.6 },
  { area: "Ciências Sociais", count: 5, avgScore: 3.8 },
  { area: "Tecnologia", count: 3, avgScore: 3.7 },
  { area: "Educação", count: 2, avgScore: 3.4 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Visão geral do desempenho institucional no ENADE
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} data={kpi} />
        ))}
      </div>

      {/* Gráficos Principais */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HistoricalLineChart title="Evolução Histórica da Média ENADE" data={mockHistoricalData} />
        <ComparisonBarChart title="Top 5 Cursos por Nota ENADE" data={mockTopCourses} />
      </div>

      {/* Desempenho por Área */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desempenho por Área de Conhecimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCoursesByArea.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{item.area}</h3>
                  <p className="text-sm text-muted-foreground">{item.count} cursos avaliados</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{item.avgScore.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Média</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas Recentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Alertas Recentes</CardTitle>
          <Link href="/alerts" className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <Link
                key={alert.id}
                href={`/courses/${alert.courseId}`}
                className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-secondary"
              >
                <AlertTriangle
                  className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                    alert.severity === "high"
                      ? "text-red-500"
                      : alert.severity === "medium"
                      ? "text-yellow-500"
                      : "text-blue-500"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{alert.course}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        alert.severity === "high"
                          ? "bg-red-500/10 text-red-500"
                          : alert.severity === "medium"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {alert.severity === "high"
                        ? "Alta"
                        : alert.severity === "medium"
                        ? "Média"
                        : "Baixa"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{alert.type}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cursos em Crescimento</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cursos em Declínio</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <AlertTriangle className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Requer Atenção</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
