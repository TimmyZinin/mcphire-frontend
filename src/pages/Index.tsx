import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatIsSection from "@/components/WhatIsSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GamificationSection from "@/components/GamificationSection";
import FormatsSection from "@/components/FormatsSection";
import TypicalWeekSection from "@/components/TypicalWeekSection";
import ForWhomSection from "@/components/ForWhomSection";
import FoundersSection from "@/components/FoundersSection";
import WebinarsSection from "@/components/WebinarsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <ProblemSection />
      <WhatIsSection />
      <ResultsSection />
      <HowItWorksSection />
      <GamificationSection />
      <FormatsSection />
      <TypicalWeekSection />
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
