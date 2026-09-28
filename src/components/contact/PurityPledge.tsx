import Icon from "@/components/common/Icon";

export default function PurityPledge() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-cardamom-light p-4 text-botanical-forest">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-botanical-forest text-on-primary">
        <Icon name="shield" className="text-[20px]" />
      </div>
      <div>
        <div className="text-title-sm font-bold">100% Purity &amp; Freshness Guarantee</div>
        <p className="text-body-sm text-botanical-forest/80">
          No artificial colors, no palm oil, and zero stale stocks. Replacements honored
          unconditionally.
        </p>
      </div>
    </div>
  );
}
