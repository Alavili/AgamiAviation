# Home Page Quick Reference

Read this instead of exploring the repo for small home-page UI changes (spacing, color, copy, text tweaks). Only fall back to full exploration for new sections or structural changes.

## Section order (frontend/app/page.tsx)

1. `HeroCarousel` — components/sections/HeroCarousel.tsx (uses HeroSlideContent.tsx, TrustBar.tsx)
2. `AboutTeaser` — components/sections/AboutTeaser.tsx (uses LocationsMap.tsx)
3. `SolutionShowcase` — components/sections/SolutionShowcase.tsx
4. `ProductAccordion` — components/sections/ProductAccordion.tsx
5. `PortfolioCarousel` — components/sections/PortfolioCarousel.tsx
6. `TestimonialCarousel` — components/sections/TestimonialCarousel.tsx

`HeroBanner.tsx` is a single-slide variant of the hero (not currently used on the home page — HeroCarousel is).

## Where to make a change

- **Copy/text changes** → `frontend/content/home.ts` (and `products.ts` for the product accordion intro/items). Never edit copy directly in JSX/components.
- **Layout/spacing/structure of a section** → the matching file in `frontend/components/sections/`.
- **Shared small UI (buttons, headings, logo, icons)** → `frontend/components/ui/` (Button.tsx, SectionHeading.tsx, Logo.tsx, icons.tsx, SocialLinks.tsx).
- **Colors/brand tokens** → `frontend/styles/tokens.ts` AND `frontend/tailwind.config.ts` (`theme.extend.colors`) — must update both together.
- **Fonts** → `tailwind.config.ts` `theme.extend.fontFamily` (Space Grotesk via CSS var).
- **Global styles** → `frontend/styles/globals.css`.
- **Images** → `frontend/public/images/`.

## Current design tokens

- Brand orange: `#FA911C` (`brand-orange`), dark variant `#E0800F` (`brand-orange-dark`)
- Surface dark (scrolled navbar / mobile menu): `#141D20` (`surface-dark`)
- Surface black (footer): `#000000` (`surface-black`)
- Font: Space Grotesk (`font-sans`)

## Conventions

- Content lives in typed files under `frontend/content/`, never inline in JSX.
- Placeholder copy still waiting on real client content is tagged `// PENDING_CLIENT_CONTENT` — grep for it.
- Figma references for home page: `docs/figma-references/home page landing with initial navbar.png` and `docs/figma-references/navbar when scroll.png`.
- Branching: `feature/<section-name>` off `develop`; `main` is protected.
- Dev server: `cd frontend && npm run dev` → http://localhost:3000.

## Workflow for a "small design change" request

1. Identify the section from the list above.
2. Open only that section's component file (+ content file if it's a copy change).
3. Make the edit. Don't read PROJECT_PLAN.md, backend/, or unrelated sections unless the change touches shared UI or tokens.
4. If it's a shared token/style change, update both `tokens.ts` and `tailwind.config.ts`.
