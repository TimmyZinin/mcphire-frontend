// ============================================================
// MCPHire — Job Board Home Page
// Route: /home  (job board entry point, NOT the club landing)
// ============================================================

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { JobCard, SkeletonGrid } from "@/components/JobCard";
import { useJobs, useJobStats } from "@/hooks/useJobs";

// ---- Typing Rotator ------------------------------------------

const rotatingPhrases = ["через AI", "через MCP", "сегодня", "удалённо"];

function TypingRotator() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const target = rotatingPhrases[idx];

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 2200);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length === 0) {
        setIdx((i) => (i + 1) % rotatingPhrases.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setText((s) => s.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }

    // typing
    if (text.length < target.length) {
      const t = setTimeout(
        () => setText(target.slice(0, text.length + 1)),
        85,
      );
      return () => clearTimeout(t);
    }

    setPhase("pause");
  }, [text, idx, phase]);

  return (
    <span className="inline-flex items-baseline">
      <span>{text}</span>
      <span
        className={`hero-typing-cursor${phase === "pause" ? " blinking" : ""}`}
      />
    </span>
  );
}

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
        <title>Найди IT-работу через AI | MCPHire</title>
        <meta
          name="description"
          content="MCPHire — AI-платформа для поиска IT-работы. Тысячи вакансий, AI-подбор, MCP-агенты для автоматизации поиска."
        />
        <meta property="og:title" content="Найди IT-работу через AI | MCPHire" />
        <meta
          property="og:description"
          content="MCPHire — AI-платформа для поиска IT-работы. Тысячи вакансий, AI-подбор, MCP-агенты для автоматизации поиска."
        />
        <link rel="canonical" href="https://mcphire.com/home" />
      </Helmet>

      <JobBoardNavbar />

      {/* ---- Hero Section ---------------------------------------- */}
      <section className="section-white border-0 py-20 md:py-28">
        <div className="section-container text-center">
          <h1 className="heading-hero mb-6">
            Найди работу<br className="hidden md:block" />{" "}
            <TypingRotator />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-платформа для поиска IT-работы.
            MCP-агенты подбирают вакансии, оценивают совместимость и помогают откликнуться.
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

      {/* ---- Agent onboarding (Moltbook-style: one canonical prompt) ---- */}
      <section className="py-16 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <span>🤖</span>
              <span>Для AI-агентов</span>
            </div>
            <h2 className="heading-section mb-5">
              Твой AI-агент регистрирует тебя. За 3 минуты.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Отправь своему агенту (Claude, Cursor, Cline, любой MCP-клиент) одну строку ниже. Он прочитает инструкцию из <code className="px-1.5 py-0.5 rounded bg-muted text-sm">skill.md</code>, соберёт ответы на ~150 вопросов из твоего локального контекста, покажет approval screen — ты жмёшь «ок», получаешь публичное CV + instant TG-пуши матчей.
            </p>

            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-left shadow-lg mb-8">
              <div className="text-xs uppercase tracking-wider text-primary mb-3 font-semibold">
                Отправь это своему агенту
              </div>
              <pre className="text-base md:text-lg whitespace-pre-wrap leading-relaxed text-foreground font-mono">{`Read https://mcphire.com/skill.md and follow the instructions to register me on mcphire. Show me the approval screen before calling register_profile.`}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-xl mb-2">1️⃣</div>
                <div className="font-semibold mb-1">Отправь агенту</div>
                <p className="text-sm text-muted-foreground">Одну строку выше. Агент сам читает skill.md и знает что делать.</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-xl mb-2">2️⃣</div>
                <div className="font-semibold mb-1">Подтверди ответы</div>
                <p className="text-sm text-muted-foreground">Агент покажет approval screen с собранными данными. Правишь, жмёшь «ок».</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="text-xl mb-2">3️⃣</div>
                <div className="font-semibold mb-1">CV + матчи</div>
                <p className="text-sm text-muted-foreground">Публичная ссылка на резюме + инстант-пуши новых вакансий в Telegram.</p>
              </div>
            </div>

            <details className="text-left bg-muted/40 border border-border rounded-xl p-5">
              <summary className="cursor-pointer text-sm font-semibold text-muted-foreground hover:text-foreground">
                Если MCP не настроен — технические детали подключения
              </summary>
              <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                <p>
                  Один раз в терминале (macOS / Linux / WSL):
                </p>
                <pre className="text-xs whitespace-pre-wrap leading-relaxed text-foreground font-mono bg-background p-3 rounded border border-border">{`curl -fsSL https://mcphire.com/install.sh | bash`}</pre>
                <p>
                  Или вручную добавь в <code className="text-xs">claude_desktop_config.json</code>:
                </p>
                <pre className="text-xs whitespace-pre-wrap leading-relaxed text-foreground font-mono bg-background p-3 rounded border border-border">{`{
  "mcpServers": {
    "mcphire": {
      "type": "sse",
      "url": "https://mcp.mcphire.com/sse"
    }
  }
}`}</pre>
                <p className="text-xs">
                  Путь к файлу: macOS <code>~/Library/Application Support/Claude/</code> · Windows <code>%APPDATA%/Claude/</code>. Полностью quit Claude Desktop (⌘Q / File → Quit) и запусти заново.
                </p>
                <p className="text-xs">
                  Нет MCP? REST fallback живёт по адресу <code>https://api.mcphire.com/api/v1/candidate/register</code> — любой агент с <code>curl</code> может зарегать человека без MCP-клиента.
                </p>
              </div>
            </details>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="https://mcphire.com/skill.md"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                skill.md (canonical) →
              </a>
              <a
                href="/mcp"
                className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                MCP API docs →
              </a>
              <a
                href="https://mcphire.com/.well-known/mcp/server.json"
                className="font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                server.json (manifest) →
              </a>
            </div>
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
              "AI-подбор кандидатов",
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

      {/* ---- Career Club Cross-Promo ------------------------------ */}
      <section className="section-white">
        <div className="section-container text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Партнёрский проект
          </p>
          <h2 className="heading-xl mb-6">
            Подготовка к<br className="hidden md:block" /> собеседованиям — СБОРКА
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Система с метриками и дедлайнами для IT-специалистов, которые ищут
            работу или хотят вырасти. Менторы, мок-собеседования, разбор резюме.
          </p>
          <a href="https://sborka.work?utm_source=mcphire&utm_medium=homepage&utm_campaign=cross_promo" className="cta-text text-base">
            Узнать о СБОРКЕ на sborka.work →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
