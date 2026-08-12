"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowUpRightIcon } from "../ui/icons";
import type { HomeContent } from "../../content/home";

interface SolutionShowcaseProps {
  content: HomeContent["solutionShowcase"];
}

// The badge's center sits exactly on the card's top-right corner point, so
// most of it naturally floats outside the card's rectangle (no masking
// needed there — there's no card content past the edge to begin with). Only
// the bottom-left quadrant, where the badge dips into the card, needs a
// notch — radius just a hair past the badge's own so the card edge grazes
// it closely instead of leaving a ring gap all the way around.
const BADGE_NOTCH_MASK =
  "radial-gradient(circle 32px at 100% 0%, transparent 99%, black 100%)";

// Horizontal image-accordion: one card is "active" (wide, title + description
// visible) at a time, the rest collapse to a narrow strip with a vertical
// title. Desktop expands on hover; touch devices (no hover) expand on tap —
// tapping a collapsed card only expands it, tapping the already-active card
// follows the link, so the first tap never accidentally navigates away.
export function SolutionShowcase({ content }: SolutionShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
      <SectionHeading>{content.heading}</SectionHeading>
      <p className="mt-4 max-w-xl text-gray-600">{content.subhead}</p>

      <div className="mt-10 flex h-[420px] gap-3 sm:h-[480px] sm:gap-4 lg:h-[560px]">
        {content.items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Link
              key={`${item.title}-${index}`}
              href={item.href}
              aria-expanded={isActive}
              aria-label={isActive ? item.title : `Expand: ${item.title}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={(event) => {
                if (!isActive) {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              style={{ flexGrow: isActive ? 3 : 1 }}
              className={`relative flex shrink basis-0 transition-[flex-grow] duration-500 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                isActive ? "min-w-0" : "min-w-[52px] sm:min-w-[72px] lg:min-w-[96px]"
              }`}
            >
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  WebkitMaskImage: BADGE_NOTCH_MASK,
                  maskImage: BADGE_NOTCH_MASK,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                      : "bg-black/55"
                  }`}
                />
              </div>

              <span className="absolute -right-4 -top-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white sm:-right-5 sm:-top-5 sm:h-10 sm:w-10">
                {isActive ? (
                  <ArrowUpRightIcon className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </span>

              {isActive ? (
                <p className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <span className="block text-lg font-bold sm:text-xl">
                    {item.title}
                    <span className="text-brand-orange">.</span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-white/80">
                    {item.description}
                  </span>
                </p>
              ) : (
                <span className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-sm font-semibold text-white sm:text-base">
                  {item.title}
                  <span className="text-brand-orange">.</span>
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
