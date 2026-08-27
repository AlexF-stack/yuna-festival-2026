import QRCode from "qrcode";

import { siteOrigin } from "@/lib/crm";

/**
 * QR PNG — encode l’URL de confirmation (UUID toujours extractible).
 * Modules presque noirs : le bleu marque (#0077BB) n’a qu’un contraste ~3.4:1
 * sur blanc, trop juste pour un scan de téléphone en plein soleil à la porte.
 */
export async function generateRegistrationQr(
  registrationId: string,
): Promise<string> {
  const payload = confirmationPayload(registrationId);
  return QRCode.toDataURL(payload, QR_OPTIONS);
}

/** PNG binaire — image HTTPS `/api/pass/[id]/qr` (les CID Gmail restent souvent à « sent »). */
export async function generateRegistrationQrPng(
  registrationId: string,
): Promise<Buffer> {
  const payload = confirmationPayload(registrationId);
  return QRCode.toBuffer(payload, { ...QR_OPTIONS, type: "png" });
}

/** URL publique du QR — à coller dans `<img src>` des mails, pas en CID. */
export function qrImageUrl(registrationId: string): string {
  return `${siteOrigin()}/api/pass/${registrationId}/qr`;
}

function confirmationPayload(registrationId: string): string {
  return `${siteOrigin()}/confirmation/${registrationId}`;
}

const QR_OPTIONS = {
  errorCorrectionLevel: "M" as const,
  margin: 2,
  width: 480,
  color: {
    dark: "#0A0E14",
    light: "#ffffff",
  },
};
