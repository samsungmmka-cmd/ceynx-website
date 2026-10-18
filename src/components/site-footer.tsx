import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-lagoon text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed">
            WhatsApp messaging for teams, on the official WhatsApp Business Platform.
          </p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-sm text-white underline-offset-4 hover:underline">
            {site.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <nav aria-label="Footer">
            <ul className="space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={`/${n.href}`} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="space-y-2.5">
            <li><Link href="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of service</Link></li>
            <li><a href="/#register" className="hover:text-white">Register</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-white/50 sm:px-6">
          © {new Date().getFullYear()} CEYNX. WhatsApp is a trademark of WhatsApp LLC. CEYNX is an independent product
          and is not affiliated with or endorsed by Meta.
        </p>
      </div>
    </footer>
  );
}
