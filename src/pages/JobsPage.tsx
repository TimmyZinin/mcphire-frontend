import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useJobs, useJobStats } from "@/hooks/useJobs";
import { useJobFilters } from "@/hooks/useJobFilters";
import { cityMap, categoryMap } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";
import { JobCard, SkeletonGrid } from "@/components/JobCard";

// ---- Filter Sidebar Content (reused in desktop sidebar + mobile sheet) ----

interface FilterSidebarContentProps {
  filters: ReturnType<typeof useJobFilters>["filters"];
  setFilters: ReturnType<typeof useJobFilters>["setFilters"];
  toggleArrayFilter: ReturnType<typeof useJobFilters>["toggleArrayFilter"];
  salaryOptions: { label: string; value: number }[];
  activeFilterCount: number;
}

function FilterSidebarContent({ filters, setFilters, toggleArrayFilter, salaryOptions, activeFilterCount }: FilterSidebarContentProps) {
  const checkboxClass = (active: boolean) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${
      active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
    }`;

  return (
    <div className="space-y-6">
      {/* Format */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Формат</h4>
        <div className="space-y-1">
          {["Удалённо", "Офис", "Гибрид"].map((f) => (
            <button
              key={f}
              onClick={() => toggleArrayFilter("format", f)}
              className={checkboxClass(filters.format.includes(f))}
            >
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                filters.format.includes(f) ? "border-primary bg-primary" : "border-border"
              }`}>
                {filters.format.includes(f) && <span className="text-white text-[10px]">✓</span>}
              </span>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Зарплата</h4>
        <div className="space-y-1">
          {salaryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilters({ salaryMin: filters.salaryMin === opt.value ? null : opt.value, page: 1 })}
              className={checkboxClass(filters.salaryMin === opt.value)}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                filters.salaryMin === opt.value ? "border-primary" : "border-border"
              }`}>
                {filters.salaryMin === opt.value && <span className="w-2 h-2 rounded-full bg-primary" />}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Уровень</h4>
        <div className="space-y-1">
          {["Junior", "Middle", "Senior", "Lead"].map((l) => (
            <button
              key={l}
              onClick={() => toggleArrayFilter("level", l)}
              className={checkboxClass(filters.level.includes(l))}
            >
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                filters.level.includes(l) ? "border-primary bg-primary" : "border-border"
              }`}>
                {filters.level.includes(l) && <span className="text-white text-[10px]">✓</span>}
              </span>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Специализация</h4>
        <div className="space-y-1">
          {Object.entries(categoryMap).slice(0, 8).map(([slug, { name }]) => (
            <button
              key={slug}
              onClick={() => setFilters({ category: filters.category === slug ? "" : slug, page: 1 })}
              className={checkboxClass(filters.category === slug)}
            >
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                filters.category === slug ? "border-primary bg-primary" : "border-border"
              }`}>
                {filters.category === slug && <span className="text-white text-[10px]">✓</span>}
              </span>
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => setFilters({ format: [], level: [], salaryMin: null, city: "", category: "", page: 1 })}
          className="w-full text-sm text-destructive hover:text-destructive/80 font-medium py-2 transition-colors"
        >
          Сбросить все фильтры ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

// ---- Page ----

const JobsPage = () => {
  const { filters, page, setFilters, toggleArrayFilter, activeFilterCount } = useJobFilters();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Salary options
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
        <title>IT-вакансии в России 2026 | MCPHire</title>
        <meta name="description" content="Актуальные IT-вакансии на российском рынке. Frontend, Backend, DevOps, QA, Product Manager и другие роли. Фильтр по городу, навыкам, зарплате." />
        <link rel="canonical" href="https://mcphire.com/jobs" />
        <meta property="og:title" content="IT-вакансии в России 2026" />
        <meta property="og:description" content="Актуальные IT-вакансии: Frontend, Backend, DevOps, QA, PM. Фильтр по городу и зарплате." />
        <meta property="og:url" content="https://mcphire.com/jobs" />
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

      {/* Main Content: Sidebar + Jobs */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4">
        <div className="flex gap-8">
          {/* ---- Desktop Sidebar (280px) ---- */}
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-36">
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Фильтры</h3>
                  {activeFilterCount > 0 && (
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <FilterSidebarContent
                  filters={filters}
                  setFilters={setFilters}
                  toggleArrayFilter={toggleArrayFilter}
                  salaryOptions={salaryOptions}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </div>
          </aside>

          {/* ---- Mobile Filter Button + Sheet ---- */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary/90 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Фильтры
                  {activeFilterCount > 0 && (
                    <span className="bg-white text-primary text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[80vh] rounded-t-2xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterSidebarContent
                    filters={filters}
                    setFilters={setFilters}
                    toggleArrayFilter={toggleArrayFilter}
                    salaryOptions={salaryOptions}
                    activeFilterCount={activeFilterCount}
                  />
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 rounded-full bg-primary text-white text-sm font-semibold mt-2"
                >
                  Показать результаты
                </button>
              </SheetContent>
            </Sheet>
          </div>

          {/* ---- Jobs Column ---- */}
          <div className="flex-1 min-w-0">
            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {activeFilters.map((f, idx) => (
                  <span
                    key={idx}
                    onClick={f.remove}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                  >
                    {f.label} <X className="w-3 h-3 opacity-70" />
                  </span>
                ))}
              </div>
            )}

            {/* Sort + count */}
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
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {isLoading ? "Загрузка..." : `${startIndex}–${endIndex} из ${totalJobs}`}
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
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default JobsPage;
