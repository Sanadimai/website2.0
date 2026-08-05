export const dynamic = "force-static";

/**
 * GET /api/v1/security-summary — the commitments already published in the DPA
 * and privacy policy, in machine-readable form. Nothing here is new; every
 * claim maps to a page a procurement reviewer can open.
 */
export function GET() {
  return Response.json({
    dataResidency: {
      region: "AE",
      claim: "Every stateful component runs on in-country infrastructure by architecture.",
      evidence: "https://sanad.im/dpa",
    },
    audio: {
      storesRawAudio: false,
      claim: "Voice notes are transcribed in memory. Raw audio is never stored.",
    },
    medicalRecords: { collected: false },
    dpa: {
      available: true,
      alignedTo: "UAE PDPL",
      breachNotificationHours: 72,
      deletionOnExit: true,
      url: "https://sanad.im/dpa",
    },
    scope: {
      limitedTo: ["appointment scheduling", "patient communication logistics", "administrative automation"],
      excludes: ["medical advice", "diagnosis", "triage", "treatment recommendations"],
    },
    humanHandoff: {
      supported: true,
      trigger: "Patient types 'human' or «أريد التحدث مع شخص», or Sanad is not confident.",
    },
    policies: {
      privacy: "https://sanad.im/privacy",
      terms: "https://sanad.im/terms",
      dpa: "https://sanad.im/dpa",
      trustCentre: "https://sanad.im/trust",
    },
    securityContact: "hello@sanad.im",
    caveat:
      "These are the published commitments. Independent third-party attestation is not yet available; Sanad is pre-launch.",
  });
}
