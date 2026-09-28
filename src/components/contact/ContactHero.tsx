import Icon from "@/components/common/Icon";
import { CONTACT_TRUST_BADGES } from "@/constants/contact";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-surface-container-low py-10 lg:py-24">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-fixed-dim/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary-fixed/30 blur-3xl" />

      <div className="container-page relative">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-golden-sand px-3.5 py-1.5 text-roasted-terracotta">
            <Icon name="support_agent" className="text-[16px]" />
            <span className="text-label-sm uppercase tracking-wider">
              Artisanal Customer Care &amp; Inquiries
            </span>
          </div>
          <h1 className="font-display text-headline-lg tracking-tight text-primary lg:text-display">
            We’d Love to Hear From You
          </h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant">
            Whether you have questions about our slow-roasted batches, need real-time order
            tracking, or wish to curate wholesale hampers and corporate gifting, our family is here
            to assist.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4 text-label-md">
            {CONTACT_TRUST_BADGES.map(({ icon, label, className }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1 shadow-sm ${className}`}
              >
                <Icon name={icon} className="text-[16px]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
