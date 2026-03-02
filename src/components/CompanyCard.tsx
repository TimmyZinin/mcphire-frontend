// ============================================================
// СБОРКА — Reusable Company Card Component
// ============================================================

import { Link } from "react-router-dom";
import type { CompanyInfo } from "@/types";

// ---- Types -------------------------------------------------

export interface CompanyCardData {
  slug: string;
  name: string;
  industry: string;
  size: string;
  openJobsCount: number;
  isVerified?: boolean;
  city?: string;
  description?: string | null;
}

interface CompanyCardProps {
  company: CompanyCardData;
}

// ---- Color map (mirrors JobCard pattern) -------------------

const companyColors: Record<string, { bg: string; text: string }> = {
  "Яндекс":     { bg: "#fc0",      text: "#000" },
  "МТС":        { bg: "#e30611",   text: "#fff" },
  "Сбер":       { bg: "#21a038",   text: "#fff" },
  "Тинькофф":   { bg: "#ffdd2d",   text: "#333" },
  VK:           { bg: "#0077ff",   text: "#fff" },
  Ozon:         { bg: "#005bff",   text: "#fff" },
  Wildberries:  { bg: "#cb11ab",   text: "#fff" },
  Авито:        { bg: "#00aaff",   text: "#fff" },
  Lamoda:       { bg: "#000",      text: "#fff" },
  Kaspersky:    { bg: "#006d5c",   text: "#fff" },
};

function getCompanyBg(name: string): string {
  return companyColors[name]?.bg ?? "#e6f5ee";
}

function getCompanyTextColor(name: string): string {
  return companyColors[name]?.text ?? "#1b6b52";
}

// ---- Component ---------------------------------------------

export function CompanyCard({ company }: CompanyCardProps) {
  const { slug, name, industry, size, openJobsCount, isVerified } = company;

  return (
    <Link
      to={`/companies/${slug}`}
      className="block bg-card border border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      {/* Logo + Name row */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
          style={{ background: getCompanyBg(name), color: getCompanyTextColor(name) }}
        >
          {name[0]}
        </div>
        <div>
          <div className="font-bold text-base leading-snug">{name}</div>
          {isVerified && (
            <span className="text-[0.7rem] text-primary font-semibold">&#10003; Верифицирован</span>
          )}
        </div>
      </div>

      {/* Meta tags row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {industry}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {size}
        </span>
      </div>

      {/* Open jobs count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Открытых вакансий</span>
        <span
          className="font-mono font-bold text-primary"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {openJobsCount}
        </span>
      </div>
    </Link>
  );
}

// ---- Skeleton ----------------------------------------------

export function CompanyCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-muted shrink-0" />
        <div className="space-y-1.5">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-2 w-16 bg-muted rounded" />
        </div>
      </div>
      <div className="flex gap-1.5 mb-4">
        <div className="h-5 w-20 bg-muted rounded-full" />
        <div className="h-5 w-24 bg-muted rounded-full" />
      </div>
      <div className="flex justify-between">
        <div className="h-3 w-32 bg-muted rounded" />
        <div className="h-3 w-6 bg-muted rounded" />
      </div>
    </div>
  );
}
