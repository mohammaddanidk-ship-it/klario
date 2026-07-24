import type { LanguageCode } from "./config";

/**
 * Translation dictionary for Klario.
 *
 * Structure: `t[language][key]` returns the translated string.
 * Missing keys fall back to English (see `useI18n` hook).
 *
 * Translation policy:
 *  - Accuracy over word-for-word.
 *  - Professional terminology preserved (legal, medical, financial).
 *  - RTL languages (Arabic, Urdu) include proper Unicode bidi where needed.
 *  - Brand name "Klario" is kept untranslated across all locales.
 */

export interface Translation {
  // Nav
  nav_platform: string;
  nav_features: string;
  nav_security: string;
  nav_howItWorks: string;
  nav_languages: string;
  nav_signIn: string;
  nav_getStarted: string;
  nav_openMenu: string;
  nav_closeMenu: string;

  // Hero
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_ctaPrimary: string;
  hero_ctaSecondary: string;
  hero_trust1: string;
  hero_trust2: string;
  hero_trust3: string;
  hero_chipTitle: string;
  hero_chipSub: string;

  // Trust bar
  trust_label: string;
  trust_1: string;
  trust_2: string;
  trust_3: string;
  trust_4: string;

  // Two core features
  tcf_eyebrow: string;
  tcf_title_1: string;
  tcf_title_2: string;
  tcf_description: string;
  tcf_docTitle: string;
  tcf_docDesc: string;
  tcf_docCta: string;
  tcf_scamTitle: string;
  tcf_scamDesc: string;
  tcf_scamCta: string;

  // Document understanding breakdown
  du_eyebrow: string;
  du_title: string;
  du_description: string;
  du_1_title: string;
  du_1_desc: string;
  du_2_title: string;
  du_2_desc: string;
  du_3_title: string;
  du_3_desc: string;
  du_4_title: string;
  du_4_desc: string;
  du_5_title: string;
  du_5_desc: string;
  du_6_title: string;
  du_6_desc: string;
  du_7_title: string;
  du_7_desc: string;

  // Phishing detector breakdown
  pd_eyebrow: string;
  pd_title: string;
  pd_description: string;
  pd_1_title: string;
  pd_1_desc: string;
  pd_2_title: string;
  pd_2_desc: string;
  pd_3_title: string;
  pd_3_desc: string;
  pd_4_title: string;
  pd_4_desc: string;
  pd_5_title: string;
  pd_5_desc: string;

  // Sample result preview
  sr_eyebrow: string;
  sr_title: string;
  sr_description: string;
  sr_docType: string;
  sr_language: string;
  sr_summary: string;
  sr_summaryBody: string;
  sr_keyInfo: string;
  sr_keyInfo_1: string;
  sr_keyInfo_2: string;
  sr_keyInfo_3: string;
  sr_riskLevel: string;
  sr_riskLow: string;
  sr_warnings: string;
  sr_warningBody: string;
  sr_actions: string;
  sr_action_1: string;
  sr_action_2: string;
  sr_action_3: string;
  sr_askAi: string;
  sr_askAiPlaceholder: string;
  sr_translate: string;
  sr_download: string;
  sr_disclaimer: string;

  // Multi-language section
  ml_eyebrow: string;
  ml_title: string;
  ml_description: string;
  ml_rtl: string;
  ml_rtlDesc: string;
  ml_accuracy: string;
  ml_accuracyDesc: string;
  ml_global: string;
  ml_globalDesc: string;

  // Upload zone
  up_eyebrow: string;
  up_title_1: string;
  up_title_2: string;
  up_description: string;
  up_dropHere: string;
  up_browse: string;
  up_encrypted: string;
  up_types: string;
  up_categories: string;
  up_privacyTitle: string;
  up_privacyDesc: string;
  up_type_medical: string;
  up_type_legal: string;
  up_type_gov: string;
  up_type_bank: string;
  up_type_financial: string;
  up_type_contract: string;
  up_type_invoice: string;
  up_type_email: string;
  up_type_suspicious: string;
  up_hint_medical: string;
  up_hint_legal: string;
  up_hint_gov: string;
  up_hint_bank: string;
  up_hint_financial: string;
  up_hint_contract: string;
  up_hint_invoice: string;
  up_hint_email: string;
  up_hint_suspicious: string;
  up_reassureTitle: string;
  up_reassureDesc: string;

  // How it works
  hw_eyebrow: string;
  hw_title: string;
  hw_description: string;
  hw_1_title: string;
  hw_1_desc: string;
  hw_2_title: string;
  hw_2_desc: string;
  hw_3_title: string;
  hw_3_desc: string;

  // Security
  sec_eyebrow: string;
  sec_title: string;
  sec_description: string;
  sec_1_title: string;
  sec_1_desc: string;
  sec_2_title: string;
  sec_2_desc: string;
  sec_3_title: string;
  sec_3_desc: string;
  sec_4_title: string;
  sec_4_desc: string;
  sec_5_title: string;
  sec_5_desc: string;
  sec_6_title: string;
  sec_6_desc: string;
  sec_stripTitle: string;
  sec_stripDesc: string;
  sec_stripCta: string;

  // Stats
  st_1_value: string;
  st_1_label: string;
  st_1_sub: string;
  st_2_value: string;
  st_2_label: string;
  st_2_sub: string;
  st_3_value: string;
  st_3_label: string;
  st_3_sub: string;
  st_4_value: string;
  st_4_label: string;
  st_4_sub: string;
  st_footnote: string;

  // Trust & legal
  legal_eyebrow: string;
  legal_title: string;
  legal_description: string;
  legal_privacy: string;
  legal_security: string;
  legal_terms: string;
  legal_disclaimer: string;
  legal_cookie: string;
  legal_aiTransparency: string;
  legal_responsibleAi: string;
  legal_financial: string;
  legal_privacyBody: string;
  legal_securityBody: string;
  legal_termsBody: string;
  legal_disclaimerBody: string;
  legal_cookieBody: string;
  legal_aiTransparencyBody: string;
  legal_responsibleAiBody: string;
  legal_financialBody: string;

  // FAQ
  faq_eyebrow: string;
  faq_title: string;
  faq_description: string;
  faq_1_q: string;
  faq_1_a: string;
  faq_2_q: string;
  faq_2_a: string;
  faq_3_q: string;
  faq_3_a: string;
  faq_4_q: string;
  faq_4_a: string;
  faq_5_q: string;
  faq_5_a: string;
  faq_6_q: string;
  faq_6_a: string;

  // Final CTA
  cta_badge: string;
  cta_title_1: string;
  cta_title_2: string;
  cta_description: string;
  cta_primary: string;
  cta_secondary: string;

  // Footer
  footer_tagline: string;
  footer_platform: string;
  footer_platform_1: string;
  footer_platform_2: string;
  footer_platform_3: string;
  footer_platform_4: string;
  footer_security: string;
  footer_security_1: string;
  footer_security_2: string;
  footer_security_3: string;
  footer_security_4: string;
  footer_company: string;
  footer_company_1: string;
  footer_company_2: string;
  footer_company_3: string;
  footer_company_4: string;
  footer_resources: string;
  footer_resources_1: string;
  footer_resources_2: string;
  footer_resources_3: string;
  footer_resources_4: string;
  footer_rights: string;
  footer_privacy: string;
  footer_terms: string;
  footer_disclaimer: string;
  footer_status: string;

  // Language selector
  lang_selectLanguage: string;
  lang_searchPlaceholder: string;
}

export type TranslationDict = Record<LanguageCode, Translation>;
