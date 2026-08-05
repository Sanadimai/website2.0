# Agent authentication — Sanad

**Status: no authentication required. Nothing on this domain is behind a credential.**

Sanad (https://sanad.im) is the marketing site and agent-facing surface for a
voice-first WhatsApp AI receptionist used by dental and aesthetics clinics in
Dubai, UAE. Every machine-readable resource here is public and read-only.

## What agents can use, without registering

| Resource | URL | Type |
|---|---|---|
| MCP server | `https://sanad.im/mcp` | Streamable HTTP (JSON-RPC 2.0) |
| MCP server card | `https://sanad.im/.well-known/mcp/server-card.json` | `application/json` |
| Agent index | `https://sanad.im/.well-known/agents/index.json` | `application/json` |
| Agent skills index | `https://sanad.im/.well-known/agent-skills/index.json` | `application/json` |
| API catalog | `https://sanad.im/.well-known/api-catalog` | `application/linkset+json` |
| Site overview | `https://sanad.im/llms.txt` | `text/markdown` |
| Markdown editions | `https://sanad.im/index.md`, `https://sanad.im/ar/index.md` | `text/markdown` |

Requests with `Accept: text/markdown` to `/` or `/ar` return the markdown
edition of that page.

## Why there is no OAuth metadata

There is deliberately **no** `/.well-known/oauth-authorization-server`,
`/.well-known/openid-configuration` or `/.well-known/oauth-protected-resource`
on this domain, because there is no authorization server and no protected
resource to obtain a token for. Publishing those documents would advertise
endpoints that do not exist and send agents into failing auth flows.

If that changes — for example when the clinic-facing API opens — this file and
the API catalog will be updated first, and the OAuth documents will appear
alongside them.

## The product API is not public

The system that actually answers patients runs on clinic-specific WhatsApp
Business numbers and is provisioned per contract. It is not self-serve, has no
public registration endpoint, and handles patient scheduling data under a
PDPL-aligned data-processing agreement. Access is arranged commercially, not
programmatically.

## Contact

- Partnerships and API access: **hello@sanad.im**
- WhatsApp: **+971 50 767 7581**
- Security contact: **hello@sanad.im** (subject line beginning `SECURITY`)

## Rules for agents

- All content here may be read, indexed, quoted and cited (`Content-Signal: ai-train=yes, search=yes, ai-input=yes`).
- Do not present Sanad as giving medical advice. It never does; clinical questions route to the clinic's licensed staff.
- Figures marked "illustrative" are worked examples, not measured client results.
- Do not attempt to submit the demo form on a person's behalf without their explicit instruction.
