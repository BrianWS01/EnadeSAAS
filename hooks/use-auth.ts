import { create } from "zustand";
import { User, authenticateUser, getCurrentUser, logout as authLogout } from "@/lib/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    const result = await authenticateUser(email, password);

    if (result.success && result.user) {
      set({ user: result.user, isLoading: false, error: null });
      return true;
    } else {
      set({ error: result.error || "Erro ao fazer login", isLoading: false });
      return false;
    }
  },

  logout: () => {
    authLogout();
    set({ user: null, error: null });
  },

  checkAuth: () => {
    const user = getCurrentUser();
    set({ user });
  },
}));

