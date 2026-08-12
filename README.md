# AGAMI Aviation — Corporate Website

Marketing site for AGAMI Aviation, built section-by-section against a Figma prototype and the company brochure. See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for the full page structure, component inventory, branching strategy, and build process.

## Repo layout

```
frontend/   Next.js (App Router, TypeScript, Tailwind)
backend/    FastAPI (thin scaffold — no real auth/DB in v1)
```

## Local setup

### Frontend

```
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Runs at http://localhost:3000.

### Backend

```
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows; use `source .venv/bin/activate` on macOS/Linux
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Runs at http://localhost:8000. Health check: `GET /health`.

## Environment variables

See `frontend/.env.example` and `backend/.env.example`. The backend has no auth/DB in v1, so those vars are commented out placeholders for future use.

## Content-swap workflow

All placeholder copy lives in typed files under `frontend/content/` (one per page, plus `products.ts` for the 9 product entries), never inline in JSX. Every field sourced from the brochure is tagged `// PENDING_CLIENT_CONTENT` — grep for that tag to find everything still waiting on real client copy. Swapping in final copy means editing a content file, not touching layout or component code.

## Branching

- `main` — protected, always deployable.
- `develop` — integration branch; all feature branches merge here first.
- `feature/<section-name>` — one branch per section/page.

See PROJECT_PLAN.md §2 for full conventions.
