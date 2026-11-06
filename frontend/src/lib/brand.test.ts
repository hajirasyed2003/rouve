import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ASSETS, BRAND, COLORS, LOGO_GROUND, logoFor } from "@/lib/brand";

const root = path.resolve(__dirname, "../..");
const css = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");

const tokenMap: Record<string, string> = {
  "--color-oxblood": COLORS.oxblood,
  "--color-burgundy-700": COLORS.burgundy,
  "--color-burgundy-900": COLORS.burgundy900,
  "--color-burgundy-500": COLORS.burgundy500,
  "--color-ivory": COLORS.ivory,
  "--color-ivory-200": COLORS.ivory200,
  "--color-beige": COLORS.beige,
  "--color-gold": COLORS.gold,
  "--color-gold-300": COLORS.gold300,
  "--color-gold-700": COLORS.gold700,
  "--color-rose": COLORS.rose,
  "--color-rose-100": COLORS.rose100,
  "--color-ink": COLORS.ink,
  "--color-ink-muted": COLORS.inkMuted,
};

describe("brand configuration", () => {
  it("keeps the exact brand name and tagline", () => {
    expect(BRAND.name).toBe("ROUVÉ");
    expect(BRAND.tagline).toBe("HANDCRAFTED FLORAL BOUTIQUE");
  });

  it.each(Object.entries(tokenMap))("CSS token %s matches brand.ts", (token, hex) => {
    const match = css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`));
    expect(match, `${token} missing from globals.css`).not.toBeNull();
    expect(match![1].toLowerCase()).toBe(hex.toLowerCase());
  });

  it("selects the logo that matches the surface", () => {
    expect(logoFor("dark")).toBe(ASSETS.primaryTrim);
    expect(logoFor("light")).toBe(ASSETS.ivoryTrim);
    expect(logoFor("dark", false)).toBe(ASSETS.primary);
    expect(logoFor("light", false)).toBe(ASSETS.ivory);
    expect(LOGO_GROUND.dark).toBe(COLORS.oxblood);
    expect(LOGO_GROUND.light).toBe(COLORS.ivory);
  });

  it.each(Object.entries(ASSETS))("approved asset %s exists on disk", (_name, asset) => {
    expect(fs.existsSync(path.join(root, "public", asset.src))).toBe(true);
  });

  it("never offers the packaging seal as a logo", () => {
    expect(logoFor("light")).not.toBe(ASSETS.packagingSeal);
    expect(logoFor("dark")).not.toBe(ASSETS.packagingSealCircle);
  });
});
