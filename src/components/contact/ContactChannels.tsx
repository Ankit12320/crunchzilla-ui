import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";

const labelClass = "text-label-sm uppercase tracking-wider text-on-surface-variant";

function Channel({
  icon,
  iconClass,
  children,
}: {
  icon: string;
  iconClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
        <Icon name={icon} className="text-[22px]" />
      </div>
      <div className="min-w-0 space-y-1">{children}</div>
    </div>
  );
}

export default function ContactChannels() {
  return (
    <div className="space-y-6 rounded-xl bg-surface-container-lowest p-6 shadow-sm">
      <Channel icon="mail" iconClass="bg-primary-fixed text-primary">
        <span className={labelClass}>Email Inquiries</span>
        <a href={`mailto:${SITE.email}`} className="block truncate text-title-sm text-primary hover:underline">
          {SITE.email}
        </a>
        <p className="text-body-sm text-on-surface-variant">We respond within 4 hours.</p>
      </Channel>

      <Channel icon="phone_in_talk" iconClass="bg-secondary-fixed text-secondary">
        <span className={labelClass}>Customer Hotline</span>
        <a
          href={`tel:+${SITE.whatsappNumber}`}
          className="block text-title-sm text-on-surface transition-colors hover:text-primary"
        >
          {SITE.phoneDisplay}
        </a>
        <p className="text-body-sm text-on-surface-variant">Available {SITE.supportHours}, all days</p>
      </Channel>

      <Channel icon="location_on" iconClass="bg-tertiary-fixed text-tertiary">
        <span className={labelClass}>Heritage Roasteries &amp; Fulfillment</span>
        <p className="text-body-md font-semibold text-on-surface">{SITE.fulfillmentHubs}</p>
        <p className="text-body-sm text-on-surface-variant">
          Hand-roasted at regional origins with dual-hub air express packaging for peak aroma and
          freshness.
        </p>
      </Channel>

      <Channel icon="groups" iconClass="bg-cardamom-light text-primary">
        <span className={labelClass}>Community &amp; Stories</span>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={SITE.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp-emerald px-4 py-2 text-label-md font-bold text-pure-parchment shadow-xs transition-all hover:bg-primary"
          >
            <Icon name="groups" className="text-[18px]" />
            Join Community &amp; Stories
          </a>
        </div>
        <p className="text-body-sm text-on-surface-variant pt-1">
          Join our WhatsApp community for batch roasting updates, authentic regional recipes, and pantry stories.
        </p>
      </Channel>
    </div>
  );
}
