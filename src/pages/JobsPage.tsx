import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockJobs, type Job } from "@/data/mockJobs";
import { cityMap, categoryMap } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";

const JobsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Get unique cities and skills from data
  const cities = useMemo(() => Array.from(new Set(mockJobs.map((j: Job) => j.city))), []);
  const skills = useMemo(() => {
    const allSkills = mockJobs.flatMap((j: Job) => j.skills);
    return Array.from(new Set(allSkills)).sort();
  }, []);

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat("ru-RU").format(salary);
  };

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job: Job) => {
      if (selectedCity && job.city !== selectedCity) return false;
      if (selectedSkill && !job.skills.includes(selectedSkill)) return false;
      if (selectedLevel && job.level !== selectedLevel) return false;
      if (selectedFormat && job.format !== selectedFormat) return false;
      if (job.salaryFrom < salaryRange) return false;
      return true;
    });
  }, [selectedCity, selectedSkill, selectedLevel, selectedFormat, salaryRange]);

  // Paginate
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {/* Header */}
      <JobBoardNavbar />

      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-8">ВАКАНСИИ</h1>

          {/* City & Category Navigation */}
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-3 uppercase">По городам</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(cityMap).map(([slug, name]) => (
                <Link key={slug} to={`/jobs/city/${slug}`} className="chip hover:bg-primary hover:text-primary-foreground transition-colors">
                  {name}
                </Link>
              ))}
            </div>
            <h2 className="font-bold text-lg mb-3 uppercase">По специализации</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryMap).map(([slug, {name}]) => (
                <Link key={slug} to={`/jobs/category/${slug}`} className="chip hover:bg-primary hover:text-primary-foreground transition-colors">
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Город
              </label>
              <select
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Все города</option>
                {cities.map((city: string) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Навык
              </label>
              <select
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                value={selectedSkill}
                onChange={(e) => {
                  setSelectedSkill(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Все навыки</option>
                {skills.map((skill: string) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Уровень
              </label>
              <select
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Все уровни</option>
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Формат
              </label>
              <select
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                value={selectedFormat}
                onChange={(e) => {
                  setSelectedFormat(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Все форматы</option>
                <option value="Офис">Офис</option>
                <option value="Удалённо">Удалённо</option>
                <option value="Гибрид">Гибрид</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Зарплата от {formatSalary(salaryRange)} ₽
              </label>
              <input
                type="range"
                min="0"
                max="500000"
                step="50000"
                value={salaryRange}
                onChange={(e) => {
                  setSalaryRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Counter */}
          <p className="text-muted-foreground mb-6">
            Найдено {filteredJobs.length} вакансий
          </p>

          {/* Jobs Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedJobs.map((job: Job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="rounded-2xl border border-border/30 bg-card shadow-lg p-6 hover:border-primary/30 transition-colors block"
              >
                <div className="flex flex-col gap-3 mb-4">
                  <h3 className="font-bold text-xl">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.city} · {job.format}</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold text-lg text-primary">
                    {formatSalary(job.salaryFrom)} – {formatSalary(job.salaryTo)} {job.currency}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {job.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="chip text-xs">{job.level}</span>
                  <a href={`https://t.me/Sborka_work_bot?start=apply_${job.id}`}
                    target="_blank" rel="noopener noreferrer"
                    className="cta-primary-nrc text-sm py-2 px-4"
                    onClick={(e) => e.stopPropagation()}>
                    Откликнуться →
                  </a>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
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
        </div>
      </section>
    </main>
  );
};

export default JobsPage;
