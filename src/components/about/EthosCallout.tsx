import Link from "next/link";
import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function EthosCallout() {
  return (
    <section className="w-full bg-botanical-forest py-10 text-warm-cream lg:py-20">
      <div className="container-page grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <span className="text-label-sm uppercase tracking-widest text-secondary-fixed">
            The {SITE.name} Ethos
          </span>
          <h2 className="font-display text-headline-lg-mobile tracking-tight text-pure-parchment md:text-headline-lg">
            A Clean Pantry Isn&apos;t a Modern Trend. It Is How India Always Ate.
          </h2>
          <p className="max-w-2xl text-body-lg text-warm-cream/80">
            Our ancestors didn&apos;t require artificial shelf-stabilizers because ingredients were
            treated with seasonal respect. We promise to keep honoring that simple wisdom in every
            jar, pouch, and parcel we dispatch.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-label-lg text-pure-parchment shadow-md transition-all hover:bg-roasted-terracotta"
          >
            Explore All Staples
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-pure-parchment/10 px-8 py-3.5 text-label-lg text-pure-parchment backdrop-blur-sm transition-all hover:bg-pure-parchment/20"
          >
            <Icon name="chat" className="text-[20px] text-whatsapp-emerald" />
            Talk to Founder
          </a>
        </div>
      </div>
    </section>
  );
}
