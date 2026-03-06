// ============================================================
// MCPHire — Company Detail Page
// Route: /companies/:slug
// ============================================================

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { JobCard } from "@/components/JobCard";
import type { JobListItem, CompanyInfo } from "@/types";

// ---- Mock data ---------------------------------------------

interface CompanyDetail {
  slug: string;
  name: string;
  industry: string;
  size: string;
  website: string | null;
  description: string;
  city: string;
  isVerified: boolean;
  foundedYear?: number;
}

const MOCK_COMPANIES: Record<string, CompanyDetail> = {
  yandex: {
    slug: "yandex",
    name: "Яндекс",
    industry: "IT / Технологии",
    size: "10 000+ сотрудников",
    website: "https://yandex.ru",
    description:
      "Яндекс — российская технологическая компания, разрабатывающая интеллектуальные продукты и сервисы на основе машинного обучения. Компания работает в сферах поиска, электронной коммерции, транспорта, навигации, мобильных приложений, онлайн-рекламы и других услуг.",
    city: "Москва",
    isVerified: true,
    foundedYear: 1997,
  },
  sber: {
    slug: "sber",
    name: "Сбер",
    industry: "Финтех / Банки",
    size: "250 000+ сотрудников",
    website: "https://sberbank.ru",
    description:
      "Сбер — крупнейший банк России и один из ведущих мировых финансовых институтов. Компания активно развивает экосистему цифровых продуктов и сервисов на основе искусственного интеллекта.",
    city: "Москва",
    isVerified: true,
    foundedYear: 1841,
  },
  vk: {
    slug: "vk",
    name: "VK",
    industry: "IT / Социальные сети",
    size: "5 000+ сотрудников",
    website: "https://vk.company",
    description:
      "VK — ведущая технологическая компания России, развивающая крупнейшую социальную сеть страны, а также облачные сервисы, образовательные платформы и игровые продукты.",
    city: "Москва",
    isVerified: true,
    foundedYear: 2006,
  },
  ozon: {
    slug: "ozon",
    name: "Ozon",
    industry: "E-commerce",
    size: "7 000+ сотрудников",
    website: "https://ozon.ru",
    description:
      "Ozon — один из крупнейших маркетплейсов России. Компания строит технологическую платформу, включающую логистику, финтех, рекламные технологии и продуктовую разработку.",
    city: "Москва",
    isVerified: true,
    foundedYear: 1998,
  },
};

// ---- Mock jobs per company ---------------------------------

