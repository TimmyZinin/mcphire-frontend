import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockJobs, type Job } from "@/data/mockJobs";
import { cityMap, categoryMap } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [activeLevels, setActiveLevels] = useState<Set<string>>(new Set());
  const [salaryFilter, setSalaryFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

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

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat("ru-RU").format(salary);
  };

  // Helper functions
  const getMatchScore = (job: Job): number => {
    const scores: Record<string, number> = {
      "Senior": 90,
      "Middle": 85,
      "Lead": 88,
      "Junior": 75,
    };
    const base = scores[job.level] || 80;
    return base + (parseInt(job.id) % 10);
  };

  const companyColors: Record<string, { bg: string; text: string }> = {
    "Яндекс": { bg: "#fc0", text: "#000" },
    "МТС": { bg: "#e30611", text: "#fff" },
    "Сбер": { bg: "#21a038", text: "#fff" },
    "Тинькофф": { bg: "#ffdd2d", text: "#333" },
    VK: { bg: "#0077ff", text: "#fff" },
    Ozon: { bg: "#005bff", text: "#fff" },
    Wildberries: { bg: "#cb11ab", text: "#fff" },
    Авито: { bg: "#00aaff", text: "#fff" },
    Lamoda: { bg: "#000", text: "#fff" },
    Kaspersky: { bg: "#006d5c", text: "#fff" },
  };

  const getCompanyColor = (company: string): string => {
    return companyColors[company]?.bg || "#e6f5ee";
  };

  const getCompanyTextColor = (company: string): string => {
    return companyColors[company]?.text || "#1b6b52";
  };

  const getRelativeTime = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
    return `${Math.floor(diffDays / 30)} мес. назад`;
  };

  // Toggle handlers
  const toggleFormat = (f: string) => {
    setActiveFormats((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
    setCurrentPage(1);
  };

  const toggleLevel = (l: string) => {
    setActiveLevels((prev) => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l);
      else next.add(l);
      return next;
    });
    setCurrentPage(1);
  };

  // Build active filters list
  const activeFilters = useMemo(() => {
    const filters: { label: string; remove: () => void }[] = [];
    activeFormats.forEach((f) => {
      filters.push({ label: f, remove: () => toggleFormat(f) });
    });
    activeLevels.forEach((l) => {
      filters.push({ label: l, remove: () => toggleLevel(l) });
    });
    if (salaryFilter > 0) {
      const opt = salaryOptions.find((o) => o.value === salaryFilter);
      if (opt) {
        filters.push({ label: opt.label, remove: () => setSalaryFilter(0) });
      }
    }
    if (selectedCity) {
      filters.push({ label: selectedCity, remove: () => setSelectedCity("") });
    }
    return filters;
  }, [activeFormats, activeLevels, salaryFilter, selectedCity]);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job: Job) => {
      // Text search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !job.title.toLowerCase().includes(q) &&
          !job.company.toLowerCase().includes(q) &&
          !job.skills.some((s: string) => s.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      // City filter
      if (selectedCity && job.city !== selectedCity) return false;
      // Format filter
      if (activeFormats.size > 0 && !activeFormats.has(job.format)) return false;
      // Level filter
      if (activeLevels.size > 0 && !activeLevels.has(job.level)) return false;
      // Salary filter
      if (salaryFilter > 0 && job.salaryFrom < salaryFilter) return false;
      return true;
    });
  }, [searchQuery, selectedCity, activeFormats, activeLevels, salaryFilter]);

  // Sort jobs
  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs];
    if (sortBy === "salary") {
      sorted.sort((a, b) => b.salaryTo - a.salaryTo);
    } else if (sortBy === "date") {
      sorted.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }
    return sorted;
  }, [filteredJobs, sortBy]);

  // Paginate
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, sortedJobs.length);

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

      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-8 pt-10 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Вакансии</h1>
        <p className="text-muted-foreground mt-1">{filteredJobs.length} вакансий в IT</p>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl py-4 border-b border-border/50">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-center bg-card border-2 border-border rounded-3xl px-2 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input
              type="text"
              placeholder="Должность, навыки или компания..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 px-4 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <div className="w-px h-7 bg-border mx-1" />
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-transparent outline-none text-foreground cursor-pointer"
            >
              <option value="">Вся Россия</option>
              {Object.entries(cityMap).map(([slug, name]) => (
                <option key={slug} value={name}>{name}</option>
              ))}
            </select>
            <button className="ml-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0">
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
            <button key={f} onClick={() => toggleFormat(f)} className={chipClass(activeFormats.has(f))}>
              {f}
            </button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          {/* Salary chips */}
          {salaryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setSalaryFilter(salaryFilter === opt.value ? 0 : opt.value);
                setCurrentPage(1);
              }}
              className={chipClass(salaryFilter === opt.value)}
            >
              {opt.label}
            </button>
          ))}
          <div className="w-px h-6 bg-border mx-1" />
          {/* Level chips */}
          {["Junior", "Middle", "Senior", "Lead"].map((l) => (
            <button key={l} onClick={() => toggleLevel(l)} className={chipClass(activeLevels.has(l))}>
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
              <button key={s.key} onClick={() => setSortBy(s.key)} className={sortClass(sortBy === s.key)}>
                {s.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Показано {startIndex}–{endIndex} из {filteredJobs.length}
          </span>
        </div>

        {/* Jobs Grid */}
        <div className="grid md:grid-cols-2 gap-4 pb-8">
          {paginatedJobs.map((job: Job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="block bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all relative"
            >
              {/* Match Badge */}
              <div className="absolute top-4 right-4 bg-primary text-white font-mono text-xs font-bold px-2.5 py-1 rounded-full">
                {getMatchScore(job)}% матч
              </div>

              {/* Company Row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center font-bold text-base shrink-0"
                  style={{ background: getCompanyColor(job.company), color: getCompanyTextColor(job.company) }}
                >
                  {job.company[0]}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium">{job.company}</div>
                  <span className="text-[0.7rem] text-primary font-semibold">✓ Верифицирован</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-lg mb-2 leading-snug pr-16">{job.title}</h3>

              {/* Salary */}
              <div className="font-mono font-semibold text-base text-primary mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatSalary(job.salaryFrom)} — {formatSalary(job.salaryTo)} {job.currency}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.skills.slice(0, 4).map((skill: string) => (
                  <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {skill}
                  </span>
                ))}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  job.format === "Удалённо" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
                }`}>
                  {job.format}
                </span>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{job.city}</span>
                <span>{getRelativeTime(job.postedAt)}</span>
              </div>
            </Link>
          ))}
        </div>

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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent"
                }`}
              >
                {page}
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
