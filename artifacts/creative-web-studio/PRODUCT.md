# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small business owners in the UK (with specific local SEO targeting toward Crewe) who either have no website or have an outdated, slow, or poorly designed one that is actively costing them customers. They are price-sensitive, want to move fast, and are evaluating whether a professional web presence is worth the spend.

## Product Purpose

Creative Web Studio Experts builds fully custom, mobile-ready, SEO-optimised websites for small businesses, delivered fast (48–72 hour turnaround) and affordably (from £199). The site's job is to convert a visiting small-business owner into a paying customer via one of three fixed packages, paid up front through Stripe.

## Positioning

Most web design agencies take weeks and charge thousands. Creative Web Studio Experts delivers professional, conversion-focused, SEO-optimised sites in 48–72 hours starting at £199 — speed and affordability without cutting quality, positioned against slow/expensive traditional agencies rather than DIY site builders.

## Operating Context

- Three fixed one-time-payment packages, defined in `artifacts/api-server/src/routes/checkout.ts`:
  - Basic Web Design Package — £199
  - Professional Web Design Package — £399
  - E-Commerce Web Design Package — £599
- Payment via Stripe Checkout (one-time payment, GBP), with success/cancel redirect pages already built (`PaymentSuccess`, `PaymentCancel`).
- Lead/payment events notify a Make.com webhook (`webhookMake.ts`) for downstream automation.
- Contact form backed by `routes/contact.ts`.
- SEO-driven content marketing via a Markdown-based blog (`artifacts/api-server/blog-posts/`), authored as "Creative Web Studio Experts", targeting keywords like "web design Crewe", "affordable web design UK", "small business website".
- Legal pages (Privacy Policy, Terms of Service) already exist as routes.

## Capabilities and Constraints

- Frontend: React + Vite SPA (`artifacts/creative-web-studio`), wouter routing, shadcn/ui component library, Tailwind.
- Backend: Express 5 API (`artifacts/api-server`), Postgres + Drizzle ORM, blog rendered from Markdown via `marked`.
- Existing routes to preserve: `/`, `/blog`, `/payment-success`, `/payment-cancel`, `/privacy-policy`, `/terms-of-service`.
- Checkout is a one-time payment per package, not a subscription — any pricing/plan UI must reflect "pay once," not recurring billing.
- The homepage currently contains unrelated content from a discarded "Agentic Hire" (AI recruitment SaaS) pivot — this is stale and superseded by this record; it is not part of the product going forward.

## Brand Commitments

- Business name: **Creative Web Studio Experts** (confirmed, unchanged).
- Existing logo asset: `attached_assets/hf_20260627_191330_..._1782595683196.png` — navy background, blue/white circuit-and-"W" mark, "Creative Web Studio Experts" wordmark with "EXPERTS" in blue.
- Existing blog content (4 posts) is real, current, and on-brand; keep its voice (direct, small-business-owner-facing, UK-specific) as reference for future copy.

## Brand Commitments (visual)

- Pinned direction: bold, Awwwards-caliber design-agency aesthetic — dark canvas, huge experimental type, real motion/interaction (shader-like backgrounds, magnetic cursor effects, 3D tilt, marquees), not a quiet/print-inspired local-craft metaphor. The homepage doubles as a portfolio piece: it must itself prove the studio's design competency, not just describe it.

## Evidence on Hand

- No real testimonials, client case studies, portfolio pieces, or review scores exist yet. Do not fabricate any of these — future design/content work must either omit social proof or clearly mark placeholders as placeholders until real evidence is supplied.
- Real assets that do exist: the logo, 4 published blog posts, and working Stripe checkout for the three named packages.

## Product Principles

- Speed and affordability are the product's actual mechanism, not just marketing lines — copy and UX should make the 48–72hr turnaround and from-£199 pricing concrete and credible, not vague.
- Never invent proof. With zero testimonials/case studies on hand, the design must earn trust through clarity, speed-of-response, and transparent pricing rather than fabricated social proof.
- One-time payment, not subscription — pricing UI, copy, and CTAs must never imply recurring billing.
- UK small-business owner is the reader: plain, direct, locally-grounded language (as in the existing blog posts) over generic SaaS marketing tone.
