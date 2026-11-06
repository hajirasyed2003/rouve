import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/container";
import { ASSETS } from "@/lib/brand";

/**
 * Foundation landing page. The campaign homepage is a later milestone
 * (see Website Architecture, section 3); this page only confirms the shell.
 */
export default function HomePage() {
  const logo = ASSETS.ivory;
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={logo.alt}
          priority
          className="h-auto w-full max-w-[34rem]"
        />
        <h1 className="mt-10 max-w-3xl">Artistic paper roses, made by hand</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-muted">
          The ROUVÉ online boutique is being built. Bouquets and custom creations will appear here once the
          catalogue is ready.
        </p>
        <Link
          href="/design-system"
          className="mt-10 text-sm text-gold-700 underline underline-offset-4 hover:text-burgundy-700"
        >
          Preview the component library
        </Link>
      </Container>
    </Section>
  );
}
