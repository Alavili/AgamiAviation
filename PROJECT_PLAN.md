# AGAMI Aviation — Corporate Website (v1) — Project Plan

Repo: https://github.com/Alavili/AgamiAviation
Status: **Structure confirmed against Figma prototype + brochure PDF. Ready to start section-by-section build.**

---

## 0. Confirmed inputs

- Brochure: `AGAMI Aviation Broucher-LR1_compressed.pdf` (16 pages) — read in full, matches the content map in the brief exactly.
- Figma prototype: walked all 5 flows in the proto sidebar (Home, About Us, Contact Us, Products Detail page, Solutions).

Two open questions came out of that walkthrough — see §1a.

---

## 1. Page list & URL structure (confirmed)

The Figma proto's "Flows" panel is the definitive page list — 5 flows, not one-page-per-brochure-section:

| Route | Figma flow | Content |
|---|---|---|
| `/` | Home | Hero carousel ("One-Stop GSE. Hire. Purchase. Service."), About teaser + video + office locations map, feature/quote block, **Our Products** accordion (9 items), **Portfolio** gallery carousel, testimonials, footer |
| `/about` | About Us | Hero, AGAMI intro + video, pull-quote block, Mission / Vision / Value 3-column, footer |
| `/solutions` | Solutions | Single scrolling page, 2 numbered sections: **01** Integrated Aircraft GSU System (PCA \| GPU \| Potable Water \| Sewage \| Blue Water), **02** Solutions Offered / Scope of Services (fume extraction, aircraft docking, maintenance platforms, engine handling, system design & engineering, airside systems integration), footer |
| `/products/[slug]` | Products Detail page | One reusable template for all 9 products — hero with product name, model/variant tab switcher (e.g. PCA200DX), spec content, footer |
| `/contact` | Contact Us | Hero, contact form (Full Name, Email, Subject, Message), map/globe graphic, footer |

