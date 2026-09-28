"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/common/Icon";
import CatalogFilterBar from "@/components/shop/CatalogFilterBar";
import CatalogProductCard from "@/components/shop/CatalogProductCard";
import { filterAndSortCatalog } from "@/lib/catalog-filters";
import type { CatalogProduct, CatalogSort } from "@/types/catalog";

export default function CatalogBrowser({ products }: { products: CatalogProduct[] }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<CatalogSort>("featured");

  const visible = useMemo(
    () => filterAndSortCatalog(products, category, sort),
    [products, category, sort]
  );

  return (
    <>
      <CatalogFilterBar
        category={category}
        sort={sort}
        totalCount={products.length}
        visibleCount={visible.length}
        onCategoryChange={setCategory}
        onSortChange={setSort}
      />

      <section className="w-full py-8">
        <div className="container-page">
          {visible.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product) => (
                <CatalogProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-surface-container-low py-16 text-center">
              <Icon name="search_off" className="text-[40px] text-on-surface-variant" />
              <p className="text-title-md text-on-surface">No products match this filter</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setSort("featured");
                }}
                className="text-label-md text-primary hover:underline"
              >
                Show all products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
