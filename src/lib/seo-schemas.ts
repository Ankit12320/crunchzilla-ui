import { SITE } from "@/constants/site";
import { IMAGES } from "@/constants/images";
import type { CatalogProduct } from "@/types/catalog";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: [SITE.brandName, "Crunchzilla Foods", "Crunchzilla India"],
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}${IMAGES.brand.logo}`,
      caption: `${SITE.name} Logo`,
    },
    image: `${SITE.url}${IMAGES.brand.logo}`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneDisplay,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
        contactOption: "TollFree",
      },
    ],
    sameAs: [
      SITE.facebookUrl,
      SITE.instagramUrl,
      SITE.whatsappCommunityUrl,
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: "Crunchzilla - Authentic Food Products from Bihar",
    inLanguage: "en-IN",
    description: SITE.description,
    publisher: {
      "@id": `${SITE.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE.url}/#store`,
    name: `${SITE.name} - Authentic Bihar Food Products`,
    url: SITE.url,
    logo: `${SITE.url}${IMAGES.brand.logo}`,
    image: `${SITE.url}${IMAGES.brand.logo}`,
    description:
      "Online store selling authentic traditional food products from Bihar. Premium Makhana, Chana Sattu, Gaya Tilkut, Katarni Chura, and Organic Jaggery delivered to Bangalore, Bihar, and all across India.",
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    priceRange: "₹150 - ₹1600",
    paymentAccepted: "Cash on Delivery, UPI, Cards, Net Banking, WhatsApp Order",
    currenciesAccepted: "INR",
    areaServed: [
      {
        "@type": "City",
        name: "Bengaluru",
        alternateName: "Bangalore",
        sameAs: "https://en.wikipedia.org/wiki/Bangalore",
      },
      {
        "@type": "State",
        name: "Bihar",
        sameAs: "https://en.wikipedia.org/wiki/Bihar",
      },
      {
        "@type": "City",
        name: "Patna",
        sameAs: "https://en.wikipedia.org/wiki/Patna",
      },
      {
        "@type": "City",
        name: "Gaya",
        sameAs: "https://en.wikipedia.org/wiki/Gaya_(India)",
      },
      {
        "@type": "City",
        name: "Darbhanga",
        sameAs: "https://en.wikipedia.org/wiki/Darbhanga",
      },
      {
        "@type": "Country",
        name: "India",
        sameAs: "https://en.wikipedia.org/wiki/India",
      },
    ],
  };
}

export function getProductSchema(product: CatalogProduct) {
  const primaryVariant = product.variants[0];
  const highPrice = product.variants[product.variants.length - 1]?.price ?? primaryVariant.price;
  const imageKey = product.image as keyof typeof IMAGES.catalog;
  const imagePath = IMAGES.catalog[imageKey] || IMAGES.brand.logo;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.url}/shop/${product.slug}#product`,
    name: product.name,
    image: [`${SITE.url}${imagePath}`],
    description: product.description,
    sku: `CRUNCH-${product.slug.toUpperCase()}`,
    mpn: `MPN-${product.slug}`,
    brand: {
      "@type": "Brand",
      name: SITE.brandName,
    },
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      url: `${SITE.url}/shop/${product.slug}`,
      priceCurrency: "INR",
      lowPrice: primaryVariant.price,
      highPrice: highPrice,
      offerCount: product.variants.length,
      offers: product.variants.map((v) => ({
        "@type": "Offer",
        name: `${product.name} - ${v.label}`,
        price: v.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url: `${SITE.url}/shop/${product.slug}`,
        seller: {
          "@type": "Organization",
          name: SITE.name,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
