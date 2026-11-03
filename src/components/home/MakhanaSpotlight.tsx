import Image from "next/image";
import Icon from "@/components/common/Icon";
import WindowReveal from "@/components/common/WindowReveal";
import { MAKHANA_STATS, TONE_TEXT } from "@/constants/home";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { buildProductCardWhatsAppLink } from "@/lib/whatsapp";

export default function MakhanaSpotlight() {
  return (
    <section className="w-full bg-gradient-to-b from-surface to-surface-container-low/70 py-16 md:py-24 border-t border-surface-container">
      <div className="container-page">
        <WindowReveal type="section" className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Visual */}
          <div className="relative order-2 lg:order-1 lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl bg-pure-parchment shadow-2xl border border-amber-900/15">
              {/* Subtle Window Header Bar */}
              <div className="flex items-center justify-between border-b border-surface-container bg-surface-container-low/80 px-4 py-2 text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-roasted-terracotta/70" />
                  <span className="h-2 w-2 rounded-full bg-warm-amber/70" />
                  <span className="h-2 w-2 rounded-full bg-botanical-forest/70" />
                  <span className="ml-1.5 font-semibold uppercase tracking-wider text-[10px] text-primary/80">
                    Heritage Window • Mithila Spotlight
                  </span>
                </div>
              </div>

              <div className="p-2 sm:p-2.5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-container-low">
                  <Image
                    src={IMAGES.hero.makhanaChai}
                    alt="Makhana foxnuts served alongside hot Indian spiced chai"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-bark/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl bg-pure-parchment/95 p-3.5 shadow-premium-md backdrop-blur-md border border-amber-900/5">
                    <div>
                      <p className="text-label-xs uppercase tracking-wider text-primary font-bold">
                        Nutrient Spotlight
                      </p>
                      <p className="text-title-sm font-bold text-on-surface">
                        100% Air Roasted • Zero Palm Oil
                      </p>
                    </div>
                    <Icon name="eco" className="text-[26px] text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 flex flex-col items-start gap-6 lg:order-2 lg:col-span-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-golden-sand/80 border border-amber-900/10 px-3.5 py-1 text-label-md font-bold text-primary shadow-xs">
              <span>Crunchy</span>
              <span>•</span>
              <span>Clean</span>
              <span>•</span>
              <span>Nutrient-Rich</span>
            </div>
            <h2 className="font-display text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg">
              Makhana: <span className="italic text-primary">India’s Original Superfood</span>
            </h2>
          </div>

          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            {SITE.name} brings you this timeless ingredient in its most authentic form: light,
            nutrient-rich, and full of natural goodness. High in protein and calcium, low in fat,
            and completely gluten-free, Makhana is more than food, it’s a reflection of India’s
            age-old belief that health begins with purity.
          </p>

          <div className="grid w-full grid-cols-2 gap-4 py-2 sm:grid-cols-4">
            {MAKHANA_STATS.map(({ value, label, tone }) => (
              <div
                key={label}
                className="rounded-2xl bg-pure-parchment/90 border border-amber-900/5 p-4 text-center shadow-premium-sm transition-all duration-200 hover:shadow-premium-md hover:-translate-y-0.5"
              >
                <span className={`block font-display text-headline-sm font-bold ${TONE_TEXT[tone]}`}>
                  {value}
                </span>
                <span className="text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={buildProductCardWhatsAppLink({
                name: "Artisanal Roasted Makhana",
                variantLabel: "500 gm Jumbo",
                price: 800,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-8 py-3.5 text-title-sm font-bold text-pure-parchment shadow-premium-sm transition-all duration-300 hover:bg-secondary hover:shadow-premium-hover active:scale-95"
            >
              <Icon name="chat" className="text-[18px]" />
              Order Makhana on WhatsApp
            </a>
            <span className="flex items-center gap-1.5 text-body-sm font-medium text-on-surface-variant">
              <Icon name="check_circle" className="text-[18px] text-whatsapp-emerald" />
              Harvested in Bihar&apos;s pristine wetlands
            </span>
          </div>
        </div>
      </WindowReveal>
    </div>
  </section>
);
}
