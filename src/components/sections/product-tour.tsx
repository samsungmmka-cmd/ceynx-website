"use client";

import { useEffect, useState } from "react";
import {
  Check,
  CheckCheck,
  Clock,
  Inbox,
  ListChecks,
  Megaphone,
  MessageSquare,
  Route,
  Tag,
  UserRound,
  Workflow,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCountUp, useInView, useReducedMotion, useSteps } from "@/lib/use-animation";
import { cn } from "@/lib/utils";

const TAB_MS = 9000;

const tabs = [
  { id: "inbox", label: "Inbox", icon: Inbox, title: "One inbox for the whole team", line: "Assign chats, add notes and never miss the 24-hour window." },
  { id: "campaigns", label: "Campaigns", icon: Megaphone, title: "Campaigns only to people who said yes", line: "Consent is checked again right before every send." },
  { id: "automations", label: "Automations", icon: Workflow, title: "Replies and routing on autopilot", line: "Keywords, business hours and teams, with safe limits." },
  { id: "flows", label: "WhatsApp Flows", icon: ListChecks, title: "Forms right inside the chat", line: "Bookings and sign-ups without leaving WhatsApp." },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ---------- Inbox: messages arrive, an agent replies, a new chat jumps to the top ---------- */

function useCountdown(run: boolean) {
  const [secs, setSecs] = useState(18 * 3600 + 12 * 60 + 40);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [run]);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}

