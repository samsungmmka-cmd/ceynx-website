"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { budgets, interests, leadSchema, newsletterSchema } from "@/lib/lead-schema";
import { Icon } from "./icon";
import { Combobox } from "./shadcn/combobox";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ice">
        {label}
        {required ? <span className="text-mint-soft" aria-hidden="true"> *</span> : <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error ? <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm({
  kind = "contact",
  defaultInterest,
  submitLabel = "Send message",
  showBudget = false,
}: {
  kind?: "contact" | "demo" | "project";
  defaultInterest?: (typeof interests)[number];
  submitLabel?: string;
  showBudget?: boolean;
}) {
  const uid = useId();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const succeeded = useRef(false);
  const [interest, setInterest] = useState<string>(defaultInterest ?? "");
  const [budget, setBudget] = useState<string>("");

  // Don't show a stale success message when the visitor comes back to this page.
  useLayoutEffect(
    () => () => {
      if (succeeded.current) {
        succeeded.current = false;
        setStatus({ state: "idle" });
      }
    },
    [],
  );

  const id = (n: string) => `${uid}-${n}`;
  const describedBy = (n: string) => (errors[n] ? `${id(n)}-error` : undefined);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      kind,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      budget: fd.get("budget") ? String(fd.get("budget")) : undefined,
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      pagePath: pathname,
    };
    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      const next = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
      setErrors(next);
      setStatus({ state: "error", message: "Please check the highlighted fields." });
      const first = parsed.error.issues[0]?.path[0];
      if (first) document.getElementById(id(String(first)))?.focus();
      return;
    }
    setErrors({});
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };
      if (!res.ok || !json.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      formRef.current?.reset();
      setInterest(defaultInterest ?? "");
      setBudget("");
      succeeded.current = true;
      setStatus({ state: "success", message: "Thank you. Your message has been sent and our team will reply within one business day." });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={id("status")}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name} required>
          <input id={id("name")} name="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={describedBy("name")} required />
        </Field>
        <Field id={id("email")} label="Work email" error={errors.email} required>
          <input id={id("email")} name="email" type="email" autoComplete="email" inputMode="email" className="field" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} required />
        </Field>
        <Field id={id("company")} label="Company" error={errors.company}>
          <input id={id("company")} name="company" autoComplete="organization" className="field" aria-invalid={!!errors.company} aria-describedby={describedBy("company")} />
        </Field>
        <Field id={id("phone")} label="Phone or WhatsApp" error={errors.phone}>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
        </Field>
      </div>
      <Field id={id("interest")} label="I'm interested in" error={errors.interest} required>
        <Combobox
          id={id("interest")}
          name="interest"
          options={interests}
          value={interest}
          onChange={(v) => {
            setInterest(v);
            if (errors.interest) setErrors((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => k !== "interest")));
          }}
          placeholder="Choose a platform or service"
          searchPlaceholder="Search platforms and services…"
          invalid={!!errors.interest}
          describedBy={describedBy("interest")}
          required
        />
      </Field>
      {showBudget ? (
        <Field id={id("budget")} label="Budget range" error={errors.budget}>
          <Combobox
            id={id("budget")}
            name="budget"
            options={budgets}
            value={budget}
            onChange={setBudget}
            placeholder="Prefer not to say"
            searchable={false}
          />
        </Field>
      ) : null}
      <Field id={id("message")} label={kind === "project" ? "Your goal and timeline" : "How can we help?"} error={errors.message} required>
        <textarea id={id("message")} name="message" rows={5} className="field resize-y" aria-invalid={!!errors.message} aria-describedby={describedBy("message")} required />
      </Field>

      {/* Honeypot, hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-5 shrink-0 accent-mint"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            required
          />
          <span>
            I agree that CEYNX may use these details to reply to my enquiry, as described in the{" "}
            <Link href="/privacy" className="text-mint-soft underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent ? <p id={`${id("consent")}-error`} className="mt-1.5 text-sm font-medium text-danger">{errors.consent}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status.state === "sending"} aria-disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : submitLabel}
          <Icon name="arrow" className="size-4" />
        </button>
        <p
          id={id("status")}
          role="status"
          aria-live="polite"
          className={`text-sm ${status.state === "success" ? "text-mint-soft" : status.state === "error" ? "text-danger" : "text-muted"}`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = newsletterSchema.safeParse({ email: String(fd.get("email") ?? ""), website: String(fd.get("website") ?? "") });
    if (!parsed.success) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error);
      form.reset();
      setStatus({ state: "success", message: "You're subscribed. Thank you!" });
    } catch (err) {
      setStatus({ state: "error", message: (err as Error).message || "Please try again later." });
    }
  }
  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <label htmlFor={`${uid}-email`} className="text-sm font-semibold text-ink">
        Get AI and automation insights
      </label>
      <div className="mt-3 flex gap-2">
        <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" className="field min-w-0 flex-1" required aria-describedby={`${uid}-status`} />
        <button type="submit" className="btn btn-primary shrink-0 px-4" disabled={status.state === "sending"}>
          Subscribe
        </button>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id={`${uid}-status`} role="status" aria-live="polite" className={`mt-2 min-h-5 text-sm ${status.state === "error" ? "text-danger" : "text-mint-soft"}`}>
        {status.message}
      </p>
    </form>
  );
}
