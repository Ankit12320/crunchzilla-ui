// Static marketing copy for the home page.

export type Tone = "primary" | "secondary" | "tangerine" | "amber" | "forest";

export const TRUST_ITEMS = [
  { icon: "local_shipping", label: "Fast Pan-India Dispatch" },
  { icon: "psychiatry", label: "100% Homemade Taste" },
  { icon: "eco", label: "Zero Preservatives & Palm Oil" },
] as const;

export const HERO_VALUE_PILLS: { icon: string; label: string; tone: Tone }[] = [
  { icon: "temp_preferences_custom", label: "Rooted in Tradition", tone: "primary" },
  { icon: "spa", label: "Naturally Nutritious", tone: "secondary" },
  { icon: "restaurant_menu", label: "Wholesome & Versatile", tone: "tangerine" },
  { icon: "check_circle", label: "Pure & Honest", tone: "secondary" },
];

export const HERO_CUSTOMER_INITIALS = ["AK", "GD", "VA"] as const;

export const BRAND_PILLARS: {
  icon: string;
  title: string;
  description: string;
  iconTone: Tone;
  titleTone: Tone;
}[] = [
  {
    icon: "ramen_dining",
    title: "Rooted in Tradition",
    description:
      "Authentic Indian staples like Tilkut, Sattu, Poha, and Jaggery crafted with regional mastery.",
    iconTone: "primary",
    titleTone: "primary",
  },
  {
    icon: "fitness_center",
    title: "Naturally Nutritious",
    description:
      "Rich in protein, fiber, and essential minerals naturally present in native seeds and pulses to fuel daily vitality.",
    iconTone: "secondary",
    titleTone: "secondary",
  },
  {
    icon: "local_cafe",
    title: "Wholesome & Versatile",
    description:
      "From tea-time snacking on roasted Makhana to nutritious powerhouse meals made with Sattu and Katarni Poha.",
    iconTone: "amber",
    titleTone: "primary",
  },
  {
    icon: "clean_hands",
    title: "Pure & Honest",
    description:
      "Made with simple, clean pantry ingredients — nothing artificial, no palm oil, and zero synthetic fillers.",
    iconTone: "forest",
    titleTone: "secondary",
  },
];

export const MAKHANA_STATS: { value: string; label: string; tone: Tone }[] = [
  { value: "9.7g", label: "High Protein", tone: "primary" },
  { value: "60mg", label: "Calcium Rich", tone: "secondary" },
  { value: "100%", label: "Gluten-Free", tone: "amber" },
  { value: "0%", label: "Cholesterol", tone: "forest" },
];

export const TONE_TEXT: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tangerine: "text-spiced-tangerine",
  amber: "text-warm-amber",
  forest: "text-botanical-forest",
};

export const TONE_SOFT_BG: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tangerine: "bg-spiced-tangerine/10 text-spiced-tangerine",
  amber: "bg-warm-amber/10 text-warm-amber",
  forest: "bg-botanical-forest/10 text-botanical-forest",
};
