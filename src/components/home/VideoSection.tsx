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

        {/* Side-by-Side Showcase: Video (Left) + Full Formatted Stall Photo (Right) */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Video Player & Brand Details (7 cols on lg) */}
            <div className="flex flex-col space-y-6 lg:col-span-7">
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

              {/* Highlights & Trust Badges */}
              <div className="flex flex-wrap items-center gap-2.5 text-body-sm text-on-surface-variant">
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-1">
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

            {/* Right Column: Full Actual Formatted Stall Photo (5 cols on lg) */}
            <div className="flex flex-col items-center justify-center lg:col-span-5">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl ring-1 ring-black/10 bg-surface-container-high transition-transform duration-300 hover:shadow-3xl">
                <Image
                  src={IMAGES.brand.stall}
                  alt="Crunchzilla stall showing freshly packed Makhana bags, founder, and official exhibition banners"
                  width={576}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 42vw, (min-width: 640px) 70vw, 92vw"
                  className="h-auto w-full object-contain block"
                />

                {/* Subtle caption pill at bottom */}
                <div className="absolute bottom-3 inset-x-3 rounded-xl bg-black/65 px-3.5 py-2 backdrop-blur-md text-pure-parchment flex items-center justify-between gap-2 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Icon name="storefront" className="text-[18px] text-spiced-tangerine" />
                    <span className="text-label-xs sm:text-label-sm font-semibold tracking-wide">
                      Our Exhibition Stall &amp; Fresh Harvest
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-label-xs font-bold text-spiced-tangerine uppercase tracking-wider whitespace-nowrap">
                    100% Authentic
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
