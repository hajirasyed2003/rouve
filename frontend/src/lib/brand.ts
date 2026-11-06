/**
 * ROUVÉ brand configuration: the single TypeScript source for brand values.
 *
 * The approved artwork in /public/brand is the source of truth for the logo.
 * Never retype the wordmark in a font, and never stretch, recolour or re-crop
 * these files. Colour values mirror the @theme block in src/app/globals.css
 * (verified by src/lib/brand.test.ts).
 */
export const BRAND = {
  name: "ROUVÉ",
  tagline: "HANDCRAFTED FLORAL BOUTIQUE",
  currency: "INR",
  locale: "en-IN",
} as const;

export const COLORS = {
  /** Logo ground and dark surfaces. Sampled from the approved primary logo. */
  oxblood: "#240002",
  /** Primary brand colour. */
  burgundy: "#5C0F1F",
  burgundy900: "#430A16",
  burgundy500: "#7A1A2E",
  /** Page background. Sampled from the approved ivory logo. */
  ivory: "#FBF1E6",
  ivory200: "#F4E8D6",
  beige: "#E8DFCF",
  /** Decorative accent. About 2:1 on ivory, so never used for text. */
  gold: "#CEA470",
  gold300: "#E4BB7C",
  /** The only gold that is safe for text on ivory. */
  gold700: "#7F6428",
  rose: "#C99A9A",
  rose100: "#EBD3D0",
  ink: "#2B1A1C",
  inkMuted: "#6B5A57",
} as const;

export const TYPOGRAPHY = {
  heading: { family: "Cormorant Garamond", weights: [400, 500], role: "Editorial serif for headings" },
  body: { family: "Jost", weights: [300, 400, 500], role: "Body copy and interface text" },
  note: "Supporting type only. The ROUVÉ wordmark is artwork and is never typeset.",
} as const;

export type Surface = "dark" | "light";

export interface BrandAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const LOGO_ALT = "ROUVÉ — Handcrafted Floral Boutique";

export const ASSETS = {
  /** Gold lettering on deep burgundy. For dark surfaces. Opaque raster. */
  primary: { src: "/brand/rouve-primary.png", width: 1536, height: 1024, alt: LOGO_ALT },
  /** Primary lockup with empty ground trimmed away (no resampling). */
  primaryTrim: { src: "/brand/rouve-primary-trim.png", width: 1050, height: 720, alt: LOGO_ALT },
  /** Burgundy lettering on ivory. For light surfaces. Opaque raster. */
  ivory: { src: "/brand/rouve-ivory.png", width: 1536, height: 1024, alt: LOGO_ALT },
  ivoryTrim: { src: "/brand/rouve-ivory-trim.png", width: 1050, height: 720, alt: LOGO_ALT },
  /** Packaging seal. Never the website logo. */
  packagingSeal: { src: "/brand/rouve-packaging-seal.png", width: 1254, height: 1254, alt: "ROUVÉ packaging seal" },
  /** Seal cropped to its gold ring with real transparent corners. */
  packagingSealCircle: { src: "/brand/rouve-packaging-seal-circle.png", width: 1001, height: 1001, alt: "ROUVÉ packaging seal" },
  /** Rose and bud only. Opaque burgundy ground, not square, not a favicon. */
  icon: { src: "/brand/rouve-icon.png", width: 520, height: 405, alt: "ROUVÉ rose" },
} as const satisfies Record<string, BrandAsset>;

/** Page grounds that visually match the opaque logo files. */
export const LOGO_GROUND = { dark: COLORS.oxblood, light: COLORS.ivory } as const;

/** Pick the logo artwork that matches the surface it will sit on. */
export function logoFor(surface: Surface, trimmed = true): BrandAsset {
  if (surface === "dark") return trimmed ? ASSETS.primaryTrim : ASSETS.primary;
  return trimmed ? ASSETS.ivoryTrim : ASSETS.ivory;
}
