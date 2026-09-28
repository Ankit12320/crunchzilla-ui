import Icon from "@/components/common/Icon";
import { TRUST_ITEMS } from "@/constants/home";
import { SITE } from "@/constants/site";

export default function TrustRibbon() {
  return (
    <div className="bg-golden-sand px-4 py-2.5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-label-sm uppercase tracking-wider text-secondary">
        <div className="flex items-center gap-2">
          <Icon name="verified" className="text-[16px] text-spiced-tangerine" />
          <span>FSSAI Lic No. {SITE.fssaiLicense}</span>
        </div>
        <div className="hidden items-center gap-6 sm:flex">
          {TRUST_ITEMS.map(({ icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <Icon name={icon} className="text-[15px] text-primary" />
              {label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Icon name="star" filled className="text-[16px]" />
          <span className="font-bold">{SITE.rating}</span>
          <span className="lowercase opacity-80">({SITE.happyHouseholds} happy households)</span>
        </div>
      </div>
    </div>
  );
}
