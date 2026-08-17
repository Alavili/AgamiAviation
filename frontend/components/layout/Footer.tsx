import Link from "next/link";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "../ui/SocialLinks";
import { PhoneSolidIcon, SendIcon } from "../ui/icons";
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
    <footer className="bg-white py-8 sm:py-10">
      <div className="relative mx-2 overflow-hidden rounded-xl bg-surface-black px-6 py-10 text-white shadow-[0_50px_100px_-40px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06] sm:mx-3 sm:px-10 lg:mx-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-brand-orange/15 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1276BC]/15 blur-[110px]"
        />

        <div className="relative flex flex-col gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <Logo />

          <div className="flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={`tel:${footerContent.contact.phones[0]?.replace(/\s/g, "")}`}
              className="group flex items-center gap-2.5 transition hover:text-brand-orange"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-hover:bg-brand-orange/15 group-hover:ring-brand-orange/40">
                <PhoneSolidIcon className="h-3.5 w-3.5 text-brand-orange" />
              </span>
              {footerContent.contact.phones.join("  |  ")}
            </a>
            <a
              href={`mailto:${footerContent.contact.email}`}
              className="group flex items-center gap-2.5 transition hover:text-brand-orange"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition group-hover:bg-brand-orange/15 group-hover:ring-brand-orange/40">
                <SendIcon className="h-3.5 w-3.5 text-brand-orange" />
              </span>
              {footerContent.contact.email}
            </a>
          </div>

          <SocialLinks
            links={footerContent.social}
            variant="solid"
            linkClassName="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_10px_24px_-8px_rgba(250,145,28,0.65)] ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-brand-orange-dark hover:shadow-[0_14px_28px_-8px_rgba(250,145,28,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />
        </div>

        <div className="relative grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {columns.map((column, index) => (
            <nav key={`${column.heading}-${index}`} aria-label={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                {column.heading}
              </h3>
              <span className="mt-3 block h-[3px] w-6 rounded-full bg-brand-orange" />
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm uppercase tracking-[0.03em] text-white/70 transition hover:translate-x-0.5 hover:text-brand-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="relative flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-5 text-xs uppercase tracking-[0.08em] text-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] sm:flex-row sm:items-center sm:justify-between sm:rounded-full">
          <p>
            All rights reserved. Copyrights &copy; {new Date().getFullYear()}{" "}
            {footerContent.copyrightHolder}.
          </p>
          <ul className="flex items-center gap-6">
            {footerContent.legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition hover:text-brand-orange"
                >
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
