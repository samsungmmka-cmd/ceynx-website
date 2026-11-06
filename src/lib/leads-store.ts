import "server-only";

/**
 * Persists submissions to Supabase over its REST API (no SDK needed) and optionally
 * sends an email notification through Resend. Server-side env vars:
 *   SUPABASE_URL                      -> project URL
 *   SUPABASE_PUBLISHABLE_KEY          -> insert-only access via RLS (default setup)
 *   SUPABASE_SERVICE_ROLE_KEY         -> optional; used instead when set
 *   RESEND_API_KEY, LEAD_NOTIFY_TO, LEAD_NOTIFY_FROM -> email notification (optional)
 */
type Row = Record<string, unknown>;

const tables = {
  leads: "ceynx_leads",
  newsletter: "ceynx_newsletter_subscribers",
} as const;

function storageKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || "";
}

export function storageConfigured() {
  return Boolean(process.env.SUPABASE_URL && storageKey());
}

/** Inserts one row. Returns "duplicate" when a unique constraint already holds the value. */
export async function insertRow(table: keyof typeof tables, row: Row): Promise<"ok" | "duplicate"> {
  const url = process.env.SUPABASE_URL;
  const key = storageKey();
  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[dev] ${table} submission (storage not configured):`, row);
      return "ok";
    }
    throw new Error("Lead storage is not configured");
  }
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
  // Legacy JWT keys also go in Authorization; new sb_publishable_/sb_secret_ keys must not.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${tables[table]}`, {
    method: "POST",
    headers,
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (res.status === 409) return "duplicate";
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
  return "ok";
}

export async function notifyTeam(subject: string, lines: [string, string | undefined][]) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  if (!apiKey || !to || !from) return;
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const html = lines
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><strong>${esc(k)}:</strong><br>${esc(String(v)).replace(/\n/g, "<br>")}</p>`)
    .join("");
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(","), subject, html }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("Lead notification failed", err);
  }
}

/** Best-effort, per-instance rate limit. Use a shared store (e.g. Redis) for strict limits. */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
