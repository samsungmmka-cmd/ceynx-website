import { CheckList, CtaBanner, PageHero, SectionHeading } from "@/components/ui";
import { openRoles } from "@/content/editorial";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Join CEYNX and build SaaS platforms, AI agents and custom software that businesses rely on.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build AI that people actually use"
        intro="We're a team of engineers and designers who like shipping practical software. If that sounds like you, we'd like to hear from you."
        crumbs={[{ label: "Careers", href: "/careers" }]}
      />
      <section className="section" aria-labelledby="culture-title">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="culture-title" eyebrow="Our culture" title="What working at CEYNX is like" />
            <CheckList
              className="mt-8"
              items={["Real products with real users", "Modern AI and web technology", "Ownership from idea to launch", "Learning time and mentoring"]}
            />
          </div>
          <div className="glass reveal p-8">
            <h2 className="text-2xl font-extrabold text-ink">Open roles</h2>
            {openRoles.length ? (
              <ul className="mt-6 divide-y divide-line">
                {openRoles.map((r) => (
                  <li key={r.title} className="py-4">
                    <p className="font-semibold text-ink">{r.title}</p>
                    <p className="text-sm text-muted">{r.type} · {r.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 leading-relaxed text-muted">
                There are no open roles right now, but we always welcome strong engineers, designers and AI specialists. Send your CV and portfolio
                to{" "}
                <a className="text-mint-soft underline" href={`mailto:${site.contact.email}?subject=Careers%20at%20CEYNX`}>
                  {site.contact.email}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </section>
      <CtaBanner title="Want to work with us as a client instead?" text="Tell us what you're building and we'll help you get there." />
    </>
  );
}
