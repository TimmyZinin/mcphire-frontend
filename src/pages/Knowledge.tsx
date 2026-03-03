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
import { RESEARCH_REPORTS } from "@/data/researchReports";

const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return allArticleMetas;
    return allArticleMetas.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Блог для IT-специалистов | СБОРКА</title>
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
              { label: "Блог" },
            ]}
          />

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              Блог
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {allArticleMetas.length} статей о карьере в IT. Зарплаты, резюме, собеседования, навыки, поиск работы.
              Все данные основаны на реальных вакансиях hh.ru.
            </p>
          </header>

          {/* Research reports — featured */}
          {RESEARCH_REPORTS.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-bold mb-4">Исследования</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RESEARCH_REPORTS.map((report) => (
                  <Link
                    key={report.slug}
                    to={`/knowledge/research/${report.slug}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-[#E8735A]/30 transition-all"
                  >
                    <div className="bg-gradient-to-br from-[#FFF3E6] via-[#FFD6B0] to-[#FBBF8A] p-6 md:p-8">
                      <span
                        className="inline-block text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full mb-3"
                        style={{ backgroundColor: report.color }}
                      >
                        {report.badge}
                      </span>
                      <h3 className="text-xl font-black tracking-tight leading-tight mb-2 group-hover:text-[#C4573A] transition-colors">
                        {report.title}
                      </h3>
                      <p className="text-sm text-[#6B5B4E]">{report.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-[#6B5B4E]">
                        <span>{report.readingTime} мин чтения</span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
