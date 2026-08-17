"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../ui/icons";
import type { HomeContent } from "../../content/home";

interface PortfolioCarouselProps {
  content: HomeContent["portfolio"];
}

const VISIBLE_COUNT = 3;
const AUTO_SLIDE_INTERVAL_MS = 5000;
const SLIDE_DURATION_MS = 700;

export function PortfolioCarousel({ content }: PortfolioCarouselProps) {
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
              aria-label="Previous portfolio item"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-orange text-brand-orange transition hover:bg-brand-orange/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next portfolio item"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing portfolio items {activeIndex + 1} to{" "}
        {Math.min(activeIndex + VISIBLE_COUNT, total)} of {total}
      </p>

      <div ref={trackRef} className="mt-10 flex gap-6 overflow-hidden">
        {trackItems.map((item, index) => {
          const trueIndex = index % total;
          return (
            <div
              key={`${item.title}-${index}`}
              className="basis-full shrink-0 sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <PortfolioCard
                item={item}
                isActive={trueIndex === activeIndex}
                number={String(trueIndex + 1).padStart(2, "0")}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// The active card's gradient is pixel-sampled from the Figma screenshot —
// not a brand token, so it's applied inline rather than added to
// tailwind.config.ts for a single one-off use.
const ACTIVE_CARD_GRADIENT =
  "linear-gradient(180deg, #1276BC 0%, #083656 100%)";

function PortfolioCard({
  item,
  isActive,
  number,
}: {
  item: HomeContent["portfolio"]["items"][number];
  isActive: boolean;
  number: string;
}) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-3xl p-3 pb-6 transition-[transform,box-shadow,border-color] duration-300 ${
        isActive
          ? "border-2 border-blue-300 shadow-[0_30px_60px_-25px_rgba(8,54,86,0.5)]"
          : "border border-gray-100 bg-white shadow-[0_15px_35px_-25px_rgba(8,20,35,0.25)] hover:-translate-y-1 hover:shadow-[0_25px_45px_-25px_rgba(8,20,35,0.35)]"
      }`}
      style={isActive ? { background: ACTIVE_CARD_GRADIENT } : undefined}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold tabular-nums backdrop-blur-md ${
            isActive
              ? "bg-white/15 text-white ring-1 ring-white/30"
              : "bg-white/90 text-gray-700 ring-1 ring-black/5"
          }`}
        >
          {number}
        </span>
        <Link
          href={item.href}
          aria-label={`View ${item.title} details`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white shadow-md ring-2 ring-white/40 backdrop-blur-md transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center px-4 pt-6 text-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            isActive ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-500"
          }`}
        >
          {item.eyebrow}
        </span>
        <p
          className={`mt-3 text-xl font-bold leading-snug ${
            isActive ? "text-white" : "text-gray-900"
          }`}
        >
          {item.title}
          <span className="text-brand-orange">.</span>
        </p>

        <Link
          href={item.href}
          className={`group/link mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition ${
            isActive
              ? "text-white/80 hover:text-white"
              : "text-gray-900 hover:text-brand-orange"
          }`}
        >
          View Details
          <ArrowUpRightIcon className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
