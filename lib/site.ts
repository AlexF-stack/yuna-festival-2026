/** Coordonnées / liens site — surchargés via env si besoin. */
export const SITE_CONTACT = {
  email: "contact@yunafestival.org",
  preorderSubject: "Précommande tee-shirt LED YUNA 2026",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "",
  whatsappPrefill: "Bonjour YUNA 2026 !",
} as const;

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
      ? `Précommande ${productName} — YUNA 2026`
      : SITE_CONTACT.preorderSubject,
  );
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}
