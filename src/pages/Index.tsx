import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatIsSection from "@/components/WhatIsSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyItWorksSection from "@/components/WhyItWorksSection";
import FormatsSection from "@/components/FormatsSection";
import TypicalWeekSection from "@/components/TypicalWeekSection";
import ScheduleSection from "@/components/ScheduleSection";
import ForWhomSection from "@/components/ForWhomSection";
import FoundersSection from "@/components/FoundersSection";
import WebinarsSection from "@/components/WebinarsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.dispatchEvent(new Event("render-event"));
  }, []);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>СБОРКА — карьерный клуб | Оффер за 6-8 недель</title>
        <meta name="description" content="Карьерный клуб СБОРКА для Middle, Senior и Lead: менторы, мок-собеседования, разбор резюме. Средний участник получает оффер за 6-8 недель. Подписка от 4 900 руб/мес." />
        <link rel="canonical" href="https://sborka.work/" />
        <meta property="og:title" content="СБОРКА — карьерный клуб | Оффер за 6-8 недель" />
        <meta property="og:description" content="Карьерный клуб для Middle/Senior/Lead: менторы, мок-собеседования, разбор резюме. Подписка от 4 900 руб/мес." />
        <meta property="og:url" content="https://sborka.work/" />
      </Helmet>
      <StickyHeader />
      <HeroSection />
      <ProblemSection />
      <WhatIsSection />
      <ResultsSection />
      <HowItWorksSection />
      <WhyItWorksSection />
      <FormatsSection />
      <TypicalWeekSection />
      <ScheduleSection />
      <ForWhomSection />
      <FoundersSection />
      <WebinarsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
