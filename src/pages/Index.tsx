import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatIsSection from "@/components/WhatIsSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyItWorksSection from "@/components/WhyItWorksSection";
import FormatsSection from "@/components/FormatsSection";
import TypicalWeekSection from "@/components/TypicalWeekSection";
import ForWhomSection from "@/components/ForWhomSection";
import FoundersSection from "@/components/FoundersSection";
import WebinarsSection from "@/components/WebinarsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const LimeDivider = () => (
  <div className="w-full" style={{ height: 2, backgroundColor: "#DFFF00" }} />
);

const Index = () => {
  return (
    <main className="min-h-screen">
      <StickyHeader />
      <HeroSection />
      <LimeDivider />
      <ProblemSection />
      <LimeDivider />
      <WhatIsSection />
      <LimeDivider />
      <ResultsSection />
      <LimeDivider />
      <HowItWorksSection />
      <LimeDivider />
      <WhyItWorksSection />
      <LimeDivider />
      <FormatsSection />
      <LimeDivider />
      <TypicalWeekSection />
      <LimeDivider />
      <ForWhomSection />
      <LimeDivider />
      <FoundersSection />
      <LimeDivider />
      <WebinarsSection />
      <LimeDivider />
      <PricingSection />
      <LimeDivider />
      <FAQSection />
      <LimeDivider />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
