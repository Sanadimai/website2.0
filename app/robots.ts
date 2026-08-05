import type { MetadataRoute } from "next";

// Static export: emit the file at build time instead of serving it dynamically.
export const dynamic = "force-static";

/**
 * Every AI crawler named explicitly and allowed.
 *
 * A blanket `User-agent: *  Allow: /` already permits them, but several of these
 * agents (Google-Extended, Applebot-Extended, Meta-ExternalAgent) are pure
 * opt-out switches that operators check by name — and an explicit Allow line is
 * the unambiguous signal that Sanad wants to be read, quoted and cited.
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google / Apple / Microsoft
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "bingbot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Meta
  "meta-externalagent",
  "meta-externalfetcher",
  "FacebookBot",
  // Others
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "cohere-ai",
  "cohere-training-data-crawler",
  "YouBot",
  "CCBot",
  "AI2Bot",
  "Diffbot",
  "Bytespider",
  "PetalBot",
  "Timpibot",
  "omgili",
  "ImagesiftBot",
  "Firecrawl",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://sanad.im/sitemap.xml",
    host: "https://sanad.im",
  };
}
