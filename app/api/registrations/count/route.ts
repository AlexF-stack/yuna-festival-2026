import { NextResponse } from "next/server";

import { getPublicRegistrationsDisplayCount } from "@/lib/public-registrations-count";

export const dynamic = "force-dynamic";

/**
 * Compteur public d’inscrits (base factice + total réel).
 * GET /api/registrations/count → { count: number }
 */
export async function GET() {
  try {
    const count = await getPublicRegistrationsDisplayCount();
    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60",
        },
      },
    );
  } catch (err) {
    console.error("[registrations/count]", err);
    return NextResponse.json(
      { count: 200 },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=5, stale-while-revalidate=30",
        },
      },
    );
  }
}
