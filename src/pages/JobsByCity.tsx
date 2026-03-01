import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useJobs } from "@/hooks/useJobs";
import { cityMap, categoryMap } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";
import { JobCard, SkeletonGrid } from "@/components/JobCard";

const JobsByCity = () => {
  const { city } = useParams<{ city: string }>();
  const cityName = city ? cityMap[city] : null;

  const { data, isLoading } = useJobs({
    city: cityName || undefined,
    perPage: 50,
  });

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
          </div>
        </section>
      </main>
    );
  }

  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || 0;
  const otherCities = Object.entries(cityMap).filter(([slug]) => slug !== city);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>IT-вакансии в {cityName} 2026 | СБОРКА</title>
        <meta name="description" content={`Актуальные IT-вакансии в ${cityName}. ${totalJobs} вакансий от ведущих компаний.`} />
        <link rel="canonical" href={`https://sborka.work/jobs/city/${city}`} />
      </Helmet>

      <JobBoardNavbar />
      <TopBanner utmSource="jobs_city" />

      <section className="section-white">
        <div className="section-container">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-foreground">Главная</a>
            <span className="mx-2">›</span>
            <a href="/jobs" className="hover:text-foreground">Вакансии</a>
            <span className="mx-2">›</span>
            <span className="text-foreground">{cityName}</span>
          </nav>

          <h1 className="heading-xl mb-2">ВАКАНСИИ В {cityName.toUpperCase()}</h1>
          <p className="text-muted-foreground mb-8">
            Найдено {totalJobs} вакансий
          </p>

          <CareerClubBanner variant="inline" utmSource="jobs_city" />

          {/* Jobs Grid */}
          {isLoading ? (
            <SkeletonGrid count={6} />
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Вакансии в этом городе не найдены.
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Other Cities */}
          <div className="border-t border-border pt-8">
            <h2 className="font-bold text-lg mb-4 uppercase">Другие города</h2>
            <div className="flex flex-wrap gap-2">
              {otherCities.map(([slug, name]) => (
                <a
                  key={slug}
                  href={`/jobs/city/${slug}`}
                  className="chip hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {name}
                </a>
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
