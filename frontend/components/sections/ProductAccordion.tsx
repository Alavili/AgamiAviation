"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowUpRightIcon, MinusIcon, PlusIcon } from "../ui/icons";
import type { Product, ProductsIntroContent } from "../../content/products";

interface ProductAccordionProps {
  intro: ProductsIntroContent;
  products: Product[];
}

// Numbered accordion, one row active at a time — number/title, image +
// description (or the one-line summary when collapsed), and the +/- icon
// all sit in a single row per the Figma spec (not a panel stacked below a
// header). Desktop expands on hover over the row; the number+title button
// also responds to click/focus so touch and keyboard users get the same
// behavior. Row 1 is open by default.
export function ProductAccordion({ intro, products }: ProductAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 sm:py-24 lg:px-12">
      <SectionHeading>{intro.heading}</SectionHeading>
      <p className="mx-auto mt-4 max-w-xl text-gray-600">{intro.subhead}</p>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col rounded-[36px] border border-gray-100 bg-white/60 p-2 shadow-[0_40px_80px_-50px_rgba(8,20,35,0.3)] sm:p-3 text-left">
        {products.map((product, index) => {
          const isActive = index === activeIndex;
          // The row right after the active one would otherwise draw its top
          // divider directly under the active card's lifted, rounded edge —
          // suppress just that one border instead of the whole divider set.
          const isAfterActive = index === activeIndex + 1;
          const number = String(index + 1).padStart(2, "0");
          const [firstWord, ...restWords] = product.summary.split(" ");

          return (
            <div
              key={product.slug}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative border-t px-6 py-6 transition-[background-color,box-shadow,border-color,transform] duration-500 first:border-t-0 sm:px-10 sm:py-8 lg:px-14 ${
                isActive
                  ? "z-10 -translate-y-0.5 rounded-[28px] border-transparent bg-gradient-to-br from-orange-50/70 via-white to-white shadow-[0_25px_50px_-30px_rgba(8,20,35,0.35)]"
                  : isAfterActive
                    ? "border-transparent"
                    : "border-gray-200/70"
              }`}
            >
              {/* Left accent bar — the active row's only "selected tab" cue
                  besides the card lift, grows in from the row's vertical
                  center rather than just appearing at full height. */}
              <span
                aria-hidden
                className={`absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-full bg-brand-orange transition-all duration-500 ease-out ${
                  isActive ? "h-8 opacity-100" : "h-0 opacity-0"
                }`}
              />

              <div className="flex items-center justify-between gap-6 sm:gap-8 lg:gap-10">
                <span
                  className={`shrink-0 font-mono text-xl font-light tabular-nums transition-all duration-300 sm:text-2xl ${
                    isActive ? "text-brand-orange" : "text-gray-300"
                  }`}
                >
                  {number}
                </span>

                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`w-28 shrink-0 text-left text-sm font-bold uppercase leading-tight tracking-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:w-40 sm:text-base lg:w-52 lg:text-lg ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {product.name}
                </button>

                <div className="min-w-0">
                  {/* Collapsed summary — smoothly collapses to 0 height when active */}
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${
                      isActive ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
                    }`}
                  >
                    <p className="hidden min-h-0 max-w-md overflow-hidden text-base text-gray-500 sm:block sm:text-lg">
                      <span className="font-semibold text-gray-800">
                        {firstWord}
                      </span>{" "}
                      {restWords.join(" ")}
                    </p>
                  </div>

                  {/* Image + description — smoothly expands from 0 when active */}
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div
                      className={`flex min-h-0 flex-col items-start gap-4 overflow-hidden transition-opacity duration-500 ease-in-out sm:min-w-[540px] sm:flex-row sm:items-start sm:gap-6 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-[0_20px_40px_-20px_rgba(8,20,35,0.4)] ring-1 ring-black/5 sm:max-w-[260px]">
                        <Image
                          src={product.heroImage}
                          alt={product.heroImageAlt}
                          fill
                          sizes="260px"
                          className={`object-cover transition-transform duration-[1400ms] ease-out ${
                            isActive ? "scale-110" : "scale-100"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                        <Link
                          href={`/products/${product.slug}`}
                          aria-label={`View ${product.name} details`}
                          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white shadow-md ring-2 ring-white/40 backdrop-blur-md transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                      <div className="flex max-w-sm flex-col items-start gap-4">
                        <p className="text-sm leading-relaxed text-gray-600">
                          {product.description}
                        </p>
                        <Link
                          href={`/products/${product.slug}`}
                          className="group/link inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 transition hover:text-brand-orange"
                        >
                          View Details
                          <ArrowUpRightIcon className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    isActive
                      ? "border-brand-orange text-brand-orange"
                      : "border-gray-200 text-gray-400"
                  }`}
                >
                  {isActive ? (
                    <MinusIcon className="h-4 w-4" />
                  ) : (
                    <PlusIcon className="h-4 w-4" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
