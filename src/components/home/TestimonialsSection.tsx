"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/common/Icon";
import SectionHeading from "@/components/common/SectionHeading";
import StarRating from "@/components/common/StarRating";
import WindowReveal from "@/components/common/WindowReveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Testimonial } from "@/types/testimonial";

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const featuredGugul = testimonials.find((t) => t.id === "gugul-dash") || {
    id: "gugul-dash",
    name: "Gugul Dash",
    purchase: "Fresh Roasted Makhana • Express 1-Hour Delivery",
    rating: 5,
    quote:
      "Thank you, @Ankit Adarsh for delivering such fresh and delicious Makhana! I received my order within just an hour, and the freshness was amazing. The authentic Bihar flavour brought back the taste of home! Highly impressed with the quality, freshness, and super-fast delivery. Keep it up, Crunchzilla!",
    image: "/images/testimonials/gugul-dash-review.webp",
    imageAlt: "Gugul Dash verified WhatsApp customer review for Crunchzilla fresh Makhana express delivery",
  };

  const otherTestimonials = testimonials.filter((t) => t.id !== "gugul-dash");

  return (
    <section
      aria-label="Customer Testimonials & Verified Proof"
      className="w-full bg-surface-container-low py-16 md:py-24 border-t border-surface-container"
    >
      <div className="container-page space-y-12 sm:space-y-16">
        <SectionHeading
          eyebrow="Real love from homes across India"
          eyebrowClassName="text-primary"
          title="Here’s What Our Customers Say"
          description="Authentic reviews straight from customers who miss the authentic taste and crunch of their hometown."
        />

        {/* Featured Verified Customer Proof Window: Gugul Dash */}
        <WindowReveal type="section">
          <div className="overflow-hidden rounded-3xl bg-pure-parchment border border-amber-900/15 shadow-2xl transition-all duration-500 hover:shadow-premium-hover">
            {/* Window Header Title Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container bg-surface-container-low/80 px-4 sm:px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-roasted-terracotta/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warm-amber/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-botanical-forest/70" />
                </div>
                <span className="ml-1 text-label-xs font-bold uppercase tracking-wider text-primary">
                  Verified Customer Proof • Gugul Dash
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-whatsapp-emerald/10 border border-whatsapp-emerald/20 px-3 py-1 text-label-xs font-bold text-whatsapp-emerald">
                  <Icon name="verified" className="text-[14px]" />
                  <span>Delivered within 1 Hour</span>
                </span>
              </div>
            </div>

            {/* Window Content: WhatsApp Screenshot & Feedback Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8 items-center">
              {/* WhatsApp Chat Screenshot Preview */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  onClick={() => setIsZoomOpen(true)}
                  className="group/img relative w-full max-w-[380px] sm:max-w-[420px] cursor-pointer overflow-hidden rounded-2xl bg-surface-container-low border border-amber-900/10 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-95"
                >
                  <Image
                    src={featuredGugul.image || "/images/testimonials/gugul-dash-review.webp"}
                    alt={featuredGugul.imageAlt || "Gugul Dash verified WhatsApp review"}
                    width={968}
                    height={1024}
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="w-full h-auto object-cover"
                    priority
                  />

                  {/* Subtle Tap-to-Zoom Indicator Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-pure-parchment/95 px-4 py-2 text-label-xs font-bold text-primary shadow-md backdrop-blur-md">
                      <Icon name="zoom_in" className="text-[16px]" />
                      <span>Click to View Full Size</span>
                    </span>
                  </div>

                  {/* Mobile Tap Cue */}
                  <div className="sm:hidden absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-pure-parchment backdrop-blur-xs flex items-center gap-1">
                    <Icon name="zoom_in" className="text-[12px]" />
                    <span>Tap to zoom</span>
                  </div>
                </div>

                <p className="mt-2.5 text-center text-label-xs text-on-surface-variant flex items-center gap-1">
                  <Icon name="lock" className="text-[13px] text-secondary" />
                  <span>Actual unedited WhatsApp conversation with customer</span>
                </p>
              </div>

              {/* Review Text & Credibility Breakdown */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StarRating rating={featuredGugul.rating} />
                    <span className="text-label-xs font-bold uppercase tracking-wider text-secondary">
                      5.0 / 5.0 Rating
                    </span>
                  </div>

                  <blockquote className="font-display text-title-lg sm:text-headline-sm font-bold text-primary leading-snug">
                    &ldquo;{featuredGugul.quote}&rdquo;
                  </blockquote>

                  <p className="text-body-sm text-on-surface-variant italic border-l-2 border-whatsapp-emerald/40 pl-3">
                    &ldquo;The authentic Bihar flavour brought back the taste of home! Highly impressed with the quality, freshness, and super-fast delivery.&rdquo;
                  </p>
                </div>

                {/* Key Customer Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl bg-surface-container-low p-3 border border-amber-900/5">
                    <span className="flex items-center gap-1 text-label-xs font-bold text-primary">
                      <Icon name="bolt" className="text-[15px] text-spiced-tangerine" />
                      1-Hour Delivery
                    </span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">
                      Received in &lt; 60 mins
                    </span>
                  </div>

                  <div className="rounded-xl bg-surface-container-low p-3 border border-amber-900/5">
                    <span className="flex items-center gap-1 text-label-xs font-bold text-primary">
                      <Icon name="eco" className="text-[15px] text-whatsapp-emerald" />
                      Fresh & Crunchy
                    </span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">
                      Air-roasted Mithila pops
                    </span>
                  </div>

                  <div className="rounded-xl bg-surface-container-low p-3 border border-amber-900/5">
                    <span className="flex items-center gap-1 text-label-xs font-bold text-primary">
                      <Icon name="home" className="text-[15px] text-secondary" />
                      Taste of Home
                    </span>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">
                      Authentic Bihar heritage
                    </span>
                  </div>
                </div>

                {/* Customer Signature Strip */}
                <div className="flex items-center justify-between border-t border-surface-container pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-golden-sand/90 text-primary font-bold shadow-xs">
                      GD
                    </div>
                    <div>
                      <h3 className="font-display text-title-md font-bold text-on-surface">
                        {featuredGugul.name}
                      </h3>
                      <p className="text-label-xs text-on-surface-variant font-medium">
                        Verified Buyer • {featuredGugul.purchase}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-whatsapp-emerald font-semibold text-label-xs bg-whatsapp-emerald/10 border border-whatsapp-emerald/20 px-3 py-1.5 rounded-full">
                    <Icon name="verified" className="text-[16px]" />
                    <span className="hidden sm:inline">Verified Purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WindowReveal>

        {/* Other Customer Reviews in Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherTestimonials.map(({ id, name, purchase, rating, quote }) => (
            <figure
              key={id}
              className="group relative flex flex-col justify-between space-y-4 rounded-2xl bg-pure-parchment p-6 border border-amber-900/10 shadow-premium-sm transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5"
            >
              <div className="absolute top-4 right-4 text-warm-amber/15 font-display text-5xl leading-none select-none pointer-events-none">
                “
              </div>
              <div className="space-y-3 relative z-1">
                <StarRating rating={rating} />
                <blockquote className="text-body-md italic text-on-surface leading-relaxed">
                  “{quote}”
                </blockquote>
              </div>
              <figcaption className="flex items-center justify-between border-t border-surface-container pt-4 relative z-1">
                <div>
                  <p className="text-title-sm font-bold text-on-surface">{name}</p>
                  <p className="text-label-sm font-medium text-on-surface-variant">
                    Verified Buyer • {purchase}
                  </p>
                </div>
                <Icon name="verified" className="text-[20px] text-whatsapp-emerald" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Full-Screen Zoom Lightbox Modal */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-2xl bg-pure-parchment p-4 sm:p-6 border border-amber-900/15">
          <DialogTitle className="font-display text-title-md font-bold text-primary flex items-center gap-2 mb-2">
            <Icon name="chat" className="text-[20px] text-whatsapp-emerald" />
            <span>Verified Customer Feedback — Gugul Dash</span>
          </DialogTitle>
          <div className="relative aspect-auto max-h-[75vh] w-full overflow-hidden rounded-xl bg-surface-container-low border border-amber-900/10 flex items-center justify-center">
            <Image
              src={featuredGugul.image || "/images/testimonials/gugul-dash-review.webp"}
              alt="Gugul Dash verified WhatsApp customer review full size"
              width={968}
              height={1024}
              sizes="(min-width: 768px) 650px, 95vw"
              className="max-h-[72vh] w-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
