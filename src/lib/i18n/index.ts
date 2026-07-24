import type { LanguageCode } from "./config";
import type { TranslationDict } from "./types";
import { en, es } from "./translations-en-es";
import { fr, de, pt, it, nl } from "./translations-eu";
import { ar, ur, hi } from "./translations-rtl";
import { zh, ja, ko } from "./translations-cjk";
import { tr, ru, id } from "./translations-other";

export const translations: TranslationDict = {
  en,
  es,
  fr,
  de,
  pt,
  it,
  nl,
  ar,
  ur,
  hi,
  zh,
  ja,
  ko,
  tr,
  ru,
  id,
};

export type { LanguageCode, Translation, TranslationDict } from "./types";
export { LANGUAGES, LANGUAGE_MAP, DEFAULT_LANGUAGE, isRtl } from "./config";
