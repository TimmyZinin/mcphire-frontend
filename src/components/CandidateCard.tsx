// ============================================================
// MCPHire V3 — Candidate Card
// Bento-style card for the public candidates catalog. No PII —
// masked profile id, no contacts, just stack/seniority/CV link.
// ============================================================

import { useTranslation } from "react-i18next";
import type { CandidateListItem } from "@/types";

interface CandidateCardProps {
  candidate: CandidateListItem;
}

// Same 6-stop gradient rotation used by JobCard company avatars.
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

const SENIORITY_LABELS: Record<string, { ru: string; en: string }> = {
  junior: { ru: "Junior", en: "Junior" },
  middle: { ru: "Middle", en: "Middle" },
  senior: { ru: "Senior", en: "Senior" },
  staff: { ru: "Staff", en: "Staff" },
  principal: { ru: "Principal", en: "Principal" },
  lead: { ru: "Lead", en: "Lead" },
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  const { i18n } = useTranslation();
  const L = i18n.language?.startsWith("en");

  const gradient = gradientForId(candidate.profileIdMasked || candidate.displayName);
  const initial = (candidate.displayName || "?").trim().charAt(0).toUpperCase() || "?";
  const seniorityKey = candidate.seniority?.toLowerCase();
  const seniorityLabel = seniorityKey && SENIORITY_LABELS[seniorityKey]
    ? SENIORITY_LABELS[seniorityKey][L ? "en" : "ru"]
    : candidate.seniority;

  return (
    <div className="v3-card p-5 relative overflow-hidden">
      {/* Top row: gradient avatar + name + headline */}
      <div className="flex items-start gap-3.5">
        <div
          className={`${gradient} grid place-items-center text-white font-bold text-base shrink-0`}
          style={{ width: 52, height: 52, borderRadius: 16, letterSpacing: "-.01em" }}
          aria-hidden
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[18px] font-bold leading-tight" style={{ letterSpacing: "-.02em" }}>
            {candidate.displayName || (L ? "Candidate" : "Кандидат")}
          </div>
          {candidate.headline && (
            <div className="text-sm text-v3-ink2 font-medium mt-0.5 line-clamp-2">
              {candidate.headline}
            </div>
          )}
        </div>
      </div>

      {/* Stack chips */}
      {candidate.stackSummary.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {candidate.stackSummary.slice(0, 6).map((skill) => (
            <span key={skill} className="v3-chip">
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer row: seniority + timezone + intent + CV link */}
      <div
        className="flex items-center gap-3 flex-wrap mt-4 pt-3.5 border-t"
        style={{ borderColor: "var(--v3-line2)" }}
      >
        {seniorityLabel && (
          <span className="v3-mono text-[13px] font-semibold text-v3-ink">{seniorityLabel}</span>
        )}
        {candidate.timezone && (
          <span className="text-[13px] text-v3-mute">· {candidate.timezone}</span>
        )}
        {candidate.intentHorizon && (
          <span className="text-[13px] text-v3-mute">· {candidate.intentHorizon}</span>
        )}
        <span className="flex-1" />
        {candidate.cvUrl && (
          <a
            href={candidate.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-v3-hot hover:underline shrink-0"
          >
            {L ? "View CV →" : "Смотреть CV →"}
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Skeleton Card for Loading State
// ============================================================

export function CandidateSkeletonCard() {
  return (
    <div className="v3-card p-5 animate-pulse">
      <div className="flex items-start gap-3.5">
        <div className="w-[52px] h-[52px] rounded-2xl bg-v3-bg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-v3-bg rounded" />
          <div className="h-3 w-1/2 bg-v3-bg rounded" />
        </div>
      </div>
      <div className="flex gap-1.5 mt-3.5">
        <div className="h-6 w-16 bg-v3-bg rounded-lg" />
        <div className="h-6 w-20 bg-v3-bg rounded-lg" />
        <div className="h-6 w-14 bg-v3-bg rounded-lg" />
      </div>
      <div className="flex items-center gap-3 mt-4 pt-3.5 border-t" style={{ borderColor: "var(--v3-line2)" }}>
        <div className="h-3 w-16 bg-v3-bg rounded" />
        <div className="h-3 w-16 bg-v3-bg rounded" />
      </div>
    </div>
  );
}

export function CandidateSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 pb-8">
      {Array.from({ length: count }).map((_, i) => (
        <CandidateSkeletonCard key={i} />
      ))}
    </div>
  );
}
