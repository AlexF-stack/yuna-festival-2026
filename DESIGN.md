# Design system — YUNA Festival 2026 « Bénin Debout »

Source de vérité : **logo officiel** (`public/brand/yuna-logo.png`).
Toute couleur / police dans un composant passe par ces tokens, jamais en dur.

## Palette (extraite du logo)

| Token | Hex | Usage |
| --- | --- | --- |
| `bleu` | `#0077BB` | Marque principale — figure, « festival », titres, liens |
| `bleu-fonce` | `#005A8C` | Hover / sections fortes |
| `feu` | `#FF6600` | Accent flamme / « YUNA » — CTA primaires |
| `braise` | `#E55A00` | Hover CTA |
| `charbon` | `#444444` | Texte secondaire, torch |
| `encre` | `#1A1A1A` | Texte principal |
| `papier` | `#FFFFFF` | Fond principal |
| `nuage` | `#F3F8FC` | Fond sections alternées |
| `ciel` | `#E8F4FB` | Dégradés hero / highlights |
| `vert` | `#008751` | Tricolore Bénin (liseré) |
| `jaune` | `#FCD116` | Tricolore Bénin (liseré) |
| `rouge` | `#E8112D` | Tricolore Bénin (liseré) |

Le tricolore reste un liseré discret (nav, footer), jamais palette dominante.

## Typographie

| Rôle | Famille | Poids | Classes |
| --- | --- | --- | --- |
| Display (YUNA, titres) | **Baloo 2** | 700 / 800 | `font-display` |
| Corps | **Space Grotesk** | 400 / 500 / 700 | `font-sans` |
| Technique | **JetBrains Mono** | 700 | `font-mono` |

## Direction visuelle

Sites de référence (Bénin) : **FINAB**, festivals culturels institutionnels —
fonds clairs, marque forte, beaucoup d’air, CTA orange, accent bleu.

## Motion & accessibilité

- Fade-in scroll : max 700–900 ms, easing `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Toujours respecter `prefers-reduced-motion: reduce`.
- `:focus-visible` : outline `bleu`, offset 3px.
- Mobile-first : valider à **375px**.
