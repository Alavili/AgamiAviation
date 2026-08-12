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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-brand-orange hover:bg-white/20 hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-surface-dark/40 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Mobile (all scroll positions): logo + hamburger */}
        <div className="flex w-full items-center justify-between lg:hidden">
          <Logo />
          <IconButton label="Open menu" onClick={openMenu}>
            <MenuIcon className="h-5 w-5" />
          </IconButton>
        </div>

        {/* Desktop, at top of page: social left / logo centered / hamburger right */}
        {!isScrolled && (
          <div className="hidden w-full items-center justify-between lg:flex">
            <SocialLinks links={navbarContent.social} />
            <Logo />
            <IconButton label="Open menu" onClick={openMenu}>
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          </div>
        )}

        {/* Desktop, scrolled: logo / full nav links / social + Contact CTA */}
        {isScrolled && (
          <div className="hidden w-full items-center justify-between lg:flex">
            <Logo />
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
              <Logo />
              <IconButton
                label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <CloseIcon className="h-5 w-5" />
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
