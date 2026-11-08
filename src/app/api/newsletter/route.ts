import { newsletterSchema } from "@/lib/lead-schema";
import { insertRow, rateLimited } from "@/lib/leads-store";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`newsletter:${ip}`)) {
    return Response.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return Response.json({ ok: true });
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }
  try {
    await insertRow("newsletter", { email: parsed.data.email.toLowerCase() });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "Subscription is unavailable right now." }, { status: 503 });
  }
  return Response.json({ ok: true });
}
