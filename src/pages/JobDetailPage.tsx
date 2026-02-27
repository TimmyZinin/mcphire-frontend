import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockJobs, type Job } from "@/data/mockJobs";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find((j: Job) => j.id === id);

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat("ru-RU").format(salary);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  };

  if (!job) {
    return (
      <main className="min-h-screen bg-background">
        <Helmet>
          <title>Вакансия не найдена | СБОРКА Вакансии</title>
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

  // Find related jobs (same skills, max 3)
  const relatedJobs = mockJobs
    .filter((j: Job) => j.id !== job.id)
    .map((j: Job) => ({
      job: j,
      matchCount: j.skills.filter((skill: string) => job.skills.includes(skill)).length
    }))
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3)
    .map((item) => item.job);

  // JSON-LD for Google for Jobs
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedAt,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.city,
        "addressCountry": "RU"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "RUB",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryFrom,
        "maxValue": job.salaryTo,
        "unitText": "MONTH"
      }
    },
    "employmentType": "FULL_TIME",
    "jobLocationType": job.format === "Удалённо" ? "TELECOMMUTE" : undefined
  };

  // Match score calculation
  const getMatchScore = (job: Job): number => {
    const scores: Record<string, number> = { 'Senior': 90, 'Middle': 85, 'Lead': 88, 'Junior': 75 };
    return (scores[job.level] || 80) + (parseInt(job.id) % 10);
  };
  const matchScore = getMatchScore(job);

  // Company colors
  const companyColors: Record<string, { bg: string; text: string }> = {
    'Яндекс': { bg: '#fc0', text: '#000' },
    'МТС': { bg: '#e30611', text: '#fff' },
    'Сбер': { bg: '#21a038', text: '#fff' },
    'Тинькофф': { bg: '#ffdd2d', text: '#333' },
    'VK': { bg: '#0077ff', text: '#fff' },
    'Ozon': { bg: '#005bff', text: '#fff' },
    'Wildberries': { bg: '#cb11ab', text: '#fff' },
    'Авито': { bg: '#00aaff', text: '#fff' },
    'Lamoda': { bg: '#000', text: '#fff' },
    'Kaspersky': { bg: '#006d5c', text: '#fff' },
  };
  const getCompanyColor = (c: string) => companyColors[c]?.bg || '#e6f5ee';
  const getCompanyTextColor = (c: string) => companyColors[c]?.text || '#1b6b52';

  // Company info
  const companyInfo = [
    { label: 'Индустрия', value: 'IT' },
    { label: 'Размер', value: '1000+ сотрудников' },
    { label: 'Офис', value: job.city },
    { label: 'Формат', value: job.format },
  ];

  // Match breakdown
  const matchBreakdown = [
    { label: 'Навыки', value: Math.min(matchScore + 4, 100) },
    { label: 'Зарплата', value: Math.min(matchScore - 2, 100) },
    { label: 'Опыт', value: Math.min(matchScore + 2, 100) },
    { label: 'Локация', value: job.format === 'Удалённо' ? 100 : 85 },
  ];

  // Hiring steps
  const hiringSteps = [
    { title: 'Тех. скрининг', desc: '30 мин, онлайн' },
    { title: 'Лайвкодинг', desc: '1.5 часа' },
    { title: 'System Design', desc: '1 час' },
    { title: 'Оффер', desc: '1-3 дня' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{job.title} в {job.company} | СБОРКА Вакансии</title>
        <meta name="description" content={`${job.title} в компании ${job.company}. ${job.city}. Зарплата ${formatSalary(job.salaryFrom)} - ${formatSalary(job.salaryTo)} ${job.currency}. ${job.description}`} />
        <meta property="og:title" content={`${job.title} в ${job.company}`} />
        <meta property="og:description" content={`${job.city} · ${formatSalary(job.salaryFrom)} - ${formatSalary(job.salaryTo)} ${job.currency}`} />
        <meta property="og:url" content={`https://sborka.work/jobs/${job.id}`} />
        <link rel="canonical" href={`https://sborka.work/jobs/${job.id}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <JobBoardNavbar />

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
                style={{ background: getCompanyColor(job.company), color: getCompanyTextColor(job.company) }}>
                {job.company[0]}
              </div>
              <div>
                <div className="text-base font-semibold">{job.company}</div>
                <span className="text-xs text-primary font-semibold">✓ Верифицированная компания</span>
              </div>
            </div>
            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">{job.title}</h1>
            {/* Salary */}
            <div className="text-xl font-semibold text-primary mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {formatSalary(job.salaryFrom)} — {formatSalary(job.salaryTo)} {job.currency}
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                job.format === 'Удалённо' ? 'bg-emerald-50 text-emerald-700' : 'bg-muted text-muted-foreground'
              }`}>{job.format}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">{job.level}</span>
              {job.skills.slice(0, 3).map((skill: string) => (
                <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{skill}</span>
              ))}
            </div>
          </div>

          {/* Right — Match Circle + Actions */}
          <div className="flex flex-col items-end gap-4 min-w-[220px]">
            {/* SVG Match Circle */}
            <div className="relative w-[100px] h-[100px] flex items-center justify-center flex-col">
              <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-0 left-0" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary"
                  strokeDasharray="276.5" strokeDashoffset={276.5 - (276.5 * matchScore / 100)} strokeLinecap="round" />
              </svg>
              <span className="text-2xl font-extrabold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{matchScore}%</span>
              <span className="text-[0.7rem] text-muted-foreground">Ваш матч</span>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-3 w-full">
              <a href={`https://t.me/Sborka_work_bot?start=apply_${job.id}`} target="_blank" rel="noopener noreferrer"
                className="flex-1 px-6 py-3 rounded-full bg-[#e8604c] text-white text-sm font-semibold text-center hover:bg-[#d4503e] transition-colors">
                Откликнуться
              </a>
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
            <p className="text-muted-foreground leading-relaxed mb-6">{job.description}</p>

            <h2 className="text-xl font-bold mb-3">Требования</h2>
            <ul className="space-y-1.5 mb-6">
              {job.requirements.map((req, i) => (
                <li key={i} className="text-muted-foreground text-[0.92rem] leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span> {req}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mb-3">Мы предлагаем</h2>
            <ul className="space-y-1.5 mb-6">
              {job.benefits.map((b, i) => (
                <li key={i} className="text-muted-foreground text-[0.92rem] leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span> {b}
                </li>
              ))}
            </ul>

            {/* Hiring Process */}
            <h2 className="text-xl font-bold mb-4">Процесс найма</h2>
            <div className="flex gap-0 mb-8">
              {hiringSteps.map((step, i) => (
                <div key={i} className="flex-1 text-center relative">
                  {i < hiringSteps.length - 1 && (
                    <div className="absolute top-[18px] right-[-12px] w-6 h-0.5 bg-border" />
                  )}
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-2">
                    {i + 1}
                  </div>
                  <div className="text-xs font-semibold">{step.title}</div>
                  <div className="text-[0.72rem] text-muted-foreground mt-0.5">{step.desc}</div>
                </div>
              ))}
            </div>

            {/* Source */}
            <p className="text-sm text-muted-foreground">
              Источник: {job.source} · Опубликовано: {formatDate(job.postedAt)}
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

            {/* Match Breakdown Card */}
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

            {/* Similar Jobs Card */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-bold text-sm mb-3">Похожие вакансии</h4>
              <div className="space-y-0">
                {relatedJobs.map((rj: Job) => (
                  <Link key={rj.id} to={`/jobs/${rj.id}`} className="flex gap-3 py-3 border-b border-border last:border-0 hover:opacity-80 transition-opacity">
                    <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs"
                      style={{ background: getCompanyColor(rj.company), color: getCompanyTextColor(rj.company) }}>
                      {rj.company[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold hover:text-primary transition-colors">{rj.title}</div>
                      <div className="text-xs text-muted-foreground">{rj.company}</div>
                      <div className="text-xs text-primary font-medium mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {formatSalary(rj.salaryFrom)} — {formatSalary(rj.salaryTo)} {rj.currency}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default JobDetailPage;
