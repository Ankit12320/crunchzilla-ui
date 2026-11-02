"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import SectionHeading from "@/components/common/SectionHeading";
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
      aria-label="Crunchzilla Video Story"
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

        {/* Video Player Container */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-charcoal-bark shadow-2xl ring-1 ring-black/10 aspect-[816/464]">
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

          {/* Highlights & Badges below video */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-body-sm text-on-surface-variant">
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
              href={whatsappLink("Hi Crunchzilla team! I just watched your story video and would like to order fresh traditional delicacies.")}
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
