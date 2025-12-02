# ENADE Analytics

Sistema SaaS de inteligência acadêmica para análise de dados do ENADE.

## Stack Tecnológica

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Componentes UI**: shadcn/ui
- **Gráficos**: Recharts
- **Estado**: Zustand
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma

## Estrutura do Projeto

```
/app
  /(main)           # Grupo de rotas com layout (sidebar + header)
    /dashboard      # Dashboard principal
    /courses        # Lista e detalhes de cursos
  /api              # API Routes
    /auth           # Autenticação
    /courses        # CRUD de cursos
    /analytics      # Análises e métricas
    /diagnostics    # Diagnósticos automáticos
  globals.css       # Estilos globais
  layout.tsx        # Layout raiz
  page.tsx          # Redireciona para /dashboard

/components
  /ui               # Componentes UI base
  /charts           # Componentes de gráficos

/hooks              # Custom hooks React

/lib
  prisma.ts         # Cliente Prisma
  utils.ts          # Utilitários

/services
  enadeProcessor.ts       # Processamento de dados ENADE
  indicatorsEngine.ts     # Cálculo de indicadores
  diagnosticsEngine.ts    # Geração de diagnósticos

/types
  index.ts          # Types TypeScript do projeto

/prisma
  schema.prisma     # Schema do banco de dados
```

## Configuração do Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/enade_analytics?schema=public"
```

### 3. Configurar banco de dados

```bash
# Gerar o Prisma Client
npm run prisma:generate

# Sincronizar o schema com o banco (desenvolvimento)
npm run prisma:push

# Ou criar migrations (produção)
npx prisma migrate dev --name init
```

### 4. Rodar o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run prisma:generate` - Gera Prisma Client
- `npm run prisma:push` - Sincroniza schema com banco
- `npm run prisma:studio` - Abre Prisma Studio

## Funcionalidades Implementadas (V1 Base)

### ✅ Estrutura Base
- [x] Configuração Next.js 14 + TypeScript
- [x] TailwindCSS configurado
- [x] shadcn/ui instalado
- [x] Prisma ORM configurado
- [x] Schema do banco de dados completo

### ✅ Componentes UI
- [x] Sidebar com navegação
- [x] Header com busca
- [x] Cards KPI
- [x] Gráfico de linha histórico
- [x] Componentes shadcn/ui (Button, Card)

### ✅ Páginas
- [x] Dashboard principal com KPIs e alertas
- [x] Lista de cursos
- [x] Detalhes do curso com análises

### ✅ API Routes
- [x] `/api/courses` - CRUD de cursos
- [x] `/api/analytics` - Análises e métricas
- [x] `/api/analytics/comparison` - Comparações entre IES
- [x] `/api/diagnostics` - Diagnósticos automáticos
- [x] `/api/auth` - Autenticação básica

### ✅ Serviços
- [x] EnadeProcessor - Processamento de dados
- [x] IndicatorsEngine - Cálculo de indicadores
- [x] DiagnosticsEngine - Geração de diagnósticos

## Próximos Passos

Para continuar o desenvolvimento, implemente as seguintes funcionalidades:

1. **Upload de dados ENADE** - Página `/upload` com processamento CSV
2. **Autenticação completa** - NextAuth ou solução custom
3. **Radar de competências** - Gráfico radar para dimensões
4. **Comparativos avançados** - Comparação entre múltiplas IES
5. **Módulo de IA** - Integração com OpenAI para diagnósticos
6. **Exportação PDF** - Geração de relatórios

## Database Schema

O banco de dados possui as seguintes entidades principais:

- **Institution** - Instituições de Ensino
- **User** - Usuários do sistema
- **Course** - Cursos
- **EnadeResult** - Resultados ENADE por ano
- **Competency** - Competências/Dimensões avaliadas
- **QuestionResult** - Resultados por questão
- **Alert** - Alertas automáticos
- **Diagnostic** - Diagnósticos gerados
- **DataUpload** - Histórico de uploads

## Licença

Privado - Todos os direitos reservados

