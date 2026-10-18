import type { Metadata, Viewport } from "next";
import "@fontsource-variable/open-sans";
import "./globals.css";
import { isDemo, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary", title: site.name, description: site.description },
  robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04211D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={isDemo ? "min-h-dvh pb-7 font-sans" : "min-h-dvh font-sans"}>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {isDemo && (
          <p className="fixed inset-x-0 bottom-0 z-50 bg-signal px-4 py-1.5 text-center text-xs font-medium text-lagoon">
            Demo site for testing. Registrations are not sent anywhere.
          </p>
        )}
        {children}
      </body>
    </html>
  );
}
