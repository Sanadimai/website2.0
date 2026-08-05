import Link from "next/link";
import type { Lang } from "@/components/lang";

/**
 * Trust centre. Every row below is either a commitment already written into the
 * DPA, or something verifiable from outside. The "not yet available" section is
 * deliberate: a trust page that hides its gaps is marketing, not evidence.
 */

type Row = { claim: string; detail: string; evidence?: { label: string; href: string } };

const EN = {
  title: "Trust centre",
  updated: "Last updated 5 August 2026",
  status:
    "Sanad is pre-launch. The founding cohort of ten clinics is still open and no client results have been published, because none are yet real and attributable. Everything below is either a contractual commitment or independently checkable — nothing on this page is a projection.",
  commitmentsH: "Commitments",
  commitmentsNote: "Each of these is written into the data-processing agreement every clinic signs.",
  commitments: [
    {
      claim: "Patient data stays in the UAE",
      detail:
        "Every stateful component runs on in-country infrastructure by architecture, not as a configurable setting.",
      evidence: { label: "DPA", href: "/dpa" },
    },
    {
      claim: "Raw audio is never stored",
      detail:
        "Voice notes are transcribed in memory and the recording is discarded. There is no audio archive to subpoena, leak or migrate.",
      evidence: { label: "Privacy policy", href: "/privacy" },
    },
    {
      claim: "Medical records are never collected",
      detail:
        "Sanad's scope is scheduling and logistics. It does not receive, request or store clinical records.",
      evidence: { label: "DPA", href: "/dpa" },
    },
    {
      claim: "Never medical advice",
      detail:
        "Every clinical question triggers one fixed deflection in the patient's language and routes to the clinic's licensed staff. The boundary is contractual, not a prompt instruction.",
    },
    {
      claim: "PDPL-aligned data-processing agreement",
      detail:
        "Scope limited to scheduling data, named sub-processors, 72-hour breach notification, deletion on exit.",
      evidence: { label: "Read the DPA", href: "/dpa" },
    },
    {
      claim: "Human handoff on demand",
      detail:
        "A patient asking for a human stops the bot immediately, as does low confidence. Staff receive the full conversation.",
    },
  ] as Row[],
  subH: "Sub-processors for this website",
  subNote:
    "These are the third parties involved in serving sanad.im itself, verifiable from the response headers and page source. Sub-processors for the clinic-facing product are named individually in each clinic's DPA.",
  subs: [
    ["Netlify", "Static hosting and edge functions for sanad.im"],
    ["Cloudflare", "DNS, CDN and access control in front of the domain"],
    ["Meta / WhatsApp Business", "The messaging channel the product operates on"],
    ["Google Analytics 4", "Aggregate website analytics"],
    ["Microsoft Clarity", "Website usage analytics and session replay"],
  ],
  gapsH: "Not yet available",
  gapsNote:
    "Stating this plainly is the point. A pre-launch company claiming independent assurance it does not have is exactly the behaviour the rest of this site argues against.",
  gaps: [
    "No independent penetration test report has been published.",
    "No SOC 2, ISO 27001 or equivalent certification is held.",
    "No third-party audit of the data-residency claim has been performed.",
    "No measured client results exist, so none are published.",
  ],
  machineH: "For machines",
  machineNote:
    "The same commitments in machine-readable form, for procurement tooling and AI agents.",
  contactH: "Security contact",
  contactNote:
    "Email hello@sanad.im with a subject line beginning SECURITY. The co-founder responsible for security — fifteen years protecting government critical infrastructure — answers these personally, and authors and signs the security whitepaper available on request.",
  back: "← Back to Sanad",
};

