export interface ProductModelVariant {
  name: string; // e.g. "PCA200DX" // PENDING_CLIENT_CONTENT
  specs: Record<string, string>; // PENDING_CLIENT_CONTENT
}

export interface Product {
  slug: string;
  name: string; // PENDING_CLIENT_CONTENT
  summary: string; // PENDING_CLIENT_CONTENT — short line shown in the collapsed accordion row
  description: string; // PENDING_CLIENT_CONTENT — longer line shown next to the image when expanded
  heroImage: string; // PENDING_CLIENT_CONTENT
  heroImageAlt: string; // PENDING_CLIENT_CONTENT
  modelVariants: ProductModelVariant[]; // PENDING_CLIENT_CONTENT
}

export interface ProductsIntroContent {
  heading: string; // PENDING_CLIENT_CONTENT
  subhead: string; // PENDING_CLIENT_CONTENT
}

export const productsIntro: ProductsIntroContent = {
  heading: "Our Products", // PENDING_CLIENT_CONTENT
  subhead:
    "Ground support equipment engineered for reliability on the ramp — power, air, and access, built around the aircraft.", // PENDING_CLIENT_CONTENT — grounded in the real product line below, exact marketing copy TBD
};

// Placeholder aviation/ground-equipment stock photography, reusing verified
// Unsplash sources across the 9 products rather than sourcing 9 unique ones.
// Swap per-product once real product photography is available.
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1769273747778-74eeb3f6d551?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594973841081-ec0c9c7e3064?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1571086291540-b137111fa1c7?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542296332-2e4473faf563?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1643590161306-65599acaaea0?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]; // PENDING_CLIENT_CONTENT

// Slugs confirmed against the footer's Product columns (PROJECT_PLAN.md §1).
// Summaries/descriptions describe what each equipment type actually does —
// grounded in the real GSE category, not final approved marketing copy.
export const products: Product[] = [
  {
    slug: "pre-conditioned-air-unit",
    name: "Pre-Conditioned Air Unit", // PENDING_CLIENT_CONTENT
    summary:
      "Delivers conditioned air to a parked aircraft without running the APU.", // PENDING_CLIENT_CONTENT
    description:
      "Supplies temperature-controlled air directly to the cabin while an aircraft is parked, cutting fuel burn and emissions by eliminating the need to run the auxiliary power unit on the ground.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[0],
    heroImageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "pop-up-pit-system",
    name: "Pop-Up Pit System", // PENDING_CLIENT_CONTENT
    summary: "An in-ground utility pit that rises flush with the apron.", // PENDING_CLIENT_CONTENT
    description:
      "Houses PCA, power, and fluid connections below the apron surface and rises only when needed, keeping the ramp clear for aircraft and vehicle movement.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[2],
    heroImageAlt: "Ground support carts and tugs beside a wide-body aircraft", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "mobile-gpu",
    name: "Mobile GPU", // PENDING_CLIENT_CONTENT
    summary: "A self-propelled ground power unit for any gate or stand.", // PENDING_CLIENT_CONTENT
    description:
      "A towable, self-propelled power source that supplies stable electrical power to aircraft at any gate, without relying on fixed ground power infrastructure.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[3],
    heroImageAlt: "Ground crew and tugs preparing an aircraft for pushback", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "hatch-pit-system",
    name: "Hatch Pit System", // PENDING_CLIENT_CONTENT
    summary: "A hinged in-ground access point for ramp utility connections.", // PENDING_CLIENT_CONTENT
    description:
      "A low-profile, hinged pit cover that protects PCA, power, and fluid connections below grade while giving ground crews quick access when servicing an aircraft.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[1],
    heroImageAlt: "Ground crew technician inspecting equipment on the tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "aerial-jib-platforms",
    name: "Aerial Jib Platforms", // PENDING_CLIENT_CONTENT
    summary: "An articulating platform for high-reach airframe access.", // PENDING_CLIENT_CONTENT
    description:
      "An articulating jib-arm platform that positions technicians safely around the airframe and engines for inspection, cleaning, and maintenance work.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[4],
    heroImageAlt: "Ground support technician in coveralls and a hard hat", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "load-bank",
    name: "Load Bank", // PENDING_CLIENT_CONTENT
    summary: "Resistive load testing for ground power systems.", // PENDING_CLIENT_CONTENT
    description:
      "Applies a controlled electrical load to verify GPU output, voltage stability, and frequency under real operating conditions before an aircraft ever connects.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[0],
    heroImageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "400hz-gpu",
    name: "400Hz GPU", // PENDING_CLIENT_CONTENT
    summary: "High-frequency ground power matched to aircraft systems.", // PENDING_CLIENT_CONTENT
    description:
      "Converts standard utility power to the 400Hz, three-phase supply most commercial aircraft require, delivered reliably at every stand.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[2],
    heroImageAlt: "Ground support carts and tugs beside a wide-body aircraft", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "28v-dc-gpu",
    name: "28V DC GPU", // PENDING_CLIENT_CONTENT
    summary: "Direct-current ground power for smaller airframes.", // PENDING_CLIENT_CONTENT
    description:
      "Supplies regulated 28V DC output for aircraft and business jets that require direct-current ground power instead of 400Hz AC.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[3],
    heroImageAlt: "Ground crew and tugs preparing an aircraft for pushback", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "jet-blast-deflector",
    name: "Jet Blast Deflector", // PENDING_CLIENT_CONTENT
    summary: "Redirects engine exhaust away from ramp personnel and gear.", // PENDING_CLIENT_CONTENT
    description:
      "A fixed or mobile barrier engineered to deflect high-velocity jet exhaust upward and away from ground crews, equipment, and terminal infrastructure.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[5],
    heroImageAlt: "Close-up view of a jet engine turbine", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
