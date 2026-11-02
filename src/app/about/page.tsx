import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import OriginStory from "@/components/about/OriginStory";
import KitchenPillars from "@/components/about/KitchenPillars";
import CraftProcess from "@/components/about/CraftProcess";
import CommunityLove from "@/components/about/CommunityLove";
import EthosCallout from "@/components/about/EthosCallout";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo-schemas";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "About Our Story | Authentic & Healthy Food Products from Bihar",
  description:
    "Discover Crunchzilla's mission: reviving authentic, slow-roasted Bihar food traditions — Gaya Tilkut, Mithila Makhana, and Pure Chana Sattu crafted without chemicals or palm oil.",
  alternates: {
    canonical: `${SITE.url}/about`,
  },
  keywords: [
    "About Crunchzilla",
    "Traditional Bihar food products",
    "Authentic food products from Bihar",
    "Gaya Tilkut heritage",
    "Mithila Makhana",
    "Pure Chana Sattu",
    "Bihar food products in Bangalore",
  ],
  openGraph: {
    title: "About Crunchzilla | Preserving Authentic Bihar Food Traditions",
    description:
      "Handcrafted slow-roasted staples from Gaya, Mithila, and Bhagalpur. Chemical-free, nutrient-rich, and deeply authentic.",
    url: `${SITE.url}/about`,
    siteName: SITE.brandName,
  },
};

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="flex w-full flex-col bg-surface">
        <AboutHero />
        <OriginStory />
        <KitchenPillars />
        <CraftProcess />
        <CommunityLove />
        <EthosCallout />
      </main>
      <Footer />
    </>
  );
}
