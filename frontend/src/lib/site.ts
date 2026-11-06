/**
 * Navigation structure from Website Architecture v1.0 and confirmed decisions.
 * Most destinations are later milestones: until they exist, links reach the
 * branded 404 page. Do not add routes here that are not in the architecture.
 */
export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Custom Creations", href: "/custom-creations" },
  { label: "Our Craftsmanship", href: "/craftsmanship" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Shop all", href: "/shop" },
      { label: "Custom creations", href: "/custom-creations" },
      { label: "Romantic gifting", href: "/collections/romantic-gifting" },
    ],
  },
  {
    title: "Care",
    links: [
      { label: "Track an order", href: "/track" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping and delivery", href: "/policies/shipping" },
      { label: "Cancellation and refunds", href: "/policies/refunds" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "About ROUVÉ", href: "/about" },
      { label: "Our craftsmanship", href: "/craftsmanship" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/policies/privacy" },
      { label: "Terms and conditions", href: "/policies/terms" },
    ],
  },
];
