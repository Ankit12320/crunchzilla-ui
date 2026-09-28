// Single source of truth for every static image path (files live in /public/images).

const brand = {
  logo: "/images/brand/logo.png",
} as const;

const hero = {
  tilkut: "/images/hero/tilkut-hero.gif",
  makhanaChai: "/images/hero/makhana-chai.jpg",
} as const;

const products = {
  tilkut: "/images/products/tilkut.jpg",
  makhana: "/images/products/makhana.jpg",
  sattu: "/images/products/sattu.jpg",
  basmatiPoha: "/images/products/basmati-poha.jpg",
  jaggeryCubes: "/images/products/jaggery-cubes.jpg",
} as const;

const pantry = {
  sesameSeeds: "/images/pantry/sesame-seeds.jpg",
} as const;

export const IMAGES = {
  brand,
  hero,
  products,
  pantry,
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
