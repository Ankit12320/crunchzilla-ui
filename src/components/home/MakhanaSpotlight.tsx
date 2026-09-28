import Image from "next/image";
import Icon from "@/components/common/Icon";
import { MAKHANA_STATS, TONE_TEXT } from "@/constants/home";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function MakhanaSpotlight() {
  return (
    <section className="w-full bg-surface py-16 md:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Visual */}
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl bg-surface-container shadow-2xl">
            <Image
              src={IMAGES.hero.makhanaChai}
              alt="Makhana foxnuts served alongside hot Indian spiced chai"
              width={512}
              height={341}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto max-h-[500px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-bark/60 via-transparent to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-xl bg-pure-parchment/95 p-4 shadow-lg backdrop-blur-md">
              <div>
                <p className="text-label-sm uppercase tracking-wider text-primary">
                  Nutrient Spotlight
                </p>
                <p className="text-title-sm font-bold text-on-surface">
                  100% Air Roasted • Zero Palm Oil
                </p>
              </div>
              <Icon name="eco" className="text-[28px] text-secondary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 flex flex-col items-start gap-6 lg:order-2 lg:col-span-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-golden-sand px-3 py-1 text-label-md text-primary">
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

          <p className="text-body-lg text-on-surface-variant">
            {SITE.name} brings you this timeless ingredient in its most authentic form: light,
            nutrient-rich, and full of natural goodness. High in protein and calcium, low in fat,
            and completely gluten-free, Makhana is more than food, it’s a reflection of India’s
            age-old belief that health begins with purity.
          </p>

          <div className="grid w-full grid-cols-2 gap-4 py-2 sm:grid-cols-4">
            {MAKHANA_STATS.map(({ value, label, tone }) => (
              <div key={label} className="rounded-xl bg-surface-container-low p-4 text-center">
                <span className={`block font-display text-headline-sm font-bold ${TONE_TEXT[tone]}`}>
                  {value}
                </span>
                <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={whatsappLink("Hi, I would like to order Fresh Makhana.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-title-sm text-on-primary shadow-md transition-colors hover:bg-roasted-terracotta"
            >
              Shop Fresh Makhana
              <Icon name="shopping_cart" className="text-[18px]" />
            </a>
            <span className="flex items-center gap-1 text-body-sm text-on-surface-variant">
              <Icon name="check" className="text-[16px] text-whatsapp-emerald" />
              Harvested in Bihar&apos;s pristine wetlands
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
