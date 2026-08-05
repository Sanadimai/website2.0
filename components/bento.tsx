"use client";

/* eslint-disable react-hooks/set-state-in-effect -- the count-up is a rAF animation driven after mount; the SSR value is already the final figure. */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { CalendarCheck, Languages, MicVocal, ShieldAlert, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { T, useLang } from "@/components/lang";
import { REVENUE_MODEL, monthlyLeakageAed } from "@/lib/content";
import { Btn, Eyebrow } from "@/components/site-ui";
import { WhatsAppDemo } from "@/components/whatsapp";

const CARD =
  "rounded-[22px] border border-[rgba(232,239,234,.16)] bg-[rgba(255,255,255,.035)] p-6 backdrop-blur-sm transition-colors hover:border-[rgba(201,162,75,.45)]";

/** Counts to `to` once in view. Reduced motion gets the final value instantly. */
function CountUp({ to }: { to: number }) {
  const lang = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  // Server-render the final figure so crawlers and no-JS readers see the real
  // number; the count-up is progressive enhancement layered on top.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (reduced) return setValue(to);
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className="tabular">
      {value.toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}
    </span>
  );
}

function Card({
  className = "",
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${CARD} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Bento() {
  return (
    <section id="proof" className="bg-pine-2 py-20 text-[#e8efea]">
      <div className="mx-auto max-w-[1160px] px-7">
        <Eyebrow tone="cream" en="What Sanad handles" ar="ماذا يتولّى سند" />

        <div className="mt-8 grid gap-3.5 lg:grid-cols-4">
          {/* Headline */}
          <Card className="lg:col-span-2" delay={0}>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] text-[#f0ebdc]">
              <T
                en="A receptionist's night shift — without the night shift."
                ar="وردية ليلية كاملة — من دون وردية ليلية."
              />
            </h2>
            <p className="mt-3 text-[0.94rem] text-[#a9bfb4]">
              <T
                en="Your receptionist is excellent — for eight hours. The other sixteen, and the thirty simultaneous messages while she's checking someone in, are where bookings quietly leak."
                ar="موظفة الاستقبال لديك ممتازة — لثماني ساعات. لكن الساعات الست عشرة الباقية، وثلاثين رسالة تصل وهي منشغلة مع مريض أمامها، هي حيث تتسرّب الحجوزات بصمت."
              />
            </p>
            <div className="mt-5">
              <Btn href="#cta" variant="gold">
                <T en="Book a demo" ar="احجز عرضًا" />
              </Btn>
            </div>
          </Card>

          {/* Live conversation — tall */}
          <Card className="lg:col-span-2 lg:row-span-3 lg:p-5" delay={0.05}>
            <WhatsAppDemo />
            <p className="mt-3 text-center text-[0.8rem] text-[#8fa79c]">
              <T
                en="⚡ Replied in seconds · booked at 9:48 PM · zero staff involved"
                ar="⚡ ردّ خلال ثوانٍ · حُجز ٩:٤٨ مساءً · دون أي موظف"
              />
            </p>
          </Card>

          {/* Illustrative math */}
          <Card className="lg:col-span-2" delay={0.1}>
            <span className="inline-block rounded-full bg-gold px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#231a05] rtl:tracking-normal">
              <T en="Illustrative math" ar="حسبة توضيحية" />
            </span>
            <dl className="mt-4 text-[0.92rem]">
              {[
                { en: "Average consultation", ar: "متوسط سعر الكشف", v: `AED ${REVENUE_MODEL.averageConsultationAed}` },
                {
                  en: "Convertible messages missed / day",
                  ar: "رسائل قابلة للتحويل تُفوَّت يوميًا",
                  v: String(REVENUE_MODEL.convertibleMessagesMissedPerDay),
                },
                { en: "Days / month", ar: "أيام الشهر", v: String(REVENUE_MODEL.workingDaysPerMonth) },
              ].map((r) => (
                <div
                  key={r.en}
                  className="flex justify-between gap-4 border-b border-dashed border-white/12 py-2.5 last:border-0"
                >
                  <dt className="text-[#a9bfb4]">
                    <T en={r.en} ar={r.ar} />
                  </dt>
                  <dd className="tabular font-semibold">{r.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-baseline justify-between border-t-2 border-white/25 pt-3.5">
              <span className="text-[0.92rem] text-[#a9bfb4]">
                <T
                  en="Left unrecovered, monthly"
                  ar="خسارة شهرية غير مستردّة"
                />
              </span>
              <b className="font-heading text-[1.9rem] text-gold">
                ≈ AED <CountUp to={monthlyLeakageAed()} />
              </b>
            </div>
            <p className="mt-3 text-[0.76rem] text-[#8fa79c]">
              <T
                en="Illustrative, not a measured result — worth checking against your own numbers."
                ar="رقم توضيحي وليس نتيجة مقاسة — يستحق المقارنة بأرقامك الفعلية."
              />
            </p>
          </Card>

          {/* Four fact cards */}
          <Card delay={0.14}>
            <MicVocal className="h-6 w-6 text-gold" aria-hidden />
            <h3 className="mt-3 text-[1rem] font-semibold text-[#f0ebdc]">
              <T en="Voice notes, understood" ar="رسائل صوتية… مفهومة" />
            </h3>
            <p className="mt-1.5 text-[0.88rem] text-[#a9bfb4]">
              <T
                en="Gulf Arabic and English, transcribed in memory. Raw audio is never stored."
                ar="بالعربية الخليجية والإنجليزية، تُفرَّغ في الذاكرة. ولا يُخزَّن التسجيل الخام أبدًا."
              />
            </p>
          </Card>

          <Card delay={0.18}>
            <CalendarCheck className="h-6 w-6 text-gold" aria-hidden />
            <h3 className="mt-3 text-[1rem] font-semibold text-[#f0ebdc]">
              <T en="Tagged bot-originated" ar="موسوم bot-originated" />
            </h3>
            <p className="mt-1.5 text-[0.88rem] text-[#a9bfb4]">
              <T
                en="Every booking is tagged at the moment it happens. Your report counts only what we can prove."
                ar="يُوسم كل حجز لحظة حدوثه، ولا يحسب تقريرك إلا ما نستطيع إثباته."
              />
            </p>
          </Card>

          <Card delay={0.22}>
            <span className="text-2xl leading-none" aria-hidden>
              🇦🇪
            </span>
            <h3 className="mt-3 text-[1rem] font-semibold text-[#f0ebdc]">
              <T
                en="Patient data stays in the UAE"
                ar="بيانات المرضى تبقى داخل الإمارات"
              />
            </h3>
            <p className="mt-1.5 text-[0.88rem] text-[#a9bfb4]">
              <T
                en="Every stateful component runs on in-country infrastructure by architecture."
                ar="كل مكوّن يخزّن البيانات يعمل على بنية تحتية داخل الدولة بحكم التصميم."
              />
            </p>
          </Card>

          <Card delay={0.26}>
            <ShieldAlert className="h-6 w-6 text-gold" aria-hidden />
            <h3 className="mt-3 text-[1rem] font-semibold text-[#f0ebdc]">
              <T en="Never medical advice" ar="لا نصيحة طبية أبدًا" />
            </h3>
            <p className="mt-1.5 text-[0.88rem] text-[#a9bfb4]">
              <T
                en="Scope-limited by design to scheduling and logistics. Clinical questions route to your licensed staff."
                ar="محدود النطاق بحكم التصميم: مواعيد وشؤون تنظيمية فقط، والأسئلة الطبية تُحوَّل لطاقمك المرخّص."
              />
            </p>
          </Card>

          <Card delay={0.3}>
            <Clock className="h-6 w-6 text-gold" aria-hidden />
            <h3 className="mt-3 text-[1rem] font-semibold text-[#f0ebdc]">
              <T en="24/7 — nights & Fridays" ar="٢٤/٧ — ليلًا وأيام الجمعة" />
            </h3>
            <p className="mt-1.5 text-[0.88rem] text-[#a9bfb4]">
              <T
                en="On your own number, with instant handoff to your team the moment a patient asks for a human."
                ar="على رقمك أنت، مع تحويل فوري لفريقك لحظة طلب المريض التحدث مع شخص."
              />
            </p>
          </Card>

          <Card delay={0.34}>
            <Languages className="h-6 w-6 text-gold" aria-hidden />
            <h3 className="mt-3 text-[1rem] font-semibold text-[#f0ebdc]">
              <T en="Arabic + English" ar="عربي + English" />
            </h3>
            <p className="mt-1.5 text-[0.88rem] text-[#a9bfb4]">
              <T
                en="Detected per message, so a patient can switch language mid-conversation."
                ar="تُكتشف اللغة حسب كل رسالة، فيستطيع المريض تبديل اللغة أثناء المحادثة."
              />
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
