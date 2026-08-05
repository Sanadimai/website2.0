import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "ما الذي يجمعه سند من زوّار الموقع واستفسارات العيادات، ولماذا، وما الذي يمكنك طلب حذفه.",
  alternates: {
    canonical: "/ar/privacy",
    languages: { "en-AE": "/privacy", "ar-AE": "/ar/privacy", "x-default": "/privacy" },
  },
  openGraph: { url: "/ar/privacy", locale: "ar_AE", alternateLocale: "en_AE" },
};

export default function Page() {
  return <LegalPage slug="privacy" lang="ar" />;
}
