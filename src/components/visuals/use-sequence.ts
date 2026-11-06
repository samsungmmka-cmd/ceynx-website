"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Steps through 0..total while the element is on screen, pauses off screen and loops.
 * Server render and reduced-motion visitors get the final, complete state.
 */
export function useSequence<T extends HTMLElement>(total: number, stepMs: number[] | number, holdMs = 3500) {
  const ref = useRef<T>(null);
  const [step, setStep] = useState(total);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    let current = 0;
    let running = false;
    const delay = (i: number) => (Array.isArray(stepMs) ? (stepMs[i] ?? 1200) : stepMs);
    const tick = () => {
      if (!running) return;
      if (current >= total) {
        timer = window.setTimeout(() => {
          current = 0;
          setStep(0);
          timer = window.setTimeout(tick, 500);
        }, holdMs);
        return;
      }
      current += 1;
      setStep(current);
      timer = window.setTimeout(tick, delay(current));
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          current = 0;
          setStep(0);
          timer = window.setTimeout(tick, 600);
        } else if (!entry.isIntersecting && running) {
          running = false;
          window.clearTimeout(timer);
          setStep(total);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      running = false;
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [total, stepMs, holdMs]);

  return { ref, step };
}
