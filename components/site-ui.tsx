"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { T } from "@/components/lang";

/** Scroll-in reveal. One shared curve so the whole page moves with one rhythm. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  en,
  ar,
  tone = "pine",
}: {
  en: string;
  ar: string;
  tone?: "pine" | "cream";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] ltr:tracking-[0.14em] rtl:tracking-normal ${
        tone === "cream" ? "text-gold-soft" : "text-pine"
      }`}
    >
      <span aria-hidden className="h-0.5 w-[22px] bg-gold" />
      <T en={en} ar={ar} />
    </span>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "ghost" | "glass";
  className?: string;
};

const BTN_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-[22px] py-[13px] text-[0.95rem] font-semibold border border-transparent transition-transform duration-150 will-change-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold min-h-11";

const BTN_VARIANT = {
  primary: "bg-pine text-[#f5f1e6] shadow-[0_12px_26px_-12px_rgba(12,59,46,.55)]",
  gold: "bg-gold text-[#231a05]",
  ghost: "border-border bg-white text-ink",
  glass:
    "border-[rgba(245,241,230,.25)] bg-[rgba(245,241,230,.12)] text-[#f5f1e6] backdrop-blur-sm",
} as const;

export function Btn({ href, children, variant = "primary", className = "" }: BtnProps) {
  return (
    <Link href={href} className={`${BTN_BASE} ${BTN_VARIANT[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** The س mark + bilingual wordmark, exactly as the original header renders it. */
export function Brand({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  return (
    <Link href="#top" className="flex items-center gap-[11px] font-bold">
      <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-pine pb-[3px] font-heading text-[1.25rem] text-paper">
        س
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span className={`text-[1.06rem] ${tone === "cream" ? "text-paper" : "text-ink"}`}>
          Sanad{" "}
          <span className={tone === "cream" ? "text-[#b9ccc2]" : "text-sage"}>· سند</span>
        </span>
        <span
          className={`text-[0.7rem] font-medium ${
            tone === "cream" ? "text-[#b9ccc2]" : "text-sage"
          }`}
        >
          sanad.im
        </span>
      </span>
    </Link>
  );
}

export function SectionTitle({ en, ar, cream }: { en: string; ar: string; cream?: boolean }) {
  return (
    <h2
      className={`mt-3.5 mb-2.5 text-[clamp(1.9rem,3.6vw,2.7rem)] ${
        cream ? "text-[#f5f1e6]" : ""
      }`}
    >
      <T en={en} ar={ar} />
    </h2>
  );
}
