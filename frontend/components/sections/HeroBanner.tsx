import { HeroSlideContent } from "./HeroSlideContent";
import { TrustBar } from "./TrustBar";
import type { TrustLogo } from "../../content/home";

interface HeroBannerProps {
  heading: React.ReactNode;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  trustBar?: TrustLogo[];
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
      className={`relative mx-2 mt-2 min-h-[calc(100vh-0.5rem)] overflow-hidden rounded-xl sm:mx-3 sm:mt-3 sm:min-h-[calc(100vh-0.75rem)] lg:mx-4 lg:mt-4 lg:min-h-[calc(100vh-1rem)] ${className ?? ""}`}
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

      {trustBar && (
        <TrustBar
          badges={trustBar}
          className="absolute inset-x-0 bottom-0 z-10"
        />
      )}
    </section>
  );
}
