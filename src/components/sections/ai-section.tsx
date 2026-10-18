import { MessageSquareText, Route, PenLine, ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const abilities = [
  {
    icon: PenLine,
    name: "Instructions to campaigns",
    body: "Describe who should hear from you and why. CEYNX AI picks the segment, the approved template and the send time, then waits for your go-ahead.",
  },
  {
    icon: MessageSquareText,
    name: "Reply suggestions",
    body: "Draft answers appear in the inbox in your brand's tone, built from your past replies and product notes. Agents edit and send.",
  },
  {
    icon: Route,
    name: "Intent routing",
    body: "Orders, complaints and sales questions are recognised as they arrive and sent to the right team before anyone opens the chat.",
  },
  {
    icon: ScrollText,
    name: "Conversation summaries",
    body: "Pick up any chat with a three-line summary of what the customer wants and what was promised.",
  },
];

export function AiSection() {
  return (
    <section id="ai" className="bg-card py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Badge variant="soon">Early access</Badge>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">An AI layer that works inside the rules</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            CEYNX AI never sends on its own. Every plan it prepares goes through the same consent, template and
            reply-window checks as your team, and a person approves it.
          </p>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            AI features are rolling out to early-access workspaces first. Register to be included.
          </p>
        </div>

        <ul className="divide-y border-y">
          {abilities.map((a) => (
            <li key={a.name} className="flex gap-5 py-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-teal">
                <a.icon aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{a.name}</h3>
                <p className="mt-2 max-w-[56ch] leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
