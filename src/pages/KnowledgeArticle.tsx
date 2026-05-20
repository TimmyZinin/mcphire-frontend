import { useParams, Navigate } from "react-router-dom";
import Footer from "@/components/Footer";
import ArticleTemplate from "@/components/knowledge/ArticleTemplate";
import { getArticle } from "@/data/articles";

const KnowledgeArticle = () => {
  const { slug } = useParams<{ category: string; slug: string }>();

  const article = slug ? getArticle(slug) : undefined;

  if (!article) return <Navigate to="/knowledge" replace />;

  return (
    <main className="min-h-screen">
      <ArticleTemplate article={article} />
      <Footer />
    </main>
  );
};

export default KnowledgeArticle;
