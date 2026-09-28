import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShopValueStrip from "@/components/shop/ShopValueStrip";
import CatalogHeader from "@/components/shop/CatalogHeader";
import CatalogBrowser from "@/components/shop/CatalogBrowser";
import HamperFeature from "@/components/shop/HamperFeature";
import { fetchCatalog, fetchFeaturedHamper } from "@/lib/catalog";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `Shop All | ${SITE.name}`,
  description:
    "Shop slow-roasted Tilkut, Makhana, Sattu, Katarni Chura, Basmati Poha and pure jaggery — chemical-free staples from Bihar.",
};

export default async function ShopPage() {
  const [products, hamper] = await Promise.all([fetchCatalog(), fetchFeaturedHamper()]);

  return (
    <>
      <Header />
      <main className="flex w-full flex-col bg-surface">
        <ShopValueStrip />
        <CatalogHeader productCount={products.length} />
        <CatalogBrowser products={products} />
        <HamperFeature hamper={hamper} />
      </main>
      <Footer />
    </>
  );
}
