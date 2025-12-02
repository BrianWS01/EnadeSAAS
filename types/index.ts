// Types principais do ENADE Analytics

export interface Institution {
  id: string;
  name: string;
  code: string;
  type: string;
  state: string;
  region: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "coordinator" | "admin" | "analyst";
  institutionId: string;
  institution?: Institution;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  area: string;
  level: string;
  institutionId: string;
  institution?: Institution;
}

export interface EnadeResult {
  id: string;
  courseId: string;
  year: number;
  generalNote: number | null;
  generalFormation: number | null;
  specificKnowledge: number | null;
  idd: number | null;
  studentsRegistered: number | null;
  studentsParticipated: number | null;
  absenceRate: number | null;
  nationalAverage: number | null;
  regionalAverage: number | null;
  stateAverage: number | null;
  rawData?: any;
  course?: Course;
  competencies?: Competency[];
  questionResults?: QuestionResult[];
}

export interface Competency {
  id: string;
  enadeResultId: string;
  name: string;
  code: string;
  score: number;
  description: string | null;
}

export interface QuestionResult {
  id: string;
  enadeResultId: string;
  questionNumber: number;
  questionType: "objetiva" | "discursiva" | "fg" | "ce";
  correctRate: number | null;
  averageScore: number | null;
  topic: string | null;
  difficulty: "fácil" | "médio" | "difícil" | null;
}

export interface Alert {
  id: string;
  courseId: string;
  type: "decline" | "growth" | "below_average" | "risk";
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  year: number;
  isRead: boolean;
  createdAt: Date;
  course?: Course;
}

export interface Diagnostic {
  id: string;
  courseId: string;
  year: number;
  type: "analysis" | "recommendation" | "risk_assessment";
  content: string;
  generatedBy: "ai" | "system" | "manual";
  createdAt: Date;
  course?: Course;
}

export interface DataUpload {
  id: string;
  fileName: string;
  fileSize: number;
  year: number;
  status: "pending" | "processing" | "completed" | "failed";
  recordsImported: number;
  errorLog: string | null;
  uploadedBy: string;
  createdAt: Date;
  completedAt: Date | null;
}

// Types para análises e dashboard

export interface KPIData {
  label: string;
  value: number | string;
  variation?: number;
  trend?: "up" | "down" | "stable";
}

export interface HistoricalData {
  year: number;
  value: number;
  label?: string;
}

export interface CompetencyRadarData {
  competency: string;
  score: number;
  maxScore: number;
}

export interface ComparisonData {
  institutionName: string;
  score: number;
  year: number;
}

