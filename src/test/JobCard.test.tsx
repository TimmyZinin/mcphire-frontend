// ============================================================
// MCPHire — JobCard (V3 «Optimist» bento variant) tests
// ============================================================

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { JobCard } from "@/components/JobCard";
import type { JobListItem } from "@/types";

// `useAuth` mock — JobCard hides match score until authenticated. We expose
// a switch so individual tests can flip authentication on/off.
let mockIsAuthenticated = false;
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: mockIsAuthenticated, user: null, login: vi.fn(), logout: vi.fn() }),
}));

const baseJob: JobListItem = {
  id: "job-1",
  title: "Senior Frontend Developer",
  slug: "senior-frontend-developer",
  company: {
    id: "comp-1",
    name: "Tech Corp",
    logoUrl: null,
    isVerified: true,
    brandColor: "#3b82f6",
  },
  city: "Москва",
  country: "Россия",
  salaryFrom: 150000,
  salaryTo: 250000,
  currency: "RUB",
  skills: ["React", "TypeScript", "Node.js"],
  level: "Senior",
  format: "Удалённо",
  postedAt: new Date().toISOString(),
  status: "published",
  category: "Разработка",
};

function renderWithRouter(component: React.ReactElement) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe("JobCard (V3)", () => {
  it("renders job title and company", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.getByText("Senior Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
  });

  it("renders verified ✓ glyph when company is verified", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("does not render verified glyph when company is not verified", () => {
    mockIsAuthenticated = false;
    const unverifiedJob = {
      ...baseJob,
      company: { ...baseJob.company, isVerified: false },
    };
    renderWithRouter(<JobCard job={unverifiedJob} />);
    expect(screen.queryByText("✓")).not.toBeInTheDocument();
  });

  it("renders salary range in monospace footer", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(
      screen.getByText((content) => content.includes("150"))
    ).toBeInTheDocument();
  });

  it("renders all listed skills (up to 4)", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders format chip and city", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.getByText("Удалённо")).toBeInTheDocument();
    expect(screen.getByText(/Москва/)).toBeInTheDocument();
  });

  it("renders Premium badge when job is premium", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={{ ...baseJob, isPremium: true }} />);
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("does not render Premium badge by default", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.queryByText("Premium")).not.toBeInTheDocument();
  });

  it("hides MATCH score for anonymous users", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.queryByText("MATCH")).not.toBeInTheDocument();
  });

  it("renders MATCH badge for authenticated users", () => {
    mockIsAuthenticated = true;
    renderWithRouter(<JobCard job={baseJob} />);
    expect(screen.getByText("MATCH")).toBeInTheDocument();
  });

  it("links to /jobs/:slug (slug-first per Sprint 8 P0-4)", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/jobs/senior-frontend-developer");
  });

  it("falls back to id when slug is missing", () => {
    mockIsAuthenticated = false;
    const jobNoSlug: JobListItem = { ...baseJob, slug: undefined as unknown as string };
    renderWithRouter(<JobCard job={jobNoSlug} />);
    expect(screen.getByRole("link").getAttribute("href")).toBe("/jobs/job-1");
  });

  it("renders gradient avatar with company initial uppercased", () => {
    mockIsAuthenticated = false;
    renderWithRouter(<JobCard job={baseJob} />);
    // Company "Tech Corp" → "T"
    expect(screen.getByText("T")).toBeInTheDocument();
  });
});
