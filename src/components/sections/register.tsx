"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { registerSchema, teamSizes, useCases } from "@/lib/register-schema";

type Errors = Partial<Record<string, string>>;

export function Register() {
  const openedAt = useRef<number>(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [demo, setDemo] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? "").replace(/[\s()-]/g, ""),
      teamSize: String(fd.get("teamSize") ?? ""),
      useCase: String(fd.get("useCase") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      elapsedMs: Date.now() - openedAt.current,
    };

    const parsed = registerSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Errors; demo?: boolean };
      if (res.ok) {
        setDemo(!!data.demo);
        setStatus("done");
        return;
      }
      if (data.fields) setErrors(data.fields);
      setFormError(data.error ?? "Registration didn't go through. Check your details and try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`e-${k}`} className="text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <section id="register" className="lagoon-field py-24 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Get early access to CEYNX</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
            Register your business and we&apos;ll set up your workspace, then email you a private link to sign in.
            Early-access workspaces get launch pricing and CEYNX AI first.
          </p>
          <ul className="mt-8 space-y-3 text-white/80">
            <li>We reply within one business day.</li>
            <li>No credit card needed to register.</li>
            <li>We use your details only to contact you about CEYNX.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-card p-6 text-card-foreground shadow-2xl shadow-black/30 sm:p-8">
          {status === "done" ? (
            <div role="status" className="flex flex-col items-start gap-4 py-10">
              <CheckCircle2 aria-hidden className="size-10 text-teal" />
              <h3 className="text-2xl font-bold">You&apos;re registered</h3>
              <p className="text-muted-foreground">
                Thanks. We&apos;ll review your details and email your private workspace link within one business day.
              </p>
              {demo && (
                <p className="rounded-md bg-accent px-3 py-2 text-sm text-teal">
                  Demo site: your details were checked but not sent anywhere.
                </p>
              )}
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="f-name">Full name</Label>
                <Input id="f-name" name="name" autoComplete="name" maxLength={80} required {...aria("name")} />
                {err("name")}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-email">Work email</Label>
                <Input id="f-email" name="email" type="email" autoComplete="email" maxLength={120} required {...aria("email")} />
                {err("email")}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-company">Company</Label>
                <Input id="f-company" name="company" autoComplete="organization" maxLength={100} required {...aria("company")} />
                {err("company")}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-phone">WhatsApp number</Label>
                <Input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+971 50 123 4567"
                  maxLength={20}
                  required
                  {...aria("phone")}
                />
                {err("phone")}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-teamSize">Team size</Label>
                <NativeSelect id="f-teamSize" name="teamSize" defaultValue="" required {...aria("teamSize")}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {teamSizes.map((t) => (
                    <option key={t} value={t}>
                      {t} people
                    </option>
                  ))}
                </NativeSelect>
                {err("teamSize")}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="f-useCase">Main use</Label>
                <NativeSelect id="f-useCase" name="useCase" defaultValue="" required {...aria("useCase")}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {useCases.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </NativeSelect>
                {err("useCase")}
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="f-message">Anything we should know? (optional)</Label>
                <Textarea id="f-message" name="message" maxLength={1000} rows={3} {...aria("message")} />
                {err("message")}
              </div>

              {/* Hidden from people; bots tend to fill it. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="f-website">Website</label>
                <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <label htmlFor="f-consent" className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    id="f-consent"
                    name="consent"
                    type="checkbox"
                    className="mt-0.5 size-4 shrink-0 accent-[#075E54]"
                    {...aria("consent")}
                  />
                  <span>
                    I agree that CEYNX may contact me by email and WhatsApp about my registration. See the{" "}
                    <a href="/privacy" className="text-teal underline underline-offset-4">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>
                {err("consent")}
              </div>

              {formError && (
                <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive sm:col-span-2">
                  {formError}
                </p>
              )}

              <Button type="submit" size="lg" variant="dark" disabled={status === "sending"} className="sm:col-span-2">
                {status === "sending" && <Loader2 aria-hidden className="animate-spin" />}
                {status === "sending" ? "Registering…" : "Register my business"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
