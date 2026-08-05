import type { Metadata } from "next";
import { TrustPage } from "@/components/trust";

export const metadata: Metadata = {
  title: "Trust centre",
  description:
    "Sanad's published security commitments — UAE data residency, no stored audio, no medical records, a PDPL-aligned DPA — plus the sub-processors behind sanad.im and an explicit list of assurances not yet available.",
  alternates: {
    canonical: "/trust",
    languages: { "en-AE": "/trust", "ar-AE": "/ar/trust", "x-default": "/trust" },
  },
};

export default function Page() {
  return <TrustPage lang="en" />;
}
