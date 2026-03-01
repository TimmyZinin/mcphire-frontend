// ============================================================
// СБОРКА — API Client
// Base URL: api.sborka.work/v1
// ============================================================

import type {
  ApiResponse,
  AuthUser,
  TokenResponse,
  LoginCredentials,
  RegisterCredentials,
  TelegramAuthData,
  Job,
  JobListItem,
  JobFilters,
  PaginatedResponse,
  SeekerProfile,
  Application,
  EmployerProfile,
  JobAnalytics,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://api.sborka.work/v1";

// ---- Internal fetch wrapper --------------------------------

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | string[] | null | undefined>;
}

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

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) continue;
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  const token = getAccessToken();

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": getLocale(),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
    credentials: "include",
  });

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  const json = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !json.success) {
    throw new ApiError(
      response.status,
      json.error?.code ?? "UNKNOWN",
      json.error?.message ?? "An unexpected error occurred",
      json.error?.details
    );
  }

  return json.data;
}

// ---- Token management (localStorage) ----------------------

const TOKEN_KEY = "sborka_access_token";
const REFRESH_KEY = "sborka_refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokens(tokens: TokenResponse): void {
  localStorage.setItem(TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// ---- Locale helper -----------------------------------------

function getLocale(): string {
  return localStorage.getItem("sborka_locale") ?? navigator.language ?? "ru";
}

// ============================================================
// AUTH ENDPOINTS
// ============================================================

export const authApi = {
  login: (credentials: LoginCredentials) =>
    request<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (credentials: RegisterCredentials) =>
    request<TokenResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  loginWithTelegram: (data: TelegramAuthData) =>
    request<TokenResponse>("/auth/telegram", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request<void>("/auth/logout", { method: "POST" }),

  refreshToken: () => {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    return request<TokenResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  me: () => request<AuthUser>("/auth/me"),
};

// ============================================================
// JOBS ENDPOINTS
// ============================================================

export type JobsQueryParams = Partial<JobFilters> & {
  page?: number;
  perPage?: number;
};

export const jobsApi = {
  list: (params: JobsQueryParams = {}) =>
    request<PaginatedResponse<JobListItem>>("/jobs", { params: params as Record<string, string | number | boolean | string[] | null | undefined> }),

  get: (idOrSlug: string) =>
    request<Job>(`/jobs/${idOrSlug}`),

  similar: (id: string, limit = 3) =>
    request<JobListItem[]>(`/jobs/${id}/similar`, { params: { limit } }),

  save: (id: string) =>
    request<void>(`/jobs/${id}/save`, { method: "POST" }),

  unsave: (id: string) =>
    request<void>(`/jobs/${id}/save`, { method: "DELETE" }),

  savedList: () =>
    request<JobListItem[]>("/jobs/saved"),

  apply: (id: string, coverLetter?: string) =>
    request<Application>(`/jobs/${id}/apply`, {
      method: "POST",
      body: JSON.stringify({ coverLetter }),
    }),

  categories: () =>
    request<Array<{ slug: string; name: string; count: number }>>("/jobs/categories"),

  cities: () =>
    request<Array<{ slug: string; name: string; count: number }>>("/jobs/cities"),

  stats: () =>
    request<{ total: number; cities: number; categories: number; companies: number }>("/jobs/stats"),
};

// ============================================================
// SEEKER PROFILE ENDPOINTS
// ============================================================

export const seekerApi = {
  profile: () => request<SeekerProfile>("/seeker/profile"),

  updateProfile: (data: Partial<SeekerProfile>) =>
    request<SeekerProfile>("/seeker/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  applications: () => request<Application[]>("/seeker/applications"),

  uploadResume: (file: File) => {
    const form = new FormData();
    form.append("resume", file);
    return request<{ url: string }>("/seeker/resume", {
      method: "POST",
      body: form,
      headers: {},
    });
  },
};

// ============================================================
// EMPLOYER ENDPOINTS
// ============================================================

export type CreateJobPayload = Omit<Job, "id" | "slug" | "company" | "viewCount" | "applicationCount" | "postedAt" | "status" | "mcpIndexed"> & {
  companyId: string;
};

export const employerApi = {
  profile: () => request<EmployerProfile>("/employer/profile"),

  updateProfile: (data: Partial<EmployerProfile>) =>
    request<EmployerProfile>("/employer/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  jobs: (params: { status?: string; page?: number } = {}) =>
    request<PaginatedResponse<JobListItem>>("/employer/jobs", { params }),

  createJob: (data: CreateJobPayload) =>
    request<Job>("/employer/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateJob: (id: string, data: Partial<CreateJobPayload>) =>
    request<Job>(`/employer/jobs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteJob: (id: string) =>
    request<void>(`/employer/jobs/${id}`, { method: "DELETE" }),

  applications: (jobId?: string) =>
    request<Application[]>("/employer/applications", {
      params: jobId ? { jobId } : undefined,
    }),

  updateApplicationStatus: (applicationId: string, status: Application["status"], note?: string) =>
    request<Application>(`/employer/applications/${applicationId}`, {
      method: "PATCH",
      body: JSON.stringify({ status, employerNote: note }),
    }),

  analytics: (jobId: string) =>
    request<JobAnalytics>(`/employer/jobs/${jobId}/analytics`),
};

export { ApiError };
