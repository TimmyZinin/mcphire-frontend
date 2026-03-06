// ============================================================
// MCPHire — Job Search Bar
// Compound component: text query + city selector + submit.
// Shared between HomePage hero and /jobs sticky header.
// ============================================================

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobSearchBarProps {
  initialQuery?: string;
  initialCity?: string;
  onSearch?: (query: string, city: string) => void;
  /** When true, submitting navigates to /jobs?q=...&city=... */
  navigateOnSubmit?: boolean;
  size?: "default" | "hero";
  className?: string;
}

const CITIES = [
  { value: "", label: "Вся Россия" },
  { value: "moscow", label: "Москва" },
  { value: "saint-petersburg", label: "Санкт-Петербург" },
  { value: "ekaterinburg", label: "Екатеринбург" },
  { value: "novosibirsk", label: "Новосибирск" },
  { value: "kazan", label: "Казань" },
  { value: "remote", label: "Удалённо" },
];

export function JobSearchBar({
  initialQuery = "",
  initialCity = "",
  onSearch,
  navigateOnSubmit = false,
  size = "default",
  className,
}: JobSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (navigateOnSubmit) {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (city) params.set("city", city);
      navigate(`/jobs?${params.toString()}`);
    } else {
      onSearch?.(query, city);
    }
  };

  const isHero = size === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center bg-card border-2 border-border rounded-3xl shadow-sm",
        "focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
        "transition-all duration-200",
        isHero ? "px-3 py-2" : "px-2",
        className
      )}
      role="search"
      aria-label="Поиск вакансий"
    >
      {/* Query input */}
      <Search
        className={cn(
          "shrink-0 text-muted-foreground",
          isHero ? "w-5 h-5 ml-2" : "w-4 h-4 ml-2"
        )}
        aria-hidden="true"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Должность, навыки или компания..."
        className={cn(
          "flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
          isHero ? "px-4 py-2 text-lg" : "px-3 py-2.5 text-sm"
        )}
        aria-label="Поисковый запрос"
      />

      {/* Divider */}
      <div className="w-px h-7 bg-border mx-1 shrink-0" aria-hidden="true" />

      {/* City selector */}
      <MapPin
        className="w-4 h-4 text-muted-foreground shrink-0 ml-2"
        aria-hidden="true"
      />
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={cn(
          "bg-transparent outline-none text-foreground cursor-pointer",
          isHero ? "px-3 py-2 text-base" : "px-2 py-2 text-sm"
        )}
        aria-label="Выберите город"
      >
        {CITIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        type="submit"
        className={cn(
          "ml-2 rounded-full bg-primary text-primary-foreground font-semibold",
          "hover:bg-primary/90 transition-colors shrink-0",
          isHero ? "px-7 py-3 text-base" : "px-5 py-2.5 text-sm"
        )}
      >
        Найти
      </button>
    </form>
  );
}
