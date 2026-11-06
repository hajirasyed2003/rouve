import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/layout/container";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { ASSETS, COLORS, TYPOGRAPHY } from "@/lib/brand";
import type { ProductSummary } from "@/lib/products";

export const metadata: Metadata = {
  title: "Component library",
  robots: { index: false, follow: false },
};

/** Sample data for component previews only. These are not real products or prices. */
const SAMPLES: ProductSummary[] = [
  { slug: "sample-a", name: "Sample bouquet A", pricePaise: 199900, availability: "in_stock" },
  { slug: "sample-b", name: "Sample bouquet B", pricePaise: 249950, availability: "made_to_order" },
  { slug: "sample-c", name: "Sample bouquet C", pricePaise: 99900, availability: "limited" },
  { slug: "sample-d", name: "Sample bouquet D", pricePaise: 149900, availability: "out_of_stock" },
];

const SWATCHES: { name: string; hex: string; note: string }[] = [
  { name: "Oxblood", hex: COLORS.oxblood, note: "Logo ground, dark surfaces" },
  { name: "Burgundy", hex: COLORS.burgundy, note: "Primary, headings" },
  { name: "Burgundy 900", hex: COLORS.burgundy900, note: "Hover, panels" },
  { name: "Ivory", hex: COLORS.ivory, note: "Page background" },
  { name: "Beige", hex: COLORS.beige, note: "Borders, neutral" },
  { name: "Antique gold", hex: COLORS.gold, note: "Decoration only" },
  { name: "Gold 700", hex: COLORS.gold700, note: "Gold text on ivory" },
  { name: "Dusty rose", hex: COLORS.rose, note: "Secondary accent" },
  { name: "Rose 100", hex: COLORS.rose100, note: "Secondary button wash" },
  { name: "Ink", hex: COLORS.ink, note: "Body text" },
];

export default function DesignSystemPage() {
  return (
    <>
      <Section className="pb-0! md:pb-0!">
        <Container>
          <h1>Component library</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-muted">
            A working reference for the ROUVÉ design system. Product names and prices below are sample data for
            previewing components and do not describe real products.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Colour</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((s) => (
              <li key={s.name}>
                <div className="h-20 border border-black/10" style={{ background: s.hex }} />
                <p className="mt-2 text-sm font-medium">{s.name}</p>
                <p className="font-mono text-xs text-ink-muted">{s.hex}</p>
                <p className="text-xs text-ink-muted">{s.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-ivory-200">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <h2>Typography</h2>
            <p className="mt-4 text-ink-muted">
              {TYPOGRAPHY.heading.family} for headings, {TYPOGRAPHY.body.family} for body text. {TYPOGRAPHY.note}
            </p>
          </div>
          <div className="space-y-4">
            <h1>Heading one</h1>
            <h2>Heading two</h2>
            <h3>Heading three</h3>
            <h4>Heading four</h4>
            <p className="max-w-prose">
              Body text is set in Jost at sixteen pixels with generous leading, so long descriptions of a
              bouquet stay easy to read on any screen.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Logo and surfaces</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-center bg-ivory p-8 ring-1 ring-beige">
              <Image src={ASSETS.ivoryTrim.src} width={ASSETS.ivoryTrim.width} height={ASSETS.ivoryTrim.height} alt={ASSETS.ivoryTrim.alt} className="h-44 w-auto" />
            </div>
            <div className="flex items-center justify-center bg-oxblood p-8">
              <Image src={ASSETS.primaryTrim.src} width={ASSETS.primaryTrim.width} height={ASSETS.primaryTrim.height} alt={ASSETS.primaryTrim.alt} className="h-44 w-auto" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-ivory-200">
        <Container>
          <h2>Buttons</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Saving</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Product cards</h2>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Without a photograph, the card shows an explicit placeholder panel. Availability labels follow the
            catalogue states: in stock, made to order, limited stock and unavailable.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 min-[30rem]:grid-cols-2 lg:grid-cols-4">
            {SAMPLES.map((product) => (
              <ProductCard key={product.slug} product={product} href="#" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
