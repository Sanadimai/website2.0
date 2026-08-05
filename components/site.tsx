import { Bento } from "@/components/bento";
import { FactStrip } from "@/components/fact-strip";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { LangProvider, type Lang } from "@/components/lang";
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

/** The whole page, rendered once per language at build time. */
export function Site({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <JsonLd lang={lang} />
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
    </LangProvider>
  );
}
