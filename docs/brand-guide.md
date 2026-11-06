# ROUVÉ Brand Guide (v1.1, repository summary)

The visual guide with rendered examples was published during Day 1 and v1.1. This file is the
text reference for developers. The approved artwork in `frontend/public/brand/` is the
source of truth for the identity.

## The wordmark

ROUVÉ is set in custom lettering with Tamil-inspired curves and ornamental forms. It is artwork.
Never retype it in a font, redraw it, re-space it, drop the accent on É, or write it in a display
face that imitates it. In running text, write ROUVÉ in plain capitals.

## Logo hierarchy

| Mark | File | Surface | Use |
|---|---|---|---|
| Primary (gold on burgundy) | `rouve-primary.png`, `rouve-primary-trim.png` | Oxblood `#240002` | Footer, hero, dark banners |
| Secondary (burgundy on ivory) | `rouve-ivory.png`, `rouve-ivory-trim.png` | Ivory `#FBF1E6` | Header, emails, invoices |
| Packaging seal | `rouve-packaging-seal.png`, `rouve-packaging-seal-circle.png` | Ivory stock, boxes | Stickers, seals, labels. **Never the site logo** |
| Rose icon | `rouve-icon.png` | Compact spaces | Placeholders, small marks. Not a favicon |
| Originals | `source/*-original.png` | n/a | Untouched deliveries. Never edit |

In code use `<BrandLogo surface="light" | "dark" />` or `logoFor(surface)` from `src/lib/brand.ts`.
Match the logo to its ground so the textured edge of the opaque artwork disappears.

**Not production-ready masters.** The primary, ivory and icon files are opaque rasters on textured
backgrounds. Only the seal has a transparent version (`-circle`), cropped to its gold ring.
Still required from the designer: vector redraws, transparent masters, a favicon set, one-colour
foil versions and a horizontal one-line lockup for the navigation.

Do not: stretch or squash, recolour, add shadows or effects, crop into the wordmark, place on
photography without a solid burgundy panel, or use the seal as the website logo.

## Colour

Source: `src/app/globals.css` (`@theme`), mirrored in `src/lib/brand.ts` and verified by a unit test.

| Token | Hex | Use |
|---|---|---|
| `oxblood` | `#240002` | Logo ground (sampled), dark surfaces, footer |
| `burgundy-700` | `#5C0F1F` | Primary brand colour, headings, buttons |
| `burgundy-900` | `#430A16` | Hover, panels |
| `burgundy-500` | `#7A1A2E` | Links, imagery tint |
| `ivory` | `#FBF1E6` | Page background (sampled from the ivory logo) |
| `ivory-200` | `#F4E8D6` | Alternate bands |
| `beige` | `#E8DFCF` | Borders, neutral |
| `gold` | `#CEA470` | Decoration only (about 2:1 on ivory) |
| `gold-300` | `#E4BB7C` | Highlights on dark |
| `gold-700` | `#7F6428` | The only gold allowed for text on ivory |
| `rose` / `rose-100` | `#C99A9A` / `#EBD3D0` | Secondary accent, secondary button |
| `ink` / `ink-muted` | `#2B1A1C` / `#6B5A57` | Body text, captions |
| status | `#2F4A25`, `#7A4E10`, `#6B2630` (text) | In stock, limited, unavailable |

Documented deviations: ivory changed from `#FAF6EE` (v1.0) to `#FBF1E6` and gold from `#A98B4F` to
`#CEA470`, both sampled from the approved artwork. `oxblood` is new; it is the logo's own ground.

## Typography

Supporting type only. Headings: Cormorant Garamond (400, 500). Body and interface: Jost (300, 400, 500).
Self-hosted through Fontsource (`@fontsource/*`), so no request goes to Google at runtime.
Prices use lining figures. Buttons and nav labels use the `text-label` utility (12px, caps, 0.2em).

## Shape, spacing, motion

2px radius on buttons, inputs, cards and badges; images are square-cornered. Borders are 1px beige;
shadows are essentially absent. Page width 1280px; gutters 20 / 32 / 48px; sections 64px mobile,
96px desktop. No decorative animation; `prefers-reduced-motion` is honoured globally.

## Components in code

| Component | File | Notes |
|---|---|---|
| Button | `src/components/ui/button.tsx` | primary, secondary, outline; sm/md/lg; `loading`, `disabled`, `asChild` |
| Navigation, Header | `src/components/layout/` | Desktop links, mobile menu with focus trap, inert search/account/bag placeholders |
| Footer | `src/components/layout/footer.tsx` | Primary logo and seal on oxblood |
| Container, Section | `src/components/layout/container.tsx` | Page width, gutters, vertical rhythm |
| ProductCard | `src/components/products/product-card.tsx` | 4:5 photo, name, INR price, availability, View product; explicit placeholder panel |

A live gallery is at `/design-system` (noindex) in the running frontend.

## Photography

Deep red roses on ivory or beige; soft north-window light; tissue and silk ribbon; petal macros; at
most one prop. Ratios 4:5 product, 3:4 category, 3:2 hero. No filters, neon or pink gradients.
