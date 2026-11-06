import type { MetadataRoute } from "next";
import { platforms } from "@/content/platforms";
import { solutions } from "@/content/solutions";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/platforms", priority: 0.9, freq: "monthly" },
    ...platforms.map((p) => ({ path: `/platforms/${p.slug}`, priority: 0.9, freq: "monthly" as const })),
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8, freq: "monthly" as const })),
    { path: "/industries", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/careers", priority: 0.4, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
    { path: "/cookies", priority: 0.2, freq: "yearly" },
  ];
  return routes.map((r) => ({ url: absoluteUrl(r.path), changeFrequency: r.freq, priority: r.priority }));
}
