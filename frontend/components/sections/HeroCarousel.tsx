"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HeroSlideContent } from "./HeroSlideContent";
import { TrustBar } from "./TrustBar";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icons";
import type { TrustLogo } from "../../content/home";

export interface HeroCarouselSlide {
  heading: React.ReactNode;
  headingText: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
}

interface HeroCarouselProps {
  slides: HeroCarouselSlide[];
  trustBar?: TrustLogo[];
  autoPlayIntervalMs?: number;
  className?: string;
}

// Minimal by design — a small hint of a control, not a prominent button.
const ARROW_BUTTON_CLASSNAME =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

export function HeroCarousel({
  slides,
  trustBar,
  autoPlayIntervalMs = 7000,
  className,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(((nextIndex % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, autoPlayIntervalMs);

    return () => clearInterval(timer);
  }, [isPaused, slides.length, autoPlayIntervalMs]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0]?.clientX - touchStartX.current;
    const SWIPE_THRESHOLD = 40;
    if (deltaX > SWIPE_THRESHOLD) prev();
    else if (deltaX < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  };

  return (
    <section
      className={`relative mx-2 mt-2 min-h-[calc(100vh-0.5rem)] overflow-hidden rounded-xl sm:mx-3 sm:mt-3 sm:min-h-[calc(100vh-0.75rem)] lg:mx-4 lg:mt-4 lg:min-h-[calc(100vh-1rem)] ${className ?? ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Home hero"
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.headingText}
          className={`absolute inset-0 transition-opacity duration-700 ${
            slideIndex === index
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={slideIndex !== index}
        >
          <HeroSlideContent
            heading={slide.heading}
            subhead={slide.subhead}
            ctaLabel={slide.ctaLabel}
            ctaHref={slide.ctaHref}
            backgroundImage={slide.backgroundImage}
            backgroundImageAlt={slide.backgroundImageAlt}
            priority={slideIndex === 0}
          />
        </div>
      ))}

      <p aria-live="polite" className="sr-only">
        Slide {index + 1} of {slides.length}: {slides[index]?.headingText}
      </p>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-6 ${ARROW_BUTTON_CLASSNAME}`}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-6 ${ARROW_BUTTON_CLASSNAME}`}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          <div
            className={`absolute inset-x-0 z-20 flex items-center justify-center gap-1.5 ${
              trustBar && trustBar.length > 0 ? "bottom-24" : "bottom-8"
            }`}
          >
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.headingText}
                type="button"
                onClick={() => goTo(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                className={`h-2.5 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                  slideIndex === index
                    ? "w-6 bg-white"
                    : "w-2.5 border border-white/80 bg-transparent hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {trustBar && (
        <TrustBar
          badges={trustBar}
          className="absolute inset-x-0 bottom-0 z-10"
        />
      )}
    </section>
  );
}
