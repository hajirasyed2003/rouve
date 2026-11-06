import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Navigation } from "@/components/layout/navigation";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("Navigation", () => {
  it("renders the approved logo as a link home", () => {
    render(<Navigation />);
    const home = screen.getByRole("link", { name: "ROUVÉ, home" });
    expect(home).toHaveAttribute("href", "/");
    expect(within(home).getByAltText("ROUVÉ — Handcrafted Floral Boutique")).toHaveAttribute("src", expect.stringContaining("rouve-ivory-trim"));
  });

  it("lists the desktop links", () => {
    render(<Navigation />);
    const desktop = within(screen.getByTestId("desktop-links"));
    expect(desktop.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/shop");
    expect(desktop.getByRole("link", { name: "Custom Creations" })).toHaveAttribute("href", "/custom-creations");
    expect(desktop.getByRole("link", { name: "Our Craftsmanship" })).toHaveAttribute("href", "/craftsmanship");
  });

  it("marks the current page", () => {
    pathname = "/shop/rose-bouquets";
    render(<Navigation />);
    expect(within(screen.getByTestId("desktop-links")).getByRole("link", { name: "Shop" })).toHaveAttribute("aria-current", "page");
    pathname = "/";
  });

  it("exposes search, account and bag as inert, clearly unavailable placeholders", async () => {
    render(<Navigation />);
    for (const name of [/Search \(coming soon\)/, /Account \(coming soon\)/, /Shopping bag \(coming soon\)/]) {
      const matches = screen.getAllByRole("button", { name });
      expect(matches[0]).toHaveAttribute("aria-disabled", "true");
    }
  });

  it("opens and closes the mobile menu, and Escape restores focus", async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(toggle);
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(within(dialog).getByRole("button", { name: "Close menu" })).toHaveFocus();
    expect(within(dialog).getByRole("link", { name: "Custom Creations" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("closes the mobile menu when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(within(screen.getByRole("dialog")).getByRole("link", { name: "Shop" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps keyboard focus inside the open menu", async () => {
    const user = userEvent.setup();
    render(<Navigation />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog");
    for (let i = 0; i < 8; i++) await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});
