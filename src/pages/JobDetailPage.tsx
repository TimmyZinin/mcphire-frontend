import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockJobs, type Job } from "@/data/mockJobs";

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
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Главная</Link>
            <span className="mx-2">›</span>
            <Link to="/jobs" className="hover:text-foreground">Вакансии</Link>
            <span className="mx-2">›</span>
            <span className="text-foreground">{job.title}</span>
          </nav>

          {/* Job Header */}
          <h1 className="heading-xl mb-2">{job.title}</h1>
          <p className="text-lg text-muted-foreground mb-2">
            {job.company} · {job.city} · {job.format}
          </p>
          <p className="font-bold text-2xl text-primary mb-4">
            {formatSalary(job.salaryFrom)} – {formatSalary(job.salaryTo)} {job.currency}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="chip">{job.level}</span>
          </div>

          {/* Description */}
          <h2 className="heading-lg mb-4">Описание</h2>
          <p className="text-muted-foreground mb-8">{job.description}</p>

          {/* Requirements */}
          <h2 className="heading-lg mb-4">Требования</h2>
          <ul className="list-arrow mb-8">
            {job.requirements.map((req: string, index: number) => (
              <li key={index} className="text-muted-foreground">{req}</li>
            ))}
          </ul>

          {/* Skills */}
          <h2 className="heading-lg mb-4">Навыки</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {job.skills.map((skill: string) => (
              <span key={skill} className="chip">{skill}</span>
            ))}
          </div>

          {/* Benefits */}
          <h2 className="heading-lg mb-4">Что предлагаем</h2>
          <ul className="list-arrow mb-8">
            {job.benefits.map((benefit: string, index: number) => (
              <li key={index} className="text-muted-foreground">{benefit}</li>
            ))}
          </ul>

          {/* CTA */}
          <a href="#" className="cta-primary-nrc inline-block mb-8">
            Откликнуться
          </a>

          {/* Source & Date */}
          <p className="text-sm text-muted-foreground mb-8">
            Источник: {job.source} · Опубликовано: {formatDate(job.postedAt)}
          </p>

          {/* Back link */}
          <Link to="/jobs" className="cta-text">
            ← Все вакансии
          </Link>
        </div>
      </section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="section-white">
          <div className="section-container">
            <h2 className="heading-lg mb-6">Похожие вакансии</h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
              {relatedJobs.map((relatedJob: Job) => (
                <Link
                  key={relatedJob.id}
                  to={`/jobs/${relatedJob.id}`}
                  className="rounded-2xl border border-border/30 bg-card shadow-lg p-6 hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2">{relatedJob.title}</h3>
                  <p className="text-muted-foreground text-sm mb-1">{relatedJob.company}</p>
                  <p className="text-muted-foreground text-sm mb-2">{relatedJob.city}</p>
                  <p className="font-bold text-primary text-sm">
                    {formatSalary(relatedJob.salaryFrom)} – {formatSalary(relatedJob.salaryTo)} {relatedJob.currency}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default JobDetailPage;
