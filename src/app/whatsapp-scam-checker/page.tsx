import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";

const SITE = "https://www.klarium.co";
const PAGE_URL = `${SITE}/whatsapp-scam-checker`;

export const metadata: Metadata = {
  title: "WhatsApp Scam Checker: Check Suspicious Messages & Screenshots | Klarium",
  description:
    "Check a suspicious WhatsApp message, link, or screenshot for scam red flags. Understand urgency, impersonation, payment requests and suspicious links, then learn what to do next.",
  alternates: { canonical: "/whatsapp-scam-checker" },
};

const SCAM_TYPES = [
  ["Fake delivery messages", "Unexpected parcel fees, customs charges, address updates or delivery links that pressure you to act immediately."],
  ["Fake jobs and recruiters", "Unexpected work offers, unusually high pay, requests for fees, codes, identity documents or app installations."],
  ["Impersonation scams", "Someone claims to be a friend, relative, bank, company, government agency or WhatsApp support."],
  ["Prize and giveaway scams", "You are told you won something but must pay a fee, provide personal information or follow a link to claim it."],
  ["Investment and money scams", "Promises of guaranteed or unrealistic returns, urgent transfers, crypto payments, gift cards or PINs."],
  ["Account and verification scams", "Messages asking for passwords, verification codes, PINs, QR scans or other credentials."],
];

const CHECKS = [
  ["Sender and identity", "Is the sender known to you? Does the claimed identity match information you can independently verify? An authentic-looking profile name or logo is not proof of identity."],
  ["Pressure and urgency", "Scammers often try to prevent careful thinking by creating fear, urgency, secrecy or a deadline: pay now, verify now, your account will close, or do not tell anyone."],
  ["The requested action", "Be especially cautious when a message asks for money, gift cards, PINs, passwords, verification codes, personal data, remote access or an unfamiliar app download."],
  ["Links and destinations", "Look closely at the destination before opening it. A familiar brand name in message text does not prove that the link belongs to that brand."],
  ["The story itself", "Does the request make sense in context? Unexpected prizes, unpaid bills, investment opportunities and emergency requests deserve independent verification."],
  ["Independent verification", "If someone claims to be a person or organization you know, verify through a trusted channel you already have rather than using contact details supplied by the suspicious message."],
];

const AFTER_RECEIVING = [
  ["Do not rush", "Pause before replying, clicking, paying or forwarding the message."],
  ["Do not share secrets", "Never provide passwords, PINs, verification codes or sensitive financial information just because a message asks for them."],
  ["Verify separately", "Contact the claimed person or organization using a trusted phone number, official website or another channel you already know."],
  ["Preserve useful evidence", "If money, an account or a legal matter is involved, keep the message, sender details and relevant transaction information before deleting anything."],
  ["Block and report when appropriate", "WhatsApp provides controls to block and report suspicious contacts and messages."],
];

const FAQS = [
  ["Can Klarium check a WhatsApp screenshot?", "Yes. A screenshot can be useful when the suspicious content is an image rather than selectable text. The analysis is based on the information visible in the image; it cannot independently prove who controls the account or whether an event really happened."],
  ["Can I paste a WhatsApp message instead of uploading a screenshot?", "Yes. Pasting the message makes the text easier to analyze for language, requests, urgency, impersonation patterns and other warning signs."],
  ["Can an AI guarantee that a WhatsApp message is a scam?", "No. AI analysis is a risk assessment, not proof of identity or intent. A message can look legitimate and still be fraudulent, and a legitimate message can contain unusual wording. Important decisions should be independently verified."],
  ["What are common WhatsApp scam signs?", "Common warning signs include unexpected contact, urgency or threats, requests for money or credentials, suspicious links or files, unrealistic offers, secrecy, impersonation and instructions that prevent independent verification."],
  ["Can a scammer pretend to be someone I know?", "Yes. A familiar name, profile photo or claim of being a friend or family member is not enough to establish identity. Verify through a trusted channel you already know."],
  ["Can Klarium see my WhatsApp chats?", "No. Klarium does not provide access to your WhatsApp account or private chats. You choose what text or image to submit for analysis."],
  ["Is the WhatsApp Scam Checker free?", "The checker page is designed to let you analyze suspicious content through Klarium's existing scam-analysis flow. Availability and usage limits can change as the product evolves."],
  ["What should I do after receiving a suspicious WhatsApp message?", "Pause, do not click or pay, do not share credentials, independently verify the claim, and block or report the sender when appropriate. If you already sent money or sensitive information, contact the relevant bank, service provider or authorities promptly."],
];

