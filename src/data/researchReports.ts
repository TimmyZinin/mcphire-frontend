export interface ResearchReport {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  badge: string;
  color: string;
}

export const RESEARCH_REPORTS: ResearchReport[] = [
  {
    slug: "instagram-job-search-2026",
    title: "Как люди ищут работу в Instagram",
    description: "Анализ 120+ аккаунтов, вирусного контента, болей и пустых ниш русскоязычного рынка",
    date: "март 2026",
    readingTime: 12,
    badge: "Исследование 2026",
    color: "#E8735A",
  },
];

export function getResearchReport(slug: string): ResearchReport | undefined {
  return RESEARCH_REPORTS.find((r) => r.slug === slug);
}
