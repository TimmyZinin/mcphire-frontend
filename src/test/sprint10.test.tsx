import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

describe("Sprint 10: Website changes", () => {
  describe("PricingSection", () => {
    it("renders all 3 pricing plans", () => {
      render(<PricingSection />);
      expect(screen.getAllByText("СТАРТ").length).toBeGreaterThan(0);
      expect(screen.getAllByText("ПРОРЫВ").length).toBeGreaterThan(0);
      expect(screen.getAllByText("VIP").length).toBeGreaterThan(0);
    });

    it("shows correct prices", () => {
      render(<PricingSection />);
      expect(screen.getByText("5 500 ₽ / месяц")).toBeTruthy();
      expect(screen.getByText("9 500 ₽ / месяц")).toBeTruthy();
      expect(screen.getByText("15 000 ₽ / месяц")).toBeTruthy();
    });

    it("does NOT contain guarantee block", () => {
      render(<PricingSection />);
      expect(screen.queryByText("Гарантия результата")).toBeNull();
      expect(screen.queryByText(/вернём деньги/)).toBeNull();
    });

    it("renders comparison table", () => {
      render(<PricingSection />);
      expect(screen.getByText("Что входит")).toBeTruthy();
      expect(screen.getByText("Групповые сессии")).toBeTruthy();
    });
  });

  describe("FAQSection", () => {
    it("renders FAQ questions", () => {
      render(<FAQSection />);
      expect(screen.getByText("Сколько времени нужно уделять?")).toBeTruthy();
      expect(screen.getByText("Это онлайн-курс?")).toBeTruthy();
    });

    it("does NOT mention money-back guarantee in FAQ", () => {
      render(<FAQSection />);
      expect(screen.queryByText(/вернём деньги/)).toBeNull();
    });

    it("has updated answer about results", () => {
      render(<FAQSection />);
      expect(screen.getByText("А если не получится?")).toBeTruthy();
    });
  });
});
