import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/knowledge/ArticleCard";
import Breadcrumbs from "@/components/knowledge/Breadcrumbs";
import { getArticlesByCategory } from "@/data/articles";
import { CATEGORIES } from "@/data/knowledgeConfig";

const KnowledgeCategory = () => {
  const { category } = useParams<{ category: string }>();

  const cat = CATEGORIES.find((c) => c.slug === category);
  const articles = useMemo(() => getArticlesByCategory(category || ""), [category]);

  if (!cat) return <Navigate to="/knowledge" replace />;

  return (
    <>
      <Helmet>
        <title>{cat.nameRu} — База знаний | СБОРКА</title>
        <meta
          name="description"
          content={`Статьи про ${cat.nameRu.toLowerCase()} для IT-специалистов. Данные hh.ru 2026.`}
        />
        <link rel="canonical" href={`https://sborka.work/knowledge/${cat.slug}`} />
      </Helmet>

      <main className="min-h-screen">
        <StickyHeader />

        <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: "СБОРКА", href: "/" },
              { label: "База знаний", href: "/knowledge" },
              { label: cat.nameRu },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3">
              {cat.nameRu}
            </h1>
            <p className="text-lg text-muted-foreground">
              {articles.length} статей в категории «{cat.nameRu}»
            </p>
          </header>

          <div>
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default KnowledgeCategory;
