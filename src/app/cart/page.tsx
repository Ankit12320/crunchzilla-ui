import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartView from "@/components/cart/CartView";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: `Your Cart | ${SITE.name}`,
  description: `Review your wholesome staples, view order summary, and place your order directly via WhatsApp on ${SITE.name}.`,
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] w-full flex-col bg-surface">
        <CartView />
      </main>
      <Footer />
    </>
  );
}

