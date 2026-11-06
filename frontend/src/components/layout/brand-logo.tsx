import Image from "next/image";
import { logoFor, type Surface } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The approved ROUVÉ lockup, matched to its surface. Always renders the
 * original artwork: the wordmark is never set in a font. Height is controlled
 * by className; width follows the artwork's proportions.
 */
export function BrandLogo({
  surface = "light",
  className,
  priority = false,
}: {
  surface?: Surface;
  className?: string;
  priority?: boolean;
}) {
  const asset = logoFor(surface);
  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={asset.alt}
      priority={priority}
      className={cn("h-12 w-auto", className)}
    />
  );
}
