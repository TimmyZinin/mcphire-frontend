import { useParams, Navigate } from "react-router-dom";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/knowledge/ArticleTemplate";
import { getArticle } from "@/data/articles";

const KnowledgeArticle = () => {
  const { slug } = useParams<{ category: string; slug: string }>();

  const article = slug ? getArticle(slug) : undefined;

  if (!article) return <Navigate to="/knowledge" replace />;

  return (
    <main className="min-h-screen">
      <StickyHeader />
      <ArticleTemplate article={article} />
      <Footer />
    </main>
  );
};

export default KnowledgeArticle;
