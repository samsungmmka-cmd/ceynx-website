import type { CaseStudy } from "@/content/editorial";
import { CheckList } from "./ui";

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article id={cs.slug} className="glass reveal grid gap-8 p-7 sm:p-9 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-soft">{cs.industry}</p>
        <h3 className="mt-2 text-2xl font-extrabold text-ink">{cs.client}</h3>
        <dl className="mt-5 space-y-4">
          <div>
            <dt className="font-semibold text-ink">Challenge</dt>
            <dd className="mt-1 text-muted">{cs.challenge}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">What we built</dt>
            <dd className="mt-1 text-muted">{cs.solution}</dd>
          </div>
        </dl>
      </div>
      <div>
        <p className="font-semibold text-ink">Results</p>
        <CheckList className="mt-3" items={cs.results} />
        {cs.quote ? (
          <blockquote className="mt-6 border-l-2 border-teal pl-4 text-ice/90">
            <p>“{cs.quote.text}”</p>
            <footer className="mt-2 text-sm text-muted">
              {cs.quote.author}, {cs.quote.role}
            </footer>
          </blockquote>
        ) : null}
        <p className="mt-6 text-sm text-muted">Tech: {cs.tech.join(", ")}</p>
      </div>
    </article>
  );
}
