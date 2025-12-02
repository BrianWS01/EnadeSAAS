import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DiagnosticsEngine } from "@/services/diagnosticsEngine";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId é obrigatório" }, { status: 400 });
    }

    const diagnostics = await prisma.diagnostic.findMany({
      where: { courseId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error("Erro ao buscar diagnósticos:", error);
    return NextResponse.json({ error: "Erro ao buscar diagnósticos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, year } = body;

    if (!courseId) {
      return NextResponse.json({ error: "courseId é obrigatório" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enadeResults: {
          orderBy: { year: "desc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    const analysis = DiagnosticsEngine.generateAnalysis(course, course.enadeResults);
    const recommendations = DiagnosticsEngine.generateRecommendations(course, course.enadeResults);
    const risk = DiagnosticsEngine.assessRisk(course.enadeResults);

    const diagnostic = await prisma.diagnostic.create({
      data: {
        courseId,
        year: year || new Date().getFullYear(),
        type: "analysis",
        content: `${analysis}\n\nRecomendações:\n${recommendations.join("\n")}\n\nNível de Risco: ${risk}`,
        generatedBy: "system",
      },
    });

    return NextResponse.json(diagnostic, { status: 201 });
  } catch (error) {
    console.error("Erro ao gerar diagnóstico:", error);
    return NextResponse.json({ error: "Erro ao gerar diagnóstico" }, { status: 500 });
  }
}

