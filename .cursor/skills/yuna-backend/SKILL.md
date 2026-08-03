---
name: yuna-backend
description: "Architecture backend, schéma de base de données et règles de concurrence pour le système d'inscription du YUNA Festival 2026. À consulter systématiquement pour toute tâche touchant : le formulaire d'inscription, la génération/validation du QR code, l'envoi d'e-mail ou WhatsApp, le back-office administrateur, ou le module de campagne de masse vers les 9000 contacts. Empêche l'agent de recréer un système fragile (vérification de doublon non atomique, envoi synchrone bloquant, QR généré côté client sans trace serveur) — s'appuyer sur references/schema.sql comme schéma de référence."
---

# Backend — Système d'inscription YUNA Festival 2026

## Principe non négociable
Le formulaire d'inscription doit répondre vite et ne jamais bloquer sur l'envoi d'e-mail/WhatsApp.
**Toujours découpler** : la requête HTTP d'inscription se contente d'insérer en base et de répondre
"reçu" ; la génération du QR et l'envoi partent en tâche asynchrone (voir `registration_jobs` dans
`references/schema.sql`). Ne jamais faire l'envoi d'e-mail/WhatsApp de façon synchrone dans la même
requête que l'inscription — c'est exactement ce qui casse sous charge (voir cahier des charges, F27).

## Stack de référence
- Frontend/API : Next.js 15 (App Router, Route Handlers ou Server Actions)
- Base de données : PostgreSQL via Supabase
- Envoi e-mail : Resend
- Envoi WhatsApp : API WhatsApp Business (Meta Cloud API), via Brevo ou 360dialog en couche
  d'abstraction — ne pas appeler l'API Meta brute sans passer par une lib/plateforme de gestion des
  templates.
- Hébergement : Vercel

## Anti-doublon et concurrence

- **Ne jamais** faire "SELECT puis INSERT si pas trouvé" pour vérifier un doublon — c'est une race
  condition classique sous charge. Utiliser une **contrainte unique en base** (`uniq_registration_person`
  dans le schéma de référence) et laisser Postgres rejeter le doublon ; attraper l'erreur de contrainte
  côté application et renvoyer un message clair ("Tu es déjà inscrit à cette catégorie").
- **Idempotency key** : le formulaire génère un identifiant côté client au chargement de la page
  (`crypto.randomUUID()`), l'envoie avec la requête. Si la même clé arrive deux fois (double clic,
  retry réseau), renvoyer la même réponse sans recréer d'inscription — colonne `idempotency_key`
  unique dans le schéma.
- Le nombre de places est **illimité** (entrée libre confirmée par le client) — pas besoin de
  compteur atomique de capacité pour cette édition.

## QR code

- Le token QR (`qr_token`) est une valeur opaque générée serveur (UUID ou équivalent), **jamais** les
  données personnelles de l'inscrit. Le QR encode ce token, pas le nom/téléphone.
- Vérification à l'entrée : un endpoint (`/api/checkin?token=...`) qui vérifie le statut
  (`valid` / `used` / `revoked`), marque `checked_in_at` au premier scan, et refuse un second scan du
  même token.
- Ne jamais faire confiance à un QR généré uniquement côté client (`qrcode.js` dans le navigateur sans
  passage serveur) — vu dans un ancien draft du client, ce n'est pas un vrai système de billetterie,
  juste une image, aucune trace en base.

## Envoi e-mail et WhatsApp

- Traiter les jobs `registration_jobs` par un worker/cron (ex. route API appelée par un cron Vercel,
  ou une edge function Supabase) qui prend les jobs `queued`, tente l'envoi, marque `done` ou `failed`
  avec incrémentation de `attempts` et `last_error`.
- Respecter les catégories de templates Meta : un envoi transactionnel (confirmation + QR) peut
  utiliser un template "utility" ; toute relance/annonce vers la base des 9000 contacts doit utiliser
  un template "marketing" pré-approuvé.
- Pour la campagne de masse (`campaigns` / `campaign_sends`) : envoyer par lots (batching), avec un
  délai entre lots pour respecter les limites du fournisseur et éviter un signalement spam. Ne jamais
  déclencher 9000 envois synchrones dans une seule requête/fonction serverless (timeout garanti).

## Back-office administrateur

- Authentification : la plus simple option sûre pour ce budget est Supabase Auth (magic link ou
  email+mot de passe) restreinte à la table `admins` — éviter de construire un système d'auth maison.
- Le back-office doit permettre : liste + recherche + filtres sur `registrations`, export CSV, statut
  d'envoi par canal (`email_status`, `whatsapp_status`), et déclenchement d'un renvoi manuel (recrée un
  job dans `registration_jobs`).

## Variables d'environnement attendues
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
WHATSAPP_PROVIDER_API_KEY=       # Brevo ou 360dialog
WHATSAPP_TEMPLATE_CONFIRMATION=  # nom du template approuvé Meta
```

## Hors périmètre
Pas de gestion de paiement/Mobile Money, pas de jauge de capacité limitée (entrée libre), pas
d'application de scan dédiée (seul l'endpoint de vérification est prévu — voir cahier des charges
section 3.2).
