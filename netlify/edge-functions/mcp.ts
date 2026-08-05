import type { Config } from "https://edge.netlify.com";

/**
 * Streamable HTTP MCP server (JSON-RPC 2.0).
 *
 * Five read-only tools return documents this site already publishes, fetched at
 * call time so the server cannot drift from the website. The sixth,
 * request_demo, is the only write path: it is validated, size-limited, rate
 * limited, idempotent, and delivered to Netlify Forms. It reports success only
 * when delivery actually succeeded.
 *
 * It deliberately cannot accept patient data. There is no public appointment
 * booking here, and there never will be: that requires clinic authentication,
 * patient confirmation and audit logging.
 */

const SITE = "https://sanad.im";
const PROTOCOL_VERSION = "2025-06-18";
const SERVER = { name: "sanad", title: "Sanad", version: "2.0.0" };

const EMIRATES = [
  "Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah",
] as const;

const READ_ONLY = [
  {
    name: "get_capabilities",
    title: "Capabilities and boundaries",
    description:
      "What Sanad does, the languages and channels it supports, and the hard boundaries it will not cross. Start here.",
    source: "/api/v1/capabilities",
    mime: "application/json",
  },
  {
    name: "get_packages",
    title: "Pricing packages",
    description:
      "Canonical founding-cohort pricing in AED: setup, monthly fee, included interactions and terms for Starter, Growth and Clinic OS.",
    source: "/api/v1/packages",
    mime: "application/json",
  },
  {
    name: "get_availability",
    title: "Founding-slot availability",
    description: "How many of the ten founding-cohort slots remain open.",
    source: "/api/v1/availability",
    mime: "application/json",
  },
  {
    name: "get_security_summary",
    title: "Security and compliance summary",
    description:
      "Published data-residency, retention, scope and DPA commitments, with links to the evidence pages.",
    source: "/api/v1/security-summary",
    mime: "application/json",
  },
  {
    name: "get_service_boundaries",
    title: "Service boundaries",
    description:
      "The explicit list of what Sanad refuses to do — medical advice, diagnosis, triage, treatment recommendations — and how clinical questions are routed.",
    source: "/llms.txt",
    mime: "text/markdown",
  },
] as const;

const EMPTY_SCHEMA = { type: "object", properties: {}, additionalProperties: false } as const;

const DEMO_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["clinic_name", "business_email", "emirate", "confirmed", "idempotency_key"],
  properties: {
    clinic_name: { type: "string", minLength: 2, maxLength: 120, description: "Clinic's business name." },
    business_email: { type: "string", format: "email", maxLength: 160, description: "Clinic business email. Never a patient's." },
    business_phone: { type: "string", maxLength: 32, pattern: "^[+0-9 ()-]{7,32}$", description: "Clinic business phone in international format." },
    emirate: { type: "string", enum: EMIRATES },
    preferred_contact_time: { type: "string", maxLength: 80, description: "Free text, e.g. 'weekday mornings'." },
    language: { type: "string", enum: ["en", "ar"] },
    confirmed: { const: true, description: "Must be true. The human being represented has explicitly approved sending this." },
    idempotency_key: { type: "string", minLength: 8, maxLength: 100, description: "Stable key so a retry cannot create a second request." },
  },
} as const;

/** Fields that would indicate patient or clinical data. Rejected outright. */
const FORBIDDEN = /patient|symptom|diagnos|medical|treatment|prescription|dob|date_of_birth|emirates_id|passport|appointment_time|complaint|condition|allerg/i;

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type, mcp-protocol-version, mcp-session-id",
  "access-control-allow-methods": "POST, GET, OPTIONS",
  "access-control-expose-headers": "mcp-session-id",
};

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...CORS, ...extra },
  });

const rpcError = (id: unknown, code: number, message: string, data?: unknown) =>
  json({ jsonrpc: "2.0", id: id ?? null, error: { code, message, ...(data ? { data } : {}) } });

const toolResult = (id: unknown, text: string, isError = false) =>
  json({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text }], isError } });

