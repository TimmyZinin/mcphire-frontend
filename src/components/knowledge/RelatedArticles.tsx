import { Link } from "react-router-dom";
import { ROLES, TOPICS } from "@/data/knowledgeConfig";

interface RelatedArticlesProps {
  slugs: string[];
}

const RelatedArticles = ({ slugs }: RelatedArticlesProps) => {
  if (!slugs || slugs.length === 0) return null;

  const articles = slugs.map((slug) => {
    const parts = slug.split("-");
    // Find the role and topic by trying different split points
    let roleSlug = "";
    let topicSlug = "";

    for (let i = 1; i < parts.length; i++) {
      const tryRole = parts.slice(0, i).join("-");
      const tryTopic = parts.slice(i).join("-");
      if (
        ROLES.find((r) => r.slug === tryRole) &&
        TOPICS.find((t) => t.slug === tryTopic)
      ) {
        roleSlug = tryRole;
        topicSlug = tryTopic;
        break;
      }
    }

    const role = ROLES.find((r) => r.slug === roleSlug);
    const topic = TOPICS.find((t) => t.slug === topicSlug);

    if (!role || !topic) return null;

    return {
      slug,
      title: topic.titleTemplate(role.nameRu),
      category: topic.category,
      url: `/knowledge/${topic.category}/${slug}`,
    };
  }).filter(Boolean);

  if (articles.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="text-lg font-bold mb-4">Читайте также</h2>
      <div className="grid gap-3">
        {articles.map((a) => (
          <Link
            key={a!.slug}
            to={a!.url}
            className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <span className="text-base font-medium">{a!.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
