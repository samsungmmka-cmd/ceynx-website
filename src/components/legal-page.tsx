import type { ReactNode } from "react";
import { PageHero } from "./ui";

/**
 * TODO(CEYNX): these policies are starting templates. Have them reviewed by legal counsel for the
 * jurisdictions you operate in (e.g. UAE PDPL, GDPR for EU visitors) before launch.
 */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={<>Last updated: <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></>} crumbs={[{ label: title, href: path }]} />
      <section className="section pt-12">
        <div className="container-site">
          <div className="prose-legal max-w-3xl">{children}</div>
        </div>
      </section>
    </>
  );
}
