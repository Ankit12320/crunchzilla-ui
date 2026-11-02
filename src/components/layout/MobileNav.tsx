"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { FacebookIcon, InstagramIcon } from "@/components/common/SocialIcons";
import NavLinks from "@/components/layout/NavLinks";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import { whatsappLink } from "@/lib/whatsapp";
import { useAuthStore } from "@/store/auth-store";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high active:scale-95 lg:hidden"
      >
        <Icon name="menu" className="text-[24px]" />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between bg-surface p-6 pt-[max(1.5rem,env(safe-area-inset-top,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-xs ring-1 ring-black/5 bg-surface-container-low">
              <Image
                src={IMAGES.brand.logo}
                alt="Crunchzilla – Authentic & Healthy Products from Bihar"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <SheetTitle className="font-display text-headline-sm font-bold text-primary">
              {SITE.name}
            </SheetTitle>
          </div>
          <NavLinks
            className="flex flex-col items-start gap-3 text-title-md"
            onNavigate={() => setOpen(false)}
          />

          <div className="border-t border-surface-container pt-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl bg-surface-container px-3.5 py-2.5 text-title-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
            >
              <Icon name="person" className="text-[20px]" />
              <span>{user ? `Account: ${user.name}` : "My Account / Login"}</span>
            </Link>
          </div>

          <div className="border-t border-surface-container pt-4 space-y-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp-emerald px-4 py-3 text-label-md font-bold text-pure-parchment shadow-sm transition-all hover:bg-secondary"
            >
              <Icon name="chat" className="text-[20px]" />
              Order on WhatsApp
            </a>
            <a
              href={SITE.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-cardamom-light px-4 py-2.5 text-label-md font-semibold text-primary transition-all hover:bg-whatsapp-emerald hover:text-pure-parchment"
            >
              <Icon name="groups" className="text-[20px] text-whatsapp-emerald" />
              Community &amp; Stories
            </a>
          </div>
        </div>

        <div className="border-t border-surface-container pt-6 space-y-3 text-body-sm text-on-surface-variant">
          <div className="flex items-center gap-3">
            <span className="text-label-sm font-semibold uppercase tracking-wider">Follow Us:</span>
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-[#1877F2] hover:text-white"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
          <p className="text-label-xs">
            Direct Support: <a href={`tel:+${SITE.whatsappNumber}`} className="font-semibold text-primary">{SITE.phoneDisplay}</a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
