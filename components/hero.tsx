"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import FluidFlowGrid from "@/components/ui/fluid-flow-grid";
import { T, useT } from "@/components/lang";
import { Btn } from "@/components/site-ui";

const BARS = 128;

/**
 * Deterministic bar heights — a seeded shape, not Math.random(), or the server
 * and client would render two different waveforms and hydration would fail.
 */
const heights = Array.from({ length: BARS }, (_, i) => {
  const t = i / (BARS - 1);
  const envelope = Math.exp(-Math.pow((t - 0.5) * 3.1, 2)); // loudest in the middle
  const grain =
    0.45 + 0.55 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31) + Math.sin(i * 0.17));
  return Math.max(0.06, envelope * grain);
});

function Waveform() {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none flex h-[180px] w-full items-center justify-center gap-[2px] md:h-[260px] md:gap-[3px]"
    >
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2px] flex-1 rounded-full md:w-[3px]"
          style={{
            height: `${Math.round(h * 100)}%`,
            maxWidth: 6,
            // Cream at the peak, gold at the shoulders, pine at the edges.
            backgroundColor:
              h > 0.72 ? "#F7F3EA" : h > 0.4 ? "var(--color-gold)" : "#8a7a44",
            opacity: 0.35 + h * 0.65,
            transformOrigin: "center",
          }}
          initial={{ scaleY: reduced ? 1 : 0.15 }}
          animate={
            reduced
              ? { scaleY: 1 }
              : { scaleY: [0.82, 1, 0.88, 1.04, 0.82] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 2.6 + (i % 7) * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.008,
                }
          }
        />
      ))}
    </div>
  );
}

export function Hero() {
  const t = useT();
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#061912]">
      {/* The flow field from components/ui/fluid-flow-grid, retinted pine + gold. */}
      <div className="absolute inset-0 opacity-55">
        <FluidFlowGrid
          className="relative h-full w-full select-none overflow-hidden"
          palette={{ bg: "#061912", line: "46, 158, 119", accent: "201, 162, 75" }}
        >
          <span />
        </FluidFlowGrid>
      </div>

      {/* Warm bloom behind the waveform. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[42%] -z-0 h-[420px] bg-[radial-gradient(45%_50%_at_50%_50%,rgba(201,162,75,.28),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1160px] px-7 pt-16 pb-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-[9px] rounded-full border border-[rgba(201,162,75,.45)] bg-[rgba(201,162,75,.12)] px-4 py-[7px] text-[0.82rem] font-bold text-gold-soft"
        >
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-gold" />
          <T
            en="Dubai dental & aesthetics · 10 founding clinics · 40% off setup"
            ar={<>عيادات الأسنان والتجميل في دبي · <bdi>١٠</bdi> عيادات تأسيسية · خصم <bdi>٤٠٪</bdi></>}
          />
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-[20ch] text-[clamp(2.2rem,4.6vw,3.6rem)] text-[#f5f1e6]"
        >
          <T
            en={
              <>
                Your patients send{" "}
                <em className="not-italic text-gold-soft underline decoration-gold/60 decoration-[0.14em] underline-offset-[0.12em]">
                  voice notes.
                </em>{" "}
                Sanad listens and books them.
              </>
            }
            ar={
              <>
                مرضاك يرسلون{" "}
                <em className="not-italic text-gold-soft underline decoration-gold/60 decoration-[0.14em] underline-offset-[0.12em]">
                  رسائل صوتية.
                </em>{" "}
                سند يسمعهم ويحجز لهم.
              </>
            }
          />
        </motion.h1>

        <div className="relative mt-6">
          <Waveform />

          {/* The 21:47 voice note that starts the whole story. */}
          <motion.figure
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute start-4 end-4 bottom-[-14px] mx-auto w-fit max-w-[92vw] rounded-2xl border border-white/12 bg-[rgba(6,25,18,.72)] px-4 py-3 backdrop-blur-md md:start-auto md:end-6 md:bottom-4"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-[#231a05]">
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
              </span>
              <figcaption dir="rtl" className="text-start text-[0.86rem] text-[#e8efea]">
                أهلًا! سمعتك 👌 تنظيف الأسنان بكرة الأربعاء متاح: <b>٥:٣٠</b> أو{" "}
                <b>٧:١٥ مساءً</b>
              </figcaption>
              <span className="shrink-0 font-mono text-[0.62rem] text-[#8fa79c]">21:47</span>
            </div>
          </motion.figure>
        </div>

        <p className="mx-auto mt-10 max-w-[46ch] font-heading text-[clamp(1.05rem,2vw,1.4rem)] text-gold-soft">
          <T
            en="A seven-second Arabic voice note arrives at 9:47 PM."
            ar="رسالة صوتية بالعربية مدتها سبع ثوانٍ تصل ٩:٤٧ مساءً."
          />
        </p>
        <p className="mx-auto mt-3 max-w-[62ch] text-[1.02rem] text-[#a9bfb4]">
          <T
            en="Sanad understands WhatsApp voice notes in Gulf Arabic and English, replies in seconds 24/7, and books veneers consultations, Invisalign, cleaning, fillers and laser appointments straight into your calendar. Never medical advice. Patient data stays in the UAE."
            ar="يفهم سند رسائل واتساب الصوتية بالعربية الخليجية والإنجليزية، ويرد خلال ثوانٍ على مدار الساعة، ويحجز استشارات الفينير والإنفزلاين وتنظيف الأسنان والفيلر والليزر مباشرة في تقويمك. لا نصيحة طبية أبدًا، وبيانات المرضى تبقى داخل الإمارات."
          />
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Btn href="#cta" variant="gold">
            <T en="See it on your own phone" ar="جرّبه على هاتفك الآن" />
          </Btn>
          <Btn href="#pricing" variant="glass">
            <T en="Founding pricing" ar="أسعار دفعة التأسيس" />
          </Btn>
        </div>
        <p className="mt-3.5 text-[0.85rem] text-[#8fa79c]">
          <T
            en="15-minute demo, on your phone, in Arabic — no slides, no setup."
            ar="عرض ١٥ دقيقة، على هاتفك، بالعربية — دون شرائح ودون أي تجهيز."
          />
        </p>
      </div>

      <div className="sr-only">{t("Voice-first AI reception", "استقبال صوتي بالذكاء الاصطناعي")}</div>
    </section>
  );
}
