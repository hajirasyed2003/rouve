import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ASSETS } from "@/lib/brand";
import { formatPaise } from "@/lib/format";
import { AVAILABILITY_LABELS, type Availability, type ProductSummary } from "@/lib/products";
import { cn } from "@/lib/utils";

const availabilityStyles: Record<Availability, string> = {
  in_stock: "bg-status-ok-bg text-status-ok",
  made_to_order: "border border-gold-700/50 bg-ivory text-gold-700",
  limited: "bg-status-low-bg text-status-low",
  out_of_stock: "bg-status-out-bg text-status-out",
};

export interface ProductCardProps {
  product: ProductSummary;
  /** Defaults to /products/{slug}. */
  href?: string;
  className?: string;
}

/**
 * Catalogue card: 4:5 photograph, serif name, lining-figure price, availability
 * label and a View product action. Without a photograph it renders an explicit
 * placeholder panel, never a made-up product image.
 */
export function ProductCard({ product, href, className }: ProductCardProps) {
  const { name, slug, pricePaise, availability, image } = product;
  const placeholder = ASSETS.icon;

  return (
    <article className={cn("group flex flex-col border border-beige bg-ivory", className)}>
      <div className="relative aspect-4/5 overflow-hidden bg-oxblood">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="size-full object-cover"
          />
        ) : (
          <div role="img" aria-label="Product photograph not yet available" className="size-full">
            <Image
              src={placeholder.src}
              alt=""
              width={placeholder.width}
              height={placeholder.height}
              className="size-full object-cover opacity-90"
            />
            <span className="absolute inset-x-0 bottom-0 bg-oxblood/85 px-4 py-2 text-center text-xs text-gold-300">
              Photograph to follow
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 px-4 py-5 text-center">
        <h3 className="text-[1.375rem] leading-tight">{name}</h3>
        <p className="font-serif text-xl font-medium text-burgundy-700 [font-variant-numeric:lining-nums]">
          {formatPaise(pricePaise)}
        </p>
        <span className={cn("rounded-sm px-2.5 py-1 text-xs font-medium", availabilityStyles[availability])}>
          {AVAILABILITY_LABELS[availability]}
        </span>
        <Link
          href={href ?? `/products/${slug}`}
          aria-label={`View product: ${name}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto")}
        >
          View product
        </Link>
      </div>
    </article>
  );
}
