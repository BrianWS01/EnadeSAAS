// Engine para gerar diagnósticos automáticos

import type { EnadeResult, Course } from "@/types";
import { IndicatorsEngine } from "./indicatorsEngine";

export class DiagnosticsEngine {
  static generateAnalysis(course: Course, results: EnadeResult[]): string {
    if (results.length === 0) {
      return "Sem dados suficientes para análise.";
    }

    const sorted = [...results].sort((a, b) => b.year - a.year);
    const latest = sorted[0];
    const trend = IndicatorsEngine.calculateTrend(results);

    let analysis = `Análise do curso ${course.name}:\n\n`;

    if (latest.generalNote) {
      analysis += `Nota Geral (${latest.year}): ${latest.generalNote.toFixed(2)}\n`;
    }

    if (sorted.length > 1 && latest.generalNote && sorted[1].generalNote) {
      const variation = IndicatorsEngine.calculateVariation(
        latest.generalNote,
        sorted[1].generalNote
      );
      analysis += `Variação em relação ao ciclo anterior: ${variation > 0 ? "+" : ""}${variation.toFixed(1)}%\n`;
    }

    analysis += `\nTendência histórica: ${
      trend === "ascending" ? "Crescente" : trend === "descending" ? "Decrescente" : "Estável"
    }\n`;

    if (latest.nationalAverage) {
      const diff = latest.generalNote! - latest.nationalAverage;
      analysis += `\nComparação com média nacional: ${diff > 0 ? "+" : ""}${diff.toFixed(2)} pontos\n`;
    }

    return analysis;
  }

  static generateRecommendations(course: Course, results: EnadeResult[]): string[] {
    const recommendations: string[] = [];
    const sorted = [...results].sort((a, b) => b.year - a.year);
    const latest = sorted[0];

    if (IndicatorsEngine.detectDecline(results)) {
      recommendations.push(
        "Identificada queda no desempenho. Recomenda-se revisão do plano pedagógico."
      );
    }

    if (latest.absenceRate && latest.absenceRate > 30) {
      recommendations.push(
        "Taxa de ausência elevada. Considere estratégias de engajamento dos alunos."
      );
    }

    if (IndicatorsEngine.isBelowAverage(latest, "national")) {
      recommendations.push(
        "Desempenho abaixo da média nacional. Recomenda-se análise detalhada das competências."
      );
    }

    if (latest.generalFormation && latest.specificKnowledge) {
      if (latest.generalFormation < latest.specificKnowledge - 0.5) {
        recommendations.push(
          "Formação Geral abaixo do Conhecimento Específico. Considere fortalecer componentes de formação geral."
        );
      }
    }

    return recommendations;
  }

  static assessRisk(results: EnadeResult[]): "low" | "medium" | "high" {
    if (results.length === 0) return "medium";

    const hasDecline = IndicatorsEngine.detectDecline(results);
    const trend = IndicatorsEngine.calculateTrend(results);
    const sorted = [...results].sort((a, b) => b.year - a.year);
    const latest = sorted[0];

    if (hasDecline && trend === "descending") return "high";
    if (hasDecline || IndicatorsEngine.isBelowAverage(latest, "national")) return "medium";
    return "low";
  }
}

