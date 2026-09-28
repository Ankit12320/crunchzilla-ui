import Image from "next/image";
import Icon from "@/components/common/Icon";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function PantryBanner() {
  return (
    <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-xl bg-surface p-6 shadow-md md:p-8 lg:grid-cols-12">
      <div className="relative h-64 overflow-hidden rounded-lg shadow-sm lg:col-span-5 lg:h-full lg:min-h-72">
        <Image
          src={IMAGES.pantry.sesameSeeds}
          alt="Spoonful of golden wholesome sesame seeds used for Crunchzilla authentic pantry"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-4 lg:col-span-7">
        <span className="inline-block rounded-full bg-cardamom-light px-3 py-1 text-label-sm uppercase tracking-wider text-botanical-forest">
          Heritage Pantry Collection
        </span>
        <h3 className="font-display text-headline-md font-bold text-on-surface">
          Katarni Chura, Basmati Poha &amp; Pure Jaggery (Gud)
        </h3>
        <p className="text-body-md text-on-surface-variant">
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
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-title-sm text-on-secondary transition-all hover:opacity-90"
          >
            <Icon name="inventory_2" className="text-[18px]" />
            Inquire Pantry Staples
          </a>
          <span className="text-body-sm text-on-surface-variant">
            Vacuum sealed freshness guaranteed.
          </span>
        </div>
      </div>
    </div>
  );
}
