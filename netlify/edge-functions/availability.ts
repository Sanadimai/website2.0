import type { Config } from "https://edge.netlify.com";

/**
 * GET /api/v1/availability — founding-slot availability.
 *
 * Reads a Netlify Blob so the founders can change the number without a deploy.
 * If the store is unavailable or empty it falls back to the published default
 * and says so, rather than guessing or reporting a stale figure silently.
 */
const TOTAL = 10;

export default async function handler() {
  let taken: number | null = null;
  let source = "default";

  try {
    const { getStore } = await import("netlify:blobs");
    const store = getStore("founding-cohort");
    const raw = await store.get("slots-taken");
    if (raw !== null && raw !== undefined && `${raw}`.trim() !== "") {
      const parsed = Number(`${raw}`.trim());
      if (Number.isInteger(parsed) && parsed >= 0 && parsed <= TOTAL) {
        taken = parsed;
        source = "blob";
      }
    }
  } catch {
    // Store not provisioned yet — fall through to the default.
  }

  const claimed = taken ?? 0;
  const open = TOTAL - claimed;

  return Response.json(
    {
      cohort: "founding",
      total: TOTAL,
      claimed,
      open,
      isOpen: open > 0,
      source,
      note:
        source === "default"
          ? "No live count has been recorded yet; showing the published starting figure."
          : "Live count maintained by the Sanad founders.",
      updatedAt: new Date().toISOString(),
      contact: "https://wa.me/971507677581",
    },
    {
      headers: {
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=300",
      },
    },
  );
}

export const config: Config = { path: "/api/v1/availability" };
