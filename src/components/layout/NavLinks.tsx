"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/constants/site";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  className?: string;
  onNavigate?: () => void;
}

export default function NavLinks({ className, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {NAV_LINKS.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-label-lg font-semibold transition-all duration-200 active:scale-95",
              active
                ? "bg-primary text-pure-parchment shadow-xs"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
