// ============================================================
// СБОРКА — Mock API Implementation
// ============================================================

import type {
  LoginCredentials,
  RegisterCredentials,
  TelegramAuthData,
  TokenResponse,
  AuthUser,
  Job,
  JobListItem,
  SeekerProfile,
  EmployerProfile,
  Application,
  JobAnalytics,
  ApplicationStatus,
} from "@/types";
import { delay } from "./delay";
import { db } from "./mockDb";
import { MOCK_CREDENTIAL } from "@/data/mockUsers";

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

export const authApi = {
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    await delay();
    const user = db.findUserByEmail(credentials.email);

    // Check password (for mock, accept any password for existing users, or "password123")
    if (!user) {
      throw new ApiError(401, "INVALID_CREDENTIALS", "Неверный email или пароль");
    }

    if (credentials.password !== MOCK_CREDENTIAL) {
      throw new ApiError(401, "INVALID_CREDENTIALS", "Неверный email или пароль");
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

  async register(credentials: RegisterCredentials): Promise<TokenResponse> {
    await delay();

    // Check if user already exists
    const existing = db.findUserByEmail(credentials.email);
    if (existing) {
      throw new ApiError(400, "EMAIL_EXISTS", "Пользователь с таким email уже существует");
    }

    // Create new user
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      telegramId: null,
      telegramUsername: null,
      name: credentials.name,
      avatarUrl: null,
      role: "seeker",
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    db.currentUser = newUser;

    const tokens: TokenResponse = {
      accessToken: `mock-token-${newUser.id}`,
      refreshToken: `mock-refresh-${newUser.id}`,
      expiresIn: 3600,
    };
    realSetTokens(tokens);
    return tokens;
  },

  async loginWithTelegram(data: TelegramAuthData): Promise<TokenResponse> {
    await delay();

    // Find existing user or create new one
    let user = db.users.find((u) => u.telegramId === String(data.id));

    if (!user) {
      // Create new user from Telegram data
      user = {
        id: `tg-${data.id}`,
        email: null,
        telegramId: String(data.id),
        telegramUsername: data.username || null,
        name: [data.first_name, data.last_name].filter(Boolean).join(" "),
        avatarUrl: data.photo_url || null,
        role: "seeker",
        emailVerified: true,
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
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

  async stats(): Promise<{ total: number; cities: number; categories: number; companies: number }> {
    await delay();
    return db.getStats();
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
    return { url: `https://mock-sborka.work/resumes/${file.name}` };
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
