// ============================================================
// MCPHire — Employer Dashboard page
// Route: /employer/dashboard (protected: employer)
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Users, TrendingUp, Building2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/seo/PageMeta";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import {
  useEmployerProfile,
  useEmployerJobs,
  useEmployerApplications,
  useUpdateApplicationStatus,
} from "@/hooks/useEmployer";
import {
  formatRelativeTime,
  applicationStatusLabels,
  applicationStatusColors,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Application } from "@/types";

// ---- Stats card --------------------------------------------

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  suffix?: string;
}

function StatCard({ label, value, icon, suffix }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black tracking-tight">
          {value}
          {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

// ---- Jobs tab ----------------------------------------------

function JobsTab() {
  const { data: jobs, isLoading } = useEmployerJobs();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!jobs?.data.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="font-medium">Вакансий пока нет</p>
        <p className="text-sm mt-1">Разместите первую вакансию бесплатно</p>
        <Link to="/employer/jobs/create">
          <Button className="mt-4 bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full">
            <Plus className="w-4 h-4 mr-2" /> Разместить вакансию
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.data.map((job) => (
        <div
          key={job.id}
          className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4"
        >
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{job.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {job.city} · {formatRelativeTime(job.postedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-full",
                job.status === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {job.status === "active" ? "Активна" : "Закрыта"}
            </span>
            <Link
              to={`/employer/jobs/${job.id}/edit`}
              className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Редактировать
            </Link>
            <Link
              to={`/employer/jobs/${job.id}/analytics`}
              className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Аналитика"
            >
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Applications tab --------------------------------------

function ApplicationsTab() {
  const { data: applications, isLoading } = useEmployerApplications();
  const { mutate: updateStatus } = useUpdateApplicationStatus();
  const [filter, setFilter] = useState<Application["status"] | "all">("all");

  const filtered =
    filter === "all"
      ? applications
      : applications?.filter((a) => a.status === filter);

  const statusOptions: Array<{ value: Application["status"] | "all"; label: string }> = [
    { value: "all", label: "Все" },
    { value: "new", label: "Новые" },
    { value: "viewed", label: "Просмотрены" },
    { value: "interview", label: "Интервью" },
    { value: "offer", label: "Оффер" },
    { value: "hired", label: "Принят" },
    { value: "rejected", label: "Отклонён" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              filter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:border-primary"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {!filtered?.length ? (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Откликов нет
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">{app.job.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Кандидат #{app.seekerId.slice(-6)} · {formatRelativeTime(app.appliedAt)}
                  </p>
                  {app.coverLetter && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {app.coverLetter}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full shrink-0",
                    applicationStatusColors[app.status]
                  )}
                >
                  {applicationStatusLabels[app.status]}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {app.status === "new" && (
                  <button
                    onClick={() => updateStatus({ id: app.id, status: "viewed" })}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <Eye className="w-3 h-3" /> Просмотрено
                  </button>
                )}
                {(app.status === "new" || app.status === "viewed") && (
                  <button
                    onClick={() => updateStatus({ id: app.id, status: "interview" })}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <Users className="w-3 h-3" /> Интервью
                  </button>
                )}
                {app.status === "interview" && (
                  <>
                    <button
                      onClick={() => updateStatus({ id: app.id, status: "offer" })}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Оффер
                    </button>
                    <button
                      onClick={() => updateStatus({ id: app.id, status: "rejected" })}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="w-3 h-3" /> Отклонить
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Main page ---------------------------------------------

export default function EmployerDashboardPage() {
  const { data: profile, isLoading } = useEmployerProfile();

  return (
    <main className="min-h-screen bg-background">
      <PageMeta
        title="Кабинет работодателя | MCPHire"
        description="Управляйте вакансиями и откликами"
        noindex
      />
      <JobBoardNavbar />

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-lg">
              {isLoading ? "Загрузка..." : profile?.company.name ?? "Кабинет"}
            </h1>
            {profile && (
              <div className="flex items-center gap-2 mt-1">
                {profile.verificationStatus === "verified" ? (
                  <span className="text-xs text-primary font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Верифицирована
                  </span>
                ) : profile.verificationStatus === "pending" ? (
                  <span className="text-xs text-amber-600 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> На проверке
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Не верифицирована</span>
                )}
              </div>
            )}
          </div>
          <Link to="/employer/jobs/create">
            <Button className="bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full">
              <Plus className="w-4 h-4 mr-2" /> Разместить вакансию
            </Button>
          </Link>
        </div>

        {/* Quota indicator */}
        {profile && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold">
                {profile.jobQuotaUsed} / {profile.jobQuota}
              </span>
              <span className="text-muted-foreground ml-1.5">вакансий использовано</span>
            </div>
            <div className="flex-1 mx-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min((profile.jobQuotaUsed / profile.jobQuota) * 100, 100)}%` }}
                />
              </div>
            </div>
            {profile.jobQuotaUsed === 0 && (
              <span className="text-xs font-semibold text-primary">1 бесплатная</span>
            )}
            {profile.jobQuotaUsed >= profile.jobQuota && (
              <Link
                to="/employers"
                className="text-xs font-semibold text-cta-hot hover:underline shrink-0"
              >
                Расширить квоту
              </Link>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Активных вакансий"
            value={profile?.jobsActiveCount ?? 0}
            icon={<Building2 className="w-5 h-5" />}
          />
          <StatCard
            label="Всего вакансий"
            value={profile?.jobsPostedCount ?? 0}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Просмотров (7 дней)"
            value="—"
            icon={<Eye className="w-5 h-5" />}
          />
          <StatCard
            label="Откликов (7 дней)"
            value="—"
            icon={<Users className="w-5 h-5" />}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs">
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">Мои вакансии</TabsTrigger>
            <TabsTrigger value="applications">Отклики</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <JobsTab />
          </TabsContent>
          <TabsContent value="applications">
            <ApplicationsTab />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  );
}
