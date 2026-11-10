import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import CartDrawer from "@/components/cart/CartDrawer";
import Toaster from "@/components/common/Toaster";
import WhatsAppFab from "@/components/common/WhatsAppFab";
import JsonLd from "@/components/seo/JsonLd";
import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getLocalBusinessSchema,
} from "@/lib/seo-schemas";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brandName} | Authentic & Healthy Food Products from Bihar`,
    template: `%s | ${SITE.brandName}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: SITE.googleSiteVerification || undefined,
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.brandName,
    title: `${SITE.brandName} | Authentic & Healthy Products from Bihar`,
    description: SITE.description,
    images: [
      {
        url: IMAGES.brand.logo,
        width: 800,
        height: 800,
        alt: `${SITE.brandName} - Authentic & Healthy Traditional Food Products from Bihar`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandName} | Authentic & Healthy Food Products from Bihar`,
    description: SITE.description,
    images: [IMAGES.brand.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: IMAGES.brand.logo,
    apple: IMAGES.brand.logo,
  },
  other: {
    "geo.region": "IN-KA;IN-BR",
    "geo.placename": "Bengaluru, Patna, Bihar, India",
    "geo.position": "12.9716;77.5946",
    "ICBM": "12.9716, 77.5946",
    "apple-mobile-web-app-title": "Crunchzilla",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#903f00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={orgSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} />
        {SITE.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${SITE.googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppFab />
        <Toaster />
        <CartDrawer />
      </body>
    </html>
  );
}
