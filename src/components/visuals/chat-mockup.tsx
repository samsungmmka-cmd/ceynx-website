"use client";

import { Icon } from "../icon";
import { useSequence } from "./use-sequence";

type Msg =
  | { from: "customer" | "bot"; text: string; time: string }
  | { from: "bot"; card: true; time: string }
  | { from: "typing" };

const script: Msg[] = [
  { from: "customer", text: "Hi! Do you have the Aero runners in size 42?", time: "10:41" },
  { from: "typing" },
  { from: "bot", text: "Hi Sara 👋 Yes, size 42 is in stock in two colours:", time: "10:41" },
  { from: "bot", card: true, time: "10:41" },
  { from: "customer", text: "Green please. Can it arrive by Friday?", time: "10:42" },
  { from: "typing" },
  { from: "bot", text: "Done ✅ Order #2184 is confirmed for Thursday delivery. I've sent the tracking link.", time: "10:42" },
];

const STEP_MS = [1200, 1400, 1000, 1600, 1800, 1300, 1400];

function Ticks() {
  return (
    <svg viewBox="0 0 18 12" className="ml-1 inline size-3.5 align-[-2px] text-mint-soft" aria-hidden="true">
      <path d="M1 6.5 4.5 10 11 2M7 9.5l.5.5L16 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Illustrative WhatsApp-style business conversation (customer, AI auto-reply, product card).
 * Uses CEYNX styling, not WhatsApp's trademarked logo or colours.
 */
export function ChatMockup({ className = "" }: { className?: string }) {
  const { ref, step } = useSequence<HTMLDivElement>(script.length, STEP_MS);
  // Typing indicators only show while they are the newest step.
  const visible = script.slice(0, step).filter((m, i) => m.from !== "typing" || i === step - 1);

  return (
    <div ref={ref} className={`relative mx-auto w-full max-w-[22rem] ${className}`}>
      <figure className="relative overflow-hidden rounded-[2.2rem] border border-line bg-deep p-2">
        <div className="overflow-hidden rounded-[1.8rem]" style={{ background: "var(--c-chat-bg)" }}>
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-line bg-midnight px-4 py-3">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-mint to-emerald text-sm font-extrabold text-on-brand" aria-hidden="true">
              AS
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 truncate text-sm font-semibold text-ink">
                Aero Sports
                <Icon name="check" className="size-3.5 rounded-full bg-emerald p-0.5 text-on-brand" />
              </p>
              <p className="text-xs text-muted">{step < script.length && script[step - 1]?.from === "typing" ? "typing…" : "Business account · AI assistant on"}</p>
            </div>
            <Icon name="phone" className="size-4 text-muted" />
          </div>
          {/* Messages */}
          <div className="flex h-[25rem] flex-col justify-end gap-2 px-3 py-4 text-[0.82rem] leading-snug" aria-live="off">
            {visible.map((m, i) => {
              if (m.from === "typing") {
                return (
                  <div key={`t${i}`} className="anim-typing flex w-fit gap-1 rounded-2xl rounded-bl-sm px-3 py-2.5" style={{ background: "var(--c-bubble-in)" }}>
                    <span className="size-1.5 rounded-full bg-muted" />
                    <span className="size-1.5 rounded-full bg-muted" />
                    <span className="size-1.5 rounded-full bg-muted" />
                  </div>
                );
              }
              const mine = m.from === "customer";
              if ("card" in m) {
                return (
                  <div key={i} className="w-[78%] overflow-hidden rounded-2xl rounded-bl-sm" style={{ background: "var(--c-bubble-in)" }}>
                    <div className="grid grid-cols-2 gap-1 p-1">
                      {[
                        ["#0f8f5a", "#c6ff00"],
                        ["#111111", "#525252"],
                      ].map(([a, b], k) => (
                        <div key={k} className="grid aspect-square place-items-center rounded-xl" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
                          <svg viewBox="0 0 64 32" className="w-4/5" aria-hidden="true">
                            <path d="M4 22c8 0 14-10 22-12 4 6 14 8 22 8 6 0 10 2 12 6v4H4z" fill="#fff" opacity=".92" />
                            <path d="M4 26h56" stroke="#02140d" strokeWidth="2" opacity=".35" />
                          </svg>
                        </div>
                      ))}
                    </div>
                    <div className="px-3 pb-2 pt-1">
                      <p className="font-semibold text-ink">Aero runners · size 42</p>
                      <p className="text-muted">Green or Black · AED 349</p>
                      <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-xs font-semibold text-mint-soft">
                        <span className="rounded-lg border border-line py-1.5">Green</span>
                        <span className="rounded-lg border border-line py-1.5">Black</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-ice ${mine ? "self-end rounded-br-sm" : "rounded-bl-sm"}`}
                  style={{ background: mine ? "var(--c-bubble-out)" : "var(--c-bubble-in)" }}
                >
                  {m.from === "bot" ? <span className="mb-0.5 block text-[0.68rem] font-semibold uppercase tracking-wider text-mint-soft">AI assistant</span> : null}
                  {m.text}
                  <span className={`ml-2 inline-block text-[0.66rem] ${mine ? "text-ice/80" : "text-muted"}`}>
                    {m.time}
                    {mine ? <Ticks /> : null}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Composer */}
          <div className="flex items-center gap-2 border-t border-line bg-midnight px-3 py-2.5">
            <span className="flex-1 rounded-full border border-line px-3 py-2 text-xs text-muted">Message</span>
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-mint to-emerald text-on-brand" aria-hidden="true">
              <Icon name="arrow" className="size-4" />
            </span>
          </div>
        </div>
        <figcaption className="sr-only">
          Example WhatsApp conversation: a customer asks about a product, the CEYNX AI assistant replies with a product card and confirms the order.
        </figcaption>
      </figure>
      {/* Floating stats */}
      <div className="glass absolute -left-36 top-28 hidden px-3 py-2 text-xs xl:block" aria-hidden="true">
        <p className="font-bold text-ink">Delivered · Read</p>
        <p className="text-muted">Live campaign analytics</p>
      </div>
      <div className="glass absolute -right-36 bottom-32 hidden px-3 py-2 text-xs xl:block" aria-hidden="true">
        <p className="font-bold text-ink">Instant AI reply</p>
        <p className="text-muted">24/7, hands off to your team</p>
      </div>
    </div>
  );
}
