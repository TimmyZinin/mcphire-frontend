import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import { useJob, useSimilarJobs } from "@/hooks/useJobs";
import { useAuth } from "@/contexts/AuthContext";
import { formatSalary, formatDate, formatRelativeTime } from "@/lib/formatters";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { SkeletonCard } from "@/components/JobCard";
import { ApplyDialog } from "@/components/jobs/ApplyDialog";
import { JobPostingJsonLd } from "@/components/seo/JsonLd";
import { V3JobDetailHero } from "@/components/v3/JobDetailHero";

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

  // Deterministic 80-99 match score until real scoring is wired in
  const getMatchScore = (jobId: string): number => {
    let hash = 0;
    for (let i = 0; i < jobId.length; i++) hash = (hash * 17 + jobId.charCodeAt(i)) | 0;
    return 80 + (Math.abs(hash) % 20);
  };

  // Deterministic V3 gradient class for the Similar Jobs sidebar avatars
  const SIDEBAR_GRADIENTS = ["v3-grad-hot", "v3-grad-cool", "v3-grad-plum", "v3-grad-leaf", "v3-grad-sun"];
  const gradientForId = (s: string): string => {
    let hash = 0;
    for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) | 0;
    return SIDEBAR_GRADIENTS[Math.abs(hash) % SIDEBAR_GRADIENTS.length];
  };

  // If loading
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Загрузка вакансии | MCPHire Вакансии</title>
        </Helmet>
        <JobBoardNavbar />
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
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="MCPHire" />
        <meta property="og:title" content={`${job.title} в ${companyName}`} />
        <meta property="og:description" content={`${job.city} · ${job.salaryFrom && job.salaryTo ? `${formatSalary(job.salaryFrom)} - ${formatSalary(job.salaryTo)} ${job.currency}` : ""}`} />
        <meta property="og:url" content={`https://mcphire.com/jobs/${job.slug || job.id}`} />
        {/* Fallback to home og-image — Sprint 12 task 35. Dynamic per-job
            OG image generation deferred to Sprint 14. */}
        <meta property="og:image" content="https://mcphire.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${job.title} в ${companyName}`} />
        <meta name="twitter:image" content="https://mcphire.com/og-image.png" />
        <link rel="canonical" href={`https://mcphire.com/jobs/${job.slug || job.id}`} />
      </Helmet>

      <JobBoardNavbar />

      <div className="max-w-[1280px] mx-auto px-8">
        {/* Breadcrumb */}
        <nav className="py-4 text-sm text-muted-foreground flex items-center gap-2">
          <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors">Вакансии</Link>
          <span>/</span>
          <span className="text-foreground">{job.title}</span>
        </nav>

        {/* Job Header — V3 grad-hot full-width card */}
        <V3JobDetailHero
          companyName={companyName}
          companyVerified={typeof job.company === "object" && Boolean((job.company as { isVerified?: boolean }).isVerified)}
          title={job.title}
          salaryLabel={
            job.salaryFrom && job.salaryTo
              ? `${formatSalary(job.salaryFrom)} — ${formatSalary(job.salaryTo)} ${job.currency}`
              : "Зарплата не указана"
          }
          location={job.city}
          freshLabel={formatRelativeTime(job.postedAt)}
          matchScore={isAuthenticated ? matchScore : null}
          matchLabel="матч"
          tags={[job.format, job.level, ...skills.slice(0, 3)].filter(Boolean)}
          primaryAction={
            <button
              onClick={() => setApplyOpen(true)}
              className="v3-btn"
              style={{ background: "#fff", color: "var(--v3-ink)", boxShadow: "0 4px 0 rgba(0,0,0,.12)" }}
            >
              ▶ Откликнуться
            </button>
          }
          secondaryAction={
            <button
              className="v3-btn"
              style={{ background: "rgba(255,255,255,.18)", color: "#fff", backdropFilter: "blur(20px)" }}
            >
              ★ Сохранить
            </button>
          }
        />
        <div className="h-8" />

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
                      <Link key={rj.id} to={`/jobs/${rj.slug || rj.id}`} className="flex gap-3 py-3 border-b border-border last:border-0 hover:opacity-80 transition-opacity">
                        <div
                          className={`${gradientForId(rj.id)} w-9 h-9 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs text-white`}
                          aria-hidden
                        >
                          {rjCompanyName[0]?.toUpperCase()}
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
