-- Seed boutique — HTML yuna-festival-2026 (tee-grid)

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
