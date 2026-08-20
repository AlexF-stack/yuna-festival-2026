-- Seed line-up YUNA 2026 — affiches officielles + artistes déjà au programme.
-- Tête d'affiche internationale (Joe Mettle) : à révéler séparément.

truncate table public.artists cascade;

insert into public.artists (name, role, is_headliner, is_revealed, "order", bio_short, portrait_url) values
  (
    'Valère Kouton',
    'Chantre · Bénin',
    false,
    true,
    10,
    'Louange et adoration. Moment fort pour les fils et filles du Royaume.',
    '/media/artists/valere-kouton.png'
  ),
  (
    'Simiane Tatu',
    'Chantre · Adoration',
    false,
    true,
    20,
    'Temps fort d''adoration. Louange et impactation divine.',
    '/media/artists/simiane-tatu.png'
  ),
  (
    'Dany Kasongo',
    'Chantre',
    false,
    true,
    30,
    'Louange, adoration et présence scénique pour la génération.',
    '/media/artists/dany-kasongo.png'
  ),
  (
    'Joe Mettle',
    'Tête d''affiche · Ghana',
    true,
    false,
    100,
    null,
    null
  );
