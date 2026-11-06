import * as React from "react";
import { cn } from "@/lib/utils";

/** Centres content at the 1280px page width with responsive gutters. */
export function Container({
  as: Tag = "div",
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return <Tag className={cn("mx-auto w-full max-w-page gutter", className)} {...props} />;
}

/** A page section with the standard vertical rhythm. */
export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("section-y", className)} {...props} />;
}
