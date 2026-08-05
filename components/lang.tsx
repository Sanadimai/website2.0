"use client";

import { createContext, useContext, type ReactNode } from "react";

export type Lang = "en" | "ar";

/** Where each language lives. The URL is the source of truth, not localStorage —
 *  a crawler has to be able to reach the Arabic page without running JS. */
export const HREF: Record<Lang, string> = { en: "/", ar: "/ar" };

const LangContext = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** The other language's URL — used by the header toggle. */
export function useOtherLang() {
  const lang = useLang();
  const other: Lang = lang === "en" ? "ar" : "en";
  return { other, href: HREF[other] };
}

/**
 * Bilingual text. Only the active language is rendered, so the Arabic page
 * contains Arabic only — no duplicate-content signal from hidden translations.
 */
export function T({ en, ar }: { en: ReactNode; ar: ReactNode }) {
  return <>{useLang() === "ar" ? ar : en}</>;
}

/** Same choice, for props that need a plain string (aria-label, alt, title). */
export function useT() {
  const lang = useLang();
  return (en: string, ar: string) => (lang === "ar" ? ar : en);
}
