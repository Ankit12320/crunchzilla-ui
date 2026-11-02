import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-b from-surface via-surface-container-low to-surface text-on-surface">
      {/* Top Header Logo */}
      <header className="w-full py-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Crunchzilla Home"
        >
          <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full shadow-xs ring-1 ring-black/5 bg-surface-container-low">
            <Image
              src={IMAGES.brand.logo}
              alt="Crunchzilla – Authentic & Healthy Products from Bihar"
              width={48}
              height={48}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display text-headline-md font-bold tracking-tight text-primary">
            {SITE.brandName}
          </span>
        </Link>
      </header>

      {/* Main Content Box */}
      <main className="container-page flex flex-1 items-center justify-center py-6 sm:py-10">
        <div className="w-full max-w-md rounded-3xl bg-pure-parchment p-6 sm:p-10 shadow-premium-lg border border-amber-900/10">
          <div className="mb-6 text-center">
            <h1 className="font-display text-headline-sm font-bold text-on-surface">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1.5 text-body-sm text-on-surface-variant">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </main>

      {/* Standard Consistent Footer */}
      <footer className="border-t border-outline-variant/30 bg-surface py-6 text-center text-label-sm text-on-surface-variant">
        <div className="container-page space-y-3">
          <p className="font-semibold text-primary">
            {SITE.brandName} • <span className="italic">{SITE.tagline}</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-label-sm">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/shop" className="transition-colors hover:text-primary">
              Shop All
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/about" className="transition-colors hover:text-primary">
              About Us
            </Link>
            <span className="opacity-40">•</span>
            <Link href="/contact" className="transition-colors hover:text-primary">
              Contact Us
            </Link>
          </div>
          <p className="text-[12px] opacity-75">
            Copyright © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

