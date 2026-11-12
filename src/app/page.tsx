import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustRibbon from "@/components/home/TrustRibbon";
import MakhanaHeroSection from "@/components/home/MakhanaHeroSection";
import ExploreMakhanaSection from "@/components/home/ExploreMakhanaSection";
import HeroSection from "@/components/home/HeroSection";
import PillarsSection from "@/components/home/PillarsSection";
import BestsellersSection from "@/components/home/BestsellersSection";
import MakhanaSpotlight from "@/components/home/MakhanaSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SeoFaqSection from "@/components/home/SeoFaqSection";
import FeedbackSection from "@/components/home/FeedbackSection";
import VideoSection from "@/components/home/VideoSection";
import CrackerAnimation from "@/components/home/CrackerAnimation";
import JsonLd from "@/components/seo/JsonLd";
import { fetchCatalog } from "@/lib/catalog";
import { fetchTestimonials } from "@/lib/testimonials";
import { getItemListSchema, getHomepageFaqSchema } from "@/lib/seo-schemas";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Buy Tilkut, Sattu, Makhana & Katarni Chura Online | Crunchzilla",
  description:
    "Order authentic Gaya Tilkut, 100% Pure Chana Sattu, Mithila Makhana & Fragrant Katarni Chura near you. 1-hour fast delivery in Bangalore & shipping across India.",
  alternates: {
    canonical: SITE.url,
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
    "Authentic food products from Bihar",
    "Traditional Bihar Food Products",
    "Bihar Special Food Products",
    "Buy Gaya Tilkut Online",
    "Bihar food products in Bangalore",
    "Buy Makhana in Bangalore",
    "Buy Sattu in Bangalore",
    "Buy Chura in Bangalore",
    "Bihar traditional snacks online",
    "Authentic Bihar products online",
    "Pure Chana Sattu",
    "Gaya Tilkut",
    "Katarni Chura",
    "Basmati Chura",
    "Organic Jaggery Gud",
    "Dahi Chura Bihar",
  ],
  openGraph: {
    title: "Buy Tilkut, Sattu, Makhana & Katarni Chura Online | Crunchzilla",
    description:
      "Wholesome artisanal staples and traditional delicacies from Bihar: Gaya Tilkut, Pure Chana Sattu, Mithila Makhana, and Katarni Chura delivered near you.",
    url: SITE.url,
    siteName: SITE.brandName,
  },
};

export default async function Home() {
  const [products, testimonials] = await Promise.all([
    fetchCatalog(),
    fetchTestimonials(),
  ]);

  const faqSchema = getHomepageFaqSchema();
  const itemListSchema = getItemListSchema(products);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={itemListSchema} />
      <Header />
      <main className="relative flex w-full flex-col bg-surface">
        <CrackerAnimation />
        <TrustRibbon />
        <MakhanaHeroSection />
        <ExploreMakhanaSection />
        <HeroSection />
        <PillarsSection />
        <BestsellersSection products={products} />
        <MakhanaSpotlight />
        <TestimonialsSection testimonials={testimonials} />
        <SeoFaqSection />
        <FeedbackSection />
        <VideoSection />
      </main>
      <Footer />
    </>
  );
}
