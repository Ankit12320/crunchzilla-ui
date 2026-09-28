import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrustRibbon from "@/components/home/TrustRibbon";
import HeroSection from "@/components/home/HeroSection";
import PillarsSection from "@/components/home/PillarsSection";
import BestsellersSection from "@/components/home/BestsellersSection";
import MakhanaSpotlight from "@/components/home/MakhanaSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeedbackSection from "@/components/home/FeedbackSection";
import { fetchBestsellers } from "@/lib/products";
import { fetchTestimonials } from "@/lib/testimonials";

export default async function Home() {
  const [products, testimonials] = await Promise.all([
    fetchBestsellers(),
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
      </main>
      <Footer />
    </>
  );
}
