import Link from "next/link";
import Icon from "@/components/common/Icon";
import { FOOTER_CATEGORIES, LEGAL_LINKS, NAV_LINKS, SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

const headingClass = "mb-4 text-title-sm uppercase tracking-widest text-primary";
const linkClass = "transition-colors hover:text-primary";

export default function Footer() {
  const careItems = [
    { icon: "call", iconClass: "text-primary", label: SITE.phoneDisplay, href: `tel:+${SITE.whatsappNumber}` },
    { icon: "mail", iconClass: "text-primary", label: SITE.email, href: `mailto:${SITE.email}` },
    { icon: "schedule", iconClass: "text-secondary", label: `Open ${SITE.supportHours}, all days` },
    {
      icon: "chat",
      iconClass: "text-whatsapp-emerald",
      label: `WhatsApp Support: ${SITE.phoneDisplay}`,
      href: whatsappLink(),
      external: true,
    },
  ];

  return (
    <footer className="w-full bg-surface-container-low pt-10 pb-6 text-on-surface shadow-[0_-1px_12px_rgba(45,30,15,0.03)]">
      <div className="container-page grid grid-cols-1 gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-headline-md font-bold tracking-tight text-primary">
            {SITE.name}
          </p>
          <p className="text-body-sm text-on-surface-variant">{SITE.footerBlurb}</p>
          <div className="inline-flex items-center gap-2 rounded-full bg-cardamom-light px-3 py-1.5 text-label-sm text-botanical-forest">
            <Icon name="verified" className="text-[16px]" />
            FSSAI Lic No: {SITE.fssaiLicense}
          </div>
          <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
            <Icon name="favorite" className="text-[18px] text-primary" />
            Made with Pride in India
          </div>
        </div>

        <div>
          <h3 className={headingClass}>Quick Navigation</h3>
          <ul className="space-y-2.5 text-body-sm text-on-surface-variant">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={headingClass}>Product Categories</h3>
          <ul className="space-y-2.5 text-body-sm text-on-surface-variant">
            {FOOTER_CATEGORIES.map((label) => (
              <li key={label}>
                <Link href="/shop" className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={headingClass}>Customer Care</h3>
          <ul className="space-y-2 text-body-sm text-on-surface-variant">
            {careItems.map(({ icon, iconClass, label, href, external }) => (
              <li key={icon} className="flex items-start gap-2.5">
                <Icon name={icon} className={`mt-0.5 text-[18px] ${iconClass}`} />
                {href ? (
                  <a
                    href={href}
                    className={linkClass}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-2 border-t border-outline-variant/30 pt-4 text-label-sm text-on-surface-variant md:flex-row">
        <p>
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className={linkClass}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
