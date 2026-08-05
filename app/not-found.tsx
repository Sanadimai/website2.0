import type { Metadata } from "next";
import Link from "next/link";

// Shown for any unknown URL. Bilingual because we cannot know which language
// the visitor wanted — a dead link can arrive from either side of the site.
export const metadata: Metadata = {
  title: "Page not found · الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

const BTN =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-[22px] py-[13px] text-[0.95rem] font-semibold transition-transform hover:-translate-y-px";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#061912] px-7 py-24 text-center">
      <div>
        <span className="mx-auto grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-gold pb-[3px] font-heading text-[1.4rem] text-[#231a05]">
          س
        </span>

        <p className="mt-6 font-mono text-[0.8rem] tracking-[0.2em] text-gold">404</p>

        <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] text-[#f5f1e6]">
          This page could not be found.
        </h1>
        <h2
          dir="rtl"
          lang="ar"
          className="mt-2 font-sans text-[clamp(1.3rem,3vw,1.8rem)] font-semibold text-gold-soft"
        >
          هذه الصفحة غير موجودة.
        </h2>

        <p className="mx-auto mt-4 max-w-[46ch] text-[0.95rem] text-[#a9bfb4]">
          The link may be out of date. Sanad is still answering voice notes — start here.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={`${BTN} bg-gold text-[#231a05]`}>
            Back to Sanad
          </Link>
          <Link
            href="/ar"
            hrefLang="ar"
            className={`${BTN} border border-[rgba(245,241,230,.25)] bg-[rgba(245,241,230,.12)] text-[#f5f1e6]`}
          >
            العودة إلى سند
          </Link>
        </div>

        <p className="mt-8 text-[0.85rem] text-[#8fa79c]">
          <a className="underline underline-offset-4" href="mailto:hello@sanad.im">
            hello@sanad.im
          </a>
        </p>
      </div>
    </main>
  );
}
