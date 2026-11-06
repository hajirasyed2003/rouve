import { describe, expect, it } from "vitest";
import { formatPaise } from "@/lib/format";

describe("formatPaise", () => {
  it("formats whole rupees without decimals", () => {
    expect(formatPaise(480000)).toBe("₹4,800");
    expect(formatPaise(0)).toBe("₹0");
  });
  it("keeps two decimals when paise are present", () => {
    expect(formatPaise(249950)).toBe("₹2,499.50");
    expect(formatPaise(99905)).toBe("₹999.05");
  });
  it("uses Indian digit grouping", () => {
    expect(formatPaise(12345600)).toBe("₹1,23,456");
  });
  it("rejects floats, negatives and NaN so bad money never reaches the UI", () => {
    expect(() => formatPaise(10.5)).toThrow(RangeError);
    expect(() => formatPaise(-100)).toThrow(RangeError);
    expect(() => formatPaise(Number.NaN)).toThrow(RangeError);
  });
});
