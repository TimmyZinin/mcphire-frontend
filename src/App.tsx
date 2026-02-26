import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Partners from "./pages/Partners";
import Knowledge from "./pages/Knowledge";
import KnowledgeCategory from "./pages/KnowledgeCategory";
import KnowledgeArticle from "./pages/KnowledgeArticle";
import NotFound from "./pages/NotFound";
import JobsPage from "./pages/JobsPage";
import ToolsPage from "./pages/ToolsPage";
import SalaryCalculator from "./pages/SalaryCalculator";
import ResumeChecklist from "./pages/ResumeChecklist";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/knowledge/:category" element={<KnowledgeCategory />} />
            <Route path="/knowledge/:category/:slug" element={<KnowledgeArticle />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/salary" element={<SalaryCalculator />} />
            <Route path="/tools/resume-checklist" element={<ResumeChecklist />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
