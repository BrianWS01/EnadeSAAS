import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const institutionId = searchParams.get("institutionId");

    if (!institutionId) {
      return NextResponse.json({ error: "institutionId é obrigatório" }, { status: 400 });
    }

    const courses = await prisma.course.findMany({
      where: { institutionId },
      include: {
        institution: true,
        enadeResults: {
          orderBy: { year: "desc" },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    return NextResponse.json({ error: "Erro ao buscar cursos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, area, level, institutionId } = body;

    if (!name || !code || !area || !level || !institutionId) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: { name, code, area, level, institutionId },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    return NextResponse.json({ error: "Erro ao criar curso" }, { status: 500 });
  }
}