const sources = [
  ["WhatsApp Help Center — About suspicious messages and scams", "https://faq.whatsapp.com/2286952358121083/"],
  ["WhatsApp Help Center — How to protect yourself from suspicious messages and scams", "https://faq.whatsapp.com/573786218075805"],
  ["WhatsApp Help Center — How to block and report someone", "https://faq.whatsapp.com/1142481766359885/"],
  ["Meta Engineering — Scam Alert on WhatsApp", "https://engineering.fb.com/2026/08/12/security/how-were-building-scam-alert-whatsapp/"],
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "WhatsApp Scam Checker: Check Suspicious Messages & Screenshots",
      description: metadata.description,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "Klarium", url: SITE },
    },
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: "WhatsApp Scam Checker: Check Suspicious Messages & Screenshots",
      description: "A practical guide to checking suspicious WhatsApp messages, screenshots and links for scam warning signs.",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      publisher: { "@type": "Organization", name: "Klarium", url: SITE },
      about: ["WhatsApp scams", "scam messages", "phishing", "fraud detection", "online safety"],
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Klarium", item: SITE },
        { "@type": "ListItem", position: 2, name: "WhatsApp Scam Checker", item: PAGE_URL },
      ],
    },
  ],
};

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#1D4ED8", textDecoration: "underline", textUnderlineOffset: 2 }}>
      {children} <ExternalLink size={11} style={{ display: "inline", verticalAlign: "-1px" }} />
    </a>
  );
}

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,-apple-system,sans-serif", color: "#1D1D1F", WebkitFontSmoothing: "antialiased" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}a{color:inherit;text-decoration:none;}`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: "#0066CC", display: "flex", alignItems: "center", justifyContent: "center" }}><ShieldCheck size={15} color="#fff" /></span>
          Klarium
        </Link>
        <Link href="/#scam-detector" style={{ fontSize: 13, color: "#0066CC", fontWeight: 600 }}>Check a Suspicious Message →</Link>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "42px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "#6E6E73", marginBottom: 20 }}>
          <Link href="/" style={{ color: "#0066CC" }}>Klarium</Link> / <span>WhatsApp Scam Checker</span>
        </nav>

        <header style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 750, color: "#0066CC", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>WhatsApp scam checker</p>
          <h1 style={{ fontSize: "clamp(30px,5vw,46px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.035em", marginBottom: 14 }}>Is this WhatsApp message a scam?</h1>
          <p style={{ maxWidth: 800, fontSize: 17, color: "#555B64", lineHeight: 1.65 }}>
            Check a suspicious WhatsApp message, screenshot or link for common scam warning signs. Klarium helps you understand the evidence, the risky requests and what to verify before you act.
          </p>
        </header>

        <div style={{ padding: "16px 18px", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#9A3412", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Safety note</p>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>
            Klarium provides an automated risk assessment, not proof that a sender is genuine or fraudulent. Do not use an AI result as the only basis for sending money, sharing credentials or making another high-stakes decision. Independently verify important claims.
          </p>
        </div>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>What can a WhatsApp scam checker look for?</h2>
          <p style={{ fontSize: 14, color: "#303134", lineHeight: 1.8, marginBottom: 16 }}>
            A useful check should go beyond a simple “scam” or “safe” label. It should identify the specific behavior that makes a message risky: unexpected contact, pressure, impersonation, unusual payment requests, suspicious links, credential requests or a story that does not survive independent verification.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
            {CHECKS.map(([h, t]) => (
              <div key={h} style={{ padding: "15px 16px", border: "1px solid #E5E7EB", borderRadius: 11, background: "#FAFAFA" }}>
                <h3 style={{ fontSize: 14, fontWeight: 730, marginBottom: 6 }}>{h}</h3>
                <p style={{ fontSize: 13, color: "#60656D", lineHeight: 1.65 }}>{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>Common WhatsApp scams to check</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
            {SCAM_TYPES.map(([h, t]) => (
              <div key={h} style={{ padding: "15px 16px", border: "1px solid #E5E7EB", borderRadius: 11, background: "#FAFAFA" }}>
                <h3 style={{ fontSize: 14, fontWeight: 730, marginBottom: 6 }}>{h}</h3>
                <p style={{ fontSize: 13, color: "#60656D", lineHeight: 1.65 }}>{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>How to check a suspicious WhatsApp message yourself</h2>
          <p style={{ fontSize: 14, color: "#5F6368", lineHeight: 1.75, marginBottom: 14 }}>
            WhatsApp itself recommends pausing, questioning unusual requests and independently verifying who you are talking to. Its guidance highlights unknown numbers, urgency, threats, requests for money or personal information, suspicious links and other unusual behavior. <Source href="https://faq.whatsapp.com/573786218075805">WhatsApp Help Center</Source>
          </p>
          {CHECKS.map(([h, t], i) => (
            <div key={h} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, padding: "12px 0", borderBottom: i < CHECKS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: "#EFF6FF", color: "#1D4ED8", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
              <div><h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3><p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>{t}</p></div>
            </div>
          ))}
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>What to do after receiving a suspicious message</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {AFTER_RECEIVING.map(([h, t], i) => (
              <div key={h} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, padding: "13px 0", borderBottom: i < AFTER_RECEIVING.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: "#F0FDF4", color: "#15803D", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
                <div><h3 style={{ fontSize: 14, fontWeight: 720, marginBottom: 4 }}>{h}</h3><p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7 }}>{t}</p></div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.7, marginTop: 14 }}>
            WhatsApp provides tools to block and report problematic contacts and messages. <Source href="https://faq.whatsapp.com/1142481766359885/">See WhatsApp's current blocking and reporting guidance.</Source>
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>Can WhatsApp itself detect scams?</h2>
          <p style={{ fontSize: 14, color: "#303134", lineHeight: 1.8, marginBottom: 10 }}>
            WhatsApp is also developing its own safety features. In August 2026, Meta described an optional Scam Alert feature in limited beta that uses an on-device machine-learning model to identify likely scam patterns in messages from people who are not in a user's contacts. Meta says the classification runs on the device and that message content is not automatically sent to WhatsApp or another third party for classification.
          </p>
          <p style={{ fontSize: 14, color: "#303134", lineHeight: 1.8 }}>
            This does not make every message automatically trustworthy. A separate checker can still be useful when you deliberately submit a suspicious message or screenshot and want a structured explanation of its warning signs. <Source href="https://engineering.fb.com/2026/08/12/security/how-were-building-scam-alert-whatsapp/">Read Meta's technical overview.</Source>
          </p>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 14 }}>Frequently asked questions</h2>
          <div style={{ display: "grid", gap: 14 }}>
            {FAQS.map(([q, a]) => (
              <div key={q} style={{ paddingBottom: 14, borderBottom: "1px solid #E5E7EB" }}>
                <h3 style={{ fontSize: 15, fontWeight: 740, marginBottom: 6 }}>{q}</h3>
                <p style={{ fontSize: 13, color: "#5F6368", lineHeight: 1.75 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "22px 24px", marginBottom: 20 }}>
          <h2 style={{ fontSize: 21, fontWeight: 780, marginBottom: 10 }}>Official safety resources</h2>
          <div style={{ display: "grid", gap: 8 }}>
            {sources.map(([label, href]) => <Source key={href} href={href}>{label}</Source>)}
          </div>
        </section>

        <section style={{ padding: "24px", borderRadius: 14, background: "#0F172A", color: "#fff", marginBottom: 22 }}>
          <h2 style={{ fontSize: 22, fontWeight: 780, marginBottom: 8 }}>Have a suspicious message?</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#CBD5E1", marginBottom: 16 }}>Check the message or screenshot before you click, pay or share information.</p>
          <Link href="/#scam-detector" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 15px", borderRadius: 9, background: "#fff", color: "#0F172A", fontSize: 13, fontWeight: 750 }}>Check a Suspicious Message <ArrowRight size={15} /></Link>
        </section>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 13 }}>
          <Link href="/guides" style={{ color: "#0066CC", fontWeight: 650 }}>Document & safety guides →</Link>
          <Link href="/phishing-email-detector" style={{ color: "#0066CC", fontWeight: 650 }}>Phishing email detector →</Link>
          <Link href="/scam-message-checker" style={{ color: "#0066CC", fontWeight: 650 }}>Scam message checker →</Link>
          <Link href="/legal-document-explainer" style={{ color: "#0066CC", fontWeight: 650 }}>Legal document explainer →</Link>
        </div>
      </main>
    </div>
  );
}
