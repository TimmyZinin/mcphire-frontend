// ============================================================
// СБОРКА — Protected Route wrapper
// Redirects unauthenticated users to /auth/login.
// Supports role-based access.
// ============================================================

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If specified, user must have this role */
  requiredRole?: UserRole;
  /** Redirect target (default: /auth/login) */
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
