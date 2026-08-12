"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "../ui/icons";
import type { HomeContent } from "../../content/home";

interface TestimonialCarouselProps {
  content: HomeContent["testimonials"];
}

const VISIBLE_COUNT = 3;

export function TestimonialCarousel({ content }: TestimonialCarouselProps) {
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
        Showing testimonials {startIndex + 1} to{" "}
        {Math.min(startIndex + VISIBLE_COUNT, total)} of {total}
      </p>

      <div className="mt-10 grid gap-8 divide-y divide-dashed divide-gray-300 sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
        {visibleItems.map((item, position) => (
          <TestimonialCard
            key={`${item.author}-${startIndex}-${position}`}
            item={item}
            className={position === 0 ? "" : "pt-8 sm:pt-0 sm:pl-8"}
          />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  item,
  className,
}: {
  item: HomeContent["testimonials"]["items"][number];
  className: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-start justify-between">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
          <Image
            src={item.avatar}
            alt={item.avatarAlt}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <QuoteIcon className="h-9 w-9 text-blue-100" />
      </div>

      <p className="mt-4 font-bold text-gray-900">{item.author}</p>
      <p className="text-sm text-gray-500">{item.role}</p>

      <p className="mt-4 leading-relaxed text-gray-600">
        &ldquo;{item.quote}&rdquo;
      </p>
    </div>
  );
}
