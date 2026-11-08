import Link from "next/link";
import { Icon } from "@/components/icon";
import { CtaBanner, IconBadge, PageHero } from "@/components/ui";
import { platforms } from "@/content/platforms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "SaaS Platforms",
  description:
    "Four AI-powered SaaS platforms from CEYNX: WhatsApp messaging, AI document analysis, an AI voice agent for customer support and 3D learning.",
  path: "/platforms",
});

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        eyebrow="SaaS platforms"
        title={<>AI-powered SaaS platforms, <span className="text-gradient">one product family.</span></>}
        intro="Cloud-based subscription products you can configure for your business, connect to your tools and scale as you grow."
        crumbs={[{ label: "Platforms", href: "/platforms" }]}
      >
        <Link href="/contact" className="btn btn-primary">
          Book a demo <Icon name="arrow" className="size-4" />
        </Link>
      </PageHero>

      <section className="section" aria-label="All platforms">
        <div className="container-site grid gap-6">
          {platforms.map((p) => (
            <article key={p.slug} className="glass glass-hover reveal relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <IconBadge name={p.icon} accent={p.accent} />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: p.accent }}>{p.category}</p>
                <h2 className="mt-2 text-3xl font-extrabold text-ink">
                  <Link href={`/platforms/${p.slug}`} className="after:absolute after:inset-0">{p.name}</Link>
                </h2>
                <p className="mt-3 text-lg text-ice/90">{p.headline}</p>
                <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
                <p className="mt-5 text-sm text-muted">
                  <span className="font-semibold text-ink">Built for: </span>
                  {p.builtFor.join(", ")}
                </p>
                <span className="link-arrow mt-6" aria-hidden="true">See {p.name} <Icon name="arrow" className="size-4" /></span>
              </div>
              <ul className="grid content-start gap-3 sm:grid-cols-2" aria-label={`${p.name} features`}>
                {p.features.map((f) => (
                  <li key={f.title} className="flex gap-3 rounded-xl border border-line bg-space/50 p-4">
                    <Icon name={f.icon} className="mt-0.5 size-5 shrink-0" style={{ color: p.accent }} />
                    <span>
                      <span className="block font-semibold text-ink">{f.title}</span>
                      <span className="mt-1 block text-sm text-muted">{f.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Not sure which platform fits?"
        text="Tell us what you want to automate. We'll recommend a SaaS plan, an AI agent or a custom build."
      />
    </>
  );
}
