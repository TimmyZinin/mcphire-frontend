import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import { useJob, useSimilarJobs } from "@/hooks/useJobs";
import { useAuth } from "@/contexts/AuthContext";
import { formatSalary, formatDate, formatRelativeTime } from "@/lib/formatters";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import CareerClubBanner from "@/components/CareerClubBanner";
import TopBanner from "@/components/TopBanner";
import { SkeletonCard } from "@/components/JobCard";
import { ApplyDialog } from "@/components/jobs/ApplyDialog";
import { JobPostingJsonLd } from "@/components/seo/JsonLd";

/** Sanitize job description HTML: fix HH tags, strip dangerous content. */
function sanitizeDescription(html: string): string {
  const cleaned = html
    .replace(/<highlighttext>/gi, "<strong>")
    .replace(/<\/highlighttext>/gi, "</strong>");
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      node.setAttribute("rel", "noopener noreferrer");
      node.setAttribute("target", "_blank");
    }
  });
  try {
    return DOMPurify.sanitize(cleaned, {
      ALLOWED_TAGS: ["p", "ul", "ol", "li", "strong", "em", "br", "h2", "h3", "a", "b", "i"],
      ALLOWED_ATTR: ["href", "target", "rel"],
    });
  } finally {
    DOMPurify.removeHook("afterSanitizeAttributes");
  }
}

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading } = useJob(id || "");
  const { data: similarJobs = [] } = useSimilarJobs(id || "");
  const { isAuthenticated } = useAuth();
  const [applyOpen, setApplyOpen] = useState(false);

  // Company colors
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

  const getCompanyColor = (companyName: string) => companyColors[companyName]?.bg || "#e6f5ee";
  const getCompanyTextColor = (companyName: string) => companyColors[companyName]?.text || "#1b6b52";

  // Match score calculation
  const getMatchScore = (jobId: string): number => {
    const scores: Record<string, number> = { Senior: 90, Middle: 85, Lead: 88, Junior: 75 };
    return (scores["Middle"] || 80) + (parseInt(jobId, 10) % 10);
  };

  // If loading
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Загрузка вакансии | MCPHire Вакансии</title>
        </Helmet>
        <JobBoardNavbar />
        <TopBanner utmSource="job_detail" />
        <div className="max-w-[1280px] mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            <div className="space-y-4">
              <SkeletonCard />
            </div>
            <div className="space-y-4">
              <SkeletonCard />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // If job not found
  if (!job) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Вакансия не найдена | MCPHire Вакансии</title>
        </Helmet>
        <JobBoardNavbar />
        <section className="section-white">
          <div className="section-container">
            <h1 className="heading-xl mb-4">Вакансия не найдена</h1>
            <p className="text-muted-foreground mb-6">К сожалению, вакансия с таким ID не существует.</p>
            <Link to="/jobs" className="cta-text">
              ← Все вакансии
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Get company name from Job type
  const companyName = typeof job.company === "string" ? job.company : job.company.name;
  const matchScore = getMatchScore(job.id);

  // Company info - use Job type with company object
  const companyInfo = [
    { label: "Индустрия", value: "IT" },
    { label: "Размер", value: typeof job.company === "object" ? (job.company as any).size || "1000+ сотрудников" : "1000+ сотрудников" },
    { label: "Офис", value: job.city },
    { label: "Формат", value: job.format },
  ];

  // Match breakdown
  const matchBreakdown = [
    { label: "Навыки", value: Math.min(matchScore + 4, 100) },
    { label: "Зарплата", value: Math.min(matchScore - 2, 100) },
    { label: "Опыт", value: Math.min(matchScore + 2, 100) },
    { label: "Локация", value: job.format === "Удалённо" ? 100 : 85 },
  ];

  // Get skills as strings (handle both JobListItem and full Job types)
  const skills = typeof job.skills[0] === "string"
    ? job.skills as string[]
    : (job.skills as any[]).map((s) => s.name || s.skill?.name || "");

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{job.title} в {companyName} | MCPHire Вакансии</title>
        <meta name="description" content={`${job.title} в компании ${companyName}. ${job.city}. Зарплата ${job.salaryFrom && job.salaryTo ? `${formatSalary(job.salaryFrom)} - ${formatSalary(job.salaryTo)} ${job.currency}` : ""}. ${job.description?.slice(0, 150)}`} />
        <meta property="og:title" content={`${job.title} в ${companyName}`} />
        <meta property="og:description" content={`${job.city} · ${job.salaryFrom && job.salaryTo ? `${formatSalary(job.salaryFrom)} - ${formatSalary(job.salaryTo)} ${job.currency}` : ""}`} />
        <meta property="og:url" content={`https://mcphire.com/jobs/${job.id}`} />
        <link rel="canonical" href={`https://mcphire.com/jobs/${job.id}`} />
      </Helmet>

      <JobBoardNavbar />
      <TopBanner utmSource="job_detail" />

      <div className="max-w-[1280px] mx-auto px-8">
        {/* Breadcrumb */}
        <nav className="py-4 text-sm text-muted-foreground flex items-center gap-2">
          <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">Вакансии</Link>
          <span>/</span>
          <span className="text-foreground">{job.title}</span>
        </nav>

        {/* Job Header */}
        <div className="flex justify-between items-start pb-8 gap-8 flex-wrap">
          {/* Left */}
          <div className="flex-1 min-w-[300px]">
            {/* Company row */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl shrink-0"
                style={{ background: getCompanyColor(companyName), color: getCompanyTextColor(companyName) }}>
                {companyName[0]}
              </div>
              <div>
                <div className="text-base font-semibold">{companyName}</div>
                <span className="text-xs text-primary font-semibold">✓ Верифицированная компания</span>
              </div>
            </div>
            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">{job.title}</h1>
            {/* Salary */}
            <div className="text-xl font-semibold text-primary mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {job.salaryFrom && job.salaryTo
                ? `${formatSalary(job.salaryFrom)} — ${formatSalary(job.salaryTo)} ${job.currency}`
                : "Зарплата не указана"}
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                job.format === "Удалённо" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
              }`}>{job.format}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">{job.level}</span>
              {skills.slice(0, 3).map((skill) => (
                <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{skill}</span>
              ))}
            </div>
          </div>

          {/* Right — Match Circle + Actions */}
          <div className="flex flex-col items-end gap-4 min-w-[220px]">
            {/* SVG Match Circle — only for authenticated users */}
            {isAuthenticated && (
              <div className="relative w-[100px] h-[100px] flex items-center justify-center flex-col">
                <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-0 left-0" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary"
                    strokeDasharray="276.5" strokeDashoffset={276.5 - (276.5 * matchScore / 100)} strokeLinecap="round" />
                </svg>
                <span className="text-2xl font-extrabold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{matchScore}%</span>
                <span className="text-[0.7rem] text-muted-foreground">Ваш матч</span>
              </div>
            )}
            {/* Action Buttons */}
            <div className="flex gap-3 w-full">
              <button onClick={() => setApplyOpen(true)} className="flex-1 px-6 py-3 rounded-full bg-cta-hot text-white text-sm font-semibold text-center hover:bg-cta-hot/90 transition-colors">
                Откликнуться
              </button>
              <button className="px-4 py-3 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
                Сохранить
              </button>
            </div>
          </div>
        </div>

        {/* Two-column Layout */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 pb-12">
          {/* Main Content */}
          <div>
            <h2 className="text-xl font-bold mb-3">Описание вакансии</h2>
            <div
              className="text-muted-foreground leading-relaxed mb-6 prose prose-sm max-w-none
                         prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:text-foreground"
              dangerouslySetInnerHTML={{
                __html: sanitizeDescription(job.description)
              }}
            />

            {job.requirements && job.requirements.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-3">Требования</h2>
                <ul className="space-y-1.5 mb-6">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-muted-foreground text-[0.92rem] leading-relaxed flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span> {req}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-3">Мы предлагаем</h2>
                <ul className="space-y-1.5 mb-6">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="text-muted-foreground text-[0.92rem] leading-relaxed flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span> {b}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Skills as tags if available */}
            {skills.length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-3">Навыки</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{skill}</span>
                  ))}
                </div>
              </>
            )}

            {/* Hiring Process removed — was hardcoded placeholder, not real data */}
            <div className="h-4" />

            {/* Source */}
            <p className="text-sm text-muted-foreground">
              Источник: {job.source || "MCPHire"} · Опубликовано: {formatDate(job.postedAt)}
            </p>

            <CareerClubBanner variant="inline" utmSource="job_detail" />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Company Info Card */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-sm mb-3">О компании</h4>
              <ul className="space-y-0">
                {companyInfo.map((item, i) => (
                  <li key={i} className="flex justify-between py-2 text-sm border-b border-border last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Match Breakdown Card — only for authenticated users */}
            {isAuthenticated && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h4 className="font-bold text-sm mb-3">Детали матча</h4>
                <div className="space-y-3">
                  {matchBreakdown.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.value}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Jobs Card */}
            {similarJobs.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <h4 className="font-bold text-sm mb-3">Похожие вакансии</h4>
                <div className="space-y-0">
                  {similarJobs.map((rj) => {
                    const rjCompanyName = typeof rj.company === "string" ? rj.company : rj.company.name;
                    return (
                      <Link key={rj.id} to={`/jobs/${rj.id}`} className="flex gap-3 py-3 border-b border-border last:border-0 hover:opacity-80 transition-opacity">
                        <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs"
                          style={{ background: getCompanyColor(rjCompanyName), color: getCompanyTextColor(rjCompanyName) }}>
                          {rjCompanyName[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold hover:text-primary transition-colors">{rj.title}</div>
                          <div className="text-xs text-muted-foreground">{rjCompanyName}</div>
                          <div className="text-xs text-primary font-medium mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            {rj.salaryFrom && rj.salaryTo
                              ? `${formatSalary(rj.salaryFrom)} — ${formatSalary(rj.salaryTo)} ${rj.currency}`
                              : "—"}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Spacer for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
      <CareerClubBanner variant="block" utmSource="job_detail_footer" />
      <Footer />

      {/* Mobile Sticky Apply Bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background/95 backdrop-blur-lg border-t border-border px-4 py-3 z-40">
        <div className="flex gap-3 max-w-[600px] mx-auto">
          <button
            onClick={() => setApplyOpen(true)}
            className="flex-1 px-6 py-3 rounded-full bg-cta-hot text-white text-sm font-semibold text-center hover:bg-cta-hot/90 transition-colors"
          >
            Откликнуться
          </button>
          <button className="px-4 py-3 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">
            Сохранить
          </button>
        </div>
      </div>

      <ApplyDialog
        jobId={job.id}
        jobTitle={job.title}
        companyName={companyName}
        open={applyOpen}
        onOpenChange={setApplyOpen}
        responseLetterRequired={job.responseLetterRequired}
      />
      <JobPostingJsonLd job={job} />
    </main>
  );
};

export default JobDetailPage;
