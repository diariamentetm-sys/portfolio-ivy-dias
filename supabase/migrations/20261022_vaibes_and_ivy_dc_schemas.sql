-- Shared Supabase project (Vaibes) — dual schema layout
--
--   schema vaibes  → agency website CMS
--   schema ivy_dc  → Ivy DC portfolio CMS
--
-- public keeps thin compatibility views for the Vaibes app until it
-- points its client at db.schema = 'vaibes'.

create schema if not exists vaibes;
create schema if not exists ivy_dc;

-- Agency tables live in vaibes (moved from public in production migration).
-- Ivy CMS tables live in ivy_dc (see 20261022_ivy_dc_schema_vaibes.sql).

grant usage on schema vaibes to anon, authenticated, service_role;
grant usage on schema ivy_dc to anon, authenticated, service_role;

-- Dashboard reminder: Settings → API → Exposed schemas must include:
--   public, storage, graphql_public, vaibes, ivy_dc
