---
name: yuna-design-system
description: "Design system, tokens de couleur, typographie et conventions UI pour le site YUNA Festival 2026 (Bénin Debout). À consulter systématiquement pour toute tâche visuelle sur ce projet : hero, navigation, cartes artistes, timeline de programme, formulaire d'inscription, pass QR, grille de sponsoring, FAQ, footer, animations au scroll. Empêche l'agent d'improviser des couleurs/polices différentes ou d'inventer du contenu (dates, artistes, prix) qui n'existe pas — utiliser toujours references/content-yuna-2026.md comme source de vérité pour le texte."
---

# Design system — YUNA Festival 2026 "Bénin Debout"

## Avant de commencer
Toujours lire `references/content-yuna-2026.md` avant d'écrire du texte, une date, un nom d'artiste
ou un montant sur ce projet. Ne jamais inventer un artiste, une heure de passage, ou un tarif de
sponsoring qui n'y figure pas. Si une information manque (ex: lien vidéo, logo sponsor), utiliser un
placeholder explicite plutôt qu'une fausse valeur, et signaler à l'utilisateur qu'il faut la fournir.

## Identité visuelle

**Palette active du site** : tokens dans `DESIGN.md` / `app/globals.css` —
`--bleu` `#0077BB` (ancrage), CTA or `--jaune` `#FCD116` sur `--nuit-profonde`
`#0A0E14`, accents drapeau `--vert` `#008751` / `--rouge` `#E8112D`, fond clair
`--papier` `#FFF8F1`. Le `--feu` orange reste un accent flamme logo, pas les CTA.

Palette historique "crépuscule → nuit de festival" (draft) :

```css
:root {
  --nuit: #0A0817;      /* fond principal */
  --nuit2: #151129;     /* fond secondaire / sections alternées */
  --aube: #F7B733;      /* accent doré — CTA secondaires, highlights */
  --feu: #FF5A1F;       /* accent principal — CTA primaires, urgence */
  --braise: #C22F08;    /* hover des CTA primaires */
  --ivoire: #FBF6EC;    /* texte principal sur fond sombre */
  --vert: #008751; --jaune: #FCD116; --rouge: #E8112D; /* tricolore Bénin, usage discret (liseré, footer) */
}
```

Typographie (source de vérité : `DESIGN.md`) :
- **Display** (titres, hero) : `Baloo 2` 700/800 — `font-display`.
- **Corps** : `Space Grotesk` 400/500/700 — `font-sans`.
- **Technique** (countdown, ID pass) : `JetBrains Mono` 700 — `font-mono`.

Grands titres : alterner `tone` bleu / feu / encre via `SectionHeading` ; option `accentLast`.

Ne pas remplacer ces trois polices par des choix génériques (Poppins, Montserrat, Roboto) — elles
font partie de l'identité déjà validée avec le contenu réel du festival.

## Principes de motion

- Fade-in au scroll (translateY + opacity) sur l'apparition des sections — sobre, jamais plus de
  700-900ms, easing `cubic-bezier(.2,.8,.2,1)`.
- **Toujours** respecter `prefers-reduced-motion: reduce` — désactiver toutes les animations dans ce cas.
- Le countdown et les compteurs animés (stats) sont les seuls éléments à animation continue/répétée ;
  le reste du motion est déclenché par le scroll, pas gratuit.
- Un hero avec lueur/pulse en fond est acceptable (déjà dans le draft), mais rester sur des halos
  discrets — ne pas ajouter de particules 3D lourdes qui pénaliseraient les connexions 3G/4G (voir
  exigence non fonctionnelle F-Performance du cahier des charges : chargement < 3s).

## Patterns de composants attendus

- **Nav** : sticky, fond semi-transparent + blur, se masque au scroll vers le bas. Liseré tricolore
  béninois fin (3 bandes égales) en haut de page.
- **Hero** : eyebrow ("Youth United for New Awakening") → titre display sur 2 lignes avec le mot clé
  en dégradé doré→feu → verset en italique + référence → sous-titre → countdown vers le 5 septembre
  2026 18h → CTA principal ("Réserver mon pass gratuit") + CTA secondaire ("Voir le programme").
- **Marquee défilant** : noms des artistes en boucle, fond doré, légère rotation (-1 à -2deg) pour
  casser la rigidité.
- **Cartes "vision"** (Joseph / Daniel / David) : bordure fine dorée semi-transparente, liseré
  inférieur qui s'anime au hover.
- **Grille artistes** : distinguer visuellement la tête d'affiche (Joe Mettle) des autres — badge
  "★ Tête d'affiche internationale".
- **Timeline de programme** : onglets par jour (samedi / dimanche), lignes horaire + contenu, mise en
  avant visuelle des temps forts (adoration 1h, parole prophétique) sans surcharger.
- **Formulaire d'inscription + pass QR** : disposition en deux colonnes (formulaire à gauche, aperçu
  du pass à droite qui se remplit en direct). Le pass affiche nom, catégorie choisie, ID unique,
  mention "Entrée LIBRE", référence au verset. Important : dans la vraie implémentation (voir skill
  `yuna-backend`), le QR n'est généré et validé que côté serveur — l'aperçu visuel côté client peut
  rester, mais il ne doit jamais être le seul mécanisme de génération.
- **Grille de sponsoring** : 3 paliers (Bronze/Argent/Or), le palier Or visuellement mis en avant
  (plus grand, bordure dorée pleine, badge "★ Partenaire officiel").
- **FAQ** : accordéon natif (`<details>/<summary>`), pas de librairie JS superflue.

## Responsive

- Breakpoints : mobile-first, bascule grille → colonne unique sous 880px (nav, vision, artistes),
  sous 540px pour les grilles à 4 colonnes (line-up).
  Priorité mobile : la majorité du public accède depuis un smartphone en 3G/4G à Cotonou — tester le
  rendu sans images lourdes non compressées.

## Accessibilité

- `:focus-visible` toujours stylé (ne jamais faire `outline:none` sans remplacement).
- Contraste texte/fond suffisant même dans les zones à accent doré sur nuit foncée — vérifier avant
  de livrer une section.

## Hors périmètre (ne pas construire sans validation explicite)

Les fonctionnalités suivantes existaient dans un draft précédent mais sont **hors périmètre de base**
(voir Annexe A du cahier des charges) : filtre photo caméra, reconnaissance d'affiche en réalité
augmentée (MindAR), visionneuse 3D de l'emblème. Ne pas les implémenter tant que l'utilisateur ne l'a
pas explicitement demandé pour cette session de travail.
