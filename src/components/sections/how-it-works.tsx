const steps = [
  { title: "Register here", body: "Tell us about your business. It takes about a minute." },
  { title: "Get your private link", body: "We set up your workspace and email you a secure sign-in link." },
  { title: "Connect WhatsApp", body: "Link your number through Meta's own signup window in a few clicks. No code." },
  { title: "Start talking", body: "Import contacts, invite your team and send your first approved template." },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">From sign-up to first message</h2>
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="font-display text-5xl font-bold text-signal tabular-nums">{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
