// ============================================================
// MCPHire — Shared TypeScript Types
// ============================================================

// ------ Auth ------------------------------------------------

export type UserRole = "seeker" | "employer" | "admin";

export interface AuthUser {
  id: string;
  email: string | null;
  telegramId: string | null;
  telegramUsername: string | null;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ------ Jobs ------------------------------------------------

export type JobLevel = "Junior" | "Middle" | "Senior" | "Lead";
export type JobFormat = "Офис" | "Удалённо" | "Гибрид";
export type EmploymentType = "Полная занятость" | "Частичная занятость" | "Проект" | "Стажировка";
export type JobStatus = "active" | "closed" | "draft" | "paused";
export type ApplicationStatus = "new" | "viewed" | "interview" | "offer" | "hired" | "rejected";
export type Currency = "RUB" | "USD" | "EUR" | "AED";

export interface SkillWithLevel {
  name: string;
  level: "basic" | "intermediate" | "advanced" | "expert";
  required: boolean;
}

export interface CompanyInfo {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
  industry: string;
  size: string;
  city: string;
  description: string | null;
  isVerified: boolean;
  brandColor: string | null;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  company: CompanyInfo;
  city: string;
  country: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  currency: Currency;
  skills: SkillWithLevel[];
  description: string;
  requirements: string[];
  benefits: string[];
  level: JobLevel;
  format: JobFormat;
  employmentType: EmploymentType;
  postedAt: string;
  expiresAt: string | null;
  source: string | null;
  sourceUrl: string | null;
  status: JobStatus;
  viewCount: number;
  applicationCount: number;
  category: string;
  tags: string[];
  mcpIndexed: boolean;
  isPremium: boolean;
  responseLetterRequired: boolean;
}

export interface JobListItem {
  id: string;
  title: string;
  slug: string;
  company: Pick<CompanyInfo, "id" | "name" | "logoUrl" | "isVerified" | "brandColor">;
  city: string;
  country: string;
  salaryFrom: number | null;
  salaryTo: number | null;
  currency: Currency;
  skills: string[];
  level: JobLevel;
  format: JobFormat;
  postedAt: string;
  status: JobStatus;
  category: string;
  isPremium?: boolean;
}

// ------ Search & Filters ------------------------------------

export interface JobFilters {
  query: string;
  city: string;
  country: string;
  salaryMin: number | null;
  salaryMax: number | null;
  level: JobLevel[];
  format: JobFormat[];
  employmentType: EmploymentType[];
  skills: string[];
  category: string;
  sortBy: "relevance" | "salary_desc" | "salary_asc" | "date_desc" | "date_asc";
}

export type PartialJobFilters = Partial<JobFilters>;

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ------ Resume / Seeker Profile ----------------------------

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | null;
  isCurrent: boolean;
}

export interface LanguageEntry {
  language: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";
}

export interface SeekerProfile {
  id: string;
  userId: string;
  headline: string;
  summary: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  desiredSalaryFrom: number | null;
  desiredSalaryTo: number | null;
  desiredCurrency: Currency;
  desiredFormats: JobFormat[];
  desiredLevels: JobLevel[];
  availableFrom: string | null;
  skills: SkillWithLevel[];
  experience: WorkExperience[];
  education: Education[];
  languages: LanguageEntry[];
  isOpenToWork: boolean;
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// ------ Applications ----------------------------------------

export interface Application {
  id: string;
  jobId: string;
  job: Pick<Job, "id" | "title" | "company" | "city" | "salaryFrom" | "salaryTo" | "currency">;
  seekerId: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  appliedAt: string;
  updatedAt: string;
  employerNote: string | null;
  interviewDate: string | null;
}

// ------ Employer Dashboard ----------------------------------

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export interface EmployerProfile {
  id: string;
  userId: string;
  company: CompanyInfo;
  verificationStatus: VerificationStatus;
  jobsPostedCount: number;
  jobsActiveCount: number;
  jobQuota: number;
  jobQuotaUsed: number;
  subscriptionPlan: "free" | "starter" | "business" | "pro" | null;
  subscriptionExpiresAt: string | null;
  createdAt: string;
}

export interface JobAnalytics {
  jobId: string;
  viewCount: number;
  uniqueViewCount: number;
  applicationCount: number;
  conversionRate: number;
  viewsByDay: Array<{ date: string; count: number }>;
  applicationsByDay: Array<{ date: string; count: number }>;
  topSourceCities: Array<{ city: string; count: number }>;
  topSkillMatches: Array<{ skill: string; count: number }>;
}

// ------ i18n ------------------------------------------------

export type Locale = "ru" | "en" | "ar" | "hi";

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  dateFormat: string;
  currencySymbol: string;
}

// ------ API Responses ---------------------------------------

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: ApiError;
}

// ------ UI --------------------------------------------------

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
}
