import { describe, it, expect } from "vitest";
import {
  formatSalary,
  formatSalaryRange,
  formatRelativeTime,
  formatDate,
  formatCount,
  slugify,
  formatColors,
  levelColors,
  applicationStatusLabels,
} from "@/lib/formatters";

describe("formatters", () => {
  describe("formatSalary", () => {
    it("formats salary in RUB", () => {
      expect(formatSalary(100000)).toBe("100 000 ₽");
    });

    it("formats salary in USD", () => {
      expect(formatSalary(5000, "USD", "en")).toBe("$5,000");
    });

    it("formats large numbers with separators", () => {
      expect(formatSalary(1000000)).toBe("1 000 000 ₽");
    });
  });

  describe("formatSalaryRange", () => {
    it("returns 'Зарплата не указана' when both are null", () => {
      expect(formatSalaryRange(null, null)).toBe("Зарплата не указана");
    });

    it("shows 'до' when only max is provided", () => {
      expect(formatSalaryRange(null, 150000)).toBe("до 150 000 ₽");
    });

    it("shows 'от' when only min is provided", () => {
      expect(formatSalaryRange(80000, null)).toBe("от 80 000 ₽");
    });

    it("shows range when both are provided", () => {
      expect(formatSalaryRange(80000, 150000)).toBe("80 000 ₽ — 150 000 ₽");
    });
  });

  describe("formatRelativeTime", () => {
    it("returns 'сегодня' for today", () => {
      const today = new Date().toISOString();
      expect(formatRelativeTime(today)).toMatch(/сегодня|0/);
    });
  });

  describe("slugify", () => {
    it("converts spaces to hyphens", () => {
      expect(slugify("hello world")).toBe("hello-world");
    });

    it("converts to lowercase", () => {
      expect(slugify("HELLO WORLD")).toBe("hello-world");
    });

    it("removes special characters", () => {
      expect(slugify("hello, world!")).toBe("hello-world");
    });

    it("handles Russian text", () => {
      expect(slugify("Привет Мир")).toBe("привет-мир");
    });

    it("removes leading/trailing hyphens", () => {
      expect(slugify("  hello  ")).toBe("hello");
    });
  });

  describe("formatColors", () => {
    it("returns correct color for remote", () => {
      expect(formatColors["Удалённо"]).toBe("bg-emerald-50 text-emerald-700");
    });

    it("returns correct color for office", () => {
      expect(formatColors["Офис"]).toBe("bg-blue-50 text-blue-700");
    });

    it("returns correct color for hybrid", () => {
      expect(formatColors["Гибрид"]).toBe("bg-amber-50 text-amber-700");
    });
  });

  describe("levelColors", () => {
    it("returns correct colors for all levels", () => {
      expect(levelColors["Junior"]).toBe("bg-sky-50 text-sky-700");
      expect(levelColors["Middle"]).toBe("bg-violet-50 text-violet-700");
      expect(levelColors["Senior"]).toBe("bg-orange-50 text-orange-700");
      expect(levelColors["Lead"]).toBe("bg-rose-50 text-rose-700");
    });
  });

  describe("applicationStatusLabels", () => {
    it("returns correct labels for all statuses", () => {
      expect(applicationStatusLabels["new"]).toBe("Новый");
      expect(applicationStatusLabels["viewed"]).toBe("Просмотрен");
      expect(applicationStatusLabels["interview"]).toBe("Интервью");
      expect(applicationStatusLabels["offer"]).toBe("Оффер");
      expect(applicationStatusLabels["hired"]).toBe("Принят");
      expect(applicationStatusLabels["rejected"]).toBe("Отклонён");
    });
  });
});
