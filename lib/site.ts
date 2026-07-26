/** Coordonnées / liens site — surchargés via env si besoin. */
export const SITE_CONTACT = {
  email: "contact@yunafestival.org",
  preorderSubject: "Précommande tee-shirt LED YUNA 2026",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "22900000000",
  whatsappPrefill: "Bonjour YUNA 2026 !",
} as const;

export function getWhatsAppHref(): string {
  const text = encodeURIComponent(SITE_CONTACT.whatsappPrefill);
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${text}`;
}

export function getPreorderMailto(): string {
  const subject = encodeURIComponent(SITE_CONTACT.preorderSubject);
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}
