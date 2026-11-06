import Link from "next/link";
import { Icon } from "@/components/icon";
import { CtaBanner, FeatureCard, PageHero, ProcessStepper, SectionHeading } from "@/components/ui";
import { mission, pillars, processSteps, values, vision } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About CEYNX",
  description:
    "CEYNX is an applied AI and software engineering company: SaaS platforms, AI agents and custom software that save time and serve customers better.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CEYNX"
        title={<>Applied AI, <span className="text-gradient">built to connect.</span></>}
        intro="CEYNX is an applied AI and software engineering company. We design, build and deploy AI agents, machine-learning workflows and cloud-based SaaS platforms that automate manual, repetitive work."
        crumbs={[{ label: "About", href: "/about" }]}
      >
        <Link href="/contact" className="btn btn-primary">
          Meet with us <Icon name="arrow" className="size-4" />
        </Link>
      </PageHero>

      <section className="section" aria-labelledby="story-title">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <SectionHeading id="story-title" eyebrow="What we do" title="Three tracks, one goal" />
          <div className="reveal space-y-5 text-lg leading-relaxed text-muted">
            <p>
              <strong className="text-ink">First, our cloud-based SaaS platforms:</strong> a WhatsApp messaging platform for customer engagement at
              scale, an AI document analysis platform that reads and extracts data from documents in seconds, an AI voice agent that answers customer
              calls around the clock, and 3D learning platforms that make training interactive.
            </p>
            <p>
              <strong className="text-ink">Second, AI agents:</strong> intelligent assistants that take over multi-step tasks such as qualifying
              leads, answering customer questions and updating business systems.
            </p>
            <p>
              <strong className="text-ink">Third, custom development:</strong> when a standard SaaS plan does not fit, our engineers design and build
              software around your workflows, from integrations to complete web and mobile applications.
            </p>
            <p>Whatever we build, the goal is the same: technology that saves time, serves customers better and connects people to the information they need.</p>
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-deep/50" aria-label="Mission and vision">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <article className="glass reveal p-8 sm:p-10">
            <p className="eyebrow">Our mission</p>
            <p className="mt-5 text-2xl font-bold leading-snug text-ink">{mission}</p>
          </article>
          <article className="glass reveal p-8 sm:p-10">
            <p className="eyebrow">Our vision</p>
            <p className="mt-5 text-2xl font-bold leading-snug text-ink">{vision}</p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container-site">
          <SectionHeading id="values-title" eyebrow="Our values" title="How we work with clients" align="center" />
          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="glass reveal p-6">
                <dt className="text-lg font-bold text-ink">{v.title}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="process" className="section border-y border-line bg-deep/50" aria-labelledby="process-title">
        <div className="container-site">
          <SectionHeading id="process-title" eyebrow="How we work" title="Discover, design, build, launch, support" align="center" />
          <div className="mt-12">
            <ProcessStepper steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pillars-title">
        <div className="container-site">
          <SectionHeading id="pillars-title" eyebrow="Explore" title="Where to go next" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <FeatureCard key={p.title} icon={p.icon} title={p.title} text={p.text} href={p.href} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
