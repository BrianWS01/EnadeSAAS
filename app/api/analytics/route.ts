import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { IndicatorsEngine } from "@/services/indicatorsEngine";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId é obrigatório" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enadeResults: {
          orderBy: { year: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    const results = course.enadeResults as any;
    const trend = IndicatorsEngine.calculateTrend(results);
    const hasDecline = IndicatorsEngine.detectDecline(results);
    const hasGrowth = IndicatorsEngine.detectGrowth(results);

    type EnadeResultData = {
      year: number;
      generalNote: number | null;
      generalFormation: number | null;
      specificKnowledge: number | null;
      idd: number | null;
    };

    const historicalData = results.map((r: EnadeResultData) => ({
      year: r.year,
      generalNote: r.generalNote,
      generalFormation: r.generalFormation,
      specificKnowledge: r.specificKnowledge,
      idd: r.idd,
    }));

    return NextResponse.json({
      course: {
        id: course.id,
        name: course.name,
        code: course.code,
      },
      trend,
      hasDecline,
      hasGrowth,
      historicalData,
    });
  } catch (error) {
    console.error("Erro ao gerar análises:", error);
    return NextResponse.json({ error: "Erro ao gerar análises" }, { status: 500 });
  }
}

