import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import StickyHeader from "@/components/StickyHeader";
import Footer from "@/components/Footer";
import CategoryFilter from "@/components/knowledge/CategoryFilter";
import ArticleCard from "@/components/knowledge/ArticleCard";
import Breadcrumbs from "@/components/knowledge/Breadcrumbs";
import { allArticleMetas } from "@/data/articles";
import { CATEGORIES, ROLES } from "@/data/knowledgeConfig";

const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return allArticleMetas;
    return allArticleMetas.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>База знаний для IT-специалистов | СБОРКА</title>
        <meta
          name="description"
          content="100 статей о карьере в IT: зарплаты, резюме, собеседования, навыки, поиск работы. Данные hh.ru 2026. Для Python, Frontend, Backend, DevOps, QA, Product Manager и других."
        />
        <link rel="canonical" href="https://sborka.work/knowledge" />
      </Helmet>

      <main className="min-h-screen">
        <StickyHeader />

        <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <Breadcrumbs
            items={[
              { label: "СБОРКА", href: "/" },
              { label: "База знаний" },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              База знаний
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {allArticleMetas.length} статей о карьере в IT. Зарплаты, резюме, собеседования, навыки, поиск работы.
              Все данные основаны на реальных вакансиях hh.ru.
            </p>
          </header>

          {/* Category hubs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {CATEGORIES.map((cat) => {
              const count = allArticleMetas.filter((a) => a.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  to={`/knowledge/${cat.slug}`}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: cat.color }}>
                    {cat.nameRu}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{count} статей</p>
                </Link>
              );
            })}
          </div>

          {/* Filter + list */}
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

          <div>
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-muted-foreground py-8 text-center">Статей в этой категории пока нет.</p>
          )}

          {/* Roles list for internal linking */}
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-lg font-bold mb-4">По специальностям</h2>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <Link
                  key={role.slug}
                  to={`/knowledge/salaries/${role.slug}-salary`}
                  className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-muted/70 transition-colors"
                >
                  {role.nameRu}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Knowledge;
