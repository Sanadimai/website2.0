import type { Config, Context } from "https://edge.netlify.com";

/**
 * A2A (agent-to-agent) endpoint, JSON-RPC 2.0.
 *
 * Same honesty rule as /mcp: every answer is the content of a document this
 * site already publishes, fetched at call time. Read-only, no auth, no state,
 * nothing stored. A GET returns the agent card.
 */

const SITE = "https://sanad.im";
const CARD = `${SITE}/.well-known/agent-card.json`;

const SKILLS = [
  {
    id: "pricing",
    source: "/.well-known/agent-skills/pricing/SKILL.md",
    match: /price|pricing|cost|aed|plan|starter|growth|clinic os|fee|monthly|setup|discount|سعر|أسعار|تكلفة|باقة/i,
  },
  {
    id: "book-demo",
    source: "/.well-known/agent-skills/book-a-demo/SKILL.md",
    match: /demo|book|contact|call|whatsapp|email|trial|buy|sign|onboard|go live|حجز|عرض|تواصل|اتصال/i,
  },
  // Overview is the fallback: it answers "what is Sanad" and everything else.
  { id: "overview", source: "/llms.txt", match: /.*/ },
] as const;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "POST, GET, OPTIONS",
      "cache-control": "no-store",
    },
  });

const rpcError = (id: unknown, code: number, message: string) =>
  json({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

/** Flatten an A2A message's parts into one searchable string. */
function textOf(message: unknown): string {
  const parts = (message as { parts?: Array<{ kind?: string; text?: string }> })?.parts ?? [];
  return parts
    .filter((p) => p?.kind === "text" || typeof p?.text === "string")
    .map((p) => p.text ?? "")
    .join(" ");
}

export default async function handler(request: Request, context: Context) {
  if (request.method === "OPTIONS") return json({}, 204);

  // Self-describing: a GET hands back the agent card itself.
  if (request.method === "GET") {
    const card = await fetch(CARD);
    return new Response(await card.text(), {
      status: card.status,
      headers: { "content-type": "application/json", "access-control-allow-origin": "*" },
    });
  }

  if (request.method !== "POST") return rpcError(null, -32600, "Use POST for JSON-RPC");

  let body: { id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return rpcError(null, -32700, "Parse error");
  }

  const { id, method, params } = body;

  if (method === "agent/getAuthenticatedExtendedCard") {
    return rpcError(id, -32601, "No extended card: this agent requires no authentication");
  }

  if (method !== "message/send" && method !== "message/stream") {
    return rpcError(id, -32601, `Method not found: ${method ?? "(none)"}`);
  }

  if (method === "message/stream") {
    return rpcError(id, -32004, "Streaming is not supported; use message/send");
  }

  const query = textOf((params as { message?: unknown } | undefined)?.message);
  const skill = SKILLS.find((s) => s.match.test(query)) ?? SKILLS[SKILLS.length - 1];

  const res = await fetch(`${SITE}${skill.source}`);
  const text = res.ok
    ? await res.text()
    : `Could not read ${skill.source}. Contact hello@sanad.im or https://wa.me/971507677581.`;

  const now = new Date().toISOString();

  return json({
    jsonrpc: "2.0",
    id,
    result: {
      kind: "message",
      role: "agent",
      messageId: crypto.randomUUID(),
      // Echo the caller's context ids when supplied, per A2A.
      contextId: (params as { message?: { contextId?: string } })?.message?.contextId,
      taskId: (params as { message?: { taskId?: string } })?.message?.taskId,
      parts: [{ kind: "text", text }],
      metadata: {
        skillId: skill.id,
        source: `${SITE}${skill.source}`,
        retrievedAt: now,
        boundary:
          "Sanad handles scheduling and patient-communication logistics only. It never provides medical advice; clinical questions route to the clinic's licensed staff.",
      },
    },
  });
}

export const config: Config = { path: "/a2a" };
