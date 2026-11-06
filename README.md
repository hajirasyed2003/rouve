# ROUVÉ

Premium handcrafted floral boutique and e-commerce platform. Artistic paper rose bouquets and
customised floral gifts, launching in India (INR).

**Status: Day 3 foundation complete.** Monorepo scaffolded; brand design system, reusable
components and a FastAPI backend foundation are running. No commerce features exist yet.

```
rouve/
  frontend/   Next.js (App Router), React, TypeScript, Tailwind CSS v4
  backend/    FastAPI, Pydantic, SQLAlchemy (async), Alembic
  docs/       brand-guide.md, website-architecture.md, project-setup.md
```

## Run it

```bash
cd backend && python3 -m venv .venv && source .venv/bin/activate \
  && pip install -r requirements-dev.txt && cp .env.example .env \
  && uvicorn app.main:app --reload --port 8000

cd frontend && npm install && cp .env.example .env.local && npm run dev
```

Frontend: <http://localhost:3000> · Component gallery: <http://localhost:3000/design-system> ·
API docs: <http://localhost:8000/api/v1/docs> · Health: <http://localhost:8000/api/v1/health>

Full setup, commands, environment variables, dependency rationale, verification results and known
limitations: [`docs/project-setup.md`](docs/project-setup.md).

## Confirmed business decisions

Ready-made bouquets are finished stock; custom bouquets are made to order. Guest checkout is
allowed. Prepaid online payments only (no COD). Pan-India delivery subject to courier pincode
serviceability. Custom orders launch with an enquiry form; the interactive builder comes later.
Currency is INR. See [`docs/website-architecture.md`](docs/website-architecture.md).

## Brand rules

The approved logo artwork in `frontend/public/brand/` is the source of truth. Never retype the
wordmark in a font, distort or recolour it, or use the packaging seal as the site logo.
See [`docs/brand-guide.md`](docs/brand-guide.md).

## Security

Never commit real `.env` files. Only `.env.example` templates are tracked. Secrets stay on the
backend; only `NEXT_PUBLIC_*` values reach the browser.
