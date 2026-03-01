// ============================================================
// СБОРКА — React Query key factory
// Centralised so invalidations stay consistent.
// ============================================================

import type { JobsQueryParams } from "@/lib/api";

export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },

  // Jobs
  jobs: {
    all: ["jobs"] as const,
    lists: () => [...queryKeys.jobs.all, "list"] as const,
    list: (params: JobsQueryParams) => [...queryKeys.jobs.lists(), params] as const,
    details: () => [...queryKeys.jobs.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.jobs.details(), id] as const,
    similar: (id: string) => [...queryKeys.jobs.detail(id), "similar"] as const,
    saved: () => [...queryKeys.jobs.all, "saved"] as const,
    categories: () => [...queryKeys.jobs.all, "categories"] as const,
    cities: () => [...queryKeys.jobs.all, "cities"] as const,
    stats: () => [...queryKeys.jobs.all, "stats"] as const,
  },

  // Seeker
  seeker: {
    all: ["seeker"] as const,
    profile: () => [...queryKeys.seeker.all, "profile"] as const,
    applications: () => [...queryKeys.seeker.all, "applications"] as const,
  },

  // Employer
  employer: {
    all: ["employer"] as const,
    profile: () => [...queryKeys.employer.all, "profile"] as const,
    jobs: (params?: Record<string, unknown>) =>
      [...queryKeys.employer.all, "jobs", params] as const,
    applications: (jobId?: string) =>
      [...queryKeys.employer.all, "applications", jobId] as const,
    analytics: (jobId: string) =>
      [...queryKeys.employer.all, "analytics", jobId] as const,
  },
} as const;
