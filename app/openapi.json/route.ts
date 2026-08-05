import { PLANS, REVENUE_MODEL, monthlyLeakageAed } from "@/lib/content";

export const dynamic = "force-static";

const SITE = "https://sanad.im";

const errorResponse = (description: string) => ({
  description,
  content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
});

const ok = (description: string, ref: string) => ({
  description,
  headers: {
    ETag: { schema: { type: "string" }, description: "Strong validator for conditional requests." },
    "Cache-Control": { schema: { type: "string" }, description: "public, max-age=300" },
  },
  content: { "application/json": { schema: { $ref: `#/components/schemas/${ref}` } } },
});

/** GET /openapi.json — the public, read-only API. */
export function GET() {
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "Sanad public agent API",
      version: "2.0.0",
      summary: "Read-only endpoints describing Sanad for AI agents and procurement tooling.",
      description: [
        "Every endpoint here is public, unauthenticated, read-only and safe to call.",
        "",
        "There is no public appointment-booking API and there will not be one. Patient scheduling requires clinic-specific authentication, patient confirmation and audit logging, and is provisioned per contract.",
        "",
        "The only write path Sanad exposes to agents is the request_demo tool on the MCP server at /mcp, which accepts a clinic's own business contact details, requires explicit human confirmation, and rejects patient data.",
      ].join("\n"),
      contact: { name: "Sanad", email: "hello@sanad.im", url: SITE },
      license: { name: "Proprietary", url: `${SITE}/terms` },
      "x-boundaries": {
        medicalAdvice: false,
        diagnosis: false,
        triage: false,
        patientDataAccepted: false,
      },
    },
    servers: [{ url: SITE, description: "Production" }],
    security: [],
    tags: [
      { name: "discovery", description: "What the service is and what it refuses to do" },
      { name: "commercial", description: "Pricing and founding-cohort availability" },
      { name: "trust", description: "Security, privacy and compliance posture" },
    ],
    paths: {
      "/api/v1/capabilities": {
        get: {
          operationId: "getCapabilities",
          summary: "Capabilities, languages, channels and hard boundaries",
          tags: ["discovery"],
          responses: {
            "200": ok("Capability description", "Capabilities"),
            "429": errorResponse("Rate limited"),
            "500": errorResponse("Internal error"),
          },
        },
      },
      "/api/v1/packages": {
        get: {
          operationId: "getPackages",
          summary: "Canonical founding-cohort pricing in AED",
          tags: ["commercial"],
          responses: {
            "200": ok("Pricing packages and terms", "Packages"),
            "429": errorResponse("Rate limited"),
            "500": errorResponse("Internal error"),
          },
        },
      },
      "/api/v1/availability": {
        get: {
          operationId: "getAvailability",
          summary: "Remaining founding-cohort slots",
          tags: ["commercial"],
          responses: {
            "200": ok("Slot availability", "Availability"),
            "429": errorResponse("Rate limited"),
            "500": errorResponse("Internal error"),
          },
        },
      },
      "/api/v1/security-summary": {
        get: {
          operationId: "getSecuritySummary",
          summary: "Published security, residency and DPA commitments",
          tags: ["trust"],
          responses: {
            "200": ok("Security summary with evidence links", "SecuritySummary"),
            "429": errorResponse("Rate limited"),
            "500": errorResponse("Internal error"),
          },
        },
      },
    },
    components: {
      schemas: {
        Error: {
          type: "object",
          required: ["error", "message"],
          properties: {
            error: { type: "string", enum: ["bad_request", "not_found", "rate_limited", "internal"] },
            message: {
              type: "string",
              description: "Human-readable explanation. Never contains a stack trace or secret.",
            },
          },
          examples: [{ error: "rate_limited", message: "Too many requests. Retry after 60 seconds." }],
        },
        Money: { type: "integer", minimum: 0, description: "Whole AED. No fractional dirhams are used." },
        Capabilities: {
          type: "object",
          required: ["service", "status", "languages", "capabilities", "boundaries"],
          properties: {
            service: { type: "string", const: "Sanad" },
            tagline: { type: "string" },
            status: { type: "string", enum: ["pre-launch", "live"] },
            languages: {
              type: "array",
              items: {
                type: "object",
                required: ["code"],
                properties: {
                  code: { type: "string", enum: ["ar", "en"] },
                  variants: { type: "array", items: { type: "string" } },
                },
              },
            },
            channels: { type: "array", items: { type: "string", enum: ["whatsapp"] } },
            capabilities: {
              type: "array",
              minItems: 1,
              items: {
                type: "string",
                enum: [
                  "voice_note_transcription",
                  "appointment_booking",
                  "appointment_reminders",
                  "no_show_recovery",
                  "faq_from_clinic_configuration",
                  "social_lead_capture",
                  "instant_human_handoff",
                ],
              },
            },
            boundaries: {
              type: "object",
              required: ["medicalAdvice", "diagnosis", "triage", "treatmentRecommendations"],
              properties: {
                medicalAdvice: { const: false },
                diagnosis: { const: false },
                triage: { const: false },
                treatmentRecommendations: { const: false },
                note: { type: "string" },
              },
            },
            contact: {
              type: "object",
              properties: {
                whatsapp: { type: "string", format: "uri" },
                email: { type: "string", format: "email" },
              },
            },
          },
        },
        Package: {
          type: "object",
          required: ["id", "name", "setup", "monthly", "includedInteractionsPerMonth"],
          properties: {
            id: { type: "string", enum: PLANS.map((p) => p.plan.toLowerCase().replace(/\s+/g, "-")) },
            name: { type: "string" },
            summary: { type: "string" },
            summaryAr: { type: "string" },
            setup: {
              type: "object",
              required: ["listPrice", "price"],
              properties: {
                listPrice: { $ref: "#/components/schemas/Money" },
                price: { $ref: "#/components/schemas/Money" },
              },
            },
            monthly: { $ref: "#/components/schemas/Money" },
            includedInteractionsPerMonth: { type: "integer", minimum: 0 },
            includes: { type: "array", items: { type: "string" } },
            featured: { type: "boolean" },
          },
        },
        Packages: {
          type: "object",
          required: ["currency", "packages"],
          properties: {
            currency: { type: "string", const: "AED" },
            cohort: { type: "string", enum: ["founding"] },
            discountNote: { type: "string" },
            terms: { type: "object" },
            packages: { type: "array", minItems: 3, items: { $ref: "#/components/schemas/Package" } },
            source: { type: "string", format: "uri" },
          },
          examples: [
            {
              currency: "AED",
              cohort: "founding",
              packages: [
                {
                  id: "growth",
                  name: "Growth",
                  setup: { listPrice: 15000, price: 9000 },
                  monthly: 2500,
                  includedInteractionsPerMonth: 400,
                  featured: true,
                },
              ],
            },
          ],
        },
        Availability: {
          type: "object",
          required: ["total", "claimed", "open", "isOpen", "source"],
          properties: {
            cohort: { type: "string", const: "founding" },
            total: { type: "integer", minimum: 0, maximum: 10 },
            claimed: { type: "integer", minimum: 0, maximum: 10 },
            open: { type: "integer", minimum: 0, maximum: 10 },
            isOpen: { type: "boolean" },
            source: {
              type: "string",
              enum: ["blob", "default"],
              description:
                "'default' means no live count has been recorded yet; the published starting figure is shown.",
            },
            note: { type: "string" },
            updatedAt: { type: "string", format: "date-time" },
          },
          examples: [{ cohort: "founding", total: 10, claimed: 0, open: 10, isOpen: true, source: "default" }],
        },
        SecuritySummary: {
          type: "object",
          required: ["dataResidency", "audio", "dpa", "scope"],
          properties: {
            dataResidency: {
              type: "object",
              required: ["region", "claim"],
              properties: {
                region: { type: "string", const: "AE" },
                claim: { type: "string" },
                evidence: { type: "string", format: "uri" },
              },
            },
            audio: {
              type: "object",
              properties: { storesRawAudio: { const: false }, claim: { type: "string" } },
            },
            medicalRecords: { type: "object", properties: { collected: { const: false } } },
            dpa: {
              type: "object",
              properties: {
                available: { type: "boolean" },
                alignedTo: { type: "string", const: "UAE PDPL" },
                breachNotificationHours: { type: "integer", const: 72 },
                deletionOnExit: { type: "boolean" },
                url: { type: "string", format: "uri" },
              },
            },
            scope: {
              type: "object",
              properties: {
                limitedTo: { type: "array", items: { type: "string" } },
                excludes: { type: "array", items: { type: "string" } },
              },
            },
            caveat: {
              type: "string",
              description: "States plainly that no independent attestation exists yet.",
            },
          },
        },
      },
    },
    "x-illustrative-model": {
      description: "The leakage figure on the homepage is computed from these inputs, never hard-coded.",
      averageConsultationAed: REVENUE_MODEL.averageConsultationAed,
      convertibleMessagesMissedPerDay: REVENUE_MODEL.convertibleMessagesMissedPerDay,
      workingDaysPerMonth: REVENUE_MODEL.workingDaysPerMonth,
      monthlyLeakageAed: monthlyLeakageAed(),
      caveat: "A worked example, not a measured client result.",
    },
    externalDocs: {
      description: "MCP server (/mcp), A2A card, trust centre and llms-full.txt",
      url: `${SITE}/llms-full.txt`,
    },
  });
}
