import { Icon } from "../icon";

const fields = [
  { k: "Vendor", v: "Gulf Office Supplies LLC", c: 99 },
  { k: "Invoice no.", v: "INV-30418", c: 99 },
  { k: "Invoice date", v: "02 Nov 2026", c: 98 },
  { k: "VAT (5%)", v: "AED 212.50", c: 97 },
  { k: "Total due", v: "AED 4,462.50", c: 99 },
];

/** Illustration: an invoice being scanned while extracted fields appear beside it. */
export function DocScan({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative mx-auto grid w-full max-w-[34rem] gap-4 sm:grid-cols-[1fr_1.05fr] ${className}`}>
      {/* Document */}
      <div
        className="relative overflow-hidden rounded-2xl border border-line p-5"
        style={{ background: "var(--c-paper)", color: "var(--c-paper-ink)" }}
        aria-hidden="true"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-widest opacity-80">Tax invoice</p>
            <p className="mt-1 text-sm font-bold">Gulf Office Supplies</p>
          </div>
          <span className="grid size-8 place-items-center rounded-lg bg-[#0b5e3c] text-[0.6rem] font-black text-white">GOS</span>
        </div>
        <div className="mt-4 space-y-1.5">
          {[80, 62, 70].map((w, i) => (
            <div key={i} className="h-1.5 rounded bg-current opacity-15" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-5 space-y-2 border-y border-current/10 py-3">
          {[
            ["Copier paper A4 × 40", "1,600.00"],
            ["Toner cartridges × 6", "1,950.00"],
            ["Desk organisers × 14", "700.00"],
          ].map(([a, b]) => (
            <div key={a} className="flex justify-between text-[0.68rem]">
              <span className="opacity-75">{a}</span>
              <span className="font-semibold">{b}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-xs font-bold">
          <span>Total</span>
          <span>AED 4,462.50</span>
        </div>
        <div className="mt-4 h-8 w-24 rounded border-2 border-dashed border-current opacity-20" />
        {/* Scanning beam */}
        <div className="anim-scan absolute inset-x-0 top-[4%] h-10 -translate-y-1/2">
          <div className="h-full bg-gradient-to-b from-transparent via-emerald/25 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-emerald shadow-[0_0_14px] shadow-emerald" />
        </div>
      </div>
      {/* Extraction panel */}
      <div className="glass relative p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-mint-soft">
          <Icon name="spark" className="size-4" /> AI extraction
          <span className="ml-auto rounded-full bg-emerald/15 px-2 py-0.5 text-[0.65rem] text-emerald">Live</span>
        </div>
        <dl className="mt-3 space-y-2">
          {fields.map((f, i) => (
            <div key={f.k} className="anim-field rounded-xl border border-line bg-deep/60 px-3 py-2" style={{ animationDelay: `${0.4 + i * 0.55}s` }}>
              <dt className="text-[0.65rem] uppercase tracking-wider text-muted">{f.k}</dt>
              <dd className="flex items-center justify-between gap-2 text-sm font-semibold text-ink">
                <span className="truncate">{f.v}</span>
                <span className="shrink-0 text-[0.65rem] font-medium text-emerald">{f.c}%</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-gradient-to-r from-mint to-emerald px-3 py-2 text-xs font-bold text-on-brand">
          Export to ERP <Icon name="arrow" className="size-4" />
        </div>
      </div>
      <figcaption className="sr-only">
        Illustration: CEYNX DocSense scans an invoice and extracts vendor, invoice number, date, VAT and total with confidence scores.
      </figcaption>
    </figure>
  );
}
