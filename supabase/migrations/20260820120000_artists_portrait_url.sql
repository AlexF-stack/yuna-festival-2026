-- Affiches line-up (portraits officiels YUNA 2026)
alter table public.artists
  add column if not exists portrait_url text;

comment on column public.artists.portrait_url is
  'URL publique de l''affiche / portrait (ex. /media/artists/…).';
