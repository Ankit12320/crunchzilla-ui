import Icon from "@/components/common/Icon";
import { SHOP_VALUE_STRIP } from "@/constants/shop";
import { cn } from "@/lib/utils";

export default function ShopValueStrip() {
  return (
    <section className="w-full bg-golden-sand py-3 shadow-sm">
      <div className="container-page flex flex-wrap items-center justify-between gap-4">
        {SHOP_VALUE_STRIP.map(({ icon, label, className }) => (
          <div key={label} className={cn("items-center gap-2", className)}>
            <Icon name={icon} className="text-[20px] text-botanical-forest" />
            <span className="text-label-sm uppercase tracking-wider text-botanical-forest">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
