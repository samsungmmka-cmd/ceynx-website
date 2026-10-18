import { NextResponse, type NextRequest } from "next/server";
import { registerSchema } from "@/lib/register-schema";
import { isDemo, site } from "@/lib/site";

// Registration endpoint. It validates the request, filters bots and forwards the lead
// to LEAD_WEBHOOK_URL. Nothing is stored on this site, so there's no database to protect.

const MAX_BODY_BYTES = 8 * 1024;
const MIN_FILL_MS = 2500; // humans don't fill eight fields in under 2.5 s
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance limiter. For hard limits add a Vercel Firewall rate-limit rule on /api/register.
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    const o = new URL(origin);
    if (host && o.host === host) return true;
    const site = process.env.NEXT_PUBLIC_SITE_URL;
    return !!site && o.origin === new URL(site).origin;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json(403, { error: "This form only works from the CEYNX website." });
  if (!req.headers.get("content-type")?.startsWith("application/json")) {
    return json(415, { error: "Send the form as JSON." });
  }

  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return json(429, { error: "Too many attempts. Wait a few minutes and try again." });

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "The form is too large. Shorten your message." });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "The form data couldn't be read. Refresh the page and try again." });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (key === "website" || key === "elapsedMs") continue;
      fields[key] ??= issue.message;
    }
    // Honeypot or timing failure only: answer like a success so bots learn nothing.
    if (Object.keys(fields).length === 0) return json(200, { ok: true });
    return json(422, { error: "Some details need fixing.", fields });
  }

  const lead = parsed.data;
  if (lead.elapsedMs < MIN_FILL_MS) return json(200, { ok: true });

  if (isDemo) {
    // Mock delivery: nothing leaves the server and nothing personal is logged.
    console.info("[register] Demo mode: registration validated, not delivered.");
    return json(200, { ok: true, demo: true });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[register] LEAD_WEBHOOK_URL not set; lead accepted in development only.");
      return json(200, { ok: true });
    }
    console.error("[register] LEAD_WEBHOOK_URL is not configured.");
    return json(503, { error: `Registration is temporarily unavailable. Email us at ${site.email}.` });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify({
        // `text` makes the payload readable as-is in Slack incoming webhooks.
        text: `New CEYNX registration: ${lead.name} (${lead.company}), ${lead.email}, ${lead.phone}, team ${lead.teamSize}, ${lead.useCase}`,
        lead: {
          name: lead.name,
          email: lead.email,
          company: lead.company,
          phone: lead.phone,
          teamSize: lead.teamSize,
          useCase: lead.useCase,
          message: lead.message,
          consent: true,
          submittedAt: new Date().toISOString(),
        },
      }),
      redirect: "error",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook answered ${res.status}`);
  } catch (e) {
    // Log the failure, never the lead's personal data.
    console.error("[register] Lead delivery failed:", e instanceof Error ? e.message : "unknown error");
    return json(502, { error: "Registration didn't go through on our side. Try again in a minute." });
  }

  return json(200, { ok: true });
}

export function GET() {
  return json(405, { error: "Use POST." });
}
