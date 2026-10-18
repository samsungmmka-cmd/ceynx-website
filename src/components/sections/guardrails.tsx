import { Ban, CopyCheck, Gauge, LockKeyhole, ShieldCheck, Timer } from "lucide-react";

const rules = [
  { icon: ShieldCheck, title: "Opt-in only", line: "Consent re-checked before every send." },
  { icon: Ban, title: "STOP means stop", line: "Opt-outs apply instantly, with a record." },
  { icon: Timer, title: "24-hour window", line: "Free replies only while it's open." },
  { icon: CopyCheck, title: "Never sends twice", line: "Uncertain sends are flagged, not repeated." },
  { icon: Gauge, title: "Paced sending", line: "Stays inside limits, pauses on failures." },
  { icon: LockKeyhole, title: "Sealed workspace", line: "Isolated data, encrypted tokens." },
];

export function Guardrails() {
  return (
    <section id="guardrails" tabIndex={-1} className="bg-lagoon py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Built-in rules that protect your number</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {rules.map((r, i) => (
            <li
              key={r.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-signal/50 hover:bg-white/[0.07]"
            >
              <span
                className="grid size-11 place-items-center rounded-full bg-signal/15 text-signal transition-transform group-hover:scale-110"
                style={{ animation: `glow 3.6s ease-in-out ${i * 0.6}s infinite` }}
              >
                <r.icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-white/65">{r.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
