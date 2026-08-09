import { NextResponse } from "next/server";

import { getRegistrationById } from "@/lib/registrations";
import { getWalletCapabilities } from "@/lib/wallet/config";
import { buildGoogleWalletSaveUrl } from "@/lib/wallet/google";

export const runtime = "nodejs";

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteProps) {
  if (!getWalletCapabilities().google) {
    return NextResponse.json(
      {
        error:
          "Google Wallet non configuré. Ajoute GOOGLE_WALLET_ISSUER_ID + service account.",
      },
      { status: 503 },
    );
  }

  const { id } = await params;
  let registration;
  try {
    registration = await getRegistrationById(id);
  } catch {
    registration = null;
  }
  if (!registration) {
    return NextResponse.json({ error: "Pass introuvable." }, { status: 404 });
  }

  try {
    const saveUrl = await buildGoogleWalletSaveUrl({
      id: registration.id,
      name: registration.name,
      registrationType: registration.registration_type,
    });
    const accept = request.headers.get("accept") || "";
    if (accept.includes("application/json")) {
      return NextResponse.json({ ok: true, url: saveUrl });
    }
    return NextResponse.redirect(saveUrl, 302);
  } catch (err) {
    console.error("[wallet/google]", err);
    return NextResponse.json(
      { error: "Génération Google Wallet impossible." },
      { status: 500 },
    );
  }
}
