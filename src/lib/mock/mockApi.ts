// ============================================================
// MCPHire — Mock API Implementation
// ============================================================

import type {
  TokenResponse,
  AuthUser,
  Job,
  JobListItem,
  SeekerProfile,
  EmployerProfile,
  Application,
  JobAnalytics,
  ApplicationStatus,
  CandidateListItem,
} from "@/types";
import { delay } from "./delay";
import { db } from "./mockDb";

// Re-export token management from real api (uses localStorage)
import {
  getAccessToken,
  setTokens as realSetTokens,
  clearTokens as realClearTokens,
} from "@/lib/api";

// ============================================================
// Error class (reuse from api.ts)
// ============================================================

class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ============================================================
// Auth API
// ============================================================

// Sprint 12 task 33 — magic-link only. Real backend uses email; the mock
// short-circuits and grants tokens immediately for the requested email so
// dev with VITE_USE_MOCKS=true can still log in without a real inbox.

const pendingMockTokens = new Map<string, string>();

export const authApi = {
  async requestMagicLink(email: string): Promise<{ sent: boolean }> {
    await delay();
    const normalized = email.trim().toLowerCase();
    let user = db.findUserByEmail(normalized);
    if (!user) {
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: normalized,
        name: normalized.split("@")[0],
        avatarUrl: null,
        role: "seeker",
        createdAt: new Date().toISOString(),
      };
      db.users.push(newUser);
      user = newUser;
    }
    // Mock magic-link token is the user id; in real backend it's a 256-bit nonce.
    pendingMockTokens.set(user.id, normalized);
    return { sent: true };
  },

  async verifyMagicLink(token: string): Promise<TokenResponse> {
    await delay();
    const email = pendingMockTokens.get(token);
    if (!email) {
      throw new ApiError(410, "GONE", "Ссылка устарела или уже использована");
    }
    pendingMockTokens.delete(token);
    const user = db.findUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "NOT_FOUND", "Пользователь не найден");
    }
    db.currentUser = user;
    const tokens: TokenResponse = {
      accessToken: `mock-token-${user.id}`,
      refreshToken: `mock-refresh-${user.id}`,
      expiresIn: 3600,
    };
    realSetTokens(tokens);
    return tokens;
  },

  async logout(): Promise<void> {
    await delay();
    db.currentUser = null;
    realClearTokens();
  },

  async refreshToken(): Promise<TokenResponse> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    const tokens: TokenResponse = {
      accessToken: `mock-token-${db.currentUser.id}-refreshed`,
      refreshToken: `mock-refresh-${db.currentUser.id}-refreshed`,
      expiresIn: 3600,
    };
    realSetTokens(tokens);
    return tokens;
  },

  async me(): Promise<AuthUser> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    return db.currentUser;
  },
};

// ============================================================
// Jobs API
// ============================================================

export type JobsQueryParams = Partial<{
  query: string;
  city: string;
  country: string;
  salaryMin: number | null;
  salaryMax: number | null;
  level: ("Junior" | "Middle" | "Senior" | "Lead")[];
  format: ("Офис" | "Удалённо" | "Гибрид")[];
  employmentType: string[];
  skills: string[];
  category: string;
  sortBy: "relevance" | "salary_desc" | "salary_asc" | "date_desc" | "date_asc";
  page: number;
  perPage: number;
  directOnly: boolean;
}>;

export const jobsApi = {
  async list(params: JobsQueryParams = {}): Promise<{ data: JobListItem[]; meta: any }> {
    await delay();
    return db.getJobList(params);
  },

  async get(idOrSlug: string): Promise<Job> {
    await delay();
    const job = db.getJob(idOrSlug);
    if (!job) {
      throw new ApiError(404, "NOT_FOUND", "Вакансия не найдена");
    }
    return job;
  },

  async similar(id: string, limit = 3): Promise<JobListItem[]> {
    await delay();
    return db.getSimilarJobs(id, limit);
  },

  async save(id: string): Promise<void> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    db.saveJob(id);
  },

  async unsave(id: string): Promise<void> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    db.unsaveJob(id);
  },

  async savedList(): Promise<JobListItem[]> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    return db.getSavedJobs().map((job) => ({
      id: job.id,
      title: job.title,
      slug: job.slug,
      company: {
        id: job.company.id,
        name: job.company.name,
        logoUrl: job.company.logoUrl,
        isVerified: job.company.isVerified,
        brandColor: job.company.brandColor,
      },
      city: job.city,
      country: job.country,
      salaryFrom: job.salaryFrom,
      salaryTo: job.salaryTo,
      currency: job.currency,
      skills: job.skills.map((s) => s.name),
      level: job.level,
      format: job.format,
      postedAt: job.postedAt,
      status: job.status,
      category: job.category,
    }));
  },

  async apply(id: string, coverLetter?: string): Promise<Application> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    if (db.currentUser.role !== "seeker") {
      throw new ApiError(403, "FORBIDDEN", "Only seekers can apply to jobs");
    }
    return db.createApplication(id, db.currentUser.id, coverLetter);
  },

  async categories(): Promise<Array<{ slug: string; name: string; count: number }>> {
    await delay();
    return db.getCategories();
  },

  async cities(): Promise<Array<{ slug: string; name: string; count: number }>> {
    await delay();
    return db.getCities();
  },

  async stats(): Promise<{ totalJobs: number; citiesCount: number; categoriesCount: number; companiesCount: number }> {
    await delay();
    return db.getStats();
  },
};

