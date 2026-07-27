export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** FAQ — extrait HTML / content-yuna-2026 (contenu éditorial stable). */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "entree-gratuite",
    question: "L'entrée est-elle vraiment gratuite ?",
    answer:
      "Oui, 100 % gratuite les deux soirs. L'inscription en ligne avec pass QR accélère ton entrée mais n'est pas obligatoire pour les soirées. Elle est en revanche requise pour les masterclass (places limitées).",
  },
  {
    id: "heure-arrivee",
    question: "À quelle heure faut-il arriver ?",
    answer:
      "Le site ouvre à 17h00. Les premières places devant la scène partent vite — viens tôt pour les temps forts du samedi et du dimanche.",
  },
  {
    id: "masterclass",
    question: "Comment s'inscrire aux masterclass ?",
    answer:
      "Via le formulaire d'inscription sur ce site : Masterclass VTeam (musiciens et chantres, samedi 10h–13h) ou Masterclass Entrepreneuriat (samedi 15h–17h). Présente ton pass QR à l'entrée de la salle.",
  },
  {
    id: "action-medicale",
    question: "L'action médicale du samedi matin, c'est pour qui ?",
    answer:
      "Ouverte à tous, gratuite : consultations, dépistages et assistance, de 8h à 13h au Terrain de Midombo. Aucune inscription requise.",
  },
  {
    id: "acces",
    question: "Comment accéder au Terrain de Midombo ?",
    answer:
      "Le site est accessible en zém, taxi et bus depuis tout Cotonou. Un plan d'accès détaillé sera publié ici avant le festival.",
  },
  {
    id: "pluie",
    question: "Et s'il pleut ?",
    answer:
      "Le festival est maintenu sauf conditions extrêmes. Suis nos réseaux sociaux et le canal WhatsApp le jour J pour toute mise à jour.",
  },
  {
    id: "benevole",
    question: "Puis-je servir comme bénévole ?",
    answer:
      "Oui ! Inscris-toi via le formulaire en choisissant « Bénévole » : accueil, sécurité, technique, protocole, action médicale. L'équipe te recontactera sur WhatsApp.",
  },
  {
    id: "inscription-place",
    question: "Et si j'ai un souci à l'inscription en ligne ?",
    answer:
      "Pas d'inquiétude : même sans mail de confirmation, ton inscription est enregistrée dès que tu vois ton pass QR. Tu pourras aussi t'inscrire sur place le jour J si besoin.",
  },
];
