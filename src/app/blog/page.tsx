import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";
import { fetchBlogs } from "@/lib/blogs";
import { getBreadcrumbSchema } from "@/lib/seo-schemas";

export const metadata: Metadata = {
  title: "Makhana & Healthy Snacking Journal | Nutritional Guides, Recipes & Heritage - Crunchzilla",
  description:
    "Explore in-depth nutrition guides, authentic recipes, and healthy snacking comparisons on Makhana (Fox Nuts), Peri Peri flavours, Chana Sattu, and traditional Bihar superfoods.",
  keywords: [
    "What is Makhana",
    "Benefits of Makhana",
    "Healthy Snacks Online India",
    "Peri Peri Makhana",
    "Makhana Wholesale Supplier",
    "Makhana nutrition facts",
    "Chana Sattu benefits",
    "Makhana recipes",
  ],
  alternates: {
    canonical: `${SITE.url}/blog`,
  },
  openGraph: {
    title: "Makhana & Healthy Snacking Journal | Crunchzilla",
    description:
      "Explore in-depth nutrition guides, authentic recipes, and healthy snacking comparisons on Makhana (Fox Nuts) and traditional Bihar superfoods.",
    url: `${SITE.url}/blog`,
    siteName: SITE.brandName,
  },
};

export default async function BlogIndexPage() {
  const blogs = await fetchBlogs();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Journal & Guides", url: "/blog" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Header />
      <main className="min-h-screen bg-surface">
        {/* Hero Header */}
        <section className="bg-surface-container-low border-b border-surface-container py-12 md:py-16">
          <div className="container-page text-center max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-roasted-terracotta/10 px-3.5 py-1 text-label-sm font-bold text-primary">
              <Icon name="menu_book" className="text-[16px]" />
              <span>Crunchzilla Food &amp; Wellness Journal</span>
            </span>
            <h1 className="font-display text-headline-lg md:text-display-sm font-bold text-primary">
              Makhana Guides, Nutrition &amp; Healthy Snacking
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Evidence-backed nutrition facts, authentic recipes, flavour comparisons, and B2B wholesale sourcing insights from Bihar&apos;s leading traditional superfood brand.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container-page py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-pure-parchment border border-amber-900/10 shadow-premium-sm transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-low">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-pure-parchment/95 backdrop-blur-xs px-3 py-1 text-label-xs font-bold text-primary shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-label-xs text-on-surface-variant font-medium">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-display text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-hidden">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-body-sm text-on-surface-variant line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-surface-container/60 mt-4 flex items-center justify-between">
                  <span className="text-label-xs text-on-surface font-semibold">
                    By {post.author.name}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-label-sm font-bold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
