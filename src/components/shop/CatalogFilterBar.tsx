"use client";

import Icon from "@/components/common/Icon";
import { CATALOG_CATEGORIES, SORT_OPTIONS } from "@/constants/shop";
import { cn } from "@/lib/utils";
import type { CatalogSort } from "@/types/catalog";

interface CatalogFilterBarProps {
  category: string;
  sort: CatalogSort;
  totalCount: number;
  visibleCount: number;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: CatalogSort) => void;
}

export default function CatalogFilterBar({
  category,
  sort,
  totalCount,
  visibleCount,
  onCategoryChange,
  onSortChange,
}: CatalogFilterBarProps) {
  return (
    <section className="sticky top-header z-30 w-full bg-surface/95 py-3.5 shadow-sm backdrop-blur-md">
      <div className="container-page flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
        <div
          role="group"
          aria-label="Filter by category"
          className="no-scrollbar flex min-w-0 items-center gap-2 overflow-x-auto pb-1 md:pb-0 lg:flex-wrap lg:overflow-visible"
        >
          {CATALOG_CATEGORIES.map(({ id, label }) => {
            const active = id === category;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => onCategoryChange(id)}
                className={cn(
                  "rounded-full px-4 py-2 text-label-md whitespace-nowrap transition-all",
                  active
                    ? "bg-roasted-terracotta text-pure-parchment shadow-sm"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                )}
              >
                {id === "all" ? `${label} (${totalCount})` : label}
              </button>
            );
          })}
        </div>

        <div className="flex w-full shrink-0 items-center justify-between gap-3 md:w-auto md:justify-end">
          <span aria-live="polite" className="hidden whitespace-nowrap text-label-sm text-on-surface-variant sm:inline">
            Showing {visibleCount} artisan {visibleCount === 1 ? "item" : "items"}
          </span>
          <div className="relative inline-flex items-center">
            <label htmlFor="catalog-sort" className="sr-only">
              Sort by
            </label>
            <Icon
              name="swap_vert"
              className="pointer-events-none absolute left-3 text-[18px] text-on-surface-variant"
            />
            <select
              id="catalog-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as CatalogSort)}
              className="cursor-pointer appearance-none rounded-full bg-surface-container-low py-2 pr-9 pl-9 text-label-md text-on-surface transition-colors hover:bg-surface-container focus:ring-2 focus:ring-roasted-terracotta focus:outline-none"
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-3 text-[18px] text-on-surface-variant"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
