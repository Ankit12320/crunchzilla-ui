import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import OriginStory from "@/components/about/OriginStory";
import KitchenPillars from "@/components/about/KitchenPillars";
import CraftProcess from "@/components/about/CraftProcess";
import CommunityLove from "@/components/about/CommunityLove";
import EthosCallout from "@/components/about/EthosCallout";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `Our Story | ${SITE.name}`,
  description:
    "Why we revive forgotten Indian staples — slow-roasted Tilkut, Makhana and Sattu from Gaya and Mithila, made with honesty, care and heritage taste.",
};

export default function AboutPage() {
  return (
    <>
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
