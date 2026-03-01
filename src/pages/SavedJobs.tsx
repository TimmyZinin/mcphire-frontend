import { Helmet } from "react-helmet-async";
import { Trash2, MapPin, Briefcase, TrendingUp } from "lucide-react";
import { useSavedJobs } from "@/hooks/useJobs";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";
import { formatSalary } from "@/lib/formatters";

const SavedJobs = () => {
  const { data: savedJobs = [], isLoading } = useSavedJobs();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Сохранённые вакансии | СБОРКА</title>
        <meta
          name="description"
          content="Ваши сохранённые IT-вакансии. Отслеживайте интересные позиции и быстро находите их."
        />
        <link rel="canonical" href="https://sborka.work/jobs/saved" />
        <meta
          property="og:title"
          content="Сохранённые вакансии | СБОРКА"
        />
        <meta
          property="og:description"
          content="Ваши сохранённые IT-вакансии"
        />
        <meta property="og:url" content="https://sborka.work/jobs/saved" />
      </Helmet>

      {/* Header */}
      <JobBoardNavbar />
      <TopBanner utmSource="saved_jobs" />

      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-8">СОХРАНЁННЫЕ ВАКАНСИИ</h1>

          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">
              Загрузка сохранённых вакансий...
            </div>
          ) : savedJobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                Нет сохранённых вакансий
              </p>
              <a href="/jobs" className="cta-primary-nrc">
                Посмотреть все вакансии
              </a>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                {savedJobs.length} сохранённых вакансий
              </p>

              <div className="space-y-4">
                {savedJobs.map((job) => {
                  const companyName = typeof job.company === "string" ? job.company : job.company.name;
                  return (
                    <a
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase size={14} />
                              {companyName}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {job.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp size={14} />
                              {job.level}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-primary text-lg">
                              {job.salaryFrom && job.salaryTo
                                ? `${formatSalary(job.salaryFrom)} – ${formatSalary(job.salaryTo)} ${job.currency}`
                                : "—"}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              // TODO: Implement unsave functionality with useUnsaveJob
                            }}
                            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                            title="Убрать из сохранённых"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8">
                <a href="/jobs" className="cta-primary-nrc">
                  Посмотреть все вакансии
                </a>
              </div>
            </>
          )}
        </div>
      </section>
      <CareerClubBanner variant="block" utmSource="saved_jobs" />
      <Footer />
    </main>
  );
};

export default SavedJobs;
