"use client";

import Image from "next/image";
import Icon from "@/components/common/Icon";
import MakhanaRain from "@/components/home/MakhanaRain";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function MakhanaHeroSection() {
  const scrollToExplore = () => {
    const el = document.getElementById("explore-makhana");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label="Artisanal Mithila Makhana Hero"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#FCFAF6] via-[#FAF7F2] to-[#F7F4EE] pt-8 pb-12 sm:pt-12 sm:pb-16 md:py-20 border-b border-surface-container"
    >
      {/* Subtle Warm Amber Ambient Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,_rgba(242,201,76,0.18),_transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Elegant Rain of Makhana Visual Effect */}
      <MakhanaRain />

      <div className="container-page">
        {/* Minimal, High-End Centered Introduction */}
        <div className="mx-auto max-w-3xl text-center space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-golden-sand/80 border border-amber-900/10 px-4 py-1.5 shadow-xs backdrop-blur-xs">
            <Icon name="spa" className="text-[17px] text-secondary" />
            <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
              Mithila Origin • 100% Hand-Harvested
            </span>
          </div>

          <h1 className="font-display text-display-mobile sm:text-headline-lg md:text-display font-bold tracking-tight text-primary">
            Artisanal Mithila Makhana
          </h1>

          <p className="mx-auto max-w-2xl text-body-lg sm:text-title-md text-on-surface-variant font-normal leading-relaxed">
            Slow air-roasted lotus pops crafted with zero palm oil. Fluffy, snow-white,
            and rich in natural plant protein—direct from the heritage wetlands of North Bihar.
          </p>

          {/* Minimal Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={scrollToExplore}
              className="inline-flex w-full sm:w-auto min-h-[46px] items-center justify-center gap-2 rounded-full bg-roasted-terracotta px-8 py-3 text-title-sm font-bold text-pure-parchment shadow-premium-sm transition-all duration-300 hover:bg-primary hover:shadow-premium-hover hover:-translate-y-0.5 active:scale-95"
            >
              <span>Explore Makhana Grades</span>
              <Icon name="arrow_downward" className="text-[18px]" />
            </button>

            <a
              href={whatsappLink(
                `Hi ${SITE.name}, I would like to order fresh Mithila Makhana.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto min-h-[46px] items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-6 py-3 text-title-sm font-bold text-pure-parchment shadow-premium-sm transition-all duration-300 hover:bg-secondary hover:shadow-premium-hover hover:-translate-y-0.5 active:scale-95"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Large, Visually Prominent Makhana Hero Photography */}
        <div className="mt-8 sm:mt-12 mx-auto max-w-5xl animate-fade-in-up">
          <div className="group relative overflow-hidden rounded-3xl bg-pure-parchment p-3 sm:p-4 shadow-premium-lg border border-amber-900/10 transition-all duration-700 hover:shadow-premium-hover animate-float-gentle">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-container-low">
              <Image
                src={IMAGES.hero.makhanaHeroAi}
                alt="Premium natural Makhana from Crunchzilla"
                fill
                priority
                sizes="(min-width: 1280px) 1024px, (min-width: 1024px) 90vw, 100vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />

              {/* Floating Quality Credentials Glass Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pure-parchment/95 border border-amber-900/10 px-3.5 py-1.5 text-label-sm font-bold text-botanical-forest shadow-xs backdrop-blur-md">
                  <Icon name="verified" className="text-[16px] text-whatsapp-emerald" />
                  Jumbo 6+ HP Hand-Picked
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-pure-parchment/90 border border-amber-900/10 px-3 py-1 text-label-xs font-semibold text-secondary shadow-xs backdrop-blur-md">
                  <Icon name="local_fire_department" className="text-[15px] text-spiced-tangerine" />
                  100% Air Roasted • Zero Palm Oil
                </span>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-pure-parchment/95 border border-amber-900/10 px-4 py-2 text-on-surface shadow-premium-sm backdrop-blur-md">
                  <Icon name="workspace_premium" className="text-[22px] text-warm-amber" />
                  <div className="text-left">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                      Purity Guarantee
                    </span>
                    <span className="text-label-sm font-bold text-primary">
                      16g Protein / 100g
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue Animation */}
        <div className="mt-8 text-center flex flex-col items-center justify-center gap-1 text-on-surface-variant">
          <button
            type="button"
            onClick={scrollToExplore}
            aria-label="Scroll down to Explore Makhana grades"
            className="group flex flex-col items-center gap-1 transition-opacity hover:opacity-100 opacity-75"
          >
            <span className="text-label-xs font-semibold uppercase tracking-widest text-primary">
              Scroll to Explore Makhana
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-golden-sand/70 border border-amber-900/10 text-primary shadow-xs transition-transform duration-300 group-hover:translate-y-1">
              <Icon name="keyboard_arrow_down" className="text-[20px]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

