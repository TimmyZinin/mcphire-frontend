// ============================================================
// MCPHire — Shared formatting utilities
// ============================================================

import type { Currency, Locale } from "@/types";

// ---- Salary ------------------------------------------------

export function formatSalary(
  value: number,
  currency: Currency = "RUB",
  locale: Locale = "ru"
): string {
  const localeMap: Record<Locale, string> = {
    ru: "ru-RU",
    en: "en-US",
    ar: "ar-AE",
    hi: "hi-IN",
  };
  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSalaryRange(
  from: number | null,
  to: number | null,
  currency: Currency = "RUB",
  locale: Locale = "ru"
): string {
  if (!from && !to) return "Зарплата не указана";
  if (!from && to) return `до ${formatSalary(to, currency, locale)}`;
  if (from && !to) return `от ${formatSalary(from, currency, locale)}`;
  return `${formatSalary(from!, currency, locale)} — ${formatSalary(to!, currency, locale)}`;
}

// ---- Dates -------------------------------------------------

export function formatRelativeTime(dateStr: string, locale: Locale = "ru"): string {
  const localeMap: Record<Locale, string> = {
    ru: "ru-RU",
    en: "en-US",
    ar: "ar-AE",
    hi: "hi-IN",
  };
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat(localeMap[locale], { numeric: "auto" });

  if (diffDays === 0) return rtf.format(0, "day");
  if (diffDays < 7) return rtf.format(-diffDays, "day");
  if (diffDays < 30) return rtf.format(-Math.floor(diffDays / 7), "week");
  if (diffDays < 365) return rtf.format(-Math.floor(diffDays / 30), "month");
  return rtf.format(-Math.floor(diffDays / 365), "year");
}

export function formatDate(dateStr: string, locale: Locale = "ru"): string {
  const localeMap: Record<Locale, string> = {
    ru: "ru-RU",
    en: "en-US",
    ar: "ar-AE",
    hi: "hi-IN",
  };
  return new Date(dateStr).toLocaleDateString(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ---- Numbers -----------------------------------------------

export function formatCount(count: number, locale: Locale = "ru"): string {
  const localeMap: Record<Locale, string> = {
    ru: "ru-RU",
    en: "en-US",
    ar: "ar-AE",
    hi: "hi-IN",
  };
  return new Intl.NumberFormat(localeMap[locale]).format(count);
}

// ---- Skill level -------------------------------------------

export const skillLevelLabels: Record<string, string> = {
  basic: "Базовый",
  intermediate: "Средний",
  advanced: "Продвинутый",
  expert: "Эксперт",
};

// ---- Application status ------------------------------------

export const applicationStatusLabels: Record<string, string> = {
  new: "Новый",
  viewed: "Просмотрен",
  interview: "Интервью",
  offer: "Оффер",
  hired: "Принят",
  rejected: "Отклонён",
};

export const applicationStatusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  viewed: "bg-amber-50 text-amber-700",
  interview: "bg-purple-50 text-purple-700",
  offer: "bg-emerald-50 text-emerald-700",
  hired: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-50 text-red-700",
};

// ---- Job format colors -------------------------------------

export const formatColors: Record<string, string> = {
  "Удалённо": "bg-emerald-50 text-emerald-700",
  "Офис": "bg-blue-50 text-blue-700",
  "Гибрид": "bg-amber-50 text-amber-700",
};

export const levelColors: Record<string, string> = {
  Junior: "bg-sky-50 text-sky-700",
  Middle: "bg-violet-50 text-violet-700",
  Senior: "bg-orange-50 text-orange-700",
  Lead: "bg-rose-50 text-rose-700",
};

// ---- Slugify -----------------------------------------------

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zа-яё0-9-]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
