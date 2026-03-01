// ============================================================
// СБОРКА — Reusable Job Card
// Used on /jobs list page and similar jobs sidebar.
// ============================================================

import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatSalaryRange,
  formatRelativeTime,
  formatColors,
  levelColors,
} from "@/lib/formatters";
import type { JobListItem } from "@/types";

interface JobCardProps {
  job: JobListItem;
  matchScore?: number;
  isPremium?: boolean;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  variant?: "default" | "compact";
  className?: string;
}

function CompanyAvatar({ company }: { company: JobListItem["company"] }) {
  if (company.logoUrl) {
    return (
      <img
        src={company.logoUrl}
        alt={company.name}
        className="w-11 h-11 rounded-xl object-contain bg-muted"
      />
    );
  }
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
      style={{
        background: company.brandColor ?? "hsl(var(--muted))",
        color: "#fff",
      }}
      aria-hidden="true"
    >
      {company.name[0]}
    </div>
  );
}

export function JobCard({
  job,
  matchScore,
  isPremium = false,
  isSaved = false,
  onSave,
  variant = "default",
  className,
}: JobCardProps) {
  const isCompact = variant === "compact";

  return (
    <article
      className={cn(
        "group relative bg-card border rounded-2xl transition-all",
        isPremium
          ? "border-accent/50 ring-1 ring-accent/20 hover:border-accent hover:shadow-lg hover:-translate-y-0.5"
          : "border-border hover:border-primary hover:shadow-lg hover:-translate-y-0.5",
        isCompact ? "p-4" : "p-6",
        className
      )}
    >
      {/* Premium badge */}
      {isPremium && !isCompact && (
        <div className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold text-[0.65rem] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
          Premium
        </div>
      )}

      {/* Match badge */}
      {matchScore !== undefined && (
        <div
          className="absolute top-4 right-4 bg-primary text-primary-foreground font-mono text-xs font-bold px-2.5 py-1 rounded-full"
          aria-label={`${matchScore}% соответствие`}
        >
          {matchScore}% матч
        </div>
      )}

      {/* Save button */}
      {onSave && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSave(job.id);
          }}
          className={cn(
            "absolute top-4 right-4 p-1.5 rounded-lg transition-colors",
            "hover:bg-muted",
            matchScore !== undefined && "right-24"
          )}
          aria-label={isSaved ? "Убрать из сохранённых" : "Сохранить вакансию"}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-primary" />
          ) : (
            <Bookmark className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      )}

      <Link to={`/jobs/${job.slug || job.id}`} className="block">
        {/* Company row */}
        <div className="flex items-center gap-3 mb-3">
          <CompanyAvatar company={job.company} />
          <div>
            <div className="text-sm text-muted-foreground font-medium leading-tight">
              {job.company.name}
            </div>
            {job.company.isVerified && (
              <span className="text-[0.7rem] text-primary font-semibold">
                Верифицирован
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-bold leading-snug mb-2",
            isCompact ? "text-base pr-6" : "text-lg pr-16",
            matchScore !== undefined && "pr-20"
          )}
        >
          {job.title}
        </h3>

        {/* Salary */}
        <div className="font-mono font-semibold text-sm text-primary mb-3">
          {formatSalaryRange(job.salaryFrom, job.salaryTo, job.currency)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.skills.slice(0, isCompact ? 3 : 4).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              formatColors[job.format] ?? "bg-muted text-muted-foreground"
            )}
          >
            {job.format}
          </span>
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              levelColors[job.level] ?? "bg-muted text-muted-foreground"
            )}
          >
            {job.level}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{job.city}</span>
          <span>{formatRelativeTime(job.postedAt)}</span>
        </div>
      </Link>
    </article>
  );
}
