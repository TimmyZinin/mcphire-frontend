import { lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import { getResearchReport } from "@/data/researchReports";

const reportComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "instagram-job-search-2026": lazy(() => import("@/components/research/InstagramJobSearch2026")),
};

const ResearchReportPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const report = slug ? getResearchReport(slug) : undefined;
  const ReportComponent = slug ? reportComponents[slug] : undefined;

  if (!report || !ReportComponent) return <Navigate to="/knowledge" replace />;

  const canonicalUrl = `https://sborka.work/knowledge/research/${slug}`;

  return (
    <>
      <Helmet>
        <title>{report.title} | СБОРКА</title>
        <meta name="description" content={report.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={report.title} />
        <meta property="og:description" content={report.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="СБОРКА" />
      </Helmet>

      <main className="min-h-screen">
        <StickyHeader />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка...</div>}>
          <ReportComponent />
        </Suspense>
        <Footer />
      </main>
    </>
  );
};

export default ResearchReportPage;
