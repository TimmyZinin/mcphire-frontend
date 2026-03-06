// ============================================================
// MCPHire — JSON-LD structured data components
// ============================================================

import { Helmet } from "react-helmet-async";
import type { Job } from "@/types";

// ---- JobPosting Schema.org ---------------------------------

interface JobPostingJsonLdProps {
  job: Job;
  siteUrl?: string;
}

export function JobPostingJsonLd({
  job,
  siteUrl = "https://mcphire.com",
}: JobPostingJsonLdProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt,
    validThrough: job.expiresAt ?? undefined,
    url: `${siteUrl}/jobs/${job.slug || job.id}`,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      sameAs: job.company.website ?? undefined,
      logo: job.company.logoUrl ?? undefined,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: job.country ?? "RU",
      },
    },
    ...(job.format === "Удалённо"
      ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Russia" } }
      : {}),
    baseSalary: job.salaryFrom
      ? {
          "@type": "MonetaryAmount",
          currency: job.currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: job.salaryFrom,
            maxValue: job.salaryTo ?? undefined,
            unitText: "MONTH",
          },
        }
      : undefined,
    employmentType: mapEmploymentType(job.employmentType),
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: levelToMonths(job.level),
    },
    skills: job.skills.map((s) => s.name).join(", "),
    identifier: {
      "@type": "PropertyValue",
      name: "MCPHire",
      value: job.id,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ---- JobSearchResultsPage ----------------------------------

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ---- Helpers -----------------------------------------------

function mapEmploymentType(type: string): string {
  const map: Record<string, string> = {
    "Полная занятость": "FULL_TIME",
    "Частичная занятость": "PART_TIME",
    "Проект": "CONTRACTOR",
    "Стажировка": "INTERN",
  };
  return map[type] ?? "FULL_TIME";
}

function levelToMonths(level: string): number {
  const map: Record<string, number> = {
    Junior: 6,
    Middle: 36,
    Senior: 60,
    Lead: 84,
  };
  return map[level] ?? 24;
}