const AR = {
  title: "مركز الثقة",
  updated: "آخر تحديث: ٥ أغسطس ٢٠٢٦",
  status:
    "سند في مرحلة ما قبل الإطلاق. دفعة التأسيس المكوّنة من عشر عيادات ما زالت مفتوحة، ولم تُنشر أي نتائج عملاء لأنه لا توجد بعد نتائج حقيقية قابلة للإثبات. كل ما يلي إمّا التزام تعاقدي أو أمر يمكن التحقق منه من الخارج.",
  commitmentsH: "الالتزامات",
  commitmentsNote: "كل بند من هذه البنود مكتوب في اتفاقية معالجة البيانات التي توقّعها كل عيادة.",
  commitments: [
    {
      claim: "بيانات المرضى تبقى داخل الإمارات",
      detail: "كل مكوّن يخزّن البيانات يعمل على بنية تحتية داخل الدولة بحكم التصميم، لا كخيار في الإعدادات.",
      evidence: { label: "اتفاقية البيانات", href: "/ar/dpa" },
    },
    {
      claim: "التسجيل الصوتي الخام لا يُخزَّن أبدًا",
      detail: "تُفرَّغ الرسائل الصوتية في الذاكرة ثم يُتلَف التسجيل. لا يوجد أرشيف صوتي أصلًا.",
      evidence: { label: "سياسة الخصوصية", href: "/ar/privacy" },
    },
    {
      claim: "لا تُجمع السجلات الطبية إطلاقًا",
      detail: "نطاق سند هو المواعيد والشؤون التنظيمية فقط؛ لا يستقبل السجلات السريرية ولا يطلبها ولا يخزّنها.",
      evidence: { label: "اتفاقية البيانات", href: "/ar/dpa" },
    },
    {
      claim: "لا نصيحة طبية أبدًا",
      detail: "كل سؤال طبي يقابله ردّ ثابت بلغة المريض ويُحوَّل إلى الطاقم المرخّص. هذا حدٌّ تعاقدي لا مجرد تعليمات للنموذج.",
    },
    {
      claim: "اتفاقية معالجة بيانات متوافقة مع PDPL",
      detail: "نطاق مقصور على بيانات المواعيد، معالجون فرعيون مسمّون، إخطار بأي اختراق خلال ٧٢ ساعة، وحذف البيانات عند انتهاء التعاقد.",
      evidence: { label: "اقرأ الاتفاقية", href: "/ar/dpa" },
    },
    {
      claim: "تحويل فوري إلى موظف بشري",
      detail: "طلب المريض التحدث مع شخص يوقف البوت فورًا، وكذلك انخفاض ثقة النظام، ويستلم الفريق المحادثة كاملة.",
    },
  ] as Row[],
  subH: "المعالجون الفرعيون لهذا الموقع",
  subNote:
    "هذه هي الأطراف الثالثة المشاركة في تشغيل موقع sanad.im نفسه، ويمكن التحقق منها. أمّا المعالجون الفرعيون للمنتج فيُسمَّون في اتفاقية كل عيادة.",
  subs: [
    ["Netlify", "استضافة الموقع الثابت ووظائف الحافة"],
    ["Cloudflare", "نظام أسماء النطاقات وشبكة التوزيع والتحكم بالوصول"],
    ["Meta / WhatsApp Business", "قناة المراسلة التي يعمل عليها المنتج"],
    ["Google Analytics 4", "تحليلات إجمالية للموقع"],
    ["Microsoft Clarity", "تحليلات استخدام الموقع وتسجيل الجلسات"],
  ],
  gapsH: "غير متوفر بعد",
  gapsNote:
    "ذكر هذا بصراحة هو جوهر الأمر. ادّعاء ضمانات مستقلة غير موجودة يناقض كل ما يقوله هذا الموقع.",
  gaps: [
    "لم يُنشر أي تقرير اختبار اختراق مستقل.",
    "لا نحمل شهادة SOC 2 أو ISO 27001 أو ما يعادلها.",
    "لم يُجرَ تدقيق خارجي لادعاء إقامة البيانات داخل الدولة.",
    "لا توجد نتائج عملاء مقاسة، ولذلك لا يُنشر أي منها.",
  ],
  machineH: "للأنظمة الآلية",
  machineNote: "الالتزامات نفسها بصيغة يقرأها الحاسوب، لأدوات الشراء ووكلاء الذكاء الاصطناعي.",
  contactH: "جهة التواصل الأمني",
  contactNote:
    "راسلنا على hello@sanad.im وابدأ عنوان الرسالة بكلمة SECURITY. يتولى الردّ شخصيًا الشريك المؤسس المسؤول عن الأمن — خمسة عشر عامًا في حماية البنى التحتية الحكومية الحرجة — وهو من يكتب الورقة الأمنية ويوقّعها.",
  back: "→ العودة إلى سند",
};

