// Single source of truth for every static image path (files live in /public/images).

const brand = {
  logo: "/images/brand/logo.png",
  stall: "/images/brand/crunchzilla-stall.jpg",
} as const;

const hero = {
  tilkut: "/images/hero/tilkut-hero.gif",
  makhanaChai: "/images/hero/makhana-chai.jpg",
  makhanaHeroAi: "/images/hero/makhana-hero-ai.jpg",
} as const;

const products = {
  tilkut: "/images/products/tilkut.jpg",
  tilkutStackBoxes: "/images/products/tilkut-stack-boxes.jpg",
  tilkutBoxPacks: "/images/products/tilkut-box-packs.jpg",
  tilkutHamperCollection: "/images/products/tilkut-hamper-collection.jpg",
  tilkutDeliveryBoxes: "/images/products/tilkut-delivery-boxes.jpg",
  makhana: "/images/products/makhana.jpg",
  makhanaPackets: "/images/products/makhana-packets-bowl.jpg",
  sattu: "/images/products/sattu.jpg",
  basmatiPoha: "/images/products/basmati-poha.jpg",
  jaggeryCubes: "/images/products/jaggery-cubes.jpg",
} as const;

const pantry = {
  sesameSeeds: "/images/pantry/sesame-seeds.jpg",
} as const;

const effects = {
  makhana1: "/images/effects/makhana-1.webp",
  makhana2: "/images/effects/makhana-2.webp",
  makhana3: "/images/effects/makhana-3.webp",
  makhana4: "/images/effects/makhana-4.webp",
} as const;

const testimonials = {
  gugulDash: "/images/testimonials/gugul-dash-review.webp",
} as const;

export const IMAGES = {
  brand,
  hero,
  products,
  pantry,
  effects,
  testimonials,
  // Shop catalog card images (reuse the files above — no duplicates on disk)
  catalog: {
    tilkut: hero.tilkut,
    makhana: products.makhana,
    sattu: products.sattu,
    katarniChura: pantry.sesameSeeds,
    basmatiPoha: products.basmatiPoha,
    jaggeryCubes: products.jaggeryCubes,
  },
  // About page (reuses existing files)
  about: {
    heroSeeds: hero.tilkut,
    tilkutCraft: pantry.sesameSeeds,
    makhanaBowl: hero.makhanaChai,
  },
} as const;