const MOCK_JOBS: Record<string, JobListItem[]> = {
  yandex: [
    {
      id: "101",
      title: "Senior Frontend Engineer",
      slug: "senior-frontend-engineer-yandex",
      company: { id: "c1", name: "Яндекс", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 350000,
      salaryTo: 500000,
      currency: "RUB",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      level: "Senior",
      format: "Гибрид",
      postedAt: "2026-02-20T10:00:00Z",
      status: "active",
      category: "frontend",
    },
    {
      id: "102",
      title: "Machine Learning Engineer",
      slug: "ml-engineer-yandex",
      company: { id: "c1", name: "Яндекс", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 400000,
      salaryTo: 600000,
      currency: "RUB",
      skills: ["Python", "PyTorch", "MLOps", "CUDA"],
      level: "Senior",
      format: "Офис",
      postedAt: "2026-02-22T10:00:00Z",
      status: "active",
      category: "ml",
    },
    {
      id: "103",
      title: "Product Manager — Поиск",
      slug: "pm-search-yandex",
      company: { id: "c1", name: "Яндекс", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 300000,
      salaryTo: 450000,
      currency: "RUB",
      skills: ["Product Strategy", "A/B Testing", "SQL", "Analytics"],
      level: "Middle",
      format: "Гибрид",
      postedAt: "2026-02-25T10:00:00Z",
      status: "active",
      category: "product",
    },
  ],
  sber: [
    {
      id: "201",
      title: "Backend Developer (Go)",
      slug: "backend-go-sber",
      company: { id: "c2", name: "Сбер", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 250000,
      salaryTo: 380000,
      currency: "RUB",
      skills: ["Go", "Kubernetes", "PostgreSQL", "Kafka"],
      level: "Middle",
      format: "Гибрид",
      postedAt: "2026-02-18T10:00:00Z",
      status: "active",
      category: "backend",
    },
    {
      id: "202",
      title: "Data Engineer",
      slug: "data-engineer-sber",
      company: { id: "c2", name: "Сбер", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 280000,
      salaryTo: 400000,
      currency: "RUB",
      skills: ["Spark", "Airflow", "ClickHouse", "Python"],
      level: "Senior",
      format: "Офис",
      postedAt: "2026-02-24T10:00:00Z",
      status: "active",
      category: "data",
    },
  ],
  vk: [
    {
      id: "301",
      title: "iOS Developer",
      slug: "ios-developer-vk",
      company: { id: "c3", name: "VK", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 270000,
      salaryTo: 420000,
      currency: "RUB",
      skills: ["Swift", "SwiftUI", "Combine", "CoreData"],
      level: "Senior",
      format: "Гибрид",
      postedAt: "2026-02-26T10:00:00Z",
      status: "active",
      category: "mobile",
    },
  ],
  ozon: [
    {
      id: "401",
      title: "Lead Backend Engineer",
      slug: "lead-backend-ozon",
      company: { id: "c4", name: "Ozon", logoUrl: null, isVerified: true, brandColor: null },
      city: "Москва",
      country: "RU",
      salaryFrom: 400000,
      salaryTo: 580000,
      currency: "RUB",
      skills: ["Go", "gRPC", "PostgreSQL", "Redis"],
      level: "Lead",
      format: "Удалённо",
      postedAt: "2026-02-27T10:00:00Z",
      status: "active",
      category: "backend",
    },
  ],
};

// ---- Color helpers (same as JobCard) -----------------------

const companyColors: Record<string, { bg: string; text: string }> = {
  "Яндекс":    { bg: "#fc0",    text: "#000" },
  "МТС":       { bg: "#e30611", text: "#fff" },
  "Сбер":      { bg: "#21a038", text: "#fff" },
  "Тинькофф":  { bg: "#ffdd2d", text: "#333" },
  VK:          { bg: "#0077ff", text: "#fff" },
  Ozon:        { bg: "#005bff", text: "#fff" },
  Wildberries: { bg: "#cb11ab", text: "#fff" },
  Авито:       { bg: "#00aaff", text: "#fff" },
  Lamoda:      { bg: "#000",    text: "#fff" },
  Kaspersky:   { bg: "#006d5c", text: "#fff" },
};

function getCompanyBg(name: string): string {
  return companyColors[name]?.bg ?? "#e6f5ee";
}

function getCompanyText(name: string): string {
  return companyColors[name]?.text ?? "#1b6b52";
}

// ---- Page --------------------------------------------------

const CompanyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const company = slug ? MOCK_COMPANIES[slug] ?? null : null;
  const jobs = slug ? (MOCK_JOBS[slug] ?? []) : [];

  // Not found state
  if (!company) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Компания не найдена | MCPHire Вакансии</title>
        </Helmet>
        <JobBoardNavbar />
        <section className="section-white">
          <div className="section-container">
            <h1 className="heading-xl mb-4">Компания не найдена</h1>
            <p className="text-muted-foreground mb-6">
              К сожалению, страница компании с таким адресом не существует.
            </p>
            <Link to="/jobs" className="cta-text">
              ← Все вакансии
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const metaDescription = `${company.name} — ${company.industry}. ${company.city}. ${jobs.length} открытых вакансий. ${company.description.slice(0, 120)}`;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{company.name} — вакансии | MCPHire</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${company.name} — вакансии на MCPHire`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://mcphire.com/companies/${company.slug}`} />
        <link rel="canonical" href={`https://mcphire.com/companies/${company.slug}`} />
      </Helmet>

      <JobBoardNavbar />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="py-4 text-sm text-muted-foreground flex items-center gap-2">
          <Link to="/jobs" className="hover:text-primary transition-colors">
            Вакансии
          </Link>
          <span>/</span>
          <span className="text-foreground">{company.name}</span>
        </nav>

        {/* Company Header */}
        <div className="flex items-start gap-6 pb-8 flex-wrap">
          {/* Logo */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-extrabold text-3xl shrink-0"
            style={{ background: getCompanyBg(company.name), color: getCompanyText(company.name) }}
          >
            {company.name[0]}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-[240px]">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-3xl font-extrabold tracking-tight">{company.name}</h1>
              {company.isVerified && (
                <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                  ✓ Верифицирован
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-3">{company.description}</p>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary font-medium hover:underline"
              >
                {company.website.replace(/^https?:\/\//, "")} ↗
              </a>
            )}
          </div>
        </div>

        {/* Two-column Layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 pb-12">

          {/* Jobs list */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Открытые вакансии
              <span
                className="ml-2 text-base font-mono font-semibold text-primary"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ({jobs.length})
              </span>
            </h2>

            {jobs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} showMatchScore={false} />
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
                <p className="font-medium mb-1">Вакансий пока нет</p>
                <p className="text-sm">Проверьте позже или посмотрите другие компании.</p>
                <Link to="/jobs" className="mt-4 inline-block text-primary text-sm font-medium hover:underline">
                  Все вакансии →
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar — company details */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
              <h4 className="font-bold text-sm mb-3">О компании</h4>
              <ul className="space-y-0">
                {[
                  { label: "Индустрия",   value: company.industry },
                  { label: "Размер",      value: company.size },
                  { label: "Город",       value: company.city },
                  ...(company.foundedYear
                    ? [{ label: "Основана", value: String(company.foundedYear) }]
                    : []),
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex justify-between py-2.5 text-sm border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-right">{item.value}</span>
                  </li>
                ))}
              </ul>

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center px-4 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  Сайт компании ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CompanyDetailPage;
