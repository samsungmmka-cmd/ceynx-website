import type { Metadata } from "next";
import Link from "next/link";
import { getPlatform, platforms, type Platform } from "@/content/platforms";
import type { interests } from "@/lib/lead-schema";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/lib/site";
import { cubiphy } from "@/content/cubiphy";
import { Icon } from "./icon";
import { LeadForm } from "./lead-form";
import { PlatformVisual } from "./visuals/platform-visual";
import { CheckList, Faq, FeatureCard, JsonLd, PageHero, SectionHeading } from "./ui";

const interestFor: Record<Platform["slug"], (typeof interests)[number]> = {
  "whatsapp-messaging": "CEYNX Connect (WhatsApp messaging)",
  "document-ai": "CEYNX DocSense (document AI)",
  "voice-agent": "CEYNX Voice (AI voice agent)",
  "3d-learning": "CEYNX Learn 3D (3D learning)",
};

export function platformMetadata(slug: Platform["slug"]): Metadata {
  const p = getPlatform(slug);
  return pageMetadata({ title: `${p.name}: ${p.seo.title}`, description: p.seo.description, path: `/platforms/${p.slug}` });
}

export function PlatformPage({ slug }: { slug: Platform["slug"] }) {
  const p = getPlatform(slug);
  const others = platforms.filter((x) => x.slug !== slug);
  const path = `/platforms/${p.slug}`;

  return (
    <>
      <PageHero
        eyebrow={p.category}
        title={p.headline}
        intro={
          <>
            <strong className="font-semibold text-ink">{p.name}</strong> — {p.promise}
          </>
        }
        crumbs={[
          { label: "Platforms", href: "/platforms" },
          { label: p.name, href: path },
        ]}
        aside={<PlatformVisual slug={p.slug} />}
      >
        <Link href="#demo" className="btn btn-primary">
          Request a demo <Icon name="arrow" className="size-4" />
        </Link>
        <Link href="/contact" className="btn btn-secondary">
          Talk to sales
        </Link>
      </PageHero>

      {/* Problem */}
      <section className="section" aria-labelledby="problem-title">
        <div className="container-site">
          <SectionHeading id="problem-title" eyebrow="The problem" title={`What ${p.name} takes off your plate`} intro={p.summary} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {p.problems.map((pr, i) => (
              <article key={pr.title} className="glass reveal p-7">
                <span className="text-sm font-bold text-teal">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-ink">{pr.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{pr.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {p.slug === "3d-learning" ? (
        <section className="section border-t border-line" aria-labelledby="cubiphy-title">
          <div className="container-site">
            <SectionHeading
              id="cubiphy-title"
              eyebrow="Featured project"
              title={<>CUBIPHY: physics practicals in <span className="text-gradient">interactive 3D</span></>}
              intro={cubiphy.summary}
            />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-mint-soft">{cubiphy.tagline}</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cubiphy.features.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} accent="var(--c-acc-4)" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Features */}
      <section className="section border-y border-line bg-deep/50" aria-labelledby="features-title">
        <div className="container-site">
          <SectionHeading id="features-title" eyebrow="Key features" title="Everything you need, in one platform" align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} accent={p.accent} badge={f.soon ? "Coming soon" : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" aria-labelledby="how-title">
        <div className="container-site">
          <SectionHeading id="how-title" eyebrow="How it works" title="Live in three steps" align="center" />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <li key={s.title} className="glass reveal p-7 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-mint text-lg font-extrabold text-on-brand">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Use cases + integrations + security */}
      <section className="section border-y border-line bg-deep/50" aria-labelledby="usecases-title">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading id="usecases-title" eyebrow="Use cases" title={`Built for ${p.builtFor.slice(0, -1).join(", ").toLowerCase()} and ${p.builtFor.at(-1)?.toLowerCase()}`} />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {p.useCases.map((u) => (
                <article key={u.industry} className="glass reveal p-6">
                  <h3 className="font-bold text-ink">{u.industry}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{u.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass reveal p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink"><Icon name="plug" className="size-5 text-mint-soft" /> Integrations</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.integrations.map((i) => (
                  <li key={i} className="rounded-full border border-line bg-ink/5 px-3 py-1.5 text-sm text-ice/90">{i}</li>
                ))}
              </ul>
            </div>
            <div className="glass reveal p-6">
              <h3 className="flex items-center gap-2 font-bold text-ink"><Icon name="shield" className="size-5 text-mint-soft" /> Security</h3>
              <CheckList items={p.security} className="mt-4 text-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" aria-labelledby="pricing-title">
        <div className="container-site">
          <div className="glass reveal flex flex-col items-start justify-between gap-8 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow">SaaS pricing</p>
              <h2 id="pricing-title" className="mt-4 text-3xl font-extrabold text-ink">Monthly or annual plans, sized to your usage</h2>
              <p className="mt-3 text-lg text-muted">
                Every plan includes onboarding and support. Tell us about your volume and we&apos;ll recommend the right tier.
              </p>
            </div>
            <Link href="#demo" className="btn btn-primary">
              Get pricing <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0" aria-labelledby="faq-title">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" intro="Can't find what you're looking for? Ask us in the demo request." />
          <Faq items={p.faqs} />
        </div>
      </section>

      {/* Demo form */}
      <section id="demo" className="section border-t border-line bg-deep/50" aria-labelledby="demo-title">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="demo-title" eyebrow="Request a demo" title={`See ${p.name} in action`} intro="Book a guided walkthrough with our team. We'll tailor the demo to your workflow and answer your questions." />
            <CheckList className="mt-8" items={["30-minute personalised demo", "Pricing for your usage", "Onboarding plan and timeline"]} />
            <div className="mt-10">
              <p className="text-sm font-semibold text-ink">Other SaaS platforms</p>
              <ul className="mt-3 space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/platforms/${o.slug}`} className="link-arrow text-sm">
                      {o.name} <span className="font-normal text-muted">· {o.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="glass p-6 sm:p-8">
            <LeadForm kind="demo" defaultInterest={interestFor[p.slug]} submitLabel="Request a demo" />
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: p.summary,
            url: absoluteUrl(path),
            provider: { "@type": "Organization", name: site.name, url: site.url },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
    </>
  );
}
