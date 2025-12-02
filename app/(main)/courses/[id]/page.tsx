"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/ui/kpi-card";
import { HistoricalLineChart } from "@/components/charts/line-chart";
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import type { KPIData, HistoricalData } from "@/types";

const mockKPIs: KPIData[] = [
  {
    label: "Nota Geral 2023",
    value: "3.8",
    variation: 5.6,
    trend: "up",
  },
  {
    label: "Formação Geral",
    value: "3.5",
    variation: 2.9,
    trend: "up",
  },
  {
    label: "Conhecimento Específico",
    value: "4.1",
    variation: 7.8,
    trend: "up",
  },
  {
    label: "IDD",
    value: "3.6",
    variation: -1.2,
    trend: "down",
  },
];

const mockHistoricalData: HistoricalData[] = [
  { year: 2014, value: 3.2 },
  { year: 2017, value: 3.4 },
  { year: 2020, value: 3.6 },
  { year: 2023, value: 3.8 },
];

const mockAlerts = [
  {
    id: "1",
    type: "Crescimento acima da média",
    description: "O curso apresentou crescimento de 5.6% no último ciclo",
    severity: "low" as const,
  },
];

const mockDiagnostic = `Análise do curso Administração:

Nota Geral (2023): 3.80
Variação em relação ao ciclo anterior: +5.6%

Tendência histórica: Crescente

Comparação com média nacional: +0.23 pontos

Recomendações:
- Manter as estratégias pedagógicas atuais
- Investir em melhorias contínuas na formação geral
- Monitorar o IDD para evitar quedas futuras`;

export default function CourseDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/courses">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Administração</h1>
            <p className="mt-1 text-muted-foreground">Ciências Sociais Aplicadas • Bacharelado</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Gerar Diagnóstico
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} data={kpi} />
        ))}
      </div>

      {mockAlerts.length > 0 && (
        <Card className="border-blue-500/50 bg-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="font-semibold text-blue-500">{mockAlerts[0].type}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mockAlerts[0].description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <HistoricalLineChart title="Evolução Histórica - Nota Geral" data={mockHistoricalData} />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Comparação com Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Média Nacional</span>
                  <span className="font-semibold">3.57</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[71%] bg-muted-foreground" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Média Regional</span>
                  <span className="font-semibold">3.62</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[72%] bg-muted-foreground" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sua Instituição</span>
                  <span className="font-semibold text-primary">3.80</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[76%] bg-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diagnóstico Automático</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-secondary p-4">
            <pre className="whitespace-pre-wrap font-mono text-sm">{mockDiagnostic}</pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desempenho por Dimensão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Formação Geral", score: 3.5, max: 5 },
              { name: "Conhecimento Específico", score: 4.1, max: 5 },
              { name: "Componente Específico 1", score: 3.8, max: 5 },
              { name: "Componente Específico 2", score: 4.2, max: 5 },
              { name: "Componente Específico 3", score: 3.9, max: 5 },
            ].map((dimension, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{dimension.name}</span>
                  <span className="font-semibold">
                    {dimension.score.toFixed(1)} / {dimension.max}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(dimension.score / dimension.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

