import Image from "next/image";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function PantryBanner() {
  return (
    <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-2xl bg-pure-parchment p-6 shadow-premium-md border border-amber-900/10 md:p-8 lg:grid-cols-12">
      <div className="relative h-64 overflow-hidden rounded-xl shadow-xs lg:col-span-5 lg:h-full lg:min-h-72">
        <Image
          src={IMAGES.pantry.sesameSeeds}
          alt="Spoonful of golden wholesome sesame seeds used for Crunchzilla authentic pantry"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-4 lg:col-span-7">
        <span className="inline-block rounded-full bg-cardamom-light/80 border border-botanical-forest/10 px-3.5 py-1 text-label-sm font-semibold uppercase tracking-wider text-botanical-forest shadow-xs">
          Heritage Pantry Collection
        </span>
        <h3 className="font-display text-headline-md font-bold text-on-surface">
          Katarni Chura, Basmati Poha
        </h3>
        <p className="text-body-lg text-on-surface-variant leading-relaxed">
          Expand your kitchen with Eastern India’s most aromatic, artisanal pantry essentials.
          Aromatic Katarni flattened rice straight from Bhagalpur, thin crispy Basmati Poha, and
          chemical-free clarified sugarcane jaggery cubes.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={whatsappLink(
              `Hi ${SITE.name}, I am interested in Katarni Chura and Organic Jaggery.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-title-sm font-semibold text-on-secondary shadow-premium-sm transition-all duration-300 hover:bg-botanical-forest hover:shadow-premium-hover active:scale-95"
          >
            <Icon name="inventory_2" className="text-[18px]" />
            Inquire Pantry Staples
          </a>
          <span className="text-body-sm font-medium text-on-surface-variant">
            Vacuum sealed freshness guaranteed.
          </span>
        </div>
      </div>
    </div>
  );
}
