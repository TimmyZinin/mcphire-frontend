// ============================================================
// MCPHire — Auth Context (Sprint 12 task 33 — magic-link only)
// Removed: login/register/loginWithTelegram/loginWithGoogle.
// New: requestMagicLink + verifyMagicLink.
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
import type { AuthUser, AuthState } from "@/types";

interface AuthContextValue extends AuthState {
  requestMagicLink: (email: string) => Promise<void>;
  verifyMagicLink: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const qc = useQueryClient();

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

  const requestMagicLink = useCallback(async (email: string) => {
    await authApi.requestMagicLink(email);
  }, []);

  const verifyMagicLink = useCallback(async (token: string) => {
    const tokens = await authApi.verifyMagicLink(token);
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

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    requestMagicLink,
    verifyMagicLink,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
