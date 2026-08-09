import { NextResponse } from "next/server";

import { getMessagingCapabilities } from "@/lib/messaging";
import { getWalletCapabilities } from "@/lib/wallet/config";

export const runtime = "nodejs";

/** Capacités Wallet / messaging — pas de secrets. */
export async function GET() {
  const wallet = getWalletCapabilities();
  const messaging = getMessagingCapabilities();
  return NextResponse.json({
    ok: true,
    wallet,
    messaging: {
      whatsapp: messaging.whatsapp,
      sms: messaging.sms,
    },
  });
}
