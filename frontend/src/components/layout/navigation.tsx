"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { PRIMARY_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconButton =
  "inline-flex size-11 items-center justify-center text-burgundy-700 transition-colors hover:text-burgundy-900 focus-visible:outline-2 focus-visible:outline-offset-0";

/**
 * Search, account and bag are placeholders in this milestone: they are
 * focusable but inert, announce themselves as unavailable, and do nothing.
 */
function PlaceholderAction({
  label,
  icon: Icon,
  className,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title={`${label} (coming soon)`}
      onClick={(event) => event.preventDefault()}
      className={cn(iconButton, "cursor-not-allowed opacity-60", className)}
    >
      <Icon className="size-5" aria-hidden="true" />
      <span className="sr-only">{label} (coming soon)</span>
    </button>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const menuButton = React.useRef<HTMLButtonElement>(null);
  const closeButton = React.useRef<HTMLButtonElement>(null);
  const panel = React.useRef<HTMLDivElement>(null);

  const close = React.useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  // Mobile menu behaviour: lock scroll, move focus in, trap Tab, close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <nav
      aria-label="Primary"
      className="mx-auto grid h-16 w-full max-w-page grid-cols-[1fr_auto_1fr] items-center gutter md:h-22"
    >
      {/* Left: menu button (mobile) or links (desktop) */}
      <div className="flex items-center">
        <button
          ref={menuButton}
          type="button"
          className={cn(iconButton, "-ml-2 md:hidden")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-6" aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </button>
        <ul className="hidden items-center gap-8 md:flex" data-testid="desktop-links">
          {PRIMARY_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={cn(
                  "text-label border-b border-transparent pb-1 text-burgundy-700 transition-colors hover:border-gold",
                  isActive(pathname, link.href) && "border-gold-700",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Centre: approved logo */}
      <Link href="/" aria-label="ROUVÉ, home" className="flex items-center justify-center">
        <BrandLogo surface="light" priority className="h-11 md:h-18" />
      </Link>

      {/* Right: utilities */}
      <div className="flex items-center justify-end gap-1 md:-mr-2">
        <PlaceholderAction label="Search" icon={Search} className="hidden md:inline-flex" />
        <PlaceholderAction label="Account" icon={User} className="hidden md:inline-flex" />
        <PlaceholderAction label="Shopping bag" icon={ShoppingBag} className="-mr-2 md:mr-0" />
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-ivory md:hidden"
        >
          <div className="flex h-16 items-center justify-between border-b border-beige gutter">
            <BrandLogo surface="light" className="h-11" />
            <button ref={closeButton} type="button" className={cn(iconButton, "-mr-2")} onClick={close}>
              <X className="size-6" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <ul className="gutter py-6">
            {PRIMARY_NAV.map((link) => (
              <li key={link.href} className="border-b border-beige">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className="block py-4 font-serif text-3xl text-burgundy-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="gutter flex gap-2">
            <PlaceholderAction label="Search" icon={Search} className="-ml-2" />
            <PlaceholderAction label="Account" icon={User} />
          </div>
        </div>
      )}
    </nav>
  );
}
