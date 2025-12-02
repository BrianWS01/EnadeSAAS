"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { FilterSelect } from "@/components/ui/filter-select";
import { GraduationCap, TrendingUp, TrendingDown, AlertTriangle, Filter } from "lucide-react";

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
    studentsCount: 245,
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
    studentsCount: 180,
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
    studentsCount: 320,
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
    studentsCount: 120,
  },
  {
    id: "5",
    name: "Psicologia",
    area: "Ciências da Saúde",
    level: "Bacharelado",
    lastNote: 3.1,
    variation: -5.8,
    trend: "down" as const,
    hasAlert: true,
    studentsCount: 156,
  },
  {
    id: "6",
    name: "Ciência da Computação",
    area: "Tecnologia / Informática",
    level: "Bacharelado",
    lastNote: 3.9,
    variation: 3.2,
    trend: "up" as const,
    hasAlert: false,
    studentsCount: 198,
  },
  {
    id: "7",
    name: "Enfermagem",
    area: "Ciências da Saúde",
    level: "Bacharelado",
    lastNote: 4.0,
    variation: 4.5,
    trend: "up" as const,
    hasAlert: false,
    studentsCount: 210,
  },
  {
    id: "8",
    name: "Engenharia de Produção",
    area: "Engenharias",
    level: "Bacharelado",
    lastNote: 3.7,
    variation: 2.8,
    trend: "up" as const,
    hasAlert: false,
    studentsCount: 165,
  },
  {
    id: "9",
    name: "Pedagogia",
    area: "Educação",
    level: "Licenciatura",
    lastNote: 3.4,
    variation: -1.2,
    trend: "down" as const,
    hasAlert: false,
    studentsCount: 280,
  },
];

const areas = [
  { label: "Ciências Sociais Aplicadas", value: "Ciências Sociais Aplicadas" },
  { label: "Engenharias", value: "Engenharias" },
  { label: "Ciências da Saúde", value: "Ciências da Saúde" },
  { label: "Tecnologia / Informática", value: "Tecnologia / Informática" },
  { label: "Educação", value: "Educação" },
];

const levels = [
  { label: "Bacharelado", value: "Bacharelado" },
  { label: "Licenciatura", value: "Licenciatura" },
  { label: "Tecnólogo", value: "Tecnólogo" },
];

const trends = [
  { label: "Crescimento", value: "up" },
  { label: "Declínio", value: "down" },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTrend, setSelectedTrend] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase());
    const matchesArea = !selectedArea || course.area === selectedArea;
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesTrend = !selectedTrend || course.trend === selectedTrend;

    return matchesSearch && matchesArea && matchesLevel && matchesTrend;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cursos</h1>
          <p className="mt-1 text-muted-foreground">
            {filteredCourses.length} de {mockCourses.length} cursos
          </p>
        </div>
        <Button>Adicionar Curso</Button>
      </div>

      {/* Busca e Filtros */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <SearchInput
            placeholder="Buscar por nome do curso..."
            value={search}
            onChange={setSearch}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <Card>
            <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <FilterSelect
                label="Área de Conhecimento"
                options={areas}
                value={selectedArea}
                onChange={setSelectedArea}
              />
              <FilterSelect
                label="Nível"
                options={levels}
                value={selectedLevel}
                onChange={setSelectedLevel}
              />
              <FilterSelect
                label="Tendência"
                options={trends}
                value={selectedTrend}
                onChange={setSelectedTrend}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Grid de Cursos */}
      {filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Nenhum curso encontrado com os filtros selecionados
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="p-6">
                  {/* Header do Card */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      {course.hasAlert && (
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500" />
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

                  {/* Informações do Curso */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="line-clamp-2 text-lg font-semibold">{course.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{course.area}</p>
                      <p className="text-sm text-muted-foreground">{course.level}</p>
                    </div>

                    {/* Nota e Alunos */}
                    <div className="flex items-center justify-between border-t pt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Nota ENADE</p>
                        <p className="text-2xl font-bold">{course.lastNote.toFixed(1)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Alunos</p>
                        <p className="text-lg font-semibold">{course.studentsCount}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
