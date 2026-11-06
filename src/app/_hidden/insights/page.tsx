import { NewsletterForm } from "@/components/lead-form";
import { CheckList, PageHero } from "@/components/ui";
import { articles, plannedTopics } from "@/content/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Articles from CEYNX on AI automation, WhatsApp marketing, document AI, AI voice agents and 3D learning.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on AI and automation"
        intro="Guides and lessons from the projects we build, written for business owners and teams, not just engineers."
        crumbs={[{ label: "Insights", href: "/insights" }]}
      />
      <section className="section" aria-label="Articles">
        <div className="container-site">
          {articles.length ? (
            <ul className="grid gap-5 md:grid-cols-3">
              {articles.map((a) => (
                <li key={a.slug} className="glass reveal p-6">
                  <p className="text-sm text-mint-soft">{a.topic}</p>
                  <h2 className="mt-2 text-xl font-bold text-ink">{a.title}</h2>
                  <p className="mt-2 text-muted">{a.excerpt}</p>
                  <time dateTime={a.date} className="mt-4 block text-sm text-muted">{a.date}</time>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="glass reveal p-8 sm:p-10">
                <h2 className="text-2xl font-extrabold text-ink">First articles coming soon</h2>
                <p className="mt-3 text-muted">Here is what we&apos;ll be writing about:</p>
                <CheckList className="mt-6" items={plannedTopics} />
              </div>
              <div className="glass reveal p-8 sm:p-10">
                <h2 className="text-2xl font-extrabold text-ink">Be the first to read them</h2>
                <p className="mt-3 text-muted">One useful email when we publish. No spam, unsubscribe anytime.</p>
                <div className="mt-8">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
