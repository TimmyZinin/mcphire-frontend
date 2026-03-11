import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Simple mock for AuthContext
const mockUseAuth = vi.hoisted(() => vi.fn());

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: mockUseAuth,
}));

const mockAuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: vi.fn(),
  register: vi.fn(),
  loginWithTelegram: vi.fn(),
  logout: vi.fn(),
  refreshUser: vi.fn(),
  switchRole: vi.fn(),
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue(mockAuthState);
  });

  it("renders children when authenticated", () => {
    mockUseAuth.mockReturnValue({
      ...mockAuthState,
      isAuthenticated: true,
      user: { id: "1", email: "test@test.com", name: "Test", role: "seeker" },
    });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByTestId("protected-content")).toBeTruthy();
  });

  it("shows loading spinner when loading", () => {
    mockUseAuth.mockReturnValue({
      ...mockAuthState,
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Loading spinner has animate-spin class
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeTruthy();
  });

  it("does not render children when not authenticated", () => {
    mockUseAuth.mockReturnValue({
      ...mockAuthState,
      isAuthenticated: false,
      isLoading: false,
    });

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Should not render children (Navigate redirects)
    expect(screen.queryByTestId("protected-content")).toBeNull();
  });

  it("renders children when user has required role", () => {
    mockUseAuth.mockReturnValue({
      ...mockAuthState,
      isAuthenticated: true,
      user: { id: "1", email: "test@test.com", name: "Test", role: "employer" },
    });

    render(
      <BrowserRouter>
        <ProtectedRoute requiredRole="employer">
          <div data-testid="protected-content">Employer Only</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    expect(screen.getByTestId("protected-content")).toBeTruthy();
  });

  it("redirects when user lacks required role", () => {
    mockUseAuth.mockReturnValue({
      ...mockAuthState,
      isAuthenticated: true,
      user: { id: "1", email: "test@test.com", name: "Test", role: "seeker" },
    });

    const { container } = render(
      <BrowserRouter>
        <ProtectedRoute requiredRole="employer">
          <div data-testid="protected-content">Should not see this</div>
        </ProtectedRoute>
      </BrowserRouter>
    );

    // Should redirect due to role mismatch
    expect(screen.queryByTestId("protected-content")).toBeNull();
  });
});
