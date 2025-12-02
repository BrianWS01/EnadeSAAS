"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const mockCourses = [
  {
    id: "1",
    name: "Administração",
    area: "Ciências Sociais Aplicadas",
    level: "Bacharelado",
    lastNote: 3.8,
    variation: 5.6,
    trend: "up" as const,
    hasAlert: false,
  },
  {
    id: "2",
    name: "Engenharia Civil",
    area: "Engenharias",
    level: "Bacharelado",
    lastNote: 3.5,
    variation: -2.1,
    trend: "down" as const,
    hasAlert: true,
  },
  {
    id: "3",
    name: "Direito",
    area: "Ciências Sociais Aplicadas",
    level: "Bacharelado",
    lastNote: 4.2,
    variation: 8.3,
    trend: "up" as const,
    hasAlert: false,
  },
  {
    id: "4",
    name: "Medicina",
    area: "Ciências da Saúde",
    level: "Bacharelado",
    lastNote: 4.5,
    variation: 1.2,
    trend: "up" as const,
    hasAlert: false,
  },
  {
    id: "5",
    name: "Psicologia",
    area: "Ciências Humanas",
    level: "Bacharelado",
    lastNote: 3.1,
    variation: -5.8,
    trend: "down" as const,
    hasAlert: true,
  },
  {
    id: "6",
    name: "Ciência da Computação",
    area: "Ciências Exatas",
    level: "Bacharelado",
    lastNote: 3.9,
    variation: 3.2,
    trend: "up" as const,
    hasAlert: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cursos</h1>
          <p className="mt-1 text-muted-foreground">Gerencie e analise os cursos da instituição</p>
        </div>
        <Button>Adicionar Curso</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <Card className="h-full transition-all hover:border-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    {course.hasAlert && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      course.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {course.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {course.variation > 0 ? "+" : ""}
                      {course.variation.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{course.area}</p>
                  <p className="text-sm text-muted-foreground">{course.level}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Última Nota ENADE</p>
                    <p className="text-2xl font-bold">{course.lastNote}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

