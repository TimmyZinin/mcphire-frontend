import { CATEGORIES } from "@/data/knowledgeConfig";

interface CategoryFilterProps {
  active: string | null;
  onChange: (slug: string | null) => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
      <button
        onClick={() => onChange(null)}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
          active === null
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        Все
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            active === cat.slug
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {cat.nameRu}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
