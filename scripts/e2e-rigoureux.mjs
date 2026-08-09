import fs from "node:fs";
import { randomUUID } from "node:crypto";

function loadEnv(path) {
  return Object.fromEntries(
    fs
      .readFileSync(path, "utf8")
      .split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => {
        const i = l.indexOf("=");
        let v = l.slice(i + 1).trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          v = v.slice(1, -1);
        }
        return [l.slice(0, i), v];
      }),
  );
}

const env = {
  ...loadEnv(".env.local"),
  ...(fs.existsSync(".crm-api-key.local")
    ? { YUNA_CRM_API_KEY: fs.readFileSync(".crm-api-key.local", "utf8").trim() }
    : {}),
};

const BASE = "https://yuna-festival-2026.vercel.app";
const staff = env.YUNA_STAFF_SECRET;
const crmKey = env.YUNA_CRM_API_KEY;
if (!staff || staff.length < 8) {
  console.error("YUNA_STAFF_SECRET missing in .env.local");
  process.exit(1);
}
if (!crmKey) {
  console.error("YUNA_CRM_API_KEY missing (.crm-api-key.local)");
  process.exit(1);
}

const idem = randomUUID();
const phone = `+2299711${String(Math.floor(1000 + Math.random() * 8999))}`;
const name = "Test E2E Rigoureux";

async function j(url, opts = {}) {
  const res = await fetch(url, opts);
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  return { status: res.status, body };
}

const out = [];

const health = await j(`${BASE}/api/health`);
out.push(["health", health.status, health.body?.checks]);

const reg = await j(`${BASE}/api/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    phone,
    email: "test-e2e-rigoureux@yunafestival.org",
    registrationType: "pass",
    consent: true,
    idempotencyKey: idem,
    website: "",
  }),
});
out.push(["register", reg.status, reg.body?.id || reg.body]);
const id = reg.body?.id;

const list = await j(`${BASE}/api/crm/registrations?limit=50`, {
  headers: { "x-yuna-crm": crmKey },
});
const foundApi =
  Array.isArray(list.body?.registrations) &&
  list.body.registrations.some((r) => r.id === id);
out.push(["crm_api", list.status, { count: list.body?.count, foundApi }]);

const unlock = await j(`${BASE}/api/staff/unlock`, {
  method: "POST",
  headers: { "x-yuna-staff": staff },
});
out.push(["unlock", unlock.status, unlock.body]);

const cin = await j(`${BASE}/api/check-in`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-yuna-staff": staff,
  },
  body: JSON.stringify({ code: id, staffLabel: "e2e-rigoureux" }),
});
out.push([
  "checkin",
  cin.status,
  { ok: cin.body?.ok, already: cin.body?.alreadyCheckedIn },
]);

const cin2 = await j(`${BASE}/api/check-in`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-yuna-staff": staff,
  },
  body: JSON.stringify({ code: id, staffLabel: "e2e-rigoureux" }),
});
out.push(["checkin2", cin2.status, { already: cin2.body?.alreadyCheckedIn }]);

const listStaff = await j(`${BASE}/api/crm/registrations?limit=50`, {
  headers: { "x-yuna-staff": staff },
});
const foundStaff =
  Array.isArray(listStaff.body?.registrations) &&
  listStaff.body.registrations.some((r) => r.id === id);
out.push([
  "crm_api_staff",
  listStaff.status,
  { foundStaff, checkedIn: listStaff.body?.registrations?.find((r) => r.id === id)?.checkedInAt },
]);

const rec = await j(`${BASE}/api/recover-pass`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phone, name }),
});
out.push(["recover", rec.status, { found: rec.body?.found }]);

fs.writeFileSync("e2e-results.json", JSON.stringify({ id, phone, out }, null, 2));
console.log(JSON.stringify({ id, phone, out }, null, 2));
