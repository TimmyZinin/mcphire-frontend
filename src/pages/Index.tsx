import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatIsSection from "@/components/WhatIsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FormatsSection from "@/components/FormatsSection";
import ForWhomSection from "@/components/ForWhomSection";
import ValuesSection from "@/components/ValuesSection";
import WebinarsSection from "@/components/WebinarsSection";
import SupportSection from "@/components/SupportSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <WhatIsSection />
      <HowItWorksSection />
      <FormatsSection />
      <ForWhomSection />
      <ValuesSection />
      <WebinarsSection />
      <SupportSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
