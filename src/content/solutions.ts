import type { IconName } from "@/components/icon";

export type Solution = {
  slug: "ai-agents" | "custom-software";
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  icon: IconName;
  services: { title: string; text: string; icon: IconName }[];
  seo: { title: string; description: string };
};

export const solutions: Solution[] = [
  {
    slug: "ai-agents",
    name: "AI Agents & Automation",
    eyebrow: "AI agents & automation",
    headline: "Put AI to work on the tasks that slow you down.",
    intro:
      "We design and deploy AI agents and automated workflows that take over repetitive, multi-step work, so your team can focus on customers and decisions.",
    icon: "agent",
    services: [
      { title: "AI agents and assistants", text: "Agents that handle multi-step tasks such as qualifying leads, answering FAQs or updating records.", icon: "agent" },
      { title: "Chatbots for web and WhatsApp", text: "Conversational assistants trained on your own content and policies.", icon: "chat" },
      { title: "Workflow automation", text: "Connect email, CRM, ERP and spreadsheets so data moves without copy-paste.", icon: "automation" },
      { title: "Knowledge assistants", text: "Private AI search over your company documents, policies and manuals.", icon: "search" },
      { title: "AI consulting", text: "Find where AI saves the most time, with a costed roadmap to get there.", icon: "compass" },
    ],
    seo: {
      title: "AI Agents & Business Automation",
      description: "CEYNX builds AI agents, chatbots and workflow automation that remove manual work and connect your business tools.",
    },
  },
  {
    slug: "custom-software",
    name: "Custom Software Development",
    eyebrow: "Custom software development",
    headline: "Software built around how you actually work.",
    intro:
      "When a standard SaaS plan does not fit, our engineers design and build software around your workflows, from integrations to complete web and mobile applications.",
    icon: "code",
    services: [
      { title: "Web applications", text: "Customer portals, dashboards and internal tools.", icon: "globe" },
      { title: "Mobile apps", text: "iOS and Android apps for your customers or staff.", icon: "mobile" },
      { title: "SaaS products and MVPs", text: "From idea to a launch-ready product, built to scale.", icon: "rocket" },
      { title: "APIs and integrations", text: "Connect your existing systems and third-party services.", icon: "api" },
      { title: "3D and interactive experiences", text: "Product configurators, virtual tours and training simulations.", icon: "cube" },
    ],
    seo: {
      title: "Custom Software Development",
      description: "CEYNX builds custom web apps, mobile apps, SaaS products, APIs and 3D experiences around your exact requirements.",
    },
  },
];

export const engagementModels = [
  { title: "Fixed-scope project", text: "A defined scope, timeline and price. Best when requirements are clear." },
  { title: "Dedicated team", text: "Designers and engineers working as an extension of your team." },
  { title: "Ongoing support plan", text: "Monitoring, maintenance and continuous improvement after launch." },
];

/** TODO(CEYNX): keep only technologies the team actually uses. */
export { techLogos as techStack } from "./tech-logos";

export function getSolution(slug: Solution["slug"]) {
  const s = solutions.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown solution: ${slug}`);
  return s;
}
