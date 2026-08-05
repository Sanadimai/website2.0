import type { MetadataRoute } from "next";

// Static export: emit the file at build time instead of serving it dynamically.
export const dynamic = "force-static";

const SITE = "https://sanad.im";

// Both languages are separate URLs, each pointing at the other via hreflang.
// /demo is deliberately absent — it is a component sandbox, not brand content.
const PAGES = [
  { path: "", priority: 1 as const },
  { path: "/privacy", priority: 0.4 as const },
  { path: "/terms", priority: 0.4 as const },
  { path: "/dpa", priority: 0.6 as const },
  { path: "/trust", priority: 0.7 as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, priority }) => {
    const languages = { "en-AE": `${SITE}${path}`, "ar-AE": `${SITE}/ar${path}` };
    const changeFrequency = path === "" ? ("weekly" as const) : ("yearly" as const);

    return [
      {
        url: `${SITE}${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: `${SITE}/ar${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });
}
