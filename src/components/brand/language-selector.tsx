"use client";

import * as React from "react";
import { Check, Globe, Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * Premium language selector.
 * - Visible in nav on all breakpoints; also used in footer.
 * - Desktop: popover with search + list.
 * - Mobile: bottom sheet for thumb-friendly access.
 * - Full keyboard support: Arrow Up/Down, Home/End, Enter, Escape.
 * - Active language announced via aria-selected.
 */
export function LanguageSelector({
  variant = "nav",
}: {
  variant?: "nav" | "footer";
}) {
  const { lang, setLang, languages, t } = useI18n();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) ?? languages[0];
  const isFooter = variant === "footer";

  // Track which languages match the current search
  const filtered = React.useMemo(() => {
    if (!query.trim()) return languages;
    const q = query.toLowerCase();
    return languages.filter(
      (l) =>
        l.nativeName.toLowerCase().includes(q) ||
        l.englishName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [query, languages]);

  // Close on outside click / Escape; focus trigger on close
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus search input when opening
  React.useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    } else {
      setQuery("");
    }
  }, [open]);

  // Keyboard navigation inside the list
  const onListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []
    );
    if (items.length === 0) return;
    const currentIndex = items.findIndex(
      (item) => item === document.activeElement
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      items[next].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev =
        currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
      items[prev].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    }
  };

  const selectLang = (code: typeof lang) => {
    setLang(code);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const trigger = (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={t.lang_selectLanguage}
      className={cn(
        "inline-flex items-center gap-2 rounded-full transition-all min-h-[36px]",
        isFooter
          ? "border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white"
          : "border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm hover:border-brand/40 hover:text-navy hover:shadow-premium-xs dark:hover:text-white"
      )}
    >
      <Globe className="h-3.5 w-3.5 text-brand" aria-hidden />
      <span className="hidden sm:inline">{current.nativeName}</span>
      <span className="sm:hidden">{current.shortLabel}</span>
    </button>
  );

  const listContent = (
    <ul
      ref={listRef}
      role="listbox"
      onKeyDown={onListKeyDown}
      className="max-h-[60vh] overflow-y-auto p-1 sm:max-h-64"
    >
      {filtered.length === 0 ? (
        <li className="px-3 py-6 text-center text-xs text-muted-foreground">
          —
        </li>
      ) : (
        filtered.map((l) => {
          const active = l.code === lang;
          return (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => selectLang(l.code)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm transition-colors min-h-[44px]",
                  active
                    ? "bg-brand/10 text-navy dark:text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-navy hover:dark:text-white"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="flex h-5 w-7 items-center justify-center rounded bg-muted text-[10px] font-semibold text-muted-foreground"
                    dir="ltr"
                  >
                    {l.shortLabel}
                  </span>
                  <span
                    className="font-medium"
                    dir={l.rtl ? "rtl" : "ltr"}
                    style={{ fontFamily: l.fontStack }}
                  >
                    {l.nativeName}
                  </span>
                  {l.rtl ? (
                    <span className="rounded bg-brand/10 px-1 py-0.5 text-[9px] font-semibold text-brand">
                      RTL
                    </span>
                  ) : null}
                </span>
                {active ? <Check className="h-3.5 w-3.5 text-brand" aria-hidden /> : null}
              </button>
            </li>
          );
        })
      )}
    </ul>
  );

  const searchRow = (
    <div className="border-b border-border p-2">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-2.5"
          aria-hidden
        />
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.lang_searchPlaceholder}
          className="w-full rounded-md border border-border bg-background py-2 ps-8 pe-3 text-sm text-navy outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/15 rtl:ps-3 rtl:pe-8 dark:text-white"
          aria-label={t.lang_searchPlaceholder}
        />
      </div>
    </div>
  );

  const footerHint = (
    <div className="border-t border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
      16 languages · RTL supported
    </div>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      {trigger}

      {open ? (
        <>
          {/* Desktop popover */}
          <div
            className={cn(
              "absolute z-50 mt-2 hidden w-72 overflow-hidden rounded-xl border border-border bg-popover shadow-premium-xl sm:block",
              "rtl:left-auto rtl:right-0",
              isFooter ? "bottom-full right-0 mb-2 mt-0" : "right-0"
            )}
          >
            {searchRow}
            {listContent}
            {footerHint}
          </div>

          {/* Mobile bottom sheet */}
          <div
            data-lang-sheet
            className="fixed inset-0 z-50 sm:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t.lang_selectLanguage}
          >
            <div
              className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-hidden rounded-t-2xl border-t border-border bg-popover shadow-premium-xl">
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <span className="h-1 w-10 rounded-full bg-border" />
              </div>
              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-2 pt-1">
                <h3 className="text-sm font-semibold text-navy dark:text-white">
                  {t.lang_selectLanguage}
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-navy hover:dark:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {searchRow}
              {listContent}
              {footerHint}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
