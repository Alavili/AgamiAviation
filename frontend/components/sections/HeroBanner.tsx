import { HeroSlideContent } from "./HeroSlideContent";
import { TrustBar } from "./TrustBar";
import type { TrustBadge } from "../../content/home";

interface HeroBannerProps {
  heading: React.ReactNode;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  trustBar?: TrustBadge[];
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

      {trustBar && (
        <TrustBar
          badges={trustBar}
          className="absolute inset-x-0 bottom-0 z-10"
        />
      )}
    </section>
  );
}
