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

export type CrmListOptions = {
  page?: number;
  pageSize?: number;
  q?: string;
  /** all | yes | no */
  checkedIn?: "all" | "yes" | "no";
  registrationType?: string;
};

export type CrmRegistrationRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  registrationType: string;
  createdAt: string;
  checkedInAt: string | null;
  checkedInBy: string | null;
  partyId: string | null;
  /** Alias snake_case pour l’UI staff historique */
  pass_type: string;
  qr_token: string;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
};

export async function listRegistrationsForCrm(
  options: CrmListOptions | number = {},
): Promise<{ total: number; page: number; pageSize: number; registrations: CrmRegistrationRow[] }> {
  const opts: CrmListOptions =
    typeof options === "number" ? { pageSize: options } : options;
  const page = Math.max(1, opts.page ?? 1);
  const pageSize = Math.min(Math.max(opts.pageSize ?? 25, 1), 100);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createSupabaseAdminClient();
  const selectCols =
    "id, name, phone, email, registration_type, created_at, checked_in_at, checked_in_by, party_id";
  const selectFallback =
    "id, name, phone, email, registration_type, created_at, checked_in_at, checked_in_by";

  const buildQuery = (cols: string) => {
    let query = supabase
      .from("registrations")
      .select(cols, { count: "exact" })
      .order("created_at", { ascending: false });

    const q = opts.q?.trim();
    if (q) {
      const safe = q.replace(/[%_,]/g, " ").slice(0, 80);
      query = query.or(
        `name.ilike.%${safe}%,phone.ilike.%${safe}%,email.ilike.%${safe}%`,
      );
    }

    if (opts.checkedIn === "yes") {
      query = query.not("checked_in_at", "is", null);
    } else if (opts.checkedIn === "no") {
      query = query.is("checked_in_at", null);
    }

    if (opts.registrationType?.trim()) {
      query = query.eq("registration_type", opts.registrationType.trim());
    }

    return query.range(from, to);
  };

  let { data, error, count } = await buildQuery(selectCols);
  if (error?.message?.includes("party_id")) {
    ({ data, error, count } = await buildQuery(selectFallback));
  }

  if (error) throw new Error(error.message);

  const registrations = (data ?? []).map((r) => {
    const row = r as unknown as {
      id: string;
      name: string;
      phone: string;
      email: string | null;
      registration_type: string;
      created_at: string;
      checked_in_at: string | null;
      checked_in_by?: string | null;
      party_id?: string | null;
    };
    const checkedIn = Boolean(row.checked_in_at);
    return {
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      registrationType: row.registration_type,
      createdAt: row.created_at,
      checkedInAt: row.checked_in_at,
      checkedInBy: row.checked_in_by ?? null,
      partyId: row.party_id ?? null,
      pass_type: row.registration_type,
      qr_token: row.id,
      checked_in: checkedIn,
      checked_in_at: row.checked_in_at,
      created_at: row.created_at,
    };
  });

  return {
    total: count ?? registrations.length,
    page,
    pageSize,
    registrations,
  };
}

/**
 * Toutes les inscriptions d'un numéro (récupération de pass) : une personne
 * peut cumuler festival + masterclass + bénévolat.
 */
export async function findRegistrationsByPhone(
  phoneRaw: string,
): Promise<Array<{ id: string; name: string; registrationType: string }>> {
  const phone = normalizePhone(phoneRaw);
  if (phone.length < 8) return [];

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select("id, name, registration_type")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(`Recherche pass impossible: ${error.message}`);
  }

  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    registrationType: r.registration_type,
  }));
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
