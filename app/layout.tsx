import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ConsentGate } from "@/components/consent";
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
  metadataBase: new URL("https://sanad.im"),
  title: {
    default:
      "Sanad — Voice-first AI receptionist for Dubai dental & aesthetics clinics | سند",
    template: "%s | Sanad",
  },
  description:
    "Sanad understands WhatsApp voice notes in Gulf Arabic and English for dental and aesthetics clinics in Dubai, replies in seconds and books into your calendar. Never medical advice.",
  applicationName: "Sanad",
  keywords: [
    "AI receptionist Dubai",
    "WhatsApp AI receptionist",
    "dental clinic booking Dubai",
    "aesthetics clinic Dubai",
    "Arabic voice note AI",
    "clinic appointment automation UAE",
    "موظف استقبال ذكي",
    "حجز مواعيد عيادات دبي",
  ],
  authors: [{ name: "Sanad", url: "https://sanad.im" }],
  creator: "Sanad",
  publisher: "Sanad",
  category: "technology",
  // Explicitly invite full indexing and snippet/preview use — the same signal
  // AI answer engines read before quoting a page.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Sanad · سند",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sanad — voice-first AI receptionist for Dubai dental and aesthetics clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Sanadimai",
    creator: "@Sanadimai",
    title: "Sanad — Voice-first AI receptionist for Dubai clinics",
    description:
      "Patients send WhatsApp voice notes in Gulf Arabic. Sanad listens, replies in seconds and books the appointment — 24/7.",
    images: ["/og.png"],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230C3B2E'/%3E%3Ctext x='32' y='44' font-size='34' text-anchor='middle' fill='%23F7F3EA' font-family='Georgia'%3E%D8%B3%3C/text%3E%3C/svg%3E",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // /ar is rewritten to lang="ar" dir="rtl" after export — see scripts/postbuild.mjs
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${plex.variable} ${plexArabic.variable} h-full`}
    >
      <head>
        {/* Framer Motion SSRs reveal states as inline opacity:0 — without JS
            that would hide most of the page from readers and crawlers. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ConsentGate />
      </body>
    </html>
  );
}
