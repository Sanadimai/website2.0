import Link from "next/link";
import type { Lang } from "@/components/lang";

/**
 * Legal pages. Server-rendered plain text — no client JS, no motion.
 *
 * PLACEHOLDERS: three fields are filled once the trade licence is issued.
 * Search the repo for "[[" to find them all.
 */
export const LEGAL_ENTITY = "[[ LEGAL ENTITY NAME ]]";
export const LICENCE_NO = "[[ TRADE LICENCE NO. ]]";
export const JURISDICTION = "[[ FREE ZONE / EMIRATE ]]";
export const REG_ADDRESS = "[[ REGISTERED ADDRESS ]]";

export const LAST_UPDATED = { en: "5 August 2026", ar: "٥ أغسطس ٢٠٢٦" };

export type LegalSlug = "privacy" | "terms" | "dpa";

type Block = { h: string; p: string[] };
type Doc = { title: string; intro: string; blocks: Block[] };

const EN: Record<LegalSlug, Doc> = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This policy explains what Sanad collects from visitors to sanad.im and from clinics that contact us, why, and what you can ask us to do about it. It does not cover patient conversations handled inside a clinic's deployment — those are governed by the Data Processing Agreement signed with that clinic, summarised on our DPA page.",
    blocks: [
      {
        h: "1. Who we are",
        p: [
          `Sanad is operated by ${LEGAL_ENTITY}, trade licence ${LICENCE_NO}, registered in ${JURISDICTION}, at ${REG_ADDRESS}. Contact: hello@sanad.im · WhatsApp +971 50 767 7581.`,
          "Sanad is pre-launch. Until the details above are completed, treat this page as the operating policy of the founding team and ask us directly if you need the registered particulars before signing anything.",
        ],
      },
      {
        h: "2. What we collect",
        p: [
          "From the website: the clinic name and email address you type into a form, and standard server logs kept by our hosting provider (IP address, user agent, requested page) for security and abuse prevention.",
          "From contact: whatever you choose to send us by email or WhatsApp, including messages, phone number and profile name.",
          "We do not use advertising cookies, cross-site trackers or behavioural profiling on this website.",
          "We never collect patient names, medical records, diagnoses or payment card data through this website.",
        ],
      },
      {
        h: "3. Why we use it",
        p: [
          "To send the document you asked for, to reply to your enquiry, to arrange and run a demo, and to keep a record of business correspondence. Our basis is your request and our legitimate interest in responding to it.",
          "We do not sell, rent or share your contact details with anyone for marketing.",
        ],
      },
      {
        h: "4. Who processes it with us",
        p: [
          "Website hosting and form submissions: our hosting provider, which stores form entries on our behalf.",
          "Email: our business email provider.",
          "WhatsApp messages you send us are processed by Meta under its own terms.",
          "Any sub-processor used in a live clinic deployment is named in that clinic's Data Processing Agreement before go-live.",
        ],
      },
      {
        h: "5. Where it is kept, and for how long",
        p: [
          "Enquiry records are kept for as long as the commercial conversation is live, and for up to twenty-four months afterwards so we can honour follow-ups and keep an audit trail, unless you ask us to delete them sooner.",
          "For live deployments, every stateful component that stores clinic or patient conversation data runs on infrastructure in the United Arab Emirates by architecture.",
        ],
      },
      {
        h: "6. Your rights",
        p: [
          "You can ask us what we hold about you, ask for a copy, ask us to correct it, ask us to delete it, or withdraw consent to further contact. Email hello@sanad.im and we will respond within thirty days.",
          "You may also complain to the competent UAE data protection authority.",
        ],
      },
      {
        h: "7. Security",
        p: [
          "Access to enquiry data is limited to the two founders. Credentials are stored outside the codebase, transport is encrypted end to end, and our security architecture is documented in a whitepaper authored and signed by our co-founder responsible for security. We will notify affected parties without undue delay, and within 72 hours of becoming aware, of any breach affecting personal data.",
        ],
      },
      {
        h: "8. Changes",
        p: [
          `We update this page when our practices change, and the date at the top is the version marker. Last updated ${LAST_UPDATED.en}.`,
        ],
      },
          {
        h: "Analytics, cookies and consent",
        p: [
          "sanad.im loads no analytics until you accept them. On your first visit a banner asks; nothing is set beforehand except your choice itself, which is stored in your browser's local storage under the key sanad-consent so we do not ask again.",
          "If you accept, two processors run: Google Analytics 4 (Google Ireland Limited), which sets cookies and records aggregate usage with IP anonymisation enabled; and Microsoft Clarity (Microsoft Corporation), which records session replays of how pages are used, including scrolling, clicks and form interaction. Clarity masks text entered into form fields by default.",
          "If you decline, neither product loads and no analytics cookies are set. You can change your mind by clearing site data for sanad.im, which restores the banner.",
          "Neither analytics processor receives patient data. Patient conversations never touch this website; they happen on a clinic's own WhatsApp number and are governed by that clinic's Data Processing Agreement.",
          "Netlify (hosting) and Cloudflare (DNS, CDN and access control) process request metadata such as IP address and user agent in order to serve the site securely. This is necessary for delivery and is not consent-based.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    intro:
      "These terms cover the use of sanad.im. The service itself is supplied under a separate signed Master Service Agreement, Statement of Work and Data Processing Agreement — nothing on this website is a contract or an offer capable of acceptance.",
    blocks: [
      {
        h: "1. The website",
        p: [
          `sanad.im is published by ${LEGAL_ENTITY} (${LICENCE_NO}, ${JURISDICTION}). You may read, quote and share it. You may not scrape it for resale, misrepresent it as your own, or use it to build a competing dataset.`,
        ],
      },
      {
        h: "2. Pre-launch status and pricing",
        p: [
          "Sanad is in a founding-cohort pre-launch phase limited to ten clinics. Prices, package contents and the founding discount shown on this website are current at the date of publication and may change before a proposal is issued. Only a signed Statement of Work fixes what you pay and what you receive.",
        ],
      },
      {
        h: "3. Figures on this website",
        p: [
          "Figures marked “illustrative” are worked arithmetic examples, not measured client results, and are not a forecast of your clinic's outcome. Sanad publishes no client results until real, attributable ones exist and the client has given written permission.",
          "We make no guarantee of a number of bookings, a revenue figure, or a return on investment. Any such guarantee, from anyone in this category, should be treated with suspicion.",
        ],
      },
      {
        h: "4. Scope of the service — the boundary that matters",
        p: [
          "Sanad provides appointment scheduling, patient-communication logistics and administrative automation only. It does not provide medical advice, diagnosis, triage or treatment recommendations, and it is configured to route every clinical question to the clinic's licensed staff. The clinic retains sole responsibility for all clinical care and clinical communications. This clause is reproduced verbatim in every client contract.",
        ],
      },
      {
        h: "5. Third-party platforms",
        p: [
          "Delivery depends on platforms we do not control, including WhatsApp Business services operated by Meta. Their availability, policies and pricing may change, and their terms apply to you as well as to us.",
        ],
      },
      {
        h: "6. Liability",
        p: [
          "The website is provided as is. To the extent permitted by law, we exclude liability for loss arising from reliance on it. Liability for the service itself is capped and defined in the signed agreement, not here.",
        ],
      },
      {
        h: "7. Governing law",
        p: [
          `These terms are governed by the laws of the United Arab Emirates and the courts of ${JURISDICTION} have jurisdiction. Last updated ${LAST_UPDATED.en}.`,
        ],
      },
    ],
  },
  dpa: {
    title: "Data Processing — Summary",
    intro:
      "A plain-language summary of the Data Processing Agreement every Sanad clinic signs before go-live. This page is a summary for evaluation; the signed DPA is the binding document, and we send it before you ask.",
    blocks: [
      {
        h: "1. Roles",
        p: [
          `The clinic is the data controller. ${LEGAL_ENTITY} is the data processor, acting only on the clinic's documented instructions, aligned to UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.`,
        ],
      },
      {
        h: "2. What is processed — and what is deliberately not",
        p: [
          "Processed: the patient's WhatsApp number and display name, message content relating to scheduling and logistics, transcripts of voice notes, appointment details, and the attribution tag attached to each booking.",
          "Never processed: medical records, diagnoses, clinical notes, prescriptions, insurance claim data or payment card data. The assistant is scope-limited by design so that clinical content is routed to the clinic's staff rather than handled by the system.",
          "Voice notes are transcribed in memory. The raw audio file is not written to disk and is not retained.",
        ],
      },
      {
        h: "3. Where it is processed",
        p: [
          "Every stateful component — datastore, orchestration server, conversation logs — runs in the United Arab Emirates region. Residency is an architectural decision, not a configuration option that can be switched off.",
        ],
      },
      {
        h: "4. Sub-processors",
        p: [
          "Each clinic's signed DPA names every sub-processor in force at signature: the WhatsApp Business Solution Provider, the cloud host, the speech-to-text provider and the language-model provider. Model and speech providers are used on zero-retention, no-training tiers, so clinic and patient content is not retained by them or used to train models.",
          "We give written notice before adding or replacing a sub-processor, and the clinic may object.",
        ],
      },
      {
        h: "5. Security and breach notice",
        p: [
          "Access control, encrypted transport, credential isolation outside the workflow layer, and an audit trail of booking writes. In the event of a personal-data breach we notify the clinic without undue delay and within 72 hours of becoming aware, with what we know at that point rather than waiting for a complete picture.",
        ],
      },
      {
        h: "6. Retention, deletion and audit",
        p: [
          "Conversation and booking data is retained for the term of the agreement. On termination, data is deleted within thirty days and written confirmation of deletion is provided.",
          "The clinic may audit the attribution figures in any monthly report line by line against the underlying conversation log, on request.",
        ],
      },
      {
        h: "7. Patients' rights",
        p: [
          "Requests from patients — access, correction, deletion, or opting out of messages — are passed to the clinic as controller, and we assist with the technical execution. Sending “STOP” (or the Arabic equivalent) suppresses all future business-initiated messages to that number immediately.",
        ],
      },
      {
        h: "8. Ask for the full document",
        p: [
          "Email hello@sanad.im and we will send the full DPA and the signed security whitepaper — before a proposal, not after. Our standing challenge stands: ask any other vendor for their equivalent paperwork.",
        ],
      },
    ],
  },
};

const AR: Record<LegalSlug, Doc> = {
  privacy: {
    title: "سياسة الخصوصية",
    intro:
      "توضّح هذه السياسة ما يجمعه سند من زوّار موقع sanad.im ومن العيادات التي تتواصل معنا، ولماذا، وما الذي يمكنك أن تطلبه بشأنه. ولا تشمل محادثات المرضى داخل نظام عيادة مشغّلة فعليًا — فتلك تحكمها اتفاقية معالجة البيانات الموقّعة مع تلك العيادة، والملخّصة في صفحة اتفاقية البيانات.",
    blocks: [
      {
        h: "١. من نحن",
        p: [
          `يُشغّل سند من قِبل ${LEGAL_ENTITY}، رخصة تجارية ${LICENCE_NO}، مسجّلة في ${JURISDICTION}، بعنوان ${REG_ADDRESS}. للتواصل: hello@sanad.im · واتساب +٩٧١ ٥٠ ٧٦٧ ٧٥٨١.`,
          "سند في مرحلة ما قبل الإطلاق. وإلى أن تُستكمل البيانات أعلاه، اعتبر هذه الصفحة السياسة المعمول بها لدى الفريق المؤسِّس، واطلب منّا البيانات النظامية مباشرة قبل توقيع أي شيء.",
        ],
      },
      {
        h: "٢. ما الذي نجمعه",
        p: [
          "من الموقع: اسم العيادة والبريد الإلكتروني اللذين تكتبهما في النموذج، وسجلات الخادم المعتادة لدى مزوّد الاستضافة (عنوان IP، ونوع المتصفح، والصفحة المطلوبة) لأغراض الأمان ومنع إساءة الاستخدام.",
          "من التواصل: ما تختار إرساله إلينا عبر البريد أو واتساب، بما في ذلك الرسائل ورقم الهاتف واسم الملف الشخصي.",
          "لا نستخدم ملفات تعريف ارتباط إعلانية ولا أدوات تتبّع عبر المواقع ولا تحليلًا سلوكيًا على هذا الموقع.",
          "لا نجمع عبر هذا الموقع أسماء مرضى ولا سجلات طبية ولا تشخيصات ولا بيانات بطاقات دفع إطلاقًا.",
        ],
      },
      {
        h: "٣. لماذا نستخدمها",
        p: [
          "لإرسال المستند الذي طلبته، وللرد على استفسارك، ولترتيب عرض توضيحي وتنفيذه، ولحفظ سجل المراسلات التجارية. وأساس المعالجة هو طلبك ومصلحتنا المشروعة في الرد عليه.",
          "لا نبيع بيانات تواصلك ولا نؤجّرها ولا نشاركها مع أي جهة لأغراض تسويقية.",
        ],
      },
      {
        h: "٤. من يعالجها معنا",
        p: [
          "استضافة الموقع واستقبال النماذج: مزوّد الاستضافة الذي يحفظ مدخلات النموذج نيابةً عنا.",
          "البريد الإلكتروني: مزوّد بريد الأعمال لدينا.",
          "رسائل واتساب التي ترسلها إلينا تعالجها ميتا وفق شروطها الخاصة.",
          "وأي معالج فرعي يُستخدم في تشغيل عيادة فعلية يُذكر بالاسم في اتفاقية معالجة البيانات الخاصة بتلك العيادة قبل الإطلاق.",
        ],
      },
      {
        h: "٥. أين تُحفظ وكم تبقى",
        p: [
          "تُحفظ سجلات الاستفسار طوال فترة المحادثة التجارية، ولمدة تصل إلى أربعة وعشرين شهرًا بعدها لأغراض المتابعة وسجل التدقيق، ما لم تطلب حذفها قبل ذلك.",
          "أما في التشغيل الفعلي، فكل مكوّن يخزّن بيانات العيادة أو محادثات المرضى يعمل على بنية تحتية داخل دولة الإمارات بحكم التصميم.",
        ],
      },
      {
        h: "٦. حقوقك",
        p: [
          "يمكنك أن تسألنا عمّا نحتفظ به عنك، وأن تطلب نسخة منه، أو تصحيحه، أو حذفه، أو سحب موافقتك على التواصل. راسلنا على hello@sanad.im ونرد خلال ثلاثين يومًا.",
          "ويحق لك أيضًا تقديم شكوى إلى الجهة المختصة بحماية البيانات في الدولة.",
        ],
      },
      {
        h: "٧. الأمان",
        p: [
          "الوصول إلى بيانات الاستفسارات مقصور على المؤسِّسَين، وبيانات الاعتماد تُحفظ خارج الشيفرة، والنقل مشفّر، ومعماريتنا الأمنية موثّقة في ورقة يكتبها ويوقّعها شريكنا المؤسس المسؤول عن الأمن. وسنُخطر المتضررين دون تأخير غير مبرر وخلال ٧٢ ساعة من علمنا بأي اختراق يمسّ بيانات شخصية.",
        ],
      },
      {
        h: "٨. التعديلات",
        p: [`نحدّث هذه الصفحة عند تغيّر ممارساتنا، والتاريخ أعلاه هو علامة النسخة. آخر تحديث: ${LAST_UPDATED.ar}.`],
      },
          {
        h: "التحليلات وملفات تعريف الارتباط والموافقة",
        p: [
          "لا يُحمّل موقع sanad.im أي أداة تحليلات قبل موافقتك. يظهر إشعار في زيارتك الأولى، ولا يُخزَّن شيء قبل ذلك سوى اختيارك نفسه في التخزين المحلي للمتصفح تحت المفتاح sanad-consent حتى لا نسألك مجددًا.",
          "إذا وافقت، تعمل أداتان: Google Analytics 4 (Google Ireland Limited) وتضع ملفات تعريف ارتباط وتسجّل استخدامًا إجماليًا مع إخفاء عنوان IP؛ وMicrosoft Clarity (Microsoft Corporation) وتسجّل جلسات التصفح شاملة التمرير والنقر والتفاعل مع النماذج، مع إخفاء النصوص المُدخلة في حقول النماذج افتراضيًا.",
          "إذا رفضت، لا تُحمَّل أي منهما ولا توضع أي ملفات تعريف ارتباط تحليلية. ويمكنك تغيير رأيك بمسح بيانات الموقع، فيعود الإشعار للظهور.",
          "لا تتلقى أي من أداتي التحليلات بيانات مرضى. فمحادثات المرضى لا تمر عبر هذا الموقع إطلاقًا، بل تجري على رقم واتساب الخاص بالعيادة وتحكمها اتفاقية معالجة البيانات الموقّعة معها.",
          "تعالج Netlify (الاستضافة) وCloudflare (أسماء النطاقات وشبكة التوزيع والتحكم بالوصول) بيانات وصفية للطلبات مثل عنوان IP ونوع المتصفح لتقديم الموقع بأمان، وهذا ضروري للتشغيل ولا يعتمد على الموافقة.",
        ],
      },
    ],
  },
  terms: {
    title: "شروط الاستخدام",
    intro:
      "تحكم هذه الشروط استخدام موقع sanad.im. أما الخدمة نفسها فتُقدَّم بموجب اتفاقية خدمة رئيسية ونطاق عمل واتفاقية معالجة بيانات موقّعة — ولا شيء في هذا الموقع يُعد عقدًا أو إيجابًا قابلًا للقبول.",
    blocks: [
      {
        h: "١. الموقع",
        p: [
          `ينشر موقع sanad.im من قِبل ${LEGAL_ENTITY} (${LICENCE_NO}، ${JURISDICTION}). يمكنك قراءته والاقتباس منه ومشاركته، ولا يجوز كشطه لإعادة بيعه أو نسبته لنفسك أو استخدامه لبناء قاعدة بيانات منافسة.`,
        ],
      },
      {
        h: "٢. مرحلة ما قبل الإطلاق والأسعار",
        p: [
          "سند في مرحلة دفعة تأسيسية محدودة بعشر عيادات. والأسعار ومحتويات الباقات وخصم التأسيس المعروضة هنا سارية بتاريخ النشر وقد تتغيّر قبل إصدار أي عرض. ولا يثبّت ما تدفعه وما تحصل عليه إلا نطاق عمل موقّع.",
        ],
      },
      {
        h: "٣. الأرقام الواردة في الموقع",
        p: [
          "الأرقام الموسومة «توضيحية» أمثلة حسابية وليست نتائج عملاء مقاسة، وليست توقعًا لنتيجة عيادتك. ولا ينشر سند أي نتائج عملاء قبل وجود نتائج حقيقية قابلة للإسناد وبإذن خطي من العميل.",
          "ولا نقدّم أي ضمان بعدد حجوزات أو رقم إيرادات أو عائد على الاستثمار. وأي ضمان من هذا النوع، من أي جهة في هذا المجال، يستحق الشك.",
        ],
      },
      {
        h: "٤. نطاق الخدمة — الحدّ الذي يهم",
        p: [
          "يقدّم سند جدولة المواعيد ولوجستيات التواصل مع المرضى والأتمتة الإدارية فقط. ولا يقدّم نصيحة طبية أو تشخيصًا أو فرزًا أو توصية علاجية، وهو مهيأ لتحويل كل سؤال سريري إلى الطاقم المرخّص في العيادة. وتبقى العيادة وحدها مسؤولة عن الرعاية السريرية والتواصل السريري. ويرد هذا البند نصًّا في كل عقد مع العملاء.",
        ],
      },
      {
        h: "٥. منصات الطرف الثالث",
        p: [
          "يعتمد التشغيل على منصات لا نتحكم بها، منها خدمات واتساب للأعمال التي تديرها ميتا، وقد تتغيّر إتاحتها وسياساتها وأسعارها، وتسري شروطها عليك كما تسري علينا.",
        ],
      },
      {
        h: "٦. المسؤولية",
        p: [
          "يُقدَّم الموقع كما هو، وبالقدر الذي يسمح به القانون نستبعد المسؤولية عن أي خسارة ناتجة عن الاعتماد عليه. أما المسؤولية عن الخدمة نفسها فمحدّدة ومحدودة في الاتفاقية الموقّعة لا هنا.",
        ],
      },
      {
        h: "٧. القانون الواجب التطبيق",
        p: [
          `تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة وتختص محاكم ${JURISDICTION} بالنظر في أي نزاع. آخر تحديث: ${LAST_UPDATED.ar}.`,
        ],
      },
    ],
  },
  dpa: {
    title: "معالجة البيانات — ملخّص",
    intro:
      "ملخّص بلغة واضحة لاتفاقية معالجة البيانات التي توقّعها كل عيادة قبل الإطلاق. هذه الصفحة ملخّص للتقييم، والاتفاقية الموقّعة هي المستند المُلزِم — ونرسلها قبل أن تطلبها.",
    blocks: [
      {
        h: "١. الأدوار",
        p: [
          `العيادة هي المتحكّم بالبيانات، و${LEGAL_ENTITY} هي المعالج، ولا تعمل إلا وفق تعليمات العيادة الموثّقة، بما يتوافق مع المرسوم بقانون اتحادي رقم ٤٥ لسنة ٢٠٢١ بشأن حماية البيانات الشخصية.`,
        ],
      },
      {
        h: "٢. ما الذي يُعالَج — وما الذي لا يُعالَج عمدًا",
        p: [
          "يُعالَج: رقم واتساب المريض واسم العرض، ومحتوى الرسائل المتعلق بالمواعيد واللوجستيات، ونصوص الرسائل الصوتية، وتفاصيل الموعد، ووسم الإسناد المرتبط بكل حجز.",
          "ولا يُعالَج إطلاقًا: السجلات الطبية والتشخيصات والملاحظات السريرية والوصفات وبيانات المطالبات التأمينية وبيانات بطاقات الدفع. فالمساعد محدود النطاق بحكم التصميم بحيث يُحوَّل المحتوى السريري إلى طاقم العيادة بدل أن يعالجه النظام.",
          "وتُفرَّغ الرسائل الصوتية في الذاكرة، ولا يُكتب الملف الصوتي الخام على القرص ولا يُحتفظ به.",
        ],
      },
      {
        h: "٣. أين تُعالَج",
        p: [
          "كل مكوّن يخزّن البيانات — قاعدة البيانات وخادم التنسيق وسجلات المحادثات — يعمل داخل منطقة دولة الإمارات. والإقامة الجغرافية قرار هندسي لا خيار في الإعدادات يمكن إطفاؤه.",
        ],
      },
      {
        h: "٤. المعالجون الفرعيون",
        p: [
          "تسمّي اتفاقية كل عيادة جميع المعالجين الفرعيين السارين وقت التوقيع: مزوّد حلول واتساب للأعمال، ومزوّد الاستضافة السحابية، ومزوّد تفريغ الصوت، ومزوّد النموذج اللغوي. وتُستخدم مزوّدات النماذج والتفريغ بمستوى «صفر احتفاظ وبلا تدريب»، فلا يحتفظون بمحتوى العيادة أو المرضى ولا يستخدمونه في تدريب النماذج.",
          "ونُشعر العيادة خطيًا قبل إضافة أي معالج فرعي أو استبداله، ولها حق الاعتراض.",
        ],
      },
      {
        h: "٥. الأمان والإخطار بالاختراق",
        p: [
          "ضبط للوصول، ونقل مشفّر، وعزل لبيانات الاعتماد خارج طبقة سير العمل، وسجل تدقيق لعمليات كتابة الحجوزات. وفي حال وقوع اختراق يمسّ بيانات شخصية، نُخطر العيادة دون تأخير غير مبرر وخلال ٧٢ ساعة من علمنا به، بما لدينا من معلومات حينها لا بعد اكتمال الصورة.",
        ],
      },
      {
        h: "٦. الاحتفاظ والحذف والتدقيق",
        p: [
          "تُحفظ بيانات المحادثات والحجوزات طوال مدة الاتفاقية، وعند انتهائها تُحذف خلال ثلاثين يومًا مع تأكيد خطي بالحذف.",
          "وللعيادة أن تدقّق أرقام الإسناد في أي تقرير شهري سطرًا بسطر مقابل سجل المحادثات، عند الطلب.",
        ],
      },
      {
        h: "٧. حقوق المرضى",
        p: [
          "تُحال طلبات المرضى — الاطلاع أو التصحيح أو الحذف أو إيقاف الرسائل — إلى العيادة بصفتها المتحكّم، ونساعد في التنفيذ التقني. وإرسال كلمة «إيقاف» يوقف فورًا كل الرسائل اللاحقة المرسلة من جهة العمل إلى ذلك الرقم.",
        ],
      },
      {
        h: "٨. اطلب المستند الكامل",
        p: [
          "راسلنا على hello@sanad.im لنرسل لك الاتفاقية الكاملة وورقة الأمن الموقّعة — قبل العرض لا بعده. ويبقى تحدّينا قائمًا: اطلب من أي مزوّد آخر ما يعادل هذه الوثائق.",
        ],
      },
    ],
  },
};

const NAV: Record<LegalSlug, { en: string; ar: string; href: Record<Lang, string> }> = {
  privacy: { en: "Privacy", ar: "الخصوصية", href: { en: "/privacy", ar: "/ar/privacy" } },
  terms: { en: "Terms", ar: "الشروط", href: { en: "/terms", ar: "/ar/terms" } },
  dpa: { en: "Data processing", ar: "معالجة البيانات", href: { en: "/dpa", ar: "/ar/dpa" } },
};

export function LegalPage({ slug, lang }: { slug: LegalSlug; lang: Lang }) {
  const ar = lang === "ar";
  const doc = (ar ? AR : EN)[slug];
  const home = ar ? "/ar" : "/";

  return (
    <div className="mx-auto max-w-[760px] px-7 py-16">
      <Link href={home} className="text-[0.88rem] font-semibold text-pine hover:text-gold">
        {ar ? "→ العودة إلى سند" : "← Back to Sanad"}
      </Link>

      <h1 className="mt-6 mb-2 text-[clamp(1.9rem,4vw,2.6rem)]">{doc.title}</h1>
      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-gold rtl:tracking-normal">
        {ar ? `آخر تحديث: ${LAST_UPDATED.ar}` : `Last updated ${LAST_UPDATED.en}`}
      </p>

      <p className="mt-6 rounded-[14px] border border-gold/50 bg-gold-soft/50 p-4 text-[0.86rem] leading-[1.7] text-ink">
        {ar
          ? "ملاحظة ما قبل الإطلاق: الحقول الموضوعة بين قوسين مزدوجين تُستكمل فور صدور الرخصة التجارية. وقد راجع الشريك المؤسس المسؤول عن الأمن مضمون هذه الصفحة، ولا يغني ذلك عن مراجعة قانونية مستقلة قبل التوقيع."
          : "Pre-launch note: fields shown in double brackets are completed once the trade licence is issued. The content of this page has been reviewed by the co-founder responsible for security; it does not replace independent legal review before signature."}
      </p>

      <p className="mt-6 text-[0.98rem] leading-[1.85] text-sage">{doc.intro}</p>

      {doc.blocks.map((b) => (
        <section key={b.h} className="mt-9">
          <h2 className="mb-2.5 text-[1.15rem] font-semibold">{b.h}</h2>
          {b.p.map((p) => (
            <p key={p.slice(0, 40)} className="mb-3 text-[0.95rem] leading-[1.85] text-sage">
              {p}
            </p>
          ))}
        </section>
      ))}

      <nav className="mt-12 flex flex-wrap gap-5 border-t border-border pt-6 text-[0.9rem] text-sage">
        {(Object.keys(NAV) as LegalSlug[])
          .filter((k) => k !== slug)
          .map((k) => (
            <Link key={k} href={NAV[k].href[lang]} className="hover:text-pine">
              {ar ? NAV[k].ar : NAV[k].en}
            </Link>
          ))}
        <a href="mailto:hello@sanad.im" className="hover:text-pine">
          hello@sanad.im
        </a>
      </nav>
    </div>
  );
}
