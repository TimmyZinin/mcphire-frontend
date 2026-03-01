// ============================================================
// СБОРКА — URL-synced job filters hook
// Keeps filter state in URLSearchParams so links are shareable.
// ============================================================

import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { JobFilters, JobLevel, JobFormat, EmploymentType } from "@/types";

const DEFAULT_FILTERS: JobFilters = {
  query: "",
  city: "",
  country: "",
  salaryMin: null,
  salaryMax: null,
  level: [],
  format: [],
  employmentType: [],
  skills: [],
  category: "",
  sortBy: "relevance",
};

function parseArray<T extends string>(value: string | null): T[] {
  if (!value) return [];
  return value.split(",").filter(Boolean) as T[];
}

function parseNumber(value: string | null): number | null {
  if (!value) return null;
  const n = parseInt(value, 10);
  return isNaN(n) ? null : n;
}

export function useJobFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: JobFilters = {
    query: searchParams.get("q") ?? DEFAULT_FILTERS.query,
    city: searchParams.get("city") ?? DEFAULT_FILTERS.city,
    country: searchParams.get("country") ?? DEFAULT_FILTERS.country,
    salaryMin: parseNumber(searchParams.get("salaryMin")),
    salaryMax: parseNumber(searchParams.get("salaryMax")),
    level: parseArray<JobLevel>(searchParams.get("level")),
    format: parseArray<JobFormat>(searchParams.get("format")),
    employmentType: parseArray<EmploymentType>(searchParams.get("employmentType")),
    skills: parseArray<string>(searchParams.get("skills")),
    category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
    sortBy: (searchParams.get("sort") as JobFilters["sortBy"]) ?? DEFAULT_FILTERS.sortBy,
  };

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const setFilters = useCallback(
    (updates: Partial<JobFilters & { page?: number }>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        // Reset to page 1 when filters change
        next.set("page", String(updates.page ?? 1));

        if (updates.query !== undefined) {
          if (updates.query) next.set("q", updates.query); else next.delete("q");
        }
        if (updates.city !== undefined) {
          if (updates.city) next.set("city", updates.city); else next.delete("city");
        }
        if (updates.country !== undefined) {
          if (updates.country) next.set("country", updates.country); else next.delete("country");
        }
        if (updates.salaryMin !== undefined) {
          if (updates.salaryMin) next.set("salaryMin", String(updates.salaryMin)); else next.delete("salaryMin");
        }
        if (updates.salaryMax !== undefined) {
          if (updates.salaryMax) next.set("salaryMax", String(updates.salaryMax)); else next.delete("salaryMax");
        }
        if (updates.level !== undefined) {
          if (updates.level.length) next.set("level", updates.level.join(",")); else next.delete("level");
        }
        if (updates.format !== undefined) {
          if (updates.format.length) next.set("format", updates.format.join(",")); else next.delete("format");
        }
        if (updates.employmentType !== undefined) {
          if (updates.employmentType.length) {
            next.set("employmentType", updates.employmentType.join(","));
          } else {
            next.delete("employmentType");
          }
        }
        if (updates.skills !== undefined) {
          if (updates.skills.length) next.set("skills", updates.skills.join(",")); else next.delete("skills");
        }
        if (updates.category !== undefined) {
          if (updates.category) next.set("category", updates.category); else next.delete("category");
        }
        if (updates.sortBy !== undefined) {
          if (updates.sortBy !== "relevance") next.set("sort", updates.sortBy); else next.delete("sort");
        }

        return next;
      }, { replace: true });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const toggleArrayFilter = useCallback(
    <K extends "level" | "format" | "employmentType" | "skills">(
      key: K,
      value: string
    ) => {
      const current = filters[key] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setFilters({ [key]: next } as Partial<JobFilters>);
    },
    [filters, setFilters]
  );

  const activeFilterCount =
    (filters.query ? 1 : 0) +
    (filters.city ? 1 : 0) +
    (filters.salaryMin ? 1 : 0) +
    (filters.salaryMax ? 1 : 0) +
    filters.level.length +
    filters.format.length +
    filters.employmentType.length +
    filters.skills.length +
    (filters.category ? 1 : 0);

  return {
    filters,
    page,
    setFilters,
    resetFilters,
    toggleArrayFilter,
    activeFilterCount,
  };
}
