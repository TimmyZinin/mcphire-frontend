import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";

describe("Sprint 10 + 5.1: Website", () => {
  describe("PricingSection", () => {
    it("renders all 3 pricing plans", () => {
      render(<PricingSection />);
      expect(screen.getAllByText("СТАРТ").length).toBeGreaterThan(0);
      expect(screen.getAllByText("ПРОРЫВ").length).toBeGreaterThan(0);
      expect(screen.getAllByText("VIP").length).toBeGreaterThan(0);
    });

    it("shows correct prices (updated)", () => {
      render(<PricingSection />);
      expect(screen.getByText("4 900 ₽ / месяц")).toBeTruthy();
      expect(screen.getByText("9 900 ₽ / месяц")).toBeTruthy();
      expect(screen.getByText("15 900 ₽ / месяц")).toBeTruthy();
    });

    it("does NOT contain old prices", () => {
      render(<PricingSection />);
      expect(screen.queryByText("5 500 ₽ / месяц")).toBeNull();
      expect(screen.queryByText("9 500 ₽ / месяц")).toBeNull();
      expect(screen.queryByText("15 000 ₽ / месяц")).toBeNull();
    });

    it("does NOT contain guarantee block", () => {
      render(<PricingSection />);
      expect(screen.queryByText("Гарантия результата")).toBeNull();
      expect(screen.queryByText(/вернём деньги/)).toBeNull();
    });

    it("renders comparison table with buddy", () => {
      render(<PricingSection />);
      expect(screen.getByText("Что входит")).toBeTruthy();
      expect(screen.getByText("Buddy-система")).toBeTruthy();
    });

    it.skip("shows trial CTA (hidden until referral program enabled on pricing page)", () => {
      render(<PricingSection />);
      expect(screen.getByTestId("trial-cta")).toBeTruthy();
      expect(screen.getByText(/5 друзей/)).toBeTruthy();
    });

    it("shows XP multiplier row", () => {
      render(<PricingSection />);
      expect(screen.getByText("XP множитель")).toBeTruthy();
      expect(screen.getByText("×1.5")).toBeTruthy();
    });
  });

  describe("HeroSection", () => {
    it("renders marathon tagline", () => {
      render(<HeroSection />);
      expect(screen.getByText(/Марафон к офферу/)).toBeTruthy();
    });

    it("shows progress bar with levels", () => {
      render(<HeroSection />);
      expect(screen.getByTestId("hero-progress")).toBeTruthy();
      expect(screen.getByText("Подготовка")).toBeTruthy();
      expect(screen.getByText("ОФФЕР")).toBeTruthy();
    });

    it("has NRC-style CTA", () => {
      render(<HeroSection />);
      expect(screen.getByTestId("hero-cta")).toHaveTextContent("НАЧАТЬ БЕСПЛАТНО");
    });

    it("shows webinar link", () => {
      render(<HeroSection />);
      expect(screen.getByText(/Вебинар 19 февраля/)).toBeTruthy();
    });

    it("does NOT use lime colors", () => {
      render(<HeroSection />);
      const section = screen.getByText("СБОРКА").closest("section");
      expect(section?.innerHTML).not.toContain("#DFFF00");
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
