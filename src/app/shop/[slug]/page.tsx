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

  const title = `Buy ${product.name} Online | Authentic Food Products from Bihar`;
  const description = `Buy authentic ${product.name} from Bihar online. ${product.description} Handcrafted, chemical-free, slow roasted. Express delivery across Bangalore, Bihar & India.`;
  const canonicalUrl = `${SITE.url}/shop/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `Buy ${product.name} Online`,
      `${product.name} Bihar`,
      product.name,
      "Authentic food products from Bihar",
      "Traditional Bihar Food Products",
      "Bihar food products in Bangalore",
      product.category,
    ],
    openGraph: {
      title: `${product.name} | ${SITE.brandName}`,
      description,
      url: canonicalUrl,
      siteName: SITE.brandName,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE.brandName}`,
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

