---
Task ID: klario-refinement
Agent: main
Task: Refine existing Aegis AI build into Klario — a multilingual AI understanding & safety assistant with 16-language i18n, RTL support, two core features (Document Understanding + Phishing Detector), premium AI report interface, and honest trust messaging (no fake certifications).

Work Log:
- Built complete i18n infrastructure: config (16 languages + RTL flags + font stacks), types, translation dictionaries split across 5 files (en/es, eu, rtl, cjk, other), context/provider/hook with localStorage persistence + browser language detection
- Built premium LanguageSelector component (globe icon, native names, search, RTL badges) — visible in nav and footer
- Redesigned Logo to Klario (lens/aperture "clarity" motif with K-shaped blades + focus dot)
- Updated layout.tsx: Klario metadata, I18nProvider, ThemeProvider, font preconnects
- Added RTL utilities + Arabic/Urdu line-height tuning to globals.css
- Refined Navigation: Klario branding, language selector, translated links, mobile menu
- Refined Hero: new tagline "Understand anything. Stay safe. In your language.", dual CTAs (Analyze document / Try scam detector), honest trust badges, 3D scene + mobile SVG fallback
- Replaced TrustBar: removed fake certs (SOC2/HIPAA/ISO), honest messaging (privacy focused, secure processing, user-controlled uploads, responsible AI)
- Built TwoCoreFeatures: twin premium cards (Document Understanding + Phishing Detector) with decorative preview tiles
- Built DocumentUnderstanding: 7-point analysis breakdown (explanation, summary, points, terms, risks, next steps, professional questions)
- Built PhishingDetector: risk score visual (74/100 gauge) + 5 reasons grid
- Built SampleResult: premium AI report card (header bar, meta tiles, summary, key info, actions, warnings, ask-AI input with suggested follow-ups, translate/download buttons, disclaimer)
- Built MultiLanguage: clickable 16-language grid (instant switch) + 3 pillars (RTL, accuracy, global)
- Refined UploadZone: translated, 9 document types, privacy strip
- Refined HowItWorks: translated 3-step flow with RTL-aware connectors
- Refined Security: dark "vault" section, 6 honest points, honest compliance strip (explicitly states no fake certs)
- Refined Stats: honest numbers (16 langs, <2s, 0 training docs, 7 outputs), translated
- Built TrustLegal: tabbed section (Privacy, Security, Terms, Medical/Legal Disclaimer) — all honest, no fake claims
- Refined FAQ: 6 honest questions/answers, translated
- Refined FinalCTA + Footer: Klario branding, language selector in footer, honest badges, legal links
- Added FontLoader component (lazy-loads CJK/Arabic/Devanagari fonts only when needed)
- Composed all 14 sections in page.tsx
- Fixed context.tsx import path (was importing from nonexistent ./translations, fixed to ./index)
- Lint clean, all routes 200

Stage Summary:
- Klario is a fully multilingual (16 languages), RTL-supporting AI understanding & safety assistant
- Two core features fully designed: Document Understanding (7-point analysis) + Phishing Detector (risk score + reasoning)
- Premium AI report interface built as sample preview
- All trust messaging is honest — no fake SOC2/HIPAA/ISO certifications, explicit disclaimers for medical/legal content
- Verified via Agent Browser: desktop hero premium, Arabic RTL layout flips correctly, Chinese renders, mobile hero + Arabic RTL mobile all work
- Lint passes clean, dev server returns 200, no runtime errors

---
Task ID: klario-final-polish
Agent: main
Task: Final refinement pass — polish existing Klario to production quality. No redesign, no rebuild. Focus on: (1) Language experience, (2) Trust & Legal, (3) Hero upload focus, (4) Mobile excellence, (5) Final quality review.

Work Log:
- Added 13 new translation keys to types.ts: 9 upload hints (up_hint_*), up_reassureTitle/Desc, 4 new legal policies (legal_cookie/aiTransparency/responsibleAi/financial + their bodies)
- Wrote and ran patch-i18n.mjs script to add accurate professional translations for all 14 remaining languages (fr/de/pt/it/nl/ar/ur/hi/zh/ja/ko/tr/ru/id) — preserved medical/legal/financial terminology, proper RTL for ar/ur
- Rewrote LanguageSelector: added full keyboard navigation (Arrow Up/Down, Home/End, Enter, Escape), focus trap, mobile bottom sheet with drag handle (replaces popover on <640px), min 44px touch targets, RTL badges, focus ring on search
- Expanded TrustLegal from 4 to 8 tabs: Privacy, Security, Terms, Cookie policy, Medical & legal disclaimer, Financial disclaimer, AI transparency, Responsible AI — all honest messaging, no fake certifications
- Upgraded UploadZone: replaced hardcoded English hints with translated up_hint_* keys, added stateful loading/success preview (spinner → checkmark), fixed browse link, added reassurance strip, min 52px touch targets on file type buttons
- Polished Hero: promoted upload CTA (Upload icon, semibold, larger shadow), added hover border to secondary CTA — strengthens upload as visual focus without making busy
- Updated Footer: security column now surfaces Privacy/Terms/AI Transparency/Responsible AI; bottom bar adds Cookie link
- Verified all touch targets meet 44px minimum on mobile
- Verified RTL layout flips correctly on mobile (Arabic tested)
- Verified language selector bottom sheet works on mobile with search + keyboard nav
- Verified all 8 Trust & Legal tabs render and switch correctly
- Lint clean throughout, all routes 200, no runtime errors

Stage Summary:
- Klario now has complete 16-language localization with 8 honest trust/legal policies
- Language selector is premium on both desktop (popover) and mobile (bottom sheet) with full keyboard support
- Upload zone has loading/success states, translated hints, and reassurance strip on every view
- Hero upload CTA is now the clear visual focus
- All touch targets meet accessibility minimums
- No fake certifications anywhere — all trust messaging is honest
