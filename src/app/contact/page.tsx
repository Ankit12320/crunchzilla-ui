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
import JsonLd from "@/components/seo/JsonLd";
import { FAQS } from "@/constants/contact";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/seo-schemas";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us & Support | Buy Bihar Food Products in Bangalore & Pan-India",
  description:
    "Questions about orders, bulk or corporate gifting? Contact Crunchzilla on WhatsApp, phone or email. 24/7 support with express shipping to Bangalore, Patna, and pan-India.",
  alternates: {
    canonical: `${SITE.url}/contact`,
  },
  keywords: [
    "Contact Crunchzilla",
    "Bihar food products in Bangalore",
    "Buy Makhana in Bangalore",
    "Buy Sattu in Bangalore",
    "Crunchzilla customer care",
    "Bulk corporate gifting Bihar snacks",
  ],
  openGraph: {
    title: "Contact Crunchzilla | WhatsApp Orders & 24/7 Concierge Support",
    description:
      "Get in touch for instant WhatsApp ordering, bulk gift hampers, or questions regarding our authentic Bihar food products.",
    url: `${SITE.url}/contact`,
    siteName: SITE.brandName,
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  const faqSchema = getFaqSchema(
    FAQS.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
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
