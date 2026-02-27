import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockJobs, type Job } from "@/data/mockJobs";
import { cityMap, filterJobsByCity } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";

const JobsByCity = () => {
  const { city } = useParams<{ city: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const cityName = city ? cityMap[city] : null;

  const filteredJobs = useMemo(() => {
    if (!city || !cityName) return [];
    return filterJobsByCity(mockJobs, city, cityName);
  }, [city, cityName]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat("ru-RU").format(salary);
  };

  // If city not found
  if (!cityName) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Город не найден | СБОРКА</title>
        </Helmet>
        <JobBoardNavbar />
        <section className="section-white">
          <div className="section-container">
            <h1 className="heading-xl mb-4">Город не найден</h1>
            <p className="text-muted-foreground mb-6">
              Извините, страница для этого города не существует.
            </p>
            <Link to="/jobs" className="cta-primary-nrc inline-block">
              Все вакансии
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const otherCities = Object.entries(cityMap).filter(([slug]) => slug !== city);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>IT-вакансии в {cityName} 2026 | СБОРКА</title>
        <meta name="description" content={`Актуальные IT-вакансии в ${cityName}. ${filteredJobs.length} вакансий от ведущих компаний.`} />
        <link rel="canonical" href={`https://sborka.work/jobs/city/${city}`} />
      </Helmet>

      <JobBoardNavbar />
      <TopBanner utmSource="jobs_city" />

      <section className="section-white">
        <div className="section-container">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">›</span>
            <Link to="/jobs" className="hover:text-foreground">Вакансии</Link>
            <span className="mx-2">›</span>
            <span className="text-foreground">{cityName}</span>
          </nav>

          <h1 className="heading-xl mb-2">ВАКАНСИИ В {cityName.toUpperCase()}</h1>
          <p className="text-muted-foreground mb-8">
            Найдено {filteredJobs.length} вакансий
          </p>

          <CareerClubBanner variant="inline" utmSource="jobs_city" />

          {/* Jobs Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
            <div className="flex justify-center gap-2 mb-8">
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

          {/* Other Cities */}
          <div className="border-t border-border pt-8">
            <h2 className="font-bold text-lg mb-4 uppercase">Другие города</h2>
            <div className="flex flex-wrap gap-2">
              {otherCities.map(([slug, name]) => (
                <Link
                  key={slug}
                  to={`/jobs/city/${slug}`}
                  className="chip hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default JobsByCity;
