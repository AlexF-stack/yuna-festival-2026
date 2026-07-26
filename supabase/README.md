# Supabase — YUNA Festival 2026

## Table `artists`

| Colonne | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `name` | text | Unique |
| `role` | text | Tag affiché (ex. Adoration) |
| `is_headliner` | boolean | **Un seul `true` : Derek Jones** |
| `order` | integer | Affichage croissant (colonne SQL `"order"`) |
| `bio_short` | text | Accroche courte |

## Table `schedule`

| Colonne | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `day` | smallint | `1` = sam. 5, `2` = dim. 6 |
| `time` | text | Ex. `18:00 – 18:15` |
| `title` | text | Titre du créneau |
| `description` | text | Détail optionnel |
| `order` | integer | Ordre dans le jour |

Seed : `seed_schedule.sql` (source content-yuna-2026.md).

## Table `registrations`

| Colonne | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK — valeur encodée dans le QR |
| `name` | text | Nom complet |
| `phone` | text | Unique (anti-doublon) |
| `email` | text | Optionnel |
| `created_at` | timestamptz | Défaut `now()` |
| `qr_code` | text | Data URL PNG généré serveur (`qrcode`) |

RLS activé, **aucune policy anon** : écriture/lecture via `SUPABASE_SERVICE_ROLE_KEY` dans les routes Next.js.

## Table `products`

| Colonne | Type | Notes |
| --- | --- | --- |
| `id` | uuid | PK |
| `name` | text | Nom produit |
| `slug` | text | Unique |
| `description` | text | Accroche |
| `price_fcfa` | integer | Prix « à partir de » |
| `tag_label` | text | Badge (ex. ● Toujours allumé) |
| `tag_variant` | text | `led` \| `sound` \| `pro` |
| `is_featured` | boolean | Carte mise en avant |
| `flag_label` | text | Ex. ★ Le plus populaire |
| `visual_key` | text | `basic` \| `sound` \| `programmable` |
| `order` | integer | Affichage |

Seed : `seed_products.sql`.

## Appliquer migration + seed

Dans le SQL Editor du projet Supabase (ou CLI) :

1. Exécuter les 4 fichiers `migrations/*.sql` (artists → schedule → registrations → products)
2. Exécuter `seed_all.sql` (artistes + programme + boutique en une fois)

Seeds séparés équivalents : `seed.sql`, `seed_schedule.sql`, `seed_products.sql`.

## Env

Renseigner `.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
