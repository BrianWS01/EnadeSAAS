"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/ui/kpi-card";
import { HistoricalLineChart } from "@/components/charts/line-chart";
import { CompetencyRadarChart } from "@/components/charts/radar-chart";
import { ComparisonBarChart } from "@/components/charts/bar-chart";
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import type { KPIData, HistoricalData, CompetencyRadarData, ComparisonData } from "@/types";

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

const mockRadarData: CompetencyRadarData[] = [
  { competency: "Formação Geral", score: 3.5, maxScore: 5 },
  { competency: "Gestão", score: 4.1, maxScore: 5 },
  { competency: "Finanças", score: 3.8, maxScore: 5 },
  { competency: "Marketing", score: 4.2, maxScore: 5 },
  { competency: "Operações", score: 3.9, maxScore: 5 },
  { competency: "Estratégia", score: 3.7, maxScore: 5 },
];

const mockComparisonData: ComparisonData[] = [
  { institutionName: "Média Nacional", score: 3.57, year: 2023 },
  { institutionName: "Média Regional", score: 3.62, year: 2023 },
  { institutionName: "Sua Instituição", score: 3.8, year: 2023 },
  { institutionName: "IES Concorrente A", score: 3.45, year: 2023 },
  { institutionName: "IES Concorrente B", score: 3.92, year: 2023 },
];

const mockDiagnostic = `Análise do curso Administração:

Nota Geral (2023): 3.80
Variação em relação ao ciclo anterior: +5.6%

Tendência histórica: Crescente

Comparação com média nacional: +0.23 pontos
Comparação com média regional: +0.18 pontos

Pontos Fortes:
• Conhecimento Específico: 4.1 (crescimento de 7.8%)
• Marketing e Gestão: desempenho acima da média
• Taxa de participação elevada (92%)

Pontos de Atenção:
• IDD apresentou leve queda (-1.2%)
• Formação Geral pode ser fortalecida
• Estratégia empresarial abaixo do esperado

Recomendações:
• Manter as estratégias pedagógicas atuais
• Investir em melhorias contínuas na formação geral
• Monitorar o IDD para evitar quedas futuras
• Considerar workshops de estratégia empresarial`;

export default function CourseDetailPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Link href="/courses">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Administração</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Ciências Sociais Aplicadas • Bacharelado
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="w-full sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Gerar Diagnóstico
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} data={kpi} />
        ))}
      </div>

      {/* Alerta de Destaque */}
      <Card className="border-blue-500/50 bg-blue-500/5">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:p-6">
          <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
          <div className="flex-1">
            <p className="font-semibold text-blue-500">Crescimento Acima da Média</p>
            <p className="mt-1 text-sm text-muted-foreground">
              O curso apresentou crescimento de 5.6% no último ciclo, superando a média regional e
              nacional.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Informações Gerais */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alunos Inscritos</p>
              <p className="text-2xl font-bold">245</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500/10">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Participação</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10">
              <AlertTriangle className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nível de Risco</p>
              <p className="text-2xl font-bold text-green-500">Baixo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Principais */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HistoricalLineChart title="Evolução Histórica - Nota Geral" data={mockHistoricalData} />
        <CompetencyRadarChart title="Radar de Competências ENADE" data={mockRadarData} />
      </div>

      {/* Comparativo */}
      <ComparisonBarChart
        title="Comparação com Outras Instituições"
        data={mockComparisonData}
      />

      {/* Diagnóstico Automático */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diagnóstico Automático</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-secondary p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm">
              {mockDiagnostic}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Desempenho por Dimensão */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desempenho por Dimensão ENADE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Formação Geral", score: 3.5, max: 5, color: "bg-blue-500" },
              { name: "Conhecimento Específico", score: 4.1, max: 5, color: "bg-primary" },
              { name: "Gestão Empresarial", score: 4.0, max: 5, color: "bg-green-500" },
              { name: "Marketing e Vendas", score: 4.2, max: 5, color: "bg-yellow-500" },
              { name: "Finanças Corporativas", score: 3.8, max: 5, color: "bg-purple-500" },
              { name: "Operações e Logística", score: 3.9, max: 5, color: "bg-orange-500" },
            ].map((dimension, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{dimension.name}</span>
                  <span className="text-muted-foreground">
                    {dimension.score.toFixed(1)} / {dimension.max}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full ${dimension.color}`}
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
