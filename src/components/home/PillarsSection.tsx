import Icon from "@/components/common/Icon";
import SectionHeading from "@/components/common/SectionHeading";
import { BRAND_PILLARS, TONE_SOFT_BG, TONE_TEXT } from "@/constants/home";
import { SITE } from "@/constants/site";

export default function PillarsSection() {
  return (
    <section className="w-full bg-surface py-16">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Quality Commitment"
          title={`Why Thousands Trust ${SITE.name}`}
          description="Pure farm roots, honest kitchen craft, and no shortcuts."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {BRAND_PILLARS.map(({ icon, title, description, iconTone, titleTone }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl bg-pure-parchment/90 border border-amber-900/10 p-6 shadow-premium-sm transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${TONE_SOFT_BG[iconTone]} shadow-xs`}
              >
                <Icon name={icon} className="text-[28px]" />
              </div>
              <h3 className={`mb-2 text-title-md font-bold ${TONE_TEXT[titleTone]}`}>{title}</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
