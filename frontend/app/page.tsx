import {
  HeroCarousel,
  type HeroCarouselSlide,
} from "../components/sections/HeroCarousel";
import { AboutTeaser } from "../components/sections/AboutTeaser";
import { SolutionShowcase } from "../components/sections/SolutionShowcase";
import { ProductAccordion } from "../components/sections/ProductAccordion";
import { PortfolioCarousel } from "../components/sections/PortfolioCarousel";
import { TestimonialCarousel } from "../components/sections/TestimonialCarousel";
import { homeContent } from "../content/home";
import { products, productsIntro } from "../content/products";

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
  const slides: HeroCarouselSlide[] = homeContent.heroSlides.map(
    (slide, index) => ({
      headingText: `${slide.headingLines[0]} ${slide.headingLines[1]}`,
      heading: (
        <>
          {slide.headingLines[0]}
          <br />
          {index === 0 ? (
            <DotSeparatedLine text={slide.headingLines[1]} />
          ) : (
            slide.headingLines[1]
          )}
        </>
      ),
      subhead: slide.subhead,
      ctaLabel: slide.ctaLabel,
      ctaHref: slide.ctaHref,
      backgroundImage: slide.backgroundImage,
      backgroundImageAlt: slide.backgroundImageAlt,
    }),
  );

  return (
    <>
      <HeroCarousel slides={slides} trustBar={homeContent.heroTrustBar} />
      <AboutTeaser
        content={homeContent.aboutTeaser}
        locations={homeContent.locations}
      />
      <SolutionShowcase content={homeContent.solutionShowcase} />
      <ProductAccordion intro={productsIntro} products={products} />
      <PortfolioCarousel content={homeContent.portfolio} />
      <TestimonialCarousel content={homeContent.testimonials} />
    </>
  );
}
