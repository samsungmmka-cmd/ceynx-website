import { absoluteUrl, site } from "@/lib/site";
import { pillars } from "./company";
import { industries } from "./industries";
import { platforms } from "./platforms";
import { solutions } from "./solutions";

/** Builds the /llms.txt document from the same content the website uses. */
export function company() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.oneLiner}`,
    "",
    `${site.name} is an applied AI and software engineering company. It offers cloud-based SaaS platforms, builds AI agents that automate business work, and develops custom software for specific client requirements.`,
    "",
    "## What we do",
    "",
    ...pillars.map((p) => `- [${p.title}](${absoluteUrl(p.href)}): ${p.text}`),
    "",
    "## SaaS platforms",
    "",
    ...platforms.map((p) => `- [${p.name}](${absoluteUrl(`/platforms/${p.slug}`)}): ${p.category}. ${p.promise}`),
    "",
    "## Services",
    "",
    ...solutions.flatMap((s) => [
      `- [${s.name}](${absoluteUrl(`/solutions/${s.slug}`)}): ${s.intro}`,
      ...s.services.map((sv) => `  - ${sv.title}: ${sv.text}`),
    ]),
    "",
    "## Industries",
    "",
    `- [Industries we serve](${absoluteUrl("/industries")}): ${industries.map((i) => i.name).join(", ")}.`,
    "",
    "## Company",
    "",
    `- [About ${site.name}](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")})${site.contact.email ? `: ${site.contact.email}` : ""}`,
    `- [Careers](${absoluteUrl("/careers")})`,
    "",
  ];
  return lines.join("\n");
}
