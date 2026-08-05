import type { Metadata } from "next";
import { Site } from "@/components/site";

export const metadata: Metadata = {
  title: "سند — موظف استقبال ذكي بالصوت لعيادات الأسنان والتجميل في دبي",
  description:
    "يفهم سند رسائل واتساب الصوتية بالعربية الخليجية والإنجليزية لعيادات الأسنان والتجميل في دبي، ويرد خلال ثوانٍ على مدار الساعة ويحجز المواعيد في تقويمك. لا نصيحة طبية أبدًا، وبيانات المرضى تبقى داخل الإمارات.",
  alternates: {
    canonical: "/ar",
    languages: { "en-AE": "/", "ar-AE": "/ar", "x-default": "/" },
  },
  openGraph: {
    url: "/ar",
    locale: "ar_AE",
    alternateLocale: "en_AE",
    title: "سند — موظف استقبال ذكي بالصوت لعيادات الأسنان والتجميل في دبي",
    description:
      "مرضاك يرسلون رسائل صوتية بالعربية. سند يسمعهم، ويرد خلال ثوانٍ، ويحجز الموعد — على مدار الساعة. لا نصيحة طبية أبدًا.",
  },
};

export default function ArabicHome() {
  return <Site lang="ar" />;
}
