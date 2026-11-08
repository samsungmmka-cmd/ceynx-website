import type { Metadata } from "next";
import Link from "next/link";
import { processSteps } from "@/content/company";
import { caseStudies } from "@/content/editorial";
import { engagementModels, getSolution, solutions, techStack, type Solution } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, site } from "@/lib/site";
import { CaseStudyCard } from "./case-study-card";
import { Icon } from "./icon";
import { LeadForm } from "./lead-form";
import { AgentFlow } from "./visuals/agent-flow";
import { DashboardMockup } from "./visuals/dashboard-mockup";
import { CheckList, FeatureCard, JsonLd, PageHero, ProcessStepper, SectionHeading } from "./ui";

export function solutionMetadata(slug: Solution["slug"]): Metadata {
  const s = getSolution(slug);
  return pageMetadata({ title: s.seo.title, description: s.seo.description, path: `/solutions/${s.slug}` });
}

export function SolutionPage({ slug }: { slug: Solution["slug"] }) {
  const s = getSolution(slug);
  const other = solutions.find((x) => x.slug !== slug)!;
  const related = caseStudies.slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.headline}
        intro={s.intro}
        crumbs={[{ label: s.name, href: `/solutions/${s.slug}` }]}
        aside={slug === "ai-agents" ? <AgentFlow /> : <DashboardMockup />}
      >
        <Link href="#start" className="btn btn-primary">
          Start your project <Icon name="arrow" className="size-4" />
        </Link>
        <Link href={`/solutions/${other.slug}`} className="btn btn-secondary">
          {other.name}
        </Link>
      </PageHero>

      <section className="section" aria-labelledby="services-title">
        <div className="container-site">
          <SectionHeading id="services-title" eyebrow="Services" title="What we build for you" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.services.map((x) => (
              <FeatureCard key={x.title} icon={x.icon} title={x.title} text={x.text} />
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section border-y border-line bg-deep/50" aria-labelledby="process-title">
        <div className="container-site">
          <SectionHeading id="process-title" eyebrow="Our process" title="Clear steps, visible progress" intro="Each stage ends with something concrete you can review." align="center" />
          <div className="mt-12">
            <ProcessStepper steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="models-title">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading id="models-title" eyebrow="Engagement models" title="Work with us the way that suits you" />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {engagementModels.map((m) => (
                <article key={m.title} className="glass reveal p-6">
                  <h3 className="font-bold text-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="glass reveal self-start p-7">
            <h3 className="font-bold text-ink">Technologies we work with</h3>
            <ul className="mt-5 grid grid-cols-3 gap-3">
              {techStack.map((t) => (
                <li
                  key={t.key}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-ink/5 px-2 py-4 text-center text-xs font-semibold text-ink transition-colors hover:border-mint/50"
                >
                  <span className="size-10" dangerouslySetInnerHTML={{ __html: t.svg }} />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section pt-0" aria-labelledby="related-title">
          <div className="container-site">
            <SectionHeading id="related-title" eyebrow="Case studies" title="Related work" />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {related.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="start" className="section border-t border-line bg-deep/50" aria-labelledby="start-title">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="start-title" eyebrow="Start your project" title="Tell us what you want to achieve" intro="Share your goal, timeline and budget range. We'll reply within one business day with next steps." />
            <CheckList className="mt-8" items={["Free discovery call", "Honest advice on the best approach", "Clear scope and estimate"]} />
          </div>
          <div className="glass p-6 sm:p-8">
            <LeadForm
              kind="project"
              defaultInterest={slug === "ai-agents" ? "AI agents & automation" : "Custom software development"}
              submitLabel="Start your project"
              showBudget
            />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.seo.description,
          url: absoluteUrl(`/solutions/${s.slug}`),
          provider: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: site.name, url: site.url },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: s.name,
            itemListElement: s.services.map((sv) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: sv.title, description: sv.text },
            })),
          },
        }}
      />
    </>
  );
}
