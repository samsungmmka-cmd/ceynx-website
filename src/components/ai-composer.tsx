"use client";

import { useEffect, useState } from "react";
import { Check, CheckCheck, ChevronLeft, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Bubble = { from: "customer" | "business"; text: string; time: string };
type Scenario = {
  id: string;
  chip: string;
  prompt: string;
  business: string;
  checks: { label: string; value: string }[];
  chat: Bubble[];
  button?: string;
};

const scenarios: Scenario[] = [
  {
    id: "campaign",
    chip: "Campaign",
    prompt: "Send our iftar menu to VIP guests in Abu Dhabi at 6 pm. Opted-in only.",
    business: "Saffron House",
    checks: [
      { label: "Audience", value: "VIP guests in Abu Dhabi: 640" },
      { label: "Consent", value: "612 opted in, 28 left out" },
      { label: "Template", value: "iftar_menu, approved" },
      { label: "Schedule", value: "Today at 18:00, Gulf time" },
    ],
    chat: [
      {
        from: "business",
        text: "Ramadan Kareem, Fatima 🌙 Tonight's iftar menu is ready: lamb ouzi, saffron rice and fresh kunafa. Reserve before 7 pm to get a window table.",
        time: "18:00",
      },
    ],
    button: "Reserve a table",
  },
  {
    id: "automation",
    chip: "Automation",
    prompt: "Answer new leads within a minute. Send pricing questions to the Sales team.",
    business: "Northwind Mobiles",
    checks: [
      { label: "When", value: "A new conversation starts" },
      { label: "If", value: "The message mentions price or plan" },
      { label: "Then", value: "Reply, then route to the least busy rep" },
      { label: "Limit", value: "5 automated replies per hour" },
    ],
    chat: [
      { from: "customer", text: "Hi! How much is the trade-in plan for the new phone?", time: "10:41" },
      {
        from: "business",
        text: "Hi Omar, thanks for asking. I've passed you to our Sales team and Priya will reply within a few minutes.",
        time: "10:41",
      },
    ],
  },
  {
    id: "recovery",
    chip: "Cart reminder",
    prompt: "Remind shoppers whose cart expired yesterday. Skip anyone who opted out.",
    business: "Bloom Cart",
    checks: [
      { label: "Audience", value: "Cart expired yesterday: 412" },
      { label: "Consent", value: "389 opted in, 23 skipped" },
      { label: "Template", value: "cart_reminder, approved" },
      { label: "Duplicates", value: "One message per contact" },
    ],
    chat: [
      {
        from: "business",
        text: "Hi Aisha, your cart is still saved 🛒 The trainers you picked are back in your size. Finish your order before Friday.",
        time: "09:15",
      },
    ],
    button: "View my cart",
  },
];

type Phase = "typing" | "planning" | "sending" | "done";

export function AiComposer() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);
  const [checks, setChecks] = useState(0);
  const [bubbles, setBubbles] = useState(0);
  const [ticks, setTicks] = useState<0 | 1 | 2 | 3>(0);
  const [autoplay, setAutoplay] = useState(true);
  const [reduced, setReduced] = useState(false);

  const s = scenarios[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  // Reduced motion: skip straight to the finished state.
  useEffect(() => {
    if (!reduced) return;
    setTyped(s.prompt.length);
    setChecks(s.checks.length);
    setBubbles(s.chat.length);
    setTicks(3);
    setPhase("done");
  }, [reduced, s]);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < s.prompt.length) t = setTimeout(() => setTyped((n) => n + 1), 28);
      else t = setTimeout(() => setPhase("planning"), 450);
    } else if (phase === "planning") {
      if (checks < s.checks.length) t = setTimeout(() => setChecks((n) => n + 1), 420);
      else t = setTimeout(() => setPhase("sending"), 500);
    } else if (phase === "sending") {
      if (bubbles < s.chat.length) t = setTimeout(() => setBubbles((n) => n + 1), bubbles === 0 ? 200 : 1100);
      else if (ticks < 3) t = setTimeout(() => setTicks((n) => (n + 1) as 1 | 2 | 3), 600);
      else t = setTimeout(() => setPhase("done"), 200);
    } else if (phase === "done" && autoplay) {
      t = setTimeout(() => select((index + 1) % scenarios.length, true), 3800);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typed, checks, bubbles, ticks, reduced, autoplay, index]);

  function select(i: number, keepAutoplay = false) {
    if (!keepAutoplay) setAutoplay(false);
    setIndex(i);
    setTyped(0);
    setChecks(0);
    setBubbles(0);
    setTicks(0);
    setPhase("typing");
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
      {/* Instruction console */}
      <div className="relative z-10 rounded-2xl border border-white/15 bg-white/[0.07] p-4 text-white shadow-2xl shadow-black/30 backdrop-blur-md sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-white/90">
            <Sparkles aria-hidden className="size-4 text-signal" />
            Ask CEYNX
          </p>
          <div role="group" aria-label="Example instructions" className="flex flex-wrap gap-1">
            {scenarios.map((sc, i) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === index}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-signal",
                  i === index ? "bg-signal text-lagoon" : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {sc.chip}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 min-h-[3.25rem] rounded-xl bg-black/25 px-4 py-3 text-[15px] leading-snug" aria-live="polite">
          {s.prompt.slice(0, typed)}
          {phase === "typing" && <span aria-hidden className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-caret bg-signal" />}
        </p>

        <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
          {s.checks.map((c, i) => (
            <div
              key={c.label}
              className={cn("flex items-start gap-2 transition-opacity duration-300", i < checks ? "opacity-100" : "opacity-0")}
            >
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-signal" />
              <div>
                <dt className="sr-only">{c.label}</dt>
                <dd className="text-white/85">
                  <span className="text-white/55">{c.label}: </span>
                  {c.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Customer's phone */}
      <div className="relative z-0 mx-auto -mt-6 w-[290px] sm:mr-0 sm:-mt-10 sm:w-[300px]">
        <div className="rounded-[2.4rem] bg-[#0a1513] p-2.5 shadow-2xl shadow-black/50 ring-1 ring-white/10">
          <div className="overflow-hidden rounded-[1.9rem]">
            <div className="flex items-center gap-2 bg-teal px-3 pt-7 pb-2.5 text-white">
              <ChevronLeft aria-hidden className="size-5 opacity-80" />
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full bg-white/15 text-xs font-semibold"
              >
                {s.business
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">{s.business}</p>
                <p className="text-[11px] text-white/70">Business account</p>
              </div>
            </div>

            <div className="chat-wallpaper flex h-[300px] flex-col justify-end gap-2 px-2.5 py-3" aria-label="Example WhatsApp conversation">
              {s.chat.slice(0, bubbles).map((b, i) => {
                const mine = b.from === "business";
                const last = i === s.chat.length - 1;
                return (
                  <div key={i} className={cn("flex animate-pop", mine ? "justify-start" : "justify-end")}>
                    <div
                      className={cn(
                        "max-w-[86%] rounded-xl px-2.5 pt-1.5 pb-1 text-[13px] leading-snug text-[#111b21] shadow-sm",
                        mine ? "rounded-tl-sm bg-white" : "rounded-tr-sm bg-bubble",
                      )}
                    >
                      <p>{b.text}</p>
                      <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
                        {b.time}
                        {!mine && <CheckCheck aria-hidden className="size-3.5 text-tick" />}
                      </p>
                      {mine && last && s.button && (
                        <p className="-mx-2.5 mt-1 flex items-center justify-center gap-1.5 border-t border-black/5 pt-1.5 text-[13px] font-medium text-[#027eb5]">
                          <ExternalLink aria-hidden className="size-3.5" />
                          {s.button}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              {phase === "sending" && bubbles < s.chat.length && bubbles > 0 && (
                <div className="flex justify-start">
                  <span className="flex gap-1 rounded-xl bg-white px-3 py-2.5 shadow-sm" aria-label="Typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="size-1.5 animate-dot rounded-full bg-[#8696a0]" style={{ animationDelay: `${d * 150}ms` }} />
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delivery status from the business side */}
        <p
          className={cn(
            "mt-3 flex items-center justify-center gap-2 text-xs text-white/70 transition-opacity duration-300",
            bubbles > 0 ? "opacity-100" : "opacity-0",
          )}
        >
          {ticks <= 1 ? <Check aria-hidden className="size-4" /> : <CheckCheck aria-hidden className={cn("size-4", ticks === 3 && "text-tick")} />}
          {["Sending", "Sent", "Delivered", "Read"][ticks]}
        </p>
      </div>
    </div>
  );
}
