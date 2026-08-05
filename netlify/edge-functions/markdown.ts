import type { Config, Context } from "https://edge.netlify.com";

/**
 * Markdown for Agents.
 *
 * Browsers keep getting HTML. A client that explicitly asks for text/markdown
 * gets the hand-written markdown edition of the same page instead. Anything
 * that merely tolerates markdown via a catch-all wildcard still gets HTML, so
 * normal browsers and crawlers are unaffected.
 */
const MARKDOWN: Record<string, string> = {
  "/": "/index.md",
  "/ar": "/ar/index.md",
};

function wantsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  // Only an explicit text/markdown counts — never a bare */* wildcard.
  return accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .includes("text/markdown");
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const source = MARKDOWN[path];

  if (!source || !wantsMarkdown(request.headers.get("accept"))) {
    return context.next();
  }

  const res = await fetch(new URL(source, url.origin));
  if (!res.ok) return context.next();

  const body = await res.text();

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      // Rough token estimate (~4 characters per token) so agents can budget.
      "x-markdown-tokens": String(Math.ceil(body.length / 4)),
      "content-language": path === "/ar" ? "ar" : "en",
      vary: "Accept",
      "cache-control": "public, max-age=3600",
    },
  });
}

export const config: Config = { path: ["/", "/ar"] };
