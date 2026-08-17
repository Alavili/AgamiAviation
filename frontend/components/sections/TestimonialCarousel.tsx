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

      <div ref={trackRef} className="mt-10 flex overflow-hidden">
        {trackItems.map((item, index) => (
          <div
            key={`${item.author}-${index}`}
            className="relative basis-full shrink-0 pl-6 pr-8 first:pl-0 sm:basis-[calc(100%/2)] lg:basis-[calc(100%/3)]"
          >
            {index !== 0 && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-px"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #C4CBD4 0, #C4CBD4 14px, transparent 14px, transparent 24px)",
                }}
              />
            )}
            <TestimonialCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
}: {
  item: HomeContent["testimonials"]["items"][number];
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={item.avatar}
            alt={item.avatarAlt}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <QuoteIcon
          aria-hidden
          className="ml-auto h-12 w-12 shrink-0 text-brand-orange"
        />
      </div>

      <p className="mt-5 font-bold text-gray-900">{item.author}</p>
      <p className="text-sm text-gray-500">{item.role}</p>

      <p className="mt-5 leading-relaxed text-gray-600">
        &ldquo;{item.quote}&rdquo;
      </p>
    </div>
  );
}
