// ============================================================
// СБОРКА — Reusable Job Card Component
// ============================================================

import { Link } from "react-router-dom";
import type { JobListItem } from "@/types";
import { formatSalaryRange, formatRelativeTime } from "@/lib/formatters";

interface JobCardProps {
  job: JobListItem;
  showMatchScore?: boolean;
}

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

function getCompanyColor(companyName: string): string {
  return companyColors[companyName]?.bg || "#e6f5ee";
}

function getCompanyTextColor(companyName: string): string {
  return companyColors[companyName]?.text || "#1b6b52";
}

function getMatchScore(id: string): number {
  const scores: Record<string, number> = {
    Senior: 90,
    Middle: 85,
    Lead: 88,
    Junior: 75,
  };
  const base = scores["Middle"] || 80;
  return base + (parseInt(id, 10) % 10);
}

export function JobCard({ job, showMatchScore = true }: JobCardProps) {
  const companyName = typeof job.company === "string" ? job.company : job.company.name;
  const matchScore = getMatchScore(job.id);

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all relative"
    >
      {/* Match Badge */}
      {showMatchScore && (
        <div className="absolute top-4 right-4 bg-primary text-white font-mono text-xs font-bold px-2.5 py-1 rounded-full">
          {matchScore}% матч
        </div>
      )}

      {/* Company Row */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center font-bold text-base shrink-0"
          style={{ background: getCompanyColor(companyName), color: getCompanyTextColor(companyName) }}
        >
          {companyName[0]}
        </div>
        <div>
          <div className="text-sm text-muted-foreground font-medium">{companyName}</div>
          {typeof job.company === "object" && job.company.isVerified && (
            <span className="text-[0.7rem] text-primary font-semibold">✓ Верифицирован</span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg mb-2 leading-snug pr-16">{job.title}</h3>

      {/* Salary */}
      <div className="font-mono font-semibold text-base text-primary mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {formatSalaryRange(job.salaryFrom, job.salaryTo, job.currency)}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {skill}
          </span>
        ))}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          job.format === "Удалённо" ? "bg-emerald-50 text-emerald-700" : "bg-muted text-muted-foreground"
        }`}>
          {job.format}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>{job.city}</span>
        <span>{formatRelativeTime(job.postedAt)}</span>
      </div>
    </Link>
  );
}

// ============================================================
// Skeleton Card for Loading State
// ============================================================

export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-muted" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-muted rounded" />
          <div className="h-2 w-16 bg-muted rounded" />
        </div>
      </div>
      <div className="h-5 w-3/4 bg-muted rounded mb-2" />
      <div className="h-4 w-1/2 bg-muted rounded mb-3" />
      <div className="flex gap-1.5 mb-3">
        <div className="h-6 w-16 bg-muted rounded-full" />
        <div className="h-6 w-20 bg-muted rounded-full" />
        <div className="h-6 w-14 bg-muted rounded-full" />
      </div>
      <div className="flex gap-4">
        <div className="h-3 w-16 bg-muted rounded" />
        <div className="h-3 w-20 bg-muted rounded" />
      </div>
    </div>
  );
}

// ============================================================
// Skeleton Grid
// ============================================================

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 pb-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
