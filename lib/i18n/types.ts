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
  registerExtras: {
    addGuest: string;
    removeGuest: string;
    guestLabel: string;
    guestName: string;
    guestPhone: string;
    guestsHint: string;
    maxGuests: string;
    submitMulti: string;
  };
  sessions: {
    eyebrow: string;
    title: string;
    lead: string;
    register: string;
    capacity: string;
    free: string;
    speakers: string;
  };
  mouvement: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  whatsapp: {
    label: string;
    aria: string;
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
    busQuestion: string;
    busHint: string;
    busYes: string;
    busNo: string;
    busLocation: string;
    busLocationPh: string;
    busRequired: string;
    busLocationRequired: string;
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
    mouvement: {
      eyebrow: string;
      title: string;
      lead: string;
    };
  };
  confirmation: {
    eyebrow: string;
    title: string;
    leadMessaging: string;
    leadSave: string;
    groupTitle: string;
    groupBody: string;
    passN: string;
    lostLink: string;
    recover: string;
    channelCta: string;
    channelRedirect: string;
    channelCountdown: string;
  };
  passActions: {
    confirmed: string;
    messageSent: string;
    savePass: string;
    downloadPng: string;
    share: string;
    linkCopied: string;
    shareTitle: string;
    shareText: string;
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    label: string;
  };
};
