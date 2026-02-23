import type { ArticleMeta, ArticleContent } from "./knowledgeConfig";

// Eagerly import all article JSONs at build time via Vite glob
const articleModules = import.meta.glob<ArticleContent>("./articles/*.json", { eager: true, import: "default" });

// Build lookup map: slug → ArticleContent
const articlesMap = new Map<string, ArticleContent>();
for (const [path, data] of Object.entries(articleModules)) {
  const filename = path.split("/").pop()?.replace(".json", "") || "";
  if (filename === "_index") continue;
  articlesMap.set(filename, data);
}

// Import index
const indexModule = import.meta.glob<ArticleMeta[]>("./_index.json", { eager: true, import: "default" });
let articleIndex: ArticleMeta[] = [];

// Try to load from _index.json, fallback to building from articles
const indexPath = Object.keys(indexModule)[0];
if (indexPath && indexModule[indexPath]) {
  articleIndex = indexModule[indexPath];
} else {
  // Build from loaded articles
  articleIndex = Array.from(articlesMap.values()).map((a) => a.meta);
}

// Re-export article index built from actual articles for reliability
export const allArticleMetas: ArticleMeta[] = Array.from(articlesMap.values()).map((a) => a.meta);

export function getArticle(slug: string): ArticleContent | undefined {
  return articlesMap.get(slug);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return allArticleMetas.filter((a) => a.category === category);
}

export function getArticlesByRole(roleSlug: string): ArticleMeta[] {
  return allArticleMetas.filter((a) => a.roleSlug === roleSlug);
}

export function getArticlesByTopic(topicSlug: string): ArticleMeta[] {
  return allArticleMetas.filter((a) => a.topicSlug === topicSlug);
}
