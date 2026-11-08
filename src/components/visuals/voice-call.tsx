"use client";

import { Icon } from "../icon";
import { useSequence } from "./use-sequence";

const lines = [
  { who: "Caller", text: "Hi, I'd like to book a check-up with Dr. Amina tomorrow." },
  { who: "AI agent", text: "Of course. Tomorrow I have 10:30 am or 4:15 pm. Which suits you?" },
  { who: "Caller", text: "10:30, please." },
  { who: "AI agent", text: "Booked for 10:30 am ✓ I've sent the confirmation to your WhatsApp." },
];

const bars = [0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.65, 0.45, 0.8, 0.6, 0.9, 0.5, 0.75];

/** Illustration: an AI voice agent call with live waveform and transcript. */
export function VoiceCall({ className = "" }: { className?: string }) {
  const { ref, step } = useSequence<HTMLDivElement>(lines.length, 2200, 4000);
  const speaking = step > 0 && step <= lines.length ? lines[step - 1].who : null;

  return (
    <div ref={ref} className={`relative mx-auto w-full max-w-[26rem] ${className}`}>
      <figure className="glass relative overflow-hidden p-5">
        <div className="flex items-center gap-3">
          <span className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-mint to-emerald text-on-brand">
            <Icon name="voice" className="size-6" />
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald/30 motion-reduce:hidden" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">Clinic reception line</p>
            <p className="text-xs text-muted">AI voice agent · call in progress</p>
          </div>
          <span className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold tabular-nums text-mint-soft">00:{String(18 + step * 6).padStart(2, "0")}</span>
        </div>

        {/* Waveform */}
        <div className="mt-5 flex h-14 items-center justify-center gap-1 rounded-2xl border border-line bg-deep/60 px-3" aria-hidden="true">
          {bars.map((h, i) => (
            <span
              key={i}
              className="anim-wave w-1.5 rounded-full bg-gradient-to-t from-emerald to-mint"
              style={{ height: `${h * 100}%`, animationDelay: `${(i % 8) * -0.15}s`, animationDuration: speaking === "Caller" ? "0.9s" : "1.3s" }}
            />
          ))}
        </div>

        {/* Transcript */}
        <ol className="mt-4 min-h-[15.5rem] space-y-2 text-sm" aria-label="Call transcript">
          {lines.slice(0, step).map((l, i) => (
            <li key={i} className={`rounded-2xl px-3 py-2 ${l.who === "Caller" ? "mr-8 bg-ink/5 text-ice" : "ml-8 border border-emerald/30 bg-emerald/10 text-ice"}`}>
              <span className={`block text-[0.65rem] font-semibold uppercase tracking-wider ${l.who === "Caller" ? "text-muted" : "text-mint-soft"}`}>{l.who}</span>
              {l.text}
            </li>
          ))}
        </ol>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[0.7rem] font-semibold">
          {[
            ["clock", "Booked"],
            ["chat", "WhatsApp sent"],
            ["users", "Hand-off ready"],
          ].map(([icon, label]) => (
            <span key={label} className="flex flex-col items-center gap-1 rounded-xl border border-line py-2 text-muted">
              <Icon name={icon as "clock"} className="size-4 text-mint-soft" />
              {label}
            </span>
          ))}
        </div>
      </figure>
    </div>
  );
}
