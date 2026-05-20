// ============================================================
// MCPHire V3 — Job Card
// Bento-style card with gradient avatar, role/company, tags,
// salary band, location/posted-at meta, MCP match-score badge.
// ============================================================

import { Link } from "react-router-dom";
import type { JobListItem } from "@/types";
import { formatSalaryRange, formatRelativeTime } from "@/lib/formatters";
import { useAuth } from "@/contexts/AuthContext";

interface JobCardProps {
  job: JobListItem & { isPremium?: boolean };
  showMatchScore?: boolean;
}

// 6-stop gradient rotation for company avatars
const GRADIENTS = [
  "v3-grad-hot",
  "v3-grad-cool",
  "v3-grad-plum",
  "v3-grad-leaf",
  "v3-grad-sun",
  "v3-grad-hot",
] as const;

function gradientForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function getMatchScore(id: string): number {
  // Deterministic 80-99 pseudo-match while real scoring isn't wired in.
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 17 + id.charCodeAt(i)) | 0;
  return 80 + (Math.abs(hash) % 20);
}

export function JobCard({ job, showMatchScore = true }: JobCardProps) {
  const { isAuthenticated } = useAuth();
  const companyName = typeof job.company === "string" ? job.company : job.company.name;
  const matchScore = getMatchScore(job.id);
  const canShowMatch = showMatchScore && isAuthenticated;

  // Sprint 8 P0-4: SSR fallback only knows slugs.
  const jobLinkParam = job.slug || job.id;
  const gradient = gradientForId(job.id);

  return (
    <Link
      to={`/jobs/${jobLinkParam}`}
      className="v3-card block p-5 relative overflow-hidden no-underline hover:-translate-y-0.5 transition-transform"
    >
      {/* Premium badge — top right */}
      {job.isPremium && (
        <span
          className="absolute top-4 right-4 v3-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
          style={{ background: "var(--v3-sun)", color: "var(--v3-ink)", letterSpacing: ".06em" }}
        >
          Premium
        </span>
      )}

      {/* Top row: gradient avatar + role + match score */}
      <div className="flex items-start gap-3.5">
        <div
          className={`${gradient} grid place-items-center text-white font-bold text-base shrink-0`}
          style={{ width: 52, height: 52, borderRadius: 16, letterSpacing: "-.01em" }}
          aria-hidden
        >
          {companyName[0].toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm text-v3-ink2 font-medium truncate">
            {companyName}
            {typeof job.company === "object" && job.company.isVerified && (
              <span className="ml-1.5 text-[10px] text-v3-leaf font-semibold align-middle">✓</span>
            )}
          </div>
          <div className="text-[18px] font-bold mt-0.5 leading-tight" style={{ letterSpacing: "-.02em" }}>
            {job.title}
          </div>
        </div>
        {canShowMatch && (
          <div className="text-right shrink-0">
            <div className="v3-mono text-[10px] text-v3-mute uppercase" style={{ letterSpacing: ".06em" }}>
              MATCH
            </div>
            <div className="text-[24px] font-bold text-v3-hot leading-none" style={{ letterSpacing: "-.02em" }}>
              {matchScore}
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3.5">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="v3-chip">
            {skill}
          </span>
        ))}
        {job.format && (
          <span
            className="v3-chip"
            style={{
              background: job.format === "Удалённо" ? "rgba(10,138,82,.12)" : undefined,
              color: job.format === "Удалённо" ? "var(--v3-leaf)" : undefined,
            }}
          >
            {job.format}
          </span>
        )}
      </div>

      {/* Footer row: salary + city + freshness */}
      <div
        className="flex items-center gap-3.5 flex-wrap mt-4 pt-3.5 border-t"
        style={{ borderColor: "var(--v3-line2)" }}
      >
        <span className="v3-mono text-[13px] font-semibold text-v3-ink">
          {formatSalaryRange(job.salaryFrom, job.salaryTo, job.currency)}
        </span>
        {job.city && (
          <span className="text-[13px] text-v3-mute">· {job.city}</span>
        )}
        <span className="flex-1" />
        <span className="text-xs text-v3-leaf font-semibold">● {formatRelativeTime(job.postedAt)}</span>
      </div>
    </Link>
  );
}

// ============================================================
// Skeleton Card for Loading State
// ============================================================

export function SkeletonCard() {
  return (
    <div className="v3-card p-5 animate-pulse">
      <div className="flex items-start gap-3.5">
        <div className="w-[52px] h-[52px] rounded-2xl bg-v3-bg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-v3-bg rounded" />
          <div className="h-4 w-3/4 bg-v3-bg rounded" />
        </div>
      </div>
      <div className="flex gap-1.5 mt-3.5">
        <div className="h-6 w-16 bg-v3-bg rounded-lg" />
        <div className="h-6 w-20 bg-v3-bg rounded-lg" />
        <div className="h-6 w-14 bg-v3-bg rounded-lg" />
      </div>
      <div className="flex items-center gap-3 mt-4 pt-3.5 border-t" style={{ borderColor: "var(--v3-line2)" }}>
        <div className="h-3 w-24 bg-v3-bg rounded" />
        <div className="h-3 w-16 bg-v3-bg rounded" />
      </div>
    </div>
  );
}

// ============================================================
// Skeleton Grid
// ============================================================

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 pb-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
