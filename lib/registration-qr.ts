import QRCode from "qrcode";

/** QR PNG (data URL) encodant l'id d'inscription. */
export async function generateRegistrationQr(
  registrationId: string,
): Promise<string> {
  return QRCode.toDataURL(registrationId, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
    color: {
      dark: "#0a0817",
      light: "#fbf6ec",
    },
  });
}
