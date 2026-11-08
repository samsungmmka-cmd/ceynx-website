import { Icon, type IconName } from "../icon";

const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: "New lead on WhatsApp", text: "“Do you deliver to Sharjah?”" },
  { icon: "agent", title: "AI agent qualifies", text: "Budget, timing and need captured" },
  { icon: "layers", title: "CRM updated", text: "Contact, notes and stage saved" },
  { icon: "users", title: "Sales team notified", text: "Hot lead assigned in seconds" },
];

/** Illustration: an AI agent workflow with data flowing between steps. */
export function AgentFlow({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative ${className}`}>
      <ol className="relative space-y-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <div className="glass flex items-center gap-4 p-4">
              <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-mint to-emerald text-on-brand">
                <Icon name={s.icon} className="size-5" />
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full border border-line bg-deep text-[0.6rem] font-bold text-mint-soft">
                  {i + 1}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink">{s.title}</span>
                <span className="block truncate text-sm text-muted">{s.text}</span>
              </span>
              <Icon name="check" className="ml-auto size-5 shrink-0 text-emerald" />
            </div>
            {i < steps.length - 1 ? (
              <svg className="absolute left-[2.15rem] top-full h-3 w-2" viewBox="0 0 8 12" aria-hidden="true">
                <path d="M4 0v12" className="anim-flow" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "var(--c-mint)" }} />
              </svg>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">
        Example AI agent workflow: a WhatsApp lead is qualified by an AI agent, saved to the CRM and passed to the sales team.
      </figcaption>
    </figure>
  );
}
