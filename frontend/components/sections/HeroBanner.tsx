import Image from "next/image";
import { CtaButton } from "../ui/Button";

interface HeroBannerProps {
  heading: React.ReactNode;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  trustBar?: string[];
  className?: string;
}

export function HeroBanner({
  heading,
  subhead,
  ctaLabel,
  ctaHref,
  backgroundImage,
  backgroundImageAlt,
  trustBar,
  className,
}: HeroBannerProps) {
  return (
    <section
      className={`relative flex min-h-screen flex-col overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 text-center text-white">
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

      {trustBar && trustBar.length > 0 && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 bg-[#1274B9]/90 px-6 py-5">
          {trustBar.map((name) => (
            <span
              key={name}
              className="text-sm font-medium uppercase tracking-wide text-white/90"
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
