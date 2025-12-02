// Engine para calcular indicadores e estatísticas

import type { EnadeResult } from "@/types";

export class IndicatorsEngine {
  static calculateVariation(current: number, previous: number): number {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }

  static detectDecline(results: EnadeResult[], threshold: number = 5): boolean {
    if (results.length < 2) return false;

    const sorted = [...results].sort((a, b) => b.year - a.year);
    const current = sorted[0].generalNote;
    const previous = sorted[1].generalNote;

    if (!current || !previous) return false;

    const variation = this.calculateVariation(current, previous);
    return variation < -threshold;
  }

  static detectGrowth(results: EnadeResult[], threshold: number = 5): boolean {
    if (results.length < 2) return false;

    const sorted = [...results].sort((a, b) => b.year - a.year);
    const current = sorted[0].generalNote;
    const previous = sorted[1].generalNote;

    if (!current || !previous) return false;

    const variation = this.calculateVariation(current, previous);
    return variation > threshold;
  }

  static isBelowAverage(result: EnadeResult, averageType: "national" | "regional" | "state"): boolean {
    const average =
      averageType === "national"
        ? result.nationalAverage
        : averageType === "regional"
        ? result.regionalAverage
        : result.stateAverage;

    if (!result.generalNote || !average) return false;

    return result.generalNote < average;
  }

  static calculateTrend(results: EnadeResult[]): "ascending" | "descending" | "stable" {
    if (results.length < 2) return "stable";

    const sorted = [...results].sort((a, b) => a.year - b.year);
    const validResults = sorted.filter((r) => r.generalNote !== null);

    if (validResults.length < 2) return "stable";

    let increases = 0;
    let decreases = 0;

    for (let i = 1; i < validResults.length; i++) {
      const current = validResults[i].generalNote!;
      const previous = validResults[i - 1].generalNote!;

      if (current > previous) increases++;
      else if (current < previous) decreases++;
    }

    if (increases > decreases) return "ascending";
    if (decreases > increases) return "descending";
    return "stable";
  }
}

