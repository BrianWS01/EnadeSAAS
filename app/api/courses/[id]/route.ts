import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        institution: true,
        enadeResults: {
          orderBy: { year: "desc" },
          include: {
            competencies: true,
            questionResults: true,
          },
        },
        alerts: {
          where: { isRead: false },
          orderBy: { createdAt: "desc" },
        },
        diagnostics: {
          orderBy: { year: "desc" },
          take: 1,
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Curso não encontrado" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return NextResponse.json({ error: "Erro ao buscar curso" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const course = await prisma.course.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return NextResponse.json({ error: "Erro ao atualizar curso" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Curso deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    return NextResponse.json({ error: "Erro ao deletar curso" }, { status: 500 });
  }
}

