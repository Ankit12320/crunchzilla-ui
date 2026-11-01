# Crunchzilla UI — Project Guide

This guide explains how the Crunchzilla storefront is built, where everything lives, and how to make common changes. Read sections 1–5 once to understand the project, then use **section 12, "How do I…?"** as a reference whenever you get a new requirement.

---

## Table of contents

1. [What this project is](#1-what-this-project-is)
2. [Getting started](#2-getting-started)
3. [Tech stack](#3-tech-stack)
4. [Folder structure](#4-folder-structure)
5. [How a page is put together](#5-how-a-page-is-put-together)
6. [Pages and their sections](#6-pages-and-their-sections)
7. [Site-wide settings (`site.ts`)](#7-site-wide-settings-sitets)
8. [Data layer: mock data, types and the API seam](#8-data-layer-mock-data-types-and-the-api-seam)
9. [Styling system](#9-styling-system)
10. [Images](#10-images)
11. [Interactivity: cart, toast, forms](#11-interactivity-cart-toast-forms)
12. [How do I…? (recipes)](#12-how-do-i-recipes)
13. [Rules and conventions](#13-rules-and-conventions)
14. [Known gaps and TODOs](#14-known-gaps-and-todos)
15. [Before you commit](#15-before-you-commit)

---

## 1. What this project is

Crunchzilla is a direct-to-customer storefront for traditional Indian staples: Tilkut, Makhana, Sattu, Katarni Chura, Basmati Poha and Jaggery.

| Route      | Page                | What it does                                                   |
| ---------- | ------------------- | -------------------------------------------------------------- |
| `/`        | Home                | Brand story, bestsellers, testimonials, feedback form          |
| `/shop`    | Buy / Shop All      | Full catalog with category filters, sorting, and a gift hamper |
| `/about`   | About Our Story     | Brand origin, kitchen pillars, craft process                   |
| `/contact` | Contact Us          | Contact channels, inquiry form, FAQ                            |

**Current state:** the UI is complete, but there is **no backend yet**. All product data comes from JSON files, the cart lives only in browser memory, and forms don't send anything. Orders happen through **WhatsApp links**. Section 14 lists everything that is not wired up yet.

---

## 2. Getting started

**Requirements:** Node.js 20.9 or newer, npm.

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:3000
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint       # ESLint
```

There is no test framework yet. `npm run build` is the main safety check: it fails on type errors.

> ⚠️ **This is Next.js 16 with React 19**, which differs from older Next.js tutorials. Before using an unfamiliar Next.js API, check the docs bundled at `node_modules/next/dist/docs/`. Two differences you will hit:
> - In dynamic routes, `params` is a **Promise**: write `const { slug } = await params;`.
> - Pages and layouts are **Server Components** by default (see section 13).

---

## 3. Tech stack

| Concern         | Tool                                        | Where it is used                                    |
| --------------- | ------------------------------------------- | --------------------------------------------------- |
| Framework       | Next.js 16 (App Router), React 19           | `src/app/`                                          |
| Language        | TypeScript (strict)                         | everywhere                                          |
| Styling         | Tailwind CSS v4                             | `src/styles/`, class names in components            |
| UI primitives   | shadcn/ui (Radix)                           | `src/components/ui/`; only `Sheet` (mobile menu) is used so far |
| Icons           | Google Material Symbols (font)              | `<Icon name="..." />` component                     |
| Fonts           | Plus Jakarta Sans (body), Playfair Display (headings) via `next/font` | `src/app/layout.tsx`     |
| Client state    | Zustand                                     | `src/store/` (cart, toast)                          |
| Forms           | React Hook Form + Zod                       | `FeedbackForm`, `ContactForm`                       |
| Class merging   | `clsx` + `tailwind-merge` via `cn()`        | `src/lib/utils.ts`                                  |
| Installed, unused | React Query, Axios                        | for when the backend API arrives                    |

---

## 4. Folder structure

```
crunchzilla-ui/
├── public/
│   └── images/                ← EVERY image file lives here, grouped by purpose
│       ├── brand/             logo.png
│       ├── hero/              tilkut-hero.gif, makhana-chai.jpg
│       ├── products/          tilkut, makhana, sattu, basmati-poha, jaggery-cubes
│       └── pantry/            sesame-seeds.jpg
│
├── src/
│   ├── app/                   ← ROUTES. One folder = one URL
│   │   ├── layout.tsx         root HTML shell: fonts, icon font, WhatsApp button, toast
│   │   ├── globals.css        CSS entry point: only imports, no styles of its own
│   │   ├── page.tsx           "/"         Home
│   │   ├── shop/page.tsx      "/shop"     Catalog
│   │   ├── about/page.tsx     "/about"    Our Story
│   │   └── contact/page.tsx   "/contact"  Contact Us
│   │
│   ├── components/            ← UI BUILDING BLOCKS
│   │   ├── layout/            Header, Footer, AnnouncementBar, NavLinks, MobileNav, CartButton
│   │   ├── common/            reused everywhere: Icon, StarRating, SectionHeading,
│   │   │                      AddToCartButton, Toaster, WhatsAppFab
│   │   ├── home/              sections used only by the Home page
│   │   ├── shop/              sections used only by the Shop page
│   │   ├── about/             sections used only by the About page
│   │   ├── contact/           sections used only by the Contact page
│   │   └── ui/                shadcn/ui primitives (don't hand-edit; regenerate via CLI)
│   │
│   ├── constants/             ← STATIC TEXT & CONFIG (edit these for copy changes)
│   │   ├── site.ts            brand name, phone, email, hours, nav links, footer links
│   │   ├── images.ts          map of every image path (the ONLY place paths are written)
│   │   ├── home.ts            Home page copy (pillars, stats, value pills)
│   │   ├── shop.ts            Shop filters, sort options, badge colours
│   │   ├── about.ts           About page copy
│   │   └── contact.ts         Contact page copy, inquiry topics, FAQs
│   │
│   ├── data/mock/             ← FAKE BACKEND DATA (JSON), until a real API exists
│   │   ├── products.json      Home page bestsellers (3 items)
│   │   ├── catalog.json       Shop page products (6 items)
│   │   ├── hamper.json        Shop page gift hamper
│   │   └── testimonials.json  Home page reviews
│   │
│   ├── lib/                   ← LOGIC & DATA ACCESS
│   │   ├── products.ts        fetchBestsellers()          → reads products.json
│   │   ├── catalog.ts         fetchCatalog(), fetchFeaturedHamper()
│   │   ├── testimonials.ts    fetchTestimonials()
│   │   ├── catalog-filters.ts filterAndSortCatalog()      (safe for client components)
│   │   ├── whatsapp.ts        whatsappLink(message?)      builds wa.me links
│   │   └── utils.ts           cn(): merges Tailwind classes (see section 9.5)
│   │
│   ├── types/                 ← TypeScript shapes of the data
│   │   ├── product.ts         home bestseller product
│   │   ├── catalog.ts         shop product, variants, hamper, sort type
│   │   ├── testimonial.ts
│   │   └── cart.ts
│   │
│   ├── store/                 ← GLOBAL CLIENT STATE (Zustand)
│   │   ├── cart-store.ts      cart items, addItem(), selectCartCount
│   │   └── toast-store.ts     the "Added to cart!" popup message
│   │
│   ├── hooks/
│   │   └── use-add-to-cart.ts adds to cart AND shows the toast (use this, not the store directly)
│   │
│   ├── styles/                ← DESIGN SYSTEM
│   │   ├── theme.css          colours, fonts, text sizes, radii (design tokens)
│   │   ├── base.css           default page/element styles
│   │   └── utilities.css      custom classes: container-page, top-header, icon-filled…
│   │
│   ├── providers/             (empty) future React context providers, e.g. React Query
│   └── service/api/           (empty) future HTTP client (Axios)
│
├── CLAUDE.md / AGENTS.md      notes for AI coding assistants
├── components.json            shadcn/ui configuration
├── next.config.ts             Next.js config (currently empty)
└── tsconfig.json              `@/*` is an alias for `src/*`
```

**Import alias:** always import with `@/…`, for example `import Icon from "@/components/common/Icon"`, not with relative `../../` paths.

---

## 5. How a page is put together

Every page follows the same pattern:

```
src/app/shop/page.tsx  (Server Component)
   │
   ├── 1. fetches data ──────►  src/lib/catalog.ts ──► src/data/mock/catalog.json
   │                             (later: a real API call; same function name)
   │
   ├── 2. renders  <Header />                       (src/components/layout)
   ├── 3. renders page sections, passing data as props:
   │        <ShopValueStrip />                        text from src/constants/shop.ts
   │        <CatalogHeader productCount={…} />
   │        <CatalogBrowser products={…} />  ◄── "use client": filtering and sorting happen in the browser
   │        <HamperFeature hamper={…} />
   └── 4. renders  <Footer />
```

The root layout, `src/app/layout.tsx`, wraps **every** page and adds:
- the fonts (Plus Jakarta Sans, Playfair Display) and the Material Symbols icon font,
- `<WhatsAppFab />`, the floating green "Order via WhatsApp" button,
- `<Toaster />`, the "Added … to your cart!" popup.

> **Note:** `Header` and `Footer` are **not** in the root layout. Each `page.tsx` renders them itself. When you add a new page, include both (see recipe 12.6).

### Where does each kind of content come from?

| Kind of content                                   | Lives in                      |
| ------------------------------------------------- | ----------------------------- |
| Brand facts (phone, email, hours, FSSAI, ₹499…)   | `src/constants/site.ts`       |
| Marketing copy for a page                         | `src/constants/<page>.ts`     |
| Products, prices, reviews (future backend data)   | `src/data/mock/*.json`        |
| Image file paths                                  | `src/constants/images.ts`     |
| Layout / markup                                   | `src/components/<page>/*.tsx` |
| Colours, fonts, text sizes                        | `src/styles/theme.css`        |

---

## 6. Pages and their sections

Sections are listed top to bottom. Components marked **(client)** have `"use client"` because they are interactive.

### Home: `src/app/page.tsx`
| Section                   | Component                           | Data / copy from                       |
| ------------------------- | ----------------------------------- | -------------------------------------- |
| Trust ribbon (FSSAI, rating) | `home/TrustRibbon`               | `site.ts`, `home.ts` (`TRUST_ITEMS`)   |
| Hero                      | `home/HeroSection`                  | `home.ts` (`HERO_VALUE_PILLS`), `images.ts` |
| Why Trust Us pillars      | `home/PillarsSection`               | `home.ts` (`BRAND_PILLARS`)            |
| Bestsellers + pantry banner | `home/BestsellersSection` → `ProductCard` **(client)**, `PantryBanner` | `products.json` via `lib/products.ts` |
| Makhana spotlight         | `home/MakhanaSpotlight`             | `home.ts` (`MAKHANA_STATS`)            |
| Testimonials              | `home/TestimonialsSection`          | `testimonials.json`                    |
| Feedback form             | `home/FeedbackSection` → `FeedbackForm` **(client)** | inline                |

### Shop: `src/app/shop/page.tsx`
| Section                   | Component                           | Data / copy from                       |
| ------------------------- | ----------------------------------- | -------------------------------------- |
| Value strip               | `shop/ShopValueStrip`               | `shop.ts` (`SHOP_VALUE_STRIP`)         |
| Breadcrumb, title, stats  | `shop/CatalogHeader`                | product count from `catalog.json`      |
| Sticky filter/sort bar + grid | `shop/CatalogBrowser` **(client)** → `CatalogFilterBar`, `CatalogProductCard` | `catalog.json`, `shop.ts` (`CATALOG_CATEGORIES`, `SORT_OPTIONS`) |
| Gift hamper               | `shop/HamperFeature` (+ `common/AddToCartButton`) | `hamper.json`            |

### About: `src/app/about/page.tsx`
| Section            | Component               | Copy from                                   |
| ------------------ | ----------------------- | ------------------------------------------- |
| Hero + stats       | `about/AboutHero`       | `about.ts` (`ABOUT_CREDIBILITY`)            |
| Origin story       | `about/OriginStory`     | `about.ts` (`GENESIS_*`, `ORIGIN_NOTES`)    |
| Four kitchen pillars | `about/KitchenPillars` | `about.ts` (`KITCHEN_PILLARS`)             |
| Craft process      | `about/CraftProcess`    | `about.ts` (`CRAFT_PROCESSES`)              |
| Featured review    | `about/CommunityLove`   | `about.ts` (`FEATURED_STORY`, `COMMUNITY_VOICES`) |
| Green ethos banner | `about/EthosCallout`    | inline                                      |

### Contact: `src/app/contact/page.tsx`
| Section            | Component                    | Copy from                           |
| ------------------ | ---------------------------- | ----------------------------------- |
| Hero + badges      | `contact/ContactHero`        | `contact.ts` (`CONTACT_TRUST_BADGES`) |
| WhatsApp desk card | `contact/WhatsAppDeskCard`   | `site.ts`                           |
| Email/phone/location/social | `contact/ContactChannels` | `site.ts`                       |
| Purity guarantee   | `contact/PurityPledge`       | inline                              |
| Inquiry form       | `contact/ContactForm` **(client)** | `contact.ts` (`INQUIRY_CATEGORIES`) |
| Bulk gifting banner | `contact/GiftingBanner`     | inline                              |
| FAQ accordion      | `contact/FaqAccordion` **(client)** | `contact.ts` (`FAQS`)        |

### On every page
| Piece                 | Component                                                              |
| --------------------- | ---------------------------------------------------------------------- |
| Top announcement bar  | `layout/AnnouncementBar` (text from `ANNOUNCEMENTS` in `site.ts`)      |
| Header                | `layout/Header` → `NavLinks` **(client)**, `CartButton` **(client)**, `MobileNav` **(client)** |
| Footer                | `layout/Footer` (links from `NAV_LINKS`, `FOOTER_CATEGORIES`, `LEGAL_LINKS`) |
| Floating WhatsApp     | `common/WhatsAppFab` (in root layout)                                  |
| Toast popup           | `common/Toaster` **(client)** (in root layout)                         |

---

## 7. Site-wide settings (`site.ts`)

`src/constants/site.ts` is the **single source of truth** for brand facts. Other files read from it, so **change a value here and every page updates**. Never type these values directly into a component.

| Key                  | Example                        | Shown in                                           |
| -------------------- | ------------------------------ | -------------------------------------------------- |
| `name`, `legalName`, `tagline` | Crunchzilla…         | header, footer, page titles, copy                  |
| `whatsappNumber`     | `917856019631` (no `+` or spaces) | every WhatsApp link, `tel:` links              |
| `phoneDisplay`       | `+91 7856019631`               | visible phone number everywhere                    |
| `email`              | `crunchzilla02@gmail.com`      | footer, contact page                               |
| `supportHours`       | `24*7`                         | footer, WhatsApp card, hotline, contact badge, FAQ |
| `freeShippingAbove`  | `499`                          | announcement bar, contact badge, FAQ               |
| `fssaiLicense`       | `21225192003493`               | trust ribbon, footer, contact, about               |
| `rating`, `happyHouseholds` | `4.9/5`, `500+`         | trust ribbon, hero, shop header, about stats       |
| `instagramUrl`, `facebookUrl` | …                     | contact page                                       |
| `feedbackFormUrl`    | Google Form link               | home feedback, contact form                        |

The same file also holds:
- `NAV_LINKS`: header menu, mobile menu and footer "Quick Navigation"
- `ANNOUNCEMENTS`: the brown bar at the very top
- `FOOTER_CATEGORIES`, `LEGAL_LINKS`: footer lists

---

## 8. Data layer: mock data, types and the API seam

### The three layers

```
types/catalog.ts          defines the SHAPE:   interface CatalogProduct { name; price; … }
data/mock/catalog.json    holds the VALUES:    [{ "name": "Gaya Tilkut", … }]
lib/catalog.ts            the ACCESS POINT:    fetchCatalog(): Promise<CatalogProduct[]>
```

Pages **only** call the `lib/` functions and never import JSON directly. The `lib/` functions are `async` and already return Promises, so a real API can replace the mock data without changing any page:

```ts
// src/lib/catalog.ts: today
export async function fetchCatalog(): Promise<CatalogProduct[]> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/products`);
  return catalogList as CatalogProduct[];
}

// later
export async function fetchCatalog(): Promise<CatalogProduct[]> {
  const res = await fetch(`${process.env.API_BASE}/products`);
  return res.json();
}
```

### Two product datasets (important)

| File                 | Used by               | Type                       |
| -------------------- | --------------------- | -------------------------- |
| `products.json`      | Home "Bestsellers"    | `Product` (`types/product.ts`) |
| `catalog.json`       | Shop page             | `CatalogProduct` (`types/catalog.ts`) |

The two pages were designed with different card layouts, so they use different data shapes. **If you change a price or name, update both files** until the backend unifies them.

### Shop product fields (`catalog.json`)

```jsonc
{
  "slug": "gaya-tilkut",               // unique id, used as cart key
  "name": "Gaya Tilkut (Handmade Gud)",
  "category": "tilkut",                // must be one of: tilkut | makhana | sattu | chura | jaggery
  "eyebrow": "Seasonal Delicacy",      // small green label above the name
  "description": "…",                  // clipped to 2 lines on the card
  "image": "tilkut",                   // a KEY of IMAGES.catalog in constants/images.ts
  "imageAlt": "…",
  "primaryBadge":   { "icon": "stars", "label": "Bestseller", "tone": "amber" },
  "secondaryBadge": { "label": "Gaya Specialty", "tone": "cardamom" },
  "highlight": { "left": "Winter Festive Special", "right": "100% Sesame & Gud" },
  "rating": 4.9, "reviewCount": 142,
  "popularity": 100,                   // 0–100, used by "Bestsellers First" sort
  "variantLabel": "Select Weight",
  "variants": [
    { "id": "400g", "label": "500g", "mrp": 299 },  // mrp = struck-through price (optional)
    { "id": "800g", "label": "800g Twin Pack", "price": 469 }
  ]
}
```

Allowed `tone` values are defined in `types/catalog.ts` and map to colours in `constants/shop.ts`:
- **primary badge:** `amber | forest | terracotta | secondary | neutral`
- **secondary badge:** `cardamom | sand`

---

## 9. Styling system

### 9.1 Files

```
src/app/globals.css     ← entry: imports Tailwind, then the three files below. Add NO styles here.
src/styles/theme.css    ← design tokens (colours, fonts, text sizes, radius, header height)
src/styles/base.css     ← body/html defaults
src/styles/utilities.css← custom reusable classes
```

### 9.2 Colours

Colours are defined once in `theme.css` and used as Tailwind classes: `bg-<name>`, `text-<name>`, `border-<name>`.

| Token                  | Hex       | Typical use                          |
| ---------------------- | --------- | ------------------------------------ |
| `primary`              | `#903f00` | headings, main brand brown           |
| `roasted-terracotta`   | `#b45309` | main buttons, active chips           |
| `secondary`            | `#3c6843` | green labels and accents             |
| `botanical-forest`     | `#2e5a36` | dark green badges, ethos banner      |
| `golden-sand`          | `#faf4de` | soft yellow pills and strips         |
| `cardamom-light`       | `#e8f0ea` | soft green pills                     |
| `warm-amber`           | `#d97706` | stars, "Bestseller" badge            |
| `whatsapp-emerald`     | `#25d366` | every WhatsApp button                |
| `surface`, `surface-container-low/…/highest` | warm off-whites | page and card backgrounds |
| `on-surface`, `on-surface-variant` | dark browns | body text, secondary text      |
| `pure-parchment`       | `#ffffff` | white cards, text on dark buttons    |

Opacity works as usual, for example `bg-primary/10` or `text-botanical-forest/80`.

### 9.3 Typography

**Fonts**
- `font-sans` (default): Plus Jakarta Sans, for body text
- `font-display`: Playfair Display, for headings. Add it explicitly to every heading.

**Text sizes:** use these instead of `text-sm`, `text-xl` and so on. Each one sets size, line-height, letter-spacing and weight together.

| Class                     | Size   | Use for                          |
| ------------------------- | ------ | -------------------------------- |
| `text-display`            | 56px   | biggest hero headline            |
| `text-display-mobile`     | 36px   | hero headline on phones          |
| `text-headline-lg`        | 40px   | page/section titles              |
| `text-headline-lg-mobile` | 28px   | section titles on phones         |
| `text-headline-md`        | 30px   | sub-section titles               |
| `text-headline-sm`        | 22px   | card titles, prices              |
| `text-title-lg/md/sm`     | 20/18/16px | bold small titles, buttons   |
| `text-body-lg/md/sm`      | 18/15/13px | paragraphs                   |
| `text-label-lg/md/sm`     | 14/12/11px | **bold** labels, chips, eyebrows (often with `uppercase`) |

Typical responsive heading: `font-display text-headline-lg-mobile md:text-headline-lg`.

### 9.4 Custom utility classes (`utilities.css`)

| Class               | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `container-page`    | centred max-width (1280px) wrapper with responsive side padding. Use it inside every section. |
| `top-header`        | `top:` offset equal to the sticky header height (for sticky bars) |
| `scroll-mt-header`  | anchor links (`#bestsellers`) stop below the sticky header      |
| `icon-filled`       | filled version of a Material icon (the `<Icon filled />` prop uses it) |
| `no-scrollbar`      | hides scrollbars on horizontally scrolling rows                 |

The header height is the CSS variable `--header-height` in `theme.css` (announcement bar + nav row). **If you change the header's height, update that variable.**

### 9.5 ⚠️ The `cn()` rule

`cn()` in `src/lib/utils.ts` combines class names and resolves conflicts. It has to be told about our custom text sizes, or it mistakes them for colours and **silently deletes** them. For example, `cn("text-label-md", "text-primary")` would drop `text-label-md`.

**If you add a new `--text-*` size to `theme.css`, also add its name to the list in `src/lib/utils.ts`.**

### 9.6 Icons

The site uses Google Material Symbols. Browse icon names at <https://fonts.google.com/icons>.

```tsx
import Icon from "@/components/common/Icon";

<Icon name="shopping_bag" className="text-[18px] text-primary" />   // size via text-[Npx]
<Icon name="star" filled />                                           // filled variant
```

Icons are decorative (`aria-hidden`). If a button contains only an icon, give the button an `aria-label`.

---

## 10. Images

Rules:
1. **Every image file goes in `public/images/<group>/`** (`brand`, `hero`, `products`, `pantry`, or a new group).
2. **Every path is declared once in `src/constants/images.ts`.** Components use `IMAGES.products.tilkut`, never a hard-coded `"/images/..."` string.
3. **Don't store the same image twice.** If two sections show the same picture, point both keys at one file. `IMAGES.catalog` and `IMAGES.about` do this already.
4. Use Next.js `<Image>` with `fill` + `sizes`, or with `width`/`height`. Add `unoptimized` for animated `.gif` files.

```ts
// src/constants/images.ts (simplified)
const products = {
  tilkut: "/images/products/tilkut.jpg",
  makhana: "/images/products/makhana.jpg",
};
export const IMAGES = {
  products,
  catalog: { tilkut: hero.tilkut, makhana: products.makhana },  // reuse, no duplicates
};
```

---

## 11. Interactivity: cart, toast, forms

### Cart
- The cart is a **Zustand store** in `src/store/cart-store.ts`. It is in memory only, so it **resets on page reload**.
- To add something, **always use the hook**, which also shows the toast:
  ```tsx
  const addToCart = useAddToCart();
  addToCart({ slug, name, price, variantId, variantLabel });
  ```
- In a **Server Component**, use `<AddToCartButton item={…}>…</AddToCartButton>` from `common/`. You can't call hooks there.
- The header badge (`layout/CartButton`) reads the count with `useCartStore(selectCartCount)`.

### Toast
`useToastStore().show("message")` shows the dark popup at the bottom for 2.5 seconds. It is rendered once, in the root layout.

### Forms
Both forms (`home/FeedbackForm`, `contact/ContactForm`) follow the same pattern:

```tsx
const schema = z.object({ name: z.string().min(1, "Please enter your name"), … }); // Zod = validation rules
const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

const onSubmit = async (values) => {
  // TODO: POST to API when the backend is ready
  console.log(values);
};
```

To add a field: add it to the Zod schema, add an input with `{...register("fieldName")}`, and show `errors.fieldName?.message`.

### WhatsApp links
Always build them with the helper, which reads the number from `site.ts`:
```ts
whatsappLink()                                   // plain chat
whatsappLink(`Hi, I want to order ${name}`)      // pre-filled message (auto-encoded)
```

---

## 12. How do I…? (recipes)

### 12.1 Change phone number, email, hours, shipping threshold, FSSAI…
Edit `src/constants/site.ts`. Nothing else needs to change.

### 12.2 Change some wording on a page
1. Find the page's section in the tables in section 6.
2. If the text comes from `constants/<page>.ts`, edit it there. Otherwise it's written directly in the component file.

### 12.3 Add a new product to the Shop
1. Put the photo in `public/images/products/my-product.jpg`.
2. In `src/constants/images.ts`, add `myProduct: "/images/products/my-product.jpg"` to `products`, and add `myProduct: products.myProduct` to `catalog`.
3. Add an object to `src/data/mock/catalog.json` (fields in section 8). Set `"image": "myProduct"`.
4. If it's a **new category**:
   - add the value to `CatalogCategory` in `src/types/catalog.ts`,
   - add a filter chip to `CATALOG_CATEGORIES` in `src/constants/shop.ts`.
5. Run `npm run build`. TypeScript flags any wrong image key or category.

The product count in the shop header and the "All Products (N)" chip update automatically.

### 12.4 Change which products appear as Home bestsellers
Edit `src/data/mock/products.json`. Its `image` field is a key of `IMAGES.products`.

### 12.5 Change a price
Update **both** `catalog.json` (the right variant's `price` / `mrp`) **and** `products.json` if the product is also a home bestseller. Check the hamper price in `hamper.json` if relevant.

### 12.6 Add a new page, e.g. `/faq`
1. Create `src/app/faq/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import Header from "@/components/layout/Header";
   import Footer from "@/components/layout/Footer";
   import { SITE } from "@/constants/site";

   export const metadata: Metadata = { title: `FAQ | ${SITE.name}`, description: "…" };

   export default function FaqPage() {
     return (
       <>
         <Header />
         <main className="flex w-full flex-col bg-surface">
           {/* sections from src/components/faq/ */}
         </main>
         <Footer />
       </>
     );
   }
   ```
2. Put the page's sections in `src/components/faq/` and its copy in `src/constants/faq.ts`.
3. To show it in the menu, add `{ label: "FAQ", href: "/faq" }` to `NAV_LINKS` in `site.ts`. The header, mobile menu and footer all update, and the active highlight works automatically.
4. **Check the header still fits** at 1024px and 1280px widths. It is tight with 4 links.

### 12.7 Add a new section to an existing page
1. Create `src/components/<page>/MySection.tsx`, a Server Component (no `"use client"`) unless it needs clicks or state.
2. Wrap its content like this:
   ```tsx
   <section className="w-full bg-surface py-16">
     <div className="container-page">…</div>
   </section>
   ```
3. Import it in `src/app/<page>/page.tsx` in the right order.
4. For a centred eyebrow + title + description header, reuse `common/SectionHeading`.

### 12.8 Add or change a colour / text size
- **Colour:** add `--color-my-colour: #hex;` in the `@theme inline` block of `src/styles/theme.css`. You can then use `bg-my-colour`, `text-my-colour` and so on.
- **Text size:** add `--text-my-size`, plus optional `--line-height`, `--letter-spacing` and `--font-weight` variants, in `theme.css`, **and** add `"my-size"` to the list in `src/lib/utils.ts` (section 9.5).

### 12.9 Add a FAQ / inquiry topic / nav link / footer link
| What                 | File                     | Constant               |
| -------------------- | ------------------------ | ---------------------- |
| FAQ question         | `constants/contact.ts`   | `FAQS`                 |
| Contact form topic   | `constants/contact.ts`   | `INQUIRY_CATEGORIES`   |
| Header/footer nav    | `constants/site.ts`      | `NAV_LINKS`            |
| Footer product list  | `constants/site.ts`      | `FOOTER_CATEGORIES`    |
| Shop filter chip     | `constants/shop.ts`      | `CATALOG_CATEGORIES`   |
| Shop sort option     | `constants/shop.ts` + `lib/catalog-filters.ts` | `SORT_OPTIONS` + a new `case` |

### 12.10 Add a shadcn/ui component
```bash
npx shadcn add accordion      # creates src/components/ui/accordion.tsx
```
shadcn's `primary` / `secondary` colours are already mapped to the brand colours.

### 12.11 Connect the real backend
1. Put the base URL in `.env.local`, e.g. `API_BASE=https://api.example.com`. `.env*` files are git-ignored.
2. Replace the body of each `fetch…` function in `src/lib/*.ts` (look for the `TODO` comments). Keep the function names and return types.
3. For forms, replace the `console.log(values)` in `onSubmit` with a `fetch(…, { method: "POST" })`, or an Axios client in `src/service/api/`.
4. If client components need to fetch or refetch, add a React Query `QueryClientProvider` in `src/providers/` and wrap `{children}` with it in `app/layout.tsx`.
5. Once the cart comes from the server, remove the mock JSON imports.

---

## 13. Rules and conventions

**Server vs Client Components**
- Everything is a **Server Component** by default. That is faster, and the code isn't shipped to the browser.
- Add `"use client"` at the top **only** when a component uses `useState`, `useEffect`, event handlers (`onClick`), Zustand hooks or browser APIs.
- Keep client components small: make the interactive part a client "island" (like `ProductCard`, `AddToCartButton`) and leave the rest of the section on the server.
- A client component must **not** import a `lib/` file that imports mock JSON, because the whole JSON would ship to the browser. Put pure helpers in their own file instead, as `lib/catalog-filters.ts` does.

**Naming and files**
- Components: `PascalCase.tsx`, one component per file, default export.
- Hooks: `use-something.ts` in `src/hooks/`. Stores: `something-store.ts` in `src/store/`.
- Constants: `UPPER_SNAKE_CASE`, in `src/constants/<page>.ts`.
- Page-specific components go in `components/<page>/`. Move them to `common/` once a second page needs them.

**Styling**
- Use theme tokens (`bg-primary`, `text-body-md`), not raw hex values or `text-sm`.
- Use `cn()` when combining conditional classes.
- Write full class names; don't build them by string concatenation such as `"text-" + colour`, because Tailwind can't detect those. The `TONE_*` maps in `constants/` show the correct pattern.

**Accessibility**
- Icon-only buttons need `aria-label`.
- Toggle buttons use `aria-pressed`; single-choice chips use `role="radio"` + `aria-checked`.
- External links use `target="_blank" rel="noopener noreferrer"`.

**Mobile**
- Build mobile-first: base classes for phones, then `sm:` `md:` `lg:` `xl:` for larger screens.
- Check each change at roughly 390px, 768px, 1024px and 1440px widths.

---

## 14. Known gaps and TODOs

| Area                  | Current behaviour                                                           |
| --------------------- | --------------------------------------------------------------------------- |
| Backend               | None. All data comes from `src/data/mock/*.json`.                           |
| Cart                  | In memory only, reset on reload. No cart page or checkout; the cart icon does nothing on click. |
| Ordering              | Done through WhatsApp links ("Buy", "Quick Buy", "Order on WhatsApp").      |
| Search button         | Visual only.                                                                |
| Profile (person) icon | Visual only. No login.                                                      |
| Wishlist hearts (shop) | Toggle locally per card; not saved.                                        |
| Forms                 | Validate, then only `console.log`. Nothing is sent (`TODO` in `onSubmit`).  |
| Legal links           | Privacy / Terms / Shipping all point to `/contact` (no dedicated pages).    |
| Footer categories     | All link to `/shop`; the shop does not pre-select a category from the URL.  |
| Product data          | Duplicated between `products.json` and `catalog.json` (section 8).          |
| Variant prices        | Only the first variant of each shop product has an `mrp` (struck-through price). |
| Lint                  | 2 known warnings in `app/layout.tsx` about the icon-font `<link>`; they are intentional. |
| Tests                 | No test framework configured.                                               |

---

## 15. Before you commit

```bash
npm run lint     # expect 0 errors (2 known warnings)
npm run build    # must succeed; this is the type check
```

Then open the pages you changed in the browser and check them at phone and desktop widths.
