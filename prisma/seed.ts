import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar instituição padrão
  const institution = await prisma.institution.upsert({
    where: { code: "IES-001" },
    update: {},
    create: {
      name: "Instituição de Ensino Superior",
      code: "IES-001",
      type: "Privada",
      state: "SP",
      region: "Sudeste",
    },
  });

  console.log(`✅ Instituição criada: ${institution.name}`);

  // Lista de cursos
  const courses = [
    {
      name: "Administração - EAD / SEMI / Noturno",
      code: "ADM-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
    {
      name: "Análise e Desenvolvimento de Sistemas - EAD / SEMI",
      code: "ADS-001",
      area: "Tecnologia / Informática",
      level: "Tecnólogo",
    },
    {
      name: "Biomedicina",
      code: "BIO-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Ciência da Computação",
      code: "CCO-001",
      area: "Tecnologia / Informática",
      level: "Bacharelado",
    },
    {
      name: "Ciências Contábeis (EAD / SEMI / Presencial)",
      code: "CCT-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
    {
      name: "Ciências Econômicas - EAD",
      code: "ECO-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
    {
      name: "Comércio Exterior - EAD",
      code: "CEX-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Direito (Matutino / Noturno)",
      code: "DIR-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
    {
      name: "Educação Física Bacharel",
      code: "EFB-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Educação Física Licenciatura",
      code: "EFL-001",
      area: "Educação",
      level: "Licenciatura",
    },
    {
      name: "Enfermagem (Matutino / Noturno)",
      code: "ENF-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Engenharia Civil",
      code: "ECV-001",
      area: "Engenharias",
      level: "Bacharelado",
    },
    {
      name: "Engenharia de Controle e Automação",
      code: "ECA-001",
      area: "Engenharias",
      level: "Bacharelado",
    },
    {
      name: "Engenharia de Produção (Presencial / EAD / SEMI)",
      code: "EPR-001",
      area: "Engenharias",
      level: "Bacharelado",
    },
    {
      name: "Engenharia Eletrônica (Noturno)",
      code: "EEL-001",
      area: "Engenharias",
      level: "Bacharelado",
    },
    {
      name: "Engenharia Mecânica (Presencial / EAD / SEMI)",
      code: "EMC-001",
      area: "Engenharias",
      level: "Bacharelado",
    },
    {
      name: "Estética e Cosmética",
      code: "EST-001",
      area: "Ciências da Saúde",
      level: "Tecnólogo",
    },
    {
      name: "Farmácia",
      code: "FAR-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Física - Licenciatura - EAD",
      code: "FIS-001",
      area: "Ciências Exatas",
      level: "Licenciatura",
    },
    {
      name: "Fisioterapia",
      code: "FST-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Fonoaudiologia",
      code: "FON-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Geografia - EAD",
      code: "GEO-001",
      area: "Educação / Ciências Humanas",
      level: "Licenciatura",
    },
    {
      name: "Gestão Ambiental - EAD",
      code: "GAM-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Gestão Comercial - EAD",
      code: "GCM-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Gestão da Qualidade - EAD",
      code: "GQL-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Gestão da Tecnologia da Informação - EAD / SEMI",
      code: "GTI-001",
      area: "Tecnologia / Informática",
      level: "Tecnólogo",
    },
    {
      name: "Gestão de Recursos Humanos - EAD / SEMI",
      code: "GRH-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Gestão Financeira - EAD",
      code: "GFI-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Gestão Pública - EAD / SEMI",
      code: "GPU-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "História - Licenciatura",
      code: "HIS-001",
      area: "Ciências Humanas",
      level: "Licenciatura",
    },
    {
      name: "Jornalismo",
      code: "JOR-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
    {
      name: "Letras com Habilitação em Inglês",
      code: "LET-001",
      area: "Educação / Humanas",
      level: "Licenciatura",
    },
    {
      name: "Logística - EAD / SEMI",
      code: "LOG-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Marketing - EAD",
      code: "MKT-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Matemática - EAD",
      code: "MAT-001",
      area: "Ciências Exatas",
      level: "Licenciatura",
    },
    {
      name: "Medicina",
      code: "MED-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Medicina Veterinária (Matutino / Noturno)",
      code: "VET-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Nutrição",
      code: "NUT-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Odontologia",
      code: "ODO-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Pedagogia (Presencial / EAD / 8 semestres / 2ª Licenciatura)",
      code: "PED-001",
      area: "Educação",
      level: "Licenciatura",
    },
    {
      name: "Processos Gerenciais - EAD",
      code: "PGE-001",
      area: "Ciências Sociais Aplicadas",
      level: "Tecnólogo",
    },
    {
      name: "Psicologia",
      code: "PSI-001",
      area: "Ciências da Saúde",
      level: "Bacharelado",
    },
    {
      name: "Publicidade e Propaganda",
      code: "PUB-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
    {
      name: "Serviço Social - EAD",
      code: "SSO-001",
      area: "Ciências Sociais Aplicadas",
      level: "Bacharelado",
    },
  ];

  // Criar cursos
  let createdCount = 0;
  let updatedCount = 0;

  for (const course of courses) {
    const result = await prisma.course.upsert({
      where: {
        code_institutionId: {
          code: course.code,
          institutionId: institution.id,
        },
      },
      update: {
        name: course.name,
        area: course.area,
        level: course.level,
      },
      create: {
        name: course.name,
        code: course.code,
        area: course.area,
        level: course.level,
        institutionId: institution.id,
      },
    });

    if (result.createdAt === result.updatedAt) {
      createdCount++;
    } else {
      updatedCount++;
    }
  }

  console.log(`✅ ${createdCount} cursos criados`);
  console.log(`✅ ${updatedCount} cursos atualizados`);
  console.log(`✅ Total: ${courses.length} cursos no sistema`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao fazer seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

