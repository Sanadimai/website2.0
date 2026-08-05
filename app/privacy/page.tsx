import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Sanad collects from sanad.im visitors and clinic enquiries, why, and what you can ask us to delete.",
  alternates: {
    canonical: "/privacy",
    languages: { "en-AE": "/privacy", "ar-AE": "/ar/privacy", "x-default": "/privacy" },
  },
};

export default function Page() {
  return <LegalPage slug="privacy" lang="en" />;
}
