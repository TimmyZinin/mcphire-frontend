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
import JobBoardSection from "@/components/JobBoardSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>MCPHire — AI-платформа для поиска IT-работы | Оффер за 6-8 недель</title>
        <meta name="description" content="MCPHire — AI-платформа для поиска IT-работы. 34 000+ IT-вакансий, MCP-протокол для AI-агентов, калькулятор зарплат. Партнёр: СБОРКА (sborka.work) — подготовка к собеседованиям." />
        <link rel="canonical" href="https://mcphire.com/" />
        <meta property="og:title" content="MCPHire — AI-платформа для поиска IT-работы" />
        <meta property="og:description" content="AI-платформа для поиска IT-работы. Партнёр СБОРКА — клуб для Middle/Senior/Lead: менторы, мок-собеседования, разбор резюме. Подписка от 4 900 руб/мес." />
        <meta property="og:url" content="https://mcphire.com/" />
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
      <JobBoardSection />
      <Footer />
    </main>
  );
};

export default Index;
