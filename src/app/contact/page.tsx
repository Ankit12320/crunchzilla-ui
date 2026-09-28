import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactHero from "@/components/contact/ContactHero";
import WhatsAppDeskCard from "@/components/contact/WhatsAppDeskCard";
import ContactChannels from "@/components/contact/ContactChannels";
import PurityPledge from "@/components/contact/PurityPledge";
import ContactForm from "@/components/contact/ContactForm";
import GiftingBanner from "@/components/contact/GiftingBanner";
import FaqAccordion from "@/components/contact/FaqAccordion";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE.name}`,
  description:
    "Questions about orders, bulk or corporate gifting? Reach Crunchzilla on WhatsApp, phone or email — or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex w-full flex-col bg-surface">
        <ContactHero />

        <section className="container-page py-10">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <WhatsAppDeskCard />
              <ContactChannels />
              <PurityPledge />
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-xl bg-surface-container-lowest p-6 shadow-sm lg:p-10">
                <div className="mb-6 space-y-1">
                  <span className="text-label-sm uppercase tracking-wider text-spiced-tangerine">
                    Direct Messaging
                  </span>
                  <h2 className="font-display text-headline-md font-bold tracking-tight text-primary">
                    Send an Inquiry or Feedback
                  </h2>
                  <p className="text-body-md text-on-surface-variant">
                    Fill in your details below and our artisanal pantry consultants will get right
                    back to you.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <GiftingBanner />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
