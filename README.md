# CEYNX marketing website

Public website for CEYNX, the WhatsApp Business messaging platform. It explains the product and collects registrations. The SaaS platform itself is never linked from here: after a business registers, the team sends it a private workspace link.

**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui components (Radix), lucide icons, zod. No database, no third-party scripts, no tracking.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

Without `LEAD_WEBHOOK_URL`, registrations are accepted in development only and nothing is sent.

## Deploy to Vercel

1. Import this repository in Vercel (framework is detected as Next.js; no build settings to change).
2. Add environment variables under **Project → Settings → Environment Variables**:

   | Name | Required | Purpose |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | Yes | Your public URL, e.g. `https://www.ceynx.com`. Used for canonical links, the sitemap and the same-origin check. |
   | `LEAD_WEBHOOK_URL` | Yes | HTTPS endpoint that receives each registration as JSON (Slack incoming webhook, Make, Zapier, n8n, Google Apps Script or your CRM). |
   | `LEAD_WEBHOOK_SECRET` | No | Sent as `Authorization: Bearer …` to the webhook. |

   In production, the form returns "temporarily unavailable" if `LEAD_WEBHOOK_URL` is missing, so leads are never silently lost.
3. Recommended: add a Vercel Firewall rate-limit rule for `POST /api/register` (e.g. 10 requests per minute per IP). The built-in limiter is per instance only.

### Webhook payload

```json
{
  "text": "New CEYNX registration: …",
  "lead": { "name": "", "email": "", "company": "", "phone": "+9715…", "teamSize": "4-10",
            "useCase": "Support", "message": "", "consent": true, "submittedAt": "2026-10-18T…Z" }
}
```

## Security

* Strict headers on every response (`next.config.ts`): CSP locked to `'self'`, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy, COOP/CORP. `X-Powered-By` removed.
* `/api/register` accepts only same-origin JSON POSTs up to 8 KB, validates every field with the same zod schema as the form, rejects bots (hidden honeypot field and a minimum fill time, both answered with a fake success), rate-limits per IP, forwards with an 8-second timeout and no redirects, and never logs personal data.
* No cookies, analytics or external assets. Fonts are self-hosted from npm packages.

## Where to edit

| What | File |
|---|---|
| Brand name, contact email, navigation | `src/lib/site.ts` |
| Colours and fonts | `src/app/globals.css` |
| Hero AI demo scenarios | `src/components/ai-composer.tsx` |
| Page sections | `src/components/sections/*` |
| Plans and prices | `src/components/sections/pricing.tsx` |
| Privacy policy and terms (placeholders, have them reviewed) | `src/app/privacy`, `src/app/terms` |

Items to finish before launch are marked `GO-LIVE:` in the code.

## Honest-claims notes

* CEYNX AI is presented as **early access**, because it is not live in the platform yet. Keep that label until it ships.
* The site says CEYNX is built on the official WhatsApp Business Platform; it does not claim Meta partner status or approval. Add that only once Meta grants it.
* Campaign numbers in the product mock-ups are labelled as example data. There are no testimonials or customer logos; add real ones only with permission.
