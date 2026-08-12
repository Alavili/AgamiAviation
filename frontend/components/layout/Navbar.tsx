"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "../ui/SocialLinks";
import { CtaButton } from "../ui/Button";
import { CloseIcon, MenuIcon } from "../ui/icons";
import { navbarContent } from "../../content/navbar";

const SCROLL_THRESHOLD = 80;

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[rgba(105,105,105,0.2)] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_8px_24px_rgba(8,20,35,0.35)] backdrop-blur-lg backdrop-saturate-150 transition hover:bg-white/20 hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable || focusable.length === 0) return;
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

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    menuTriggerRef.current = event.currentTarget;
    setIsMenuOpen(true);
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${
        isScrolled
          ? "inset-x-0 top-0 border-b border-white/10 bg-surface-dark/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150"
          : "inset-x-2 top-2 bg-transparent sm:inset-x-3 sm:top-3 lg:inset-x-4 lg:top-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Mobile (all scroll positions): social left / logo centered / hamburger right */}
        <div className="flex w-full items-center justify-between gap-2 lg:hidden">
          <SocialLinks
            links={navbarContent.social}
            variant="glassSm"
            gapClassName="gap-1.5"
          />
          <Logo imageClassName="h-8 w-8 sm:h-10 sm:w-10" stacked />
          <IconButton label="Open menu" onClick={openMenu}>
            <MenuIcon className="h-4 w-4" />
          </IconButton>
        </div>

        {/* Desktop, at top of page: social left / logo centered / hamburger right */}
        {!isScrolled && (
          <div className="hidden w-full items-center justify-between lg:flex">
            <SocialLinks links={navbarContent.social} />
            <Logo imageClassName="h-12 w-12" stacked />
            <IconButton label="Open menu" onClick={openMenu}>
              <MenuIcon className="h-4 w-4" />
            </IconButton>
          </div>
        )}

        {/* Desktop, scrolled: logo / full nav links / social + Contact CTA */}
        {isScrolled && (
          <div className="hidden w-full items-center justify-between lg:flex">
            <Logo imageClassName="h-11 w-11" stacked />
            <nav aria-label="Main">
              <ul className="flex items-center gap-8">
                {navbarContent.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/90 transition hover:text-brand-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <SocialLinks links={navbarContent.social} />
              <CtaButton href={navbarContent.ctaHref}>
                {navbarContent.ctaLabel}
              </CtaButton>
            </div>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div
            ref={menuPanelRef}
            id="primary-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col gap-8 bg-surface-dark px-6 py-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Logo imageClassName="h-10 w-10" stacked />
              <IconButton
                label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <CloseIcon className="h-4 w-4" />
              </IconButton>
            </div>
            <nav aria-label="Main">
              <ul className="flex flex-col gap-6">
                {navbarContent.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-medium text-white transition hover:text-brand-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <CtaButton href={navbarContent.ctaHref} className="w-fit">
              {navbarContent.ctaLabel}
            </CtaButton>
            <SocialLinks links={navbarContent.social} className="mt-auto" />
          </div>
        </div>
      )}
    </header>
  );
}
