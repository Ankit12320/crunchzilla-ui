"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import SectionHeading from "@/components/common/SectionHeading";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback if browser blocks programmatic play
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="video-story"
      aria-label="Crunchzilla Video Story and Origin Stall"
      className="relative w-full bg-surface-container-low py-14 sm:py-16 md:py-20 border-t border-surface-container"
    >
      <div className="container-page">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Authentic Bihar Craftsmanship"
          eyebrowClassName="text-roasted-terracotta font-semibold"
          title="Watch Our Story: Pure, Honest & Farm-Fresh"
          description="Experience the journey of traditional flavors from Bihar—hand-roasted makhana, heritage sattu, and authentic delicacies crafted with pride."
        />

        {/* Side-by-Side Showcase: Video Player (Left) + Stall Story (Right) */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Video Player (7 cols) */}
            <div className="flex flex-col lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-charcoal-bark shadow-2xl ring-1 ring-black/10 aspect-[816/464] w-full">
                <video
                  ref={videoRef}
                  src="/videos/crunchzilla-story.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className="h-full w-full object-cover"
                  aria-label="Authentic food products from Bihar - Crunchzilla story video"
                >
                  <source src="/videos/crunchzilla-story.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Custom Interactive Play Overlay (visible when paused) */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={handlePlayToggle}
                    aria-label="Play Crunchzilla Story Video"
                    className="group absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all duration-300 hover:bg-black/45 focus:outline-hidden"
                  >
                    {/* Play Button Icon */}
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-spiced-tangerine text-white shadow-[0_8px_30px_rgba(217,91,27,0.5)] transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                      <Icon name="play_arrow" className="text-[36px] sm:text-[44px] ml-1" />
                    </div>
                    <p className="mt-3 sm:mt-4 text-label-md sm:text-title-sm font-medium tracking-wide text-pure-parchment drop-shadow-md">
                      Tap to Watch Video
                    </p>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Founder & Origin Stall Showcase (5 cols) */}
            <div className="flex flex-col lg:col-span-5">
              <div className="group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full w-full min-h-[300px] overflow-hidden rounded-2xl sm:rounded-3xl bg-charcoal-bark shadow-2xl ring-1 ring-black/10">
                <Image
                  src={IMAGES.brand.stall}
                  alt="Crunchzilla founder showcasing fresh artisanal Makhana pops and authentic Bihar delicacies at exhibition stall"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-bark/95 via-charcoal-bark/35 to-black/20" />

                {/* Top Pill Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-label-xs font-semibold text-pure-parchment backdrop-blur-md border border-white/10">
                    <Icon name="storefront" className="text-[14px] text-spiced-tangerine" />
                    Direct From Our Stalls
                  </span>
                </div>

                {/* Bottom Story Content */}
                <div className="absolute right-4 bottom-4 left-4 z-10 space-y-1.5 text-pure-parchment">
                  <span className="inline-block rounded-full bg-primary/80 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-pure-parchment">
                    Real People • Real Purity
                  </span>
                  <h3 className="font-display text-title-md sm:text-headline-xs font-bold leading-tight drop-shadow-sm">
                    Crafted with Pride, Shared with Love
                  </h3>
                  <p className="text-body-xs sm:text-body-sm text-pure-parchment/90 line-clamp-2">
                    Every batch of our Makhana, Sattu, and Tilkut is packed fresh with zero shortcuts and genuine native warmth.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Badges below side-by-side showcase */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-body-sm text-on-surface-variant">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cardamom-light/80 px-3 py-1 text-label-xs font-semibold text-botanical-forest whitespace-nowrap">
              <Icon name="verified" className="text-[15px] text-whatsapp-emerald" />
              100% Traditional Methods
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-label-xs font-semibold text-on-surface-variant whitespace-nowrap">
              <Icon name="local_fire_department" className="text-[15px] text-spiced-tangerine" />
              Slow Air-Roasted • Zero Palm Oil
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 text-label-xs font-semibold text-on-surface-variant whitespace-nowrap">
              <Icon name="local_shipping" className="text-[15px] text-primary" />
              Express Delivery Across India
            </span>
          </div>

          {/* Call to action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/shop"
              className="inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-label-md font-semibold text-pure-parchment shadow-md transition-all duration-200 hover:bg-roasted-terracotta hover:shadow-lg active:scale-98 whitespace-nowrap"
            >
              <Icon name="storefront" className="text-[18px]" />
              Explore All Products
            </Link>
            <a
              href={whatsappLink("Hi Crunchzilla team! I just saw your video story and stall photos, and would like to order fresh traditional delicacies.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-2 rounded-xl bg-whatsapp-emerald px-6 py-2.5 text-label-md font-semibold text-pure-parchment shadow-md transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg active:scale-98 whitespace-nowrap"
            >
              <Icon name="chat" className="text-[18px]" />
              Order on WhatsApp ({SITE.phoneDisplay})
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