// ============================================================
// Candidates API (public catalog mock — no auth, no PII)
// ============================================================

export type CandidatesQueryParams = Partial<{
  stack: string;
  seniority: string;
  timezone: string;
  limit: number;
}>;

const mockCandidates: CandidateListItem[] = [
  {
    profileIdMasked: "cand-8f21",
    displayName: "Кандидат #8f21",
    headline: "Senior Backend Engineer, Python/Go",
    cvUrl: "https://mock-mcphire.com/cv/8f21.pdf",
    stackSummary: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    seniority: "senior",
    timezone: "UTC+3",
    intentHorizon: "2 недели",
  },
  {
    profileIdMasked: "cand-3a90",
    displayName: "Кандидат #3a90",
    headline: "Frontend / React specialist",
    cvUrl: "https://mock-mcphire.com/cv/3a90.pdf",
    stackSummary: ["React", "TypeScript", "Next.js"],
    seniority: "middle",
    timezone: "UTC+4",
    intentHorizon: "1 месяц",
  },
  {
    profileIdMasked: "cand-c114",
    displayName: "Кандидат #c114",
    headline: "DevOps / SRE, Kubernetes",
    cvUrl: "https://mock-mcphire.com/cv/c114.pdf",
    stackSummary: ["Kubernetes", "Terraform", "AWS"],
    seniority: "staff",
    timezone: "UTC+2",
    intentHorizon: "сразу",
  },
];

export const candidatesApi = {
  async list(
    params: CandidatesQueryParams = {}
  ): Promise<{ candidates: CandidateListItem[]; count: number }> {
    await delay();
    let filtered = [...mockCandidates];

    if (params.stack) {
      const wanted = params.stack.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      if (wanted.length) {
        filtered = filtered.filter((c) =>
          c.stackSummary.some((s) => wanted.includes(s.toLowerCase()))
        );
      }
    }
    if (params.seniority) {
      filtered = filtered.filter(
        (c) => c.seniority.toLowerCase() === params.seniority!.toLowerCase()
      );
    }
    if (params.timezone) {
      filtered = filtered.filter((c) => c.timezone === params.timezone);
    }

    const limit = params.limit ?? filtered.length;
    return { candidates: filtered.slice(0, limit), count: filtered.length };
  },
};

// ============================================================
// Seeker API
// ============================================================

export const seekerApi = {
  async profile(): Promise<SeekerProfile> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    if (db.currentUser.role !== "seeker") {
      throw new ApiError(403, "FORBIDDEN", "Only seekers have profiles");
    }
    return db.getSeekerProfile(db.currentUser.id);
  },

  async updateProfile(data: Partial<SeekerProfile>): Promise<SeekerProfile> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    // In mock, just return updated profile
    return { ...db.getSeekerProfile(db.currentUser.id), ...data };
  },

  async applications(): Promise<Application[]> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    if (db.currentUser.role !== "seeker") {
      throw new ApiError(403, "FORBIDDEN", "Only seekers have applications");
    }
    return db.getSeekerApplications(db.currentUser.id);
  },

  async uploadResume(file: File): Promise<{ url: string }> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    // Mock URL
    return { url: `https://mock-mcphire.com/resumes/${file.name}` };
  },
};

// ============================================================
// Employer API
// ============================================================

