"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, CalendarCheck, Mic, Play } from "lucide-react";
import { T, useT } from "@/components/lang";

const WAVE = [9, 17, 26, 14, 22, 29, 18, 10, 24, 16, 27, 12, 21, 19, 25, 11];

/**
 * The 9:47 PM conversation, copied bubble-for-bubble from the original
 * index.html demo. Arabic stays RTL inside an LTR phone chrome.
 */
export function WhatsAppDemo({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const t = useT();

  const bubble = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div
      dir="ltr"
      role="img"
      aria-label={t(
        "WhatsApp conversation: a patient sends an Arabic voice note at 9:47 PM and Sanad books a cleaning for Wednesday 7:15 PM.",
        "محادثة واتساب: مريض يرسل رسالة صوتية بالعربية الساعة ٩:٤٧ مساءً، ويحجز سند موعد تنظيف أسنان يوم الأربعاء ٧:١٥ مساءً."
      )}
      className={`overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] ${className}`}
    >
      <div className="flex items-center gap-[11px] border-b border-[#e3e0da] bg-[#f0f2f5] px-4 py-3.5">
        <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-pine pb-0.5 font-heading text-[1.05rem] text-[#f5f1e6]">
          س
        </span>
        <div>
          <div className="flex items-center gap-1.5 text-[0.92rem] font-semibold text-ink">
            Bright Smile Dental
            <BadgeCheck className="h-3.5 w-3.5 text-wa" aria-hidden />
          </div>
          <div className="text-[0.74rem] font-medium text-wa">online</div>
        </div>
      </div>

      <div className="flex min-h-[392px] flex-col gap-2.5 bg-chat-bg px-3 pt-4 pb-3.5">
        <span className="self-center rounded-lg bg-white px-2.5 py-1 text-[0.68rem] text-[#7a7368] shadow-sm">
          21:47
        </span>

        <motion.div
          {...bubble(0)}
          className="max-w-[82%] self-end rounded-xl rounded-tr-[4px] bg-wa-bubble px-3 pt-2.5 pb-1.5 shadow-sm"
        >
          <div className="flex min-w-[230px] items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pine text-white">
              <Play className="h-3 w-3 fill-current" aria-hidden />
            </span>
            <span className="flex h-[30px] flex-1 items-center gap-[3px]">
              {WAVE.map((h, i) => (
                <i
                  key={i}
                  style={{ height: h }}
                  className="block w-[3px] rounded-[3px] bg-pine opacity-75"
                />
              ))}
            </span>
            <Mic className="h-4 w-4 text-pine" aria-hidden />
          </div>
          <div className="mt-1 flex justify-between text-[0.65rem] text-[#67766e]">
            <span>0:07</span>
            <span>21:47 ✓✓</span>
          </div>
        </motion.div>

        <motion.div
          {...bubble(1)}
          dir="rtl"
          className="max-w-[82%] self-start rounded-xl rounded-tl-[4px] bg-white px-3 pt-2.5 pb-1.5 text-[0.86rem] leading-relaxed text-ink shadow-sm"
        >
          أهلًا! سمعتك 👌 تنظيف الأسنان بكرة الأربعاء متاح: <b>٥:٣٠</b> أو{" "}
          <b>٧:١٥ مساءً</b> — أيّهما يناسبك؟
          <span className="mt-1 block text-start text-[0.63rem] text-[#8b948e]">21:47</span>
        </motion.div>

        <motion.div
          {...bubble(2)}
          dir="rtl"
          className="max-w-[82%] self-end rounded-xl rounded-tr-[4px] bg-wa-bubble px-3 pt-2.5 pb-1.5 text-[0.86rem] text-ink shadow-sm"
        >
          ٧:١٥
          <span className="mt-1 block text-start text-[0.63rem] text-[#8b948e]">
            21:48 ✓✓
          </span>
        </motion.div>

        <motion.div
          {...bubble(3)}
          dir="rtl"
          className="max-w-[86%] self-start rounded-xl rounded-tl-[4px] bg-white px-3 pt-2.5 pb-1.5 text-[0.86rem] leading-relaxed text-ink shadow-sm"
        >
          تم الحجز ✅ تنظيف أسنان — الأربعاء <b>٧:١٥ مساءً</b> مع د. سارة. سنرسل لك تذكيرًا
          قبل موعدك. تشرّفنا!
          <span
            dir="ltr"
            className="mt-2 flex items-center gap-1.5 rounded-[10px] border border-dashed border-[#bfd8c9] bg-white px-2.5 py-1.5 text-[0.74rem] font-semibold text-pine"
          >
            <CalendarCheck className="h-3.5 w-3.5" aria-hidden />
            Google Calendar · booked · tagged <b>bot-originated</b>
          </span>
          <span className="mt-1 block text-start text-[0.63rem] text-[#8b948e]">21:48</span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2.5 bg-[#f0f2f5] px-3.5 py-2.5">
        <div className="flex-1 rounded-full bg-white px-4 py-2 text-[0.8rem] text-[#9aa39d]">
          <T en="Message" ar="رسالة" />
        </div>
        <div className="grid h-[38px] w-[38px] place-items-center rounded-full bg-wa text-white">
          <Mic className="h-4 w-4" aria-hidden />
        </div>
      </div>
    </div>
  );
}
