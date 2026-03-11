import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("handles conditional classes", () => {
      const condition = true;
      expect(cn("foo", condition && "bar", "baz")).toBe("foo bar baz");
    });

    it("handles falsey values", () => {
      expect(cn("foo", false && "bar", null, undefined, 0, "baz")).toBe("foo baz");
    });

    it("handles empty strings", () => {
      expect(cn("foo", "", "bar")).toBe("foo bar");
    });

    it("handles arrays", () => {
      expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
    });
  });
});
