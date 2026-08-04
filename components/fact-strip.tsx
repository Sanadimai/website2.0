"use client";

import { motion, useReducedMotion } from "framer-motion";
import { T } from "@/components/lang";

const FACTS = [
  {
    en: <><b>Voice notes understood</b> — audio never stored</>,
    ar: <><b>يفهم الرسائل الصوتية</b> — والتسجيل لا يُخزَّن أبدًا</>,
  },
  { en: <><b>24/7</b> — nights & Fridays</>, ar: <><b>٢٤/٧</b> — ليلًا وأيام الجمعة</> },
  {
    en: <><b>Arabic + English</b>, detected per message</>,
    ar: <><b>عربي + English</b> حسب لغة كل رسالة</>,
  },
  { en: <>On <b>your own</b> number</>, ar: <>على <b>رقمك أنت</b></> },
  { en: <><b>Never</b> medical advice</>, ar: <><b>لا</b> نصيحة طبية أبدًا</> },
];

/**
 * Infinite marquee. The list is rendered twice and translated by exactly -50%,
 * so the loop seam is invisible; reduced motion falls back to a static row.
 */
export function FactStrip() {
  const reduced = useReducedMotion();
  const row = (
    <div className="flex shrink-0 items-center">
      {FACTS.map((f, i) => (
        <span key={i} className="flex items-center gap-2.5 px-7 text-[0.88rem] text-[#dce8e0]">
          <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-gold" />
          <T en={f.en} ar={f.ar} />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-white/10 bg-pine py-3.5">
      {reduced ? (
        <div className="mx-auto flex max-w-[1160px] flex-wrap justify-center px-7">{row}</div>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {row}
          {row}
        </motion.div>
      )}
    </div>
  );
}
