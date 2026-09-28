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

const socialClass =
  "inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5 text-label-md text-on-surface transition-colors hover:bg-primary-fixed-dim";

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

      <Channel icon="share" iconClass="bg-surface-container text-primary">
        <span className={labelClass}>Community &amp; Stories</span>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={socialClass}>
            <Icon name="photo_camera" className="text-[16px]" />
            {SITE.instagramHandle}
          </a>
          <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className={socialClass}>
            <Icon name="public" className="text-[16px]" />
            Facebook
          </a>
        </div>
      </Channel>
    </div>
  );
}
