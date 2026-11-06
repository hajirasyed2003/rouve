import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "@/components/products/product-card";
import type { ProductSummary } from "@/lib/products";

const base: ProductSummary = { slug: "sample", name: "Sample bouquet", pricePaise: 480000, availability: "in_stock" };

describe("ProductCard", () => {
  it("shows name, INR price, availability and a product link", () => {
    render(<ProductCard product={base} />);
    expect(screen.getByRole("heading", { name: "Sample bouquet" })).toBeInTheDocument();
    expect(screen.getByText("₹4,800")).toBeInTheDocument();
    expect(screen.getByText("In stock")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View product: Sample bouquet" })).toHaveAttribute("href", "/products/sample");
  });

  it("honours an explicit href", () => {
    render(<ProductCard product={base} href="/shop/elsewhere" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/shop/elsewhere");
  });

  it.each([
    ["in_stock", "In stock"],
    ["made_to_order", "Made to order"],
    ["limited", "Limited stock"],
    ["out_of_stock", "Currently unavailable"],
  ] as const)("labels %s as %s", (availability, label) => {
    render(<ProductCard product={{ ...base, availability }} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("shows an explicit placeholder when there is no photograph", () => {
    render(<ProductCard product={base} />);
    expect(screen.getByRole("img", { name: "Product photograph not yet available" })).toBeInTheDocument();
    expect(screen.getByText("Photograph to follow")).toBeInTheDocument();
  });

  it("renders the real photograph with its alt text when provided", () => {
    render(
      <ProductCard
        product={{ ...base, image: { src: "/images/example.jpg", alt: "Twelve red paper roses", width: 800, height: 1000 } }}
      />,
    );
    expect(screen.getByAltText("Twelve red paper roses")).toBeInTheDocument();
    expect(screen.queryByText("Photograph to follow")).not.toBeInTheDocument();
  });

  it("rejects an invalid price rather than rendering it", () => {
    expect(() => render(<ProductCard product={{ ...base, pricePaise: 10.5 }} />)).toThrow(RangeError);
  });
});
