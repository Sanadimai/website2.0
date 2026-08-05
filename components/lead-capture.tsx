"use client";

import { useState } from "react";
import { T, useT } from "@/components/lang";
import { Eyebrow, Reveal } from "@/components/site-ui";

const FORM_NAME = "checklist";

/**
 * Netlify Forms on a static export: the build bot detects the form from
 * `public/__forms.html`, and this component posts url-encoded data to that same
 * path. No backend, no third-party processor — only an email address is
 * collected, never patient data.
 */
export function LeadCapture() {
  const t = useT();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: a real person never fills a hidden field.
    if (data.get("company")) return setState("done");
    setState("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section id="checklist" className="pb-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal>
          <div className="rounded-[22px] border border-border bg-white p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
              <div>
                <Eyebrow en="One page, no pitch" ar="صفحة واحدة، بلا عرض بيعي" />
                <h2 className="mt-3 mb-2.5 text-[clamp(1.5rem,2.6vw,2rem)]">
                  <T
                    en="Five leaks losing UAE clinics money on WhatsApp."
                    ar="خمسة تسريبات تكلّف عيادات الإمارات أموالًا على واتساب."
                  />
                </h2>
                <p className="text-[0.94rem] text-sage">
                  <T
                    en="The checklist we use on discovery calls — what to check in your own inbox this week, whether or not you ever talk to us. We send it once. No sequence, no reselling your address."
                    ar="القائمة التي نستخدمها في مكالمات الاستكشاف — ما الذي تفحصه في صندوق رسائلك هذا الأسبوع، سواء تحدثت إلينا أم لا. نرسلها مرة واحدة، بلا سلسلة رسائل وبلا بيع عنوانك لأحد."
                  />
                </p>
              </div>

              {state === "done" ? (
                <p
                  role="status"
                  className="rounded-[14px] border border-leaf bg-leaf-soft p-5 text-[0.95rem] font-medium text-ink"
                >
                  <T
                    en="Sent — check your inbox. If it hasn't arrived in ten minutes, message us on WhatsApp and we'll send it by hand."
                    ar="أُرسلت — تفقّد بريدك. وإن لم تصل خلال عشر دقائق، راسلنا على واتساب ونرسلها لك يدويًا."
                  />
                </p>
              ) : (
                <form
                  name={FORM_NAME}
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="company"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-3"
                >
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  <p className="hidden">
                    <label>
                      Company <input name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <label className="text-[0.85rem] font-semibold" htmlFor="lead-clinic">
                    <T en="Clinic name" ar="اسم العيادة" />
                  </label>
                  <input
                    id="lead-clinic"
                    name="clinic"
                    type="text"
                    required
                    placeholder={t("Bright Smile Dental", "عيادة الابتسامة")}
                    className="min-h-11 rounded-xl border border-border bg-paper px-4 text-[0.95rem] outline-none focus-visible:border-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  />

                  <label className="text-[0.85rem] font-semibold" htmlFor="lead-email">
                    <T en="Work email" ar="البريد الإلكتروني" />
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    inputMode="email"
                    autoComplete="email"
                    placeholder="dr@clinic.ae"
                    dir="ltr"
                    className="min-h-11 rounded-xl border border-border bg-paper px-4 text-[0.95rem] outline-none focus-visible:border-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  />

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="mt-1 inline-flex min-h-11 items-center justify-center rounded-xl bg-pine px-[22px] py-[13px] text-[0.95rem] font-semibold text-[#f5f1e6] transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
                  >
                    {state === "sending" ? (
                      <T en="Sending…" ar="جارٍ الإرسال…" />
                    ) : (
                      <T en="Send me the checklist" ar="أرسل لي القائمة" />
                    )}
                  </button>

                  {state === "error" && (
                    <p role="alert" className="text-[0.85rem] font-medium text-[#8a3324]">
                      <T
                        en="That didn't send. Message us on WhatsApp and we'll send it by hand."
                        ar="لم يتم الإرسال. راسلنا على واتساب ونرسلها لك يدويًا."
                      />
                    </p>
                  )}

                  <p className="text-[0.76rem] text-sage">
                    <T
                      en="We store your clinic name and email only, to send this one document and follow up once. No patient data is collected here, and you can ask us to delete it at any time."
                      ar="نحتفظ باسم العيادة والبريد الإلكتروني فقط، لإرسال هذه الوثيقة ومتابعة واحدة. لا نجمع أي بيانات مرضى هنا، ويمكنك طلب حذفها في أي وقت."
                    />
                  </p>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
