import type { MetadataRoute } from "next";

// Static export: emit the file at build time instead of serving it dynamically.
export const dynamic = "force-static";

const SITE = "https://sanad.im";

// Both languages are separate URLs, each pointing at the other via hreflang.
// /demo is deliberately absent — it is a component sandbox, not brand content.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = { "en-AE": SITE, "ar-AE": `${SITE}/ar` };

  return [
    {
      url: SITE,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE}/ar`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    },
  ];
}
