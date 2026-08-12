import Link from "next/link";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "../ui/SocialLinks";
import { MailIcon, PhoneIcon } from "../ui/icons";
import { footerContent, type FooterLink } from "../../content/footer";
import { solutionsContent } from "../../content/solutions";
import { products } from "../../content/products";

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const solutionLinks: FooterLink[] = solutionsContent.sections.map(
  (section) => ({
    label: section.heading,
    href: `/solutions#${section.anchorId}`,
  }),
);

const productLinks: FooterLink[] = products.map((product) => ({
  label: product.name,
  href: `/products/${product.slug}`,
}));

const midpoint = Math.ceil(productLinks.length / 2);

const columns: FooterColumn[] = [
  { heading: "Main Page", links: footerContent.mainPageLinks },
  { heading: "Solution", links: solutionLinks },
  { heading: "Product", links: productLinks.slice(0, midpoint) },
  { heading: "Product", links: productLinks.slice(midpoint) },
];

export function Footer() {
  return (
    <footer className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-surface-black px-6 py-10 text-white sm:px-10">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo />

          <div className="flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={`tel:${footerContent.contact.phones[0]?.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-brand-orange"
            >
              <PhoneIcon className="h-4 w-4" />
              {footerContent.contact.phones.join("  |  ")}
            </a>
            <a
              href={`mailto:${footerContent.contact.email}`}
              className="flex items-center gap-2 hover:text-brand-orange"
            >
              <MailIcon className="h-4 w-4" />
              {footerContent.contact.email}
            </a>
          </div>

          <SocialLinks links={footerContent.social} variant="solid" />
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {columns.map((column, index) => (
            <nav key={`${column.heading}-${index}`} aria-label={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-brand-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            All rights reserved. Copyright &copy; {new Date().getFullYear()}{" "}
            {footerContent.copyrightHolder}.
          </p>
          <ul className="flex items-center gap-6">
            {footerContent.legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-brand-orange">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
