import QRCode from "qrcode";

import { siteOrigin } from "@/lib/crm";

/** QR PNG — encode l’URL de confirmation (UUID toujours extractible). */
export async function generateRegistrationQr(
  registrationId: string,
): Promise<string> {
  const payload = `${siteOrigin()}/confirmation/${registrationId}`;
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
    color: {
      dark: "#0077bb",
      light: "#ffffff",
    },
  });
}
