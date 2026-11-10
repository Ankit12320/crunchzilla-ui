import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetailView from "@/components/shop/ProductDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { fetchCatalog } from "@/lib/catalog";
import { getProductSchema, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo-schemas";
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

export interface ProductFaq {
  question: string;
  answer: string;
}

const SEO_PRODUCT_OVERRIDES: Record<
  string,
  {
    title: string;
    description: string;
    extraKeywords: string[];
    faqs: ProductFaq[];
  }
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
    faqs: [
      {
        question: "What makes Katarni Chura different from ordinary Poha?",
        answer:
          "Katarni Chura is pressed from GI-tagged heirloom aromatic paddy indigenous to Bhagalpur, Bihar. Unlike thick commercial poha, Katarni flakes are naturally fragrant, thin, and melt in the mouth when paired with sweet Dahi (curd) and Desi Gud.",
      },
      {
        question: "Do I need to soak or cook Katarni Chura before eating?",
        answer:
          "No cooking is required for traditional Dahi-Chura. Simply rinse with water for 15 seconds, drain, and mix with fresh curd and jaggery.",
      },
      {
        question: "How fast is delivery for Katarni Chura in Bangalore and across India?",
        answer:
          "Orders in central Bangalore arrive with express same-day / 1-hour courier options, while pan-India orders are dispatched via air courier within 24 hours.",
      },
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
    faqs: [
      {
        question: "What makes authentic Gaya Tilkut special?",
        answer:
          "Gaya Tilkut is handcrafted by master artisans in Gaya, Bihar using slow-roasted white sesame seeds and unrefined sugarcane molasses. The rhythmic hand-pounding produces a light, flaky wafer that melts effortlessly in your mouth.",
      },
      {
        question: "How long does Gaya Tilkut stay fresh?",
        answer:
          "Stored in a dry, airtight container away from moisture, authentic Gaya Tilkut stays crisp and delicious for up to 90 days.",
      },
      {
        question: "Is this Tilkut made with refined sugar or pure gud?",
        answer:
          "This variant is made with 100% pure, unrefined sugarcane jaggery (gud) and natural cardamom, with zero refined white sugar.",
      },
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
    faqs: [
      {
        question: "Is this 100% pure Chana Sattu or mixed with barley?",
        answer:
          "Crunchzilla Chana Sattu is 100% pure Bengal gram slow-roasted in traditional wood-fired kilns and stone-ground. It contains zero barley (jao), zero maize, and no chemical preservatives.",
      },
      {
        question: "How much protein is present in 100g of Crunchzilla Sattu?",
        answer:
          "Each 100g serving delivers 24g of high-bioavailability plant protein along with essential dietary fibre, iron, and magnesium.",
      },
      {
        question: "How do I make traditional Sattu Sharbat?",
        answer:
          "Mix 2 tablespoons of Sattu into a glass of chilled water. Stir in roasted jeera powder, black salt, a squeeze of fresh lemon, and chopped mint for an instant natural energy cooler.",
      },
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
    faqs: [
      {
        question: "What size grade is Crunchzilla Makhana?",
        answer:
          "We sort and grade exclusively for Jumbo 6+ Hand-Picked (HP) kernels (>18mm diameter), guaranteeing fluffy, cloud-soft crunch with zero hard unpopped shells.",
      },
      {
        question: "Is this Makhana fried or roasted in palm oil?",
        answer:
          "Never. Crunchzilla Makhana is air-roasted in small batches with zero palm oil and zero chemical preservatives.",
      },
      {
        question: "Can diabetic individuals and pregnant mothers consume Makhana?",
        answer:
          "Yes. Makhana has a low glycemic index (GI) and is rich in plant protein, calcium, and magnesium, making it an ideal wholesome snack for sugar management and wellness.",
      },
    ],
  },
  "peri-peri-makhana": {
    title: "Buy Peri Peri Makhana Online | Spicy Roasted Flavoured Makhana Near Me - Crunchzilla",
    description:
      "Buy fiery Peri Peri Roasted Makhana online. Jumbo Mithila fox nuts seasoned with authentic African Bird's eye chilli, lime & spices. Zero palm oil, high protein, guilt-free crunch. Express delivery nearby in Bangalore & India.",
    extraKeywords: [
      "Peri Peri Makhana",
      "Buy Peri Peri Makhana online",
      "Peri Peri Makhana near me",
      "Flavoured Makhana online",
      "Spicy Roasted Makhana",
      "Peri Peri Fox Nuts",
      "Healthy spicy snacks near me",
      "Diet snacks Peri Peri Makhana",
    ],
    faqs: [
      {
        question: "How spicy is Crunchzilla Peri Peri Makhana?",
        answer:
          "It delivers a zesty, medium-hot fiery kick from authentic African bird's eye chillies balanced with refreshing citrus tang and herbs. It is intensely craveable without setting your mouth on fire.",
      },
      {
        question: "Does it contain artificial flavours or MSG?",
        answer:
          "No. All seasoning comes from 100% natural dried herbs, real chilli, sun-dried lemon powder, and rock salt. We never use MSG or artificial food colourings.",
      },
      {
        question: "Is it suitable for late-night guilt-free snacking?",
        answer:
          "Yes. Unlike fried potato chips that cause bloating and lethargy, air-roasted Makhana is high in plant protein (14.5g/100g), cholesterol-free, and easy on digestion.",
      },
    ],
  },
  "mint-makhana": {
    title: "Buy Mint Pudina Makhana Online | Cooling Roasted Flavoured Makhana Near Me - Crunchzilla",
    description:
      "Buy refreshing Mint Pudina Roasted Makhana online. Handpicked jumbo lotus seeds roasted with real sun-dried garden mint, black salt & cumin. Zero cholesterol, crisp & digestive. Express delivery in Bangalore & India.",
    extraKeywords: [
      "Mint Makhana",
      "Pudina Makhana",
      "Buy Mint Makhana online",
      "Mint Makhana near me",
      "Pudina flavoured Fox Nuts",
      "Flavoured Makhana online",
      "Digestive roasted snacks near me",
      "Crunchzilla Mint Makhana",
    ],
    faqs: [
      {
        question: "What gives Crunchzilla Mint Makhana its natural aroma?",
        answer:
          "We use real sun-dried garden pudina (mint leaves) tossed with roasted cumin and Himalayan black salt, delivering an invigorating herbal flavour with proven digestive benefits.",
      },
      {
        question: "Can kids and elders eat Mint Makhana?",
        answer:
          "Yes. It has zero harsh heat and a soothing herbal crunch that children, fitness enthusiasts, and elders all enjoy.",
      },
      {
        question: "What is the shelf life of flavoured Makhana?",
        answer:
          "Packed in barrier-sealed pouches, our flavoured Makhanas stay crackling crisp for up to 6 months from packaging.",
      },
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
    faqs: [
      {
        question: "How thin is Crunchzilla Basmati Poha?",
        answer:
          "It is pressed gently to medium-thin gauge, absorbing spices and tempering rapidly without collapsing into mush.",
      },
      {
        question: "Is this poha polished or artificially whitened?",
        answer:
          "No. Our Basmati Poha retains its natural grain hue and subtle aroma with zero chemical bleaching.",
      },
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
    faqs: [
      {
        question: "Is this Jaggery chemical-free and unbleached?",
        answer:
          "Yes. We use traditional plant-based clarification (Deola bark) without sulphur, sodium hydrosulphite, or artificial coloring agents.",
      },
      {
        question: "Can I use these Jaggery Cubes in daily tea?",
        answer:
          "Yes. Since it is pure unrefined gur, add after turning off the flame or directly in black/ginger tea to prevent milk curdling.",
      },
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
  const override = SEO_PRODUCT_OVERRIDES[slug];
  const faqs = override?.faqs ?? [];
  const productSchema = getProductSchema(product);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.name, url: `/shop/${product.slug}` },
  ]);
  const faqSchema = faqs.length > 0 ? getFaqSchema(faqs) : null;

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Header />
      <main className="flex min-h-screen w-full flex-col bg-surface">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />

        {faqs.length > 0 && (
          <section
            aria-label={`${product.name} Frequently Asked Questions`}
            className="w-full bg-surface-container-low py-12 md:py-16 border-t border-surface-container"
          >
            <div className="container-page max-w-4xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-label-xs font-bold uppercase tracking-wider text-primary">
                  Got Questions?
                </span>
                <h2 className="font-display text-headline-sm sm:text-headline-md font-bold text-on-surface">
                  Frequently Asked Questions about {product.name}
                </h2>
              </div>

              <div className="space-y-4 pt-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-pure-parchment p-6 border border-amber-900/10 shadow-premium-sm space-y-2"
                  >
                    <h3 className="font-display text-title-md font-bold text-primary flex items-start gap-2">
                      <span className="text-secondary select-none">Q.</span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

