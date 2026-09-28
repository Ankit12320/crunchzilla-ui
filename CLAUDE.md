# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js 16 — Not Standard Next.js

This project runs **Next.js 16.2.9** with **React 19**. APIs, conventions, and file structure have breaking changes from Next.js 14/15. Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (especially `01-app/` for App Router patterns). Heed deprecation notices.

- **`params` is a `Promise`** — must `await params` in page components and `generateMetadata`
- For fast client-side navigations, Suspense alone is insufficient — the route must also export `unstable_instant`. See `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.mdx`

## Commands

```bash
npm run dev       # Start dev server (next dev)
npm run build     # Production build (next build)
npm run start     # Serve production build
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

**Crunchzilla** — D2C storefront for traditional Indian staples (Tilkut, Makhana, Sattu). Routes: `/` (home), `/shop` (catalog), `/about` (our story), `/contact` (contact form + FAQ).

```
public/images/        → ALL static images (brand/, hero/, products/, pantry/) — no duplicate files
src/
  app/                → App Router routes; globals.css is only an import entry
  styles/             → theme.css (design tokens), base.css (element defaults), utilities.css (@utility classes)
  components/
    ui/               → shadcn/ui primitives
    common/           → Icon (Material Symbols), StarRating, SectionHeading, AddToCartButton, Toaster, WhatsAppFab (last two mounted in root layout)
    layout/           → Header, AnnouncementBar, NavLinks, MobileNav, CartButton, Footer
    home/             → one component per home section (+ ProductCard, FeedbackForm clients)
    about/            → our-story page sections (copy in constants/about.ts)
    contact/          → contact page: hero, WhatsApp desk, channels, ContactForm + FaqAccordion (clients), gifting banner
    shop/             → catalog page: value strip, header, CatalogBrowser (client filter/sort) + cards, HamperFeature
  constants/          → images.ts (image path map), site.ts (brand, contact info, nav, footer links), home.ts / shop.ts / about.ts / contact.ts (static copy, filters, badge styles)
  data/mock/          → products.json, testimonials.json, catalog.json, hamper.json
  lib/                → API service layer (products.ts, testimonials.ts, catalog.ts), catalog-filters.ts (client-safe), whatsapp.ts, utils.ts
  hooks/              → use-add-to-cart.ts (cart + toast)
  store/              → Zustand: cart-store.ts, toast-store.ts
  types/              → product.ts, catalog.ts, testimonial.ts, cart.ts
```

- Never hardcode image paths — add the file under `public/images/<group>/` and reference it via `IMAGES` in `src/constants/images.ts`.
- `src/lib/*` functions return mock JSON; swap internals for real `fetch()` calls (TODO comments) without changing signatures.
- Pages/layouts are server components; only interactive pieces are `"use client"`.
- Client components must not import `lib/` files that import mock JSON (it would ship in the bundle) — put pure helpers in a separate file like `catalog-filters.ts`.

### Styling

- **Tailwind CSS v4** — tokens defined in `src/styles/theme.css` via `@theme inline`
- Brand colors (`primary` #903f00, `secondary` #3c6843, `golden-sand`, `roasted-terracotta`, `botanical-forest`, `whatsapp-emerald`, …) plus MD3 surface/on-surface tokens
- Type scale utilities: `text-display`, `text-headline-{lg,md,sm}`, `text-title-{lg,md,sm}`, `text-body-{lg,md,sm}`, `text-label-{lg,md,sm}`
- Fonts: **Plus Jakarta Sans** (`font-sans`, default), **Playfair Display** (`font-display`, headings)
- Custom utilities: `container-page` (max-w-7xl + responsive padding), `top-header` / `scroll-mt-header` (clear the sticky header via `--header-height`), `icon-filled`, `no-scrollbar`
- **Adding a new `text-*` size token?** Also add it to the tailwind-merge config in `src/lib/utils.ts`, or `cn()` will strip it next to a text color.
- Icons: `<Icon name="..." />` wraps Material Symbols Outlined (font link in `app/layout.tsx`)
- **shadcn/ui** — `npx shadcn add <component>`; shadcn `--primary`/`--secondary` map to the brand colors

### Installed but Not Yet Wired

React Query, Axios (`src/providers/`, `src/service/api/` still empty). Both forms (home feedback, contact) validate with React Hook Form + Zod but only `console.log` on submit — TODOs mark where to POST.

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`).
