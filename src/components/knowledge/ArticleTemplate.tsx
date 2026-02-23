import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import type { ArticleContent } from "@/data/knowledgeConfig";
import Breadcrumbs from "./Breadcrumbs";
import SalaryTable from "./SalaryTable";
import ArticleCTA from "./ArticleCTA";
import TableOfContents, { slugify } from "./TableOfContents";
import RelatedArticles from "./RelatedArticles";
import ReadingProgress from "./ReadingProgress";
import { CATEGORIES } from "@/data/knowledgeConfig";

interface ArticleTemplateProps {
  article: ArticleContent;
}

const renderMarkdown = (text: string) => {
  // Simple markdown: **bold**, \n\n → paragraphs, \n- list items
  return text.split("\n\n").map((block, i) => {
    if (block.startsWith("- ") || block.includes("\n- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="list-disc list-inside space-y-1 my-3">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: boldify(item.slice(2)) }} />
          ))}
        </ul>
      );
    }
    if (block.startsWith("- [ ] ") || block.includes("\n- [ ] ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- [ ] "));
      return (
        <ul key={i} className="space-y-1 my-3">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="text-muted-foreground">☐</span>
              <span dangerouslySetInnerHTML={{ __html: boldify(item.slice(6)) }} />
            </li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(block) || block.includes("\n1. ")) {
      const items = block.split("\n").filter((l) => /^\d+\.\s/.test(l));
      return (
        <ol key={i} className="list-decimal list-inside space-y-1 my-3">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: boldify(item.replace(/^\d+\.\s/, "")) }} />
          ))}
        </ol>
      );
    }
    return (
      <p key={i} className="my-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldify(block) }} />
    );
  });
};

const boldify = (text: string) =>
  text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const ArticleTemplate = ({ article }: ArticleTemplateProps) => {
  const { meta } = article;
  const cat = CATEGORIES.find((c) => c.slug === meta.category);
  const canonicalUrl = `https://sborka.work/knowledge/${meta.category}/${meta.slug}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [meta.slug]);

  const breadcrumbs = [
    { label: "СБОРКА", href: "/" },
    { label: "База знаний", href: "/knowledge" },
    { label: cat?.nameRu || meta.category, href: `/knowledge/${meta.category}` },
    { label: meta.title },
  ];

  // Schema.org
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.metaDescription,
    datePublished: "2026-02-24",
    dateModified: "2026-02-24",
    publisher: {
      "@type": "Organization",
      name: "СБОРКА",
      url: "https://sborka.work",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  const faqSchema = article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{meta.title} | СБОРКА</title>
        <meta name="description" content={meta.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="СБОРКА" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <ReadingProgress />

      <article className="max-w-[980px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <header className="mb-10">
          {cat && (
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: cat.color }}
            >
              {cat.nameRu}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-4">
            {meta.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{meta.readingTime} мин чтения</span>
            <span>Обновлено: {meta.updatedDate}</span>
          </div>
        </header>

        <div className="flex gap-12">
          <TableOfContents sections={article.sections} />

          {/* Main content */}
          <div className="min-w-0 max-w-[680px]">
            {/* Quick answer */}
            <div className="p-6 bg-[hsl(174,62%,95%)] border-l-4 border-[hsl(174,62%,45%)] rounded-r-lg mb-8">
              <p className="text-sm font-bold uppercase tracking-wider text-[hsl(174,62%,30%)] mb-2">
                Коротко
              </p>
              <p className="text-base leading-relaxed">{article.quickAnswer}</p>
              {meta.keyStat && (
                <p className="mt-3 text-sm font-bold text-[hsl(174,62%,30%)]">
                  {meta.keyStat}
                </p>
              )}
            </div>

            {/* Early CTA — between quick answer and first section */}
            <ArticleCTA slug={meta.slug} variant="inline" />

            {/* Sections */}
            {article.sections.map((section, i) => (
              <section key={i} id={slugify(section.heading)} className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight border-l-[3px] border-[hsl(174,62%,55%)] pl-4 mb-4">
                  {section.heading}
                </h2>
                <div className="article-content">{renderMarkdown(section.content)}</div>
                {/* Salary table after section index 1 (salary data section) */}
                {i === 1 && article.salaryTable && article.salaryTable.length > 0 && (
                  <SalaryTable data={article.salaryTable} />
                )}
              </section>
            ))}

            {/* Inline CTA */}
            <ArticleCTA slug={meta.slug} variant="inline" />

            {/* Expert Quote */}
            {article.expertQuote && (
              <blockquote className="my-10 p-6 border-l-4 border-[hsl(174,62%,45%)] bg-[hsl(174,62%,96%)] rounded-r-lg">
                <p className="text-base italic leading-relaxed mb-3">
                  "{article.expertQuote.text}"
                </p>
                <footer className="text-sm">
                  <strong>{article.expertQuote.author}</strong>
                  <span className="text-muted-foreground"> — {article.expertQuote.role}</span>
                </footer>
              </blockquote>
            )}

            {/* Mistakes */}
            {article.mistakes.length > 0 && (
              <section id="mistakes" className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight border-l-[3px] border-[hsl(174,62%,55%)] pl-4 mb-4">
                  Типичные ошибки
                </h2>
                <ul className="space-y-3">
                  {article.mistakes.map((m, i) => (
                    <li key={i} className="list-x">{m}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Action Plan */}
            {article.actionPlan.length > 0 && (
              <section id="action-plan" className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight border-l-[3px] border-[hsl(174,62%,55%)] pl-4 mb-4">
                  Пошаговый план действий
                </h2>
                <ol className="space-y-3">
                  {article.actionPlan.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-[hsl(174,62%,40%)] text-white text-sm font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-base leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* FAQ */}
            {article.faq.length > 0 && (
              <section id="faq" className="mb-10">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight border-l-[3px] border-[hsl(174,62%,55%)] pl-4 mb-4">
                  FAQ
                </h2>
                <div className="space-y-6">
                  {article.faq.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-base font-bold mb-1">{item.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Top Skills */}
            {article.topSkills && article.topSkills.length > 0 && (
              <div className="my-8 p-5 bg-muted rounded-lg">
                <p className="text-sm font-bold mb-2">Топ навыков из вакансий hh.ru:</p>
                <div className="flex flex-wrap gap-2">
                  {article.topSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-background border border-border rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Block CTA */}
            <ArticleCTA slug={meta.slug} variant="block" />

            {/* Related Articles */}
            <RelatedArticles slugs={article.relatedSlugs} />

            {/* Source */}
            <p className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
              Данные: hh.ru API, февраль 2026. Зарплаты — медиана по вакансиям с указанной зарплатой.
              Статья подготовлена при поддержке карьерного клуба{" "}
              <a href="https://sborka.work" className="underline hover:text-foreground">СБОРКА</a>.
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticleTemplate;
