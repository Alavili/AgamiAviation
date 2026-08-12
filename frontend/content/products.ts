export interface ProductModelVariant {
  name: string; // e.g. "PCA200DX" // PENDING_CLIENT_CONTENT
  specs: Record<string, string>; // PENDING_CLIENT_CONTENT
}

export interface Product {
  slug: string;
  name: string; // PENDING_CLIENT_CONTENT
  summary: string; // PENDING_CLIENT_CONTENT
  heroImage: string; // PENDING_CLIENT_CONTENT
  modelVariants: ProductModelVariant[]; // PENDING_CLIENT_CONTENT
}

// Slugs confirmed against the footer's Product columns (PROJECT_PLAN.md §1).
export const products: Product[] = [
  {
    slug: "pre-conditioned-air-unit",
    name: "Pre-Conditioned Air Unit", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "pop-up-pit-system",
    name: "Pop-Up Pit System", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "mobile-gpu",
    name: "Mobile GPU", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "hatch-pit-system",
    name: "Hatch Pit System", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "aerial-jib-platforms",
    name: "Aerial Jib Platforms", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "load-bank",
    name: "Load Bank", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "400hz-gpu",
    name: "400Hz GPU", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "28v-dc-gpu",
    name: "28V DC GPU", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "jet-blast-deflector",
    name: "Jet Blast Deflector", // PENDING_CLIENT_CONTENT
    summary: "", // PENDING_CLIENT_CONTENT
    heroImage: "", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
