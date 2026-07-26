-- Seed programme — source : content-yuna-2026.md
-- Jour 1 = samedi 5 sept · Jour 2 = dimanche 6 sept

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
