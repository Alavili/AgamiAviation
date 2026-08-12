import { HeroBanner } from "../components/sections/HeroBanner";
import { homeContent } from "../content/home";

// "Hire. Purchase. Service." renders as words joined by orange dots, matching
// the Figma hero. Only the Home hero's first slide needs this treatment.
function DotSeparatedLine({ text }: { text: string }) {
  const words = text.split(". ").map((word) => word.replace(/\.$/, ""));
  return (
    <>
      {words.map((word, index) => (
        <span key={word}>
          {word}
          {index < words.length - 1 && (
            <span className="text-brand-orange">. </span>
          )}
        </span>
      ))}
      <span className="text-brand-orange">.</span>
    </>
  );
}

export default function HomePage() {
  const [slide] = homeContent.heroSlides;

  return (
    <HeroBanner
      heading={
        <>
          {slide.headingLines[0]}
          <br />
          <DotSeparatedLine text={slide.headingLines[1]} />
        </>
      }
      subhead={slide.subhead}
      ctaLabel={slide.ctaLabel}
      ctaHref={slide.ctaHref}
      backgroundImage={slide.backgroundImage}
      backgroundImageAlt={slide.backgroundImageAlt}
      trustBar={homeContent.heroTrustBar}
    />
  );
}
