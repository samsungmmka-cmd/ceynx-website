import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study-card";
import { Icon } from "@/components/icon";
import { CheckList, CtaBanner, PageHero } from "@/components/ui";
import { caseStudies } from "@/content/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Case Studies",
  description: "Client stories showing how CEYNX SaaS platforms, AI agents and custom software deliver measurable results.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Results our clients can measure"
        intro="Each story covers the challenge, what we built, the measurable result and the technology behind it."
        crumbs={[{ label: "Case Studies", href: "/case-studies" }]}
      />
      <section className="section" aria-label="Case studies">
        <div className="container-site">
          {caseStudies.length ? (
            <div className="grid gap-6">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>
          ) : (
            <div className="glass reveal mx-auto max-w-3xl p-8 text-center sm:p-12">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-mint/30 bg-mint/10 text-mint-soft">
                <Icon name="chart" className="size-7" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">Our first published case studies are on the way</h2>
              <p className="mt-4 text-lg text-muted">
                We publish client stories only with their approval and real figures. In the meantime, we&apos;re happy to walk you through
                relevant projects on a call.
              </p>
              <CheckList className="mx-auto mt-8 max-w-sm text-left" items={["The problem we solved", "What we built and how", "Measured results"]} />
              <Link href="/contact" className="btn btn-primary mt-9">
                Start a similar project <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
