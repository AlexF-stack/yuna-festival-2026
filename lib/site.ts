/** Coordonnées / liens site — surchargés via env si besoin. */
export const SITE_CONTACT = {
  email: "contact@festivalyuna.com",
  preorderSubject: "Précommande tee-shirt LED YUNA 2026",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  whatsappPrefill: "Bonjour YUNA 2026 !",
} as const;

/** Réseaux sociaux officiels YUNA Festival. */
export const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/YUNAFestival",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/yuna_festival_",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@yunafestival",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@YunaFestival",
  },
] as const;

/** Canal WhatsApp officiel — redirigé après inscription festival. */
export const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL?.trim() ||
  "https://whatsapp.com/channel/0029Vb6ZGo37tkjEmwoRt80H";

/** Groupe WhatsApp bénévoles / ambassadeurs. */
export const WHATSAPP_VOLUNTEERS_GROUP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_VOLUNTEERS_GROUP_URL?.trim() ||
  "https://chat.whatsapp.com/KqjGksjZ4mD5z10GWae5J7";

/** null si le numéro WhatsApp n'est pas configuré — évite de shipper un faux numéro. */
export function getWhatsAppHref(): string | null {
  if (!SITE_CONTACT.whatsappNumber) return null;
  const text = encodeURIComponent(SITE_CONTACT.whatsappPrefill);
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${text}`;
}

export function getPreorderMailto(): string {
  const subject = encodeURIComponent(SITE_CONTACT.preorderSubject);
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}

/** Checkout boutique — FedaPay si configuré, sinon mailto précommande. */
export function getBoutiqueCheckoutHref(productName?: string): string {
  const fedapay = process.env.NEXT_PUBLIC_FEDAPAY_BOUTIQUE_URL?.trim();
  if (fedapay) return fedapay;
  const subject = encodeURIComponent(
    productName
      ? `Précommande ${productName}, YUNA 2026`
      : SITE_CONTACT.preorderSubject,
  );
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}
