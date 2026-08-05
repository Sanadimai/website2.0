"use client";

/* eslint-disable react-hooks/set-state-in-effect -- Consent must be read from localStorage, which only exists after mount. Reading it during render would either break the static export or leak a consent decision into server-rendered HTML. */

import { useEffect, useState } from "react";

/**
 * Cookie consent gate.
 *
 * Google Analytics and Microsoft Clarity are NOT loaded until a visitor
 * actively accepts. Clarity records session replays, so loading it before
 * consent would contradict both the privacy policy and the data-protection
 * posture the rest of the site sells on.
 *
 * Language is read from <html lang>, because this renders on legal pages that
 * sit outside the marketing LangProvider.
 */

const KEY = "sanad-consent";
const GA_ID = "G-GTX7XB2CKG";
const CLARITY_ID = "xxjy84ucnt";

type Choice = "granted" | "denied";

function loadAnalytics() {
  if (document.getElementById("ga4-script")) return;

  const ga = document.createElement("script");
  ga.id = "ga4-script";
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(ga);

  const init = document.createElement("script");
  init.id = "ga4-init";
  init.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
  document.head.appendChild(init);

  const clarity = document.createElement("script");
  clarity.id = "clarity-script";
  clarity.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`;
  document.head.appendChild(clarity);
}

export function ConsentGate() {
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);
  const [ar, setAr] = useState(false);

  useEffect(() => {
    setAr(document.documentElement.lang === "ar");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      /* private mode — treat as undecided, never as consent */
    }
    const value = saved === "granted" || saved === "denied" ? (saved as Choice) : null;
    setChoice(value);
    if (value === "granted") loadAnalytics();
  }, []);

  const decide = (next: Choice) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
    setChoice(next);
    if (next === "granted") loadAnalytics();
  };

  // undefined = not yet read (avoids a flash); a real choice = banner done.
  if (choice !== null) return null;

  const t = ar
    ? {
        body: "نستخدم تحليلات الموقع (Google Analytics وMicrosoft Clarity، ويشمل ذلك تسجيل الجلسات) لفهم كيفية استخدام الموقع. لا تعمل هذه الأدوات إلا بموافقتك.",
        accept: "أوافق",
        decline: "بدون تحليلات",
        more: "سياسة الخصوصية",
        href: "/ar/privacy",
      }
    : {
        body: "We use website analytics (Google Analytics and Microsoft Clarity, which includes session replay) to understand how this site is used. They load only if you accept.",
        accept: "Accept",
        decline: "No analytics",
        more: "Privacy policy",
        href: "/privacy",
      };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={ar ? "موافقة ملفات تعريف الارتباط" : "Cookie consent"}
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-[720px] rounded-[16px] border border-border bg-white p-4 shadow-[0_18px_50px_-20px_rgba(12,59,46,.45)] md:p-5"
    >
      <p className="text-[0.88rem] leading-[1.7] text-ink">
        {t.body}{" "}
        <a href={t.href} className="font-semibold text-pine underline underline-offset-2">
          {t.more}
        </a>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="min-h-11 rounded-xl bg-pine px-5 text-[0.9rem] font-semibold text-[#f5f1e6]"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="min-h-11 rounded-xl border border-border bg-white px-5 text-[0.9rem] font-semibold text-ink"
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
}
