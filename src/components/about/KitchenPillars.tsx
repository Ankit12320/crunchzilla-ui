import Icon from "@/components/common/Icon";
import { KITCHEN_PILLARS } from "@/constants/about";

export default function KitchenPillars() {
  return (
    <section className="w-full bg-surface-container-low py-10 lg:py-24">
      <div className="container-page">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-label-sm uppercase tracking-widest text-primary">
              Uncompromising Quality
            </span>
            <h2 className="mt-1 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
              Our Four Kitchen Pillars
            </h2>
          </div>
          <p className="max-w-md text-body-md text-on-surface-variant">
            Simple principles guiding every batch of sattu roasted, every bowl of makhana popped, and
            every tilkut hand-pounded.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {KITCHEN_PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div>
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${p.iconClass}`}>
                  <Icon name={p.icon} className="text-[28px]" />
                </div>
                <h3 className="mb-2 text-title-lg text-on-surface">{p.title}</h3>
                <p className="text-body-sm text-on-surface-variant">{p.text}</p>
              </div>
              <div
                className={`mt-6 flex items-center gap-2 border-t border-surface-variant pt-4 text-label-sm uppercase ${p.footerClass}`}
              >
                {p.footer}
                <Icon name="arrow_forward" className="text-[16px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
