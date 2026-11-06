import { Icon } from "../icon";

const bars = [42, 58, 51, 70, 64, 82, 76, 94];

/** Illustration: a custom web dashboard, standing in for bespoke software projects. */
export function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative mx-auto w-full max-w-[34rem] ${className}`}>
      <div className="glass relative overflow-hidden" aria-hidden="true">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-ink/5 px-3 py-1 text-[0.68rem] text-muted">portal.yourcompany.com</span>
        </div>
        <div className="grid grid-cols-[3.25rem_1fr]">
          <div className="space-y-3 border-r border-line p-3">
            {(["chart", "users", "document", "automation"] as const).map((n, i) => (
              <span key={n} className={`grid size-8 place-items-center rounded-lg ${i === 0 ? "bg-emerald/15 text-emerald" : "text-muted"}`}>
                <Icon name={n} className="size-4" />
              </span>
            ))}
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Orders", "1,284"],
                ["Revenue", "AED 412k"],
                ["Automated", "76%"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-deep/60 p-2.5">
                  <p className="text-[0.62rem] uppercase tracking-wider text-muted">{k}</p>
                  <p className="mt-0.5 text-sm font-bold text-ink">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-line bg-deep/60 p-3">
              <div className="flex items-center justify-between text-[0.68rem] text-muted">
                <span className="font-semibold text-ink">Weekly orders</span>
                <span className="text-emerald">▲ trend</span>
              </div>
              <div className="mt-3 flex h-24 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className="anim-bar flex-1 rounded-t-md bg-gradient-to-t from-teal to-mint"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.08}s`, opacity: i === bars.length - 1 ? 1 : 0.75 }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {["Invoice #30418 synced to ERP", "Lead Sara K. assigned to Omar", "Stock alert: Aero runners 42"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 rounded-lg px-1 text-[0.7rem] text-muted">
                  <span className={`size-1.5 rounded-full ${i === 2 ? "bg-lime" : "bg-emerald"}`} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">Illustration of a custom business dashboard with orders, revenue, automation rate and activity feed.</figcaption>
    </figure>
  );
}
