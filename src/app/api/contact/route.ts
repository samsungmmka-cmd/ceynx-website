import { leadSchema } from "@/lib/lead-schema";
import { insertRow, notifyTeam, rateLimited } from "@/lib/leads-store";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`contact:${ip}`)) {
    return Response.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    // A filled honeypot is a bot: answer as if it worked, store nothing.
    if (fieldErrors.website) return Response.json({ ok: true });
    return Response.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const lead = parsed.data;
  try {
    await insertRow("leads", {
      kind: lead.kind,
      name: lead.name,
      email: lead.email,
      company: lead.company || null,
      phone: lead.phone || null,
      interest: lead.interest,
      budget: lead.budget ?? null,
      message: lead.message,
      page_path: lead.pagePath ?? null,
      user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { ok: false, error: "We couldn't send your message right now. Please email us instead." },
      { status: 503 },
    );
  }

  await notifyTeam(`New ${lead.kind} enquiry: ${lead.interest}`, [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone", lead.phone],
    ["Interest", lead.interest],
    ["Budget", lead.budget],
    ["Message", lead.message],
    ["Page", lead.pagePath],
  ]);

  return Response.json({ ok: true });
}
