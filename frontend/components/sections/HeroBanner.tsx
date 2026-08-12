import { HeroSlideContent } from "./HeroSlideContent";

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
      className={`relative min-h-screen overflow-hidden ${className ?? ""}`}
    >
      <HeroSlideContent
        heading={heading}
        subhead={subhead}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        backgroundImage={backgroundImage}
        backgroundImageAlt={backgroundImageAlt}
        priority
      />

      {trustBar && trustBar.length > 0 && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-8 bg-[#1274B9]/90 px-6 py-5">
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
