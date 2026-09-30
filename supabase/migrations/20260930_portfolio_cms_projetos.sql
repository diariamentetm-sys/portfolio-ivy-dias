-- Portfolio CMS schema on Projetos (settings, projects, blog + engagement RPCs)

create table if not exists public.portfolio_site_settings (
  id text primary key,
  hero_image text,
  contact_photo text,
  hero_copy jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_projects (
  id uuid primary key,
  slug text not null unique,
  n text not null default '',
  published boolean not null default true,
  category text,
  overview_image text,
  content_en jsonb not null default '{}'::jsonb,
  content_pt jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_n_idx
  on public.portfolio_projects (n);

create table if not exists public.portfolio_blog_posts (
  id uuid primary key,
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  scheduled_at timestamptz,
  cover_image text,
  tags text[] not null default '{}',
  views integer not null default 0,
  likes integer not null default 0,
  content_en jsonb not null default '{}'::jsonb,
  content_pt jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_blog_posts_status_idx
  on public.portfolio_blog_posts (status);
create index if not exists portfolio_blog_posts_published_at_idx
  on public.portfolio_blog_posts (published_at desc nulls last);

alter table public.portfolio_site_settings enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.portfolio_blog_posts enable row level security;

drop policy if exists "Public read site settings" on public.portfolio_site_settings;
create policy "Public read site settings"
  on public.portfolio_site_settings for select using (true);

drop policy if exists "Anon write site settings" on public.portfolio_site_settings;
create policy "Anon write site settings"
  on public.portfolio_site_settings for all using (true) with check (true);

drop policy if exists "Public read projects" on public.portfolio_projects;
create policy "Public read projects"
  on public.portfolio_projects for select using (true);

drop policy if exists "Anon write projects" on public.portfolio_projects;
create policy "Anon write projects"
  on public.portfolio_projects for all using (true) with check (true);

drop policy if exists "Public read published blog posts" on public.portfolio_blog_posts;
create policy "Public read published blog posts"
  on public.portfolio_blog_posts for select using (status = 'published');

drop policy if exists "Anon write blog posts" on public.portfolio_blog_posts;
create policy "Anon write blog posts"
  on public.portfolio_blog_posts for all using (true) with check (true);

-- Atomic engagement helpers (avoid last-write-wins wiping counters)
create or replace function public.increment_blog_post_views(post_id uuid)
returns integer
language sql
security definer
set search_path = public
as $$
  update public.portfolio_blog_posts
  set views = views + 1, updated_at = now()
  where id = post_id
  returning views;
$$;

create or replace function public.adjust_blog_post_likes(post_id uuid, delta integer)
returns integer
language sql
security definer
set search_path = public
as $$
  update public.portfolio_blog_posts
  set likes = greatest(0, likes + delta), updated_at = now()
  where id = post_id
  returning likes;
$$;

grant execute on function public.increment_blog_post_views(uuid) to anon, authenticated;
grant execute on function public.adjust_blog_post_likes(uuid, integer) to anon, authenticated;
