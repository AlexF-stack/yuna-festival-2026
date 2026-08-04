import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { normalizePhone, type Registration } from "@/lib/registration";
import { isRegistrationType } from "@/lib/registration-types";

const REG_SELECT =
  "id, name, phone, email, registration_type, created_at, qr_code, checked_in_at, checked_in_by";

export async function getRegistrationById(
  id: string,
): Promise<Registration | null> {
  const uuidRe =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRe.test(id)) return null;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select(REG_SELECT)
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

export type CheckInResult =
  | {
      ok: true;
      alreadyCheckedIn: boolean;
      registration: {
        id: string;
        name: string;
        phone: string;
        email: string | null;
        registrationType: string;
        createdAt: string;
        checkedInAt: string;
      };
    }
  | { ok: false; error: string; code: "not_found" | "db" };

/** Premier scan = check-in ; scans suivants = déjà validé (pas d’erreur bloquante). */
export async function checkInRegistration(
  id: string,
  staffLabel: string,
): Promise<CheckInResult> {
  const existing = await getRegistrationById(id);
  if (!existing) {
    return { ok: false, error: "Pass introuvable.", code: "not_found" };
  }

  if (existing.checked_in_at) {
    return {
      ok: true,
      alreadyCheckedIn: true,
      registration: {
        id: existing.id,
        name: existing.name,
        phone: existing.phone,
        email: existing.email,
        registrationType: existing.registration_type,
        createdAt: existing.created_at,
        checkedInAt: existing.checked_in_at,
      },
    };
  }

  const now = new Date().toISOString();
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .update({
      checked_in_at: now,
      checked_in_by: staffLabel.slice(0, 80),
    })
    .eq("id", id)
    .is("checked_in_at", null)
    .select(REG_SELECT)
    .maybeSingle();

  if (error) {
    return { ok: false, error: error.message, code: "db" };
  }

  // Course : un autre scan a gagné
  if (!data) {
    const again = await getRegistrationById(id);
    if (again?.checked_in_at) {
      return {
        ok: true,
        alreadyCheckedIn: true,
        registration: {
          id: again.id,
          name: again.name,
          phone: again.phone,
          email: again.email,
          registrationType: again.registration_type,
          createdAt: again.created_at,
          checkedInAt: again.checked_in_at,
        },
      };
    }
    return { ok: false, error: "Check-in impossible.", code: "db" };
  }

  return {
    ok: true,
    alreadyCheckedIn: false,
    registration: {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      registrationType: data.registration_type,
      createdAt: data.created_at,
      checkedInAt: data.checked_in_at ?? now,
    },
  };
}

export async function listRegistrationsForCrm(limit = 200): Promise<
  Array<{
    id: string;
    name: string;
    phone: string;
    email: string | null;
    registrationType: string;
    createdAt: string;
    checkedInAt: string | null;
  }>
> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select(
      "id, name, phone, email, registration_type, created_at, checked_in_at",
    )
    .order("created_at", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 1000));

  if (error) throw new Error(error.message);

  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    registrationType: r.registration_type,
    createdAt: r.created_at,
    checkedInAt: r.checked_in_at,
  }));
}

/** Dernière inscription pour un numéro (récupération de pass). */
export async function findLatestRegistrationByPhone(
  phoneRaw: string,
): Promise<{ id: string; name: string } | null> {
  const phone = normalizePhone(phoneRaw);
  if (phone.length < 8) return null;

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("id, name")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Recherche pass impossible: ${error.message}`);
  }

  return data ?? null;
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
