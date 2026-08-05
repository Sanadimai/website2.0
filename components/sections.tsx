"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, MessageSquareText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { T, useLang } from "@/components/lang";
import { Brand, Btn, Eyebrow, Reveal, SectionTitle } from "@/components/site-ui";
import { FAQS, FOUNDING_SLOTS_OPEN, FOUNDING_SLOTS_TOTAL, PLANS } from "@/lib/content";

/* ------------------------------------------------------------------ FEATURES */

const FEATURES = [
  {
    n: "01",
    en: ["Voice notes, understood", "Patients talk, not type. Sanad transcribes Gulf Arabic and English voice notes in memory and answers in seconds. Raw audio is never stored."],
    ar: ["رسائل صوتية… مفهومة", "مرضاك يتحدثون بدل الكتابة. يفرّغ سند الرسائل الصوتية بالعربية الخليجية والإنجليزية في الذاكرة ويرد خلال ثوانٍ، ولا يُخزّن التسجيل الخام أبدًا."],
  },
  {
    n: "02",
    en: ["Dental & aesthetics booking", "Veneers consultations, Invisalign, cleaning, fillers and laser appointments — confirmed in your calendar without forms, links or another app."],
    ar: ["حجوزات الأسنان والتجميل", "استشارات الفينير والإنفزلاين وتنظيف الأسنان والفيلر والليزر — مواعيد مؤكدة في تقويمك دون نماذج أو روابط أو تطبيق آخر."],
  },
  {
    n: "03",
    en: ["Reminders & no-show recovery", "Approved WhatsApp templates remind patients before visits and re-book the ones who didn't show. Opt-outs respected, always."],
    ar: ["تذكيرات ومتابعة الغياب", "قوالب واتساب معتمدة تذكّر المرضى قبل الموعد وتعيد حجز من تخلّف عن الحضور — مع احترام رغبة من طلب إيقاف الرسائل دائمًا."],
  },
  {
    n: "04",
    en: ["FAQs from your clinic's own facts", "Hours, location, price ranges, insurance accepted — answered from your clinic's configuration, never invented."],
    ar: ["إجابات من معلومات عيادتك نفسها", "الأوقات، الموقع، نطاقات الأسعار، شركات التأمين — من إعدادات عيادتك المعتمدة، ولا يخترع إجابة أبدًا."],
  },
  {
    n: "05",
    en: ["Instagram & social leads", "On Growth, Instagram and social enquiries receive an instant response and move into the same booking flow — without being lost between inboxes."],
    ar: ["عملاء إنستغرام والمنصات الاجتماعية", "في باقة النمو، تتلقى استفسارات إنستغرام والمنصات الاجتماعية ردًا فوريًا وتدخل مسار الحجز نفسه دون أن تضيع بين صناديق الرسائل."],
  },
  {
    n: "06",
    en: ["Instant human handoff", "A patient types “human” (or «أريد التحدث مع شخص») — the bot stops instantly and your staff get the full conversation. Complex cases were always theirs."],
    ar: ["تحويل فوري لموظفيك", "يكتب المريض «أريد التحدث مع شخص» — فيتوقف البوت فورًا ويستلم فريقك المحادثة كاملة. الحالات المعقّدة كانت وستبقى لفريقك."],
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow en="Every message, covered" ar="كل رسالة… مغطّاة" />
          <SectionTitle
            en="Six things that happen while nobody is watching."
            ar="ستة أمور تحدث بينما لا يراقب أحد."
          />
        </Reveal>
        <div className="mt-10 grid gap-3.5 md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.04}>
              <div className="flex h-full gap-[18px] rounded-[18px] border border-border bg-white p-6 transition-colors hover:border-pine/40">
                <span className="min-w-[30px] pt-0.5 font-heading text-[1.05rem] font-semibold text-gold">
                  {f.n}
                </span>
                <div>
                  <h3 className="mb-1.5 text-[1.08rem] font-semibold">
                    <T en={f.en[0]} ar={f.ar[0]} />
                  </h3>
                  <p className="text-[0.92rem] text-sage">
                    <T en={f.en[1]} ar={f.ar[1]} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- HONESTY */

const TAGS = [
  {
    hot: true,
    pill: "bot-originated",
    en: ["Counted in your report", "Bookings Sanad captured alone — after hours, staff demonstrably absent, no human touch."],
    ar: ["يُحسب في تقريرك", "حجوزات التقطها سند وحده — خارج الدوام، دون أي تدخل بشري."],
  },
  {
    hot: false,
    pill: "bot-assisted",
    en: ["Reported separately", "Sanad helped, staff finished. Never silently upgraded into the headline number."],
    ar: ["يُعرض منفصلًا", "ساعد سند وأكمل الموظفون. لا يُرفع خلسة إلى الرقم الرئيسي أبدًا."],
  },
  {
    hot: false,
    pill: "staff",
    en: ["Excluded by design", "Your team's own bookings stay theirs. Ambiguous cases default downward, not up."],
    ar: ["مستبعد بحكم التصميم", "حجوزات فريقك تبقى لفريقك — والحالات الغامضة تُصنَّف بالأدنى لا بالأعلى."],
  },
];

export function Honesty() {
  return (
    <section id="honesty" className="bg-pine py-20 text-[#e8efea]">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow tone="cream" en="Honest numbers" ar="أرقام صادقة" />
          <SectionTitle
            cream
            en="A number you can trust beats a number that impresses."
            ar="رقم تثق به خيرٌ من رقم يبهرك."
          />
          <p className="max-w-[640px] text-[#a9bfb4]">
            <T
              en="You've been shown inflated chatbot dashboards before. Sanad tags every booking at the moment it happens — and your monthly report counts only what we can prove."
              ar="رأيت من قبل لوحات إحصاءات منفوخة. سند يوسم كل حجز لحظة حدوثه — وتقريرك الشهري لا يحسب إلا ما نستطيع إثباته."
            />
          </p>
        </Reveal>

        <div className="my-10 grid gap-3.5 md:grid-cols-3">
          {TAGS.map((t, i) => (
            <Reveal key={t.pill} delay={i * 0.06}>
              <div
                className={`h-full rounded-[18px] border p-6 ${
                  t.hot
                    ? "border-[rgba(201,162,75,.5)] bg-[rgba(201,162,75,.1)]"
                    : "border-[rgba(232,239,234,.16)] bg-white/3"
                }`}
              >
                <span
                  className={`mb-3 inline-block rounded-full border px-3 py-1 font-mono text-[0.74rem] font-bold ${
                    t.hot
                      ? "border-gold bg-gold text-[#231a05]"
                      : "border-[rgba(232,239,234,.25)] text-[#bfd2c8]"
                  }`}
                >
                  {t.pill}
                </span>
                <h3 className="mb-1.5 text-[1.05rem] text-[#f0ebdc]">
                  <T en={t.en[0]} ar={t.ar[0]} />
                </h3>
                <p className="text-[0.9rem] text-[#a9bfb4]">
                  <T en={t.en[1]} ar={t.ar[1]} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <blockquote className="max-w-[720px] border-s-[3px] border-gold px-[22px] py-1.5 font-heading text-[1.35rem] leading-[1.5] text-[#f0ebdc] rtl:font-sans rtl:text-[1.25rem] rtl:font-semibold">
            <T
              en="“If a patient would have booked anyway, it is not on your report. A smaller number — but one you can make a renewal decision on.”"
              ar="«إذا كان المريض سيحجز على أي حال، فلن يظهر في تقريرك. رقم أصغر — لكنه رقم تستطيع أن تبني عليه قرار التجديد.»"
            />
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ SECURITY */

export function Security() {
  const cards = [
    {
      icon: <span className="text-lg">🇦🇪</span>,
      en: ["Patient data stays in the UAE", "Every stateful component runs on in-country infrastructure by architecture — residency is a design decision, not a settings toggle."],
      ar: ["بيانات المرضى تبقى داخل الإمارات", "كل مكوّن يخزّن البيانات يعمل على بنية تحتية داخل الدولة بحكم التصميم — فالإقامة الجغرافية للبيانات قرار هندسي، لا خيارًا في الإعدادات."],
    },
    {
      icon: <FileText className="h-4 w-4 text-pine" aria-hidden />,
      en: ["A PDPL-aligned DPA, signed", "Every clinic signs a data-processing agreement aligned to UAE data-protection law: scope limited to scheduling data, named sub-processors, 72-hour breach notice, deletion on exit."],
      ar: ["اتفاقية معالجة بيانات متوافقة مع PDPL", "توقّع كل عيادة اتفاقية معالجة بيانات متوافقة مع قانون حماية البيانات الإماراتي: نطاق مقصور على بيانات المواعيد، معالجون فرعيون مسمّون، إخطار بأي اختراق خلال ٧٢ ساعة، وحذف البيانات عند انتهاء التعاقد."],
    },
    {
      icon: <MessageSquareText className="h-4 w-4 text-pine" aria-hidden />,
      en: ["Never medical advice. Ever.", "Sanad is scope-limited by design to scheduling and logistics. Every clinical question gets one fixed reply, in the patient's language:"],
      ar: ["لا نصيحة طبية. أبدًا.", "سند محدود النطاق بحكم التصميم: مواعيد وشؤون تنظيمية فقط. كل سؤال طبي يقابله ردّ واحد ثابت وبلغة المريض:"],
      quote: {
        en: "“For medical questions, the doctor will discuss this during your appointment.”",
        ar: "«بالنسبة للأسئلة الطبية، سيناقشها الطبيب معك خلال موعدك.»",
      },
    },
    {
      icon: <ShieldCheck className="h-4 w-4 text-pine" aria-hidden />,
      en: ["A whitepaper someone signs", "Our security whitepaper is authored and signed by our co-founder — fifteen years securing government critical infrastructure. It maps exactly what the system touches, and what it never touches."],
      ar: ["ورقة أمنية يوقّعها مسؤول حقيقي", "ورقتنا الأمنية يكتبها ويوقّعها شريكنا المؤسس — ١٥ عامًا في تأمين البنى التحتية الحكومية الحرجة. توضح بدقة ما يلمسه النظام، وما لا يلمسه أبدًا."],
    },
  ];

  return (
    <section id="security" className="py-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow en="Security & compliance" ar="الأمان والامتثال" />
          <SectionTitle
            en="Compliance is the architecture, not a promise."
            ar="الامتثال بنيةٌ هندسية، لا وعدًا."
          />
          <p className="max-w-[640px] text-sage">
            <T
              en="“Where does patient data go?” is the question every UAE clinic now has to ask. Here is our answer — in documents, delivered before you ask."
              ar="«أين تذهب بيانات المرضى؟» سؤال يجب أن تطرحه كل عيادة في الإمارات اليوم. هذا جوابنا — موثّقًا، ونقدّمه قبل أن تسأل."
            />
          </p>
        </Reveal>

        <div className="mt-11 grid gap-3.5 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.en[0]} delay={i * 0.05}>
              <div className="h-full rounded-[18px] border border-border bg-white p-7">
                <h3 className="mb-2 flex items-center gap-2.5 text-[1.07rem] font-semibold">
                  <span className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-leaf-soft">
                    {c.icon}
                  </span>
                  <T en={c.en[0]} ar={c.ar[0]} />
                </h3>
                <p className="text-[0.92rem] text-sage">
                  <T en={c.en[1]} ar={c.ar[1]} />
                </p>
                {c.quote && (
                  <p className="mt-3 rounded-[10px] bg-paper-2 px-4 py-3 text-[0.86rem] italic text-[#3d4e47]">
                    <T en={c.quote.en} ar={c.quote.ar} />
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center font-semibold text-pine">
          <T
            en="Our standing challenge: ask any other vendor for their equivalent paperwork."
            ar="تحدّينا الدائم: اطلب من أي مزوّد آخر ما يعادل هذه الوثائق."
          />
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- HOW */

const STEPS = [
  {
    en: ["Sign & verify", "One-page agreement + DPA. Your WhatsApp Business verification starts the same day."],
    ar: ["التوقيع والتوثيق", "اتفاقية من صفحة واحدة + اتفاقية البيانات. توثيق واتساب للأعمال يبدأ في اليوم نفسه."],
  },
  {
    en: ["We configure", "Your services, prices, hours, insurance list and escalation contact — done for you, not by you."],
    ar: ["نُعِدّ كل شيء", "خدماتك وأسعارك وأوقاتك وقائمة التأمين وجهة التصعيد — نجهّزها نحن، لا أنت."],
  },
  {
    en: ["Arabic sign-off", "A native-speaker security reviewer approves every Arabic flow before a single patient sees it."],
    ar: ["اعتماد العربية", "مراجع أمني ناطق بالعربية يعتمد كل مسار محادثة قبل أن يراه أي مريض."],
  },
  {
    en: ["Go live & report", "Sanad answers in seconds from night one — and every month you get the number we can prove."],
    ar: ["الانطلاق والتقرير", "من الليلة الأولى يجيب سند خلال ثوانٍ — وكل شهر يصلك الرقم الذي نستطيع إثباته."],
  },
];

export function How() {
  return (
    <section id="how" className="pb-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow en="How it works" ar="كيف يعمل" />
          <SectionTitle en="Signature to go-live, in days." ar="من التوقيع إلى الانطلاق خلال أيام." />
        </Reveal>
        <div className="mt-11 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.en[0]} delay={i * 0.05}>
              <div className="h-full rounded-[18px] border border-border bg-white p-6">
                <span className="mb-2.5 block font-heading text-[1.5rem] font-semibold text-gold">
                  0{i + 1}
                </span>
                <h3 className="mb-1.5 text-[1rem] font-semibold">
                  <T en={s.en[0]} ar={s.ar[0]} />
                </h3>
                <p className="text-[0.86rem] text-sage">
                  <T en={s.en[1]} ar={s.ar[1]} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- PRICING */


export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-paper-2 py-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow en="Founding pricing — first 10 clinics" ar="أسعار التأسيس — أول ١٠ عيادات" />
          <SectionTitle
            en="Voice-first reception for Dubai dental & aesthetics clinics, all twenty-four hours."
            ar="استقبال صوتي أولًا لعيادات الأسنان والتجميل في دبي، على مدار الساعة."
          />
          <p className="max-w-[640px] text-sage">
            <T
              en="40% off setup for founding clinics, in exchange for one thing: a testimonial once your monthly report earns it. We get paid in proof only if it works."
              ar="خصم ٤٠٪ على رسوم التأسيس لعيادات الدفعة الأولى، مقابل أمر واحد: شهادة منك عندما يستحقها تقريرك الشهري. لا نُكافأ بالإثبات إلا إذا نجح المنتج."
            />
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.plan} delay={i * 0.06} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[22px] border p-8 ${
                  p.featured
                    ? "border-pine bg-pine text-[#ede7d4] shadow-[0_24px_60px_-24px_rgba(12,59,46,.45)] lg:-translate-y-2.5"
                    : "border-border bg-white"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3.5 start-1/2 -translate-x-1/2 rounded-full bg-gold px-3.5 py-1.5 text-[0.72rem] font-bold whitespace-nowrap text-[#231a05] rtl:translate-x-1/2">
                    <T en={p.badge.en} ar={p.badge.ar} />
                  </span>
                )}
                <div
                  className={`text-[0.95rem] font-bold uppercase tracking-[0.04em] rtl:tracking-normal ${
                    p.featured ? "text-gold-soft" : ""
                  }`}
                >
                  {p.plan}
                </div>
                <div
                  className={`mt-1 min-h-[42px] text-[0.84rem] ${
                    p.featured ? "text-[#b9ccc2]" : "text-sage"
                  }`}
                >
                  <T en={p.for.en} ar={p.for.ar} />
                </div>

                <div className="mt-[18px]">
                  <span
                    className={`text-[0.9rem] line-through ${
                      p.featured ? "text-[#8fa79c]" : "text-sage"
                    }`}
                  >
                    {p.was}
                  </span>
                  <div
                    className={`font-heading text-[2.15rem] font-semibold leading-tight ${
                      p.featured ? "text-[#f5f1e6]" : ""
                    }`}
                  >
                    {p.now}
                  </div>
                  <span className={`text-[0.8rem] ${p.featured ? "text-[#b9ccc2]" : "text-sage"}`}>
                    <T en={p.lbl.en} ar={p.lbl.ar} />
                  </span>
                </div>

                <div className="mt-2 text-[1.02rem] font-semibold">
                  + {p.monthly}
                  <span className={`font-normal ${p.featured ? "text-[#b9ccc2]" : "text-sage"}`}>
                    /<T en="month" ar="شهريًا" />
                  </span>
                </div>

                <ul className="my-5 flex flex-1 flex-col gap-2.5 text-[0.9rem]">
                  {p.items.map((it) => (
                    <li key={it.en} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className={`font-bold ${p.featured ? "text-gold" : "text-leaf"}`}
                      >
                        ✓
                      </span>
                      <T en={it.en} ar={it.ar} />
                    </li>
                  ))}
                </ul>

                <Btn
                  href="#cta"
                  variant={p.featured ? "gold" : "ghost"}
                  className="w-full"
                >
                  <T en={p.cta.en} ar={p.cta.ar} />
                </Btn>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-[0.86rem] text-sage">
          <T
            en="50% of setup on signature, 50% on go-live · one-month pilot, then six-month term · voice-reply add-on AED 400/mo · a human receptionist runs AED 4,000–6,000/mo for ~8 hours — keep her; Sanad covers the rest."
            ar="٥٠٪ من رسوم التأسيس عند التوقيع و٥٠٪ عند الانطلاق · شهر تجريبي ثم عقد ٦ أشهر · إضافة الرد الصوتي ٤٠٠ درهم شهريًا · موظفة الاستقبال تكلّف ٤٬٠٠٠–٦٬٠٠٠ درهم شهريًا لثماني ساعات تقريبًا — أبقِها معك، وسند يغطي الباقي."
          />
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FOUNDERS */

export function Founders() {
  const people = [
    {
      initials: "AS",
      name: { en: "Ahmed Soudi", ar: "Ahmed Soudi" },
      role: { en: "Co-founder · CEO", ar: "شريك مؤسس · الرئيس التنفيذي" },
      bio: {
        en: "Nine years inside UAE healthcare — Pfizer, Novartis, Agiomix — selling to and serving the exact clinics Sanad now answers for. He runs your onboarding personally.",
        ar: "تسع سنوات داخل القطاع الصحي الإماراتي — فايزر ونوفارتس وأجيومكس — في خدمة العيادات نفسها التي يجيب عنها سند اليوم. يتولى إعداد عيادتك بنفسه.",
      },
    },
    {
      initials: "RK",
      name: { en: "Ramy K.", ar: "رامي ك." },
      role: { en: "Co-founder · CTO & Security", ar: "شريك مؤسس · التقنية والأمن" },
      bio: {
        en: "Fifteen years protecting government critical infrastructure. He authors the security whitepaper, signs it — and reviews every Arabic deployment before go-live.",
        ar: "خمسة عشر عامًا في حماية البنى التحتية الحكومية الحرجة. يكتب الورقة الأمنية ويوقّعها — ويراجع كل نشر باللغة العربية قبل انطلاقه.",
      },
    },
  ];

  return (
    <section id="founders" className="py-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow en="Who answers for it" ar="من يقف خلف المنتج" />
          <SectionTitle
            en="Built by healthcare insiders. Secured by a government-cyber veteran."
            ar="بناه أهل القطاع الصحي، وأمّنه خبير أمن حكومي."
          />
        </Reveal>
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {people.map((p, i) => (
            <Reveal key={p.initials} delay={i * 0.06}>
              <div className="flex h-full items-start gap-5 rounded-[18px] border border-border bg-white p-7">
                <span className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-pine font-heading text-[1.25rem] text-gold-soft">
                  {p.initials}
                </span>
                <div>
                  <h3 className="text-[1.1rem] font-semibold">
                    <T en={p.name.en} ar={p.name.ar} />
                  </h3>
                  <div className="my-1 text-[0.8rem] font-bold uppercase tracking-[0.07em] text-gold rtl:tracking-normal">
                    <T en={p.role.en} ar={p.role.ar} />
                  </div>
                  <p className="text-[0.9rem] text-sage">
                    <T en={p.bio.en} ar={p.bio.ar} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center font-semibold text-pine">
          <T
            en="Named humans answer for this product — founders, not an account manager."
            ar="أشخاص بأسمائهم مسؤولون أمامك عن هذا المنتج — مؤسسان، لا مدير حسابات."
          />
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- FAQ */


export function Faq() {
  return (
    <section id="faq" className="pb-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal className="text-center">
          <Eyebrow en="Questions owners ask" ar="أسئلة يطرحها الملّاك" />
          <SectionTitle en="Asked in every clinic. Answered here." ar="تُسأل في كل عيادة — ونجيب عنها هنا." />
        </Reveal>
        <div className="mx-auto mt-11 max-w-[780px]">
          {FAQS.map((f, i) => (
            <Reveal key={f.en[0]} delay={i * 0.03}>
              <details
                open={i === 0}
                className="group mb-2.5 overflow-hidden rounded-2xl border border-border bg-white"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3.5 px-6 py-[19px] text-[0.99rem] font-semibold [&::-webkit-details-marker]:hidden">
                  <T en={f.en[0]} ar={f.ar[0]} />
                  <span
                    aria-hidden
                    className="font-heading text-[1.3rem] text-gold transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-[0.93rem] text-sage">
                  <T en={f.en[1]} ar={f.ar[1]} />
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FINAL + FOOT */

const WA_HREF =
  "https://wa.me/971507677581?text=I%27d%20like%20a%20Sanad%20demo%20%2F%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B9%D8%B1%D8%B6%20%D8%B3%D9%86%D8%AF";

export function FinalCta() {
  const reduced = useReducedMotion();
  return (
    <section id="cta" className="pb-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <div className="relative overflow-hidden rounded-[28px] bg-pine px-6 py-16 text-center text-[#ede7d4] md:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[-20%] -top-[40%] h-[120%] bg-[radial-gradient(45%_55%_at_50%_0%,rgba(201,162,75,.22),transparent_70%)]"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-[9px] rounded-full border border-[rgba(201,162,75,.45)] bg-[rgba(201,162,75,.12)] px-4 py-[7px] text-[0.82rem] font-bold text-gold-soft">
              <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-gold" />
              <T
                en="Founding cohort — Dubai dental & aesthetics"
                ar="دفعة التأسيس — عيادات الأسنان والتجميل في دبي"
              />
            </span>
            <h2 className="mx-auto mt-4 mb-3 max-w-[20ch] text-[clamp(1.9rem,3.6vw,2.8rem)] text-[#f5f1e6]">
              <T
                en="Ten founding slots. Then founding pricing is gone."
                ar="عشرة مقاعد تأسيسية — ثم تنتهي أسعار التأسيس."
              />
            </h2>
            <p className="mx-auto max-w-[560px] text-[#b9ccc2]">
              <T
                en="A 15-minute demo on your own phone, in Arabic, at your clinic or on a call. If it doesn't impress you in the first two minutes, we'll shake hands and leave."
                ar="عرض ١٥ دقيقة على هاتفك أنت، بالعربية، في عيادتك أو عبر مكالمة. إن لم يبهرك في أول دقيقتين، نصافحك وننصرف."
              />
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Btn href={WA_HREF} variant="gold">
                <T en="💬 WhatsApp us — see it live" ar="💬 راسلنا واتساب — شاهده مباشرة" />
              </Btn>
              <Btn href="mailto:hello@sanad.im?subject=Founding%20clinic%20demo" variant="glass">
                hello@sanad.im
              </Btn>
            </div>

            {/* Slot counter — driven by FOUNDING_SLOTS_OPEN in lib/content.ts.
                Update that one number as slots fill; a stale counter is worse
                than none, because it is the only claim on this page a prospect
                can check against what you tell them on a call. */}
            <div
              className="mt-7 inline-flex gap-1.5"
              role="img"
              aria-label={`${FOUNDING_SLOTS_OPEN} of ${FOUNDING_SLOTS_TOTAL} founding slots open`}
            >
              {Array.from({ length: FOUNDING_SLOTS_TOTAL }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                  className={`h-2 w-[26px] origin-left rounded ${
                    i < FOUNDING_SLOTS_OPEN ? "bg-gold" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <div className="mt-2.5 text-[0.8rem] text-[#b9ccc2]">
              <T
                en={`${FOUNDING_SLOTS_OPEN} of ${FOUNDING_SLOTS_TOTAL} founding slots open`}
                ar={`${FOUNDING_SLOTS_OPEN.toLocaleString("ar-EG")} من ${FOUNDING_SLOTS_TOTAL.toLocaleString("ar-EG")} مقاعد تأسيسية متاحة`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const lang = useLang();
  const p = (path: string) => (lang === "ar" ? `/ar${path}` : path);
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-[1160px] px-7">
        <div className="flex flex-wrap items-start justify-between gap-7">
          <Brand />
          <nav className="flex flex-wrap gap-6 text-[0.9rem] text-sage">
            <Link href="#pricing">
              <T en="Pricing" ar="الأسعار" />
            </Link>
            <Link href="#security">
              <T en="Security" ar="الأمان" />
            </Link>
            <Link href={p("/privacy")}>
              <T en="Privacy" ar="الخصوصية" />
            </Link>
            <Link href={p("/terms")}>
              <T en="Terms" ar="الشروط" />
            </Link>
            <Link href={p("/dpa")}>
              <T en="Data processing" ar="معالجة البيانات" />
            </Link>
            <a href="mailto:hello@sanad.im">hello@sanad.im</a>
            <span>
              <T en="Dubai, UAE" ar="دبي، الإمارات" />
            </span>
          </nav>
        </div>
        <p className="mt-8 max-w-[860px] text-[0.78rem] leading-[1.7] text-[#8b978f]">
          <T
            en="Founding-cohort pre-launch offer for dental and aesthetics clinics in Dubai, limited to ten clinics. Figures marked “illustrative” are worked examples, not measured client results — Sanad publishes no client results until real, attributable ones exist. Sanad provides appointment scheduling, patient-communication logistics and administrative automation only; it does not provide medical advice, diagnosis, triage or treatment recommendations, and routes all clinical questions to the clinic's licensed staff. © 2026 Sanad — sanad.im"
            ar="عرض ما قبل الإطلاق لدفعة تأسيسية من عشر عيادات أسنان وتجميل في دبي. الأرقام الموسومة «توضيحية» أمثلة محسوبة وليست نتائج عملاء مقاسة — ولن ينشر سند أي نتائج قبل وجود نتائج حقيقية قابلة للإثبات. يقدّم سند خدمات جدولة المواعيد وتنظيم تواصل المرضى والأتمتة الإدارية فقط؛ ولا يقدّم أي نصيحة طبية أو تشخيص أو فرز أو توصية علاجية، ويحوّل كل الأسئلة الطبية إلى الطاقم المرخّص في العيادة. © ٢٠٢٦ سند — sanad.im"
          />
        </p>
      </div>
    </footer>
  );
}
