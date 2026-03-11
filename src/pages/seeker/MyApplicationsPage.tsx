// ============================================================
// MCPHire — My Applications page
// Route: /applications (protected: seeker)
// ============================================================

import { Link } from "react-router-dom";
import { FileText, ExternalLink, MessageSquare, CalendarDays } from "lucide-react";
import { PageMeta } from "@/components/seo/PageMeta";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { useSeekerApplications } from "@/hooks/useSeeker";
import {
  formatRelativeTime,
  formatSalaryRange,
  applicationStatusLabels,
  applicationStatusColors,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Application } from "@/types";

function ApplicationRow({ app }: { app: Application }) {
  const companyName =
    typeof app.job.company === "string" ? app.job.company : app.job.company.name;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Job info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/jobs/${app.jobId}`}
          className="font-bold text-base hover:text-primary transition-colors line-clamp-1"
        >
          {app.job.title}
        </Link>
        <div className="text-sm text-muted-foreground mt-0.5">{companyName}</div>
        <div className="font-mono text-xs text-primary mt-1">
          {formatSalaryRange(app.job.salaryFrom, app.job.salaryTo, app.job.currency)}
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
            applicationStatusColors[app.status] ?? "bg-muted text-muted-foreground"
          )}
        >
          {applicationStatusLabels[app.status] ?? app.status}
        </span>

        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatRelativeTime(app.appliedAt)}
        </span>

        <Link
          to={`/jobs/${app.jobId}`}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Открыть вакансию"
        >
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Employer feedback */}
      {app.employerNote && (
        <div className="w-full flex items-start gap-2 mt-1 pt-3 border-t border-border">
          <MessageSquare className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">{app.employerNote}</p>
        </div>
      )}

      {/* Interview date */}
      {app.interviewDate && (
        <div className="w-full flex items-center gap-2 mt-1 pt-2 border-t border-border">
          <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-sm text-primary font-medium">
            Интервью: {new Date(app.interviewDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MyApplicationsPage() {
  const { data: applications, isLoading } = useSeekerApplications();

  return (
    <main className="min-h-screen bg-background">
      <PageMeta title="Мои отклики" />
      <JobBoardNavbar />

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-10">
        <h1 className="heading-lg mb-2">Мои отклики</h1>
        <p className="text-muted-foreground mb-8">
          {applications?.length
            ? `${applications.length} ${applications.length === 1 ? "отклик" : "откликов"}`
            : ""}
        </p>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                <div className="h-5 w-2/3 bg-muted rounded mb-2" />
                <div className="h-3 w-1/3 bg-muted rounded mb-2" />
                <div className="h-3 w-1/4 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : !applications?.length ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold mb-2">Пока нет откликов</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Найдите подходящую вакансию и откликнитесь
            </p>
            <Link to="/jobs" className="cta-primary">
              Смотреть вакансии
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <ApplicationRow key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
