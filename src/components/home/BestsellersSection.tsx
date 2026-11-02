import PantryBanner from "@/components/home/PantryBanner";
import CatalogProductCard from "@/components/shop/CatalogProductCard";
import type { CatalogProduct } from "@/types/catalog";

export default function BestsellersSection({ products }: { products: CatalogProduct[] }) {
  return (
    <section id="bestsellers" className="w-full scroll-mt-header bg-surface-container-low py-16 md:py-20">
      <div className="container-page">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-1 block text-label-md uppercase tracking-widest text-primary">
              Traditional Bihar Food Products Online
            </span>
            <h2 className="font-display text-headline-lg-mobile font-bold text-on-surface md:text-headline-lg">
              Authentic Bihar Staples & Snacks.{" "}
              <span className="italic text-primary">Rooted in Heritage.</span>
            </h2>
            <p className="mt-2 max-w-2xl text-body-md text-on-surface-variant">
              Shop slow-roasted Gaya Tilkut, organic Mithila Makhana, wood-fired Chana Sattu, and fragrant Katarni Chura — pure, chemical-free delicacies from Bihar shipped to Bangalore, Patna, and nationwide.
            </p>
          </div>
          <span className="self-start rounded-full bg-golden-sand px-3.5 py-1.5 text-label-md text-primary md:self-auto whitespace-nowrap">
            Fresh Batches Ready to Ship
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <CatalogProductCard key={product.slug} product={product} />
          ))}
        </div>

        <PantryBanner />
      </div>
    </section>
  );
}
