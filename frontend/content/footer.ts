import type { SocialLink } from "../components/ui/SocialLinks";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  contact: {
    phones: string[]; // PENDING_CLIENT_CONTENT
    email: string; // PENDING_CLIENT_CONTENT
  };
  social: SocialLink[];
  mainPageLinks: FooterLink[];
  legalLinks: FooterLink[];
  copyrightHolder: string; // PENDING_CLIENT_CONTENT
}

// Solution and Product columns are composed in the Footer component itself
// from content/solutions.ts and content/products.ts, so the two data sets
// stay single-sourced rather than duplicated here.
export const footerContent: FooterContent = {
  contact: {
    phones: ["+971 50 222 1345", "+971 4 547 3252"], // PENDING_CLIENT_CONTENT
    email: "info@agamiengineering.com", // PENDING_CLIENT_CONTENT
  },
  social: [
    { platform: "facebook", href: "#" }, // PENDING_CLIENT_CONTENT
    { platform: "instagram", href: "#" }, // PENDING_CLIENT_CONTENT
    { platform: "x", href: "#" }, // PENDING_CLIENT_CONTENT
    { platform: "linkedin", href: "#" }, // PENDING_CLIENT_CONTENT
  ],
  mainPageLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Contact Us", href: "/contact" },
  ],
  legalLinks: [
    // No dedicated routes in v1 scope per PROJECT_PLAN.md §1 — inert until built.
    { label: "Privacy Policy", href: "#" }, // PENDING_CLIENT_CONTENT
    { label: "Terms & Conditions", href: "#" }, // PENDING_CLIENT_CONTENT
  ],
  copyrightHolder: "AGAMI Aviation Engineering", // PENDING_CLIENT_CONTENT
};
