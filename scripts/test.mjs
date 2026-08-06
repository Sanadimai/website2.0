// Project tests. No framework: node --test would need TS transpilation, and the
// things worth asserting here are arithmetic, generated artefacts and the
// contents of the built output. Run with `npm test` (after `npm run build`).
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const OUT = new URL("../out/", import.meta.url);
const readOut = (p) => readFile(new URL(p, OUT), "utf8");
const readJson = async (p) => JSON.parse(await readOut(p));

/* ------------------------------------------------------------ calculator */

// Mirrors lib/content.ts REVENUE_MODEL. Kept in sync by the assertion below,
// which reads the real source rather than trusting this copy.
const MODEL = {
  averageConsultationAed: 400,
  convertibleMessagesMissedPerDay: 3,
  workingDaysPerMonth: 21,
};
const monthlyLeakage = (m) =>
  m.averageConsultationAed * m.convertibleMessagesMissedPerDay * m.workingDaysPerMonth;

test("revenue calculator: 400 x 3 x 21 = 25200", () => {
  assert.equal(monthlyLeakage(MODEL), 25200);
});

test("revenue model in lib/content.ts matches the tested inputs", async () => {
  const src = await readFile(new URL("../lib/content.ts", import.meta.url), "utf8");
  for (const [key, value] of Object.entries(MODEL)) {
    assert.match(
      src,
      new RegExp(`${key}:\\s*${value}\\b`),
      `lib/content.ts should declare ${key}: ${value}`,
    );
  }
});

test("the rendered HTML shows the derived figure without JavaScript", async () => {
  const html = await readOut("index.html");
  // Must be in the server-rendered markup: crawlers and no-JS agents never run
  // the count-up animation. AED 25,000 legitimately appears as the Clinic OS
  // list price, so assert on the leakage figure specifically.
  assert.ok(html.includes("25,200") || html.includes("25200"), "page must render 25,200 server-side");
  assert.ok(!/≈ AED[^0-9]*25,000/.test(html), "the leakage figure must not be the old 25,000");
});

/* ------------------------------------------------- analytics / privacy */

test("analytics only load behind consent", async () => {
  const html = await readOut("index.html");
  const directGa = /<script[^>]+googletagmanager\.com\/gtag\/js/.test(html);
  assert.equal(directGa, false, "GA must not be a plain script tag in the served HTML");
  assert.equal(/googletagmanager\.com\/gtm\.js/.test(html), false, "GTM must not load before consent");
  assert.equal(/googletagmanager\.com\/ns\.html/.test(html), false, "the GTM noscript iframe must not be present: it cannot honour consent");
  assert.ok(html.includes("clarity") === false || html.includes("consent"), "Clarity must be consent-gated");
});

test("privacy policy names the analytics processors it actually uses", async () => {
  const html = await readOut("privacy.html");
  for (const vendor of ["Google Tag Manager", "Google Analytics", "Clarity"]) {
    assert.ok(html.includes(vendor), `privacy policy must disclose ${vendor}`);
  }
});

/* ------------------------------------------------------ discovery docs */

test("agent discovery documents are present and valid JSON", async () => {
  for (const p of [
    ".well-known/agent-card.json",
    ".well-known/mcp/server-card.json",
    ".well-known/agent-skills/index.json",
    ".well-known/agents/index.json",
    ".well-known/api-catalog",
    "openapi.json",
  ]) {
    const doc = await readJson(p);
    assert.ok(doc && typeof doc === "object", `${p} must parse as a JSON object`);
  }
});

test("A2A agent card declares the real endpoint and no fake auth", async () => {
  const card = await readJson(".well-known/agent-card.json");
  assert.equal(card.url, "https://sanad.im/a2a");
  assert.ok(Array.isArray(card.supportedInterfaces) && card.supportedInterfaces.length > 0);
  assert.ok(Array.isArray(card.skills) && card.skills.length > 0);
  assert.deepEqual(card.security, [], "no security schemes may be advertised while none are enforced");
});

test("OpenAPI 3.1 document has real schemas, not bare objects", async () => {
  const api = await readJson("openapi.json");
  assert.match(api.openapi, /^3\.1/);
  assert.ok(Object.keys(api.paths).length >= 4, "all public endpoints must be documented");
  assert.ok(api.components?.schemas, "components.schemas is required");
  const bare = JSON.stringify(api).includes('"schema":{"type":"object"}');
  assert.equal(bare, false, "no endpoint may respond with a bare { type: object } schema");
});

test("llms.txt and llms-full.txt exist and describe boundaries", async () => {
  for (const f of ["llms.txt", "llms-full.txt"]) {
    const t = await readOut(f);
    assert.ok(t.length > 400, `${f} is too short to be useful`);
    assert.match(t, /medical advice/i, `${f} must state the medical-advice boundary`);
  }
});

test("security.txt is present with required fields", async () => {
  const t = await readOut(".well-known/security.txt");
  for (const field of ["Contact:", "Expires:", "Preferred-Languages:"]) {
    assert.ok(t.includes(field), `security.txt must contain ${field}`);
  }
});

/* ------------------------------------------------------ bilingual routes */

test("both languages render with the correct direction", async () => {
  assert.match(await readOut("index.html"), /<html lang="en" dir="ltr"/);
  for (const p of ["ar.html", "ar/privacy.html", "ar/terms.html", "ar/dpa.html", "ar/trust.html"]) {
    assert.match(await readOut(p), /<html lang="ar" dir="rtl"/, `${p} must be RTL Arabic`);
  }
});

/* ------------------------------------------- legal completeness (expected) */

test("production legal completeness", async (t) => {
  const pages = ["privacy.html", "terms.html", "dpa.html"];
  const found = [];
  for (const p of pages) {
    const html = await readOut(p);
    for (const m of html.matchAll(/\[\[[^\]]+\]\]/g)) found.push(`${p}: ${m[0]}`);
  }
  if (found.length) {
    // Deliberately not invented. This fails until real values are configured.
    t.diagnostic(`unresolved legal placeholders:\n  ${found.join("\n  ")}`);
  }
  assert.equal(found.length, 0, `${found.length} legal placeholders remain unresolved`);
});
