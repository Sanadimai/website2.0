// Shared content used by both the rendered page (a client component) and the
// JSON-LD block (a server component). It must live outside "use client" — Next
// hands server code a client *reference* for anything exported from a client
// module, so PLANS.map() would explode at build time.

export const PLANS = [
  {
    plan: "Starter",
    featured: false,
    for: { en: "The bilingual WhatsApp receptionist, complete.", ar: "موظف الاستقبال الذكي ثنائي اللغة، كاملًا." },
    was: "AED 7,500",
    now: "AED 4,500",
    lbl: { en: "one-time setup", ar: "رسوم تأسيس لمرة واحدة" },
    monthly: "AED 1,500",
    items: [
      { en: "WhatsApp AI receptionist (AR + EN), 24/7", ar: "استقبال واتساب ذكي (عربي + إنجليزي) ٢٤/٧" },
      { en: "Conversational booking into your calendar", ar: "حجز محادثاتي مباشر في تقويمك" },
      { en: "Reminders + no-show recovery", ar: "تذكيرات + متابعة المتخلفين عن الحضور" },
      { en: "FAQ answers from your clinic config", ar: "إجابات الأسئلة الشائعة من معلومات عيادتك" },
      { en: "150 interactions/month included", ar: "١٥٠ تفاعلًا شهريًا ضمن الباقة" },
    ],
    cta: { en: "Start with Starter", ar: "ابدأ بستارتر" },
  },
  {
    plan: "Growth",
    featured: true,
    badge: { en: "Founding-offer default · most chosen", ar: "الخيار الافتراضي لدفعة التأسيس" },
    for: { en: "Reception + lead capture + reputation, in one system.", ar: "استقبال + التقاط عملاء + سمعة — في نظام واحد." },
    was: "AED 15,000",
    now: "AED 9,000",
    lbl: { en: "one-time setup · 40% off", ar: "رسوم تأسيس · خصم ٤٠٪" },
    monthly: "AED 2,500",
    items: [
      { en: "Everything in Starter", ar: "كل ما في ستارتر" },
      { en: "Instagram & Google lead capture, instant reply", ar: "التقاط عملاء إنستغرام وجوجل بردّ فوري" },
      { en: "Missed-call auto-text", ar: "رسالة تلقائية لكل مكالمة فائتة" },
      { en: "Google review-generation engine", ar: "محرّك توليد تقييمات جوجل" },
      { en: "Attribution-tagged monthly report — provable bookings only", ar: "تقرير شهري موسوم — حجوزات مثبتة فقط" },
      { en: "400 interactions/month included", ar: "٤٠٠ تفاعل شهريًا ضمن الباقة" },
    ],
    cta: { en: "Reserve a founding slot", ar: "احجز مقعد التأسيس" },
  },
  {
    plan: "Clinic OS",
    featured: false,
    for: { en: "For multi-branch clinics and groups.", ar: "للعيادات متعددة الفروع والمجموعات." },
    was: "AED 25,000",
    now: "AED 15,000",
    lbl: { en: "one-time setup", ar: "رسوم تأسيس لمرة واحدة" },
    monthly: "AED 4,000",
    items: [
      { en: "Everything in Growth", ar: "كل ما في النمو" },
      { en: "Multi-branch message routing", ar: "توجيه الرسائل بين الفروع" },
      { en: "Insurance pre-check flow", ar: "مسار تحقق مبدئي من التأمين" },
      { en: "Recall campaigns (6-month recalls, refills)", ar: "حملات استدعاء (مراجعات نصف سنوية، تجديد وصفات)" },
      { en: "Quarterly optimization call · 900 interactions/mo", ar: "مكالمة تحسين ربع سنوية · ٩٠٠ تفاعل شهريًا" },
    ],
    cta: { en: "Talk multi-branch", ar: "لنتحدث عن الفروع" },
  },
];

