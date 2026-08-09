import fs from "node:fs";
import { randomUUID } from "node:crypto";

const env = Object.fromEntries(
  fs
    .readFileSync(".env.e2e.local", "utf8")
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

const BASE = "https://yuna-festival-2026.vercel.app";
const staff = env.YUNA_STAFF_SECRET;
const crmKey = env.YUNA_CRM_API_KEY;
const idem = randomUUID();
const phone = `+2299700${String(Math.floor(1000 + Math.random() * 8999))}`;
const name = "Test E2E Cursor";

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

const results = [];

const reg = await j(`${BASE}/api/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    phone,
    email: "test-e2e-cursor@yunafestival.org",
    registrationType: "pass",
    consent: true,
    idempotencyKey: idem,
    website: "",
  }),
});
results.push([
  "register",
  reg.status,
  reg.body?.id ? `id=${reg.body.id}` : JSON.stringify(reg.body).slice(0, 160),
]);
const id = reg.body?.id;

await new Promise((r) => setTimeout(r, 4000));

if (id) {
  const conf = await j(`${BASE}/confirmation/${id}`);
  const html = typeof conf.body === "string" ? conf.body : "";
  results.push([
    "confirmation",
    conf.status,
    html.includes("Ton pass") || html.includes("pass") ? "has_pass" : "no_pass",
  ]);
}

const list = await j(`${BASE}/api/crm/registrations?limit=50`, {
  headers: { "x-yuna-crm": crmKey },
});
const found =
  Array.isArray(list.body?.registrations) &&
  list.body.registrations.some((r) => r.id === id);
results.push([
  "crm_api",
  list.status,
  `count=${list.body?.count} found=${found}`,
]);

const unlock = await j(`${BASE}/api/staff/unlock`, {
  method: "POST",
  headers: { "x-yuna-staff": staff },
});
results.push(["staff_unlock", unlock.status, JSON.stringify(unlock.body)]);

const cin = await j(`${BASE}/api/check-in`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-yuna-staff": staff,
  },
  body: JSON.stringify({ code: id, staffLabel: "e2e-porte" }),
});
results.push([
  "checkin",
  cin.status,
  `already=${cin.body?.alreadyCheckedIn} ok=${cin.body?.ok}`,
]);

await new Promise((r) => setTimeout(r, 4000));

const cin2 = await j(`${BASE}/api/check-in`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-yuna-staff": staff,
  },
  body: JSON.stringify({ code: id, staffLabel: "e2e-porte" }),
});
results.push([
  "checkin2",
  cin2.status,
  `already=${cin2.body?.alreadyCheckedIn}`,
]);

const rec = await j(`${BASE}/api/recover-pass`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ phone, name }),
});
results.push([
  "recover",
  rec.status,
  `found=${rec.body?.found} keys=${Object.keys(rec.body || {}).join(",")}`,
]);

const news = await j(`${BASE}/api/newsletter`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: `news-e2e-${Date.now()}@yunafestival.org`,
    consent: true,
    website: "",
  }),
});
results.push(["newsletter", news.status, JSON.stringify(news.body).slice(0, 100)]);

for (const p of [
  "/",
  "/staff/crm",
  "/staff/scan",
  "/mon-pass",
  "/artistes",
  "/don",
]) {
  const page = await j(`${BASE}${p}`);
  results.push([`page${p}`, page.status, "ok"]);
}

fs.writeFileSync(
  "e2e-results.json",
  JSON.stringify({ id, phone, results }, null, 2),
);
console.log(JSON.stringify({ id, phone, results }, null, 2));
