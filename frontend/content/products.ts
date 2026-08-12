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

// Figma itself uses lorem ipsum for this section's intro copy — real copy not yet provided.
export const productsIntro: ProductsIntroContent = {
  heading: "Our Products", // PENDING_CLIENT_CONTENT
  subhead:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis quam non leo varius bibendum id tristique turpis.", // PENDING_CLIENT_CONTENT
};

// Placeholder aviation/ground-equipment stock photography, reusing the same
// verified Unsplash sources already used elsewhere on Home — cycled across
// the 9 products rather than sourcing 9 unique ones. Swap per-product once
// real product photography is available.
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1769273747778-74eeb3f6d551?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594973841081-ec0c9c7e3064?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1571086291540-b137111fa1c7?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542296332-2e4473faf563?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?fm=jpg&q=60&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]; // PENDING_CLIENT_CONTENT

// Slugs confirmed against the footer's Product columns (PROJECT_PLAN.md §1).
export const products: Product[] = [
  {
    slug: "pre-conditioned-air-unit",
    name: "Pre-Conditioned Air Unit", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[0],
    heroImageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "pop-up-pit-system",
    name: "Pop-Up Pit System", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[1],
    heroImageAlt: "Ground crew technician inspecting equipment on the tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "mobile-gpu",
    name: "Mobile GPU", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[2],
    heroImageAlt: "Ground support carts and tugs beside a wide-body aircraft", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "hatch-pit-system",
    name: "Hatch Pit System", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[3],
    heroImageAlt: "Ground crew and tugs preparing an aircraft for pushback", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "aerial-jib-platforms",
    name: "Aerial Jib Platforms", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[4],
    heroImageAlt: "Ground support technician in coveralls and a hard hat", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "load-bank",
    name: "Load Bank", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[0],
    heroImageAlt: "Ground support equipment on an airport tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "400hz-gpu",
    name: "400Hz GPU", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[1],
    heroImageAlt: "Ground crew technician inspecting equipment on the tarmac", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "28v-dc-gpu",
    name: "28V DC GPU", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[2],
    heroImageAlt: "Ground support carts and tugs beside a wide-body aircraft", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
  {
    slug: "jet-blast-deflector",
    name: "Jet Blast Deflector", // PENDING_CLIENT_CONTENT
    summary: "Lorem ipsum dolor sit amet.", // PENDING_CLIENT_CONTENT
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // PENDING_CLIENT_CONTENT
    heroImage: PLACEHOLDER_IMAGES[3],
    heroImageAlt: "Ground crew and tugs preparing an aircraft for pushback", // PENDING_CLIENT_CONTENT
    modelVariants: [], // PENDING_CLIENT_CONTENT
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
