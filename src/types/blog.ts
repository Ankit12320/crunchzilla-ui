export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: "Makhana Guide" | "Nutrition & Health" | "Healthy Snacking" | "B2B & Wholesale";
  image: string;
  imageAlt: string;
  tableOfContents: { id: string; title: string }[];
  contentSections: {
    id: string;
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    callout?: {
      type: "tip" | "nutrition" | "quote";
      text: string;
    };
  }[];
  relatedProductSlug?: string;
  faqs: BlogFaq[];
}