const MACHINE = [
  { label: "/api/v1/security-summary", href: "/api/v1/security-summary" },
  { label: "/api/v1/capabilities", href: "/api/v1/capabilities" },
  { label: "/openapi.json", href: "/openapi.json" },
  { label: "/llms.txt", href: "/llms.txt" },
];

export function TrustPage({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const t = ar ? AR : EN;

  return (
    <div className="mx-auto max-w-[760px] px-7 py-16">
      <Link href={ar ? "/ar" : "/"} className="text-[0.88rem] font-semibold text-pine hover:text-gold">
        {t.back}
      </Link>

      <h1 className="mt-6 mb-2 text-[clamp(1.9rem,4vw,2.6rem)]">{t.title}</h1>
      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-gold rtl:tracking-normal">
        {t.updated}
      </p>

      <p className="mt-6 rounded-[14px] border border-gold/50 bg-gold-soft/50 p-4 text-[0.86rem] leading-[1.7] text-ink">
        {t.status}
      </p>

      <section className="mt-10">
        <h2 className="mb-1.5 text-[1.15rem] font-semibold">{t.commitmentsH}</h2>
        <p className="mb-4 text-[0.88rem] text-sage">{t.commitmentsNote}</p>
        <ul className="flex flex-col gap-3">
          {t.commitments.map((c) => (
            <li key={c.claim} className="rounded-[14px] border border-border bg-white p-5">
              <div className="flex items-start gap-2.5">
                <span aria-hidden className="mt-0.5 font-bold text-leaf">
                  ✓
                </span>
                <div>
                  <h3 className="text-[1rem] font-semibold">{c.claim}</h3>
                  <p className="mt-1 text-[0.92rem] leading-[1.75] text-sage">{c.detail}</p>
                  {c.evidence && (
                    <Link
                      href={c.evidence.href}
                      className="mt-2 inline-block text-[0.86rem] font-semibold text-pine hover:text-gold"
                    >
                      {c.evidence.label} →
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-1.5 text-[1.15rem] font-semibold">{t.subH}</h2>
        <p className="mb-4 text-[0.88rem] text-sage">{t.subNote}</p>
        <ul className="divide-y divide-border rounded-[14px] border border-border bg-white">
          {t.subs.map(([name, role]) => (
            <li key={name} className="flex flex-wrap justify-between gap-2 px-5 py-3">
              <span className="text-[0.94rem] font-semibold">{name}</span>
              <span className="text-[0.88rem] text-sage">{role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-1.5 text-[1.15rem] font-semibold">{t.gapsH}</h2>
        <p className="mb-4 text-[0.88rem] text-sage">{t.gapsNote}</p>
        <ul className="rounded-[14px] border border-border bg-paper-2 p-5">
          {t.gaps.map((g) => (
            <li key={g} className="mb-2 flex gap-2.5 text-[0.92rem] leading-[1.75] text-sage last:mb-0">
              <span aria-hidden className="text-gold">
                —
              </span>
              {g}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-1.5 text-[1.15rem] font-semibold">{t.machineH}</h2>
        <p className="mb-4 text-[0.88rem] text-sage">{t.machineNote}</p>
        <ul className="flex flex-wrap gap-2">
          {MACHINE.map((m) => (
            <li key={m.href}>
              <a
                href={m.href}
                className="inline-block rounded-full border border-border bg-white px-3.5 py-1.5 font-mono text-[0.8rem] text-pine hover:border-gold"
              >
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-border pt-6">
        <h2 className="mb-1.5 text-[1.15rem] font-semibold">{t.contactH}</h2>
        <p className="text-[0.92rem] leading-[1.8] text-sage">{t.contactNote}</p>
      </section>
    </div>
  );
}
