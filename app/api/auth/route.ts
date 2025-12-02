import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action } = body;

    if (action === "login") {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { institution: true },
      });

      if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          institution: user.institution,
        },
      });
    }

    return NextResponse.json({ error: "Ação inválida" }, { status: 400 });
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return NextResponse.json({ error: "Erro na autenticação" }, { status: 500 });
  }
}

