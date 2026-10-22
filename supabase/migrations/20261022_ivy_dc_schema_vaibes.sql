-- Isolate Ivy DC portfolio CMS in schema ivy_dc (Vaibes project)
-- Leaves Vaibes public.portfolio* app tables untouched.

create schema if not exists ivy_dc;

alter table if exists public.portfolio_site_settings set schema ivy_dc;
alter table if exists public.portfolio_projects set schema ivy_dc;
alter table if exists public.portfolio_blog_posts set schema ivy_dc;

drop function if exists public.increment_blog_post_views(uuid);
drop function if exists public.adjust_blog_post_likes(uuid, integer);
drop function if exists ivy_dc.increment_blog_post_views(uuid);
drop function if exists ivy_dc.adjust_blog_post_likes(uuid, integer);

create or replace function ivy_dc.increment_blog_post_views(post_id uuid)
returns integer
language sql
security definer
set search_path = ivy_dc
as $$
  update ivy_dc.portfolio_blog_posts
  set views = views + 1, updated_at = now()
  where id = post_id
  returning views;
$$;

create or replace function ivy_dc.adjust_blog_post_likes(post_id uuid, delta integer)
returns integer
language sql
security definer
set search_path = ivy_dc
as $$
  update ivy_dc.portfolio_blog_posts
  set likes = greatest(0, likes + delta), updated_at = now()
  where id = post_id
  returning likes;
$$;

grant usage on schema ivy_dc to anon, authenticated, service_role;
grant all on all tables in schema ivy_dc to anon, authenticated, service_role;
grant all on all sequences in schema ivy_dc to anon, authenticated, service_role;
grant execute on function ivy_dc.increment_blog_post_views(uuid) to anon, authenticated, service_role;
grant execute on function ivy_dc.adjust_blog_post_likes(uuid, integer) to anon, authenticated, service_role;

alter default privileges in schema ivy_dc
  grant all on tables to anon, authenticated, service_role;
alter default privileges in schema ivy_dc
  grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema ivy_dc
  grant execute on functions to anon, authenticated, service_role;

notify pgrst, 'reload schema';
