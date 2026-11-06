import Image from "next/image";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/layout/container";
import { ASSETS, BRAND } from "@/lib/brand";
import { FOOTER_NAV } from "@/lib/site";

/** Dark footer: primary logo on oxblood, with the packaging seal as a small mark. */
export function Footer() {
  const seal = ASSETS.packagingSealCircle;
  return (
    <footer className="mt-auto bg-oxblood text-beige">
      <Container className="section-y">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col items-start gap-6">
            <BrandLogo surface="dark" className="h-28 w-auto" />
            <Image src={seal.src} width={seal.width} height={seal.height} alt={seal.alt} className="size-20" />
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <h2 className="font-sans text-label text-gold-300">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-beige transition-colors hover:text-gold-300 focus-visible:outline-gold-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p className="mt-14 border-t border-gold/30 pt-6 text-xs text-beige/80">
          © {BRAND.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
