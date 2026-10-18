"use client";

import { Clock, Inbox, Megaphone, Workflow, ListChecks, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    title: "Every customer chat in one shared inbox",
    body: "Your whole team answers from one WhatsApp number. Assign chats, leave internal notes, send photos and documents, and see a live countdown of WhatsApp's 24-hour reply window.",
    points: ["Assign by agent or team", "Unread and waiting filters", "Images, video, audio and documents", "Desktop notifications without message text"],
  },
  {
    id: "campaigns",
    label: "Campaigns",
    icon: Megaphone,
    title: "Campaigns that only reach people who said yes",
    body: "Pick a segment, map template variables to contact fields and run a test that sends nothing. Consent is checked again right before each message goes out.",
    points: ["Segments by tag, attribute or consent", "Scheduling and pause or resume", "Delivered and read rates per campaign", "Safe retry for failed recipients"],
  },
  {
    id: "automations",
    label: "Automations",
    icon: Workflow,
    title: "Replies and routing that run on their own",
    body: "Rules react to keywords, message type, tags and business hours. Reply, send a template, tag, assign or route to the least busy teammate.",
    points: ["Business-hours aware", "Hourly and daily caps per chat", "Run log for every rule", "Secure outbound webhooks"],
  },
  {
    id: "flows",
    label: "WhatsApp Flows",
    icon: ListChecks,
    title: "Forms inside the chat",
    body: "Collect bookings, sign-ups and feedback with WhatsApp Flows. Build with a live phone preview, publish, send from the inbox and read answers in a table.",
    points: ["Live interactive preview", "Responses saved to the conversation", "Publish, duplicate or retire", "Validation before you publish"],
  },
] as const;

function InboxMock() {
  const chats = [
    { n: "Fatima Al Mansoori", m: "Can I change the delivery to Thursday?", t: "2m", u: 2, active: true },
    { n: "Omar Haddad", m: "Thanks, that worked!", t: "14m", u: 0 },
    { n: "Priya Nair", m: "Photo", t: "1h", u: 1 },
    { n: "Daniel Okafor", m: "Is the store open on Friday?", t: "3h", u: 0 },
  ];
  return (
    <div className="grid overflow-hidden rounded-xl border bg-card text-sm sm:grid-cols-[0.9fr_1.1fr]">
      <ul className="hidden border-r sm:block">
        {chats.map((c) => (
          <li key={c.n} className={`flex gap-3 border-b px-3 py-3 last:border-b-0 ${c.active ? "bg-accent/60" : ""}`}>
            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-teal">
              {c.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex justify-between gap-2 font-medium">
                <span className="truncate">{c.n}</span>
                <span className="text-xs text-muted-foreground">{c.t}</span>
              </p>
              <p className="flex justify-between gap-2 text-muted-foreground">
                <span className="truncate">{c.m}</span>
                {c.u > 0 && <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal text-[11px] font-semibold text-lagoon">{c.u}</span>}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="font-medium">Fatima Al Mansoori</p>
          <p className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs text-teal">
            <Clock aria-hidden className="size-3.5" />
            18h 12m left to reply
          </p>
        </div>
        <div className="chat-wallpaper flex flex-1 flex-col justify-end gap-2 p-3">
          <p className="max-w-[80%] self-start rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm">Can I change the delivery to Thursday?</p>
          <p className="max-w-[80%] self-end rounded-lg rounded-tr-sm bg-bubble px-3 py-2 shadow-sm">Of course. Thursday between 2 and 5 pm works?</p>
          <p className="self-center rounded-md bg-white/80 px-2 py-1 text-xs text-muted-foreground">Note from Sara: VIP customer, waive the fee</p>
        </div>
        <div className="border-t px-4 py-3 text-muted-foreground">Type a reply…</div>
      </div>
    </div>
  );
}

function CampaignMock() {
  const rows = [
    { l: "Sent", v: 612, p: 100 },
    { l: "Delivered", v: 597, p: 97.5 },
    { l: "Read", v: 451, p: 73.7 },
  ];
  return (
    <div className="rounded-xl border bg-card p-5 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">Iftar menu, VIP Abu Dhabi</p>
        <span className="rounded-full bg-accent px-2.5 py-1 text-xs text-teal">Completed</span>
      </div>
      <p className="mt-1 text-muted-foreground">612 of 640 contacts eligible. 28 left out: no opt-in.</p>
      <div className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.l}>
            <div className="flex justify-between">
              <span>{r.l}</span>
              <span className="tabular-nums text-muted-foreground">
                {r.v} ({r.p}%)
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-muted">
              <div className="h-2 rounded-full bg-teal" style={{ width: `${r.p}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">Example data for illustration.</p>
    </div>
  );
}

function AutomationMock() {
  const steps = [
    { k: "When", v: "A customer sends a message" },
    { k: "If", v: "It contains “price” or “plan”, outside business hours" },
    { k: "Then", v: "Reply with the pricing template" },
    { k: "And", v: "Route to the Sales team, least busy member" },
  ];
  return (
    <ol className="space-y-2 text-sm">
      {steps.map((s, i) => (
        <li key={s.k} className="flex items-start gap-3 rounded-xl border bg-card p-4">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lagoon text-xs font-semibold text-white">{i + 1}</span>
          <p>
            <span className="font-semibold">{s.k}</span> <span className="text-muted-foreground">{s.v}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

function FlowMock() {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2rem] bg-[#0a1513] p-2 shadow-xl">
      <div className="rounded-[1.6rem] bg-card p-5 text-sm">
        <p className="text-center font-semibold">Book a test drive</p>
        <div className="mt-5 space-y-3">
          {["Full name", "Preferred date"].map((f) => (
            <div key={f}>
              <p className="text-xs text-muted-foreground">{f}</p>
              <div className="mt-1 h-9 rounded-md border bg-background" />
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Showroom</p>
          {["Dubai Marina", "Yas Island"].map((o, i) => (
            <p key={o} className="flex items-center gap-2">
              <span className={`grid size-4 place-items-center rounded-full border ${i === 1 ? "border-teal" : ""}`}>
                {i === 1 && <span className="size-2 rounded-full bg-teal" />}
              </span>
              {o}
            </p>
          ))}
        </div>
        <p className="mt-6 rounded-full bg-teal py-2.5 text-center font-medium text-white">Confirm booking</p>
      </div>
    </div>
  );
}

const mocks = { inbox: InboxMock, campaigns: CampaignMock, automations: AutomationMock, flows: FlowMock };

export function ProductTour() {
  return (
    <section id="product" className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Everything a WhatsApp team needs, in one place</h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Built for support desks, sales teams and marketers who already live in WhatsApp and need it to scale.
        </p>

        <Tabs defaultValue="inbox" className="mt-12">
          <TabsList aria-label="Product areas">
            {tabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>
                <t.icon aria-hidden />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((t) => {
            const Mock = mocks[t.id];
            return (
              <TabsContent key={t.id} value={t.id} className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{t.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-secondary p-3 sm:p-6">
                  <Mock />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