export const FAQS = [
  {
    en: ["Will it replace our receptionist?", "No — and we won't pitch that. Sanad covers nights, weekends, Fridays, and the thirty messages she can't answer while checking a patient in. She stays exactly where she is; we brief her personally at onboarding so the system works for her."],
    ar: ["هل سيحل محل موظفة الاستقبال؟", "لا — ولن نروّج لذلك أصلًا. سند يغطي الليالي وعطلات الأسبوع وأيام الجمعة، وثلاثين رسالة لا تستطيع الرد عليها وهي مع مريض أمامها. تبقى في مكانها تمامًا، ونطلعها بأنفسنا على النظام عند الإعداد ليعمل لصالحها."],
  },
  {
    en: ["Does it really understand voice notes?", "Yes. Gulf-dialect Arabic, MSA and English voice notes are transcribed in memory and answered in seconds; the audio itself is never stored. If Sanad is not confident, it hands the conversation to your staff. Voice replies are available only as an optional AED 400/month add-on."],
    ar: ["هل يفهم الرسائل الصوتية فعلًا؟", "نعم. تُفرّغ الرسائل الصوتية بالعربية الخليجية والفصحى والإنجليزية في الذاكرة ويُرد عليها خلال ثوانٍ، ولا يُخزَّن الصوت نفسه. وإذا لم يكن سند واثقًا، يحوّل المحادثة إلى فريقك. الرد الصوتي متاح فقط كإضافة اختيارية بقيمة ٤٠٠ درهم شهريًا."],
  },
  {
    en: ["What happens with medical questions?", "Sanad never answers them — by hard design, not by hoping the AI behaves. Every clinical question triggers one fixed deflection in the patient's language and routes to your licensed staff. This boundary is written verbatim into every contract."],
    ar: ["ماذا عن الأسئلة الطبية؟", "لا يجيب عنها سند أبدًا — بتصميم صارم، لا بالاتكال على حسن سلوك الذكاء الاصطناعي. كل سؤال طبي يقابله ردّ ثابت واحد بلغة المريض ويُحوَّل لطاقمك المرخّص. هذا الحد مكتوب نصًا في كل عقد."],
  },
  {
    en: ["Where does patient data go?", "It stays in-country by architecture. You sign a PDPL-aligned data-processing agreement naming every sub-processor; voice notes are transcribed in memory and the audio is never stored; medical records are never collected at all. Then ask any other vendor for their equivalent paperwork."],
    ar: ["أين تذهب بيانات المرضى؟", "تبقى داخل الدولة بحكم البنية الهندسية. توقّع اتفاقية معالجة بيانات متوافقة مع PDPL تسمّي كل معالج فرعي؛ الرسائل الصوتية تُفرَّغ في الذاكرة ولا يُخزَّن الصوت أبدًا؛ والسجلات الطبية لا تُجمَع إطلاقًا. ثم اطلب من أي مزوّد آخر وثائق مماثلة."],
  },
  {
    en: ["What if a patient wants a human?", "Typing “human” or «أريد التحدث مع شخص» stops the bot instantly and alerts your team with the full conversation attached. The same happens automatically whenever Sanad isn't confident."],
    ar: ["ماذا لو أراد المريض التحدث مع إنسان؟", "كتابة «أريد التحدث مع شخص» توقف البوت فورًا وتنبّه فريقك مع المحادثة كاملة. ويحدث الأمر نفسه تلقائيًا كلما لم يكن سند واثقًا من الإجابة."],
  },
  {
    en: ["How fast can we go live?", "WhatsApp Business verification starts the day you sign (Meta takes 3–7 days). Configuration and Arabic sign-off run in parallel — go-live in days, not months."],
    ar: ["متى ننطلق؟", "توثيق واتساب للأعمال يبدأ يوم توقيعك (يستغرق لدى ميتا ٣–٧ أيام)، ويجري الإعداد واعتماد العربية بالتوازي — فالانطلاق خلال أيام لا أشهر."],
  },
  {
    en: ["What exactly does the monthly report show?", "One headline number: bookings Sanad provably originated, tagged at booking time — plus the assisted and staff numbers shown separately. Every line is auditable against the conversation log if you ever want to check."],
    ar: ["ماذا يعرض التقرير الشهري تحديدًا؟", "رقم رئيسي واحد: الحجوزات التي أنشأها سند بشكل مثبت، موسومة لحظة حدوثها — مع عرض حجوزات المساعدة والموظفين منفصلة. وكل سطر قابل للتدقيق مقابل سجل المحادثات متى شئت."],
  },
  {
    en: ["We tried a chatbot before and it was useless.", "That is the most common story we hear, and usually for the same three reasons: it was built once and never maintained, nobody owned the Arabic, and it reported nothing you could check. Ask any vendor the three questions that would have caught it — who runs it, whose number is it on, and where does the data live — then ask to see a live conversation in Arabic before you pay anything."],
    ar: ["جرّبنا بوتًا من قبل ولم يكن مفيدًا.", "هذه أكثر قصة نسمعها، وعادةً للأسباب الثلاثة نفسها: بُني مرة واحدة ولم يُصَن، ولم يتولَّ أحد جودة العربية، ولم يقدّم رقمًا يمكنك التحقق منه. اسأل أي مزوّد الأسئلة الثلاثة التي كانت ستكشفه — من يشغّله، وعلى أي رقم، وأين تُخزَّن البيانات — ثم اطلب مشاهدة محادثة حية بالعربية قبل أن تدفع شيئًا."],
  },
  {
    en: ["We already use a booking platform like Okadoc or Vezeeta.", "Keep it. Those platforms bring you new patients; Sanad answers the patients who already message your own number — after hours, in Arabic, and about the appointments already in your book. Different jobs, and we never compete for your patient relationship."],
    ar: ["نستخدم منصة حجز مثل أوكادوك أو فيزيتا.", "احتفظ بها. تلك المنصات تجلب مرضى جددًا، أما سند فيرد على من يراسل رقمك أنت أصلًا — خارج الدوام، وبالعربية، وبشأن المواعيد الموجودة في جدولك فعلًا. وظيفتان مختلفتان، ولا ننافسك على علاقتك بمريضك أبدًا."],
  },
];

