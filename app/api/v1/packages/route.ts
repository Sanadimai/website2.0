import { PLANS } from "@/lib/content";

export const dynamic = "force-static";

const num = (s: string) => Number(s.replace(/[^\d]/g, ""));

/** GET /api/v1/packages — canonical pricing, derived from the same source the page renders. */
export function GET() {
  return Response.json({
    currency: "AED",
    cohort: "founding",
    discountNote: "40% off setup for the first 10 clinics.",
    terms: {
      setupSplit: "50% on signature, 50% on go-live",
      pilot: "one month",
      term: "six months after pilot",
      addOns: [{ name: "voice reply", monthly: 400, currency: "AED" }],
    },
    packages: PLANS.map((p) => ({
      id: p.plan.toLowerCase().replace(/\s+/g, "-"),
      name: p.plan,
      summary: p.for.en,
      summaryAr: p.for.ar,
      setup: { listPrice: num(p.was), price: num(p.now) },
      monthly: num(p.monthly),
      includedInteractionsPerMonth: num(
        p.items.find((i) => /interactions/i.test(i.en))?.en ?? "0",
      ),
      includes: p.items.map((i) => i.en),
      featured: Boolean(p.featured),
    })),
    source: "https://sanad.im#pricing",
  });
}
