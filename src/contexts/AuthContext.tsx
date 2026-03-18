// ============================================================
// MCPHire — Auth Context
// Handles JWT (localStorage), Telegram Widget, and Email auth.
// ============================================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  authApi,
  setTokens,
  clearTokens,
  getAccessToken,
} from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type {
  AuthUser,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  TelegramAuthData,
} from "@/types";

// ---- Context shape -----------------------------------------

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginWithTelegram: (data: TelegramAuthData) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ---- Provider ----------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const qc = useQueryClient();

  // On mount: try to restore session from stored token
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    authApi
      .me()
      .then((me) => setUser(me))
      .catch(() => clearTokens())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const tokens = await authApi.login(credentials);
    setTokens(tokens);
    const me = await authApi.me();
    setUser(me);
    qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
  }, [qc]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    const tokens = await authApi.register(credentials);
    setTokens(tokens);
    const me = await authApi.me();
    setUser(me);
    qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
  }, [qc]);

  const loginWithTelegram = useCallback(async (data: TelegramAuthData) => {
    const tokens = await authApi.loginWithTelegram(data);
    setTokens(tokens);
    const me = await authApi.me();
    setUser(me);
    qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
  }, [qc]);

  const loginWithGoogle = useCallback(async (credential: string) => {
    const tokens = await authApi.loginWithGoogle(credential);
    setTokens(tokens);
    const me = await authApi.me();
    setUser(me);
    qc.invalidateQueries({ queryKey: queryKeys.auth.me() });
  }, [qc]);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearTokens();
      setUser(null);
      qc.clear();
    }
  }, [qc]);

  const refreshUser = useCallback(async () => {
    const me = await authApi.me();
    setUser(me);
  }, []);

  const switchRole = useCallback(() => {
    if (!user) return;
    const newRole = user.role === "seeker" ? "employer" : "seeker";
    setUser({ ...user, role: newRole });
    qc.clear();
  }, [user, qc]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    loginWithTelegram,
    loginWithGoogle,
    logout,
    refreshUser,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---- Hook --------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