/** Founding-cohort counter. Update this one number as slots fill — it drives the
 *  bars and the label in the final CTA. A stale counter is worse than none. */
export const FOUNDING_SLOTS_TOTAL = 10;
export const FOUNDING_SLOTS_OPEN = 10;

/** The five questions that decide this category, and how each option answers them.
 *  Factual, category-level — no competitor is named or disparaged. */
export const COMPARE = {
  cols: [
    { en: "Sanad", ar: "سند" },
    { en: "DIY WhatsApp software", ar: "برامج واتساب الذاتية" },
    { en: "Booking marketplaces", ar: "منصات الحجز" },
    { en: "Agency chatbot project", ar: "بوت من وكالة" },
  ],
  rows: [
    {
      q: { en: "Who runs it?", ar: "من يشغّله؟" },
      v: [
        { en: "We do — done for you", ar: "نحن — جاهز بالكامل" },
        { en: "Someone at your clinic", ar: "أحد موظفي عيادتك" },
        { en: "The platform, for its own funnel", ar: "المنصة، لقمعها هي" },
        { en: "Nobody, after handover", ar: "لا أحد بعد التسليم" },
      ],
    },
    {
      q: { en: "Whose number is it on?", ar: "على أي رقم؟" },
      v: [
        { en: "Your own clinic number", ar: "رقم عيادتك أنت" },
        { en: "Your number, your setup", ar: "رقمك، وإعدادك أنت" },
        { en: "Theirs — they own the patient", ar: "رقمهم — ويملكون المريض" },
        { en: "Varies by project", ar: "يختلف حسب المشروع" },
      ],
    },
    {
      q: { en: "Where does patient data live?", ar: "أين تُخزَّن بيانات المرضى؟" },
      v: [
        { en: "In the UAE, by architecture + signed DPA", ar: "داخل الإمارات بحكم التصميم، مع اتفاقية موقّعة" },
        { en: "Usually offshore; no DPA at small-business tier", ar: "غالبًا خارج الدولة، وبلا اتفاقية للشريحة الصغيرة" },
        { en: "On their platform", ar: "على منصتهم" },
        { en: "Rarely documented", ar: "نادرًا ما تُوثَّق" },
      ],
    },
    {
      q: { en: "Arabic quality — who is accountable?", ar: "جودة العربية — من المسؤول عنها؟" },
      v: [
        { en: "A named reviewer signs off before go-live", ar: "مراجع باسمه يعتمدها قبل الإطلاق" },
        { en: "Unmanaged — whatever the model returns", ar: "غير مُدارة — ما ينتجه النموذج" },
        { en: "Interface localised, not the reception", ar: "الواجهة موطّنة لا الاستقبال" },
        { en: "Unmanaged after delivery", ar: "غير مُدارة بعد التسليم" },
      ],
    },
    {
      q: { en: "How is value proved?", ar: "كيف تُثبَت القيمة؟" },
      v: [
        { en: "Monthly report — provable bookings only", ar: "تقرير شهري — حجوزات مُثبتة فقط" },
        { en: "Message and session counts", ar: "عدد الرسائل والجلسات" },
        { en: "Bookings they sold you", ar: "حجوزات باعوها لك" },
        { en: "No ongoing reporting", ar: "بلا تقارير مستمرة" },
      ],
    },
  ],
};

/**
 * Public profiles for schema.org `sameAs` — how Google and AI assistants confirm
 * Sanad is a real, linked entity rather than a parked domain.
 * Paste full URLs (https://www.linkedin.com/company/... etc). Empty = omitted.
 */
export const SOCIAL_PROFILES = [
  { name: "Instagram", href: "https://www.instagram.com/sanadimai/" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61592784626206" },
  { name: "X", href: "https://x.com/Sanadimai" },
] as const;

/** Same profiles, flattened for schema.org sameAs. */
export const SOCIALS: string[] = SOCIAL_PROFILES.map((p) => p.href);

/**
 * The illustrative revenue-leakage model shown on the homepage.
 * Displayed figures are derived from these inputs, never hard-coded, so the
 * arithmetic on the page can never disagree with the arithmetic in the API.
 */
export const REVENUE_MODEL = {
  averageConsultationAed: 400,
  convertibleMessagesMissedPerDay: 3,
  workingDaysPerMonth: 21,
} as const;

/** AED left unrecovered each month under the model above. */
export function monthlyLeakageAed(m = REVENUE_MODEL): number {
  return (
    m.averageConsultationAed *
    m.convertibleMessagesMissedPerDay *
    m.workingDaysPerMonth
  );
}
