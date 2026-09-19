-- Entre Jornadas blog posts (run on the portfolio Supabase project when available)
create table if not exists public.portfolio_blog_posts (
  id uuid primary key,
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  scheduled_at timestamptz,
  cover_image text,
  tags text[] not null default '{}',
  content_en jsonb not null default '{}'::jsonb,
  content_pt jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_blog_posts_status_idx
  on public.portfolio_blog_posts (status);
create index if not exists portfolio_blog_posts_published_at_idx
  on public.portfolio_blog_posts (published_at desc nulls last);

alter table public.portfolio_blog_posts enable row level security;

drop policy if exists "Public read published blog posts" on public.portfolio_blog_posts;
create policy "Public read published blog posts"
  on public.portfolio_blog_posts
  for select
  using (status = 'published');

drop policy if exists "Anon write blog posts" on public.portfolio_blog_posts;
create policy "Anon write blog posts"
  on public.portfolio_blog_posts
  for all
  using (true)
  with check (true);
