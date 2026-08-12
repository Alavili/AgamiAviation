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

      <div className="mx-auto mt-10 flex max-w-7xl flex-col text-left">
        {products.map((product, index) => {
          const isActive = index === activeIndex;
          const number = String(index + 1).padStart(2, "0");
          const [firstWord, ...restWords] = product.summary.split(" ");

          return (
            <div
              key={product.slug}
              onMouseEnter={() => setActiveIndex(index)}
              className="rounded-t-[32px] border-t-2 border-gray-200 px-6 py-6 sm:px-10 sm:py-8 lg:px-14"
            >
              <div className="flex items-start justify-between gap-6 sm:gap-8 lg:gap-10">
                <span className="shrink-0 text-xs font-medium text-gray-400">
                  {number}
                </span>

                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="w-24 shrink-0 text-left text-sm font-bold uppercase leading-tight tracking-tight text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:w-36 sm:text-base lg:w-44 lg:text-lg"
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
                    <div className="flex min-h-0 flex-col items-start gap-4 overflow-hidden sm:min-w-[540px] sm:flex-row sm:items-start sm:gap-6">
                      <div className="relative aspect-[4/3] w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:max-w-[260px]">
                        <Image
                          src={product.heroImage}
                          alt={product.heroImageAlt}
                          fill
                          sizes="260px"
                          className="object-cover"
                        />
                        <Link
                          href={`/products/${product.slug}`}
                          aria-label={`View ${product.name} details`}
                          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white transition hover:bg-brand-orange-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                      <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>

                <span className="shrink-0 text-gray-500">
                  {isActive ? (
                    <MinusIcon className="h-5 w-5" />
                  ) : (
                    <PlusIcon className="h-5 w-5" />
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
