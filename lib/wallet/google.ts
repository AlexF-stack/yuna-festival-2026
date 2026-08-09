import { SignJWT, importPKCS8 } from "jose";

import { FESTIVAL } from "@/lib/festival";
import {
  REGISTRATION_TYPE_LABELS,
  type RegistrationType,
} from "@/lib/registration-types";
import {
  confirmationUrlFor,
  getWalletCapabilities,
  pemFromEnv,
} from "@/lib/wallet/config";

type GooglePassInput = {
  id: string;
  name: string;
  registrationType: RegistrationType;
};

/**
 * JWT « Save to Google Wallet » — Event Ticket Object.
 * Prérequis : classe EventTicket créée dans Google Wallet Console.
 */
export async function buildGoogleWalletSaveUrl(
  input: GooglePassInput,
): Promise<string> {
  if (!getWalletCapabilities().google) {
    throw new Error("Google Wallet non configuré (issuer / service account).");
  }

  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!.trim();
  const classIdRaw = process.env.GOOGLE_WALLET_CLASS_ID!.trim();
  const classId = classIdRaw.includes(".")
    ? classIdRaw
    : `${issuerId}.${classIdRaw}`;
  const email = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL!.trim();
  const privateKey = pemFromEnv(process.env.GOOGLE_WALLET_PRIVATE_KEY!);
  const url = confirmationUrlFor(input.id);
  const shortId = input.id.slice(0, 8).toUpperCase();
  const typeLabel = REGISTRATION_TYPE_LABELS[input.registrationType];
  const objectId = `${issuerId}.yuna_${input.id.replace(/-/g, "")}`;

  const claims = {
    iss: email,
    aud: "google",
    typ: "savetowallet",
    origins: [
      (process.env.NEXT_PUBLIC_SITE_URL || "https://yunafestival.com").replace(
        /\/$/,
        "",
      ),
    ],
    payload: {
      eventTicketObjects: [
        {
          id: objectId,
          classId,
          state: "ACTIVE",
          ticketHolderName: input.name,
          ticketNumber: `YUNA-${shortId}`,
          barcode: {
            type: "QR_CODE",
            value: url,
            alternateText: `YUNA-${shortId}`,
          },
          hexBackgroundColor: "#0077BB",
          heroImage: undefined,
          textModulesData: [
            { header: "TYPE", body: typeLabel },
            {
              header: "LIEU",
              body: `${FESTIVAL.venue}, ${FESTIVAL.city}`,
            },
            { header: "DATES", body: "5–6 septembre 2026" },
          ],
        },
      ],
    },
  };

  const key = await importPKCS8(privateKey, "RS256");
  const token = await new SignJWT(claims)
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  return `https://pay.google.com/gp/v/save/${token}`;
}
