import Icon from "@/components/common/Icon";
import StarRating from "@/components/common/StarRating";
import { COMMUNITY_VOICES, FEATURED_STORY } from "@/constants/about";

export default function CommunityLove() {
  return (
    <section className="w-full bg-warm-cream py-10 lg:py-24">
      <div className="container-page">
        <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-pure-parchment p-8 shadow-lg lg:p-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 left-6 font-display text-[120px] leading-none text-roasted-terracotta/10 select-none"
          >
            “
          </span>

          <div className="relative z-10 flex flex-col items-center text-center">
            <StarRating rating={5} className="mb-6 gap-1 [&>span]:text-[24px]" />
            <blockquote className="mb-8 max-w-2xl font-display text-headline-sm leading-relaxed font-medium italic text-on-surface">
              “{FEATURED_STORY.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-title-sm font-bold text-primary">
                {FEATURED_STORY.initials}
              </div>
              <div className="text-left">
                <div className="text-title-sm font-bold text-on-surface">{FEATURED_STORY.name}</div>
                <div className="flex items-center gap-1 text-label-sm text-on-surface-variant">
                  <Icon name="verified" className="text-[14px] text-whatsapp-emerald" />
                  {FEATURED_STORY.label}
                </div>
              </div>
            </figcaption>

            <div className="mt-12 grid w-full grid-cols-1 gap-6 border-t border-surface-variant pt-8 text-left sm:grid-cols-2">
              {COMMUNITY_VOICES.map(({ name, quote }) => (
                <div key={name} className="rounded-xl bg-surface-container-low p-4">
                  <p className="mb-2 text-body-sm italic text-on-surface-variant">“{quote}”</p>
                  <span className="text-label-sm text-on-surface">— {name}</span>
                </div>
              ))}
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
