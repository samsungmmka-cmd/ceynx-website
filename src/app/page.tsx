import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study-card";
import { GlobeSvg } from "@/components/globe-svg";
import { AgentFlow } from "@/components/visuals/agent-flow";
import { PlatformVisual } from "@/components/visuals/platform-visual";
import { HeroGlobe } from "@/components/hero-globe";
import { Icon } from "@/components/icon";
import { CheckList, CtaBanner, FeatureCard, IconBadge, ProcessStepper, SectionHeading } from "@/components/ui";
import { agentExamples, clientLogos, pillars, processSteps, stats, whyCeynx } from "@/content/company";
import { caseStudies } from "@/content/editorial";
import { industries } from "@/content/industries";
import { platforms } from "@/content/platforms";
import { tint } from "@/lib/color";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — SaaS Platforms, AI Agents & Custom Software` },
  description: site.description,
  alternates: { canonical: "/" },
};

const orbitIcons = [
  { p: platforms[0], label: "Connect", pos: "left-[2%] top-[18%]" },
  { p: platforms[1], label: "DocSense", pos: "right-[0%] top-[10%]" },
  { p: platforms[2], label: "AI voice agent", pos: "right-[4%] bottom-[16%]" },
  { p: platforms[3], label: "3D learning", pos: "left-[6%] bottom-[8%]" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-10 pb-16 pt-12 lg:min-h-[calc(100dvh-var(--header-h))] lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <p className="eyebrow">SaaS · AI agents · Custom software</p>
          <h1 id="hero-title" className="mt-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl xl:text-7xl">
            Intelligence that <span className="text-gradient">connects.</span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">{site.oneLiner}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Let&apos;s Talk <Icon name="arrow" className="size-4" />
            </Link>
            <Link href="/platforms" className="btn btn-secondary">
              Explore our platforms
            </Link>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted" aria-label="What we deliver">
            {["SaaS platforms", "AI agents", "Workflow automation", "Custom software"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <div className="pointer-events-none absolute inset-[8%] rounded-full bg-emerald/20 blur-3xl" aria-hidden="true" />
          <HeroGlobe>
            <GlobeSvg className="size-full" />
          </HeroGlobe>
          {orbitIcons.map(({ p, label, pos }, i) => (
            <Link
              key={p.slug}
              href={`/platforms/${p.slug}`}
              className={`glass absolute ${pos} flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-sm font-semibold text-ink motion-safe:animate-float hover:border-mint/50`}
              style={{ animationDelay: `${i * -1.7}s` }}
            >
              <span className="grid size-9 place-items-center rounded-full border" style={{ borderColor: tint(p.accent, 40), color: p.accent }}>
                <Icon name={p.icon} className="size-[18px]" />
              </span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{p.name.replace("CEYNX ", "")}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  if (!stats.length && !clientLogos.length) return null;
  return (
    <section className="border-y border-line py-10" aria-label="Results and clients">
      <div className="container-site">
        {stats.length ? (
          <dl className="grid gap-8 text-center sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-1 text-4xl font-extrabold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedCaseStudy() {
  const cs = caseStudies[0];
  if (!cs) return null;
  return (
    <section className="section" aria-labelledby="case-title">
      <div className="container-site">
        <SectionHeading id="case-title" eyebrow="Featured case study" title="Results our clients can measure" />
        <div className="mt-10">
          <CaseStudyCard cs={cs} />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      {/* What we do */}
      <section className="section" aria-labelledby="pillars-title">
        <div className="container-site">
          <SectionHeading
            id="pillars-title"
            eyebrow="What we do"
            title="Three ways to put AI to work"
            intro="Subscribe to a SaaS platform and go live quickly, deploy AI agents that take over routine work, or have a solution engineered around your exact process."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <FeatureCard key={p.title} icon={p.icon} title={p.title} text={p.text} href={p.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms showcase: one live visual per SaaS platform */}
      <section className="section border-y border-line bg-deep/40" aria-labelledby="platforms-title">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="platforms-title"
              eyebrow="SaaS platforms"
              title="AI-powered SaaS platforms"
              intro="Cloud-based products you subscribe to, configure for your business and scale as you grow. See them in action below."
            />
            <Link href="/platforms" className="link-arrow">
              Compare platforms <Icon name="arrow" className="size-4" />
            </Link>
          </div>
          <div className="mt-16 space-y-24 lg:space-y-32">
            {platforms.map((p, i) => (
              <article key={p.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`reveal ${i % 2 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <IconBadge name={p.icon} accent={p.accent} />
                    <p className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: p.accent }}>{p.category}</p>
                  </div>
                  <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{p.headline}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    <strong className="font-semibold text-ink">{p.name}</strong>. {p.promise}
                  </p>
                  <CheckList className="mt-6" items={p.features.slice(0, 3).map((f) => f.title)} />
                  <Link href={`/platforms/${p.slug}`} className="btn btn-secondary mt-8">
                    Explore {p.name} <Icon name="arrow" className="size-4" />
                  </Link>
                </div>
                <div className={i % 2 ? "lg:order-1" : ""}>
                  <PlatformVisual slug={p.slug} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI agents spotlight */}
      <section className="section" aria-labelledby="agents-title">
        <div className="container-site grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="agents-title"
              eyebrow="AI agents spotlight"
              title="Automate the routine."
              intro="Our AI agents take over repetitive, multi-step work and connect to the tools you already use, so your team can focus on customers and decisions."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/solutions/ai-agents" className="btn btn-secondary">
                Explore AI agents <Icon name="arrow" className="size-4" />
              </Link>
            </div>
            <AgentFlow className="mt-10" />
          </div>
          <ul className="space-y-4" aria-label="Before and after examples of AI agents at work">
            {agentExamples.map((ex) => (
              <li key={ex.before} className="glass reveal grid items-center gap-4 p-5 sm:grid-cols-[1fr_auto_1fr]">
                <p className="text-muted">
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted/80">Before</span>
                  <span className="line-through decoration-teal/60">{ex.before}</span>
                </p>
                <span className="hidden size-10 place-items-center rounded-full bg-mint text-on-brand sm:grid" aria-hidden="true">
                  <Icon name="arrow" className="size-4" />
                </span>
                <p className="flex items-center gap-3 font-semibold text-ink">
                  <Icon name={ex.icon} className="size-5 shrink-0 text-mint-soft" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-mint-soft">After</span>
                    {ex.after}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="section border-y border-line bg-deep/50" aria-labelledby="process-title">
        <div className="container-site">
          <SectionHeading id="process-title" eyebrow="How we work" title="From first call to continuous improvement" align="center" />
          <div className="mt-12">
            <ProcessStepper steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section" aria-labelledby="industries-title">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="industries-title" eyebrow="Industries we serve" title="Built for the way your sector works" />
            <Link href="/industries" className="link-arrow">
              Solutions by industry <Icon name="arrow" className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((ind) => (
              <li key={ind.id}>
                <Link href={`/industries#${ind.id}`} className="glass glass-hover reveal flex h-full flex-col items-center gap-4 p-6 text-center">
                  <IconBadge name={ind.icon} />
                  <span className="font-semibold text-ink">{ind.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeaturedCaseStudy />

      {/* Why CEYNX */}
      <section className="section border-t border-line" aria-labelledby="why-title">
        <div className="container-site">
          <SectionHeading id="why-title" eyebrow="Why CEYNX" title="A partner, not just a vendor" align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyCeynx.map((w) => (
              <FeatureCard key={w.title} icon={w.icon} title={w.title} text={w.text} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