function InboxMock({ play }: { play: boolean }) {
  const step = useSteps(8, 1100, play);
  const left = useCountdown(play);
  const newChat = step >= 6;
  const chats = [
    ...(newChat ? [{ n: "Priya Nair", m: "Do you deliver to Al Ain?", u: 1, fresh: true }] : []),
    { n: "Fatima Al Mansoori", m: step >= 3 ? "You: Thursday 2–5 pm works?" : "Can I change the delivery to Thursday?", u: step >= 3 ? 0 : 2, active: true },
    { n: "Omar Haddad", m: "Thanks, that worked!", u: 0 },
    { n: "Daniel Okafor", m: "Is the store open on Friday?", u: 0 },
  ].slice(0, 4);

  return (
    <div className="grid overflow-hidden rounded-xl border bg-card text-sm shadow-sm sm:grid-cols-[0.9fr_1.1fr]">
      <ul className="hidden border-r sm:block" aria-hidden>
        {chats.map((c) => (
          <li
            key={c.n}
            className={cn(
              "flex gap-3 border-b px-3 py-3 last:border-b-0 transition-colors",
              "active" in c && c.active && "bg-accent/60",
              "fresh" in c && c.fresh && "animate-pop",
            )}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-teal">
              {c.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{c.n}</p>
              <p className="flex justify-between gap-2 text-muted-foreground">
                <span className="truncate">{c.m}</span>
                {c.u > 0 && (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal text-[11px] font-semibold text-lagoon">
                    {c.u}
                  </span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex min-h-[300px] flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
          <p className="font-medium">Fatima Al Mansoori</p>
          <p className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs text-teal tabular-nums">
            <Clock aria-hidden className="size-3.5" />
            {left} to reply
          </p>
        </div>
        <div className="chat-wallpaper flex flex-1 flex-col justify-end gap-2 p-3" aria-hidden>
          {step >= 1 && (
            <p className="max-w-[80%] animate-pop self-start rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              Can I change the delivery to Thursday?
            </p>
          )}
          {step === 2 && (
            <span className="flex gap-1 self-end rounded-lg bg-bubble px-3 py-2.5 shadow-sm">
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-1.5 animate-dot rounded-full bg-teal/60" style={{ animationDelay: `${d * 150}ms` }} />
              ))}
            </span>
          )}
          {step >= 3 && (
            <p className="max-w-[80%] animate-pop self-end rounded-lg rounded-tr-sm bg-bubble px-3 py-2 shadow-sm">
              Of course. Thursday between 2 and 5 pm works?
              <CheckCheck className={cn("ml-1 inline size-3.5", step >= 4 ? "text-tick" : "text-[#8696a0]")} />
            </p>
          )}
          {step >= 5 && (
            <p className="animate-pop self-center rounded-md bg-white/85 px-2 py-1 text-xs text-muted-foreground">
              Note from Sara: VIP customer, waive the fee
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 border-t px-4 py-3 text-muted-foreground">
          <UserRound aria-hidden className="size-4" />
          Assigned to Sara
          <span className="ml-auto flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs">
            <Tag aria-hidden className="size-3" />
            Delivery
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Campaigns: the funnel counts up, recipients tick from grey to blue ---------- */

function CampaignMock({ play }: { play: boolean }) {
  const sent = useCountUp(612, play);
  const delivered = useCountUp(597, play, 1900);
  const read = useCountUp(451, play, 2600);
  const rows = [
    { l: "Sent", v: sent },
    { l: "Delivered", v: delivered },
    { l: "Read", v: read },
  ];
  const recipients = ["Fatima", "Omar", "Aisha", "Daniel", "Mariam"];

  return (
    <div className="grid gap-4 rounded-xl border bg-card p-5 text-sm shadow-sm sm:grid-cols-[1.3fr_1fr]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">Iftar menu, VIP Abu Dhabi</p>
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs text-teal">{read >= 451 ? "Completed" : "Sending"}</span>
        </div>
        <div className="mt-5 space-y-4">
          {rows.map((r) => (
            <div key={r.l}>
              <div className="flex justify-between">
                <span>{r.l}</span>
                <span className="tabular-nums text-muted-foreground">{r.v}</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-teal transition-[width] duration-200" style={{ width: `${(r.v / 640) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Check aria-hidden className="size-3.5 text-teal" />
          28 skipped: no opt-in
        </p>
      </div>
      <ul className="space-y-1.5 rounded-lg bg-secondary p-3" aria-hidden>
        {recipients.map((n, i) => (
          <li key={n} className="flex items-center justify-between rounded-md bg-card px-2.5 py-1.5">
            {n}
            {sent >= (i + 1) * 110 ? (
              <CheckCheck className={cn("size-4", read >= (i + 1) * 80 ? "text-tick" : "text-[#8696a0]")} />
            ) : (
              <Clock className="size-3.5 text-muted-foreground/60" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Automations: a pulse travels down the rule and lights each step ---------- */

const ruleSteps = [
  { icon: MessageSquare, k: "When", v: "A customer sends a message" },
  { icon: Zap, k: "If", v: "It mentions price or plan" },
  { icon: MessageSquare, k: "Then", v: "Reply with the pricing template" },
  { icon: Route, k: "And", v: "Route to Sales, least busy rep" },
];

function AutomationMock({ play }: { play: boolean }) {
  const step = useSteps(ruleSteps.length + 2, 900, play);
  return (
    <div className="rounded-xl border bg-card p-5 text-sm shadow-sm">
      <ol className="relative space-y-3">
        {ruleSteps.map((s, i) => {
          const lit = step > i;
          return (
            <li key={s.k} className="relative flex items-center gap-3">
              {i < ruleSteps.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-9 left-[17px] h-[calc(100%-12px)] w-0.5 transition-colors duration-500",
                    step > i + 1 ? "bg-signal" : "bg-border",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative grid size-9 shrink-0 place-items-center rounded-full border-2 transition-all duration-500",
                  lit ? "border-signal bg-signal text-lagoon" : "border-border bg-card text-muted-foreground",
                  step === i + 1 && "scale-110 shadow-[0_0_0_6px_rgba(37,211,102,0.18)]",
                )}
              >
                {lit ? <Check aria-hidden className="size-4" /> : <s.icon aria-hidden className="size-4" />}
              </span>
              <p className={cn("rounded-lg border px-3 py-2 transition-colors duration-500", lit ? "border-signal/40 bg-accent/50" : "bg-card")}>
                <span className="font-semibold">{s.k}</span> <span className="text-muted-foreground">{s.v}</span>
              </p>
            </li>
          );
        })}
      </ol>
      <p
        className={cn(
          "mt-4 flex items-center gap-2 rounded-lg bg-lagoon px-3 py-2 text-white transition-opacity duration-500",
          step > ruleSteps.length ? "opacity-100" : "opacity-0",
        )}
      >
        <UserRound aria-hidden className="size-4 text-signal" />
        Routed to Priya in Sales in 2 seconds
      </p>
    </div>
  );
}

/* ---------- Flows: the form fills itself in, then confirms ---------- */

function FlowMock({ play }: { play: boolean }) {
  const step = useSteps(7, 900, play);
  const done = step >= 5;
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2rem] bg-[#0a1513] p-2 shadow-xl" aria-hidden>
      <div className="relative min-h-[360px] overflow-hidden rounded-[1.6rem] bg-card p-5 text-sm">
        <p className="text-center font-semibold">Book a test drive</p>
        <div className={cn("mt-5 space-y-3 transition-opacity duration-300", done && "opacity-0")}>
          <div>
            <p className="text-xs text-muted-foreground">Full name</p>
            <div className={cn("mt-1 flex h-9 items-center rounded-md border bg-background px-3", step === 1 && "border-teal")}>
              {step >= 1 && "Omar Haddad"}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Preferred date</p>
            <div className={cn("mt-1 flex h-9 items-center rounded-md border bg-background px-3", step === 2 && "border-teal")}>
              {step >= 2 && "Thu, 24 Oct"}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Showroom</p>
          {["Dubai Marina", "Yas Island"].map((o, i) => (
            <p key={o} className="flex items-center gap-2">
              <span className={cn("grid size-4 place-items-center rounded-full border transition-colors", i === 1 && step >= 3 && "border-teal")}>
                {i === 1 && step >= 3 && <span className="size-2 animate-pop rounded-full bg-teal" />}
              </span>
              {o}
            </p>
          ))}
          <p
            className={cn(
              "mt-6 rounded-full bg-teal py-2.5 text-center font-medium text-white transition-transform duration-150",
              step === 4 && "scale-95 bg-lagoon",
            )}
          >
            Confirm booking
          </p>
        </div>
        {done && (
          <div className="absolute inset-0 grid animate-pop place-items-center p-6 text-center">
            <div>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-signal text-lagoon">
                <Check className="size-7" />
              </span>
              <p className="mt-4 text-base font-semibold">Booking confirmed</p>
              <p className="mt-1 text-muted-foreground">Thu, 24 Oct at Yas Island</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mocks: Record<TabId, (p: { play: boolean }) => React.JSX.Element> = {
  inbox: InboxMock,
  campaigns: CampaignMock,
  automations: AutomationMock,
  flows: FlowMock,
};

export function ProductTour() {
  const [active, setActive] = useState<TabId>("inbox");
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const reduced = useReducedMotion();
  const autoplay = inView && !paused && !reduced;

  // Move to the next tab every few seconds until the visitor picks one themselves.
  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => {
      const i = tabs.findIndex((t) => t.id === active);
      setActive(tabs[(i + 1) % tabs.length].id);
    }, TAB_MS);
    return () => clearTimeout(id);
  }, [active, autoplay]);

  return (
    <section id="product" tabIndex={-1} className="py-16 sm:py-20">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">See it working</h2>
        <p className="mt-3 text-lg text-muted-foreground">Pick a feature, or watch them play in turn.</p>

        <Tabs
          value={active}
          onValueChange={(v) => {
            setActive(v as TabId);
            setPaused(true);
          }}
          className="mt-8"
        >
          <TabsList aria-label="Product areas">
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="relative overflow-hidden">
                <t.icon aria-hidden />
                {t.label}
                {autoplay && active === t.id && (
                  <span
                    key={active}
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left animate-fill rounded-full bg-signal"
                    style={{ animationDuration: `${TAB_MS}ms` }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((t) => {
            const Mock = mocks[t.id];
            return (
              <TabsContent key={t.id} value={t.id} className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                <div className="min-h-[8.5rem] lg:min-h-0">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.title}</h3>
                  <p className="mt-3 text-lg text-muted-foreground">{t.line}</p>
                </div>
                <div className="flex min-h-[510px] items-center rounded-2xl bg-secondary p-3 sm:min-h-[430px] sm:p-6 [&>*]:w-full">
                  <Mock play={inView && active === t.id} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
