import type { Metadata } from "next";
import { Site } from "@/components/site";

export const metadata: Metadata = {
  title:
    "Sanad — Voice-first AI receptionist for Dubai dental & aesthetics clinics",
  description:
    "Sanad understands WhatsApp voice notes in Gulf Arabic and English for dental and aesthetics clinics in Dubai, replies in seconds 24/7 and books into your calendar. Never medical advice. Patient data stays in the UAE.",
  alternates: {
    canonical: "/",
    languages: { "en-AE": "/", "ar-AE": "/ar", "x-default": "/" },
  },
  openGraph: {
    url: "/",
    locale: "en_AE",
    alternateLocale: "ar_AE",
    title: "Sanad — Voice-first AI receptionist for Dubai dental & aesthetics clinics",
    description:
      "Patients send WhatsApp voice notes in Gulf Arabic. Sanad listens, replies in seconds and books the appointment — 24/7. Never medical advice.",
  },
};

export default function Home() {
  return <Site lang="en" />;
}
