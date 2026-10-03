export const SITE = {
  name: "Crunchzilla",
  legalName: "Crunchzilla Foods Pvt Ltd",
  tagline: "Artisanal Staples",
  description:
    "Wholesome staples and snacks made with care, authenticity, and everyday goodness.",
  footerBlurb:
    "Handcrafted, slow-roasted artisanal staples and regional heritage delicacies crafted with zero shortcuts, no palm oil, and genuine farm-fresh ingredients.",
  whatsappNumber: "917856019631",
  phoneDisplay: "+91 7856019631",
  email: "crunchzilla02@gmail.com",
  // Support (WhatsApp, phone, email) is available round the clock
  supportHours: "24*7",
  freeShippingAbove: 499,
  fulfillmentHubs: "Patna / Bihar & Bengaluru, Karnataka",
  instagramHandle: "@crunchzilla02",
  instagramUrl: "https://www.instagram.com/crunchzilla02",
  facebookUrl: "https://www.facebook.com/profile.php?id=61584736777320",
  fssaiLicense: "21225192003493",
  rating: "4.9/5",
  happyHouseholds: "500+",
  feedbackFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeGD9Iz1jcNwF1c6OV9tbsogCtNUzc5mE0yqmbENUVkvkEa9w/viewform?usp=header",
} as const;

// export const ANNOUNCEMENTS = [
//   `Free Shipping across India on orders above ₹${SITE.freeShippingAbove}`,
//   "Authentic Homemade Taste",
// ] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Buy / Shop All", href: "/shop" },
  { label: "About Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const FOOTER_CATEGORIES = [
  "Pure Chana Sattu",
  "Artisanal Makhana",
  "Heritage Gaya Tilkut",
  "Organic Jaggery Gud",
  "Katarni Chura & Poha",
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/contact" },
  { label: "Terms of Service", href: "/contact" },
  { label: "Shipping & Returns", href: "/contact" },
] as const;
