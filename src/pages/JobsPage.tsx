import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useJobs, useJobStats } from "@/hooks/useJobs";
import { useJobFilters } from "@/hooks/useJobFilters";
import { cityMap, categoryMap } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";
import { JobCard, SkeletonGrid } from "@/components/JobCard";

const JobsPage = () => {
  const { filters, page, setFilters, toggleArrayFilter, activeFilterCount } = useJobFilters();

  // Salary options for chips
  const salaryOptions = [
    { label: "от 150K", value: 150000 },
    { label: "от 250K", value: 250000 },
    { label: "от 400K", value: 400000 },
  ];

  // Sort options
  const sortOptions = [
    { key: "relevance", label: "По релевантности" },
    { key: "salary", label: "По зарплате" },
    { key: "date", label: "По дате" },
  ];

  // Fetch jobs with filters from API
  const { data, isLoading, isError } = useJobs({
    query: filters.query || undefined,
    city: filters.city || undefined,
    level: filters.level.length ? filters.level : undefined,
    format: filters.format.length ? filters.format : undefined,
    salaryMin: filters.salaryMin || undefined,
    salaryMax: filters.salaryMax || undefined,
    category: filters.category || undefined,
    sortBy: filters.sortBy,
    page,
    perPage: 12,
  });

  // Fetch stats
  const { data: stats } = useJobStats();

  // Build active filters list
  const activeFilters = useMemo(() => {
    const items: { label: string; remove: () => void }[] = [];
    filters.format.forEach((f) => {
      items.push({ label: f, remove: () => toggleArrayFilter("format", f) });
    });
    filters.level.forEach((l) => {
      items.push({ label: l, remove: () => toggleArrayFilter("level", l) });
    });
    if (filters.salaryMin) {
      const opt = salaryOptions.find((o) => o.value === filters.salaryMin);
      if (opt) {
        items.push({ label: opt.label, remove: () => setFilters({ salaryMin: null }) });
      }
    }
    if (filters.city) {
      items.push({ label: filters.city, remove: () => setFilters({ city: "" }) });
    }
    return items;
  }, [filters, toggleArrayFilter, setFilters]);

  // Chip class helper
  const chipClass = (active: boolean): string => {
    if (active) {
      return "inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-primary text-white border border-primary cursor-pointer transition-colors";
    }
    return "inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-card border border-border text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition-colors";
  };

  // Sort class helper
  const sortClass = (active: boolean): string => {
    if (active) {
      return "px-3 py-1.5 rounded-full text-sm font-semibold text-primary bg-primary/10 cursor-pointer";
    }
    return "px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors";
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get data from response
  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPages || 1;
  const currentPage = data?.meta?.page || 1;

  const startIndex = (currentPage - 1) * 12 + 1;
  const endIndex = Math.min(currentPage * 12, totalJobs);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>IT-вакансии в России 2026 | СБОРКА</title>
        <meta name="description" content="Актуальные IT-вакансии на российском рынке. Frontend, Backend, DevOps, QA, Product Manager и другие роли. Фильтр по городу, навыкам, зарплате." />
        <link rel="canonical" href="https://sborka.work/jobs" />
        <meta property="og:title" content="IT-вакансии в России 2026" />
        <meta property="og:description" content="Актуальные IT-вакансии: Frontend, Backend, DevOps, QA, PM. Фильтр по городу и зарплате." />
        <meta property="og:url" content="https://sborka.work/jobs" />
      </Helmet>

      <JobBoardNavbar />
      <TopBanner utmSource="jobs" />

      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-8 pt-10 pb-4">
        <h1 className="heading-lg">Вакансии</h1>
        <p className="text-muted-foreground mt-1">{totalJobs} вакансий в IT</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>{stats?.total || 0} вакансий</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>{stats?.cities || 0} городов</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>{stats?.categories || 0} специализаций</span>
        </div>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl py-4 border-b border-border/50">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-center bg-card border-2 border-border rounded-3xl px-2 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input
              type="text"
              placeholder="Должность, навыки или компания..."
              value={filters.query}
              onChange={(e) => setFilters({ query: e.target.value, page: 1 })}
              className="flex-1 px-4 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <div className="w-px h-7 bg-border mx-1" />
            <select
              value={filters.city}
              onChange={(e) => setFilters({ city: e.target.value, page: 1 })}
              className="px-3 py-2 bg-transparent outline-none text-foreground cursor-pointer"
            >
              <option value="">Вся Россия</option>
              {Object.entries(cityMap).map(([slug, name]) => (
                <option key={slug} value={name}>{name}</option>
              ))}
            </select>
            <button
              onClick={() => setFilters({ page: 1 })}
              className="ml-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0"
            >
              Найти
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-[1280px] mx-auto px-8 py-4">
        {/* Filter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Format chips */}
          {["Удалённо", "Офис", "Гибрид"].map((f) => (
            <button
              key={f}
              onClick={() => toggleArrayFilter("format", f)}
              className={chipClass(filters.format.includes(f))}
            >
              {f}
            </button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          {/* Salary chips */}
          {salaryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilters({ salaryMin: filters.salaryMin === opt.value ? null : opt.value, page: 1 });
              }}
              className={chipClass(filters.salaryMin === opt.value)}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          {/* Level chips */}
          {["Junior", "Middle", "Senior", "Lead"].map((l) => (
            <button
              key={l}
              onClick={() => toggleArrayFilter("level", l)}
              className={chipClass(filters.level.includes(l))}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeFilters.map((f, idx) => (
              <span
                key={idx}
                onClick={f.remove}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
              >
                {f.label} <span className="opacity-70">×</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sort + Results */}
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex gap-1">
            {sortOptions.map((s) => (
              <button
                key={s.key}
                onClick={() => setFilters({ sortBy: s.key as any, page: 1 })}
                className={sortClass(filters.sortBy === s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {isLoading ? "Загрузка..." : `Показано ${startIndex}–${endIndex} из ${totalJobs}`}
          </span>
        </div>

        <CareerClubBanner variant="inline" utmSource="jobs" />

        {/* Jobs Grid */}
        {isLoading ? (
          <SkeletonGrid count={12} />
        ) : isError ? (
          <div className="text-center py-12 text-muted-foreground">
            Ошибка при загрузке вакансий. Попробуйте обновить страницу.
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Вакансии не найдены. Попробуйте изменить параметры поиска.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 pb-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
            >
              ← Назад
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === p
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-border bg-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent"
            >
              Вперёд →
            </button>
          </div>
        )}

        {/* City & Category links */}
        <div className="pb-6">
          <details className="group">
            <summary className="text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground">
              По городам и специализациям ▸
            </summary>
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {Object.entries(cityMap).map(([slug, name]) => (
                  <Link key={slug} to={`/jobs/city/${slug}`} className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    {name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(categoryMap).map(([slug, { name }]) => (
                  <Link key={slug} to={`/jobs/category/${slug}`} className="text-xs px-2.5 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default JobsPage;
