import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetailView from "@/components/shop/ProductDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { fetchCatalog } from "@/lib/catalog";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo-schemas";
import { SITE } from "@/constants/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await fetchCatalog();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const SEO_PRODUCT_OVERRIDES: Record<
  string,
  { title: string; description: string; extraKeywords: string[] }
> = {
  "katarni-chura": {
    title: "Buy Authentic Katarni Chura Online | Fragrant Bihar Chura Near Me - Crunchzilla",
    description:
      "Buy authentic GI-tagged Katarni Chura from Bhagalpur, Bihar online. Renowned heirloom fragrance and feather-soft texture for Dahi-Chura and snacks. Express delivery nearby in Bangalore and all across India.",
    extraKeywords: [
      "Katarni Chura near me",
      "Chura near by",
      "Chura nearby",
      "Buy Chura online",
      "Katarni Chura online",
      "Bihar Chura",
      "Dahi Chura",
      "Bhagalpur Katarni Chura",
      "Fragrant rice flakes",
      "Buy Poha near me",
    ],
  },
  "gaya-tilkut": {
    title: "Buy Authentic Gaya Tilkut Online | Handmade Gud Tilkut Near Me - Crunchzilla",
    description:
      "Original hand-pounded Gaya Tilkut made with slow-roasted white sesame seeds and pure unrefined sugarcane gud. Melt-in-mouth traditional Bihar delicacy. Express delivery nearby in Bangalore and pan-India.",
    extraKeywords: [
      "Gaya Tilkut near me",
      "Tilkut nearby",
      "Buy Tilkut online",
      "Gud Tilkut online",
      "Handmade Tilkut",
      "Makar Sankranti Tilkut",
      "Bihar Tilkut in Bangalore",
      "Sesame Jaggery sweet near me",
    ],
  },
  "chana-sattu": {
    title: "Buy Pure Roasted Chana Sattu Online | 100% Desi Sattu Near Me - Crunchzilla",
    description:
      "100% pure wood-fired roasted Bengal gram flour (Chana Sattu) with 24g protein per 100g. Pure stone-ground flour for cooling Sattu Sharbat, Litti Chokha & Parathas. Express delivery nearby in Bangalore & India.",
    extraKeywords: [
      "Chana Sattu near me",
      "Sattu nearby",
      "Buy Sattu online",
      "Pure Chana Sattu",
      "Desi Sattu Bangalore",
      "Roasted gram flour near me",
      "Sattu powder online",
      "Litti Chokha Sattu",
    ],
  },
  "roasted-makhana": {
    title: "Buy Artisanal Mithila Makhana Online | Jumbo 6+ HP Lotus Pops Near Me - Crunchzilla",
    description:
      "Buy hand-harvested jumbo Mithila Phool Makhana slow-roasted in micro-batches with zero palm oil. Fluffy, snow-white, 16g plant protein superfood. Express 1-hour delivery in Bangalore and shipping across India.",
    extraKeywords: [
      "Makhana near me",
      "Makhana nearby",
      "Buy Makhana online",
      "Phool Makhana near me",
      "Mithila Makhana",
      "Jumbo Makhana 6+ HP",
      "Roasted Fox Nuts",
      "Air roasted Makhana in Bangalore",
    ],
  },
  "basmati-poha": {
    title: "Buy Basmati Poha Online | Thin Flattened Chura Near Me - Crunchzilla",
    description:
      "Extra-thin aromatic Basmati Poha flattened gently from heritage grains. Ready in 5 minutes for morning breakfast and tea-time chivda. Express delivery nearby in Bangalore & India.",
    extraKeywords: [
      "Basmati Poha near me",
      "Thin Chura nearby",
      "Buy Poha online",
      "Flattened rice near me",
      "Basmati rice flakes",
    ],
  },
  "jaggery-cubes": {
    title: "Buy Organic Desi Gur Online | Pure Sugarcane Jaggery Cubes Near Me - Crunchzilla",
    description:
      "Pure unrefined sugarcane jaggery cubes made without chemicals or artificial bleaching. Natural mineral-rich sweetener for tea and healthy desserts. Delivered nearby across India.",
    extraKeywords: [
      "Organic Jaggery near me",
      "Desi Gur nearby",
      "Buy Jaggery online",
      "Pure Gud in Bangalore",
      "Chemical free Gur",
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await fetchCatalog();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested authentic Bihar food product could not be found.",
    };
  }

  const override = SEO_PRODUCT_OVERRIDES[slug];
  const title = override?.title ?? `Buy ${product.name} Online | Authentic Food Products from Bihar`;
  const description =
    override?.description ??
    `Buy authentic ${product.name} from Bihar online. ${product.description} Handcrafted, chemical-free, slow roasted. Express delivery across Bangalore, Bihar & India.`;
  const canonicalUrl = `${SITE.url}/shop/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      ...(override?.extraKeywords ?? []),
      `Buy ${product.name} Online`,
      `${product.name} near me`,
      `${product.name} nearby`,
      `${product.name} Bihar`,
      product.name,
      "Authentic food products from Bihar",
      "Traditional Bihar Food Products",
      "Bihar food products in Bangalore",
      product.category,
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE.brandName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const products = await fetchCatalog();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.slug !== product.slug);
  const productSchema = getProductSchema(product);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.name, url: `/shop/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="flex min-h-screen w-full flex-col bg-surface">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}

