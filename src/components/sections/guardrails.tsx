const rules = [
  {
    title: "Opt-in before every campaign message",
    body: "Only contacts with recorded consent are eligible, and consent is checked again the moment before each message is sent.",
  },
  {
    title: "STOP means stop",
    body: "A customer who replies STOP or UNSUBSCRIBE is opted out at once, with a record of when and how. START brings them back.",
  },
  {
    title: "The 24-hour window, enforced",
    body: "Free-form replies are allowed only while WhatsApp's customer-service window is open. Outside it, CEYNX offers an approved template instead.",
  },
  {
    title: "Never sends the same message twice",
    body: "Every send carries a unique key. If a delivery result is uncertain, CEYNX flags it for review rather than resending.",
  },
  {
    title: "Paced to protect your number",
    body: "Campaigns stay inside your messaging limit and pause themselves if failures rise, so your quality rating stays healthy.",
  },
  {
    title: "Your workspace, sealed off",
    body: "Each business's data is isolated, access tokens are encrypted, and you can export or delete your workspace yourself.",
  },
];

export function Guardrails() {
  return (
    <section id="guardrails" className="bg-lagoon py-24 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Guardrails that keep your WhatsApp number healthy
        </h2>
        <p className="mt-5 max-w-xl text-lg text-white/70">
          A banned or low-quality number costs more than any campaign earns. These rules are built in and can&apos;t be
          switched off by accident.
        </p>

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((r) => (
            <div key={r.title} className="border-t border-signal/40 pt-5">
              <dt className="font-display text-xl font-semibold">{r.title}</dt>
              <dd className="mt-2 leading-relaxed text-white/70">{r.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
