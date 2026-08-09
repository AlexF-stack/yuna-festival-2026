import { NextResponse } from "next/server";

import { getRegistrationById } from "@/lib/registrations";
import { buildAppleWalletPass } from "@/lib/wallet/apple";
import { getWalletCapabilities } from "@/lib/wallet/config";

export const runtime = "nodejs";

type RouteProps = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteProps) {
  if (!getWalletCapabilities().apple) {
    return NextResponse.json(
      {
        error:
          "Apple Wallet non configuré. Ajoute les certificats Pass Type ID (APPLE_PASS_*).",
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
    const buffer = await buildAppleWalletPass({
      id: registration.id,
      name: registration.name,
      registrationType: registration.registration_type,
    });
    const short = registration.id.slice(0, 8);
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="yuna-pass-${short}.pkpass"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[wallet/apple]", err);
    return NextResponse.json(
      { error: "Génération Apple Wallet impossible." },
      { status: 500 },
    );
  }
}
