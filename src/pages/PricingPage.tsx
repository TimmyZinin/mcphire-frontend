// ============================================================
// MCPHire — Pricing page
// Route: /pricing (public, wrapped in MainLayout)
// ============================================================

import { PageMeta } from "@/components/seo/PageMeta";
import PricingSection from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <>
      <PageMeta
        title="Тарифы"
        description="Тарифы для работодателей MCPHire. Размещайте IT-вакансии и получайте отклики от лучших специалистов."
        canonical="/pricing"
      />
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-10 pb-6">
        <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-2">
          Тарифы
        </h1>
        <p className="text-muted-foreground">
          Тарифы для работодателей — размещайте вакансии и находите IT-специалистов.
        </p>
      </div>
      <PricingSection />
    </>
  );
}
