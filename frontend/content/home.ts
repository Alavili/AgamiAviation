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
  className?: string; // overrides the default logo size, e.g. for wider wordmarks
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
  solutionShowcase: {
    heading: string; // PENDING_CLIENT_CONTENT
    subhead: string; // PENDING_CLIENT_CONTENT
    items: Array<{
      title: string; // PENDING_CLIENT_CONTENT
      description: string; // PENDING_CLIENT_CONTENT
      image: string; // PENDING_CLIENT_CONTENT
      imageAlt: string; // PENDING_CLIENT_CONTENT
      href: string;
    }>;
  };
  pullQuote: {
    quote: string; // PENDING_CLIENT_CONTENT
    attribution: string; // PENDING_CLIENT_CONTENT
  };
  portfolio: {
    heading: string; // PENDING_CLIENT_CONTENT
    subhead: string; // PENDING_CLIENT_CONTENT
    items: Array<{
      eyebrow: string; // PENDING_CLIENT_CONTENT
      title: string; // PENDING_CLIENT_CONTENT
      image: string; // PENDING_CLIENT_CONTENT
      imageAlt: string; // PENDING_CLIENT_CONTENT
      href: string;
    }>;
  };
  testimonials: {
    heading: string; // PENDING_CLIENT_CONTENT
    subhead: string; // PENDING_CLIENT_CONTENT
    items: Array<{
      quote: string; // PENDING_CLIENT_CONTENT
      author: string; // PENDING_CLIENT_CONTENT
      role: string; // PENDING_CLIENT_CONTENT
      avatar: string; // PENDING_CLIENT_CONTENT
      avatarAlt: string; // PENDING_CLIENT_CONTENT
    }>;
  };
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
    {
      name: "Wandering Bear Coffee",
      src: "/images/trust-logos/wandering-bear-coffee.png",
    }, // PENDING_CLIENT_CONTENT
    { name: "Gorjana", src: "/images/trust-logos/gorjana.png" }, // PENDING_CLIENT_CONTENT
    {
      name: "Vénus et Fleur",
      src: "/images/trust-logos/venus-et-fleur.png",
      className: "h-4 w-auto object-contain opacity-90 sm:h-5",
    }, // PENDING_CLIENT_CONTENT
    { name: "Obvi", src: "/images/trust-logos/obvi.png" }, // PENDING_CLIENT_CONTENT
    { name: "Lomi", src: "/images/trust-logos/lomi.png" }, // PENDING_CLIENT_CONTENT
    {
      name: "Bubs Naturals",
      src: "/images/trust-logos/bubs-naturals.png",
    }, // PENDING_CLIENT_CONTENT
  ],
  aboutTeaser: {
    heading: "About AGAMI", // PENDING_CLIENT_CONTENT
    body: "Agami Aviation is a trusted one-stop solution provider for the complete range of Ground Support Equipment (GSE), delivering innovative, reliable, and cost-effective solutions to the aviation industry.", // PENDING_CLIENT_CONTENT
    videoUrl: "https://assets.mixkit.co/videos/28000/28000-720.mp4", // PENDING_CLIENT_CONTENT — placeholder aviation stock video (Mixkit, "plane taking off at dusk"), swap for real company video
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
  solutionShowcase: {
    heading: "Our Solution", // PENDING_CLIENT_CONTENT
    subhead:
      "Integrated ground support systems engineered around the aircraft.", // PENDING_CLIENT_CONTENT — grounded in the real scope from content/solutions.ts, exact marketing copy TBD
    items: [
      {
        title: "Integrated GSU Systems", // PENDING_CLIENT_CONTENT
        description:
          "PCA, GPU, potable water, sewage, and blue water — one integrated ground support system built around the aircraft.", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1769273747778-74eeb3f6d551?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
        href: "/solutions#gsu-system",
      },
      {
        title: "Aircraft Docking & Handling", // PENDING_CLIENT_CONTENT
        description:
          "Custom docking and maintenance platforms engineered around your aircraft type, with full engine handling support.", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1542296332-2e4473faf563?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground crew and tugs preparing an aircraft for pushback", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
      {
        title: "Fume Extraction Systems", // PENDING_CLIENT_CONTENT
        description:
          "Purpose-built extraction systems that keep hangars and ramps compliant during maintenance and engine runs.", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1594973841081-ec0c9c7e3064?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground crew technician inspecting equipment on the tarmac", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
      {
        title: "Airside Systems Integration", // PENDING_CLIENT_CONTENT
        description:
          "End-to-end design, engineering, and integration of airside systems — from concept through commissioning.", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1571086291540-b137111fa1c7?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground support carts and tugs beside a wide-body aircraft", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
    ],
  },
  pullQuote: {
    quote: "", // PENDING_CLIENT_CONTENT
    attribution: "", // PENDING_CLIENT_CONTENT
  },
  portfolio: {
    heading: "Portfolio", // PENDING_CLIENT_CONTENT
    subhead:
      "Ground support systems we've designed, built, and installed — across ramps, hangars, and gates.", // PENDING_CLIENT_CONTENT — grounded in the real scope from content/solutions.ts, exact marketing copy TBD
    items: [
      {
        eyebrow: "Airside Systems Integration", // PENDING_CLIENT_CONTENT
        title: "Apron Power & Utilities Upgrade", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1466691623998-d607fab1ca29?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt:
          "Aerial view of an airport apron with aircraft parked at multiple gates", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
      {
        eyebrow: "Integrated GSU System", // PENDING_CLIENT_CONTENT
        title: "Multi-Gate GSU Rollout", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1769273747778-74eeb3f6d551?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
        href: "/solutions#gsu-system",
      },
      {
        eyebrow: "Aircraft Docking & Handling", // PENDING_CLIENT_CONTENT
        title: "Docking & Pushback System", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1542296332-2e4473faf563?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground crew and tugs preparing an aircraft for pushback", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
      {
        eyebrow: "Fume Extraction", // PENDING_CLIENT_CONTENT
        title: "Fume Extraction Retrofit", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1594973841081-ec0c9c7e3064?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground crew technician inspecting equipment on the tarmac", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
      {
        eyebrow: "Ground Power", // PENDING_CLIENT_CONTENT
        title: "GPU Fleet Deployment", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1571086291540-b137111fa1c7?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground support carts and tugs beside a wide-body aircraft", // PENDING_CLIENT_CONTENT
        href: "/solutions#gsu-system",
      },
      {
        eyebrow: "Maintenance Platforms", // PENDING_CLIENT_CONTENT
        title: "Aerial Platform Installation", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground support technician in coveralls and a hard hat", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
      {
        eyebrow: "Pre-Conditioned Air", // PENDING_CLIENT_CONTENT
        title: "PCA Unit Fleet Expansion", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1769273747778-74eeb3f6d551?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
        href: "/solutions#gsu-system",
      },
      {
        eyebrow: "Water & Waste Servicing", // PENDING_CLIENT_CONTENT
        title: "Potable Water & Sewage Cart Refresh", // PENDING_CLIENT_CONTENT
        image:
          "https://images.unsplash.com/photo-1542296332-2e4473faf563?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        imageAlt:
          "Ground crew and tugs preparing an aircraft for pushback at sunset", // PENDING_CLIENT_CONTENT
        href: "/solutions#scope-of-services",
      },
    ],
  },
  testimonials: {
    heading: "Testimonials", // PENDING_CLIENT_CONTENT
    subhead:
      "What ground operations and maintenance teams say about working with us.", // PENDING_CLIENT_CONTENT — grounded copy, exact client quotes TBD
    items: [
      {
        quote:
          "Turnaround times dropped the moment we switched — their GPU and PCA units are ready the second an aircraft blocks in, and the crews know exactly what they're doing.", // PENDING_CLIENT_CONTENT
        author: "Rahul Menon", // PENDING_CLIENT_CONTENT
        role: "Ground Operations Manager", // PENDING_CLIENT_CONTENT
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        avatarAlt: "Portrait of Rahul Menon", // PENDING_CLIENT_CONTENT
      },
      {
        quote:
          "We hired the docking system for a single heavy-check cycle and ended up keeping it on contract — the fit and finish around the airframe was better than equipment we'd bought outright.", // PENDING_CLIENT_CONTENT
        author: "Daniel Voss", // PENDING_CLIENT_CONTENT
        role: "MRO Facility Director", // PENDING_CLIENT_CONTENT
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        avatarAlt: "Portrait of Daniel Voss", // PENDING_CLIENT_CONTENT
      },
      {
        quote:
          "When a GPU went down at 2am, their team had a replacement unit on the ramp before the first departure. That kind of response is rare from an equipment supplier.", // PENDING_CLIENT_CONTENT
        author: "Peter Whitfield", // PENDING_CLIENT_CONTENT
        role: "Fleet Maintenance Lead", // PENDING_CLIENT_CONTENT
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fm=jpg&q=60&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        avatarAlt: "Portrait of Peter Whitfield", // PENDING_CLIENT_CONTENT
      },
      {
        quote:
          "From RFQ to install on our apron took under three weeks. Everything was engineered to our gate layout instead of us adapting to a catalog part.", // PENDING_CLIENT_CONTENT
        author: "Sarah Kavanagh", // PENDING_CLIENT_CONTENT
        role: "Airport Operations Manager", // PENDING_CLIENT_CONTENT
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // PENDING_CLIENT_CONTENT
        avatarAlt: "Portrait of Sarah Kavanagh", // PENDING_CLIENT_CONTENT
      },
    ],
  },
};
