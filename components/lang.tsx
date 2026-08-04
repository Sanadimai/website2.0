"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Lang = "en" | "ar";

const KEY = "sanad-lang";

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "en", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Read the saved choice after mount — reading localStorage during render
  // would desync the server-rendered "en" markup and blow up hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "ar" || saved === "en") setLang(saved);
    } catch {
      /* private mode — stay on English */
    }
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("lang", lang);
    el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "ar" : "en";
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/**
 * Bilingual text. Both strings are always in the DOM's React tree but only the
 * active one renders, so Arabic copy can never leak into an English screenshot.
 */
export function T({ en, ar }: { en: ReactNode; ar: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "ar" ? ar : en}</>;
}

/** Same choice, for props that need a plain string (aria-label, alt, title). */
export function useT() {
  const { lang } = useLang();
  return useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);
}
