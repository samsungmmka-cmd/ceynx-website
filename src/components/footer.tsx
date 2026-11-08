import Link from "next/link";
import { cacheLife } from "next/cache";
import { footerNav } from "@/content/navigation";
import { site, whatsappLink } from "@/lib/site";
import { Icon, type IconName } from "./icon";
import { NewsletterForm } from "./lead-form";
import { Logo } from "./logo";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const socials = (Object.entries(site.social) as [IconName, string][]).filter(([, url]) => url);

export function Footer() {
  const wa = whatsappLink();
  const { email, phone, address } = site.contact;
  return (
    <footer className="border-t border-line bg-deep/80">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 leading-relaxed text-muted">{site.oneLiner}</p>
          <ul className="mt-6 space-y-3 text-sm">
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="inline-flex items-center gap-2.5 text-ice hover:text-mint-soft">
                  <Icon name="mail" className="size-4 text-mint-soft" /> {email}
                </a>
              </li>
            ) : null}
            {phone ? (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2.5 text-ice hover:text-mint-soft">
                  <Icon name="phone" className="size-4 text-mint-soft" /> {phone}
                </a>
              </li>
            ) : null}
            {wa ? (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-ice hover:text-mint-soft">
                  <Icon name="chat" className="size-4 text-mint-soft" /> Chat on WhatsApp
                </a>
              </li>
            ) : null}
            {address ? (
              <li className="inline-flex items-start gap-2.5 text-ice">
                <Icon name="pin" className="mt-0.5 size-4 text-mint-soft" /> {address}
              </li>
            ) : null}
          </ul>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">{col.title}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-muted transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted sm:flex-row">
          <p>
            © <CopyrightYear /> {site.legalName}. All rights reserved.
          </p>
          {socials.length ? (
            <ul className="flex gap-2">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-line text-ice hover:border-mint hover:text-mint-soft">
                    <Icon name={name} title={`CEYNX on ${name === "x" ? "X" : name[0].toUpperCase() + name.slice(1)}`} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  const wa = whatsappLink();
  if (!wa) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-gradient-to-br from-mint to-emerald text-on-brand shadow-md shadow-black/15 transition-transform hover:scale-105"
    >
      <Icon name="chat" className="size-6" title="Chat with CEYNX on WhatsApp" />
    </a>
  );
}
