"use client";

import { MessageSquareText, PenLine, Route, ScrollText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useInView, useSteps } from "@/lib/use-animation";
import { cn } from "@/lib/utils";

const abilities = [
  { icon: PenLine, name: "Instructions to campaigns", line: "Describe it; AI picks audience, template and time." },
  { icon: MessageSquareText, name: "Reply suggestions", line: "Drafts in your tone. Agents edit and send." },
  { icon: Route, name: "Intent routing", line: "Orders, complaints and sales go to the right team." },
  { icon: ScrollText, name: "Conversation summaries", line: "Three lines on what the customer needs." },
];

const examples = [
  {
    ask: "Is the blue abaya available in size M?",
    draft: "Hi Mariam! Yes, size M is in stock. Shall I reserve one for pickup at Yas Mall today?",
    intent: "Order question",
    team: "Sales",
  },
  {
    ask: "My order hasn't arrived and it's been 5 days.",
    draft: "Sorry about the wait, Khalid. Your parcel is with the courier and due tomorrow. Here's the tracking link.",
    intent: "Delivery issue",
    team: "Support",
  },
];

// 0 idle → 1 customer message → 2 AI thinking → 3 draft → 4 intent tag → 5–6 hold
function ReplyDemo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const step = useSteps(14, 900, inView);
  const ex = examples[step < 7 ? 0 : 1];
  const s = step % 7;

  return (
    <div ref={ref} aria-hidden className="mt-8 rounded-2xl bg-lagoon p-4 text-sm shadow-xl sm:p-5">
      <div className="chat-wallpaper flex min-h-[220px] flex-col justify-end gap-3 rounded-xl p-3">
        {s >= 1 && (
          <p key={ex.ask} className="max-w-[85%] animate-pop self-start rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm">
            {ex.ask}
          </p>
        )}
        {s === 2 && (
          <p className="flex items-center gap-2 self-end rounded-lg bg-white/80 px-3 py-2 text-teal shadow-sm">
            <Sparkles className="size-4 animate-pulse" />
            Drafting a reply…
          </p>
        )}
        {s >= 3 && (
          <div key={ex.draft} className="max-w-[90%] animate-pop self-end rounded-lg border border-dashed border-teal/50 bg-bubble/90 px-3 py-2 shadow-sm">
            <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-teal">
              <Sparkles className="size-3" /> Suggested reply
            </p>
            {ex.draft}
            <span className="mt-2 flex gap-2 text-xs">
              <span className="rounded-full bg-teal px-2.5 py-0.5 text-white">Send</span>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-teal">Edit</span>
            </span>
          </div>
        )}
      </div>
      <p className={cn("mt-3 flex items-center gap-2 text-white/80 transition-opacity duration-500", s >= 4 ? "opacity-100" : "opacity-0")}>
        <Route className="size-4 text-signal" />
        {ex.intent}, routed to <span className="font-semibold text-white">{ex.team}</span>
      </p>
    </div>
  );
}

export function AiSection() {
  return (
    <section id="ai" tabIndex={-1} className="bg-card py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <Badge variant="soon">Early access</Badge>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">AI that drafts. People decide.</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">Nothing is sent without a person approving it.</p>
          <ReplyDemo />
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {abilities.map((a) => (
            <li key={a.name} className="rounded-2xl border bg-background p-4 sm:p-5">
              <span className="grid size-10 place-items-center rounded-full bg-accent text-teal">
                <a.icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-3 font-semibold tracking-tight sm:mt-4 sm:text-lg">{a.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">{a.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
