import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { JobCard } from "@/components/jobs/JobCard";
import type { JobListItem } from "@/types";

const mockJob: JobListItem = {
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

describe("JobCard", () => {
  it("renders job title", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("Senior Frontend Developer")).toBeInTheDocument();
  });

  it("renders company name", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
  });

  it("renders verified badge when company is verified", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("Верифицирован")).toBeInTheDocument();
  });

  it("does not render verified badge when company is not verified", () => {
    const unverifiedJob = {
      ...mockJob,
      company: { ...mockJob.company, isVerified: false },
    };
    renderWithRouter(<JobCard job={unverifiedJob} />);
    expect(screen.queryByText("Верифицирован")).not.toBeInTheDocument();
  });

  it("renders salary range", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText((content) => content.includes("150"))).toBeInTheDocument();
  });

  it("renders skills tags", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("renders format tag", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("Удалённо")).toBeInTheDocument();
  });

  it("renders level tag", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("Senior")).toBeInTheDocument();
  });

  it("renders city", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    expect(screen.getByText("Москва")).toBeInTheDocument();
  });

  it("renders premium badge when isPremium is true", () => {
    renderWithRouter(<JobCard job={mockJob} isPremium />);
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  it("does not render premium badge when isPremium is false", () => {
    renderWithRouter(<JobCard job={mockJob} isPremium={false} />);
    expect(screen.queryByText("Premium")).not.toBeInTheDocument();
  });

  it("renders match score when provided", () => {
    renderWithRouter(<JobCard job={mockJob} matchScore={85} />);
    expect(screen.getByText("85% матч")).toBeInTheDocument();
  });

  it("renders save button when onSave is provided", () => {
    const onSave = vi.fn();
    renderWithRouter(<JobCard job={mockJob} onSave={onSave} />);
    expect(screen.getByLabelText("Сохранить вакансию")).toBeInTheDocument();
  });

  it("calls onSave when save button is clicked", () => {
    const onSave = vi.fn();
    renderWithRouter(<JobCard job={mockJob} onSave={onSave} />);
    screen.getByLabelText("Сохранить вакансию").click();
    expect(onSave).toHaveBeenCalledWith("job-1");
  });

  it("renders saved state correctly", () => {
    const onSave = vi.fn();
    renderWithRouter(<JobCard job={mockJob} onSave={onSave} isSaved />);
    expect(screen.getByLabelText("Убрать из сохранённых")).toBeInTheDocument();
  });

  it("renders compact variant", () => {
    const { container } = renderWithRouter(
      <JobCard job={mockJob} variant="compact" />
    );
    const article = container.querySelector("article");
    expect(article).toHaveClass("group");
  });

  it("links to correct job URL", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/jobs/senior-frontend-developer");
  });

  it("renders company initial when no logo", () => {
    renderWithRouter(<JobCard job={mockJob} />);
    // Should render company initial "T" in avatar
    const avatar = screen.getByText("T");
    expect(avatar).toBeInTheDocument();
  });
});
