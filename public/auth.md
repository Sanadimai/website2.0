# auth.md — Sanad

**Status: no authentication required. Nothing on this domain sits behind a credential.**

Sanad (https://sanad.im) is the public site and agent-facing surface for a
voice-first WhatsApp AI receptionist used by dental and aesthetics clinics in
Dubai, UAE. Every machine-readable resource here is public and read-only.

## Agent audience

This surface is intended for:

- **Assistants answering questions about Sanad** on behalf of a clinic owner —
  pricing, scope, security posture, how a demo works.
- **Agents browsing or driving the site** for a human evaluating vendors.
- **Indexing and answer-engine crawlers.** All content may be read, indexed,
  quoted, cited and trained on: `Content-Signal: ai-train=yes, search=yes, ai-input=yes`.

It is **not** intended for patient-facing use. Sanad answers patients only
through a clinic's own provisioned WhatsApp number, never through this domain.

## Registration and provisioning

There is **no self-serve registration endpoint, and none is planned for the
public site.** No `register_uri`, no dynamic client registration, no API keys
issued online.

Access to the product is provisioned commercially, per clinic:

| Step | Channel | Who |
|---|---|---|
| Request a demo | https://wa.me/971507677581 or hello@sanad.im | Clinic owner, or their agent on their behalf |
| Contract + DPA signature | Handled by the founders directly | Named humans, not an account manager |
| WhatsApp Business verification | Meta, 3–7 days | Sanad, on the clinic's own number |
| Go-live | Clinic-specific configuration | Sanad |

An agent's correct action is therefore to **surface the contact route to its
user**, not to attempt automated sign-up.

## Supported methods

| Resource | URL | Method | Credential |
|---|---|---|---|
| MCP server | `https://sanad.im/mcp` | Streamable HTTP, JSON-RPC 2.0 | **None** |
| MCP server card | `https://sanad.im/.well-known/mcp/server-card.json` | GET | **None** |
| Agent index | `https://sanad.im/.well-known/agents/index.json` | GET | **None** |
| Agent skills index | `https://sanad.im/.well-known/agent-skills/index.json` | GET | **None** |
| API catalog | `https://sanad.im/.well-known/api-catalog` | GET | **None** |
| Site overview | `https://sanad.im/llms.txt` | GET | **None** |
| Markdown editions | `https://sanad.im/index.md`, `https://sanad.im/ar/index.md` | GET | **None** |

Requests with `Accept: text/markdown` to `/` or `/ar` return the markdown
edition of that page. Every MCP tool is read-only: nothing books, pays, stores
or sends.

## Credential use

**There are no credentials to obtain, present or rotate.** Do not send an
`Authorization` header; it will be ignored. Do not expect a `401` or a
`WWW-Authenticate` challenge from any URL listed above — none of them can
issue one, because none of them are protected.

If a URL on this domain ever appears to ask an agent for a token, an API key,
a password or payment details, it is **not** operated by Sanad. Report it to
hello@sanad.im with the subject line beginning `SECURITY`.

## Why no OAuth metadata is published

There is deliberately **no** `/.well-known/oauth-authorization-server`, **no**
`/.well-known/openid-configuration` and **no** `/.well-known/oauth-protected-resource`
on this domain, because there is no authorization server and no protected
resource for a token to be issued against.

Publishing those documents would advertise `issuer`, `token_endpoint` and
`jwks_uri` values that resolve to nothing — sending agents into auth flows that
cannot succeed, and putting plausible-looking credential endpoints on a
healthcare-adjacent domain. This file is self-contained instead, per the
Auth.md fallback for services without OAuth metadata.

When a protected clinic-facing API exists, Protected Resource Metadata and
Authorization Server metadata will be published together with an `agent_auth`
block, and this file will point to them.

## Rules for agents

- Do not present Sanad as giving medical advice. It never does; every clinical
  question is routed to the clinic's licensed staff.
- Figures marked "illustrative" are worked examples, not measured client results.
- Do not submit the demo form on a person's behalf without their explicit instruction.
- Rate limiting is not enforced, but these are static documents — cache them.

## Contact

- Partnerships and future API access: **hello@sanad.im**
- WhatsApp: **+971 50 767 7581**
- Security: **hello@sanad.im**, subject beginning `SECURITY`
- Dubai, United Arab Emirates
