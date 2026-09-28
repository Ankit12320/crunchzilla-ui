import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartButton from "@/components/layout/CartButton";
import MobileNav from "@/components/layout/MobileNav";
import NavLinks from "@/components/layout/NavLinks";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 shadow-[0_1px_8px_rgba(45,30,15,0.05)] backdrop-blur-xl">
      <AnnouncementBar />
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={IMAGES.brand.logo}
            alt={`${SITE.name} logo`}
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="flex flex-col">
            <span className="font-display text-headline-sm font-bold tracking-tight text-primary">
              {SITE.name}
            </span>
            <span className="-mt-1 whitespace-nowrap text-label-sm uppercase tracking-widest text-secondary">
              {SITE.tagline}
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
          <button
            type="button"
            aria-label="Search catalog"
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            <Icon name="search" className="text-[22px]" />
          </button>
          <CartButton />
          <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm sm:flex">
            <Icon name="person" className="text-[18px] text-on-primary" />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
