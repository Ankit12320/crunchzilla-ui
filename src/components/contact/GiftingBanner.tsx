import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function GiftingBanner() {
  return (
    <section className="container-page pb-10">
      <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl bg-surface-container p-6 lg:flex-row lg:p-12">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-golden-sand px-3 py-1 text-label-sm uppercase tracking-wider text-tertiary">
            <Icon name="featured_seasonal_and_gifts" className="text-[16px]" />
            Custom Hampers &amp; Weddings
          </span>
          <h3 className="font-display text-headline-md font-semibold tracking-tight text-on-surface">
            Planning Bulk Orders or Corporate Festive Hampers?
          </h3>
          <p className="text-body-md text-on-surface-variant">
            From curated Gaya Tilkut boxes and artisanal roasted makhana jars to organic jaggery
            bundles, we customize packaging, greeting notes, and direct dispatch for teams and
            gatherings.
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row lg:w-auto">
          <a
            href={whatsappLink(`Hello ${SITE.name}, I am interested in bulk/corporate gifting catalogue.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-6 py-3 text-label-lg whitespace-nowrap text-pure-parchment shadow-md transition-all hover:bg-secondary sm:w-auto"
          >
            <Icon name="chat" className="text-[20px]" />
            Request Corporate Catalogue
          </a>
          <a
            href={`tel:+${SITE.whatsappNumber}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-surface-container-highest px-6 py-3 text-label-lg whitespace-nowrap text-on-surface transition-all hover:bg-surface-container-high sm:w-auto"
          >
            <Icon name="call" className="text-[20px]" />
            Speak with Founder
          </a>
        </div>
      </div>
    </section>
  );
}
