"use client";

import * as React from "react";
import {
  LANGUAGES,
  LANGUAGE_MAP,
  DEFAULT_LANGUAGE,
  isRtl,
  type LanguageCode,
} from "./config";
import { translations, type Translation } from "./index";

interface I18nContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
  rtl: boolean;
  t: Translation;
  /** List of all supported languages (for the selector) */
  languages: typeof LANGUAGES;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "klarium-lang";

function getInitialLang(): LanguageCode {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGE_MAP[stored as LanguageCode]) {
      return stored as LanguageCode;
    }
    // Try browser language match
    const nav = window.navigator.language?.toLowerCase() ?? "";
    for (const lang of LANGUAGES) {
      if (nav.startsWith(lang.code) || nav.startsWith(lang.locale.toLowerCase().split("-")[0])) {
        return lang.code;
      }
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_LANGUAGE;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [hydrated, setHydrated] = React.useState(false);

  // Hydrate from localStorage / browser on mount
  React.useEffect(() => {
    setLangState(getInitialLang());
    setHydrated(true);
  }, []);

  // Sync document `lang` and `dir` attributes + font stack whenever language changes
  React.useEffect(() => {
    if (!hydrated) return;
    const meta = LANGUAGE_MAP[lang];
    if (!meta) return;
    const html = document.documentElement;
    html.lang = meta.locale;
    html.dir = meta.rtl ? "rtl" : "ltr";
    html.style.fontFamily = meta.fontStack;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, hydrated]);

  const setLang = React.useCallback((code: LanguageCode) => {
    setLangState(code);
  }, []);

  const value = React.useMemo<I18nContextValue>(() => {
    const t = translations[lang] ?? translations[DEFAULT_LANGUAGE];
    return {
      lang,
      setLang,
      rtl: isRtl(lang),
      t,
      languages: LANGUAGES,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    // Safe fallback so components don't crash if used outside provider during SSR
    return {
      lang: DEFAULT_LANGUAGE,
      setLang: () => {},
      rtl: false,
      t: translations[DEFAULT_LANGUAGE],
      languages: LANGUAGES,
    };
  }
  return ctx;
}
