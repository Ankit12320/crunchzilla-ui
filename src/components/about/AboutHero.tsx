import Image from "next/image";
import Icon from "@/components/common/Icon";
import { ABOUT_CREDIBILITY } from "@/constants/about";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-warm-cream">
      <div className="container-page py-10 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-golden-sand px-3.5 py-1.5 text-label-md uppercase tracking-widest text-roasted-terracotta shadow-sm">
              <Icon name="history_edu" className="text-[16px]" />
              Artisanal Roots &amp; Purpose
            </div>
            <h1 className="font-display text-headline-lg-mobile leading-tight tracking-tight text-on-surface md:text-headline-lg">
              Reviving Forgotten Indian Staples With Honesty, Care &amp;{" "}
              <span className="font-normal italic text-primary">Heritage Taste</span>.
            </h1>
            <p className="max-w-2xl text-body-lg text-on-surface-variant">
              In an era of mass-produced, palm-oil fried snacks and synthetic additives, {SITE.name}{" "}
              was founded to bridge the distance between nostalgic hometown kitchens and modern
              urban pantries. We celebrate generational roasting arts from Gaya, Mithila, and across
              Eastern India — untainted, slow-crafted, and wholesome.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {ABOUT_CREDIBILITY.map(({ value, label, className }) => (
                <div key={label} className="flex flex-col rounded-xl bg-surface-container-lowest p-4 shadow-sm">
                  <span className={`font-display text-headline-sm font-bold ${className}`}>{value}</span>
                  <span className="mt-1 text-label-sm uppercase text-on-surface-variant">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-container shadow-xl">
              <Image
                src={IMAGES.about.heroSeeds}
                alt="Handmade Gaya Tilkut of roasted sesame seeds and jaggery"
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-bark/60 via-transparent to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between rounded-xl bg-pure-parchment/95 p-4 shadow-lg backdrop-blur-md">
                <div>
                  <span className="block text-label-sm uppercase tracking-wider text-roasted-terracotta">
                    Raw Ingredient Sourcing
                  </span>
                  <span className="text-title-sm text-charcoal-bark">White Sesame &amp; Wild Jaggery</span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-golden-sand text-roasted-terracotta">
                  <Icon name="eco" className="text-[20px]" />
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 hidden h-24 w-24 rotate-12 items-center justify-center rounded-full bg-primary p-2 text-center text-on-primary shadow-lg sm:flex">
              <span className="text-[10px] leading-tight font-bold uppercase tracking-wider">
                Slow Roasted Heritage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
