export type NavItem = { href: string; label: string };

export type Messages = {
  skipToContent: string;
  langName: string;
  langSwitch: string;
  common: {
    register: string;
    registerCta: string;
    myPass: string;
    recoverPass: string;
    freeEntry: string;
    sitePublic: string;
    backHome: string;
  };
  nav: NavItem[];
  footerNav: NavItem[];
  footer: {
    festival: string;
    contact: string;
    organization: string;
    tagline: string;
    dove: string;
    verseLine: string;
    openNote: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    support: string;
    verse: string;
    verseRef: string;
    ctaPrimary: string;
    ctaSecondary: string;
    meta: string;
    datesHero: string;
    venueLine: string;
  };
  stats: { value: string; label: string }[];
  explore: {
    eyebrow: string;
    title: string;
    description: string;
    cards: {
      href: string;
      title: string;
      description: string;
      imageAlt: string;
    }[];
  };
  saveTheDate: {
    eyebrow: string;
    title: string;
    support: string;
    venue: string;
  };
  register: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    consent: string;
    privacy: string;
    submit: string;
    already: string;
    recoverLink: string;
    previewLabel: string;
    previewHint: string;
  };
  registerTypes: Record<
    string,
    { label: string; hint: string }
  >;
  floatCta: string;
  floatAria: string;
  lineup: {
    eyebrow: string;
    title: string;
    description: string;
    teaser: string;
    coming: string;
    mysteryEyebrow: string;
    mysteryTitle: string;
    mysteryBody: string;
  };
  pages: {
    artistes: { eyebrow: string; title: string; lead: string };
    vision: { eyebrow: string; title: string; lead: string };
    journee: { eyebrow: string; title: string; lead: string };
    lieu: { eyebrow: string; title: string; lead: string };
    boutique: { eyebrow: string; title: string; lead: string };
    don: { eyebrow: string; title: string; lead: string };
    faq: { eyebrow: string; title: string; lead: string };
    monPass: {
      eyebrow: string;
      title: string;
      lead: string;
      notYet: string;
    };
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    label: string;
  };
};
