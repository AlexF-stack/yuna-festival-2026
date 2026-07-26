-- Seed line-up YUNA 2026 (HTML / meta actuels)
-- Headliner : Derek Jones (tête d'affiche · Côte d'Ivoire / VTeam)

truncate table public.artists cascade;

insert into public.artists (name, role, is_headliner, "order", bio_short) values
  (
    'Derek Jones',
    'Adoration · Côte d''Ivoire',
    true,
    1,
    'Tête d''affiche — adoration avec la VTeam.'
  ),
  (
    'Simiane Brahi Tatu',
    'Adoration',
    false,
    2,
    'Temps fort d''adoration.'
  ),
  (
    'David Okit',
    'Artiste · RDC / Belgique',
    false,
    3,
    'Louange et présence scénique.'
  ),
  (
    'Serviteur Pierre',
    'Artiste · France',
    false,
    4,
    'Ministère de louange.'
  ),
  (
    'Exo Éclats',
    'Groupe · International',
    false,
    5,
    'Énergie live et adoration collective.'
  );
