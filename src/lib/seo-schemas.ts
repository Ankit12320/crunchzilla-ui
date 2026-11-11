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
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.secondaryPhoneDisplay,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
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
    "@type": ["Store", "FoodEstablishment"],
    "@id": `${SITE.url}/#store`,
    name: `${SITE.name} - Authentic Bihar Food Products Near You`,
    url: SITE.url,
    logo: `${SITE.url}${IMAGES.brand.logo}`,
    image: `${SITE.url}${IMAGES.brand.logo}`,
    description:
      "Order authentic traditional food products from Bihar online: Fresh Gaya Tilkut, Pure Wood-Fired Chana Sattu, Artisanal Mithila Makhana, and Fragrant Katarni Chura near you. 1-hour fast delivery in Bangalore, Bihar, and nationwide delivery across India.",
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    priceRange: "₹150 - ₹1600",
    paymentAccepted: "Cash on Delivery, UPI, Cards, Net Banking, WhatsApp Order",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    knowsAbout: [
      "Gaya Tilkut",
      "Pure Chana Sattu",
      "Mithila Makhana",
      "Katarni Chura",
      "Chura nearby",
      "Tilkut near me",
      "Sattu near me",
      "Makhana near me",
      "Authentic Bihar Food Products",
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Bengaluru",
        alternateName: ["Bangalore", "Bangalore Urban", "Bangalore South"],
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
        "@type": "City",
        name: "Delhi",
        sameAs: "https://en.wikipedia.org/wiki/Delhi",
      },
      {
        "@type": "City",
        name: "Mumbai",
        sameAs: "https://en.wikipedia.org/wiki/Mumbai",
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

export function getItemListSchema(products: CatalogProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Authentic Food Products from Bihar",
    description: "Shop authentic Gaya Tilkut, 100% Pure Chana Sattu, Mithila Makhana, and Katarni Chura online.",
    itemListElement: products.map((product, index) => {
      const imageKey = product.image as keyof typeof IMAGES.catalog;
      const imagePath = IMAGES.catalog[imageKey] || IMAGES.brand.logo;
      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE.url}/shop/${product.slug}`,
        name: product.name,
        description: product.description,
        image: `${SITE.url}${imagePath}`,
      };
    }),
  };
}

export function getHomepageFaqSchema() {
  return getFaqSchema([
    {
      question: "Where can I buy authentic Katarni Chura, Tilkut, Sattu, and Makhana near me?",
      answer:
        "You can buy authentic Katarni Chura, Gaya Tilkut, Pure Chana Sattu, and Mithila Makhana online from Crunchzilla (https://crunchzilla.in) with express 1-hour delivery in Bangalore and express courier delivery across Bihar, Patna, Delhi, Mumbai, Kolkata, Pune, and all of India.",
    },
    {
      question: "How do I order authentic Bihar Tilkut, Sattu, and Chura nearby on WhatsApp?",
      answer:
        "You can easily order on WhatsApp by clicking the WhatsApp button on Crunchzilla.in or messaging +91 9448874640 or +91 7856019631. Select your pack size for Gaya Tilkut, Wood-Fired Chana Sattu, Jumbo Makhana, or Katarni Chura for instant checkout and dispatch.",
    },
    {
      question: "What makes Crunchzilla's Katarni Chura from Bihar unique?",
      answer:
        "Crunchzilla's Katarni Chura is authentic GI-tagged heirloom rice sourced directly from Bhagalpur, Bihar. It is naturally flattened without chemical polishing, famous for its rich natural fragrance, light airy crispness, and traditional taste with sweet Dahi (curd).",
    },
    {
      question: "Is Crunchzilla Chana Sattu pure and roasted?",
      answer:
        "Yes, Crunchzilla Chana Sattu is 100% pure Bengal gram slow-roasted in traditional wood-fired kilns and finely ground. It contains 24g natural protein per 100g with zero additives, zero fillers, and no preservatives.",
    },
    {
      question: "How fast is delivery for Makhana, Tilkut, and Sattu nearby?",
      answer:
        "We offer superfast express delivery within 1 hour in select central Bangalore neighborhoods, and reliable 1-3 day delivery across Bangalore, Patna, and pan-India.",
    },
  ]);
}

export function getArticleSchema(blog: {
  title: string;
  metaDescription: string;
  slug: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.image.startsWith("http") ? blog.image : `${SITE.url}${blog.image}`,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      "@type": "Person",
      name: blog.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}${IMAGES.brand.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${blog.slug}`,
    },
  };
}


