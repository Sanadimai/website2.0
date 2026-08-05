import type { Metadata } from "next";
import { TrustPage } from "@/components/trust";

export const metadata: Metadata = {
  title: "مركز الثقة",
  description:
    "التزامات سند الأمنية المنشورة — إقامة البيانات داخل الإمارات، عدم تخزين الصوت، عدم جمع السجلات الطبية، واتفاقية معالجة بيانات متوافقة مع PDPL — مع قائمة المعالجين الفرعيين وما هو غير متوفر بعد.",
  alternates: {
    canonical: "/ar/trust",
    languages: { "en-AE": "/trust", "ar-AE": "/ar/trust", "x-default": "/trust" },
  },
};

export default function Page() {
  return <TrustPage lang="ar" />;
}
