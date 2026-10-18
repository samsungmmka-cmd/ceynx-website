"use client";

import { ClipboardList, Link2, MessageCircle, Smartphone } from "lucide-react";
import { useInView, useSteps } from "@/lib/use-animation";
import { cn } from "@/lib/utils";

const steps = [
  { icon: ClipboardList, title: "Register", line: "One-minute form." },
  { icon: Link2, title: "Get your link", line: "We set up your workspace." },
  { icon: Smartphone, title: "Connect WhatsApp", line: "A few clicks, no code." },
  { icon: MessageCircle, title: "Start talking", line: "Send your first message." },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLOListElement>(0.4);
  // Lights the steps one by one, holds, then starts again.
  const step = useSteps(steps.length + 3, 800, inView);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">Live in four steps</h2>
        <ol ref={ref} className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* progress rail behind the icons on wide screens */}
          <span aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 bg-border lg:block" />
          <span
            aria-hidden
            className="absolute top-7 left-[12.5%] hidden h-0.5 bg-signal transition-[width] duration-700 lg:block"
            style={{ width: `${(Math.min(step, steps.length) - 1 > 0 ? (Math.min(step, steps.length) - 1) / (steps.length - 1) : 0) * 75}%` }}
          />
          {steps.map((s, i) => {
            const lit = step > i;
            return (
              <li key={s.title} className="relative flex items-center gap-4 lg:flex-col lg:text-center">
                <span
                  className={cn(
                    "relative grid size-14 shrink-0 place-items-center rounded-full border-2 transition-all duration-500",
                    lit ? "border-signal bg-signal text-lagoon" : "border-border bg-card text-muted-foreground",
                    step === i + 1 && "scale-110",
                  )}
                >
                  <s.icon aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground">{s.line}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
