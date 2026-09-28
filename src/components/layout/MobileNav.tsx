"use client";

import { useState } from "react";
import Icon from "@/components/common/Icon";
import NavLinks from "@/components/layout/NavLinks";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SITE } from "@/constants/site";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high lg:hidden"
      >
        <Icon name="menu" className="text-[24px]" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-surface p-6">
        <SheetTitle className="font-display text-headline-sm font-bold text-primary">
          {SITE.name}
        </SheetTitle>
        <NavLinks
          className="mt-4 flex flex-col items-start gap-2"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
