// ============================================================
// СБОРКА — Job Board Home Page
// Route: /home  (job board entry point, NOT the club landing)
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { JobCard, SkeletonGrid } from "@/components/JobCard";
import { useJobs, useJobStats } from "@/hooks/useJobs";

// ---- Stat Card -----------------------------------------------

interface StatCardProps {
  label: string;
  value: string | number;
  mono?: boolean;
}

function StatCard({ label, value, mono = true }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-2">
      <span
        className={`text-3xl md:text-4xl font-bold text-primary leading-none ${mono ? "font-mono" : ""}`}
        style={mono ? { fontFamily: "'JetBrains Mono', monospace" } : undefined}
      >
        {value}
      </span>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

// ---- Component -----------------------------------------------

const HomePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data: jobsData, isLoading: jobsLoading } = useJobs({ perPage: 6 });
  const { data: stats } = useJobStats();

  const jobs = jobsData?.data ?? [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/jobs?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Найди работу через AI | СБОРКА Вакансии</title>
        <meta
          name="description"
          content="Первая MCP-first платформа для IT-карьеры в России. Тысячи вакансий, AI-подбор, карьерный клуб."
        />
        <meta property="og:title" content="Найди работу через AI | СБОРКА Вакансии" />
        <meta
          property="og:description"
          content="Первая MCP-first платформа для IT-карьеры в России. Тысячи вакансий, AI-подбор, карьерный клуб."
        />
        <link rel="canonical" href="https://sborka.work/home" />
      </Helmet>

      <JobBoardNavbar />

      {/* ---- Hero Section ---------------------------------------- */}
      <section className="section-white border-0 py-20 md:py-28">
        <div className="section-container text-center">
          <h1 className="heading-hero mb-6">
            Найди работу<br className="hidden md:block" /> через AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Первая MCP-first платформа для IT-карьеры в России.
            AI подбирает вакансии, оценивает совместимость и помогает откликнуться.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-xl mx-auto bg-card border border-border rounded-2xl px-4 py-2 shadow-sm focus-within:border-primary transition-colors"
          >
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Должность, навык или компания..."
              className="flex-1 bg-transparent text-sm md:text-base outline-none placeholder:text-muted-foreground py-2"
            />
            <button
              type="submit"
              className="shrink-0 px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Найти
            </button>
          </form>
        </div>
      </section>

      {/* ---- Stats Cards ----------------------------------------- */}
      <section className="py-12 border-t border-border bg-muted/20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Активных вакансий"
              value={stats?.totalJobs ?? "—"}
            />
            <StatCard
              label="Городов"
              value={stats?.citiesCount ?? "—"}
            />
            <StatCard
              label="Специализаций"
              value={stats?.categoriesCount ?? "—"}
            />
            <StatCard
              label="MCP-агентов"
              value="10+"
            />
          </div>
        </div>
      </section>

      {/* ---- Featured Jobs --------------------------------------- */}
      <section className="section-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
            <h2 className="heading-lg">Свежие вакансии</h2>
            <Link to="/jobs" className="cta-text text-sm">
              Все вакансии →
            </Link>
          </div>

          {jobsLoading ? (
            <SkeletonGrid count={6} />
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} showMatchScore={true} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">
              Вакансии загружаются...
            </p>
          )}

          {/* All Jobs CTA */}
          <div className="flex justify-center pt-4 pb-4">
            <Link to="/jobs" className="cta-primary">
              Все вакансии
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Employer CTA Section -------------------------------- */}
      <section className="section-black">
        <div className="section-container text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
            Для работодателей
          </p>
          <h2 className="heading-xl text-white mb-6">
            Разместите вакансию —<br className="hidden md:block" /> первая бесплатно
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Более 2 000 IT-специалистов уже ищут работу на платформе.
            AI-подбор, верифицированные кандидаты, MCP-доступ для ваших агентов.
          </p>

          {/* Selling points */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-white/80">
            {[
              "Без переплат за первую вакансию",
              "Доступ к базе карьерного клуба",
              "MCP API для AI-агентов",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-hot shrink-0" />
                {point}
              </div>
            ))}
          </div>

          <Link to="/employer/jobs/create" className="cta-hot">
            Разместить вакансию бесплатно
          </Link>
        </div>
      </section>

      {/* ---- Career Club Section --------------------------------- */}
      <section className="section-white">
        <div className="section-container text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Карьерный клуб
          </p>
          <h2 className="heading-xl mb-6">
            Карьерный клуб<br className="hidden md:block" /> СБОРКА
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Система с метриками и дедлайнами для IT-специалистов, которые ищут
            работу или хотят вырасти. Не коучинг — инструмент для результата.
          </p>
          <Link to="/" className="cta-text text-base">
            Узнать о клубе →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
