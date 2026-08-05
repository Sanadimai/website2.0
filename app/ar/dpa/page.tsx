import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "ملخّص معالجة البيانات",
  description: "ملخّص واضح لاتفاقية معالجة البيانات المتوافقة مع قانون حماية البيانات التي توقّعها كل عيادة قبل الإطلاق.",
  alternates: {
    canonical: "/ar/dpa",
    languages: { "en-AE": "/dpa", "ar-AE": "/ar/dpa", "x-default": "/dpa" },
  },
  openGraph: { url: "/ar/dpa", locale: "ar_AE", alternateLocale: "en_AE" },
};

export default function Page() {
  return <LegalPage slug="dpa" lang="ar" />;
}
