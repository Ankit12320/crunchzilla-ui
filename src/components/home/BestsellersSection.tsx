import PantryBanner from "@/components/home/PantryBanner";
import ProductCard from "@/components/home/ProductCard";
import type { Product } from "@/types/product";

export default function BestsellersSection({ products }: { products: Product[] }) {
  return (
    <section id="bestsellers" className="w-full scroll-mt-header bg-surface-container-low py-16 md:py-20">
      <div className="container-page">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-1 block text-label-md uppercase tracking-widest text-primary">
              Shop Our Bestsellers
            </span>
            <h2 className="font-display text-headline-lg-mobile font-bold text-on-surface md:text-headline-lg">
              Rooted in Heritage.{" "}
              <span className="italic text-primary">Made for Modern Living.</span>
            </h2>
          </div>
          <span className="self-start rounded-full bg-golden-sand px-3.5 py-1.5 text-label-md text-primary md:self-auto">
            Fresh Batches Ready to Ship
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <PantryBanner />
      </div>
    </section>
  );
}
