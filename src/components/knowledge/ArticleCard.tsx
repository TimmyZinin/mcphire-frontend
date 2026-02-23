import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/knowledgeConfig";
import type { ArticleMeta } from "@/data/knowledgeConfig";

interface ArticleCardProps {
  article: ArticleMeta;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const cat = CATEGORIES.find((c) => c.slug === article.category);
  const url = `/knowledge/${article.category}/${article.slug}`;

  return (
    <Link
      to={url}
      className="block py-5 border-b border-border hover:bg-muted/30 transition-colors -mx-2 px-2 rounded"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {cat && (
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: cat.color }}
              >
                {cat.nameRu}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {article.readingTime} мин
            </span>
          </div>
          <h3 className="text-base md:text-lg font-bold leading-snug mb-1">
            {article.title}
          </h3>
          {article.keyStat && (
            <p className="text-sm text-muted-foreground">{article.keyStat}</p>
          )}
        </div>
        <span className="text-muted-foreground shrink-0 mt-1" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
};

export default ArticleCard;
