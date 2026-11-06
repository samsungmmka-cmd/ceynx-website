import Link from "next/link";
import { Icon } from "@/components/icon";
import { CtaBanner, IconBadge, PageHero } from "@/components/ui";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "How CEYNX SaaS platforms, AI agents and custom software help retail, real estate, healthcare, education, finance, legal and hospitality teams.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="AI that understands how your industry works"
        intro="Every sector loses time in different places. Here is where CEYNX platforms and AI agents make the biggest difference."
        crumbs={[{ label: "Industries", href: "/industries" }]}
      />
      <section className="section" aria-label="Industries">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {industries.map((ind) => (
            <article key={ind.id} id={ind.id} className="glass reveal scroll-mt-28 p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <IconBadge name={ind.icon} />
                <h2 className="text-2xl font-extrabold text-ink">{ind.name}</h2>
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-teal">The challenge</p>
              <p className="mt-2 leading-relaxed text-muted">{ind.challenge}</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-mint-soft">How CEYNX helps</p>
              <ul className="mt-3 space-y-2">
                {ind.solutions.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} className="link-arrow">
                      {s.label} <Icon name="arrow" className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner title="Don't see your industry?" text="Our custom software team builds AI solutions for any sector. Tell us about your workflow." primary={{ label: "See solutions for your industry", href: "/contact" }} />
    </>
  );
}
