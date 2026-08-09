# Design system — YUNA Festival 2026 « Bénin Debout »

Source de vérité couleurs : **logo officiel** + drapeau béninois en accents.
Voir aussi `.cursor/skills/yuna-design-system` et `app/globals.css`.

Toute couleur / police dans un composant passe par ces tokens, jamais en dur.

## Palette (bleu ancré + tricolore)

| Token | Hex | Usage |
| --- | --- | --- |
| `bleu` | `#0077BB` | Ancrage — nav, liens, marque, structure |
| `bleu-fonce` | `#004E7A` | Fonds section sombres, dégradé hero |
| `jaune` / `or` | `#FCD116` | **CTA principaux**, highlights, countdown |
| `rouge` | `#E8112D` | Urgence, badges, accents eyebrow |
| `vert` | `#008751` | Succès, confirmation, « gratuit » / validé |
| `nuit-profonde` | `#0A0E14` | Fond sombre hero, encre CTA |
| `ivoire-froid` | `#F5F7FA` | Texte sur fond sombre |
| `gris-bleu` | `#8B99A8` | Texte secondaire |
| `papier` | `#FFF8F1` | Fond pages claires (chaleur festival) |
| `feu` | `#FF4D00` | Flamme logo — accents secondaires seulement |

### CTA principal

`#FCD116` (fond) + `#0A0E14` (texte) + ombre or — contraste fort sur photo
`crowd.webp` / hero. Ne plus utiliser l’orange `feu` pour « Réserve ton pass ».

### Hero sombre

Dégradé `nuit-profonde` → `bleu-fonce` → `nuit-profonde` (pas un bleu trop proche
du fond photo).

### Tricolore

Liseré nav `vert | jaune | rouge` (4px) + touches dans eyebrows / accents de
titre — jamais en fond plein plaqué.

## Typographie

| Rôle | Famille | Poids | Classes |
| --- | --- | --- | --- |
| Display | **Baloo 2** | 700 / 800 | `font-display` |
| Corps | **Space Grotesk** | 400 / 500 / 700 | `font-sans` |
| Technique | **JetBrains Mono** | 700 | `font-mono` |

### Tons des grands titres (`SectionHeading`)

Alterner `tone` : `bleu` · `feu` · `encre`. Accents : jaune / vert drapeau.

## Motion & accessibilité

- Fade-in scroll : max 700–900 ms, easing `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Toujours respecter `prefers-reduced-motion: reduce`.
- `:focus-visible` : outline `jaune` ou `bleu`, offset 3px.
- Mobile-first : valider à **375px**.
