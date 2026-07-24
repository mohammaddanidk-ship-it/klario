/**
 * Klario — supported languages and RTL configuration.
 * Scalable: add a new language by appending to LANGUAGES and providing
 * translations in `translations.ts`.
 */

export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "ar"
  | "hi"
  | "ur"
  | "zh"
  | "ja"
  | "ko"
  | "pt"
  | "it"
  | "nl"
  | "tr"
  | "ru"
  | "id";

export interface Language {
  code: LanguageCode;
  /** English name (for reference / fallback) */
  englishName: string;
  /** Native name (shown in the selector) */
  nativeName: string;
  /** Native name with script-specific short label */
  shortLabel: string;
  /** BCP-47 locale tag for `lang` attribute */
  locale: string;
  /** Right-to-left rendering */
  rtl: boolean;
  /** Recommended font family for this script */
  fontStack: string;
}

export const LANGUAGES: Language[] = [
  {
    code: "en",
    englishName: "English",
    nativeName: "English",
    shortLabel: "EN",
    locale: "en-US",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "es",
    englishName: "Spanish",
    nativeName: "Español",
    shortLabel: "ES",
    locale: "es-ES",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "fr",
    englishName: "French",
    nativeName: "Français",
    shortLabel: "FR",
    locale: "fr-FR",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "de",
    englishName: "German",
    nativeName: "Deutsch",
    shortLabel: "DE",
    locale: "de-DE",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "ar",
    englishName: "Arabic",
    nativeName: "العربية",
    shortLabel: "AR",
    locale: "ar-SA",
    rtl: true,
    fontStack: "'Noto Sans Arabic', var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "hi",
    englishName: "Hindi",
    nativeName: "हिन्दी",
    shortLabel: "HI",
    locale: "hi-IN",
    rtl: false,
    fontStack: "'Noto Sans Devanagari', var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "ur",
    englishName: "Urdu",
    nativeName: "اردو",
    shortLabel: "UR",
    locale: "ur-PK",
    rtl: true,
    fontStack: "'Noto Nastaliq Urdu', var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "zh",
    englishName: "Chinese",
    nativeName: "中文",
    shortLabel: "ZH",
    locale: "zh-CN",
    rtl: false,
    fontStack: "'Noto Sans SC', var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "ja",
    englishName: "Japanese",
    nativeName: "日本語",
    shortLabel: "JA",
    locale: "ja-JP",
    rtl: false,
    fontStack: "'Noto Sans JP', var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "ko",
    englishName: "Korean",
    nativeName: "한국어",
    shortLabel: "KO",
    locale: "ko-KR",
    rtl: false,
    fontStack: "'Noto Sans KR', var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "pt",
    englishName: "Portuguese",
    nativeName: "Português",
    shortLabel: "PT",
    locale: "pt-BR",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "it",
    englishName: "Italian",
    nativeName: "Italiano",
    shortLabel: "IT",
    locale: "it-IT",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "nl",
    englishName: "Dutch",
    nativeName: "Nederlands",
    shortLabel: "NL",
    locale: "nl-NL",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "tr",
    englishName: "Turkish",
    nativeName: "Türkçe",
    shortLabel: "TR",
    locale: "tr-TR",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "ru",
    englishName: "Russian",
    nativeName: "Русский",
    shortLabel: "RU",
    locale: "ru-RU",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
  {
    code: "id",
    englishName: "Indonesian",
    nativeName: "Bahasa Indonesia",
    shortLabel: "ID",
    locale: "id-ID",
    rtl: false,
    fontStack: "var(--font-geist-sans), system-ui, sans-serif",
  },
];

export const LANGUAGE_MAP: Record<LanguageCode, Language> = LANGUAGES.reduce(
  (acc, lang) => {
    acc[lang.code] = lang;
    return acc;
  },
  {} as Record<LanguageCode, Language>
);

export const DEFAULT_LANGUAGE: LanguageCode = "en";

export function isRtl(code: LanguageCode): boolean {
  return LANGUAGE_MAP[code]?.rtl ?? false;
}
