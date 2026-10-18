"use client";

import { useEffect, useRef, useState } from "react";

/** True when the visitor asked the OS for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Tracks whether an element is on screen, so animations only run while someone can see them. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/**
 * Steps through 0..steps-1 every `ms` while `run` is true, then loops.
 * With reduced motion it jumps to the final step and stays there.
 */
export function useSteps(steps: number, ms: number, run: boolean) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) {
      setStep(steps - 1);
      return;
    }
    if (!run) return;
    setStep(0);
    const id = setInterval(() => setStep((n) => (n + 1) % steps), ms);
    return () => clearInterval(id);
  }, [steps, ms, run, reduced]);
  return step;
}

/** Counts from 0 up to `to` over `ms` once `run` turns true. */
export function useCountUp(to: number, run: boolean, ms = 1400) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, ms, reduced]);
  return value;
}
