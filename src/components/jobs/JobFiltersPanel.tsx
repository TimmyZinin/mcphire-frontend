// ============================================================
// СБОРКА — Job Filters Sidebar Panel
// Desktop: sticky sidebar. Mobile: Sheet drawer.
// ============================================================

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { JobFilters, JobLevel, JobFormat, EmploymentType } from "@/types";

interface JobFiltersPanelProps {
  filters: JobFilters;
  onFilterChange: (updates: Partial<JobFilters>) => void;
  onReset: () => void;
  activeCount: number;
}

const LEVELS: JobLevel[] = ["Junior", "Middle", "Senior", "Lead"];
const FORMATS: JobFormat[] = ["Удалённо", "Офис", "Гибрид"];
const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Полная занятость",
  "Частичная занятость",
  "Проект",
  "Стажировка",
];

const SALARY_MAX = 800000;

// ---- Filter chip -------------------------------------------

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary"
      )}
    >
      {label}
    </button>
  );
}

// ---- Filter panel content ----------------------------------

function FiltersContent({
  filters,
  onFilterChange,
  onReset,
  activeCount,
}: JobFiltersPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-sm uppercase tracking-wide">
          Фильтры {activeCount > 0 && `(${activeCount})`}
        </span>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Сбросить
          </button>
        )}
      </div>

      {/* Work format */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Формат работы
        </p>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={filters.format.includes(f)}
              onClick={() =>
                onFilterChange({
                  format: filters.format.includes(f)
                    ? filters.format.filter((v) => v !== f)
                    : [...filters.format, f],
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Level */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Уровень
        </p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <FilterChip
              key={l}
              label={l}
              active={filters.level.includes(l)}
              onClick={() =>
                onFilterChange({
                  level: filters.level.includes(l)
                    ? filters.level.filter((v) => v !== l)
                    : [...filters.level, l],
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Employment type */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Тип занятости
        </p>
        <div className="flex flex-wrap gap-2">
          {EMPLOYMENT_TYPES.map((t) => (
            <FilterChip
              key={t}
              label={t}
              active={filters.employmentType.includes(t)}
              onClick={() =>
                onFilterChange({
                  employmentType: filters.employmentType.includes(t)
                    ? filters.employmentType.filter((v) => v !== t)
                    : [...filters.employmentType, t],
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Salary range */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Зарплата от
        </p>
        <Slider
          min={0}
          max={SALARY_MAX}
          step={10000}
          value={[filters.salaryMin ?? 0]}
          onValueChange={([val]) =>
            onFilterChange({ salaryMin: val === 0 ? null : val })
          }
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 ₽</span>
          <span className="font-semibold text-foreground">
            {filters.salaryMin
              ? `от ${(filters.salaryMin / 1000).toFixed(0)}К ₽`
              : "Любая"}
          </span>
          <span>800К ₽</span>
        </div>
      </div>
    </div>
  );
}

// ---- Main export -------------------------------------------

export function JobFiltersPanel(props: JobFiltersPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
          <FiltersContent {...props} />
        </div>
      </aside>

      {/* Mobile trigger + sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
              {props.activeCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {props.activeCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Фильтры</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent {...props} />
            </div>
            <div className="mt-6">
              <Button
                className="w-full bg-primary text-white"
                onClick={() => setMobileOpen(false)}
              >
                Применить
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
