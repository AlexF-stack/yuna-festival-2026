import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { Registration } from "@/lib/registration";
import { isRegistrationType } from "@/lib/registration-types";

export async function getRegistrationById(
  id: string,
): Promise<Registration | null> {
  const uuidRe =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRe.test(id)) return null;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("id, name, phone, email, registration_type, created_at, qr_code")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Lecture inscription impossible: ${error.message}`);
  }

  if (!data || !isRegistrationType(data.registration_type)) return null;

  return {
    ...data,
    registration_type: data.registration_type,
  };
}

export async function getRegistrationsCount(): Promise<number> {
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return 0;
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { count, error } = await supabase
      .from("registrations")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("getRegistrationsCount:", error.message);
      return 0;
    }

    return count ?? 0;
  } catch {
    return 0;
  }
}
