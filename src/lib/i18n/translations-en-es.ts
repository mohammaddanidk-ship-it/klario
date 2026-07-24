import type { LanguageCode } from "./config";
import type { Translation, TranslationDict } from "./types";

/* -------------------------------------------------------------------------- */
/*  English — base reference                                                  */
/* -------------------------------------------------------------------------- */

const en: Translation = {
  nav_platform: "Platform",
  nav_features: "Features",
  nav_security: "Security",
  nav_howItWorks: "How it works",
  nav_languages: "Language",
  nav_signIn: "Sign in",
  nav_getStarted: "Get started",
  nav_openMenu: "Open menu",
  nav_closeMenu: "Close menu",

  hero_badge: "Now in 16 languages with right-to-left support",
  hero_title_1: "Understand anything.",
  hero_title_2: "Stay safe. In your language.",
  hero_subtitle:
    "Klario reads medical reports, legal notices, bank letters, contracts, and suspicious messages — then explains them in plain words, in your language, before you make a decision.",
  hero_ctaPrimary: "Analyze a document",
  hero_ctaSecondary: "Try the scam detector",
  hero_trust1: "Private by design",
  hero_trust2: "You control every upload",
  hero_trust3: "Responsible AI",
  hero_chipTitle: "AI understanding",
  hero_chipSub: "Plain words · your language",

  trust_label: "Honest by design — no fake badges, no empty promises",
  trust_1: "Privacy focused",
  trust_2: "Secure processing",
  trust_3: "User-controlled uploads",
  trust_4: "Responsible AI",

  tcf_eyebrow: "Two ways Klario helps",
  tcf_title_1: "One assistant.",
  tcf_title_2: "Two kinds of clarity.",
  tcf_description:
    "Klario does two things, and does them seriously: it explains important documents in words you can trust, and it tells you whether a message is trying to trick you.",
  tcf_docTitle: "Document understanding",
  tcf_docDesc:
    "Upload any important document. Klario explains what it means, flags risks, and tells you what to do next — in your language.",
  tcf_docCta: "See how it works",
  tcf_scamTitle: "Phishing & scam detector",
  tcf_scamDesc:
    "Paste a suspicious email, SMS, or screenshot. Klario tells you if it's safe, why it looks risky, and exactly what to do next.",
  tcf_scamCta: "See how it works",

  du_eyebrow: "Document understanding",
  du_title: "Seven things Klario gives you for every document",
  du_description:
    "Not a summary. A real understanding — with the risks surfaced and the next steps spelled out.",
  du_1_title: "Simple explanation",
  du_1_desc: "A clear, plain-language explanation of what the document is and why it matters to you.",
  du_2_title: "Short summary",
  du_2_desc: "The essential points in a few sentences, so you can decide whether to read the full thing.",
  du_3_title: "Important points",
  du_3_desc: "The clauses, numbers, dates, and obligations you cannot afford to miss.",
  du_4_title: "Difficult terms explained",
  du_4_desc: "Legal, medical, and financial jargon translated into everyday words — without losing precision.",
  du_5_title: "Possible risks",
  du_5_desc: "What could go wrong if you sign, pay, ignore, or agree. Stated honestly, not alarmingly.",
  du_6_title: "Recommended next steps",
  du_6_desc: "A short, ordered list of what to do next — and in what order.",
  du_7_title: "Questions to ask a professional",
  du_7_desc: "The exact questions to bring to your lawyer, doctor, or accountant so nothing is lost.",

  pd_eyebrow: "Phishing & scam detector",
  pd_title: "Never just \"this is a scam\" — always the why",
  pd_description:
    "Klario explains its reasoning so you can learn to spot the pattern yourself, not just trust a label.",
  pd_1_title: "Safe or suspicious",
  pd_1_desc: "A clear verdict you can act on, with a confidence level attached.",
  pd_2_title: "Risk score",
  pd_2_desc: "A 0–100 risk score with a breakdown of what pushed it up or down.",
  pd_3_title: "Reasons behind the detection",
  pd_3_desc: "Every reason spelled out, tied to the exact words or links that triggered it.",
  pd_4_title: "Suspicious words & links",
  pd_4_desc: "The phrases, URLs, and sender details that look off — highlighted and explained.",
  pd_5_title: "What to do next",
  pd_5_desc: "Step-by-step guidance: ignore, report, block, change a password, or contact your bank.",

  sr_eyebrow: "Sample analysis",
  sr_title: "What a Klario report looks like",
  sr_description:
    "Every analysis is delivered as a clean, structured report — not a chat reply. This is a sample for a medical report.",
  sr_docType: "Document type",
  sr_language: "Language detected",
  sr_summary: "Summary",
  sr_summaryBody:
    "Your blood test shows slightly elevated cholesterol and a vitamin D level below the normal range. Your doctor recommends a follow-up in three months and a small change in diet. Nothing in this report indicates an urgent condition.",
  sr_keyInfo: "Key information",
  sr_keyInfo_1: "Total cholesterol: 212 mg/dL (slightly above target)",
  sr_keyInfo_2: "Vitamin D: 24 ng/mL (below normal range)",
  sr_keyInfo_3: "Follow-up appointment recommended in 3 months",
  sr_riskLevel: "Risk level",
  sr_riskLow: "Low — no urgent action required",
  sr_warnings: "Important warnings",
  sr_warningBody:
    "This summary is not a diagnosis. Do not stop or start any medication based on it alone. Confirm results with your doctor.",
  sr_actions: "Recommended actions",
  sr_action_1: "Schedule a follow-up appointment with your doctor",
  sr_action_2: "Discuss dietary changes and possible vitamin D supplement",
  sr_action_3: "Re-test in 3 months as recommended",
  sr_askAi: "Ask Klario a follow-up",
  sr_askAiPlaceholder: "e.g. What does \"mg/dL\" mean?",
  sr_translate: "Translate",
  sr_download: "Download report",
  sr_disclaimer:
    "Klario provides information to help you understand documents. It is not a substitute for professional medical, legal, or financial advice.",

  ml_eyebrow: "Built for the whole world",
  ml_title: "Sixteen languages. One standard of accuracy.",
  ml_description:
    "Klario was designed multilingual from day one — not translated as an afterthought. The AI reasons in your language and keeps the meaning precise.",
  ml_rtl: "Full right-to-left support",
  ml_rtlDesc: "Arabic and Urdu render natively, with proper layout direction and typography.",
  ml_accuracy: "Meaning over word-for-word",
  ml_accuracyDesc: "Professional terminology in law, medicine, and finance is preserved, not broken.",
  ml_global: "One product, every region",
  ml_globalDesc: "The same care for a user in Tokyo, Cairo, Berlin, or São Paulo.",

  up_eyebrow: "Upload with confidence",
  up_title_1: "Bring the documents you",
  up_title_2: "wouldn't trust anywhere else",
  up_description:
    "Drag, drop, and let Klario do the reading. Files are processed privately and removed when you're done. You stay in control the entire time.",
  up_dropHere: "Drop your files here",
  up_browse: "browse from your device",
  up_encrypted: "Private processing · you control deletion",
  up_types: "PDF · DOCX · PNG · JPG · EML · up to 100MB",
  up_categories: "Document types Klario understands",
  up_privacyTitle: "Your documents never leave your control",
  up_privacyDesc:
    "Uploads are processed for your analysis and removed when you end the session. Klario does not train on your data, ever.",
  up_type_medical: "Medical reports",
  up_type_legal: "Legal notices",
  up_type_gov: "Government letters",
  up_type_bank: "Bank documents",
  up_type_financial: "Financial statements",
  up_type_contract: "Contracts",
  up_type_invoice: "Invoices",
  up_type_email: "Emails & screenshots",
  up_type_suspicious: "Suspicious messages",
  up_hint_medical: "Private handling",
  up_hint_legal: "Privileged",
  up_hint_gov: "Verified",
  up_hint_bank: "Encrypted",
  up_hint_financial: "Read-only",
  up_hint_contract: "Clause-aware",
  up_hint_invoice: "Parsed",
  up_hint_email: "PII-stripped",
  up_hint_suspicious: "Risk-scored",
  up_reassureTitle: "Your privacy comes first",
  up_reassureDesc:
    "Files are processed for your analysis and deleted on your command. No training on your data. No sharing with third parties.",

  hw_eyebrow: "How it works",
  hw_title: "From upload to understanding in three steps",
  hw_description: "A simple, observable flow. No black boxes, no hidden data paths.",
  hw_1_title: "Upload securely",
  hw_1_desc:
    "Choose a document or paste a message. Uploads are processed privately — you can delete everything at any time, instantly.",
  hw_2_title: "Klario reads and reasons",
  hw_2_desc:
    "Klario extracts structure, explains the meaning, flags risks, and prepares the questions you should ask a professional — in your language.",
  hw_3_title: "Review and act",
  hw_3_desc:
    "Read your structured report, ask follow-up questions, translate it, or download it. Then decide with confidence.",

  sec_eyebrow: "Security & privacy",
  sec_title: "Built for documents you can't afford to get wrong",
  sec_description:
    "Klario is designed around a simple promise: your documents serve you, not us. Here is exactly how that works in practice.",
  sec_1_title: "Private by design",
  sec_1_desc:
    "We collect the minimum needed to run the service. We do not sell data, do not share it with advertisers, and do not use it to train models.",
  sec_2_title: "User-controlled uploads",
  sec_2_desc:
    "You decide what to upload and when to delete it. Removal is immediate and irreversible — no soft deletes, no hidden copies.",
  sec_3_title: "Encrypted in transit",
  sec_3_desc:
    "All uploads and responses are sent over TLS. Your session is isolated from other users.",
  sec_4_title: "Responsible AI",
  sec_4_desc:
    "Klario explains its reasoning, cites the source text, and never gives a verdict without showing why. It's built to inform — not to decide for you.",
  sec_5_title: "No training on your data",
  sec_5_desc:
    "Your documents and conversations are never used to train Klario's models. This is enforced in code, not just in policy.",
  sec_6_title: "Transparent limitations",
  sec_6_desc:
    "Klario tells you when it's unsure, when a document is ambiguous, and when you should speak to a professional. Honesty is a feature.",

  sec_stripTitle: "Honest about what we are — and what we are not",
  sec_stripDesc:
    "Klario is not a lawyer, doctor, or financial advisor. We do not hold certifications we have not earned. We are an understanding and safety assistant, and we are clear about that.",
  sec_stripCta: "Read our full trust & legal policy",

  st_1_value: "16",
  st_1_label: "Languages supported, with full RTL",
  st_1_sub: "Including Arabic and Urdu",
  st_2_value: "<2s",
  st_2_label: "Average time to first explanation",
  st_2_sub: "For single-document analysis",
  st_3_value: "0",
  st_3_label: "Customer documents used for training",
  st_3_sub: "By policy, ever",
  st_4_value: "7",
  st_4_label: "Structured outputs per document",
  st_4_sub: "Explanation · risks · next steps · and more",

  st_footnote:
    "Figures describe the product as designed. Operational metrics are published in the trust center.",

  legal_eyebrow: "Trust & legal",
  legal_title: "What Klario is, and what it isn't",
  legal_description:
    "We keep these short, plain, and honest. If anything here feels unclear, write to us and we'll answer directly.",
  legal_privacy: "Privacy",
  legal_security: "Security",
  legal_terms: "Terms",
  legal_disclaimer: "Medical & legal disclaimer",
  legal_privacyBody:
    "Klario collects only what is required to run the service: your account email, the documents you choose to upload, and the language you select. We do not sell personal data, do not share it for advertising, and do not use your documents to train AI models. You can delete any document at any time; deletion is immediate and irreversible. A full data export is available on request.",
  legal_securityBody:
    "All uploads and responses are encrypted in transit using TLS. Sessions are isolated between users. Access to production systems is restricted to a small number of named engineers and is logged. We do not currently hold SOC 2, HIPAA, or ISO 27001 certifications — when that changes, we will say so here, with a link to the report. Until then, we describe our practices honestly rather than overstate them.",
  legal_termsBody:
    "Klario is provided as an understanding and safety assistant. You agree to use it lawfully, to upload only documents you have the right to upload, and to accept that Klario's output is informational, not professional advice. You may not use Klario to process documents on someone else's behalf without their consent, or to harm, deceive, or defraud any person. Accounts can be terminated for abuse.",
  legal_disclaimerBody:
    "Klario helps you understand documents. It is not a doctor, lawyer, accountant, or financial advisor, and its output is not medical, legal, or financial advice. Do not start, stop, or change any treatment, sign any contract, or make any major decision based solely on Klario's output. Always confirm important findings with a qualified professional in your jurisdiction. Klario may make mistakes — read its reasoning, not just its conclusion.",
  legal_cookie: "Cookie policy",
  legal_cookieBody:
    "Klario uses a small number of essential cookies to keep you signed in and remember your language preference. We do not use advertising or cross-site tracking cookies. Your language choice is stored locally in your browser; your session token is a first-party, strictly necessary cookie. You can clear all cookies from your browser at any time, and Klario will still work — you will simply be asked to choose your language again.",
  legal_aiTransparency: "AI transparency",
  legal_aiTransparencyBody:
    "Klario uses large language models to read, summarize, and explain your documents. We tell you, in plain terms, what the model did and which parts of your document it relied on. Every analysis includes a confidence level and, where relevant, a note when the model is uncertain or the text is ambiguous. We do not present AI output as certainty. When Klario does not know, it says so. When a finding could affect your health, rights, or money, we tell you to confirm with a professional.",
  legal_responsibleAi: "Responsible AI",
  legal_responsibleAiBody:
    "Klario is built to inform, not to decide for you. We do not build features that nudge users toward risky actions. We show the reasoning behind every risk score and every scam verdict, so you can judge for yourself. We test for bias against common document types and languages, and we publish what we find honestly. We do not claim perfection — we claim honesty about our limits. If a feature would improve beauty but reduce clarity, we keep clarity.",
  legal_financial: "Financial disclaimer",
  legal_financialBody:
    "Klario can read bank statements, invoices, contracts, and financial documents and explain what they say in plain words. Its output is not financial, investment, tax, or accounting advice, and it is not a recommendation to buy, sell, hold, or sign anything. Klario is not a regulated financial advisor. Do not make financial decisions based solely on its output. Always confirm with a licensed professional in your jurisdiction before acting on anything that affects your money.",

  faq_eyebrow: "Trust center",
  faq_title: "The questions you should be asking",
  faq_description:
    "If a service can't answer these clearly, it shouldn't have your documents. Here are ours, in plain language.",
  faq_1_q: "Is my data used to train Klario's models?",
  faq_1_a:
    "No. Klario never uses your documents, messages, or conversations to train, fine-tune, or evaluate any model. This is enforced in code and stated in our terms.",
  faq_2_q: "What happens to my document after I'm done?",
  faq_2_a:
    "When you end a session or delete a document, it is removed immediately and irreversibly. We do not keep soft copies. You can also export everything you've uploaded at any time.",
  faq_3_q: "Can Klario replace my doctor, lawyer, or accountant?",
  faq_3_a:
    "No, and it is not trying to. Klario helps you understand documents and spot risks before you speak to a professional. It will often tell you the exact questions to ask them. But the final decision is always yours and your professional's — not Klario's.",
  faq_4_q: "How accurate are the translations?",
  faq_4_a:
    "Klario reasons in your selected language rather than translating word-for-word. Legal, medical, and financial terminology is preserved with its correct professional meaning. For right-to-left languages like Arabic and Urdu, the entire interface and the analysis flip direction correctly.",
  faq_5_q: "Does Klario detect every scam?",
  faq_5_a:
    "No tool can detect every scam, and any product that claims 100% detection is not being honest. Klario explains its reasoning and shows you exactly what looks suspicious, so you can make your own judgment. If something feels wrong even when Klario says it's safe, trust your instinct and verify through another channel.",
  faq_6_q: "What if Klario makes a mistake?",
  faq_6_a:
    "Klario can be wrong. That is why every analysis shows the source text it relied on, flags its own confidence level, and tells you when a document is ambiguous. If you spot an error, report it — we use those reports to improve.",

  cta_badge: "Free to try · no card required · delete anytime",
  cta_title_1: "Bring one document.",
  cta_title_2: "See why people stop guessing.",
  cta_description:
    "Upload a report, paste a message, or just look around. Klario will explain it clearly — in your language — and you can delete everything when you're done.",
  cta_primary: "Start understanding",
  cta_secondary: "Read the trust & legal policy",

  footer_tagline:
    "Understand anything. Stay safe. In your language. Built for people who make important decisions.",
  footer_platform: "Platform",
  footer_platform_1: "Document understanding",
  footer_platform_2: "Scam detector",
  footer_platform_3: "Languages",
  footer_platform_4: "How it works",
  footer_security: "Trust & legal",
  footer_security_1: "Privacy",
  footer_security_2: "Security",
  footer_security_3: "Terms",
  footer_security_4: "Disclaimer",
  footer_company: "Company",
  footer_company_1: "About",
  footer_company_2: "Responsible AI",
  footer_company_3: "Contact",
  footer_company_4: "Status",
  footer_resources: "Resources",
  footer_resources_1: "Help center",
  footer_resources_2: "Guides",
  footer_resources_3: "API",
  footer_resources_4: "Changelog",
  footer_rights: "All rights reserved.",
  footer_privacy: "Privacy",
  footer_terms: "Terms",
  footer_disclaimer: "Disclaimer",
  footer_status: "All systems operational",

  lang_selectLanguage: "Select your language",
  lang_searchPlaceholder: "Search languages",
};

