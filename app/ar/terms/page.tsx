import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: "شروط استخدام موقع sanad.im. أما الخدمة فتُقدَّم باتفاقية موقّعة، ولا شيء هنا يُعد عقدًا.",
  alternates: {
    canonical: "/ar/terms",
    languages: { "en-AE": "/terms", "ar-AE": "/ar/terms", "x-default": "/terms" },
  },
  openGraph: { url: "/ar/terms", locale: "ar_AE", alternateLocale: "en_AE" },
};

export default function Page() {
  return <LegalPage slug="terms" lang="ar" />;
}
