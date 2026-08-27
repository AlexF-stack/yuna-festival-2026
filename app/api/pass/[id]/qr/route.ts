import { NextResponse } from "next/server";

import { generateRegistrationQrPng } from "@/lib/registration-qr";
import { getRegistrationById } from "@/lib/registrations";

export const runtime = "nodejs";

type RouteProps = { params: Promise<{ id: string }> };

/**
 * PNG du QR — image HTTPS pour les mails (Gmail refuse souvent le CID).
 * L’UUID est opaque : connaître l’URL = déjà connaître le pass.
 */
export async function GET(_request: Request, { params }: RouteProps) {
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

  const png = await generateRegistrationQrPng(registration.id);
  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
