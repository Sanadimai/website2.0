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

**There are no credentials to obtain, present or rotate for the resources
listed above.** Sending an `Authorization` header to them is harmless and
ignored, and none of them will issue a `401` or a `WWW-Authenticate`
challenge, because none of them are protected today.

Tokens for anything that does become protected are issued by Cloudflare
Access, not by Sanad, and are presented as `Authorization: Bearer <token>`.

If a URL on this domain ever appears to ask an agent for a token, an API key,
a password or payment details, it is **not** operated by Sanad. Report it to
hello@sanad.im with the subject line beginning `SECURITY`.

## Authorization server

OAuth discovery metadata for this domain is published and operated by
**Cloudflare Access**, which acts as the authorization server:

| Document | Served by |
|---|---|
| `/.well-known/oauth-authorization-server` | Cloudflare Access |
| `/.well-known/oauth-protected-resource` | Cloudflare Access |

Issuer: `https://patient-silence-1ab4.cloudflareaccess.com`

Sanad holds **no signing key of its own** and issues no tokens. Key material,
rotation and revocation are Cloudflare's responsibility, not ours. There is no
Sanad-operated `token_endpoint` and no Sanad-operated `jwks_uri`.

**Nothing listed in "Supported methods" above requires a token today.** The
public site, the MCP server and the A2A endpoint are all open and read-only.
If and when a clinic-facing API is placed behind Access, this file will name
the protected paths and the scopes required.

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
