import type { Lang } from "@/components/lang";
import { FAQS, PLANS } from "@/lib/content";

export const SITE = "https://sanad.im";

/**
 * Structured data. Google reads it for rich results; LLM crawlers read it to
 * answer questions about Sanad without hallucinating. Every fact below comes
 * from the page copy — nothing invented.
 */
export function JsonLd({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const url = ar ? `${SITE}/ar` : SITE;

  const org = {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: ar ? "سند" : "Sanad",
    alternateName: ar ? "Sanad" : "سند",
    url: SITE,
    email: "hello@sanad.im",
    description: ar
      ? "موظف استقبال ذكي يعمل بالصوت أولًا عبر واتساب لعيادات الأسنان والتجميل في دبي."
      : "Voice-first WhatsApp AI receptionist for dental and aesthetics clinics in Dubai.",
    logo: `${SITE}/og.png`,
    areaServed: { "@type": "City", name: "Dubai", containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@sanad.im",
      telephone: "+971507677581",
      availableLanguage: ["en", "ar"],
    },
    founder: [
      {
        "@type": "Person",
        name: "Ahmed Soudi",
        jobTitle: ar ? "شريك مؤسس · الرئيس التنفيذي" : "Co-founder & CEO",
      },
      {
        "@type": "Person",
        name: ar ? "رامي ك." : "Ramy K.",
        jobTitle: ar ? "شريك مؤسس · التقنية والأمن" : "Co-founder, CTO & Security",
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Sanad",
    inLanguage: ar ? "ar-AE" : "en-AE",
    publisher: { "@id": `${SITE}/#organization` },
  };

  const service = {
    "@type": "Service",
    "@id": `${SITE}/#service`,
    name: ar ? "سند — استقبال واتساب بالذكاء الاصطناعي" : "Sanad — WhatsApp AI receptionist",
    serviceType: ar ? "استقبال ومواعيد للعيادات" : "Clinic reception and appointment booking",
    provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "City", name: "Dubai" },
    availableLanguage: ["ar", "en"],
    audience: {
      "@type": "Audience",
      audienceType: ar
        ? "عيادات الأسنان والتجميل في دبي"
        : "Dental and aesthetics clinics in Dubai",
    },
    description: ar
      ? "يفهم سند رسائل واتساب الصوتية بالعربية الخليجية والإنجليزية، ويرد خلال ثوانٍ على مدار الساعة، ويحجز المواعيد مباشرة في تقويم العيادة. لا يقدّم نصيحة طبية."
      : "Sanad understands WhatsApp voice notes in Gulf Arabic and English, replies in seconds 24/7, and books appointments straight into the clinic calendar. Never medical advice.",
    offers: PLANS.map((p) => ({
      "@type": "Offer",
      name: p.plan,
      description: ar ? p.for.ar : p.for.en,
      url: `${url}#pricing`,
      priceCurrency: "AED",
      price: p.now.replace(/[^\d]/g, ""),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/LimitedAvailability",
      eligibleCustomerType: "https://schema.org/Business",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/Subscription",
        price: p.monthly.replace(/[^\d]/g, ""),
        priceCurrency: "AED",
        billingIncrement: 1,
        unitCode: "MON",
      },
    })),
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: ar ? "ar-AE" : "en-AE",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: ar ? f.ar[0] : f.en[0],
      acceptedAnswer: { "@type": "Answer", text: ar ? f.ar[1] : f.en[1] },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, website, service, faq],
  };

  return (
    <script
      type="application/ld+json"
      // Data is authored above, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      suppressHydrationWarning
    />
  );
}
