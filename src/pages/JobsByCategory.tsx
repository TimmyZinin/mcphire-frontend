import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useJobs } from "@/hooks/useJobs";
import { cityMap, categoryMap } from "@/data/jobCategories";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";
import { JobCard, SkeletonGrid } from "@/components/JobCard";

const JobsByCategory = () => {
  const { category } = useParams<{ category: string }>();
  const categoryData = category ? categoryMap[category] : null;

  const { data, isLoading } = useJobs({
    category: categoryData?.name || undefined,
    perPage: 50,
  });

  // If category not found
  if (!categoryData) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Категория не найдена | MCPHire</title>
        </Helmet>
        <JobBoardNavbar />
        <section className="section-white">
          <div className="section-container">
            <h1 className="heading-xl mb-4">Категория не найдена</h1>
            <p className="text-muted-foreground mb-6">
              Извините, страница для этой категории не существует.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const jobs = data?.data || [];
  const totalJobs = data?.meta?.total || 0;
  const otherCategories = Object.entries(categoryMap).filter(([slug]) => slug !== category);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Вакансии {categoryData.name} в России 2026 | MCPHire</title>
        <meta name="description" content={`Актуальные вакансии ${categoryData.name}. ${totalJobs} позиций от ведущих IT-компаний.`} />
        <link rel="canonical" href={`https://mcphire.com/jobs/category/${category}`} />
      </Helmet>

      <JobBoardNavbar />
      <TopBanner utmSource="jobs_category" />

      <section className="section-white">
        <div className="section-container">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-4">
            <a href="/" className="hover:text-foreground">Главная</a>
            <span className="mx-2">›</span>
            <a href="/jobs" className="hover:text-foreground">Вакансии</a>
            <span className="mx-2">›</span>
            <span className="text-foreground">{categoryData.name}</span>
          </nav>

          <h1 className="heading-xl mb-2">{categoryData.name.toUpperCase()}</h1>
          <p className="text-muted-foreground mb-8">
            Найдено {totalJobs} вакансий
          </p>

          <CareerClubBanner variant="inline" utmSource="jobs_category" />

          {/* Jobs Grid */}
          {isLoading ? (
            <SkeletonGrid count={6} />
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Вакансии в этой категории не найдены.
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Other Categories */}
          <div className="border-t border-border pt-8">
            <h2 className="font-bold text-lg mb-4 uppercase">Другие категории</h2>
            <div className="flex flex-wrap gap-2">
              {otherCategories.map(([slug, { name }]) => (
                <a
                  key={slug}
                  href={`/jobs/category/${slug}`}
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

export default JobsByCategory;
