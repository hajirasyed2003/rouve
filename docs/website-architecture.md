# ROUVÉ Website Architecture (repository edition, v1.1)

This is the working version of Website Architecture v1.0, updated with the business decisions
confirmed before Day 3. The full v1.0 document (sitemap, journeys, homepage and builder specs,
admin modules, API tables) was saved as a project document on Day 2; where this file and v1.0
disagree, **this file wins**.

## 1. Confirmed decisions (supersede v1.0 recommendations)

| Topic | Decision |
|---|---|
| Product | Artistic paper rose bouquets and customised floral gifts (no perishability) |
| Fulfilment | Ready-made bouquets are **finished stock**; customised bouquets are **made to order** |
| Checkout | **Guest checkout allowed**; account creation optional |
| Payments | **Online prepaid only. No Cash on Delivery at launch** |
| Delivery | **Pan-India**, but availability depends on **courier pincode serviceability** |
| Custom orders | **Launch with a custom bouquet enquiry form.** The interactive builder comes in a later milestone |
| Currency | INR; money stored as integer paise, formatted with `en-IN` |
| Logic location | FastAPI owns pricing, stock and orders; the browser never decides a price |
| Admin | Separate `/admin` route group (own subdomain), RBAC, audit log |

### What changes versus v1.0
- The builder is no longer launch-critical. At launch, Custom Creations is a service page with an
  **enquiry form** (`POST /api/v1/custom-enquiries`, admin inbox, email notification). The builder
  (v1.0 section 5) is milestone 16 and still depends on Bill of Materials data.
- COD removed from checkout, order states and refund rules. Payment methods: UPI, cards, netbanking, wallets via Razorpay.
- The cart and product pages show a **pincode check**. If a pincode is not serviceable, the product
  cannot be ordered for that address. This needs Shiprocket serviceability data earlier (milestone 6).

## 2. Frontend routes (Next.js App Router)

Built today: `/`, `/design-system` (noindex component gallery), branded 404. Everything else is
planned; links to unbuilt routes currently reach the 404 page.

```
/                         Home                       (shell only today)
/shop  /shop/[category]   Catalogue
/collections/[slug]       Romantic gifting, celebration, ...
/products/[slug]          Product details
/custom-creations         Service page + enquiry form
/cart  /checkout  /checkout/confirmation/[orderId]
/login  /register  /account  /account/orders[/orderNumber]
/track  /track/[orderNumber]
/about  /craftsmanship  /care  /contact  /faq
/policies/{shipping,refunds,privacy,terms}
/admin/...                dashboard, products, categories, orders, customers, inventory,
                          suppliers, purchases, production, bom, shipping, payments, reports, settings
```

## 3. Order lifecycle

`Pending payment → Paid → Confirmed → In production (custom only) → Quality check → Packed → Shipped →
Out for delivery → Delivered`. Exceptions: `Payment failed`, `Cancelled`, `Refund initiated`, `Refunded`,
`Delivery failed`, `Return to origin`. Payment truth is the Razorpay webhook, never the browser redirect.
Custom items are non-returnable once production starts; the policy must say so.

## 4. Backend architecture (as scaffolded)

```
backend/app/
  main.py          create_app() factory, CORS, request-id middleware, error handlers
  api/v1/          versioned routers (prefix /api/v1); endpoints/health.py today
  core/            config.py (pydantic-settings), errors.py (error envelope), logging.py
  db/              session.py: async engine and per-request session dependency
  models/          SQLAlchemy Base with naming convention; no business tables yet
  schemas/         Pydantic models (health, error envelope)
  services/        business logic (health check today)
backend/alembic/   async migrations; URL from DATABASE_URL; no revisions yet
```

Deviation from the suggested layout: a `db/` package was added so connection management is
separate from `core/` configuration and from `models/`.

Error envelope for every error: `{"error": {"code", "message", "details"?, "request_id"?}}`.
Endpoints today: `GET /api/v1/health` (liveness), `GET /api/v1/health/ready` (database readiness,
503 when not configured or unreachable), docs at `/api/v1/docs` (disabled in production).

## 5. Revised milestone order

| # | Milestone | Status |
|---|---|---|
| 1 | Repo, tooling, brand assets, design system in code (Button, Navigation, ProductCard, layout), FastAPI foundation | **Done (Day 3)** |
| 2 | Database schema and migrations: catalogue, users, orders | Next |
| 3 | Catalogue API and minimal admin product management | |
| 4 | Storefront: Home, Shop, Category, Product pages | |
| 5 | Supabase Auth and optional customer accounts | |
| 6 | Cart, pincode serviceability, delivery estimate | |
| 7 | Checkout and Razorpay (prepaid only), webhooks | |
| 8 | Orders, tracking, notifications | |
| 9 | Shiprocket shipments and tracking sync | |
| 10 | Admin: orders, customers, dashboard | |
| 11 | Brand and legal pages, FAQ, contact | |
| 12 | **Custom bouquet enquiry form** (frontend, API, admin inbox) | |
| 13 | Raw material and finished goods inventory | |
| 14 | Bill of Materials and production management | |
| 15 | Suppliers and purchases | |
| 16 | **Interactive custom bouquet builder** | Needs 14 |
| 17 | Reports and analytics | |
| 18 | Reviews, wishlist, gift cards, search, corporate enquiry | |
| 19 | Hardening and launch checklist | |

## 6. Open items

- HSN codes and GST rates per product (confirm with your accountant).
- Production capacity and typical custom lead time (sets delivery estimates).
- Notification channels (email, WhatsApp, SMS) and provider.
- Final photography, a favicon set, vector logos and a horizontal logo lockup.
