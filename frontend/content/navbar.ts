import type { SocialLink } from "../components/ui/SocialLinks";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarContent {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  social: SocialLink[];
}

// Link targets for "Products" and "Projects" point at Home page anchors
// (Our Products accordion / Portfolio carousel) since neither has its own
// route per PROJECT_PLAN.md §1 — those sections don't exist yet, so the
// anchors are inert until the Home page sections are built.
export const navbarContent: NavbarContent = {
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/#products" },
    { label: "Projects", href: "/#portfolio" },
  ],
  ctaLabel: "Contact",
  ctaHref: "/contact",
  social: [
    { platform: "facebook", href: "#" }, // PENDING_CLIENT_CONTENT
    { platform: "linkedin", href: "#" }, // PENDING_CLIENT_CONTENT
    { platform: "instagram", href: "#" }, // PENDING_CLIENT_CONTENT
    { platform: "x", href: "#" }, // PENDING_CLIENT_CONTENT
  ],
};
