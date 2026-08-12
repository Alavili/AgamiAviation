import Image from "next/image";
import { CtaButton } from "../ui/Button";

export interface HeroSlideContentProps {
  heading: React.ReactNode;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  priority?: boolean;
}

// Shared by HeroBanner (single slide) and HeroCarousel (multiple, stacked)
// so the background image + overlay + heading/subhead/CTA markup stays in
// one place. Assumes its parent is a `relative`, full-height container.
export function HeroSlideContent({
  heading,
  subhead,
  ctaLabel,
  ctaHref,
  backgroundImage,
  backgroundImageAlt,
  priority,
}: HeroSlideContentProps) {
  return (
    <>
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {/* Flat black layer + gradient, so heading/subhead stay legible over any photo */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-14 pb-28 pt-24 text-center text-white sm:px-16">
        <h1 className="max-w-4xl text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        {subhead && (
          <p className="mt-6 max-w-xl text-sm text-white/80 sm:text-base">
            {subhead}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <CtaButton href={ctaHref} className="mt-8">
            {ctaLabel}
          </CtaButton>
        )}
      </div>
    </>
  );
}
