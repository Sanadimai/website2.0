import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "Data Processing Summary",
  description: "Plain-language summary of the PDPL-aligned Data Processing Agreement every Sanad clinic signs before go-live.",
  alternates: {
    canonical: "/dpa",
    languages: { "en-AE": "/dpa", "ar-AE": "/ar/dpa", "x-default": "/dpa" },
  },
};

export default function Page() {
  return <LegalPage slug="dpa" lang="en" />;
}
