import Link from "next/link";
import { CURRENT_BATCH } from "@/constants/shop";
import { SITE } from "@/constants/site";

export default function CatalogHeader({ productCount }: { productCount: number }) {
  const metrics = [
    { value: String(productCount), label: "Signature Staples", tone: "text-primary" },
    { value: "0%", label: "Preservatives", tone: "text-secondary" },
    { value: `${SITE.rating.split("/")[0]}★`, label: "Customer Score", tone: "text-warm-amber" },
  ];

  return (
    <section className="w-full bg-surface pt-10 pb-8">
      <div className="container-page">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-label-md text-on-surface-variant">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span aria-current="page" className="font-bold text-primary">
              Catalog
            </span>
          </nav>
          <div className="inline-flex items-center gap-2 rounded-full bg-cardamom-light px-3 py-1 text-label-sm text-botanical-forest">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-whatsapp-emerald" />
            {CURRENT_BATCH}
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mb-1.5 text-label-lg uppercase tracking-widest text-roasted-terracotta">
              Handcrafted Indian Pantry Essentials
            </p>
            <h1 className="font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
              Wholesome Staples &amp; Roasted Treats
            </h1>
            <p className="mt-2.5 max-w-2xl text-body-lg text-on-surface-variant">
              100% natural, slow-roasted, chemical-free ingredients sourced directly from regional
              artisanal clusters in Bihar. Pure, honest nutrition for daily modern living.
            </p>
          </div>

          <dl className="flex items-center justify-start gap-6 rounded-xl bg-surface-container-low p-4 lg:col-span-4 lg:justify-end">
            {metrics.map(({ value, label, tone }, i) => (
              <div key={label} className="flex items-center gap-6">
                {i > 0 && <div className="h-8 w-px bg-outline-variant/40" />}
                <div className="flex flex-col-reverse text-left">
                  <dt className="mt-1 text-label-sm uppercase text-on-surface-variant">{label}</dt>
                  <dd className={`font-display text-headline-sm leading-none font-bold ${tone}`}>
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
