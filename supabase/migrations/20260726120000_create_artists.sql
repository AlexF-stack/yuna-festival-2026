-- artists : line-up public YUNA Festival 2026
-- Colonne "order" réservée SQL → toujours quotée.

create extension if not exists "pgcrypto";

create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  is_headliner boolean not null default false,
  "order" integer not null,
  bio_short text,
  created_at timestamptz not null default now(),
  constraint artists_order_positive check ("order" >= 0)
);

comment on table public.artists is 'Line-up YUNA Festival — données dynamiques pour la section Artistes.';
comment on column public.artists."order" is 'Ordre d''affichage croissant (1 = premier).';
comment on column public.artists.is_headliner is 'Tête d''affiche — une seule ligne à true (Derek Jones).';

create unique index if not exists artists_name_key on public.artists (name);
create unique index if not exists artists_one_headliner
  on public.artists (is_headliner)
  where is_headliner = true;
create index if not exists artists_order_idx on public.artists ("order");

alter table public.artists enable row level security;

-- Lecture publique (site vitrine)
create policy "artists_public_read"
  on public.artists
  for select
  to anon, authenticated
  using (true);
