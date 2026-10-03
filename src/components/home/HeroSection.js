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
    <section className="relative w-full overflow-hidden bg-surface-container-low py-12 md:py-20 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Left: storytelling & CTAs */}
        <div className="z-10 flex flex-col items-start gap-6 lg:col-span-7">
          <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-surface-container-highest p-1.5">
            <span className="rounded-full bg-primary px-3 py-1 text-label-sm uppercase tracking-wider text-on-primary">
              Heritage Recipe
            </span>
            <span className="px-2 text-label-sm text-on-surface-variant">
              Gaya • Mithila • Traditional Pantry
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-display-mobile font-bold tracking-tight text-[#fffaf0]md:text-display">
              Wholesome Staples and Snacks
            </h1>
            <p className="font-display text-headline-sm italic text-on-surface-variant">
              made with care, authenticity, and everyday goodness.
            </p>
          </div>

          <p className="max-w-xl text-body-lg text-on-surface">
            From festive sweets to daily essentials, {SITE.name} brings you
            India’s time-honored recipes in fresh, premium form. Every batch is
            slow-roasted using simple, natural ingredients packed with authentic
            taste.
          </p>

          <div className="grid w-full grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
            {HERO_VALUE_PILLS.map(({ icon, label, tone }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 shadow-sm"
              >
                <Icon
                  name={icon}
                  className={`text-[18px] ${TONE_TEXT[tone]}`}
                />
                <span className="text-label-sm text-on-surface">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#bestsellers"
              className="inline-flex items-center gap-2 rounded-full bg-roasted-terracotta px-8 py-3.5 text-title-sm text-on-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg"
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
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp-emerald px-6 py-3.5 text-title-sm text-pure-parchment shadow-md transition-all hover:opacity-95"
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
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${INITIAL_COLORS[i]}`}
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
            <div className="group relative overflow-hidden rounded-xl bg-pure-parchment p-3 shadow-xl">
              <div className="relative h-80 w-full overflow-hidden rounded-lg sm:h-96">
                <Image
                  src={IMAGES.hero.tilkut}
                  alt="Crunchzilla authentic handmade Tilkut presented in clay serveware"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="absolute top-6 left-6 flex items-center gap-1.5 rounded-full bg-pure-parchment/95 px-3.5 py-1.5 text-label-md text-botanical-forest shadow-sm backdrop-blur-md">
                <Icon name="eco" className="text-[16px]" />
                100% Homemade Taste
              </div>
              {/* <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-xl bg-pure-parchment/95 p-4 shadow-lg backdrop-blur-md">
                <div>
                  <p className="text-title-sm font-bold text-primary">Gaya Special Gud Tilkut</p>
                  <p className="text-body-sm text-on-surface-variant">
                    Winter delight melted with pure jaggery
                  </p>
                </div>
                // <span className="rounded-full bg-golden-sand px-3 py-1 text-title-sm text-primary">
                //   249
                // </span>
              </div> */}
            </div>

            {/* Overlapping Makhana card — sits just above the middle of the left edge so it
                clears both the top badge and the bottom Tilkut caption */}
            <div className="absolute top-[42%] -left-6 hidden w-48 -translate-y-1/2 rounded-xl bg-pure-parchment p-2 shadow-xl sm:-left-10 sm:block sm:w-56">
              <div className="relative h-28 overflow-hidden rounded-lg">
                <Image
                  src={IMAGES.hero.makhanaChai}
                  alt="Makhana and chai snack pairing"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-warm-amber px-2 py-0.5 text-label-sm text-pure-parchment">
                  Foxnut Crunch
                </span>
              </div>
              <p className="mt-2 px-1 text-title-sm text-on-surface">
                Artisanal Makhana
              </p>
              <p className="px-1 text-label-sm text-secondary">
                Slow roasted daily
              </p>
            </div>

            {/* Quality badge */}
            <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl bg-botanical-forest px-4 py-2.5 text-on-secondary shadow-lg">
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
