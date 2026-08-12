export interface HeroSlide {
  heading: string; // PENDING_CLIENT_CONTENT
  subhead: string; // PENDING_CLIENT_CONTENT
  ctaLabel: string; // PENDING_CLIENT_CONTENT
  ctaHref: string;
  backgroundImage: string; // PENDING_CLIENT_CONTENT
}

export interface HomeContent {
  heroSlides: HeroSlide[];
  aboutTeaser: {
    heading: string; // PENDING_CLIENT_CONTENT
    body: string; // PENDING_CLIENT_CONTENT
    videoUrl: string; // PENDING_CLIENT_CONTENT
  };
  pullQuote: {
    quote: string; // PENDING_CLIENT_CONTENT
    attribution: string; // PENDING_CLIENT_CONTENT
  };
  testimonials: Array<{
    quote: string; // PENDING_CLIENT_CONTENT
    author: string; // PENDING_CLIENT_CONTENT
    role: string; // PENDING_CLIENT_CONTENT
  }>;
}

// Placeholder copy sourced from the brochure per PROJECT_PLAN.md — swap in real
// client copy by editing this file only; layout/components stay untouched.
export const homeContent: HomeContent = {
  heroSlides: [
    {
      heading: "One-Stop GSE. Hire. Purchase. Service.", // PENDING_CLIENT_CONTENT
      subhead: "", // PENDING_CLIENT_CONTENT
      ctaLabel: "Explore Products", // PENDING_CLIENT_CONTENT
      ctaHref: "/solutions",
      backgroundImage: "", // PENDING_CLIENT_CONTENT
    },
  ],
  aboutTeaser: {
    heading: "", // PENDING_CLIENT_CONTENT
    body: "", // PENDING_CLIENT_CONTENT
    videoUrl: "", // PENDING_CLIENT_CONTENT
  },
  pullQuote: {
    quote: "", // PENDING_CLIENT_CONTENT
    attribution: "", // PENDING_CLIENT_CONTENT
  },
  testimonials: [],
};
