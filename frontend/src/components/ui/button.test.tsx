import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders the primary variant by default and defaults type to button", () => {
    render(<Button>Shop</Button>);
    const button = screen.getByRole("button", { name: "Shop" });
    expect(button).toHaveClass("bg-burgundy-700");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders secondary and outline variants", () => {
    render(
      <>
        <Button variant="secondary">Two</Button>
        <Button variant="outline">Three</Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "Two" })).toHaveClass("bg-rose-100");
    expect(screen.getByRole("button", { name: "Three" })).toHaveClass("text-burgundy-700", "bg-transparent");
  });

  it("does not fire clicks when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a busy state and blocks clicks while loading", async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Saving</Button>);
    const button = screen.getByRole("button", { name: "Saving" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector("svg")).toBeInTheDocument();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("can style a link via asChild", () => {
    render(
      <Button asChild>
        <a href="/shop">Browse</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Browse" });
    expect(link).toHaveAttribute("href", "/shop");
    expect(link).toHaveClass("bg-burgundy-700");
  });
});
