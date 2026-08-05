import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms covering sanad.im. The service itself is supplied under a signed agreement — nothing here is a contract.",
  alternates: {
    canonical: "/terms",
    languages: { "en-AE": "/terms", "ar-AE": "/ar/terms", "x-default": "/terms" },
  },
};

export default function Page() {
  return <LegalPage slug="terms" lang="en" />;
}
