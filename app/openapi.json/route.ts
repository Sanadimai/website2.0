export const dynamic = "force-static";

const SITE = "https://sanad.im";

const jsonResponse = (description: string) => ({
  description,
  content: { "application/json": { schema: { type: "object" } } },
});

/** GET /openapi.json — describes the read-only endpoints an agent may call. */
export function GET() {
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "Sanad public agent API",
      version: "1.0.0",
      summary: "Read-only endpoints describing Sanad for AI agents and procurement tooling.",
      description:
        "Every endpoint is public, unauthenticated and read-only. Nothing here books an appointment, takes payment or stores data. Patient-facing scheduling is not exposed publicly: it requires clinic-specific authentication, patient confirmation and audit logging, and is provisioned per contract.",
      contact: { name: "Sanad", email: "hello@sanad.im", url: SITE },
      license: { name: "Proprietary", url: `${SITE}/terms` },
    },
    servers: [{ url: SITE }],
    paths: {
      "/api/v1/capabilities": {
        get: {
          operationId: "getCapabilities",
          summary: "What Sanad does, the languages it speaks, and its hard boundaries",
          tags: ["discovery"],
          responses: { "200": jsonResponse("Capability and boundary description") },
        },
      },
      "/api/v1/packages": {
        get: {
          operationId: "getPackages",
          summary: "Canonical founding-cohort pricing in AED",
          tags: ["commercial"],
          responses: { "200": jsonResponse("Plans, setup and monthly fees, inclusions and terms") },
        },
      },
      "/api/v1/availability": {
        get: {
          operationId: "getAvailability",
          summary: "Founding-cohort slot availability",
          tags: ["commercial"],
          responses: { "200": jsonResponse("Total, claimed and open founding slots") },
        },
      },
      "/api/v1/security-summary": {
        get: {
          operationId: "getSecuritySummary",
          summary: "Published data-residency, retention and scope commitments",
          tags: ["trust"],
          responses: { "200": jsonResponse("Security and compliance commitments with evidence links") },
        },
      },
    },
    webhooks: {},
    components: {},
    externalDocs: {
      description:
        "Overview (llms.txt), MCP server (/mcp), A2A agent card (/.well-known/agent-card.json) and trust centre (/trust)",
      url: `${SITE}/llms.txt`,
    },
  });
}
