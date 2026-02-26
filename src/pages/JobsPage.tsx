import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockJobs, type Job } from "@/data/mockJobs";

const JobsPage = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<number>(0);

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat("ru-RU").format(salary);
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
      <header className="border-b border-border">
        <div className="section-container py-4 flex items-center justify-between">
          <Link to="/" className="font-black text-xl uppercase tracking-tight">
            СБОРКА
          </Link>
          <a href="/#pricing" className="cta-text text-sm">
            Тарифы
          </a>
        </div>
      </header>

      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-8">ВАКАНСИИ</h1>

          {/* Filters */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Город
              </label>
              <select
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Все города</option>
                <option value="Москва">Москва</option>
                <option value="Санкт-Петербург">Санкт-Петербург</option>
                <option value="Удалённо">Удалённо</option>
                <option value="Новосибирск">Новосибирск</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 uppercase">
                Навык
              </label>
              <select
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">Все навыки</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
                <option value="Go">Go</option>
                <option value="Kubernetes">Kubernetes</option>
                <option value="ML">ML</option>
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
                onChange={(e) => setSalaryRange(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {mockJobs.map((job: Job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-border/30 bg-card shadow-lg p-6"
              >
                <div className="flex flex-col gap-3 mb-4">
                  <h3 className="font-bold text-xl">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.city}</p>
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

                <a href="#" className="cta-primary-nrc inline-block">
                  Откликнуться
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default JobsPage;
