/**
 * Extrait un UUID d’inscription depuis un scan QR
 * (UUID nu ou URL …/confirmation/{uuid}).
 */
const UUID_RE =
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

export function extractRegistrationId(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;
  const m = UUID_RE.exec(text);
  return m ? m[0]!.toLowerCase() : null;
}
