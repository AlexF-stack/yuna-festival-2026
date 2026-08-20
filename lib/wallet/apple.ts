import path from "node:path";

import { PKPass } from "passkit-generator";

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

type ApplePassInput = {
  id: string;
  name: string;
  registrationType: RegistrationType;
};

/**
 * Génère un .pkpass Event Ticket — barcode = URL confirmation (même payload que le QR web).
 */
export async function buildAppleWalletPass(
  input: ApplePassInput,
): Promise<Buffer> {
  if (!getWalletCapabilities().apple) {
    throw new Error("Apple Wallet non configuré (certificats Pass Type ID).");
  }

  const wwdr = pemFromEnv(process.env.APPLE_PASS_WWDR_PEM!);
  const signerCert = pemFromEnv(process.env.APPLE_PASS_SIGNER_CERT_PEM!);
  const signerKey = pemFromEnv(process.env.APPLE_PASS_SIGNER_KEY_PEM!);
  const passphrase = process.env.APPLE_PASS_SIGNER_KEY_PASSPHRASE?.trim();
  const passTypeId = process.env.APPLE_PASS_TYPE_ID!.trim();
  const teamId = process.env.APPLE_TEAM_ID!.trim();
  const org = process.env.APPLE_PASS_ORG_NAME?.trim() || "YUNA Festival";

  const url = confirmationUrlFor(input.id);
  const shortId = input.id.slice(0, 8).toUpperCase();
  const typeLabel = REGISTRATION_TYPE_LABELS[input.registrationType];
  const model = path.join(process.cwd(), "pass-models", "yuna-event");

  const pass = await PKPass.from(
    {
      model,
      certificates: {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase: passphrase || undefined,
      },
    },
    {
      serialNumber: input.id,
      passTypeIdentifier: passTypeId,
      teamIdentifier: teamId,
      organizationName: org,
      description: `Pass YUNA ${FESTIVAL.edition}`,
      logoText: "YUNA",
      foregroundColor: "rgb(255, 248, 241)",
      backgroundColor: "rgb(0, 119, 187)",
      labelColor: "rgb(255, 212, 0)",
    },
  );

  pass.type = "eventTicket";
  pass.setBarcodes({
    message: url,
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
    altText: `YUNA-${shortId}`,
  });

  pass.primaryFields.push({
    key: "event",
    label: "ÉVÉNEMENT",
    value: `YUNA ${FESTIVAL.edition}`,
  });
  pass.secondaryFields.push(
    {
      key: "holder",
      label: "PARTICIPANT",
      value: input.name,
    },
    {
      key: "type",
      label: "TYPE",
      value: typeLabel,
    },
  );
  pass.auxiliaryFields.push(
    {
      key: "dates",
      label: "DATES",
      value: "5–6 sept. 2026",
    },
    {
      key: "venue",
      label: "LIEU",
      value: `${FESTIVAL.locationLine}`,
    },
  );
  pass.backFields.push(
    {
      key: "id",
      label: "ID pass",
      value: `YUNA-${shortId}`,
    },
    {
      key: "web",
      label: "Pass web",
      value: url,
    },
    {
      key: "note",
      label: "Entrée",
      value: "Entrée libre. Présente ce pass à la porte.",
    },
  );

  return pass.getAsBuffer();
}
