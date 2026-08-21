export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  questionEn: string;
  answerEn: string;
};

/** FAQ — extrait HTML / content-yuna-2026 (contenu éditorial stable). */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "entree-gratuite",
    question: "L'entrée est-elle vraiment gratuite ?",
    answer:
      "Oui, 100 % gratuite les deux soirs. L'inscription en ligne avec pass QR accélère ton entrée mais n'est pas obligatoire pour les soirées. Elle est en revanche requise pour la masterclass (places limitées).",
    questionEn: "Is entry really free?",
    answerEn:
      "Yes, 100% free both evenings. Online QR registration speeds up entry but isn’t required for the concerts. It is required for the masterclass (limited seats).",
  },
  {
    id: "heure-arrivee",
    question: "À quelle heure faut-il arriver ?",
    answer:
      "Le site ouvre à 16h00 chaque soir (concerts dès 18h). Le créneau 15h–17h concerne uniquement la masterclass Entrepreneuriat du samedi. Ce n’est pas l’heure d’ouverture du festival.",
    questionEn: "What time should I arrive?",
    answerEn:
      "Gates open at 4:00 PM each evening (concerts from 6:00 PM). The 3–5 PM slot is only the Saturday Entrepreneurship masterclass, not festival opening time.",
  },
  {
    id: "masterclass",
    question: "Comment s'inscrire à la masterclass ou à l'École royale ?",
    answer:
      "Via le formulaire : coche Masterclass Entrepreneuriat et/ou École royale (tu peux aussi ajouter Concert / Festival). Chaque option a son pass QR. Présente le bon QR à l'entrée de la salle.",
    questionEn: "How do I register for the masterclass or Royal school?",
    answerEn:
      "Use the form: check Entrepreneurship masterclass and/or Royal school (you can also add Concert / Festival). Each option gets its own QR. Show the right QR at the room door.",
  },
  {
    id: "acces",
    question: "Comment venir au festival ?",
    answer:
      "Le site est accessible en zém, taxi et bus depuis tout Cotonou. Un plan d'accès détaillé sera publié ici avant le festival.",
    questionEn: "How do I get to the festival?",
    answerEn:
      "The site is reachable by zém, taxi and bus from across Cotonou. A detailed access map will be published here before the festival.",
  },
  {
    id: "pluie",
    question: "Et s'il pleut ?",
    answer:
      "Le festival est maintenu sauf conditions extrêmes. Suis nos réseaux sociaux et le canal WhatsApp le jour J pour toute mise à jour.",
    questionEn: "What if it rains?",
    answerEn:
      "The festival goes ahead except in extreme conditions. Follow our socials and WhatsApp channel on the day for updates.",
  },
  {
    id: "benevole",
    question: "Puis-je servir comme bénévole ou ambassadeur ?",
    answer:
      "Oui ! Inscris-toi via le formulaire en cochant « Bénévole / Ambassadeur ». Après ton pass QR, tu es redirigé vers le groupe WhatsApp de l'équipe.",
    questionEn: "Can I volunteer or be an ambassador?",
    answerEn:
      "Yes! Register via the form and check “Volunteer / Ambassador”. After your QR pass, you’re redirected to the team WhatsApp group.",
  },
  {
    id: "inscription-place",
    question: "Et si j'ai un souci à l'inscription en ligne ?",
    answer:
      "Pas d'inquiétude : ton inscription est enregistrée dès que tu vois ton pass QR. Tu reçois aussi le lien par e-mail. Tu pourras aussi t'inscrire sur place le jour J si besoin.",
    questionEn: "What if online registration fails?",
    answerEn:
      "No worries: you’re registered as soon as you see your QR pass. You also get the link by email. You can also register on site on the day if needed.",
  },
];
