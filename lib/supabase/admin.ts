import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

/**
 * Client service_role — API routes uniquement.
 * Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY au navigateur.
 */
export function createSupabaseAdminClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis côté serveur.",
    );
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
