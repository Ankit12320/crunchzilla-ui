import Image from "next/image";
import Icon from "@/components/common/Icon";
import {
  HERO_CUSTOMER_INITIALS,
  HERO_VALUE_PILLS,
  TONE_TEXT,
} from "@/constants/home";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

const INITIAL_COLORS = [
  "bg-primary-fixed text-on-primary-fixed",
  "bg-secondary-fixed text-on-secondary-fixed",
  "bg-tertiary-fixed text-on-tertiary-fixed",
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface py-12 md:py-20 lg:py-24 border-b border-surface-container">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,_rgba(242,201,76,0.14),_transparent_70%)] blur-2xl" />

      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 relative z-10">
        {/* Left: storytelling & CTAs */}
        <div className="z-10 flex flex-col items-start gap-6 lg:col-span-7">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-golden-sand/70 border border-amber-900/10 p-1.5 shadow-xs backdrop-blur-xs">
            <span className="rounded-full bg-primary px-3 py-1 text-label-sm uppercase tracking-wider text-on-primary font-bold shadow-xs">
              Authentic Bihar Heritage
            </span>
            <span className="px-2 text-label-sm font-medium text-on-surface-variant">
              Gaya • Mithila • Darbhanga • Bengaluru Express Delivery
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-display-mobile font-bold tracking-tight text-primary md:text-display">
              Authentic & Healthy Food Products from Bihar
            </h1>
            <p className="font-display text-headline-sm italic text-on-surface-variant">
              Traditional recipes made with care, authenticity, and everyday goodness.
            </p>
          </div>

          <p className="max-w-xl text-body-lg text-on-surface leading-relaxed">
            From winter festive Gaya Tilkut to daily roasted Chana Sattu and jumbo Mithila Makhana, {SITE.brandName} brings you
            Bihar’s authentic regional food delicacies fresh, chemical-free, and crafted with zero palm oil. Delivered fresh across Bangalore, Bihar, and all over India.
          </p>

          <div className="grid w-full grid-cols-2 gap-2.5 pt-2 sm:grid-cols-4">
            {HERO_VALUE_PILLS.map(({ icon, label, tone }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-pure-parchment/90 border border-amber-900/5 px-3 py-2.5 shadow-premium-sm transition-all duration-200 hover:shadow-premium-md hover:-translate-y-0.5"
              >
                <Icon
                  name={icon}
                  className={`text-[18px] ${TONE_TEXT[tone]}`}
                />
                <span className="text-label-sm font-semibold text-on-surface">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col sm:flex-row sm:flex-wrap items-center gap-4 pt-4">
            <a
              href="#bestsellers"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-roasted-terracotta px-8 py-3.5 text-title-sm font-bold text-on-primary shadow-premium-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-premium-hover active:scale-95"
            >
              Explore Our Range
              <Icon name="arrow_downward" className="text-[18px]" />
            </a>
            <a
              href={whatsappLink(
                `Hi ${SITE.name}, I would like to order wholesome snacks.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-6 py-3.5 text-title-sm font-bold text-pure-parchment shadow-premium-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-premium-hover active:scale-95"
            >
              <Icon name="chat" className="text-[20px]" />
              Order on WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-3 pt-2 text-body-sm text-on-surface-variant">
            <div className="flex -space-x-2">
              {HERO_CUSTOMER_INITIALS.map((initials, i) => (
                <span
                  key={initials}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ring-2 ring-surface ${INITIAL_COLORS[i]}`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <p>
              Loved by <strong>{SITE.happyHouseholds} homes</strong> seeking
              pure hometown nostalgia.
            </p>
          </div>
        </div>

        {/* Right: visual stage */}
        <div className="relative flex justify-center lg:col-span-5">
          <div className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 rounded-full bg-warm-amber/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-60 w-60 rounded-full bg-secondary/10 blur-2xl" />

          <div className="relative w-full max-w-lg">
            <div className="group relative overflow-hidden rounded-2xl bg-pure-parchment p-3 shadow-premium-lg border border-amber-900/10 transition-all duration-500 hover:shadow-premium-hover">
              <div className="relative h-80 w-full overflow-hidden rounded-xl sm:h-96">
                <Image
                  src={IMAGES.hero.tilkut}
                  alt="Crunchzilla authentic handmade Tilkut presented in clay serveware"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute top-6 left-6 flex items-center gap-1.5 rounded-full bg-pure-parchment/95 px-3.5 py-1.5 text-label-md font-semibold text-botanical-forest shadow-xs backdrop-blur-md">
                <Icon name="eco" className="text-[16px]" />
                100% Homemade Taste
              </div>
            </div>

            {/* Overlapping Makhana card */}
            <div className="absolute top-[42%] -left-6 hidden w-48 -translate-y-1/2 rounded-2xl bg-pure-parchment p-2.5 shadow-premium-md border border-amber-900/10 sm:-left-10 sm:block sm:w-56 transition-all duration-300 hover:scale-105 hover:shadow-premium-hover">
              <div className="relative h-28 overflow-hidden rounded-xl">
                <Image
                  src={IMAGES.hero.makhanaChai}
                  alt="Makhana and chai snack pairing"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-warm-amber px-2.5 py-0.5 text-label-sm font-semibold text-pure-parchment shadow-xs">
                  Foxnut Crunch
                </span>
              </div>
              <p className="mt-2 px-1 text-title-sm font-bold text-on-surface">
                Artisanal Makhana
              </p>
              <p className="px-1 text-label-sm font-medium text-secondary">
                Slow roasted daily
              </p>
            </div>

            {/* Quality badge */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 flex items-center gap-2 rounded-2xl bg-botanical-forest px-3.5 py-2 sm:px-4 sm:py-2.5 text-on-secondary shadow-premium-md border border-white/10">
              <Icon name="workspace_premium" className="text-[20px]" />
              <div className="text-left">
                <span className="block text-label-sm uppercase leading-tight tracking-wider opacity-80">
                  Certified
                </span>
                <span className="text-label-md leading-none font-bold">
                  Zero Chemicals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
