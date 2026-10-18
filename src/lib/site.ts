// Central place for brand facts. Change these before launch.
export const site = {
  name: "CEYNX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "AI-ready WhatsApp messaging for teams that sell and support",
  description:
    "CEYNX gives your team one WhatsApp inbox, consent-safe campaigns, automations and WhatsApp Flows on the official WhatsApp Business Platform, with AI assistance built into the workflow.",
  // GO-LIVE: replace with your real contact address.
  email: "hello@ceynx.com",
};

// Demo mode: registrations are validated but not delivered, a banner is shown, and search engines are blocked.
export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const nav = [
  { href: "#product", label: "Product" },
  { href: "#ai", label: "AI" },
  { href: "#guardrails", label: "Guardrails" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];
