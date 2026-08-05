"use client";

import Link from "next/link";
import { T, useOtherLang, useT } from "@/components/lang";

const LINKS = [
  { href: "#how", en: "How it works", ar: "كيف يعمل" },
  { href: "#honesty", en: "Honest numbers", ar: "أرقام صادقة" },
  { href: "#compare", en: "Compare", ar: "المقارنة" },
  { href: "#security", en: "Security", ar: "الأمان" },
  { href: "#pricing", en: "Pricing", ar: "الأسعار" },
  { href: "#faq", en: "FAQ", ar: "الأسئلة" },
];

export function Header() {
  const { other, href } = useOtherLang();
  const t = useT();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(9,48,38,.86)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1160px] items-center justify-between px-7">
        <Link href="#top" className="flex items-center gap-[11px] font-bold">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-gold pb-[3px] font-heading text-[1.25rem] text-[#231a05]">
            س
          </span>
          <span className="flex flex-col leading-[1.05] text-paper">
            <span className="text-[1.06rem]">
              Sanad <span className="font-medium text-[#b9ccc2]">· سند</span>
            </span>
            <span className="text-[0.7rem] font-medium text-[#8fa79c]">sanad.im</span>
          </span>
        </Link>

        <nav className="hidden gap-[26px] text-[0.92rem] font-medium text-[#c3d5cb] md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-gold">
              <T en={l.en} ar={l.ar} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* A real link, not a state toggle — crawlers follow it to the other language. */}
          <Link
            href={href}
            hrefLang={other}
            aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}
            className="flex min-h-11 items-center rounded-full border border-white/25 px-3.5 text-[0.85rem] font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
          >
            {other === "ar" ? "عربي" : "English"}
          </Link>
          <Link
            href="#cta"
            className="flex min-h-11 items-center rounded-xl bg-gold px-4 py-2 text-[0.88rem] font-semibold text-[#231a05] transition-transform hover:-translate-y-px"
          >
            <T en="Book a demo" ar="احجز عرضًا" />
          </Link>
        </div>
      </div>
    </header>
  );
}
