"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HeroSlideContent } from "./HeroSlideContent";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icons";

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
  trustBar?: string[];
  autoPlayIntervalMs?: number;
  className?: string;
}

const ARROW_BUTTON_CLASSNAME =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-brand-orange hover:bg-white/20 hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

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
      className={`relative min-h-screen overflow-hidden ${className ?? ""}`}
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
            className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-8 ${ARROW_BUTTON_CLASSNAME}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-8 ${ARROW_BUTTON_CLASSNAME}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div
            className={`absolute inset-x-0 z-20 flex items-center justify-center gap-3 ${
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
                className={`h-2.5 w-2.5 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                  slideIndex === index
                    ? "bg-brand-orange"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {trustBar && trustBar.length > 0 && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-8 bg-[#1274B9]/90 px-6 py-5">
          {trustBar.map((name) => (
            <span
              key={name}
              className="text-sm font-medium uppercase tracking-wide text-white/90"
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
