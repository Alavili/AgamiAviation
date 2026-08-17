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

      <div className="mt-10 flex h-[420px] gap-4 sm:h-[480px] sm:gap-6 lg:h-[560px] lg:gap-8">
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
              style={{ flexGrow: isActive ? 2 : 1 }}
              className={`group relative flex shrink basis-0 overflow-hidden rounded-[28px] transition-[flex-grow,box-shadow] duration-500 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                isActive
                  ? "min-w-0 shadow-[0_30px_60px_-20px_rgba(8,54,86,0.6)] ring-1 ring-white/10"
                  : "min-w-[56px] shadow-[0_12px_30px_-18px_rgba(8,20,35,0.5)] ring-1 ring-black/5 sm:min-w-[110px] lg:min-w-[140px]"
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/75 via-black/5 to-transparent"
                      : "bg-gradient-to-b from-black/45 via-black/30 to-black/65"
                  }`}
                />
              </div>

              <span
                className={`absolute right-4 top-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold backdrop-blur-md transition-all duration-300 sm:right-5 sm:top-5 sm:h-10 sm:w-10 ${
                  isActive
                    ? "bg-brand-orange text-white ring-2 ring-brand-orange/30"
                    : "bg-white/10 text-white/90 ring-1 ring-white/30 group-hover:ring-white/60"
                }`}
              >
                {isActive ? (
                  <ArrowUpRightIcon className="h-4 w-4" />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>

              {isActive ? (
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-6">
                  <span className="block h-px w-10 bg-brand-orange" />
                  <span className="mt-4 block text-lg font-bold leading-snug sm:text-2xl">
                    {item.title}
                    <span className="text-brand-orange">.</span>
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-white/75">
                    {item.description}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 transition group-hover:text-brand-orange">
                    Explore
                    <ArrowUpRightIcon className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              ) : (
                <span className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 group-hover:text-white sm:text-sm">
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
