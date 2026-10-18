import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// GO-LIVE: replace "On request" with real prices once they are set.
const plans = [
  {
    name: "Free",
    price: "AED 0",
    note: "To try CEYNX with a small team",
    features: ["Up to 3 team members", "Shared inbox and templates", "Contacts and consent records", "Basic analytics"],
  },
  {
    name: "Starter",
    price: "On request",
    note: "For growing support and sales teams",
    features: ["Up to 10 team members", "Campaigns and segments", "Automations", "CSV import and export"],
    featured: true,
  },
  {
    name: "Growth",
    price: "On request",
    note: "For high-volume businesses",
    features: ["Up to 50 team members", "WhatsApp Flows", "Teams and routing", "Priority onboarding"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Plans that grow with your team</h2>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Early-access customers get launch pricing. WhatsApp&apos;s own message fees are billed by Meta directly to
          your business, with no markup from us.
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "flex flex-col rounded-2xl p-7",
                p.featured ? "bg-lagoon text-white" : "border bg-card",
              )}
            >
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className={cn("mt-1", p.featured ? "text-white/70" : "text-muted-foreground")}>{p.note}</p>
              <p className="mt-6 font-display text-4xl font-bold tracking-tight">{p.price}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", p.featured ? "text-signal" : "text-teal")} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-8" variant={p.featured ? "default" : "dark"} asChild>
                <a href="#register">Get early access</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
