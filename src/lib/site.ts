/**
 * Single source of truth for company details.
 * Empty strings are hidden on the site, so nothing unconfirmed is shown publicly.
 * TODO(CEYNX): confirm domain, email, phone, WhatsApp number and address before launch.
 */
export const site = {
  name: "CEYNX",
  legalName: "CEYNX",
  tagline: "Intelligence that connects.",
  description:
    "CEYNX builds AI agents, automation and custom software, plus SaaS platforms for WhatsApp messaging, document AI, voice agents and 3D learning.",
  oneLiner:
    "CEYNX delivers SaaS platforms, AI agents and custom software that automate your operations and connect you with your customers.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ceynx.com").replace(/\/$/, ""),
  locale: "en",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ceynx.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    /** International format, digits only, e.g. 9715XXXXXXXX. Enables the WhatsApp buttons. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "",
    /** Cal.com or Calendly link. Enables the "Book a call" button. */
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
  },
} as const;

export function whatsappLink(text = "Hello CEYNX, I'd like to learn more about your solutions.") {
  if (!site.contact.whatsapp) return null;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