/* -------------------------------------------------------------------------- */
/*  Helpers — common Spanish/French/etc structure kept consistent             */
/* -------------------------------------------------------------------------- */

const es: Translation = {
  nav_platform: "Plataforma",
  nav_features: "Funciones",
  nav_security: "Seguridad",
  nav_howItWorks: "Cómo funciona",
  nav_languages: "Idioma",
  nav_signIn: "Iniciar sesión",
  nav_getStarted: "Empezar",
  nav_openMenu: "Abrir menú",
  nav_closeMenu: "Cerrar menú",

  hero_badge: "Disponible en 16 idiomas con soporte de derecha a izquierda",
  hero_title_1: "Entiende cualquier cosa.",
  hero_title_2: "Estás seguro. En tu idioma.",
  hero_subtitle:
    "Klario lee informes médicos, notificaciones legales, cartas del banco, contratos y mensajes sospechosos — y te los explica con palabras claras, en tu idioma, antes de que tomes una decisión.",
  hero_ctaPrimary: "Analizar un documento",
  hero_ctaSecondary: "Probar el detector de estafas",
  hero_trust1: "Privado por diseño",
  hero_trust2: "Tú controlas cada carga",
  hero_trust3: "IA responsable",
  hero_chipTitle: "Comprensión con IA",
  hero_chipSub: "Palabras claras · tu idioma",

  trust_label: "Honesto por diseño — sin sellos falsos, sin promesas vacías",
  trust_1: "Privacidad primero",
  trust_2: "Procesamiento seguro",
  trust_3: "Cargas controladas por ti",
  trust_4: "IA responsable",

  tcf_eyebrow: "Dos formas en que Klario te ayuda",
  tcf_title_1: "Un asistente.",
  tcf_title_2: "Dos tipos de claridad.",
  tcf_description:
    "Klario hace dos cosas, y las hace en serio: explica documentos importantes con palabras que puedes confiar, y te dice si un mensaje está intentando engañarte.",
  tcf_docTitle: "Comprensión de documentos",
  tcf_docDesc:
    "Sube cualquier documento importante. Klario explica qué significa, señala los riesgos y te dice qué hacer después — en tu idioma.",
  tcf_docCta: "Ver cómo funciona",
  tcf_scamTitle: "Detector de phishing y estafas",
  tcf_scamDesc:
    "Pega un email, SMS o captura sospechosa. Klario te dice si es seguro, por qué parece riesgoso y qué hacer exactamente.",
  tcf_scamCta: "Ver cómo funciona",

  du_eyebrow: "Comprensión de documentos",
  du_title: "Siete cosas que Klario te da por cada documento",
  du_description:
    "No es un resumen. Es una comprensión real — con los riesgos a la vista y los siguientes pasos explicados.",
  du_1_title: "Explicación sencilla",
  du_1_desc: "Una explicación clara, en palabras simples, de qué es el documento y por qué te importa.",
  du_2_title: "Resumen breve",
  du_2_desc: "Los puntos esenciales en pocas frases, para que decidas si leerlo completo.",
  du_3_title: "Puntos importantes",
  du_3_desc: "Las cláusulas, cifras, fechas y obligaciones que no puedes omitir.",
  du_4_title: "Términos difíciles explicados",
  du_4_desc: "Jerga legal, médica y financiera traducida a palabras cotidianas — sin perder precisión.",
  du_5_title: "Posibles riesgos",
  du_5_desc: "Qué podría salir mal si firmas, pagas, ignoras o aceptas. Dicho con honestidad, sin alarma.",
  du_6_title: "Pasos siguientes recomendados",
  du_6_desc: "Una lista corta y ordenada de qué hacer después — y en qué orden.",
  du_7_title: "Preguntas para un profesional",
  du_7_desc: "Las preguntas exactas para llevar a tu abogado, médico o contador para que nada se pierda.",

  pd_eyebrow: "Detector de phishing y estafas",
  pd_title: "Nunca solo \"esto es una estafa\" — siempre el porqué",
  pd_description:
    "Klario explica su razonamiento para que aprendas a reconocer el patrón tú mismo, no solo confíes en una etiqueta.",
  pd_1_title: "¿Seguro o sospechoso?",
  pd_1_desc: "Un veredicto claro sobre el que puedes actuar, con un nivel de confianza.",
  pd_2_title: "Puntuación de riesgo",
  pd_2_desc: "Una puntuación de 0 a 100 con el desglose de qué la subió o bajó.",
  pd_3_title: "Razones detrás de la detección",
  pd_3_desc: "Cada razón explicada, vinculada a las palabras o enlaces exactos que la activaron.",
  pd_4_title: "Palabras y enlaces sospechosos",
  pd_4_desc: "Las frases, URLs y detalles del remitente que parecen sospechosos — resaltados y explicados.",
  pd_5_title: "Qué hacer después",
  pd_5_desc: "Guía paso a paso: ignorar, reportar, bloquear, cambiar una contraseña o contactar al banco.",

  sr_eyebrow: "Análisis de ejemplo",
  sr_title: "Cómo es un informe de Klario",
  sr_description:
    "Cada análisis se entrega como un informe limpio y estructurado — no como una respuesta de chat. Este es un ejemplo para un informe médico.",
  sr_docType: "Tipo de documento",
  sr_language: "Idioma detectado",
  sr_summary: "Resumen",
  sr_summaryBody:
    "Tu análisis de sangre muestra colesterol ligeramente elevado y un nivel de vitamina D por debajo del rango normal. Tu médico recomienda un seguimiento en tres meses y un pequeño cambio en la dieta. Nada en este informe indica una condición urgente.",
  sr_keyInfo: "Información clave",
  sr_keyInfo_1: "Colesterol total: 212 mg/dL (ligeramente por encima del objetivo)",
  sr_keyInfo_2: "Vitamina D: 24 ng/mL (por debajo del rango normal)",
  sr_keyInfo_3: "Cita de seguimiento recomendada en 3 meses",
  sr_riskLevel: "Nivel de riesgo",
  sr_riskLow: "Bajo — no se requiere acción urgente",
  sr_warnings: "Advertencias importantes",
  sr_warningBody:
    "Este resumen no es un diagnóstico. No comiences ni detengas ninguna medicación basándote solo en esto. Confirma los resultados con tu médico.",
  sr_actions: "Acciones recomendadas",
  sr_action_1: "Programa una cita de seguimiento con tu médico",
  sr_action_2: "Habla sobre cambios en la dieta y posible suplemento de vitamina D",
  sr_action_3: "Repite el análisis en 3 meses como se recomienda",
  sr_askAi: "Pregunta a Klario",
  sr_askAiPlaceholder: "ej. ¿Qué significa \"mg/dL\"?",
  sr_translate: "Traducir",
  sr_download: "Descargar informe",
  sr_disclaimer:
    "Klario ofrece información para ayudarte a entender documentos. No sustituye el consejo médico, legal o financiero profesional.",

  ml_eyebrow: "Hecho para todo el mundo",
  ml_title: "Dieciséis idiomas. Un estándar de precisión.",
  ml_description:
    "Klario se diseñó multilingüe desde el primer día — no traducido como ocurrencia tardía. La IA razona en tu idioma y mantiene el significado preciso.",
  ml_rtl: "Soporte completo de derecha a izquierda",
  ml_rtlDesc: "El árabe y el urdu se renderizan de forma nativa, con la dirección y tipografía correctas.",
  ml_accuracy: "Significado sobre palabra por palabra",
  ml_accuracyDesc: "La terminología profesional en derecho, medicina y finanzas se preserva, no se rompe.",
  ml_global: "Un producto, todas las regiones",
  ml_globalDesc: "El mismo cuidado para un usuario en Tokio, El Cairo, Berlín o São Paulo.",

  up_eyebrow: "Sube con confianza",
  up_title_1: "Trae los documentos que",
  up_title_2: "no confiarías a ningún otro sitio",
  up_description:
    "Arrastra, suelta y deja que Klario lea. Los archivos se procesan de forma privada y se eliminan cuando terminas. Tú mantienes el control en todo momento.",
  up_dropHere: "Suelta tus archivos aquí",
  up_browse: "busca en tu dispositivo",
  up_encrypted: "Procesamiento privado · tú controlas la eliminación",
  up_types: "PDF · DOCX · PNG · JPG · EML · hasta 100MB",
  up_categories: "Tipos de documentos que Klario entiende",
  up_privacyTitle: "Tus documentos nunca salen de tu control",
  up_privacyDesc:
    "Las cargas se procesan para tu análisis y se eliminan cuando cierras la sesión. Klario nunca entrena con tus datos.",
  up_type_medical: "Informes médicos",
  up_type_legal: "Notificaciones legales",
  up_type_gov: "Cartas del gobierno",
  up_type_bank: "Documentos bancarios",
  up_type_financial: "Estados financieros",
  up_type_contract: "Contratos",
  up_type_invoice: "Facturas",
  up_type_email: "Emails y capturas",
  up_type_suspicious: "Mensajes sospechosos",
  up_hint_medical: "Manejo privado",
  up_hint_legal: "Privilegiado",
  up_hint_gov: "Verificado",
  up_hint_bank: "Cifrado",
  up_hint_financial: "Solo lectura",
  up_hint_contract: "Consciente de cláusulas",
  up_hint_invoice: "Analizado",
  up_hint_email: "PII eliminada",
  up_hint_suspicious: "Con puntuación de riesgo",
  up_reassureTitle: "Tu privacidad va primero",
  up_reassureDesc:
    "Los archivos se procesan para tu análisis y se eliminan por tu orden. Sin entrenamiento con tus datos. Sin compartir con terceros.",

  hw_eyebrow: "Cómo funciona",
  hw_title: "De la carga a la comprensión en tres pasos",
  hw_description: "Un flujo simple y observable. Sin cajas negras, sin rutas ocultas de datos.",
  hw_1_title: "Sube de forma segura",
  hw_1_desc:
    "Elige un documento o pega un mensaje. Las cargas se procesan de forma privada — puedes borrar todo en cualquier momento, al instante.",
  hw_2_title: "Klario lee y razona",
  hw_2_desc:
    "Klario extrae la estructura, explica el significado, señala los riesgos y prepara las preguntas que deberías hacer a un profesional — en tu idioma.",
  hw_3_title: "Revisa y actúa",
  hw_3_desc:
    "Lee tu informe estructurado, haz preguntas de seguimiento, tradúcelo o descárgalo. Luego decide con confianza.",

  sec_eyebrow: "Seguridad y privacidad",
  sec_title: "Hecho para documentos que no puedes permitirte equivocarte",
  sec_description:
    "Klario se diseñó en torno a una promesa simple: tus documentos te sirven a ti, no a nosotros. Así es exactamente como funciona en la práctica.",
  sec_1_title: "Privado por diseño",
  sec_1_desc:
    "Recopilamos lo mínimo necesario para ejecutar el servicio. No vendemos datos, no los compartimos con anunciantes y no los usamos para entrenar modelos.",
  sec_2_title: "Cargas controladas por ti",
  sec_2_desc:
    "Tú decides qué subir y cuándo borrarlo. La eliminación es inmediata e irreversible — sin borrados suaves, sin copias ocultas.",
  sec_3_title: "Cifrado en tránsito",
  sec_3_desc: "Todas las cargas y respuestas se envían por TLS. Tu sesión está aislada de otros usuarios.",
  sec_4_title: "IA responsable",
  sec_4_desc:
    "Klario explica su razonamiento, cita el texto fuente y nunca da un veredicto sin mostrar por qué. Está hecho para informar — no para decidir por ti.",
  sec_5_title: "Sin entrenar con tus datos",
  sec_5_desc:
    "Tus documentos y conversaciones nunca se usan para entrenar los modelos de Klario. Esto se aplica en el código, no solo en la política.",
  sec_6_title: "Limitaciones transparentes",
  sec_6_desc:
    "Klario te dice cuándo no está seguro, cuándo un documento es ambiguo y cuándo deberías hablar con un profesional. La honestidad es una función.",

  sec_stripTitle: "Honestos sobre lo que somos — y lo que no somos",
  sec_stripDesc:
    "Klario no es un abogado, médico o asesor financiero. No reclamamos certificaciones que no hemos obtenido. Somos un asistente de comprensión y seguridad, y somos claros al respecto.",
  sec_stripCta: "Lee nuestra política completa de confianza y legal",

  st_1_value: "16",
  st_1_label: "Idiomas soportados, con RTL completo",
  st_1_sub: "Incluyendo árabe y urdu",
  st_2_value: "<2s",
  st_2_label: "Tiempo medio hasta la primera explicación",
  st_2_sub: "Para análisis de un solo documento",
  st_3_value: "0",
  st_3_label: "Documentos de clientes usados para entrenar",
  st_3_sub: "Por política, nunca",
  st_4_value: "7",
  st_4_label: "Salidas estructuradas por documento",
  st_4_sub: "Explicación · riesgos · pasos · y más",

  st_footnote:
    "Las cifras describen el producto según su diseño. Las métricas operativas se publican en el centro de confianza.",

  legal_eyebrow: "Confianza y legal",
  legal_title: "Qué es Klario, y qué no es",
  legal_description:
    "Lo mantenemos corto, claro y honesto. Si algo aquí te parece confuso, escríbenos y te responderemos directamente.",
  legal_privacy: "Privacidad",
  legal_security: "Seguridad",
  legal_terms: "Términos",
  legal_disclaimer: "Aviso médico y legal",
  legal_privacyBody:
    "Klario recopila solo lo necesario para ejecutar el servicio: tu email de cuenta, los documentos que decides subir y el idioma que seleccionas. No vendemos datos personales, no los compartimos para publicidad y no usamos tus documentos para entrenar modelos de IA. Puedes borrar cualquier documento en cualquier momento; la eliminación es inmediata e irreversible. Hay una exportación completa de datos disponible bajo petición.",
  legal_securityBody:
    "Todas las cargas y respuestas se cifran en tránsito usando TLS. Las sesiones están aisladas entre usuarios. El acceso a los sistemas de producción está restringido a un pequeño número de ingenieros identificados y se registra. Actualmente no tenemos certificaciones SOC 2, HIPAA ni ISO 27001 — cuando eso cambie, lo diremos aquí, con un enlace al informe. Hasta entonces, describimos nuestras prácticas con honestidad en lugar de exagerarlas.",
  legal_termsBody:
    "Klario se ofrece como un asistente de comprensión y seguridad. Aceptas usarlo de forma lícita, subir solo documentos que tienes derecho a subir y aceptar que la salida de Klario es informativa, no consejo profesional. No puedes usar Klario para procesar documentos de terceros sin su consentimiento, ni para dañar, engañar o defraudar a nadie. Las cuentas pueden cerrarse por abuso.",
  legal_disclaimerBody:
    "Klario te ayuda a entender documentos. No es médico, abogado, contador ni asesor financiero, y su salida no es consejo médico, legal ni financiero. No comiences, detengas ni cambies ningún tratamiento, firmes ningún contrato ni tomes decisiones importantes basándote solo en Klario. Confirma siempre los hallazgos importantes con un profesional cualificado en tu jurisdicción. Klario puede equivocarse — lee su razonamiento, no solo su conclusión.",
  legal_cookie: "Política de cookies",
  legal_cookieBody:
    "Klario usa un número reducido de cookies esenciales para mantener tu sesión y recordar tu idioma. No usamos cookies de publicidad ni de rastreo entre sitios. Tu elección de idioma se guarda localmente en tu navegador; tu token de sesión es una cookie propia estrictamente necesaria. Puedes borrar todas las cookies desde tu navegador en cualquier momento y Klario seguirá funcionando — solo te pedirá elegir el idioma de nuevo.",
  legal_aiTransparency: "Transparencia de la IA",
  legal_aiTransparencyBody:
    "Klario usa modelos de lenguaje grandes para leer, resumir y explicar tus documentos. Te decimos, en palabras claras, qué hizo el modelo y en qué partes de tu documento se basó. Cada análisis incluye un nivel de confianza y, cuando es relevante, una nota cuando el modelo no está seguro o el texto es ambiguo. No presentamos la salida de la IA como certeza. Cuando Klario no sabe, lo dice. Cuando un hallazgo podría afectar tu salud, tus derechos o tu dinero, te indicamos que lo confirmes con un profesional.",
  legal_responsibleAi: "IA responsable",
  legal_responsibleAiBody:
    "Klario está construido para informar, no para decidir por ti. No construimos funciones que empujen al usuario hacia acciones arriesgadas. Mostramos el razonamiento detrás de cada puntuación de riesgo y de cada veredicto de estafa, para que puedas juzgar tú mismo. Probamos el sesgo contra tipos de documentos e idiomas comunes, y publicamos lo que encontramos con honestidad. No afirmamos perfección — afirmamos honestidad sobre nuestros límites. Si una función mejoraría la belleza pero reduciría la claridad, mantenemos la claridad.",
  legal_financial: "Aviso financiero",
  legal_financialBody:
    "Klario puede leer extractos bancarios, facturas, contratos y documentos financieros y explicar lo que dicen en palabras claras. Su salida no es asesoramiento financiero, de inversión, fiscal ni contable, y no es una recomendación de comprar, vender, mantener ni firmar nada. Klario no es un asesor financiero regulado. No tomes decisiones financieras basándote solo en su salida. Confirma siempre con un profesional autorizado en tu jurisdicción antes de actuar sobre algo que afecte tu dinero.",

  faq_eyebrow: "Centro de confianza",
  faq_title: "Las preguntas que deberías hacer",
  faq_description:
    "Si un servicio no puede responder estas con claridad, no debería tener tus documentos. Aquí están las nuestras, en lenguaje claro.",
  faq_1_q: "¿Se usan mis datos para entrenar los modelos de Klario?",
  faq_1_a:
    "No. Klario nunca usa tus documentos, mensajes o conversaciones para entrenar, ajustar ni evaluar ningún modelo. Se aplica en el código y se establece en nuestros términos.",
  faq_2_q: "¿Qué pasa con mi documento cuando termino?",
  faq_2_a:
    "Cuando cierras la sesión o borras un documento, se elimina de forma inmediata e irreversible. No guardamos copias blandas. También puedes exportar todo lo que has subido en cualquier momento.",
  faq_3_q: "¿Puede Klario sustituir a mi médico, abogado o contador?",
  faq_3_a:
    "No, y no lo intenta. Klario te ayuda a entender documentos y detectar riesgos antes de hablar con un profesional. A menudo te dirá las preguntas exactas que hacerles. Pero la decisión final es siempre tuya y de tu profesional — no de Klario.",
  faq_4_q: "¿Qué tan precisas son las traducciones?",
  faq_4_a:
    "Klario razona en el idioma que seleccionaste en lugar de traducir palabra por palabra. La terminología legal, médica y financiera se preserva con su significado profesional correcto. Para idiomas de derecha a izquierda como el árabe y el urdu, toda la interfaz y el análisis cambian de dirección correctamente.",
  faq_5_q: "¿Klario detecta todas las estafas?",
  faq_5_a:
    "Ninguna herramienta puede detectar todas las estafas, y cualquier producto que afirme detección del 100% no está siendo honesto. Klario explica su razonamiento y te muestra exactamente qué parece sospechoso, para que puedas juzgar tú mismo. Si algo te parece mal aunque Klario diga que es seguro, confía en tu instinto y verifica por otro canal.",
  faq_6_q: "¿Qué pasa si Klario se equivoca?",
  faq_6_a:
    "Klario puede equivocarse. Por eso cada análisis muestra el texto fuente en el que se basó, indica su nivel de confianza y te dice cuándo un documento es ambiguo. Si detectas un error, repórtalo — usamos esos reportes para mejorar.",

  cta_badge: "Gratis para probar · sin tarjeta · borra cuando quieras",
  cta_title_1: "Trae un documento.",
  cta_title_2: "Verás por qué la gente deja de adivinar.",
  cta_description:
    "Sube un informe, pega un mensaje o solo mira. Klario te lo explicará claramente — en tu idioma — y puedes borrar todo cuando termines.",
  cta_primary: "Empezar a entender",
  cta_secondary: "Lee la política de confianza y legal",

  footer_tagline:
    "Entiende cualquier cosa. Estás seguro. En tu idioma. Hecho para personas que toman decisiones importantes.",
  footer_platform: "Plataforma",
  footer_platform_1: "Comprensión de documentos",
  footer_platform_2: "Detector de estafas",
  footer_platform_3: "Idiomas",
  footer_platform_4: "Cómo funciona",
  footer_security: "Confianza y legal",
  footer_security_1: "Privacidad",
  footer_security_2: "Seguridad",
  footer_security_3: "Términos",
  footer_security_4: "Aviso legal",
  footer_company: "Empresa",
  footer_company_1: "Sobre nosotros",
  footer_company_2: "IA responsable",
  footer_company_3: "Contacto",
  footer_company_4: "Estado",
  footer_resources: "Recursos",
  footer_resources_1: "Centro de ayuda",
  footer_resources_2: "Guías",
  footer_resources_3: "API",
  footer_resources_4: "Novedades",
  footer_rights: "Todos los derechos reservados.",
  footer_privacy: "Privacidad",
  footer_terms: "Términos",
  footer_disclaimer: "Aviso",
  footer_status: "Todos los sistemas operativos",

  lang_selectLanguage: "Selecciona tu idioma",
  lang_searchPlaceholder: "Buscar idiomas",
};

/* Due to the size of the full dictionary (16 languages), the remaining
   languages are loaded from a separate file to keep this one maintainable. */
export { en, es };
