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
  title: "Buy Tilkut, Sattu, Makhana & Katarni Chura Online | Crunchzilla Shop",
  description:
    "Shop authentic Bihar food products online: original Gaya Tilkut, pure roasted Chana Sattu, Mithila Makhana & fragrant Katarni Chura near you. 1-hour fast delivery in Bangalore & express shipping pan-India.",
  alternates: {
    canonical: `${SITE.url}/shop`,
  },
  keywords: [
    "Buy Tilkut Online",
    "Gaya Tilkut Near Me",
    "Tilkut Nearby",
    "Buy Sattu Online",
    "Pure Chana Sattu Near Me",
    "Sattu Nearby",
    "Buy Makhana Online",
    "Makhana Near Me",
    "Makhana Nearby",
    "Katarni Chura Near Me",
    "Chura Near By",
    "Chura Nearby",
    "Buy Chura Online",
    "Katarni Chura Online",
    "Bihar food products in Bangalore",
    "Traditional Bihar Food Products",
    "Pure Chana Sattu",
    "Organic Jaggery Gud",
  ],
  openGraph: {
    title: "Buy Authentic Food Products from Bihar Online | Crunchzilla Shop",
    description:
      "Handcrafted slow-roasted staples from Bihar: Makhana, Sattu, Tilkut, Katarni Chura, and Organic Jaggery delivered near you.",
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
