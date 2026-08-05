"use client";

import { T } from "@/components/lang";
import { Eyebrow, Reveal, SectionTitle } from "@/components/site-ui";
import { COMPARE } from "@/lib/content";

/**
 * The five questions that decide this category. Categories are compared, never
 * named vendors — the claim stays factual and the buyer leaves with our
 * evaluation criteria in their head.
 */
export function Compare() {
  return (
    <section id="compare" className="border-y border-border bg-paper-2 py-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <Eyebrow en="Before you choose anything" ar="قبل أن تختار أي حل" />
          <SectionTitle
            en="Five questions. Ask them of every option, including us."
            ar="خمسة أسئلة — اطرحها على كل خيار، وعلينا نحن أيضًا."
          />
          <p className="max-w-[640px] text-sage">
            <T
              en="Most clinic automation is compared on features. Features look identical on a page and behave nothing alike at 9 PM in Arabic. These five questions separate them."
              ar="أغلب حلول أتمتة العيادات تُقارَن بالميزات — والميزات تتشابه على الورق وتختلف تمامًا الساعة ٩ مساءً بالعربية. هذه الأسئلة الخمسة هي التي تفرّق بينها."
            />
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 overflow-x-auto rounded-[18px] border border-border bg-white">
            <table className="w-full min-w-[720px] border-collapse text-start text-[0.9rem]">
              <thead>
                <tr className="bg-pine text-[#e8efea]">
                  <th className="p-4 text-start font-semibold" scope="col">
                    <T en="The question" ar="السؤال" />
                  </th>
                  {COMPARE.cols.map((c, i) => (
                    <th
                      key={c.en}
                      scope="col"
                      className={`p-4 text-start font-semibold ${
                        i === 0 ? "bg-[rgba(201,162,75,.18)] text-gold-soft" : ""
                      }`}
                    >
                      <T en={c.en} ar={c.ar} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map((r) => (
                  <tr key={r.q.en} className="border-t border-border align-top">
                    <th scope="row" className="p-4 text-start font-semibold text-ink">
                      <T en={r.q.en} ar={r.q.ar} />
                    </th>
                    {r.v.map((v, i) => (
                      <td
                        key={v.en}
                        className={`p-4 ${
                          i === 0 ? "bg-leaf-soft/50 font-medium text-ink" : "text-sage"
                        }`}
                      >
                        <T en={v.en} ar={v.ar} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[0.86rem] text-sage">
          <T
            en="Category-level comparison, not a claim about any single vendor — verify each answer with whoever you are considering, including us."
            ar="مقارنة على مستوى الفئة لا ادعاء عن مزوّد بعينه — تحقّق من كل إجابة مع من تفكّر في التعامل معه، ومنّا نحن أيضًا."
          />
        </p>
      </div>
    </section>
  );
}
