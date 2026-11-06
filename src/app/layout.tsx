import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer, WhatsAppButton } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { JsonLd } from "@/components/ui";
import { absoluteUrl, site } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

// Downloaded at build time and self-hosted by Next.js: no request to Google from visitors.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — SaaS Platforms, AI Agents & Custom Software`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI agents",
    "SaaS platforms",
    "AI automation",
    "custom software development",
    "WhatsApp business messaging platform",
    "AI document analysis",
    "AI voice agent",
    "3D learning platform",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.locale} className={inter.variable} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-atmosphere flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-mint focus:px-5 focus:py-3 focus:font-semibold focus:text-on-brand"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": absoluteUrl("/#organization"),
              name: site.name,
              url: site.url,
              logo: absoluteUrl("/icon.svg"),
              slogan: site.tagline,
              description: site.oneLiner,
              email: site.contact.email || undefined,
              telephone: site.contact.phone || undefined,
              sameAs: Object.values(site.social).filter(Boolean),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              publisher: { "@id": absoluteUrl("/#organization") },
            },
          ]}
        />
      </body>
    </html>
  );
}
