import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShopValueStrip from "@/components/shop/ShopValueStrip";
import CatalogHeader from "@/components/shop/CatalogHeader";
import CatalogBrowser from "@/components/shop/CatalogBrowser";
import HamperFeature from "@/components/shop/HamperFeature";
import JsonLd from "@/components/seo/JsonLd";
import { fetchCatalog, fetchFeaturedHamper } from "@/lib/catalog";
import { getBreadcrumbSchema } from "@/lib/seo-schemas";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Buy Authentic Food Products from Bihar Online | Shop Traditional Bihar Staples",
  description:
    "Shop traditional Bihar food products online: authentic Gaya Tilkut, crispy Mithila Makhana, pure roasted Chana Sattu, Katarni Chura & organic Gud. Chemical-free with express shipping to Bangalore and pan-India.",
  alternates: {
    canonical: `${SITE.url}/shop`,
  },
  keywords: [
    "Buy Traditional Bihar Food Products",
    "Buy Makhana Online",
    "Buy Sattu Online",
    "Buy Gaya Tilkut Online",
    "Bihar food products in Bangalore",
    "Katarni Chura Online",
    "Pure Chana Sattu",
    "Organic Jaggery Gud",
  ],
  openGraph: {
    title: "Buy Authentic Food Products from Bihar Online | Crunchzilla Shop",
    description:
      "Handcrafted slow-roasted staples from Bihar: Makhana, Sattu, Tilkut, Katarni Chura, and Organic Jaggery.",
    url: `${SITE.url}/shop`,
    siteName: SITE.brandName,
  },
};

export default async function ShopPage() {
  const [products, hamper] = await Promise.all([fetchCatalog(), fetchFeaturedHamper()]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
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
