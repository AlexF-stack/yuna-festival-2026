/** CoordonnÃ©es / liens site â€” surchargÃ©s via env si besoin. */
export const SITE_CONTACT = {
  email: "contact@festivalyuna.com",
  preorderSubject: "PrÃ©commande tee-shirt LED YUNA 2026",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  whatsappPrefill: "Bonjour YUNA 2026 !",
} as const;

/** RÃ©seaux sociaux officiels YUNA Festival. */
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

/** Canal WhatsApp officiel â€” redirigÃ© aprÃ¨s inscription festival. */
export const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL?.trim() ||
  "https://whatsapp.com/channel/0029Vb6ZGo37tkjEmwoRt80H";

/** Groupe WhatsApp ambassadeurs. */
export const WHATSAPP_VOLUNTEERS_GROUP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_VOLUNTEERS_GROUP_URL?.trim() ||
  "https://chat.whatsapp.com/KqjGksjZ4mD5z10GWae5J7";

/** null si le numÃ©ro WhatsApp n'est pas configurÃ© â€” Ã©vite de shipper un faux numÃ©ro. */
export function getWhatsAppHref(): string | null {
  if (!SITE_CONTACT.whatsappNumber) return null;
  const text = encodeURIComponent(SITE_CONTACT.whatsappPrefill);
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${text}`;
}

export function getPreorderMailto(): string {
  const subject = encodeURIComponent(SITE_CONTACT.preorderSubject);
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}

/** Checkout boutique â€” lien de paiement si configurÃ©, sinon mailto prÃ©commande. */
export function getBoutiqueCheckoutHref(productName?: string): string {
  const payment =
    process.env.NEXT_PUBLIC_FEDAPAY_BOUTIQUE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_PAYMENT_URL?.trim();
  if (payment) return payment;
  const subject = encodeURIComponent(
    productName
      ? `PrÃ©commande ${productName}, YUNA 2026`
      : SITE_CONTACT.preorderSubject,
  );
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}

/**
 * Lien de paiement soutien.
 * Défaut : page MoMo officielle YUNA (`/soutenir/payer`).
 */
export function getSupportPaymentUrl(): string | null {
  const url =
    process.env.NEXT_PUBLIC_SUPPORT_PAYMENT_URL?.trim() ||
    process.env.NEXT_PUBLIC_FEDAPAY_DONATE_URL?.trim() ||
    "/soutenir/payer";
  return url || null;
}
