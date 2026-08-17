"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "../ui/icons";
import type { HomeContent } from "../../content/home";

interface TestimonialCarouselProps {
  content: HomeContent["testimonials"];
}

const VISIBLE_COUNT = 3;
const AUTO_SLIDE_INTERVAL_MS = 5000;
const SLIDE_DURATION_MS = 700;

export function TestimonialCarousel({ content }: TestimonialCarouselProps) {
  const total = content.items.length;
  const canLoop = total > VISIBLE_COUNT;
  const cloneCount = canLoop ? Math.min(VISIBLE_COUNT, total) : 0;
  const trackItems = canLoop
    ? [...content.items, ...content.items.slice(0, cloneCount)]
    : content.items;

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeIndex = trackIndex % total;

  // A fixed-duration eased scroll (rather than the browser's variable-length
  // native smooth scroll) keeps the glide snappy and predictable, so the
  // sliding-in-progress peek of the next/previous card is brief.
  const scrollToIndex = useCallback((index: number, smooth: boolean) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;

    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    // offsetLeft is relative to the nearest positioned ancestor, which may
    // not be the track itself — measure via getBoundingClientRect instead
    // so the target lines up with the track's own scroll coordinates.
    const targetLeft =
      track.scrollLeft +
      (card.getBoundingClientRect().left - track.getBoundingClientRect().left);
    if (!smooth) {
      track.scrollLeft = targetLeft;
      return;
    }

    const startLeft = track.scrollLeft;
    const delta = targetLeft - startLeft;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - startTime) / SLIDE_DURATION_MS, 1);
      const eased = 1 - (1 - t) ** 3;
      track.scrollLeft = startLeft + delta * eased;
      scrollAnimationRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    scrollAnimationRef.current = requestAnimationFrame(step);
  }, []);

  // Scrolls to the current index; once it lands on the appended clone set
  // (visually identical to the real start), it snaps back to index 0 with
  // no animation so the loop reads as continuous instead of resetting.
  useEffect(() => {
    scrollToIndex(trackIndex, true);
    if (!canLoop || trackIndex !== total) return;

    const timeout = setTimeout(() => {
      scrollToIndex(0, false);
      setTrackIndex(0);
    }, SLIDE_DURATION_MS + 50);
    return () => clearTimeout(timeout);
  }, [trackIndex, total, canLoop, scrollToIndex]);

  useEffect(() => {
    if (!canLoop || isPaused) return;
    const id = setInterval(() => {
      setTrackIndex((current) => current + 1);
    }, AUTO_SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [canLoop, isPaused]);

  const next = () => setTrackIndex((current) => current + 1);
  const prev = () => {
    setTrackIndex((current) => {
      if (current === 0) {
        const wrapTo = total - 1;
        scrollToIndex(wrapTo, false);
        return wrapTo;
      }
      return current - 1;
    });
  };

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <SectionHeading>{content.heading}</SectionHeading>
          <p className="mt-4 max-w-xl text-gray-600">{content.subhead}</p>
        </div>

        {canLoop && (
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-orange text-brand-orange transition hover:bg-brand-orange/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing testimonials {activeIndex + 1} to{" "}
        {Math.min(activeIndex + VISIBLE_COUNT, total)} of {total}
      </p>

      <div ref={trackRef} className="mt-10 flex gap-6 overflow-hidden">
        {trackItems.map((item, index) => {
          const trueIndex = index % total;
          return (
            <div
              key={`${item.author}-${index}`}
              className="basis-full shrink-0 sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <TestimonialCard
                item={item}
                isFeatured={trueIndex === activeIndex}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// A soft pastel wash (not a saturated fill) — keeps the featured card
// readable with dark text, distinguished from the plain white cards by
// warmth and a colored border rather than by inverting to white-on-dark.
const FEATURED_CARD_GRADIENT =
  "linear-gradient(135deg, #FFE7C7 0%, #FFF8F0 100%)";

function TestimonialCard({
  item,
  isFeatured,
}: {
  item: HomeContent["testimonials"]["items"][number];
  isFeatured: boolean;
}) {
  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "border border-orange-100 shadow-[0_20px_45px_-30px_rgba(250,145,28,0.55)] hover:shadow-[0_25px_50px_-30px_rgba(250,145,28,0.65)]"
          : "border border-gray-100 bg-white shadow-[0_15px_35px_-25px_rgba(8,20,35,0.25)] hover:shadow-[0_25px_45px_-25px_rgba(8,20,35,0.35)]"
      }`}
      style={isFeatured ? { background: FEATURED_CARD_GRADIENT } : undefined}
    >
      {/* Oversized watermark quote mark, cropped by the card's own edge —
          purely decorative texture behind the copy, not a UI element. */}
      <QuoteIcon
        aria-hidden
        className={`pointer-events-none absolute -right-2 -top-2 h-24 w-24 ${
          isFeatured ? "text-orange-200/50" : "text-gray-50"
        }`}
      />

      <div className="relative flex items-center">
        <span className="h-1.5 w-10 shrink-0 rounded-full bg-brand-orange" />
      </div>

      <p className="relative mt-5 text-lg font-medium leading-relaxed text-gray-800">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div
        className={`relative mt-auto flex items-center gap-3 border-t pt-6 ${
          isFeatured ? "border-orange-200/60" : "border-gray-100"
        }`}
      >
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
          <Image
            src={item.avatar}
            alt={item.avatarAlt}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-gray-900">{item.author}</p>
          <p className="truncate text-sm text-gray-500">{item.role}</p>
        </div>
      </div>
    </div>
  );
}
