export interface HeroSlide {
  headingLines: string[]; // PENDING_CLIENT_CONTENT
  subhead: string; // PENDING_CLIENT_CONTENT
  ctaLabel: string; // PENDING_CLIENT_CONTENT
  ctaHref: string;
  backgroundImage: string; // PENDING_CLIENT_CONTENT — sourced from Unsplash for now, swap for real photography
  backgroundImageAlt: string; // PENDING_CLIENT_CONTENT
}

export interface TrustLogo {
  name: string;
  src: string;
}

export interface HomeContent {
  heroSlides: HeroSlide[];
  // Airline logos under the hero — NOT real AGAMI clients/partners. Used
  // purely for visual polish per your direction (same approach the Figma
  // template itself took with unrelated consumer brand logos). Swap for
  // real client/partner logos once those relationships exist.
  heroTrustBar: TrustLogo[]; // PENDING_CLIENT_CONTENT
  aboutTeaser: {
    heading: string; // PENDING_CLIENT_CONTENT
    body: string; // PENDING_CLIENT_CONTENT
    videoUrl: string; // PENDING_CLIENT_CONTENT
    ctaLabel: string; // PENDING_CLIENT_CONTENT
    ctaHref: string;
  };
  locations: Array<{
    country: "uae" | "india";
    label: string; // PENDING_CLIENT_CONTENT
    address: string; // PENDING_CLIENT_CONTENT
    // Position of the map pin, as a percentage of the map graphic's width/height.
    position: { xPercent: number; yPercent: number };
  }>;
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
    {
      headingLines: ["Certified Ground", "Support Technicians"], // PENDING_CLIENT_CONTENT
      subhead:
        "Trained crews and responsive maintenance keep every unit turnaround-ready, at any hour.", // PENDING_CLIENT_CONTENT
      ctaLabel: "Discover", // PENDING_CLIENT_CONTENT
      ctaHref: "/solutions",
      backgroundImage:
        "https://images.unsplash.com/photo-1594973841081-ec0c9c7e3064?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
      backgroundImageAlt:
        "A ground crew technician inspecting an aircraft on the tarmac", // PENDING_CLIENT_CONTENT
    },
    {
      headingLines: ["Built For", "Turnaround Speed"], // PENDING_CLIENT_CONTENT
      subhead:
        "From gate arrival to pushback, our equipment is engineered to keep tight schedules on time.", // PENDING_CLIENT_CONTENT
      ctaLabel: "Discover", // PENDING_CLIENT_CONTENT
      ctaHref: "/solutions",
      backgroundImage:
        "https://images.unsplash.com/photo-1571086291540-b137111fa1c7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
      backgroundImageAlt:
        "Ground support carts and tugs beside a wide-body aircraft at the gate", // PENDING_CLIENT_CONTENT
    },
    {
      headingLines: ["Wherever Your", "Fleet Operates"], // PENDING_CLIENT_CONTENT
      subhead:
        "Regional coverage and rapid deployment mean the right equipment arrives exactly when you need it.", // PENDING_CLIENT_CONTENT
      ctaLabel: "Discover", // PENDING_CLIENT_CONTENT
      ctaHref: "/solutions",
      backgroundImage:
        "https://images.unsplash.com/photo-1542296332-2e4473faf563?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
      backgroundImageAlt:
        "Ground crew and tugs preparing an aircraft for pushback at sunset", // PENDING_CLIENT_CONTENT
    },
  ],
  heroTrustBar: [
    { name: "Emirates", src: "/images/trust-logos/emirates.svg" }, // PENDING_CLIENT_CONTENT
    { name: "Etihad Airways", src: "/images/trust-logos/etihad.svg" }, // PENDING_CLIENT_CONTENT
    { name: "Qatar Airways", src: "/images/trust-logos/qatar-airways.svg" }, // PENDING_CLIENT_CONTENT
    { name: "Lufthansa", src: "/images/trust-logos/lufthansa.svg" }, // PENDING_CLIENT_CONTENT
    {
      name: "Singapore Airlines",
      src: "/images/trust-logos/singapore-airlines.svg",
    }, // PENDING_CLIENT_CONTENT
  ],
  aboutTeaser: {
    heading: "About AGAMI", // PENDING_CLIENT_CONTENT
    body: "Agami Aviation is a trusted one-stop solution provider for the complete range of Ground Support Equipment (GSE), delivering innovative, reliable, and cost-effective solutions to the aviation industry.", // PENDING_CLIENT_CONTENT
    videoUrl: "", // PENDING_CLIENT_CONTENT
    ctaLabel: "Discover", // PENDING_CLIENT_CONTENT
    ctaHref: "/about",
  },
  locations: [
    {
      country: "uae",
      label: "UAE Office", // PENDING_CLIENT_CONTENT — real UAE office address not yet provided
      address:
        "B5, Mettupalayam Rd, near John Bosco, near Ford showroom, Gounder Mills, Coimbatore - 641029", // PENDING_CLIENT_CONTENT
      position: { xPercent: 52, yPercent: 44 },
    },
    {
      country: "india",
      label: "India Office", // PENDING_CLIENT_CONTENT
      address:
        "B5, Mettupalayam Rd, near John Bosco, near Ford showroom, Gounder Mills, Coimbatore - 641029", // PENDING_CLIENT_CONTENT
      position: { xPercent: 63, yPercent: 51 },
    },
  ],
  pullQuote: {
    quote: "", // PENDING_CLIENT_CONTENT
    attribution: "", // PENDING_CLIENT_CONTENT
  },
  testimonials: [],
};
