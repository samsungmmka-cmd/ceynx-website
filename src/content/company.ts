import type { IconName } from "@/components/icon";

export const pillars: { title: string; text: string; href: string; icon: IconName }[] = [
  {
    title: "SaaS Platforms",
    text: "Cloud-based subscription products for WhatsApp messaging, document AI, voice support and 3D learning.",
    href: "/platforms",
    icon: "layers",
  },
  {
    title: "AI Agents & Automation",
    text: "AI agents that qualify leads, answer customers and run multi-step tasks, plus workflow automation that removes manual work.",
    href: "/solutions/ai-agents",
    icon: "agent",
  },
  {
    title: "Custom Software",
    text: "Web, mobile and backend systems engineered around your exact requirements.",
    href: "/solutions/custom-software",
    icon: "code",
  },
];

export const processSteps: { title: string; text: string; deliverable: string; icon: IconName }[] = [
  { title: "Discover", text: "We map your workflow, goals and where time is lost.", deliverable: "Opportunity report and scope", icon: "search" },
  { title: "Design", text: "We plan the solution, data flows and user experience.", deliverable: "Solution design and prototype", icon: "pen" },
  { title: "Build", text: "We develop in short iterations you can review.", deliverable: "Working software every sprint", icon: "code" },
  { title: "Launch", text: "We test, train your team and go live safely.", deliverable: "Production release and training", icon: "rocket" },
  { title: "Support", text: "We monitor, improve and scale what we built.", deliverable: "Support plan and improvements", icon: "wrench" },
];

export const agentExamples = [
  { before: "Manual invoice entry", after: "Extracted and validated in seconds", icon: "document" as IconName },
  { before: "Missed after-hours calls", after: "Answered 24/7 by an AI voice agent", icon: "voice" as IconName },
  { before: "Copy-pasting customer replies", after: "AI-assisted WhatsApp inbox", icon: "chat" as IconName },
  { before: "Leads waiting for a callback", after: "Qualified and routed instantly by an AI agent", icon: "agent" as IconName },
];

export const whyCeynx: { title: string; text: string; icon: IconName }[] = [
  { title: "One team, end to end", text: "SaaS, AI agents and custom builds from the same team that designs, builds and supports them.", icon: "users" },
  { title: "Fits your existing tools", text: "Our AI plugs into the CRM, ERP, inboxes and spreadsheets you already use.", icon: "plug" },
  { title: "Secure and scalable", text: "Encryption, access controls and cloud infrastructure built to grow with you.", icon: "shield" },
  { title: "Support after launch", text: "We stay with you to monitor, improve and extend what we deliver.", icon: "wrench" },
];

export const values = [
  { title: "Practical first", text: "We build AI that solves a real problem and pays for itself." },
  { title: "Clear communication", text: "Plain language, honest timelines and no hidden surprises." },
  { title: "Built to last", text: "Secure, maintainable software that keeps working as you grow." },
  { title: "Partnership", text: "We measure success by the results our clients see." },
];

/**
 * Real proof points only. Leave empty until confirmed; the homepage hides these blocks when empty.
 * TODO(CEYNX): add client logos, figures and case studies.
 */
export const stats: { value: string; label: string }[] = [];
export const clientLogos: { name: string; src: string }[] = [];

export const mission =
  "To make applied AI accessible to every business, so people spend their time on work that matters.";
export const vision =
  "A world where intelligent software connects every business with its customers and every learner with knowledge.";
