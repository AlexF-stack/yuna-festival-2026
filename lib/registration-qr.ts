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
  const payload = `${siteOrigin()}/confirmation/${registrationId}`;
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
    color: {
      dark: "#0A0E14",
      light: "#ffffff",
    },
  });
}
