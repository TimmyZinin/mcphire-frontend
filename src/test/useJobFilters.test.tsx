import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useJobFilters } from "@/hooks/useJobFilters";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Simple test wrapper
function TestWrapper({ children, initialEntries = ["/"] }: { children: React.ReactNode; initialEntries?: string[] }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={children} />
      </Routes>
    </MemoryRouter>
  );
}

describe("useJobFilters", () => {
  it("returns default filters on root URL", () => {
    const { result } = renderHook(() => useJobFilters(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(result.current.filters.query).toBe("");
    expect(result.current.filters.city).toBe("");
    expect(result.current.filters.level).toEqual([]);
    expect(result.current.filters.format).toEqual([]);
    expect(result.current.filters.sortBy).toBe("relevance");
  });

  it("returns page 1 by default", () => {
    const { result } = renderHook(() => useJobFilters(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(result.current.page).toBe(1);
  });

  it("has required filter object structure", () => {
    const { result } = renderHook(() => useJobFilters(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    // Check structure
    expect(result.current.filters).toHaveProperty("query");
    expect(result.current.filters).toHaveProperty("city");
    expect(result.current.filters).toHaveProperty("salaryMin");
    expect(result.current.filters).toHaveProperty("salaryMax");
    expect(result.current.filters).toHaveProperty("level");
    expect(result.current.filters).toHaveProperty("format");
    expect(result.current.filters).toHaveProperty("category");
    expect(result.current.filters).toHaveProperty("sortBy");
  });

  it("has setFilters function", () => {
    const { result } = renderHook(() => useJobFilters(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(typeof result.current.setFilters).toBe("function");
  });

  it("has toggleArrayFilter function", () => {
    const { result } = renderHook(() => useJobFilters(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(typeof result.current.toggleArrayFilter).toBe("function");
  });

  it("has resetFilters function", () => {
    const { result } = renderHook(() => useJobFilters(), {
      wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>,
    });

    expect(typeof result.current.resetFilters).toBe("function");
  });
});
