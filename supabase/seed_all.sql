-- =============================================================================
-- Seed complet YUNA Festival 2026
-- Sources : content-yuna-2026.md + yuna-festival-2026.html (draft client)
-- À exécuter après les migrations artists / schedule / products.
-- =============================================================================

begin;

-- ---------------------------------------------------------------------------
-- Line-up (5 artistes — headliner : Derek Jones)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Programme minute par minute (HTML / content-yuna-2026)
-- Jour 1 = samedi 5 sept · Jour 2 = dimanche 6 sept
-- ---------------------------------------------------------------------------
truncate table public.schedule cascade;

insert into public.schedule (day, time, title, description, "order") values
  -- Jour 1 — Samedi 5 septembre (18h–23h)
  (1, '18:00 – 18:15', 'Ouverture officielle & prière', null, 1),
  (1, '18:15 – 18:45', 'Valère Kouton', null, 2),
  (1, '18:45 – 19:15', 'NISTa Praise', null, 3),
  (1, '19:15 – 19:40', 'Serviteur Pierre', null, 4),
  (1, '19:40 – 20:05', 'David Okit', null, 5),
  (1, '20:05 – 20:50', 'Parole — Prophète Johnny Doefia', 'Message prophétique · 45 min', 6),
  (1, '20:50 – 21:50', 'Simiane Brahi Tatu — Adoration', 'Temps fort · 1h', 7),
  (1, '21:50 – 22:35', 'Exo Éclats', null, 8),
  (1, '22:35 – 23:00', 'Clôture & annonces du dimanche', null, 9),

  -- Jour 2 — Dimanche 6 septembre (18h–22h30)
  (2, '18:00 – 18:10', 'Ouverture & prière', null, 1),
  (2, '18:10 – 18:30', 'David Track', null, 2),
  (2, '18:30 – 18:50', 'Minister Glory', null, 3),
  (2, '18:50 – 19:20', 'Prophète Dr Hervé Mama — Exhortation', '30 min', 4),
  (2, '19:20 – 20:20', 'Derek Jones — Adoration', 'Tête d''affiche · 1h', 5),
  (2, '20:20 – 21:20', 'Parole — Joël Francis Tatu', '1h', 6),
  (2, '21:20 – 22:20', 'Joe Mettle', '★ Tête d''affiche internationale · 1h', 7),
  (2, '22:20 – 22:30', 'Clôture & envoi', null, 8);

-- ---------------------------------------------------------------------------
-- Boutique tee-shirts LED (HTML #boutique / .tee-grid)
-- ---------------------------------------------------------------------------
truncate table public.products cascade;

insert into public.products (
  name, slug, description, price_fcfa, tag_label, tag_variant,
  is_featured, flag_label, visual_key, "order"
) values
  (
    'Basique LED',
    'basique-led',
    'Flamme lumineuse toujours allumée. L''effet de foule garanti.',
    5000,
    '● Toujours allumé',
    'led',
    false,
    null,
    'basic',
    1
  ),
  (
    'Sonore réactif',
    'sonore-reactif',
    'La flamme et la colombe pulsent au rythme de la musique. Rechargeable USB.',
    10000,
    '♪ Réagit au son',
    'sound',
    true,
    '★ Le plus populaire',
    'sound',
    2
  ),
  (
    'Programmable',
    'programmable',
    'Matrice LED pilotée par appli Bluetooth. Motifs et texte défilant.',
    25000,
    '✦ Piloté par appli',
    'pro',
    false,
    null,
    'programmable',
    3
  );

commit;
