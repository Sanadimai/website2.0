"use client";

import { useEffect } from "react";
import { FAQS, PLANS } from "@/lib/content";
import type { Lang } from "@/components/lang";

// navigator.modelContext is Chrome-only and still behind an origin trial.
type ModelContext = {
  provideContext: (ctx: { tools: unknown[] }) => void;
};

const WHATSAPP = "https://wa.me/971507677581";

/**
 * WebMCP — exposes Sanad's real answers as callable tools, so an agent driving
 * the browser can read pricing or FAQs without scraping the DOM. Read-only by
 * design: nothing here books, pays or submits on the visitor's behalf.
 */
export function WebMcp({ lang }: { lang: Lang }) {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!mc?.provideContext) return; // unsupported browser — no-op

    const ar = lang === "ar";

    const tools = [
      {
        name: "get_pricing",
        description:
          "Get Sanad's founding-cohort pricing for all plans, in AED: one-time setup, monthly fee, and included interactions.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => ({
          currency: "AED",
          note: "Founding cohort, first 10 clinics, 40% off setup. 50% of setup on signature, 50% on go-live.",
          plans: PLANS.map((p) => ({
            plan: p.plan,
            setup: p.now,
            setupBeforeDiscount: p.was,
            monthly: p.monthly,
            summary: ar ? p.for.ar : p.for.en,
            includes: p.items.map((i) => (ar ? i.ar : i.en)),
          })),
        }),
      },
      {
        name: "get_faq",
        description:
          "Answer a question about Sanad from the clinic-owner FAQ: whether it replaces a receptionist, voice notes, medical questions, data residency, human handoff, go-live time, and monthly reporting.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "The visitor's question, in English or Arabic." },
          },
          required: ["query"],
          additionalProperties: false,
        },
        execute: async ({ query }: { query: string }) => {
          const q = (query || "").toLowerCase();
          const scored = FAQS.map((f) => {
            const hay = `${f.en[0]} ${f.en[1]} ${f.ar[0]} ${f.ar[1]}`.toLowerCase();
            const hits = q.split(/\s+/).filter((w) => w.length > 3 && hay.includes(w)).length;
            return { f, hits };
          }).sort((a, b) => b.hits - a.hits);

          const best = scored[0];
          if (!best || best.hits === 0) {
            return {
              matched: false,
              message: ar
                ? "لم أجد إجابة مطابقة. تواصل عبر واتساب أو hello@sanad.im"
                : "No matching FAQ entry. Ask directly via WhatsApp or hello@sanad.im.",
              whatsapp: WHATSAPP,
            };
          }
          return {
            matched: true,
            question: ar ? best.f.ar[0] : best.f.en[0],
            answer: ar ? best.f.ar[1] : best.f.en[1],
          };
        },
      },
      {
        name: "get_contact",
        description:
          "Get how to reach Sanad to request a 15-minute demo for a Dubai dental or aesthetics clinic. Returns links only; it does not send anything.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => ({
          whatsapp: WHATSAPP,
          email: "hello@sanad.im",
          location: "Dubai, United Arab Emirates",
          demo: "15 minutes, on the clinic owner's own phone, in Arabic or English.",
          audience: "Dental and aesthetics clinics in Dubai. Not a service for patients.",
          boundary:
            "Sanad handles scheduling and patient-communication logistics only. It never gives medical advice.",
        }),
      },
    ];

    try {
      mc.provideContext({ tools });
    } catch {
      // Origin trial not active, or a shape change in the draft API. Ignore.
    }
  }, [lang]);

  return null;
}
