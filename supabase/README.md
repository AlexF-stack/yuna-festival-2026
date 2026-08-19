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
| `registration_type` | text | `pass` / masterclass / `benevole` |
| `checked_in_at` | timestamptz | Premier scan entrée (nullable) |
| `checked_in_by` | text | Poste staff ayant scanné |

RLS activé, **aucune policy anon** : écriture/lecture via `SUPABASE_SERVICE_ROLE_KEY` dans les routes Next.js.

### Scan porte & CRM YUNA

- **Scan** : `/staff/scan` + `POST /api/check-in` (`x-yuna-staff` = `YUNA_STAFF_SECRET`).
- **CRM YUNA** : projet Supabase séparé (ex. `yuna-festival-crm`) — tables `inscriptions`, `scans`, etc. Voir `CRM-YUNA.md`.
- Sync : `YUNA_CRM_SUPABASE_URL` + `YUNA_CRM_SERVICE_ROLE_KEY`.
- Migration check-in site : `20260802120000_registration_check_in.sql`

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
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=https://festivalyuna.com
YUNA_STAFF_SECRET=...
CRM_WEBHOOK_URL=https://...
CRM_API_KEY=...
```
