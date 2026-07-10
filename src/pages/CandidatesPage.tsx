// ============================================================
// MCPHire — Public Candidates Catalog
// Read-only directory of seekers who opted into public display.
// No auth required, no PII surfaced (masked profile id, CV link only).
// ============================================================

import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useCandidates } from "@/hooks/useCandidates";
import { V3Navbar } from "@/components/v3/Navbar";
import Footer from "@/components/Footer";
import { CandidateCard, CandidateSkeletonGrid } from "@/components/CandidateCard";

const SENIORITY_OPTIONS = ["junior", "middle", "senior", "staff", "principal", "lead"] as const;

const SENIORITY_LABELS: Record<string, { ru: string; en: string }> = {
  junior: { ru: "Junior", en: "Junior" },
  middle: { ru: "Middle", en: "Middle" },
  senior: { ru: "Senior", en: "Senior" },
  staff: { ru: "Staff", en: "Staff" },
  principal: { ru: "Principal", en: "Principal" },
  lead: { ru: "Lead", en: "Lead" },
};

const CandidatesPage = () => {
  const { i18n } = useTranslation();
  const L = i18n.language?.startsWith("en");
  const [searchParams, setSearchParams] = useSearchParams();

  const stackParam = searchParams.get("stack") ?? "";
  const seniorityParam = searchParams.get("seniority") ?? "";
  const timezoneParam = searchParams.get("timezone") ?? "";

  const updateParam = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );
  };

  // Normalize "python, react ,  go" → "python,react,go" before hitting the API.
  const normalizedStack = stackParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(",");

  const { data, isLoading, isError } = useCandidates({
    stack: normalizedStack || undefined,
    seniority: seniorityParam || undefined,
    timezone: timezoneParam || undefined,
    limit: 40,
  });

  const candidates = data?.candidates ?? [];
  const count = data?.count ?? 0;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{L ? "Candidates Catalog | MCPHire" : "Каталог кандидатов — MCPHire"}</title>
        <meta
          name="description"
          content={
            L
              ? "Public catalog of IT candidates on MCPHire. Filter by stack, seniority and timezone. No contacts — CV link only."
              : "Публичный каталог IT-кандидатов на MCPHire. Фильтр по стеку, уровню и таймзоне. Без контактов — только ссылка на CV."
          }
        />
        <link rel="canonical" href="https://mcphire.com/candidates" />
        <meta property="og:title" content={L ? "Candidates Catalog | MCPHire" : "Каталог кандидатов — MCPHire"} />
        <meta
          property="og:description"
          content={
            L
              ? "Public catalog of IT candidates on MCPHire."
              : "Публичный каталог IT-кандидатов на MCPHire."
          }
        />
        <meta property="og:url" content="https://mcphire.com/candidates" />
      </Helmet>

      <V3Navbar />

      {/* Page Header */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 md:pt-10 pb-4">
        <h1 className="heading-lg text-2xl md:text-4xl">{L ? "Candidates" : "Кандидаты"}</h1>
        <p className="text-muted-foreground mt-1">
          {isLoading
            ? (L ? "Loading..." : "Загрузка...")
            : L
              ? `${count.toLocaleString()} candidates in the public catalog`
              : `${count.toLocaleString()} кандидатов в публичном каталоге`}
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-[60px] z-20 bg-background/95 backdrop-blur-xl py-3 md:py-4 border-b border-border/50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center bg-card border-2 border-border rounded-2xl md:rounded-3xl px-2 py-2 md:py-0 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 gap-2 md:gap-0">
            <input
              type="text"
              placeholder={L ? "Stack, comma-separated (python, react)..." : "Стек через запятую (python, react)..."}
              value={stackParam}
              onChange={(e) => updateParam("stack", e.target.value)}
              className="flex-1 min-w-0 px-3 md:px-4 py-2.5 md:py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <div className="hidden md:block w-px h-7 bg-border mx-1" />
            <select
              value={seniorityParam}
              onChange={(e) => updateParam("seniority", e.target.value)}
              className="px-3 py-2 bg-transparent outline-none text-foreground cursor-pointer max-w-full md:max-w-[160px]"
            >
              <option value="">{L ? "Any seniority" : "Любой уровень"}</option>
              {SENIORITY_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {SENIORITY_LABELS[s][L ? "en" : "ru"]}
                </option>
              ))}
            </select>
            <div className="hidden md:block w-px h-7 bg-border mx-1" />
            <input
              type="text"
              placeholder={L ? "Timezone (UTC+3)..." : "Таймзона (UTC+3)..."}
              value={timezoneParam}
              onChange={(e) => updateParam("timezone", e.target.value)}
              className="px-3 md:px-4 py-2.5 md:py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground max-w-full md:max-w-[160px]"
            />
          </div>
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4">
        {isLoading ? (
          <CandidateSkeletonGrid count={8} />
        ) : isError ? (
          <div className="text-center py-12 text-muted-foreground">
            {L
              ? "Error loading candidates. Please try refreshing the page."
              : "Ошибка при загрузке каталога кандидатов. Попробуйте обновить страницу."}
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <p className="text-muted-foreground">
              {L
                ? "The catalog is filling up. Candidates appear here as profiles get confirmed and consent to public display."
                : "Каталог пополняется. Кандидаты появляются здесь по мере подтверждения профиля и согласия на публичный показ."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 pb-8">
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.profileIdMasked} candidate={candidate} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default CandidatesPage;
