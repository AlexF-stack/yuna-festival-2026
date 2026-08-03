/**
 * Auth staff scan + clés API CRM YUNA.
 */

export function getStaffScanSecret(): string | null {
  const v = process.env.YUNA_STAFF_SECRET?.trim();
  return v && v.length >= 8 ? v : null;
}

export function getCrmApiKey(): string | null {
  const v =
    process.env.YUNA_CRM_API_KEY?.trim() || process.env.CRM_API_KEY?.trim();
  return v && v.length >= 8 ? v : null;
}

export function getCrmWebhookUrl(): string | null {
  const v =
    process.env.YUNA_CRM_WEBHOOK_URL?.trim() ||
    process.env.CRM_WEBHOOK_URL?.trim();
  return v && /^https?:\/\//i.test(v) ? v : null;
}

export function extractBearerOrHeader(
  request: Request,
  headerName: string,
): string | null {
  const header = request.headers.get(headerName)?.trim();
  if (header) return header;
  const auth = request.headers.get("authorization");
  if (!auth) return null;
  const m = /^Bearer\s+(.+)$/i.exec(auth.trim());
  return m?.[1]?.trim() || null;
}

export function assertStaffSecret(request: Request): boolean {
  const secret = getStaffScanSecret();
  if (!secret) return false;
  const provided = extractBearerOrHeader(request, "x-yuna-staff");
  return Boolean(provided && provided === secret);
}

export function assertCrmApiKey(request: Request): boolean {
  const key = getCrmApiKey();
  if (!key) return false;
  const provided = extractBearerOrHeader(request, "x-yuna-crm");
  if (provided && provided === key) return true;
  // compat ancien header
  const legacy = extractBearerOrHeader(request, "x-crm-key");
  return Boolean(legacy && legacy === key);
}
