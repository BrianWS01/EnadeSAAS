// Serviço para processar dados brutos do ENADE

export interface RawEnadeData {
  year: number;
  courseCode: string;
  courseName: string;
  institutionCode: string;
  institutionName: string;
  generalNote?: number;
  generalFormation?: number;
  specificKnowledge?: number;
  idd?: number;
  studentsRegistered?: number;
  studentsParticipated?: number;
  [key: string]: unknown;
}

export class EnadeProcessor {
  static validateData(data: RawEnadeData[]): { valid: RawEnadeData[]; errors: string[] } {
    const valid: RawEnadeData[] = [];
    const errors: string[] = [];

    for (const row of data) {
      if (!row.year || !row.courseCode || !row.institutionCode) {
        errors.push(
          `Registro inválido: faltam campos obrigatórios (year, courseCode, institutionCode)`
        );
        continue;
      }

      valid.push(row);
    }

    return { valid, errors };
  }

  static normalizeData(data: RawEnadeData[]) {
    return data.map((row) => ({
      year: row.year,
      courseCode: row.courseCode,
      courseName: row.courseName,
      institutionCode: row.institutionCode,
      institutionName: row.institutionName,
      generalNote: row.generalNote ?? null,
      generalFormation: row.generalFormation ?? null,
      specificKnowledge: row.specificKnowledge ?? null,
      idd: row.idd ?? null,
      studentsRegistered: row.studentsRegistered ?? null,
      studentsParticipated: row.studentsParticipated ?? null,
      absenceRate:
        row.studentsRegistered && row.studentsParticipated
          ? ((row.studentsRegistered - row.studentsParticipated) / row.studentsRegistered) * 100
          : null,
    }));
  }

  static async parseCSV(fileContent: string): Promise<RawEnadeData[]> {
    const lines = fileContent.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data: RawEnadeData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(",");
      const row: Record<string, unknown> = {};

      for (let j = 0; j < headers.length; j++) {
        const value = values[j]?.trim();
        row[headers[j]] = isNaN(Number(value)) ? value : Number(value);
      }

      data.push(row as RawEnadeData);
    }

    return data;
  }
}

