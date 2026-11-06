/** Shapes the storefront will receive from the catalogue API (milestone: catalogue). */
export type Availability = "in_stock" | "made_to_order" | "limited" | "out_of_stock";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductSummary {
  slug: string;
  name: string;
  /** Selling price in paise (integer). */
  pricePaise: number;
  availability: Availability;
  image?: ProductImage;
}

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  in_stock: "In stock",
  made_to_order: "Made to order",
  limited: "Limited stock",
  out_of_stock: "Currently unavailable",
};
