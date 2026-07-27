-- =============================================================================
-- Seed complet YUNA Festival 2026
-- Line-up : is_revealed = false pour tous (y compris headliner)
-- =============================================================================

begin;

truncate table public.schedule cascade;
truncate table public.artists cascade;
truncate table public.products cascade;

insert into public.artists (name, role, is_headliner, is_revealed, "order", bio_short) values
  ('Derek Jones', 'Adoration · Côte d''Ivoire', true, false, 1, 'Tête d''affiche — adoration avec la VTeam.'),
  ('Simiane Brahi Tatu', 'Adoration', false, false, 2, 'Temps fort d''adoration.'),
  ('David Okit', 'Artiste · RDC / Belgique', false, false, 3, 'Louange et présence scénique.'),
  ('Serviteur Pierre', 'Artiste · France', false, false, 4, 'Ministère de louange.'),
  ('Exo Éclats', 'Groupe · International', false, false, 5, 'Énergie live et adoration collective.');

-- Titres = type de moment. artist_id pour le line-up officiel.
insert into public.schedule (day, time, title, description, "order", artist_id) values
  (1, '18:00 – 18:15', 'Ouverture officielle & prière', null, 1, null),
  (1, '18:15 – 18:45', 'Valère Kouton', null, 2, null),
  (1, '18:45 – 19:15', 'NISTa Praise', null, 3, null),
  (1, '19:15 – 19:40', 'Louange', null, 4, (select id from public.artists where name = 'Serviteur Pierre')),
  (1, '19:40 – 20:05', 'Louange', null, 5, (select id from public.artists where name = 'David Okit')),
  (1, '20:05 – 20:50', 'Message prophétique', '45 min', 6, null),
  (1, '20:50 – 21:50', 'Temps d''adoration', 'Temps fort', 7, (select id from public.artists where name = 'Simiane Brahi Tatu')),
  (1, '21:50 – 22:35', 'Louange', null, 8, (select id from public.artists where name = 'Exo Éclats')),
  (1, '22:35 – 23:00', 'Clôture & annonces du dimanche', null, 9, null),
  (2, '18:00 – 18:10', 'Ouverture & prière', null, 1, null),
  (2, '18:10 – 18:30', 'David Track', null, 2, null),
  (2, '18:30 – 18:50', 'Minister Glory', null, 3, null),
  (2, '18:50 – 19:20', 'Prophète Dr Hervé Mama — Exhortation', '30 min', 4, null),
  (2, '19:20 – 20:20', 'Temps d''adoration', 'Tête d''affiche', 5, (select id from public.artists where name = 'Derek Jones')),
  (2, '20:20 – 21:20', 'Parole — Joël Francis Tatu', '1h', 6, null),
  (2, '21:20 – 22:20', 'Joe Mettle', '★ Tête d''affiche internationale · 1h', 7, null),
  (2, '22:20 – 22:30', 'Clôture & envoi', null, 8, null);

insert into public.products (
  name, slug, description, price_fcfa, tag_label, tag_variant,
  is_featured, flag_label, visual_key, "order"
) values
  ('Basique LED', 'basique-led', 'Flamme lumineuse toujours allumée. L''effet de foule garanti.', 5000, '● Toujours allumé', 'led', false, null, 'basic', 1),
  ('Sonore réactif', 'sonore-reactif', 'La flamme et la colombe pulsent au rythme de la musique. Rechargeable USB.', 10000, '♪ Réagit au son', 'sound', true, '★ Le plus populaire', 'sound', 2),
  ('Programmable', 'programmable', 'Matrice LED pilotée par appli Bluetooth. Motifs et texte défilant.', 25000, '✦ Piloté par appli', 'pro', false, null, 'programmable', 3);

commit;
