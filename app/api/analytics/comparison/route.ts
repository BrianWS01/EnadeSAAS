import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const year = searchParams.get("year");
    const compareBy = searchParams.get("compareBy") || "state";

    if (!courseId || !year) {
      return NextResponse.json(
        { error: "courseId e year são obrigatórios" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        institution: true,
        enadeResults: {
          where: { year: parseInt(year) },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    const whereClause: Record<string, unknown> = {
      code: course.code,
      id: { not: courseId },
    };

    if (compareBy === "state") {
      whereClause.institution = { state: course.institution.state };
    } else if (compareBy === "region") {
      whereClause.institution = { region: course.institution.region };
    } else if (compareBy === "type") {
      whereClause.institution = { type: course.institution.type };
    }

    const comparableCourses = await prisma.course.findMany({
      where: whereClause,
      include: {
        institution: true,
        enadeResults: {
          where: { year: parseInt(year) },
        },
      },
      take: 10,
    });

    const comparisonData = comparableCourses
      .filter((c) => c.enadeResults.length > 0)
      .map((c) => ({
        institutionName: c.institution.name,
        score: c.enadeResults[0].generalNote,
        year: c.enadeResults[0].year,
      }));

    return NextResponse.json({
      course: {
        id: course.id,
        name: course.name,
        institutionName: course.institution.name,
        score: course.enadeResults[0]?.generalNote,
      },
      comparisonData,
    });
  } catch (error) {
    console.error("Erro ao gerar comparação:", error);
    return NextResponse.json({ error: "Erro ao gerar comparação" }, { status: 500 });
  }
}

