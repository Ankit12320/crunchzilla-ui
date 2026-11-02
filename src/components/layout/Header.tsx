import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
//import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartButton from "@/components/layout/CartButton";
import AccountButton from "@/components/layout/AccountButton";
import MobileNav from "@/components/layout/MobileNav";
import NavLinks from "@/components/layout/NavLinks";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 shadow-[0_1px_8px_rgba(45,30,15,0.05)] backdrop-blur-xl">
      {/* //<AnnouncementBar /> */}
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
          aria-label="Crunchzilla Homepage"
        >
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full shadow-xs ring-1 ring-black/5 bg-surface-container-low transition-transform duration-200 group-hover:scale-105">
            <Image
              src={IMAGES.brand.logo}
              alt="Crunchzilla – Authentic & Healthy Products from Bihar"
              width={48}
              height={48}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <span className="flex flex-col">
            <span className="font-display text-headline-sm font-bold tracking-tight text-primary transition-colors group-hover:text-roasted-terracotta">
              {SITE.name}
            </span>
            <span className="hidden sm:inline text-label-xs font-semibold uppercase tracking-wider text-spiced-tangerine">
              Authentic Bihar Delicacies
            </span>
          </span>
        </Link>

        <NavLinks className="hidden items-center gap-2 lg:flex" />

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-whatsapp-emerald px-4 py-2 text-label-md text-pure-parchment shadow-[0_2px_8px_rgba(37,211,102,0.25)] whitespace-nowrap transition-all hover:bg-secondary md:inline-flex lg:hidden xl:inline-flex"
          >
            <Icon name="chat" className="text-[18px]" />
            WhatsApp Order
          </a>
          <AccountButton />
          <CartButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
