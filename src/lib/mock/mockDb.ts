// ============================================================
// MCPHire — Mock Database
// In-memory storage with transformed mockJobs
// ============================================================

import type {
  Job,
  JobListItem,
  CompanyInfo,
  AuthUser,
  Application,
  SeekerProfile,
  EmployerProfile,
  PaginationMeta,
  PaginatedResponse,
  SkillWithLevel,
  JobLevel,
  JobFormat,
  JobStatus,
  ApplicationStatus,
  Currency,
} from "@/types";
import { mockJobs, type Job as OldJob } from "@/data/mockJobs";
import { mockCompanies } from "@/data/mockCompanies";
import { mockUsers } from "@/data/mockUsers";
import { mockApplications } from "@/data/mockApplications";

// Map old company names to CompanyInfo objects
const companyMap = new Map<string, CompanyInfo>();
mockCompanies.forEach((c) => companyMap.set(c.name, c));

// Transform old Job to new Job type
function transformJob(old: OldJob): Job {
  const company = companyMap.get(old.company) || mockCompanies[0];

  // Convert string skills to SkillWithLevel[]
  const skills: SkillWithLevel[] = old.skills.map((s) => ({
    name: s,
    level: "intermediate" as const,
    required: true,
  }));

  // Map currency symbol to Currency enum
  const currencyMap: Record<string, Currency> = { "₽": "RUB", $: "USD", "€": "EUR" };
  const currency: Currency = currencyMap[old.currency] || "RUB";

  // Generate slug from title
  const slug = old.title.toLowerCase().replace(/\s+/g, "-").replace(/[^а-яёa-z0-9-]/g, "");

  // Map format string to JobFormat
  const formatMap: Record<string, JobFormat> = { Офис: "Офис", Удалённо: "Удалённо", Гибрид: "Гибрид" };
  const format: JobFormat = formatMap[old.format] || "Офис";

  // Generate some tags
  const tags = [...old.skills.slice(0, 3), old.level, format];

  return {
    id: old.id,
    title: old.title,
    slug,
    company,
    city: old.city,
    country: "Россия",
    salaryFrom: old.salaryFrom,
    salaryTo: old.salaryTo,
    currency,
    skills,
    description: old.description,
    requirements: old.requirements,
    benefits: old.benefits,
    level: old.level as JobLevel,
    format,
    employmentType: "Полная занятость",
    postedAt: old.postedAt,
    expiresAt: null,
    source: old.source,
    sourceUrl: null,
    status: "active" as JobStatus,
    viewCount: Math.floor(Math.random() * 500) + 100,
    applicationCount: Math.floor(Math.random() * 20),
    category: getCategoryFromTitle(old.title),
    tags,
    mcpIndexed: true,
  };
}

// Infer category from job title
function getCategoryFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("frontend") || t.includes("react") || t.includes("ios") || t.includes("android") || t.includes("mobile")) return "Разработка";
  if (t.includes("backend") || t.includes("python") || t.includes("java") || t.includes("go") || t.includes("node")) return "Разработка";
  if (t.includes("devops") || t.includes("sre") || t.includes("infrastructure")) return "DevOps";
  if (t.includes("data") || t.includes("ml") || t.includes("ai") || t.includes("nlp")) return "Data";
  if (t.includes("qa") || t.includes("test")) return "QA";
  if (t.includes("product") || t.includes("design")) return "Продукт";
  if (t.includes("security")) return "Безопасность";
  return "Другое";
}

// Convert Job to JobListItem
function toJobListItem(job: Job): JobListItem {
  return {
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
  };
}

// ============================================================
// In-memory database
// ============================================================

