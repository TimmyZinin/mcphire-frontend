// ============================================================
// СБОРКА — Custom Pagination component (Radix-independent)
// ============================================================

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SborkaPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function SborkaPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: SborkaPaginationProps) {
  if (totalPages <= 1) return null;

  // Build page range: show at most 7 items with ellipsis
  const pages: (number | "ellipsis")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  const btnBase =
    "inline-flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg border text-sm font-medium transition-colors";

  return (
    <nav
      className={cn("flex items-center justify-center gap-1.5", className)}
      aria-label="Пагинация"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          btnBase,
          "border-border bg-card hover:bg-muted",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-muted-foreground"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              btnBase,
              page === currentPage
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-muted"
            )}
            aria-label={`Страница ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          btnBase,
          "border-border bg-card hover:bg-muted",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
        aria-label="Следующая страница"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
