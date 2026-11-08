import Link from "next/link";
import type { ReactNode } from "react";
import { tint } from "@/lib/color";
import { absoluteUrl, whatsappLink } from "@/lib/site";
import { Icon, type IconName } from "./icon";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`reveal max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p> : null}
      <Tag id={id} className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </Tag>
      {intro ? <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{intro}</p> : null}
    </div>
  );
}

export function IconBadge({ name, accent }: { name: IconName; accent?: string }) {
  return (
    <span
      className="grid size-12 shrink-0 place-items-center rounded-2xl border bg-ink/5 text-mint-soft"
      style={accent ? { borderColor: tint(accent, 35), color: accent } : { borderColor: tint("var(--c-mint)", 30) }}
    >
      <Icon name={name} className="size-6" />
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  text,
  href,
  linkLabel = "Learn more",
  accent,
  badge,
}: {
  icon: IconName;
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
  accent?: string;
  badge?: string;
}) {
  return (
    <article className="glass glass-hover reveal relative flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <IconBadge name={icon} accent={accent} />
        {badge ? (
          <span className="rounded-full border border-teal/40 bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">{badge}</span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">
        {href ? (
          <Link href={href} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{text}</p>
      {href ? (
        <span className="link-arrow mt-auto pt-5 text-sm" aria-hidden="true">
          {linkLabel} <Icon name="arrow" className="size-4" />
        </span>
      ) : null}
    </article>
  );
}

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-ice">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-ink">{c.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow ? <p className="eyebrow mt-8">{eyebrow}</p> : null}
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            {title}
          </h1>
          {intro ? <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">{intro}</p> : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
        {aside ? <div className="relative">{aside}</div> : null}
      </div>
    </section>
  );
}

export function ProcessStepper({
  steps,
}: {
  steps: { title: string; text: string; deliverable?: string; icon?: IconName }[];
}) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.title} className="glass reveal relative p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-mint text-sm font-bold text-on-brand">
              {i + 1}
            </span>
            <h3 className="text-lg font-bold text-ink">{s.title}</h3>
          </div>
          <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
          {s.deliverable ? (
            <p className="mt-4 border-t border-line pt-3 text-sm text-mint-soft">
              <span className="sr-only">You receive: </span>
              {s.deliverable}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line">
      {items.map((f) => (
        <details key={f.q} className="group px-5 sm:px-7">
          <summary className="flex items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-ink">
            {f.q}
            <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-line text-mint-soft transition-transform" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="-mt-1 pb-6 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBanner({
  title = "Let's build something intelligent together.",
  text = "Tell us about your workflow and we'll show you where AI can save time.",
  primary = { label: "Let's Talk", href: "/contact" },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
}) {
  const wa = whatsappLink();
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container-site">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-mint/25 cta-surface px-6 py-14 text-center sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-emerald/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-lime/15 blur-3xl" aria-hidden="true" />
          <h2 id="cta-title" className="relative mx-auto max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-lg text-ice/85">{text}</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
              <Icon name="arrow" className="size-4" />
            </Link>
            {wa ? (
              <a href={wa} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                <Icon name="chat" className="size-4" /> Chat with us on WhatsApp
              </a>
            ) : (
              <Link href="/platforms" className="btn btn-secondary">
                Explore our platforms
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-ice/90">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint/15 text-mint">
            <Icon name="check" className="size-4" />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
