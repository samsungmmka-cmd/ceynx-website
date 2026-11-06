-- CEYNX website: enquiries and newsletter sign-ups.
-- The website server inserts with the publishable (anon) key. RLS allows INSERT only:
-- the API cannot read, update or delete rows. View data in the Supabase dashboard.
-- Tables are prefixed ceynx_ because they share a Supabase project with another app.

create table if not exists public.ceynx_leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  kind        text not null check (kind in ('contact', 'demo', 'project')),
  name        text not null check (char_length(name) between 2 and 120),
  email       text not null check (char_length(email) between 3 and 200 and position('@' in email) > 1),
  company     text check (char_length(company) <= 160),
  phone       text check (char_length(phone) <= 40),
  interest    text not null check (char_length(interest) <= 80),
  budget      text check (char_length(budget) <= 40),
  message     text not null check (char_length(message) between 10 and 4000),
  page_path   text check (char_length(page_path) <= 300),
  user_agent  text check (char_length(user_agent) <= 300),
  status      text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed'))
);
create index if not exists ceynx_leads_created_at_idx on public.ceynx_leads (created_at desc);

create table if not exists public.ceynx_newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique check (char_length(email) between 3 and 200 and position('@' in email) > 1)
);

alter table public.ceynx_leads enable row level security;
alter table public.ceynx_newsletter_subscribers enable row level security;

revoke all on public.ceynx_leads from anon, authenticated;
revoke all on public.ceynx_newsletter_subscribers from anon, authenticated;
grant insert on public.ceynx_leads to anon;
grant insert on public.ceynx_newsletter_subscribers to anon;

create policy "Website can submit leads" on public.ceynx_leads
  for insert to anon with check (status = 'new');
create policy "Website can add newsletter subscribers" on public.ceynx_newsletter_subscribers
  for insert to anon with check (true);
