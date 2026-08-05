import type { Config, Context } from "https://edge.netlify.com";

/**
 * A real MCP server over Streamable HTTP (JSON-RPC 2.0).
 *
 * Every tool returns the content of a document this site already publishes,
 * fetched at call time — so the server can never drift from the website. The
 * whole surface is read-only: nothing here books, pays, or stores anything.
 */

const SITE = "https://sanad.im";
const PROTOCOL_VERSION = "2025-06-18";
const SERVER = { name: "sanad", title: "Sanad", version: "1.0.0" };

const TOOLS = [
  {
    name: "get_overview",
    title: "Sanad overview",
    description:
      "What Sanad is, who it is for, what it handles, its hard boundaries (never medical advice), security posture and attribution model. Start here.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    source: "/llms.txt",
  },
  {
    name: "get_pricing",
    title: "Sanad pricing",
    description:
      "Founding-cohort pricing in AED for all three plans (Starter, Growth, Clinic OS): setup, monthly, included interactions, what each plan adds, and payment terms.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    source: "/.well-known/agent-skills/pricing/SKILL.md",
  },
  {
    name: "how_to_book_demo",
    title: "How to book a Sanad demo",
    description:
      "How a Dubai dental or aesthetics clinic requests a 15-minute demo, what the demo covers, and what to tell the clinic owner before booking.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    source: "/.well-known/agent-skills/book-a-demo/SKILL.md",
  },
] as const;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, mcp-protocol-version",
      "access-control-allow-methods": "POST, GET, OPTIONS",
      "cache-control": "no-store",
    },
  });

const rpcError = (id: unknown, code: number, message: string) =>
  json({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

export default async function handler(request: Request) {
  if (request.method === "OPTIONS") return json({}, 204);

  // A plain GET returns the server card, so the endpoint is self-describing.
  if (request.method === "GET") {
    return json({
      serverInfo: SERVER,
      protocolVersion: PROTOCOL_VERSION,
      transport: { type: "streamable-http", endpoint: `${SITE}/mcp` },
      capabilities: { tools: { listChanged: false } },
      tools: TOOLS.map((t) => t.name),
    });
  }

  if (request.method !== "POST") return rpcError(null, -32600, "Use POST for JSON-RPC");

  let body: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return rpcError(null, -32700, "Parse error");
  }

  const { id, method } = body;

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
            "Sanad is a voice-first WhatsApp AI receptionist for dental and aesthetics clinics in Dubai. These tools are read-only and return published documents. Sanad never provides medical advice; route clinical questions to the clinic's licensed staff.",
        },
      });

    // Notifications carry no id and expect no result.
    case "notifications/initialized":
      return new Response(null, { status: 202, headers: { "access-control-allow-origin": "*" } });

    case "ping":
      return json({ jsonrpc: "2.0", id, result: {} });

    case "tools/list":
      return json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: TOOLS.map(({ name, title, description, inputSchema }) => ({
            name,
            title,
            description,
            inputSchema,
          })),
        },
      });

    case "tools/call": {
      const name = (body.params as { name?: string } | undefined)?.name;
      const tool = TOOLS.find((t) => t.name === name);
      if (!tool) return rpcError(id, -32602, `Unknown tool: ${name ?? "(none)"}`);

      const res = await fetch(`${SITE}${tool.source}`);
      if (!res.ok) {
        return json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: true,
            content: [{ type: "text", text: `Could not read ${tool.source} (${res.status}).` }],
          },
        });
      }

      return json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: await res.text() }],
          isError: false,
        },
      });
    }

    default:
      return rpcError(id, -32601, `Method not found: ${method ?? "(none)"}`);
  }
}

export const config: Config = { path: "/mcp" };