export const db = {
  // Data
  jobs: mockJobs.map(transformJob),
  companies: mockCompanies,
  users: mockUsers,
  applications: [...mockApplications],

  // Session state
  currentUser: null as AuthUser | null,
  savedJobIds: new Set<string>(),

  // Get job by ID or slug
  getJob(idOrSlug: string): Job | undefined {
    return (
      this.jobs.find((j) => j.id === idOrSlug) ||
      this.jobs.find((j) => j.slug === idOrSlug)
    );
  },

  // Get paginated and filtered job list
  getJobList(params: {
    query?: string;
    city?: string;
    level?: JobLevel[];
    format?: JobFormat[];
    skills?: string[];
    category?: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    sortBy?: "relevance" | "salary_desc" | "salary_asc" | "date_desc" | "date_asc";
    page?: number;
    perPage?: number;
  }): PaginatedResponse<JobListItem> {
    let filtered = [...this.jobs];

    // Filter by query (search in title, description, company name)
    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.company.name.toLowerCase().includes(q)
      );
    }

    // Filter by city
    if (params.city) {
      filtered = filtered.filter((j) => j.city.toLowerCase() === params.city?.toLowerCase());
    }

    // Filter by level
    if (params.level && params.level.length > 0) {
      filtered = filtered.filter((j) => params.level!.includes(j.level));
    }

    // Filter by format
    if (params.format && params.format.length > 0) {
      filtered = filtered.filter((j) => params.format!.includes(j.format));
    }

    // Filter by skills
    if (params.skills && params.skills.length > 0) {
      const skillLower = params.skills.map((s) => s.toLowerCase());
      filtered = filtered.filter((j) =>
        j.skills.some((s) => skillLower.includes(s.name.toLowerCase()))
      );
    }

    // Filter by category
    if (params.category) {
      filtered = filtered.filter((j) => j.category === params.category);
    }

    // Filter by salary
    if (params.salaryMin) {
      filtered = filtered.filter((j) => j.salaryTo && j.salaryTo >= params.salaryMin!);
    }
    if (params.salaryMax) {
      filtered = filtered.filter((j) => j.salaryFrom && j.salaryFrom <= params.salaryMax!);
    }

    // Sort
    switch (params.sortBy) {
      case "salary_desc":
        filtered.sort((a, b) => (b.salaryTo || 0) - (a.salaryTo || 0));
        break;
      case "salary_asc":
        filtered.sort((a, b) => (a.salaryFrom || 0) - (b.salaryFrom || 0));
        break;
      case "date_desc":
      default:
        filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
    }

    // Pagination
    const page = params.page || 1;
    const perPage = params.perPage || 20;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = filtered.slice(start, end).map(toJobListItem);

    const meta: PaginationMeta = {
      page,
      perPage,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / perPage),
    };

    return { data, meta };
  },

  // Get similar jobs
  getSimilarJobs(id: string, limit: number): JobListItem[] {
    const job = this.getJob(id);
    if (!job) return [];

    return this.jobs
      .filter((j) => j.id !== id && (j.category === job.category || j.level === job.level))
      .slice(0, limit)
      .map(toJobListItem);
  },

  // Get categories with counts
  getCategories(): Array<{ slug: string; name: string; count: number }> {
    const catMap = new Map<string, number>();
    this.jobs.forEach((j) => {
      catMap.set(j.category, (catMap.get(j.category) || 0) + 1);
    });
    return Array.from(catMap.entries())
      .map(([name, count]) => ({ slug: name.toLowerCase().replace(/\s+/g, "-"), name, count }))
      .sort((a, b) => b.count - a.count);
  },

  // Get cities with counts
  getCities(): Array<{ slug: string; name: string; count: number }> {
    const cityMap = new Map<string, number>();
    this.jobs.forEach((j) => {
      cityMap.set(j.city, (cityMap.get(j.city) || 0) + 1);
    });
    return Array.from(cityMap.entries())
      .map(([name, count]) => ({ slug: name.toLowerCase().replace(/\s+/g, "-"), name, count }))
      .sort((a, b) => b.count - a.count);
  },

  // Get stats
  getStats(): { total: number; cities: number; categories: number; companies: number } {
    return {
      total: this.jobs.length,
      cities: this.getCities().length,
      categories: this.getCategories().length,
      companies: this.companies.length,
    };
  },

  // Find user by email
  findUserByEmail(email: string): AuthUser | undefined {
    return this.users.find((u) => u.email === email);
  },

  // Create application
  createApplication(jobId: string, seekerId: string, coverLetter?: string): Application {
    const job = this.getJob(jobId);
    if (!job) throw new Error("Job not found");

    const application: Application = {
      id: `app-${Date.now()}`,
      jobId,
      job: {
        id: job.id,
        title: job.title,
        company: job.company,
        city: job.city,
        salaryFrom: job.salaryFrom,
        salaryTo: job.salaryTo,
        currency: job.currency,
      },
      seekerId,
      status: "new",
      coverLetter: coverLetter || null,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      employerNote: null,
      interviewDate: null,
    };

    this.applications.push(application);
    return application;
  },

  // Get seeker profile mock
  getSeekerProfile(userId: string): SeekerProfile {
    const user = this.users.find((u) => u.id === userId);
    return {
      id: `profile-${userId}`,
      userId,
      headline: "Ищу работу в IT",
      summary: "Опытный специалист сbackground в разработке",
      city: "Москва",
      country: "Россия",
      phone: "+79001234567",
      linkedinUrl: "https://linkedin.com/in/example",
      githubUrl: "https://github.com/example",
      portfolioUrl: null,
      desiredSalaryFrom: 150000,
      desiredSalaryTo: 250000,
      desiredCurrency: "RUB",
      desiredFormats: ["Удалённо", "Гибрид"],
      desiredLevels: ["Middle", "Senior"],
      availableFrom: "2026-03-15",
      skills: [
        { name: "React", level: "advanced", required: false },
        { name: "TypeScript", level: "intermediate", required: false },
        { name: "Python", level: "basic", required: false },
      ],
      experience: [
        {
          id: "exp-1",
          company: "Tech Corp",
          position: "Frontend Developer",
          startDate: "2022-01-01",
          endDate: null,
          isCurrent: true,
          description: "Разработка React-приложений",
          skills: ["React", "TypeScript"],
        },
      ],
      education: [
        {
          id: "edu-1",
          institution: "МГУ",
          degree: "Бакалавр",
          field: "Прикладная математика",
          startYear: 2018,
          endYear: 2022,
          isCurrent: false,
        },
      ],
      languages: [
        { language: "Русский", level: "native" },
        { language: "Английский", level: "B2" },
      ],
      isOpenToWork: true,
      resumeUrl: null,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2026-02-01T00:00:00Z",
    };
  },

  // Get employer profile mock
  getEmployerProfile(userId: string): EmployerProfile {
    const user = this.users.find((u) => u.id === userId);
    const company = mockCompanies[0]; // Default to first company

    return {
      id: `employer-profile-${userId}`,
      userId,
      company,
      verificationStatus: "verified",
      jobsPostedCount: 15,
      jobsActiveCount: 5,
      jobQuota: 10,
      jobQuotaUsed: 5,
      subscriptionPlan: "business",
      subscriptionExpiresAt: "2027-01-01T00:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    };
  },

  // Get applications for seeker
  getSeekerApplications(seekerId: string): Application[] {
    return this.applications.filter((a) => a.seekerId === seekerId);
  },

  // Get applications for employer (by company)
  getEmployerApplications(companyId?: string): Application[] {
    if (!companyId) return this.applications;
    return this.applications.filter(
      (a) => a.job.company.id === companyId
    );
  },

  // Update application status
  updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus,
    note?: string
  ): Application | undefined {
    const app = this.applications.find((a) => a.id === applicationId);
    if (!app) return undefined;

    app.status = status;
    app.updatedAt = new Date().toISOString();
    if (note) app.employerNote = note;

    return app;
  },

  // Save/unsave job
  saveJob(jobId: string): void {
    this.savedJobIds.add(jobId);
  },

  unsaveJob(jobId: string): void {
    this.savedJobIds.delete(jobId);
  },

  // Check if job is saved
  isJobSaved(jobId: string): boolean {
    return this.savedJobIds.has(jobId);
  },

  // Get saved jobs
  getSavedJobs(): Job[] {
    return this.jobs.filter((j) => this.savedJobIds.has(j.id));
  },
};
