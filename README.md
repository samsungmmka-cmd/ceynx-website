# CEYNX website

Company website for **CEYNX** — SaaS platforms, AI agents and custom software. Built from the
"CEYNX Website — Company Description & Blueprint".

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Partial Prefetching) + TypeScript (strict) |
| Styling | Tailwind CSS v4 with brand tokens in `src/app/globals.css` |
| 3D hero | Three.js, lazy-loaded only on capable desktops; static SVG globe for everyone else |
| Fonts | Inter via `next/font/google`, downloaded at build time and self-hosted (no requests to Google from visitors) |
| Forms | Shared validation (`zod/mini`) in the browser and the API |
| Leads | Supabase table via REST, optional Resend email notification |
| Hosting | Designed for Vercel (any Node.js host works) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; empty values are hidden on the site
npm run dev                  # http://localhost:3000
```

Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Pages

`/` · `/platforms` · `/platforms/whatsapp-messaging` · `/platforms/document-ai` · `/platforms/voice-agent` ·
`/platforms/3d-learning` · `/solutions/ai-agents` · `/solutions/custom-software` · `/industries` · `/case-studies` ·
`/about` · `/insights` · `/careers` · `/contact` · `/privacy` · `/terms` · `/cookies` · custom 404.
Generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/icon.svg`, `/apple-icon`.

## Editing content

All copy lives in typed files, so no page code needs touching for most changes:

| What | File |
| --- | --- |
| Company details, contact, socials | `src/lib/site.ts` (or env vars) |
| SaaS platforms (copy, features, FAQs, SEO) | `src/content/platforms.ts` |
| AI Agents / Custom Software services | `src/content/solutions.ts` |
| Industries | `src/content/industries.ts` |
| Pillars, process, values, mission, stats, logos | `src/content/company.ts` |
| Case studies, articles, open roles | `src/content/editorial.ts` |
| Navigation | `src/content/navigation.ts` |

Mark an unreleased platform feature with `soon: true` to show a "Coming soon" badge.
Proof blocks (stats, logos, case studies) stay hidden until you add real entries.

## Lead storage (Supabase)

1. Run `supabase/migrations/20261106000000_create_leads.sql` in your Supabase project (SQL editor or `supabase db push`).
   It creates `ceynx_leads` and `ceynx_newsletter_subscribers` with insert-only access for the public key.
2. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as **server-only** environment variables
   (optionally `SUPABASE_SERVICE_ROLE_KEY` instead). View enquiries in the Supabase Table Editor.
3. Optional email alerts: set `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`.

Without storage configured, development logs submissions to the console and production returns a clear
error so no enquiry is silently lost. Row Level Security allows inserts only; nobody can read the tables through the API.

## Live deployment

- **Site:** https://ceynx-website.vercel.app (Vercel team "driver", project `ceynx-website`, functions in `syd1`)
- **Leads:** Supabase project "samsungmmka-cmd's Project", tables `ceynx_leads` and `ceynx_newsletter_subscribers`
- **Env vars set in Vercel:** `NEXT_PUBLIC_SITE_URL`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`
- Production is public; preview deployments stay behind Vercel Authentication.

## Deploying to Vercel

Import the repository in Vercel (framework preset: Next.js), add the environment variables above,
set `NEXT_PUBLIC_SITE_URL` to the final domain, and deploy.

## Standards built in

- **Accessibility (WCAG 2.2 AA):** skip link, landmarks, one `h1` per page, visible focus, keyboard-operable
  menus (disclosure pattern, Escape to close, native `<dialog>` on mobile), labelled form fields with inline
  errors and live status, reduced-motion support. axe-core: 0 violations on all pages, desktop and mobile.
- **Performance:** static prerendering for every page, self-hosted font, 3D code split and skipped on
  phones, low-power and reduced-motion devices. Lighthouse home page — desktop 100, mobile 92–95.
- **SEO:** unique titles, descriptions and canonicals; Open Graph/Twitter cards; JSON-LD (Organization,
  WebSite, BreadcrumbList, SoftwareApplication, FAQPage); sitemap and robots. Lighthouse SEO 100.
- **Security:** strict CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy; server-side
  validation, honeypot and rate limiting on forms; secrets only in server env vars.
- **Privacy:** no cookies or trackers, so no consent banner is needed. Add one before adding analytics.

## Before launch (open decisions)

- [ ] Confirm domain, email, phone, WhatsApp number, address (`.env` / `src/lib/site.ts`)
- [ ] Confirm product names and which features are live (`src/content/platforms.ts`)
- [ ] Replace the illustrated product previews with real screenshots
- [ ] Add real stats, client logos and case studies
- [ ] Keep only technologies you use in `techStack` (`src/content/solutions.ts`)
- [ ] Legal review of Privacy, Terms and Cookie pages
- [ ] Decide on Arabic (RTL) version and a CMS (Sanity or Payload) for case studies and articles
