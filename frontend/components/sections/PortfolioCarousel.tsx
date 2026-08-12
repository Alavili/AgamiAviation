"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icons";
import type { HomeContent } from "../../content/home";

interface PortfolioCarouselProps {
  content: HomeContent["portfolio"];
}

const VISIBLE_COUNT = 3;

// The "VIEW DETAILS" pill sits in a white notch that pokes out of the card's
// bottom edge — since the page background is white, a plain white rounded
// panel behind the button reads as a cut corner without any clip-path.
export function PortfolioCarousel({ content }: PortfolioCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const total = content.items.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      setStartIndex(((nextIndex % total) + total) % total);
    },
    [total],
  );

  const next = () => goTo(startIndex + 1);
  const prev = () => goTo(startIndex - 1);

  const visibleItems = Array.from(
    { length: Math.min(VISIBLE_COUNT, total) },
    (_, offset) => content.items[(startIndex + offset) % total],
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <SectionHeading>{content.heading}</SectionHeading>
          <p className="mt-4 max-w-xl text-gray-600">{content.subhead}</p>
        </div>

        {total > VISIBLE_COUNT && (
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
        Showing portfolio items {startIndex + 1} to{" "}
        {Math.min(startIndex + VISIBLE_COUNT, total)} of {total}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, position) => (
          <PortfolioCard
            key={`${item.title}-${startIndex}-${position}`}
            item={item}
            isActive={position === 0}
          />
        ))}
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  isActive,
}: {
  item: HomeContent["portfolio"]["items"][number];
  isActive: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-3xl p-3 pb-9 transition-colors ${
        isActive ? "border-2 border-blue-300 bg-surface-dark" : "bg-blue-50"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex flex-1 flex-col items-center px-4 pt-6 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${
            isActive ? "text-white/60" : "text-gray-500"
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
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white p-2.5 shadow-md"
        >
          <span className="block rounded-full bg-brand-orange px-6 py-3 text-xs font-semibold tracking-wide text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange">
            VIEW DETAILS
          </span>
        </Link>
      </div>
    </div>
  );
}