**9 product slugs** (from the footer's Product columns, matches brochure "Our Products" grid):
`pre-conditioned-air-unit`, `pop-up-pit-system`, `mobile-gpu`, `hatch-pit-system`, `aerial-jib-platforms`, `load-bank`, `400hz-gpu`, `28v-dc-gpu`, `jet-blast-deflector`.

Global nav (from the footer, present on every page): **Main Page** — Home, About, Portfolio, Contact Us. **Solution** — 5 links. **Product** — 9 links (2 columns).

### 1a. Open questions — resolved

1. ~~Footer 5 "Solution" links vs 2 built sections~~ — **Resolved: footer list is just placeholder.** Build `/solutions` with the 2 confirmed sections (GSU System, Scope of Services); footer Solution links point at those (with anchors) instead of 5 stub pages.
2. ~~Agami OpsEye page~~ — **Deferred.** Not in v1 scope for now; revisit later.
3. ~~Portfolio section source~~ — **Resolved: custom-designed, no Figma spec.** See §4a for the design brief.

---

## 2. Repo setup plan

### Layout: monorepo

`/frontend` (Next.js) + `/backend` (FastAPI) in one repo.

Justification: single site with one release cadence, small team, and the backend is intentionally a thin scaffold in v1 (no real auth/DB logic) — there's no independent versioning need that would justify split repos. A monorepo keeps PRs atomic when a page needs a matching backend stub, keeps one issue tracker and one CI config, and is easy to split later if the demo-portal backend grows into its own service.

```
AgamiAviation/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # /
│   │   ├── about/page.tsx           # /about
│   │   ├── solutions/page.tsx       # /solutions
│   │   ├── products/[slug]/page.tsx # /products/[slug]
│   │   └── contact/page.tsx         # /contact
│   ├── components/
│   │   ├── ui/                 # buttons, cards, inputs, tabs — primitives
│   │   ├── sections/           # HeroBanner, ProductAccordion, PortfolioCarousel, TestimonialCarousel, MissionVisionValue, SolutionSection, ProductModelTabs, ContactForm, LocationsMap
│   │   └── layout/             # Navbar, Footer
│   ├── content/                # per-page placeholder copy (see §3), products.ts (9-item data)
│   ├── public/images/
│   ├── styles/                 # design tokens, globals
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/            # empty stub routers for future demo portal
│   │   └── core/config.py
│   ├── .env.example
│   └── requirements.txt
├── .github/workflows/ci.yml
├── .gitignore
└── README.md
```

### Branching strategy

- `main` — protected, always deployable.
- `develop` — integration branch; all feature branches merge here first.
- `feature/<section-name>` — one branch per section/page (e.g. `feature/home-hero`, `feature/products-detail-template`).
- PRs target `develop`; `develop` → `main` merged in batches at release points.
- **Squash merge** for feature → develop (keeps history one commit per section, easy to revert). Regular merge (no squash) for develop → main (preserves the section-level history on main).
- Commit convention: [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`.
- PR template should require: link to the Figma frame/screenshot being matched, a screenshot of the built result, and the "done" checklist from §3.

### CI (lightweight, v1)

GitHub Actions on PR to `develop`/`main`:
- Frontend: `eslint`, `prettier --check`, `next build`
- Backend: `ruff check`, `python -m py_compile` / import check on `app.main`
- No deploy automation yet — out of scope for v1.

### Housekeeping

- `.gitignore`: `node_modules/`, `.next/`, `__pycache__/`, `.venv/`, `*.env`, `.DS_Store`
- `README.md`: project overview, local setup for both apps, env var list, how content-swap works (link to §3)
- `.env.example` in both `frontend/` and `backend/` — no real secrets needed yet since backend has no auth/DB in v1, but scaffold the vars future auth will need (`DATABASE_URL`, `JWT_SECRET`, etc.) as commented-out placeholders

---

## 3. Section-by-section development process

**Workflow:** you upload one Figma section screenshot at a time → I build that section as a component → matched against the screenshot → merged before moving to the next section.

**Definition of done, per section:**
- Visually matches the screenshot (layout, spacing, typography, imagery style) at desktop width
- Responsive at mobile/tablet breakpoints (Figma proto only shows desktop — reasonable responsive behavior is inferred and flagged for review)
- Uses placeholder copy from the content layer, not hardcoded in JSX
- Semantic, accessible markup: proper heading hierarchy, alt text on images, sufficient contrast, keyboard-navigable interactive elements (carousels, accordion, tabs all need keyboard + ARIA support)
- Built as a reusable component (not one-off page markup) if the pattern repeats elsewhere — Home's hero, About's hero, Solutions' hero, Products' hero, and Contact's hero all share one visual pattern, for example
- PR includes side-by-side screenshot comparison

**Content-swap strategy:** placeholder copy lives in `frontend/content/<page>.ts` (typed objects), imported into components — never inline in JSX. Product data (9 products × model variants) lives in `frontend/content/products.ts`, keyed by slug, so the `[slug]` template just looks up data. Each field pulled from the brochure gets a `// PENDING_CLIENT_CONTENT` comment so a grep finds every placeholder instantly once real copy arrives. Swapping copy later means editing a content file, not touching layout/component code.

---

## 4. Component / design system plan (confirmed against Figma)

- `Navbar` — logo, social icons, hamburger menu (full nav revealed on click) — global
- `Footer` — logo, contact info, social icons, 4-column link grid (Main Page / Solution / Product / Product), copyright + legal links — global
- `HeroBanner` — full-bleed image/video background, large heading, subhead, CTA button — reused on Home, About, Solutions, Products, Contact (Home's is a multi-slide carousel variant)
- `ProductAccordion` — numbered expandable list (01–09), used in Home's "Our Products" section
- `ProductModelTabs` — horizontal tab/pill switcher for model variants (e.g. PCA200DX), used on the Products Detail template
- `PortfolioBookCarousel` — custom-designed (no Figma spec), see §4a
- `TestimonialCarousel` — customer quote cards in a horizontal scroll/carousel, Home page
- `MissionVisionValue` — 3-column feature block with dividers, About page
- `SolutionSection` — numbered section block (badge + heading + body + optional 2-column item list), Solutions page, repeats for each of the 2 (or more, pending §1a) solution categories
- `ContactForm` — labeled form fields (Full Name, Email, Subject, Message) with validation states
- `LocationsMap` — dotted world-map graphic with location pin callouts, used on Home and Contact
- `PullQuote` — large quote-mark + statement block, used on About and Home
- `SectionHeading` — consistent heading + orange-underline/accent-dot pattern used across nearly every section

Design tokens (`frontend/styles/tokens`) — colors (black/white/orange accent observed), font scale, spacing — to be pixel-measured from Figma once section screenshots start coming in per §3, rather than guessed up front.

### 4a. Portfolio section — custom design brief

No Figma spec exists for this section; you asked me to design it. Base structure:

- **Full-viewport slides**: each portfolio item is a `100vh` section — one project/image per screen, not a scrolled grid.
- **Split layout**: left half is a full-bleed image; right half is content (title, short description, category tag, optional "View more" link) — vertically centered.
- **Book/carousel navigation**: slides advance via prev/next controls (arrows + optional page-number or dot indicator, matching the arrow style already used in the Home "Solutions offered" nav). Advancing animates as a page-turn/slide transition (image and content panels cross-fade or slide together) rather than a continuous scroll — reinforces the "book" feel.
- **Responsive fallback**: below tablet width, the 100vh split collapses to a stacked layout (image on top, content below) since a true split-screen doesn't work on narrow viewports — full-bleed image height capped (not 100vh) on mobile to avoid oversized single-image screens.
- **Keyboard/a11y**: arrow-key and swipe navigation, visible focus states on prev/next controls, slide content announced via `aria-live` on change.
- **Data**: pending §1a Q3 resolution on content source — build against placeholder aviation stock imagery + `PENDING_CLIENT_CONTENT` copy for now, same as every other section.

This will get refined once the first real build pass happens and you can react to a working version rather than a written spec.

---

## 5. Testing approach (v1 marketing site — kept lightweight)

- **Component smoke tests** (Vitest + React Testing Library) for components with real interactivity: nav menu open/close, contact form validation/submit, product accordion expand/collapse, model tabs, carousels (portfolio + testimonials). Skip tests for pure presentational sections.
- **Manual/visual QA** against Figma screenshots per section — this is the primary quality gate for a marketing site; not worth building automated visual-regression tooling for v1.
- **Accessibility pass**: axe/Lighthouse audit before launch, not per-PR — carousels, accordions, and tabs are the highest-risk components for a11y regressions, so they get extra manual keyboard-nav checks during their own PR.
- **Backend**: one health-check test (`GET /health` returns 200) — nothing else meaningful to test until real endpoints exist.
- Explicitly **not** doing for v1: E2E (Cypress/Playwright), visual regression diffing, load testing — over-engineering for a static marketing site with no backend logic yet.

---

## 6. Page-by-page task breakdown

Each page follows: section screenshot uploaded → component(s) built → content wired from `frontend/content/` → responsive pass → a11y pass → PR → merge.

**Global (build first — every page depends on these)**
- [ ] `Navbar` (logo, socials, hamburger nav)
- [ ] `Footer` (4-column nav + contact + legal)
- [ ] `HeroBanner` base component (non-carousel variant first)
- [ ] Design tokens / Tailwind config from first screenshots

**Home (`/`)**
- [ ] Hero carousel (multi-slide variant of HeroBanner)
- [ ] About teaser + video + LocationsMap
- [ ] PullQuote / feature image-tile block
- [ ] ProductAccordion (9 items, placeholder copy, links to `/products/[slug]`)
- [ ] PortfolioBookCarousel (custom design, see §4a) — full-viewport, image-left/content-right, book-style prev/next
- [ ] TestimonialCarousel

**About (`/about`)**
- [ ] Hero
- [ ] Intro + video
- [ ] PullQuote block
- [ ] MissionVisionValue

**Solutions (`/solutions`)**
- [ ] Hero
- [ ] SolutionSection 01 — Integrated Aircraft GSU System
- [ ] SolutionSection 02 — Solutions Offered / Scope of Services

**Products Detail (`/products/[slug]`)**
- [ ] Hero + ProductModelTabs template
- [ ] Spec/detail content block
- [ ] `products.ts` content file seeded with all 9 products from the brochure
- [ ] Verify template flexes correctly for products with fewer/no model variants

**Contact (`/contact`)**
- [ ] Hero
- [ ] ContactForm (client-side validation; submit handler stubbed to backend `/contact` route for now)
- [ ] LocationsMap / globe graphic

---

## Next steps

1. Scaffold `/frontend` and `/backend` per §2 once you confirm you want code started (previously deferred to docs-only).
2. Start section-by-section builds per §6, beginning with the global Navbar/Footer/Hero.
