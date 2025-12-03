// Sistema de autenticação mock para testes

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "coordinator" | "analyst";
  institution: string;
}

// Usuários de teste
const TEST_USERS = [
  {
    email: "admin@enade.com",
    password: "admin123",
    user: {
      id: "1",
      email: "admin@enade.com",
      name: "Administrador",
      role: "admin" as const,
      institution: "Instituição de Ensino Superior",
    },
  },
  {
    email: "coordenador@enade.com",
    password: "coord123",
    user: {
      id: "2",
      email: "coordenador@enade.com",
      name: "João Silva",
      role: "coordinator" as const,
      institution: "Instituição de Ensino Superior",
    },
  },
  {
    email: "analista@enade.com",
    password: "analista123",
    user: {
      id: "3",
      email: "analista@enade.com",
      name: "Maria Santos",
      role: "analyst" as const,
      institution: "Instituição de Ensino Superior",
    },
  },
];

export async function authenticateUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const testUser = TEST_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (testUser) {
    // Salva no localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(testUser.user));
    }
    return { success: true, user: testUser.user };
  }

  return { success: false, error: "Email ou senha incorretos" };
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}

