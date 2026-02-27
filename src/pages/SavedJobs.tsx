import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, MapPin, Briefcase, TrendingUp } from "lucide-react";
import { mockJobs, type Job } from "@/data/mockJobs";
import { getSavedJobIds, toggleSaveJob, isJobSaved } from "@/lib/savedJobs";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

const formatSalary = (salary: number): string => {
  return new Intl.NumberFormat("ru-RU").format(salary);
};

const SavedJobs = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const ids = getSavedJobIds();
    setSavedIds(ids);
    setSavedJobs(mockJobs.filter((job) => ids.includes(job.id)));
  }, []);

  const handleToggle = (jobId: string) => {
    const updated = toggleSaveJob(jobId);
    setSavedIds(updated);
    setSavedJobs(mockJobs.filter((job) => updated.includes(job.id)));
  };

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

      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-8">СОХРАНЁННЫЕ ВАКАНСИИ</h1>

          {savedJobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                Нет сохранённых вакансий
              </p>
              <Link to="/jobs" className="cta-primary-nrc">
                Посмотреть все вакансии
              </Link>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                {savedJobs.length} сохранённых вакансий
              </p>

              <div className="space-y-4">
                {savedJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="block border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {job.company}
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
                            {formatSalary(job.salaryFrom)} – {formatSalary(job.salaryTo)} ₽
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggle(job.id);
                          }}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Убрать из сохранённых"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/jobs" className="cta-primary-nrc">
                  Посмотреть все вакансии
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SavedJobs;
