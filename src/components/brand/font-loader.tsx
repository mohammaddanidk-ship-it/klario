"use client";

import * as React from "react";
import { useI18n } from "@/lib/i18n/context";

/**
 * Injects the correct Google Fonts link for the selected language's script.
 * Keeps the base bundle small (Latin only) and only loads CJK / Arabic /
 * Devanagari fonts when the user actually selects a language that needs them.
 */
const FONT_LINKS: Record<string, string> = {
  ar: "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap",
  ur: "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap",
  hi: "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap",
  zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap",
  ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap",
  ko: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap",
};

export function FontLoader() {
  const { lang } = useI18n();
  const href = FONT_LINKS[lang];

  React.useEffect(() => {
    if (!href) return;
    const id = `klarium-font-${lang}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [lang, href]);

  return null;
}
