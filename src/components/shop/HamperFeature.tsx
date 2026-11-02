import Image from "next/image";
import AddToCartButton from "@/components/common/AddToCartButton";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { buildProductCardWhatsAppLink } from "@/lib/whatsapp";
import type { Hamper } from "@/types/catalog";

const PERK_TONE = {
  terracotta: "text-roasted-terracotta",
  secondary: "text-secondary",
  amber: "text-warm-amber",
} as const;

export default function HamperFeature({ hamper }: { hamper: Hamper }) {
  return (
    <section className="w-full bg-gradient-to-b from-surface via-surface-container-low to-surface py-12">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-golden-sand/40 via-surface-container to-golden-sand/20 p-6 sm:p-10 shadow-premium-md border border-amber-900/10 md:p-12">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary/5 blur-2xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-golden-sand/80 border border-amber-900/10 px-3.5 py-1 text-label-sm font-bold text-tertiary shadow-xs">
                <Icon name="card_giftcard" className="text-[16px]" />
                {hamper.tag}
              </div>
              <h2 className="font-display text-headline-md font-bold tracking-tight text-on-surface">
                {hamper.name}
              </h2>
              <p className="max-w-xl text-body-lg text-on-surface-variant leading-relaxed">
                {hamper.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
                {hamper.perks.map(({ label, value, tone }, i) => (
                  <div
                    key={label}
                    className={`rounded-2xl bg-pure-parchment/90 border border-amber-900/5 p-3.5 shadow-premium-sm transition-all duration-200 hover:shadow-premium-md hover:-translate-y-0.5 ${
                      i === hamper.perks.length - 1 ? "col-span-2 sm:col-span-1" : ""
                    }`}
                  >
                    <span className={`block text-label-sm uppercase font-semibold ${PERK_TONE[tone]}`}>{label}</span>
                    <span className="text-title-sm font-bold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-4 pt-3">
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant line-through">
                    ₹{hamper.value} Value
                  </span>
                  <span className="font-display text-headline-sm font-bold text-primary">
                    ₹{hamper.price}
                  </span>
                </div>
                <AddToCartButton
                  item={{
                    slug: hamper.slug,
                    name: hamper.name,
                    price: hamper.price,
                    variantId: "box",
                    variantLabel: "Hamper",
                    image: IMAGES.catalog[hamper.images[0]],
                  }}
                  className="flex h-12 w-full sm:w-auto sm:flex-1 items-center justify-center gap-2 rounded-full bg-roasted-terracotta px-6 text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-primary active:scale-95 whitespace-nowrap"
                >
                  <Icon name="shopping_bag" className="text-[20px]" />
                  Add to Cart
                </AddToCartButton>
                <a
                  href={buildProductCardWhatsAppLink({
                    name: hamper.name,
                    variantLabel: "Heritage Hamper Box",
                    price: hamper.price,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full sm:w-auto sm:flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-6 text-label-lg font-bold text-pure-parchment shadow-md transition-all hover:bg-secondary active:scale-95 whitespace-nowrap"
                >
                  <Icon name="chat" className="text-[20px]" />
                  Order Hamper on WhatsApp
                </a>
              </div>
            </div>

            {/* What's inside */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-5">
              {hamper.images.map((key) => {
                const src = IMAGES.catalog[key];
                return (
                  <div key={key} className="relative aspect-square overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={src}
                      alt="Crunchzilla authentic pantry item included in heritage discovery gift hamper"
                      fill
                      unoptimized={src.endsWith(".gif")}
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
