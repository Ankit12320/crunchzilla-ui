import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/common/Icon";
import { SITE } from "@/constants/site";
import { fetchBlogs, fetchBlogBySlug } from "@/lib/blogs";
import { fetchCatalog } from "@/lib/catalog";
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo-schemas";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
      description: "The requested guide could not be found.",
    };
  }

  const canonicalUrl = `${SITE.url}/blog/${blog.slug}`;

  return {
    title: `${blog.title} | Crunchzilla Journal`,
    description: blog.metaDescription,
    keywords: blog.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author.name],
      images: [
        {
          url: `${SITE.url}${blog.image}`,
          alt: blog.imageAlt,
        },
      ],
      siteName: SITE.brandName,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metaDescription,
      images: [`${SITE.url}${blog.image}`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const catalog = await fetchCatalog();
  const relatedProduct = blog.relatedProductSlug
    ? catalog.find((p) => p.slug === blog.relatedProductSlug)
    : undefined;

  const articleSchema = getArticleSchema(blog);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Journal", url: "/blog" },
    { name: blog.title, url: `/blog/${blog.slug}` },
  ]);
  const faqSchema = getFaqSchema(blog.faqs);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main className="min-h-screen bg-surface">
        {/* Article Header */}
        <header className="bg-surface-container-low border-b border-surface-container py-12 md:py-16">
          <div className="container-page max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-label-xs text-on-surface-variant">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary">
                Journal
              </Link>
              <span>/</span>
              <span className="text-on-surface font-semibold truncate max-w-[240px]">
                {blog.category}
              </span>
            </nav>

            <span className="inline-block rounded-full bg-golden-sand/40 border border-golden-sand px-3 py-1 text-label-xs font-bold text-primary">
              {blog.category}
            </span>

            <h1 className="font-display text-headline-md sm:text-headline-lg md:text-display-sm font-bold text-primary leading-tight">
              {blog.title}
            </h1>

            <p className="text-body-lg sm:text-title-md text-on-surface-variant leading-relaxed">
              {blog.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-surface-container pt-4 text-label-sm text-on-surface-variant">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-pure-parchment font-bold">
                  CZ
                </div>
                <div>
                  <p className="font-bold text-on-surface">{blog.author.name}</p>
                  <p className="text-[12px]">{blog.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-label-xs">
                <span>Published: {blog.publishedAt}</span>
                <span>•</span>
                <span>Updated: {blog.updatedAt}</span>
                <span>•</span>
                <span className="font-semibold text-primary">{blog.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <section className="container-page max-w-4xl -mt-6 sm:-mt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl border border-amber-900/10 bg-surface-container-low">
            <Image
              src={blog.image}
              alt={blog.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Main Article Content & Sidebar */}
        <section className="container-page max-w-4xl py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Content Column */}
            <div className="lg:col-span-8 space-y-8 text-on-surface">
              {/* Table of Contents Card */}
              {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                <div className="rounded-2xl bg-pure-parchment p-6 border border-amber-900/15 shadow-sm space-y-3">
                  <h2 className="font-display text-title-md font-bold text-primary flex items-center gap-2">
                    <Icon name="toc" className="text-[20px]" />
                    <span>Table of Contents</span>
                  </h2>
                  <ul className="space-y-1.5 text-body-sm">
                    {blog.tableOfContents.map((toc) => (
                      <li key={toc.id}>
                        <a
                          href={`#${toc.id}`}
                          className="text-on-surface-variant hover:text-primary hover:underline font-medium"
                        >
                          {toc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections */}
              {blog.contentSections.map((section) => (
                <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
                  <h2 className="font-display text-title-lg sm:text-headline-sm font-bold text-primary border-b border-surface-container pb-2">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-body-md text-on-surface leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 rounded-xl bg-surface-container-low/70 p-4 border border-surface-container text-body-sm text-on-surface list-disc pl-6">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="rounded-xl border-l-4 border-roasted-terracotta bg-roasted-terracotta/5 p-4 text-body-sm font-medium text-on-surface space-y-1">
                      <span className="text-label-xs font-bold uppercase tracking-wider text-roasted-terracotta">
                        {section.callout.type === "tip"
                          ? "Crunchzilla Quality Standard"
                          : "Nutritional Insight"}
                      </span>
                      <p>{section.callout.text}</p>
                    </div>
                  )}
                </section>
              ))}

              {/* FAQs Accordion / List */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-surface-container">
                  <h2 className="font-display text-headline-sm font-bold text-primary">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {blog.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-pure-parchment p-5 border border-amber-900/10 shadow-xs space-y-2"
                      >
                        <h3 className="font-display text-title-md font-bold text-on-surface">
                          {faq.question}
                        </h3>
                        <p className="text-body-sm text-on-surface-variant leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column: Product CTA & Trust */}
            <aside className="lg:col-span-4 space-y-6">
              {relatedProduct && (
                <div className="sticky top-24 rounded-2xl bg-pure-parchment p-6 border border-amber-900/15 shadow-xl space-y-4">
                  <span className="inline-block rounded-full bg-botanical-forest/10 px-3 py-1 text-label-xs font-bold text-botanical-forest">
                    Featured Recommendation
                  </span>

                  <h3 className="font-display text-title-lg font-bold text-primary">
                    {relatedProduct.name}
                  </h3>

                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-container-low border border-surface-container">
                    <Image
                      src={relatedProduct.images?.[0] || "/images/products/makhana.jpg"}
                      alt={relatedProduct.imageAlt}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>

                  <p className="text-body-sm text-on-surface-variant">
                    {relatedProduct.description}
                  </p>

                  <div className="flex items-baseline justify-between border-t border-surface-container pt-3">
                    <span className="text-label-xs text-on-surface-variant font-medium">
                      Starts from
                    </span>
                    <span className="font-display text-title-lg font-bold text-primary">
                      ₹{relatedProduct.variants[0].price}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Link
                      href={`/shop/${relatedProduct.slug}`}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-roasted-terracotta text-pure-parchment text-label-md font-bold shadow-md hover:bg-primary transition-colors"
                    >
                      <Icon name="shopping_bag" className="text-[18px]" />
                      <span>Order {relatedProduct.name}</span>
                    </Link>

                    <a
                      href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Crunchzilla!%20I%20was%20reading%20your%20article%20on%20${encodeURIComponent(blog.title)}%20and%20would%20like%20to%20order%20${encodeURIComponent(relatedProduct.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp-emerald text-pure-parchment text-label-md font-bold shadow-sm hover:opacity-95 transition-opacity"
                    >
                      <Icon name="chat" className="text-[18px]" />
                      <span>Instant WhatsApp Order</span>
                    </a>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