export type CreateJobPayload = {
  title: string;
  companyId: string;
  city: string;
  country: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  currency: "RUB" | "USD" | "EUR" | "AED";
  skills: Array<{ name: string; level: "basic" | "intermediate" | "advanced" | "expert"; required: boolean }>;
  description: string;
  requirements: string[];
  benefits: string[];
  level: "Junior" | "Middle" | "Senior" | "Lead";
  format: "Офис" | "Удалённо" | "Гибрид";
  employmentType: "Полная занятость" | "Частичная занятость" | "Проект" | "Стажировка";
  expiresAt: string | null;
  source: string | null;
  sourceUrl: string | null;
  category: string;
  tags: string[];
};

export const employerApi = {
  async profile(): Promise<EmployerProfile> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    if (db.currentUser.role !== "employer") {
      throw new ApiError(403, "FORBIDDEN", "Only employers have profiles");
    }
    return db.getEmployerProfile(db.currentUser.id);
  },

  async updateProfile(data: Partial<EmployerProfile>): Promise<EmployerProfile> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    return { ...db.getEmployerProfile(db.currentUser.id), ...data };
  },

  async jobs(params: { status?: string; page?: number } = {}): Promise<{ data: JobListItem[]; meta: any }> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    // Return mock jobs - in real would filter by employer
    return db.getJobList({ page: params.page, perPage: 20 });
  },

  async createJob(data: CreateJobPayload): Promise<Job> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    // Mock - just return a created job
    const company = db.companies.find((c) => c.id === data.companyId) || db.companies[0];
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      company,
      city: data.city,
      country: data.country,
      salaryFrom: data.salaryFrom,
      salaryTo: data.salaryTo,
      currency: data.currency,
      skills: data.skills,
      description: data.description,
      requirements: data.requirements,
      benefits: data.benefits,
      level: data.level,
      format: data.format,
      employmentType: data.employmentType,
      postedAt: new Date().toISOString(),
      expiresAt: data.expiresAt,
      source: data.source,
      sourceUrl: data.sourceUrl,
      status: "active",
      viewCount: 0,
      applicationCount: 0,
      category: data.category,
      tags: data.tags,
      mcpIndexed: false,
    };
    db.jobs.push(newJob);
    return newJob;
  },

  async updateJob(id: string, data: Partial<CreateJobPayload>): Promise<Job> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    const job = db.getJob(id);
    if (!job) {
      throw new ApiError(404, "NOT_FOUND", "Job not found");
    }
    return { ...job, ...data };
  },

  async deleteJob(id: string): Promise<void> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    const index = db.jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      throw new ApiError(404, "NOT_FOUND", "Job not found");
    }
    db.jobs.splice(index, 1);
  },

  async applications(jobId?: string): Promise<Application[]> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    if (jobId) {
      return db.applications.filter((a) => a.jobId === jobId);
    }
    return db.getEmployerApplications();
  },

  async updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus,
    note?: string
  ): Promise<Application> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    const updated = db.updateApplicationStatus(applicationId, status, note);
    if (!updated) {
      throw new ApiError(404, "NOT_FOUND", "Application not found");
    }
    return updated;
  },

  async analytics(jobId: string): Promise<JobAnalytics> {
    await delay();
    if (!db.currentUser) {
      throw new ApiError(401, "UNAUTHORIZED", "Not authenticated");
    }
    const job = db.getJob(jobId);
    if (!job) {
      throw new ApiError(404, "NOT_FOUND", "Job not found");
    }
    // Return mock analytics
    return {
      jobId,
      viewCount: job.viewCount,
      uniqueViewCount: Math.floor(job.viewCount * 0.7),
      applicationCount: job.applicationCount,
      conversionRate: job.viewCount > 0 ? (job.applicationCount / job.viewCount) * 100 : 0,
      viewsByDay: [
        { date: "2026-02-27", count: 45 },
        { date: "2026-02-26", count: 38 },
        { date: "2026-02-25", count: 52 },
      ],
      applicationsByDay: [
        { date: "2026-02-27", count: 3 },
        { date: "2026-02-26", count: 2 },
        { date: "2026-02-25", count: 5 },
      ],
      topSourceCities: [
        { city: "Москва", count: 120 },
        { city: "Санкт-Петербург", count: 85 },
        { city: "Новосибирск", count: 42 },
      ],
      topSkillMatches: [
        { skill: "React", count: 45 },
        { skill: "TypeScript", count: 38 },
        { skill: "Node.js", count: 25 },
      ],
    };
  },
};

// ============================================================
// Re-export utilities
// ============================================================

export { getAccessToken, clearTokens };
export { ApiError };
