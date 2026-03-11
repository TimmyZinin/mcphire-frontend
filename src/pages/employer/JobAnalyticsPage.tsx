// ============================================================
// MCPHire — Job Analytics Page
// Route: /employer/jobs/:id/analytics (protected: employer)
// ============================================================

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Eye, Users, TrendingUp, MapPin, Wrench } from "lucide-react";
import { useJobAnalytics } from "@/hooks/useEmployer";
import { useJob } from "@/hooks/useJobs";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";

// ---- Mini bar chart ----------------------------------------

function BarChart({ data, label }: { data: Array<{ date: string; count: number }>; label: string }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="font-bold text-sm mb-4">{label}</h3>
      <div className="flex items-end gap-1 h-[120px]">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-primary/80 rounded-t-sm min-h-[2px] transition-all"
              style={{ height: `${(d.count / max) * 100}%` }}
            />
            <span className="text-[0.6rem] text-muted-foreground leading-none">
              {new Date(d.date).getDate()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Stat card ---------------------------------------------

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

// ---- Ranked list -------------------------------------------

function RankedList({ items, label }: { items: Array<{ name: string; count: number }>; label: string }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="font-bold text-sm mb-3">{label}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {item.count}
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main component ----------------------------------------

const JobAnalyticsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: analytics, isLoading: analyticsLoading } = useJobAnalytics(id || "");
  const { data: job, isLoading: jobLoading } = useJob(id || "");

  const isLoading = analyticsLoading || jobLoading;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{job ? `Аналитика: ${job.title}` : "Аналитика вакансии"} | MCPHire</title>
      </Helmet>
      <JobBoardNavbar />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Back link */}
        <Link
          to="/employer/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к дашборду
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight mb-1">
            {job ? `Аналитика: ${job.title}` : "Аналитика вакансии"}
          </h1>
          {job && (
            <p className="text-sm text-muted-foreground">
              {typeof job.company === "object" ? job.company.name : job.company} · {job.city}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted" />
                  <div className="space-y-2">
                    <div className="h-6 w-16 bg-muted rounded" />
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : analytics ? (
          <>
            {/* Stats grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Всего просмотров" value={analytics.viewCount} icon={<Eye className="w-5 h-5" />} />
              <StatCard label="Уникальных просмотров" value={analytics.uniqueViewCount} icon={<Eye className="w-5 h-5" />} />
              <StatCard label="Откликов" value={analytics.applicationCount} icon={<Users className="w-5 h-5" />} />
              <StatCard
                label="Конверсия"
                value={`${analytics.conversionRate.toFixed(1)}%`}
                icon={<TrendingUp className="w-5 h-5" />}
              />
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <BarChart data={analytics.viewsByDay} label="Просмотры по дням" />
              <BarChart data={analytics.applicationsByDay} label="Отклики по дням" />
            </div>

            {/* Ranked lists */}
            <div className="grid md:grid-cols-2 gap-4">
              <RankedList
                items={analytics.topSourceCities.map((c) => ({ name: c.city, count: c.count }))}
                label="Города кандидатов"
              />
              <RankedList
                items={analytics.topSkillMatches.map((s) => ({ name: s.skill, count: s.count }))}
                label="Навыки кандидатов"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            Данные аналитики не найдены.
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default JobAnalyticsPage;
