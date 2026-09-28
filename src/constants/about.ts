// Static copy for the About Our Story page.
// Class strings live here in full so Tailwind can detect them.

import { SITE } from "@/constants/site";

export const ABOUT_CREDIBILITY = [
  { value: SITE.happyHouseholds, label: "Homes Nourished", className: "text-primary" },
  { value: "100%", label: "Clean Pantry", className: "text-secondary" },
  { value: "Zero", label: "Palm Oil / Additives", className: "text-tertiary-container" },
  { value: "FSSAI", label: `Lic. #${SITE.fssaiLicense}`, className: "text-botanical-forest" },
] as const;

export const GENESIS_PARAGRAPHS = [
  "Growing up, our winters were heralded by the unmistakable aroma of toasted sesame and simmering raw cane jaggery drifting through the alleys of Gaya. Summers began with a cold, earthy tumbler of spiced Chana Sattu, giving laborers and students alike the endurance to power through demanding days.",
  "When we shifted to metro cities, we searched store shelves for those comforting pantry rituals. What we found instead were plastic packets loaded with maltodextrin, oxidized palm oils, artificial crunch agents, and sugar syrups passing off as genuine jaggery.",
] as const;

export const GENESIS_QUOTE =
  "We built Crunchzilla because we refused to accept that convenience requires giving up authenticity.";

export const GENESIS_CLOSING =
  "We established direct ties with local halwais, farmer clusters, and cottage roasting masters to preserve these time-honored preparations in their purest form. Every packet delivered to your doorstep carries the warm soul of an authentic Indian kitchen.";

export const GENESIS_CALLOUTS = [
  "Regional GI-Origin Staples",
  "Hand-Pounded Seasonal Batches",
  "Zero Industrial Shortcuts",
] as const;

export const ORIGIN_NOTES = {
  tilkut: {
    icon: "flare",
    title: "Winter Tradition",
    text: "Gaya tilkut pounded thin into delicate, light layers that melt immediately on the tongue.",
  },
  makhana: {
    icon: "bakery_dining",
    title: "Superfood Makhana",
    text: "Pond-harvested lotus seeds roasted dry over iron kaddais without palm oil.",
  },
} as const;

export const KITCHEN_PILLARS = [
  {
    icon: "local_fire_department",
    iconClass: "bg-golden-sand text-tertiary",
    title: "Rooted in Tradition",
    text: "We uphold generational roasting techniques, hot sand tumblers, and wooden mortar pounding instead of high-speed industrial presses that destroy subtle aromas.",
    footer: "Slow Batch Crafted",
    footerClass: "text-primary",
  },
  {
    icon: "vital_signs",
    iconClass: "bg-cardamom-light text-botanical-forest",
    title: "Uncompromised Nutrition",
    text: "Native superfoods loaded with natural plant-based protein, iron, calcium, and dietary fiber. No synthetic fortifiers or isolated chemicals — just natural food energy.",
    footer: "Nutrient Dense",
    footerClass: "text-secondary",
  },
  {
    icon: "agriculture",
    iconClass: "bg-primary-fixed text-primary",
    title: "Direct Farm Sourcing",
    text: "Procured directly from local growers in Darbhanga, Madhubani, and Bhagalpur. Fair remuneration keeps regional culinary ecosystems vibrant and flourishing.",
    footer: "Origin Traceability",
    footerClass: "text-primary",
  },
  {
    icon: "verified_user",
    iconClass: "bg-secondary-container text-on-secondary-container",
    title: "Clean Kitchen Promise",
    text: "Strict zero tolerance for cheap palm oil, artificial colors, bleaching agents, or synthetic shelf-life extenders. What you see on the label is purely what you consume.",
    footer: "Zero Preservatives",
    footerClass: "text-secondary",
  },
] as const;

export const CRAFT_PROCESSES = [
  {
    id: "tilkut",
    icon: "cookie",
    eyebrow: "Winter Delicacy Process",
    eyebrowClass: "text-roasted-terracotta",
    title: "The Legend of Gaya Gud Tilkut",
    text: "True Tilkut cannot be produced by automatic factory rollers. It demands master craftsmen who rhythmically beat warm, caramelised cane jaggery combined with premium toasted white sesame seeds.",
    stepClass: "bg-golden-sand text-tertiary",
    steps: [
      { title: "Dry Slow Roasting", text: "Sesame seeds are gently roasted until puffed and release their distinct nutty essential oils." },
      { title: "Pure Gud Syrup", text: "Native unrefined jaggery is boiled to a stringy, molten amber consistency." },
      { title: "Rhythmic Hand Beating", text: "Pounded repeatedly to trap micro air pockets, creating its fragile, melt-in-mouth texture." },
    ],
    cta: "Explore Crunchzilla Tilkut",
    ctaClass: "text-primary",
    image: "tilkutCraft",
    imageAlt: "Pounded golden brown Gaya Tilkut sweet round wafers",
    imageFirst: false,
  },
  {
    id: "makhana",
    icon: "spa",
    eyebrow: "Wetland Harvest Process",
    eyebrowClass: "text-botanical-forest",
    title: "Mithila's Original Lotus Superfood",
    text: "Harvested by skilled diver-farmers from the tranquil freshwater wetlands of Northern Bihar, our foxnuts are naturally dried under open sunlight before being cracked and slow-roasted to airy perfection.",
    stepClass: "bg-cardamom-light text-botanical-forest",
    steps: [
      { title: "Wetland Diving", text: "Mud-foraged black seeds gathered manually from freshwater pond bottoms." },
      { title: "Iron Kadai Popping", text: "Blistered rapidly on high-heat pans and struck by mallet to puff naturally." },
      { title: "Zero-Oil Roasting", text: "Crisped gently without deep frying or artificial spray coatings." },
    ],
    cta: "Shop Premium Makhana",
    ctaClass: "text-secondary",
    image: "makhanaBowl",
    imageAlt: "Warm freshly roasted makhana fox nuts in brass tableware",
    imageFirst: true,
  },
] as const;

export const FEATURED_STORY = {
  initials: "AK",
  name: "Aman Kumar",
  label: "Verified Buyer • Winter Batch Patron",
  quote:
    "I absolutely loved the gud tilkut. The taste instantly reminded me of my hometown — it felt just like having something made at home. It’s soft, light, and melts in the mouth beautifully. Being so far away, it was truly comforting to taste something so familiar.",
} as const;

export const COMMUNITY_VOICES = [
  {
    name: "Gugul Dash",
    quote: "The delivery was prompt and arrived next day. Makhana was crisp and Gud was exceptional.",
  },
  {
    name: "Anish",
    quote: "Tried Tilkut.. really crispy and different from normal market gajak. Authentic home taste.",
  },
] as const;
