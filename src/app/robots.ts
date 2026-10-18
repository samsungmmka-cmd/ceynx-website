import type { MetadataRoute } from "next";
import { isDemo, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (isDemo) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }], sitemap: `${site.url}/sitemap.xml` };
}
