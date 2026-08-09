export type WalletCapabilities = {
  apple: boolean;
  google: boolean;
};

function has(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export function getWalletCapabilities(): WalletCapabilities {
  const apple =
    has(process.env.APPLE_PASS_WWDR_PEM) &&
    has(process.env.APPLE_PASS_SIGNER_CERT_PEM) &&
    has(process.env.APPLE_PASS_SIGNER_KEY_PEM) &&
    has(process.env.APPLE_PASS_TYPE_ID) &&
    has(process.env.APPLE_TEAM_ID);

  const google =
    has(process.env.GOOGLE_WALLET_ISSUER_ID) &&
    has(process.env.GOOGLE_WALLET_CLASS_ID) &&
    has(process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL) &&
    has(process.env.GOOGLE_WALLET_PRIVATE_KEY);

  return { apple, google };
}

export function confirmationUrlFor(registrationId: string): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://yunafestival.com"
  ).replace(/\/$/, "");
  return `${base}/confirmation/${registrationId}`;
}

/** PEM depuis env (littéral multiligne ou base64). */
export function pemFromEnv(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.includes("BEGIN")) {
    return trimmed.replace(/\\n/g, "\n");
  }
  return Buffer.from(trimmed, "base64").toString("utf8");
}
