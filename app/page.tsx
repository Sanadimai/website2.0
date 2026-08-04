import { Bento } from "@/components/bento";
import { FactStrip } from "@/components/fact-strip";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import {
  Faq,
  Features,
  FinalCta,
  Footer,
  Founders,
  Honesty,
  How,
  Pricing,
  Security,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FactStrip />
        <Bento />
        <Features />
        <Honesty />
        <Security />
        <How />
        <Pricing />
        <Founders />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