/** Fixed-window rate limit, keyed by client IP. Best-effort: fails open. */
async function rateLimit(ip: string, bucket: string, limit: number, windowSec: number) {
  try {
    const { getStore } = await import("netlify:blobs");
    const store = getStore("rate-limit");
    const key = `${bucket}:${ip}:${Math.floor(Date.now() / (windowSec * 1000))}`;
    const current = Number((await store.get(key)) ?? 0);
    if (current >= limit) return false;
    await store.set(key, String(current + 1));
    return true;
  } catch {
    return true; // store unavailable — do not lock legitimate callers out
  }
}

async function handleRequestDemo(id: unknown, args: Record<string, unknown>, ip: string) {
  // 1. Reject anything shaped like patient or clinical data.
  const offending = Object.keys(args).filter((k) => FORBIDDEN.test(k));
  const freeText = JSON.stringify(args);
  if (offending.length || FORBIDDEN.test(freeText)) {
    return toolResult(
      id,
      "Rejected: this request appears to contain patient or clinical information. Sanad's public endpoints accept clinic business contact details only. Patient scheduling is never exposed publicly — it requires clinic authentication, patient confirmation and audit logging.",
      true,
    );
  }

  // 2. Size limit.
  if (freeText.length > 4000) {
    return toolResult(id, "Rejected: payload too large. Keep the request under 4000 characters.", true);
  }

  // 3. Structural validation.
  const errors: string[] = [];
  const s = (k: string) => (typeof args[k] === "string" ? (args[k] as string).trim() : "");
  const clinic = s("clinic_name");
  const email = s("business_email");
  const phone = s("business_phone");
  const emirate = s("emirate");
  const key = s("idempotency_key");
  const lang = s("language") || "en";

  if (clinic.length < 2 || clinic.length > 120) errors.push("clinic_name must be 2-120 characters");
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) errors.push("business_email must be a valid email address");
  if (/@(gmail|yahoo|hotmail|outlook|icloud)\./i.test(email)) errors.push("business_email must be a clinic business address, not a personal mailbox");
  if (phone && !/^[+0-9 ()-]{7,32}$/.test(phone)) errors.push("business_phone must be 7-32 characters of digits and + ( ) -");
  if (!EMIRATES.includes(emirate as (typeof EMIRATES)[number])) errors.push(`emirate must be one of: ${EMIRATES.join(", ")}`);
  if (args.confirmed !== true) errors.push("confirmed must be exactly true, set only after the human has approved sending this");
  if (key.length < 8) errors.push("idempotency_key must be at least 8 characters");
  if (!["en", "ar"].includes(lang)) errors.push("language must be 'en' or 'ar'");

  if (errors.length) {
    return toolResult(id, `Rejected: ${errors.join("; ")}.`, true);
  }

  // 4. Rate limit: 5 demo requests per IP per hour.
  if (!(await rateLimit(ip, "demo", 5, 3600))) {
    return toolResult(id, "Rate limit reached: 5 demo requests per hour. Contact hello@sanad.im directly.", true);
  }

  // 5. Idempotency: replay the previous outcome rather than sending twice.
  let store: { get: (k: string) => Promise<unknown>; set: (k: string, v: string) => Promise<unknown> } | null = null;
  try {
    const { getStore } = await import("netlify:blobs");
    store = getStore("demo-requests");
    const seen = await store.get(`idem:${key}`);
    if (seen) {
      return toolResult(id, `Already received. ${seen}`);
    }
  } catch {
    store = null;
  }

  // 6. Deliver. Success is claimed only if this actually succeeds.
  const form = new URLSearchParams({
    "form-name": "demo-request",
    clinic: clinic,
    email,
    phone,
    emirate,
    preferred_time: s("preferred_contact_time"),
    language: lang,
    source: "mcp:request_demo",
    idempotency_key: key,
  });

  const delivery = await fetch(`${SITE}/`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  if (!delivery.ok) {
    return toolResult(
      id,
      `Not delivered (upstream responded ${delivery.status}). Nothing has been recorded. Contact hello@sanad.im or https://wa.me/971507677581 instead.`,
      true,
    );
  }

  const receipt = `Request received for ${clinic} (${emirate}). A founder replies personally, usually by WhatsApp, within one business day. Reference: ${key}. No patient data was submitted or stored.`;

  try {
    await store?.set(`idem:${key}`, receipt);
  } catch {
    /* delivery already succeeded; idempotency is best-effort */
  }

  // Audit trail: visible in Netlify edge-function logs, no personal data beyond
  // the clinic business contact the caller supplied.
  console.log(JSON.stringify({ event: "request_demo", clinic, emirate, key, ip, at: new Date().toISOString() }));

  return toolResult(id, receipt);
}

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

  if (request.method === "GET") {
    return json({
      serverInfo: SERVER,
      protocolVersion: PROTOCOL_VERSION,
      transport: { type: "streamable-http", endpoint: `${SITE}/mcp` },
      capabilities: { tools: { listChanged: false } },
      tools: [...READ_ONLY.map((t) => t.name), "request_demo"],
    });
  }

  if (request.method !== "POST") return rpcError(null, -32600, "Use POST for JSON-RPC");

  const ip = request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("cf-connecting-ip") ?? "unknown";

  let body: { id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    const raw = await request.text();
    if (raw.length > 20000) return rpcError(null, -32600, "Request body too large");
    body = JSON.parse(raw);
  } catch {
    return rpcError(null, -32700, "Parse error");
  }

  const { id, method, params } = body;

  try {
    switch (method) {
      case "initialize":
        return json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            serverInfo: SERVER,
            capabilities: { tools: { listChanged: false } },
            instructions:
              "Sanad is a voice-first WhatsApp AI receptionist for dental and aesthetics clinics in Dubai. Five tools are read-only. request_demo submits a clinic's own business contact details and requires explicit human confirmation. Never send patient names, symptoms, medical records or appointment details to any tool here. Sanad never provides medical advice.",
          },
        });

      case "notifications/initialized":
        return new Response(null, { status: 202, headers: CORS });

      case "ping":
        return json({ jsonrpc: "2.0", id, result: {} });

      case "tools/list":
        return json({
          jsonrpc: "2.0",
          id,
          result: {
            tools: [
              ...READ_ONLY.map((t) => ({
                name: t.name,
                title: t.title,
                description: t.description,
                inputSchema: EMPTY_SCHEMA,
                annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
              })),
              {
                name: "request_demo",
                title: "Request a demo",
                description:
                  "Submit a Dubai-area clinic's own business contact details to request a 15-minute demo. Requires explicit human confirmation. Rejects patient names, symptoms, medical records and appointment details. This is not appointment booking.",
                inputSchema: DEMO_SCHEMA,
                annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
              },
            ],
          },
        });

      case "tools/call": {
        const name = (params as { name?: string } | undefined)?.name;
        const args = ((params as { arguments?: Record<string, unknown> } | undefined)?.arguments ?? {}) as Record<string, unknown>;

        if (name === "request_demo") return handleRequestDemo(id, args, ip);

        const tool = READ_ONLY.find((t) => t.name === name);
        if (!tool) return rpcError(id, -32602, `Unknown tool: ${name ?? "(none)"}`);

        if (!(await rateLimit(ip, "read", 120, 60))) {
          return toolResult(id, "Rate limit reached: 120 read calls per minute.", true);
        }

        const res = await fetch(`${SITE}${tool.source}`);
        if (!res.ok) return toolResult(id, `Upstream document ${tool.source} unavailable (${res.status}).`, true);
        return toolResult(id, await res.text());
      }

      default:
        return rpcError(id, -32601, `Method not found: ${method ?? "(none)"}`);
    }
  } catch {
    // Never leak a stack trace or environment detail to a caller.
    return rpcError(id, -32603, "Internal error");
  }
}

export const config: Config = { path: "/mcp" };
