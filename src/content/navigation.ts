import type { IconName } from "@/components/icon";
import { platforms } from "./platforms";
import { solutions } from "./solutions";

export type MenuItem = { label: string; href: string; description?: string; icon?: IconName };
export type NavEntry = { label: string; href: string; menu?: MenuItem[]; menuFooter?: MenuItem };

export const mainNav: NavEntry[] = [
  {
    label: "Platforms",
    href: "/platforms",
    menu: platforms.map((p) => ({
      label: p.name,
      href: `/platforms/${p.slug}`,
      description: p.category,
      icon: p.icon,
    })),
    menuFooter: { label: "Compare all SaaS platforms", href: "/platforms" },
  },
  {
    label: "Solutions",
    href: "/solutions/ai-agents",
    menu: solutions.map((s) => ({
      label: s.name,
      href: `/solutions/${s.slug}`,
      description: s.headline,
      icon: s.icon,
    })),
    menuFooter: { label: "See how we work", href: "/about#process" },
  },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; links: MenuItem[] }[] = [
  {
    title: "Platforms",
    links: platforms.map((p) => ({ label: p.name, href: `/platforms/${p.slug}` })),
  },
  {
    title: "Solutions",
    links: [
      ...solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];
