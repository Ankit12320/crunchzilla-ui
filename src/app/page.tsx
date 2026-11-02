import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustRibbon from "@/components/home/TrustRibbon";
import HeroSection from "@/components/home/HeroSection";
import PillarsSection from "@/components/home/PillarsSection";
import BestsellersSection from "@/components/home/BestsellersSection";
import MakhanaSpotlight from "@/components/home/MakhanaSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeedbackSection from "@/components/home/FeedbackSection";
import VideoSection from "@/components/home/VideoSection";
import { fetchCatalog } from "@/lib/catalog";
import { fetchTestimonials } from "@/lib/testimonials";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Authentic Food Products from Bihar | Buy Makhana, Sattu & Gaya Tilkut Online",
  description:
    "Buy authentic traditional food products from Bihar online: Premium Makhana, Pure Chana Sattu, Gaya Tilkut, Katarni Chura & Organic Desi Gur. Express delivery to Bangalore, Bihar and across India.",
  alternates: {
    canonical: SITE.url,
  },
  keywords: [
    "Authentic food products from Bihar",
    "Buy Makhana Online",
    "Buy Sattu Online",
    "Traditional Bihar Food Products",
    "Bihar Special Food Products",
    "Buy Gaya Tilkut Online",
    "Bihar food products in Bangalore",
    "Buy Makhana in Bangalore",
    "Buy Sattu in Bangalore",
    "Bihar traditional snacks online",
    "Authentic Bihar products online",
  ],
  openGraph: {
    title: "Authentic Food Products from Bihar | Buy Makhana, Sattu & Gaya Tilkut",
    description:
      "Wholesome artisanal staples and traditional delicacies from Bihar crafted with zero chemicals and no palm oil. Delivered to your doorstep.",
    url: SITE.url,
    siteName: SITE.brandName,
  },
};

export default async function Home() {
  const [products, testimonials] = await Promise.all([
    fetchCatalog(),
    fetchTestimonials(),
  ]);

  return (
    <>
      <Header />
      <main className="flex w-full flex-col bg-surface">
        <TrustRibbon />
        <HeroSection />
        <PillarsSection />
        <BestsellersSection products={products} />
        <MakhanaSpotlight />
        <TestimonialsSection testimonials={testimonials} />
        <FeedbackSection />
        <VideoSection />
      </main>
      <Footer />
    </>
  );
}
