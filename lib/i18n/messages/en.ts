import type { Messages } from "@/lib/i18n/types";

export const en: Messages = {
  skipToContent: "Skip to content",
  langName: "English",
  langSwitch: "Language",
  common: {
    register: "Get your pass",
    registerCta: "It’s free — I’m in",
    myPass: "My pass",
    recoverPass: "Lost your pass? Recover it",
    freeEntry: "Free entry",
    sitePublic: "Public site",
    backHome: "← Back to site",
  },
  nav: [
    { href: "/mouvement", label: "Movement" },
    { href: "/artistes", label: "Line-up" },
    { href: "/journee", label: "Daytime" },
    { href: "/boutique", label: "Shop" },
    { href: "/soutenir", label: "Support" },
  ],
  footerNav: [
    { href: "/mouvement", label: "Movement" },
    { href: "/vision", label: "Vision" },
    { href: "/artistes", label: "Artists" },
    { href: "/journee", label: "Daytime" },
    { href: "/#lieu", label: "Venue" },
    { href: "/mon-pass", label: "Recover my pass" },
    { href: "/soutenir", label: "Support" },
    { href: "/faq", label: "FAQ" },
    { href: "/confidentialite", label: "Privacy" },
    { href: "/mentions-legales", label: "Legal notice" },
  ],
  footer: {
    festival: "Festival",
    contact: "Contact",
    organization: "Organization",
    tagline: "Youth United for New Awakening",
    dove: "יוֹנָה · The Dove — the Spirit on a generation",
    verseLine:
      "An extraordinary generation rises. Isaiah 60:1 · 5–6 September 2026",
    openNote: "Free entry · Gates open 5:00 PM",
  },
  hero: {
    eyebrow: "Youth United for New Awakening · יוֹנָה",
    titleLine1: "BÉNIN",
    titleLine2: "DEBOUT",
    support:
      "An extraordinary generation rises — Joseph. Daniel. David. Now it’s your turn.",
    verse:
      "“Arise, shine, for your light has come, and the glory of the Lord rises upon you.”",
    verseRef: "Isaiah 60:1",
    ctaPrimary: "It’s free — I’m taking my spot",
    ctaSecondary: "See the weekend programme",
    meta: "5–6 September 2026 · Midombo Grounds, Cotonou",
    datesHero: "5–6 SEP · 2026",
    venueLine: "Midombo Grounds, Cotonou — Free entry",
  },
  registerExtras: {
    addGuest: "+ Add a pass for someone else",
    removeGuest: "Remove",
    guestLabel: "Pass #{n}",
    guestName: "Full name *",
    guestPhone: "Phone (WhatsApp) *",
    guestsHint:
      "Book up to 5 passes at once (you + friends/family). Each person gets their own QR — save the confirmation links (no email is sent yet).",
    maxGuests: "Maximum 5 passes per registration.",
    submitMulti: "Get the QR passes",
  },
  sessions: {
    eyebrow: "Saturday sessions",
    title: "Workshops & actions",
    lead: "Medical outreach, VTeam and Entrepreneurship masterclasses — free registration, limited seats for masterclasses.",
    register: "Register →",
    capacity: "Up to {n} seats",
    free: "Free",
    speakers: "Speakers",
  },
  mouvement: {
    eyebrow: "The movement",
    title: "More than a festival",
    lead: "YUNA is a movement: living faith, excellence, and impact on the ground in Midombo.",
  },
  whatsapp: {
    label: "WhatsApp",
    aria: "Message YUNA on WhatsApp",
  },
  stats: [
    { value: "2", label: "Festival days" },
    { value: "13", label: "Artists & speakers" },
    { value: "3", label: "Masterclasses & actions" },
    { value: "1", label: "Generation rising" },
  ],
  explore: {
    eyebrow: "Explore",
    title: "The whole festival",
    description:
      "Vision, line-up, daytime impact, venue, shop and practical info — each world has its own page.",
    cards: [
      {
        href: "/mouvement",
        title: "The movement",
        description: "More than a festival — Midombo, faith and generation.",
        imageAlt: "YUNA movement",
      },
      {
        href: "/artistes",
        title: "Line-up",
        description: "Artists are revealed progressively.",
        imageAlt: "Festival stage and artists",
      },
      {
        href: "/journee",
        title: "Daytime",
        description: "Medical outreach, masterclasses and activity hubs.",
        imageAlt: "Community daytime actions",
      },
      {
        href: "/#lieu",
        title: "The venue",
        description: "Midombo Grounds, Cotonou — free entry.",
        imageAlt: "Midombo Grounds",
      },
      {
        href: "/boutique",
        title: "Shop",
        description: "YUNA LED tees — wear the fire.",
        imageAlt: "Stage lights",
      },
      {
        href: "/faq",
        title: "FAQ & info",
        description: "Entry, QR pass, access — the essentials.",
        imageAlt: "Festival crowd",
      },
    ],
  },
  saveTheDate: {
    eyebrow: "Save the date · 2026",
    title: "5–6 September 2026",
    support:
      "An extraordinary generation rises — Joseph. Daniel. David. Now it’s your turn.",
    venue:
      "Midombo Grounds, Cotonou — Free entry. Save the date, get your pass.",
  },
  register: {
    eyebrow: "Registration",
    title: "Register — free QR pass",
    lead:
      "Register for free and instantly generate your personal QR pass — show it at the gate. Save your confirmation link: no email is sent yet.",
    formTitle: "Your details",
    name: "Full name *",
    namePh: "e.g. Grace Ahouansou",
    phone: "Phone (WhatsApp) *",
    phonePh: "+229 01 XX XX XX XX",
    email: "Email (optional)",
    emailPh: "you@email.com",
    consent:
      "I agree that my information may be used to generate my pass and organize the festival, as described in the",
    privacy: "privacy policy",
    submit: "Get my QR pass",
    already: "Already registered?",
    recoverLink: "Recover my pass",
    previewLabel: "Live preview",
    previewHint:
      "The final QR is created only after validation — this preview shows how your pass will look at the gate.",
  },
  registerTypes: {
    pass: {
      label: "Festival — 2 evenings",
      hint: "Free entry · QR for priority access",
    },
    masterclass_vteam: {
      label: "VTeam masterclass",
      hint: "Saturday 10am–1pm · musicians & worship leaders",
    },
    masterclass_entrepreneuriat: {
      label: "Entrepreneurship masterclass",
      hint: "Saturday 3–5pm · limited seats",
    },
    benevole: {
      label: "Volunteer",
      hint: "Welcome, security, tech, protocol…",
    },
  },
  floatCta: "My pass",
  floatAria: "Get my free QR pass",
  lineup: {
    eyebrow: "Line-up",
    title: "The artists",
    description:
      "Worship, praise and powerful stages — the line-up is revealed progressively.",
    teaser: "{n} artists & speakers — line-up revealed progressively",
    coming: "Line-up coming soon.",
    mysteryEyebrow: "Line-up in progress",
    mysteryTitle: "Coming soon",
    mysteryBody:
      "{n} artist(s) still under wraps — names drop progressively. Stay tuned.",
  },
  pages: {
    artistes: {
      eyebrow: "Stages & worship",
      title: "The line-up",
      lead:
        "Worship, praise and powerful stages — the 2026 line-up is revealed progressively. Stay tuned for announcements.",
    },
    vision: {
      eyebrow: "The vision",
      title: "An extraordinary generation",
      lead:
        "Joseph, Daniel, David — young people with an excellent spirit who stand before kings.",
    },
    journee: {
      eyebrow: "Saturday daytime",
      title: "Impact before the stage",
      lead:
        "Awakening starts with service. Before the spotlights, YUNA serves the city.",
    },
    lieu: {
      eyebrow: "The venue",
      title: "Midombo Grounds",
      lead:
        "An open space in the heart of Cotonou — open to all, free entry.",
    },
    boutique: {
      eyebrow: "Shop",
      title: "Wear the fire",
      lead: "YUNA LED tees — the movement’s identity on you.",
    },
    don: {
      eyebrow: "Support",
      title: "Support YUNA",
      lead:
        "We’re not selling anything here. Your support keeps the festival free and open to all.",
    },
    faq: {
      eyebrow: "Info",
      title: "FAQ",
      lead: "Entry, QR pass, access — the essentials.",
    },
    monPass: {
      eyebrow: "Lost your pass?",
      title: "Recover my pass",
      lead:
        "Enter the name and WhatsApp number used at registration. We’ll show your QR again.",
      notYet: "Not registered yet?",
    },
    mouvement: {
      eyebrow: "The movement",
      title: "More than a festival",
      lead:
        "Faith, gifts and ground impact — a generation rising in Midombo and beyond.",
    },
  },
  countdown: {
    days: "Days",
    hours: "Hours",
    minutes: "Min",
    seconds: "Sec",
    label: "Countdown",
  },
};
