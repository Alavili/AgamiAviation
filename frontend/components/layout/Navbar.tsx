"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "../ui/SocialLinks";
import { CtaButton } from "../ui/Button";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "../ui/icons";
import { navbarContent } from "../../content/navbar";

const SCROLL_THRESHOLD = 80;
const MENU_TRANSITION_DURATION = 500;

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

const ENTER_ANIMATION_DURATION = 900;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [playEnterAnimation, setPlayEnterAnimation] = useState(true);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLElement | null>(null);
  const wasScrolledRef = useRef(false);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Replay the slide-down entrance both on first mount and every time the
  // navbar transitions into its sticky (scrolled) state, so the sticky bar
  // visibly drops in from above rather than just cross-fading in place.
  useEffect(() => {
    const isBecomingSticky = isScrolled && !wasScrolledRef.current;
    wasScrolledRef.current = isScrolled;
    if (!isBecomingSticky) return;

    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    setPlayEnterAnimation(true);
    enterTimeoutRef.current = setTimeout(
      () => setPlayEnterAnimation(false),
      ENTER_ANIMATION_DURATION,
    );
  }, [isScrolled]);

  useEffect(() => {
    enterTimeoutRef.current = setTimeout(
      () => setPlayEnterAnimation(false),
      ENTER_ANIMATION_DURATION,
    );
    return () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  // Panel mounts translated off-screen, then flips to visible on the next
  // frame so the transform transition actually has something to animate
  // from instead of just appearing in place.
  useEffect(() => {
    if (!isMenuOpen) return;
    const raf = requestAnimationFrame(() => setIsMenuVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (menuCloseTimeoutRef.current)
        clearTimeout(menuCloseTimeoutRef.current);
    };
  }, []);

  // Lock background scroll for the whole time the menu is mounted (open +
  // closing animation), so the page behind can't scroll under the overlay.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuVisible(false);
    if (menuCloseTimeoutRef.current) clearTimeout(menuCloseTimeoutRef.current);
    menuCloseTimeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, MENU_TRANSITION_DURATION);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
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
    <>
      <header
        className={`fixed z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-in-out motion-reduce:animate-none ${
          playEnterAnimation ? "animate-navbar-in" : ""
        } ${
          isScrolled
            ? "inset-x-0 top-0 bg-surface-black/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150"
            : "inset-x-2 top-2 bg-transparent sm:inset-x-3 sm:top-3 lg:inset-x-4 lg:top-4"
        }`}
      >
        <div className="flex w-full items-center justify-between py-4 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
          {/* Mobile (all scroll positions): logo left / hamburger right */}
          <div className="flex w-full items-center justify-between gap-2 lg:hidden">
            <Logo imageClassName="h-8 w-8 sm:h-10 sm:w-10" stacked />
            <IconButton label="Open menu" onClick={openMenu}>
              <MenuIcon className="h-4 w-4" />
            </IconButton>
          </div>

          {/* Desktop: both states are always mounted and cross-fade via opacity,
              so the shell (position/background) and content transition together
              instead of the content hard-swapping mid-animation. */}
          <div className="relative hidden w-full min-h-[48px] lg:block">
            {/* At top of page: logo left / hamburger right */}
            <div
              inert={isScrolled}
              className={`absolute inset-0 flex w-full items-center justify-between transition-opacity duration-500 ease-in-out ${
                isScrolled ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <Logo imageClassName="h-14 w-14" stacked />
              <IconButton label="Open menu" onClick={openMenu}>
                <MenuIcon className="h-4 w-4" />
              </IconButton>
            </div>

            {/* Scrolled: logo / full nav links / social + Contact CTA */}
            <div
              inert={!isScrolled}
              className={`absolute inset-0 flex w-full items-center justify-between transition-opacity duration-500 ease-in-out ${
                isScrolled ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Logo imageClassName="h-14 w-14" stacked />
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
          </div>
        </div>
      </header>

      {/* Rendered as a header sibling, not a child — position: fixed on a
          descendant of an element with a transform/backdrop-filter (both of
          which the header has) is contained by that ancestor instead of the
          viewport, so nesting this here would shrink/misplace the overlay
          as the header animates or toggles its scrolled backdrop-blur. */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
              isMenuVisible ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            ref={menuPanelRef}
            id="primary-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-hidden border-l border-white/10 bg-surface-black shadow-[-32px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMenuVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Decorative brand glows — purely atmospheric, no content sits past the edge */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-orange/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#1276BC]/25 blur-[100px]" />

            <div className="relative flex h-full flex-col overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex items-center justify-between">
                <Logo imageClassName="h-10 w-10" stacked />
                <IconButton label="Close menu" onClick={closeMenu}>
                  <CloseIcon className="h-4 w-4" />
                </IconButton>
              </div>

              <nav aria-label="Main" className="mt-10">
                <ul className="flex flex-col">
                  {navbarContent.links.map((link, index) => (
                    <li
                      key={link.href}
                      className={`border-b border-white/10 transition-all duration-500 ease-out last:border-0 ${
                        isMenuVisible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-6 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isMenuVisible
                          ? `${120 + index * 70}ms`
                          : "0ms",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between py-4"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="text-xs font-medium tabular-nums text-brand-orange/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-2xl font-medium text-white transition-colors group-hover:text-brand-orange">
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRightIcon className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-orange" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-8 pt-10">
                <CtaButton
                  href={navbarContent.ctaHref}
                  className="w-full justify-center"
                >
                  {navbarContent.ctaLabel}
                </CtaButton>
                <SocialLinks
                  links={navbarContent.social}
                  className="justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
