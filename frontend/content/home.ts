export interface HeroSlide {
  headingLines: string[]; // PENDING_CLIENT_CONTENT
  subhead: string; // PENDING_CLIENT_CONTENT
  ctaLabel: string; // PENDING_CLIENT_CONTENT
  ctaHref: string;
  backgroundImage: string; // PENDING_CLIENT_CONTENT — sourced from Unsplash for now, swap for real photography
  backgroundImageAlt: string; // PENDING_CLIENT_CONTENT
}

export interface HomeContent {
  heroSlides: HeroSlide[];
  // Placeholder trust-bar strip under the hero — structural only, no real
  // partner/client names or logos yet. See PROJECT_PLAN.md discussion.
  heroTrustBar: string[]; // PENDING_CLIENT_CONTENT
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
      headingLines: ["One-Stop GSE", "Hire. Purchase. Service."], // PENDING_CLIENT_CONTENT
      subhead:
        "Complete ground support equipment solutions — from pre-conditioned air units to aircraft docking systems, delivered wherever your fleet operates.", // PENDING_CLIENT_CONTENT
      ctaLabel: "Discover", // PENDING_CLIENT_CONTENT
      ctaHref: "/solutions",
      backgroundImage:
        "https://images.unsplash.com/photo-1769273747778-74eeb3f6d551?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
      backgroundImageAlt:
        "Ground support vehicles around an aircraft on an airport tarmac", // PENDING_CLIENT_CONTENT
    },
  ],
  heroTrustBar: [
    "Partner One",
    "Partner Two",
    "Partner Three",
    "Partner Four",
    "Partner Five",
  ], // PENDING_CLIENT_CONTENT — placeholder names, not real partners
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
