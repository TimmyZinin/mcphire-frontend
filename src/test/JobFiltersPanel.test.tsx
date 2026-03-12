import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { JobFiltersPanel } from "@/components/jobs/JobFiltersPanel";
import type { JobFilters } from "@/types";

const defaultFilters: JobFilters = {
  query: "",
  city: "",
  country: "",
  salaryMin: null,
  salaryMax: null,
  level: [],
  format: [],
  employmentType: [],
  skills: [],
  category: "",
  sortBy: "relevance",
};

function renderWithRouter(component: React.ReactElement) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe("JobFiltersPanel", () => {
  it("renders filters header", () => {
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={() => {}}
        activeCount={0}
      />
    );
    expect(screen.getAllByText("Фильтры")[0]).toBeInTheDocument();
  });

  it("shows active filter count", () => {
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={() => {}}
        activeCount={3}
      />
    );
    expect(screen.getByText("Фильтры (3)")).toBeInTheDocument();
  });

  it("renders format filter chips", () => {
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={() => {}}
        activeCount={0}
      />
    );
    expect(screen.getByText("Удалённо")).toBeInTheDocument();
    expect(screen.getByText("Офис")).toBeInTheDocument();
    expect(screen.getByText("Гибрид")).toBeInTheDocument();
  });

  it("renders level filter chips", () => {
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={() => {}}
        activeCount={0}
      />
    );
    expect(screen.getByText("Junior")).toBeInTheDocument();
    expect(screen.getByText("Middle")).toBeInTheDocument();
    expect(screen.getByText("Senior")).toBeInTheDocument();
    expect(screen.getByText("Lead")).toBeInTheDocument();
  });

  it("calls onFilterChange when format chip is clicked", () => {
    const onFilterChange = vi.fn();
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        activeCount={0}
      />
    );
    fireEvent.click(screen.getByText("Удалённо"));
    expect(onFilterChange).toHaveBeenCalledWith({
      format: ["Удалённо"],
    });
  });

  it("removes format filter when already active", () => {
    const onFilterChange = vi.fn();
    const filtersWithFormat = { ...defaultFilters, format: ["Удалённо"] as any };
    renderWithRouter(
      <JobFiltersPanel
        filters={filtersWithFormat}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        activeCount={1}
      />
    );
    fireEvent.click(screen.getByText("Удалённо"));
    expect(onFilterChange).toHaveBeenCalledWith({
      format: [],
    });
  });

  it("calls onFilterChange when level chip is clicked", () => {
    const onFilterChange = vi.fn();
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={onFilterChange}
        onReset={() => {}}
        activeCount={0}
      />
    );
    fireEvent.click(screen.getByText("Senior"));
    expect(onFilterChange).toHaveBeenCalledWith({
      level: ["Senior"],
    });
  });

  it("calls onReset when reset button is clicked", () => {
    const onReset = vi.fn();
    renderWithRouter(
      <JobFiltersPanel
        filters={{ ...defaultFilters, level: ["Senior"] as any }}
        onFilterChange={() => {}}
        onReset={onReset}
        activeCount={1}
      />
    );
    // Use first() because FiltersContent renders twice (desktop + mobile)
    fireEvent.click(screen.getAllByText("Сбросить")[0]);
    expect(onReset).toHaveBeenCalled();
  });

  it("does not show reset button when no active filters", () => {
    renderWithRouter(
      <JobFiltersPanel
        filters={defaultFilters}
        onFilterChange={() => {}}
        onReset={() => {}}
        activeCount={0}
      />
    );
    // Reset button should not be present when activeCount is 0
    expect(screen.queryAllByText("Сбросить")).toHaveLength(0);
  });
});
