import { FOUNDING_SLOTS_TOTAL } from "@/lib/content";

export const dynamic = "force-static";

/** GET /api/v1/capabilities — what Sanad does and, explicitly, what it will not do. */
export function GET() {
  return Response.json({
    service: "Sanad",
    tagline: "Voice-first WhatsApp AI receptionist for dental and aesthetics clinics",
    status: "pre-launch",
    foundingCohort: { total: FOUNDING_SLOTS_TOTAL, availability: "/api/v1/availability" },
    audience: {
      buyers: "Dental and aesthetics clinics in Dubai, UAE",
      notFor: "Patients. Sanad reaches patients only through a clinic's own WhatsApp number.",
    },
    channels: ["whatsapp"],
    languages: [
      { code: "ar", variants: ["Gulf Arabic", "Modern Standard Arabic"] },
      { code: "en" },
    ],
    capabilities: [
      "voice_note_transcription",
      "appointment_booking",
      "appointment_reminders",
      "no_show_recovery",
      "faq_from_clinic_configuration",
      "social_lead_capture",
      "instant_human_handoff",
    ],
    boundaries: {
      medicalAdvice: false,
      diagnosis: false,
      triage: false,
      treatmentRecommendations: false,
      note: "Every clinical question receives one fixed deflection in the patient's language and is routed to the clinic's licensed staff. This boundary is written verbatim into every contract.",
    },
    attribution: {
      model: "tagged at booking time",
      categories: {
        "bot-originated": "Captured by Sanad alone. The only figure in the headline report.",
        "bot-assisted": "Sanad helped, staff finished. Reported separately.",
        staff: "The clinic's own bookings. Excluded by design.",
      },
    },
    contact: { whatsapp: "https://wa.me/971507677581", email: "hello@sanad.im" },
    agentInterfaces: {
      mcp: "https://sanad.im/mcp",
      a2a: "https://sanad.im/a2a",
      openapi: "https://sanad.im/openapi.json",
    },
    disclaimer:
      "Sanad provides appointment scheduling, patient-communication logistics and administrative automation only. Figures marked illustrative are worked examples, not measured client results.",
  });
}
