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
              className="flex flex-col rounded-xl bg-surface-container-low p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${TONE_SOFT_BG[iconTone]}`}
              >
                <Icon name={icon} className="text-[28px]" />
              </div>
              <h3 className={`mb-2 text-title-md font-bold ${TONE_TEXT[titleTone]}`}>{title}</h3>
              <p className="text-body-md text-on-surface-variant">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
