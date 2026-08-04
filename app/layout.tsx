import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LangProvider } from "@/components/lang";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-ar",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Sanad — Voice-first AI receptionist for Dubai dental & aesthetics clinics | سند",
  description:
    "Sanad understands WhatsApp voice notes in Gulf Arabic and English for dental and aesthetics clinics in Dubai, replies in seconds and books into your calendar. Never medical advice.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230C3B2E'/%3E%3Ctext x='32' y='44' font-size='34' text-anchor='middle' fill='%23F7F3EA' font-family='Georgia'%3E%D8%B3%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${plex.variable} ${plexArabic.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Framer Motion SSRs reveal states as inline opacity:0 — without JS
            that would hide most of the page. Force it visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
