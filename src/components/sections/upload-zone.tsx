"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, HeartPulse, Scale, Landmark, Receipt,
  FileSignature, Mail, Image as ImageIcon, ShieldCheck,
  Upload, CheckCircle2, Loader2, ExternalLink,
  AlertTriangle, Pill, Sparkles, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/brand/section";
import { useI18n } from "@/lib/i18n/context";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "uploading" | "done" | "error" | "maintenance";
type InputMode = "file" | "text";

interface FileType {
  label: string;
  icon: LucideIcon;
  hint: string;
  isPhishing?: boolean;
  isAutoDetect?: boolean;
  isPrescription?: boolean;
}

interface Result {
  explanation: string;
  verdict?: string;
  confidence?: string;
  slug?: string;
  isPhishing: boolean;
  detectedType?: string;
}

const LANGS = [
  "English", "Urdu", "Hindi", "Arabic", "Spanish", "French",
  "Bengali", "Portuguese", "Filipino", "Swahili",
];

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ResultBlock({
  line,
  accent,
  accentDk,
}: {
  line: string;
  accent: string;
  accentDk: string;
}) {
  if (line.startsWith("**") && line.endsWith("**")) {
    return (
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: ".1em",
          color: accentDk,
          textTransform: "uppercase",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        {line.replace(/\*\*/g, "")}
      </p>
    );
  }

  if (line.startsWith("- ") || line.startsWith("• ")) {
    return (
      <div style={{ display: "flex", gap: 8, marginBottom: 7, alignItems: "flex-start" }}>
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: accent,
            flexShrink: 0,
            marginTop: 8,
            display: "block",
          }}
        />
        <span style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.65 }}>
          {line.replace(/^[-•]\s/, "")}
        </span>
      </div>
    );
  }

  if (!line.trim()) return null;

  return (
    <p style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.65, marginBottom: 4 }}>
      {line}
    </p>
  );
}

export function UploadZone() {
  const { t } = useI18n();

  // Auto Detect is deliberately the default option.
  const [selected, setSelected] = React.useState<number>(0);
  const [dragging, setDragging] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [inputMode, setInputMode] = React.useState<InputMode>("file");
  const [pasteText, setPasteText] = React.useState("");
  const [language, setLanguage] = React.useState("English");
  const [result, setResult] = React.useState<Result | null>(null);
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"yes" | "no" | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [followUpQ, setFollowUpQ] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [followUpLoading, setFollowUpLoading] = React.useState(false);

  const positiveMessages = React.useRef([
    "✓ Glad it helped!",
    "✓ Thanks for letting us know!",
    "✓ Great — that's what we're here for.",
    "✓ Appreciate the feedback!",
  ]);

  const negativeMessages = React.useRef([
    "✓ Thanks — we'll keep improving.",
    "✓ Noted. We're working to get better.",
    "✓ Thanks for the honesty — it helps us improve.",
  ]);

  const [feedbackMsg] = React.useState(() => ({
    yes: positiveMessages.current[
      Math.floor(Math.random() * positiveMessages.current.length)
    ],
    no: negativeMessages.current[
      Math.floor(Math.random() * negativeMessages.current.length)
    ],
  }));

  const fileRef = React.useRef<HTMLInputElement>(null);
  const dropRef = React.useRef<HTMLDivElement>(null);

  const FILE_TYPES = React.useMemo<FileType[]>(
    () => [
      {
        label: "Auto Detect",
        icon: Sparkles,
        hint: "Let Klarium identify the document automatically",
        isAutoDetect: true,
      },
      {
        label: "Doctor's Prescription",
        icon: Pill,
        hint: "Medicine, dosage, strength, schedule and cautions",
        isPrescription: true,
      },
      { label: t.up_type_medical, icon: HeartPulse, hint: t.up_hint_medical },
      { label: t.up_type_legal, icon: Scale, hint: t.up_hint_legal },
      { label: t.up_type_gov, icon: Landmark, hint: t.up_hint_gov },
      { label: t.up_type_bank, icon: Landmark, hint: t.up_hint_bank },
      { label: t.up_type_financial, icon: Receipt, hint: t.up_hint_financial },
      { label: t.up_type_contract, icon: FileSignature, hint: t.up_hint_contract },
      { label: t.up_type_invoice, icon: FileText, hint: t.up_hint_invoice },
      {
        label: t.up_type_email,
        icon: Mail,
        hint: t.up_hint_email,
        isPhishing: true,
      },
      {
        label: t.up_type_suspicious,
        icon: ImageIcon,
        hint: t.up_hint_suspicious,
        isPhishing: true,
      },
    ],
    [t]
  );

  const selectedType = FILE_TYPES[selected];
  const isAutoDetectMode = !!selectedType?.isAutoDetect;
  const isPrescriptionMode = !!selectedType?.isPrescription;
  const isPhishingMode = !!selectedType?.isPhishing;

  const CLARITY_STAGES = isAutoDetectMode
    ? [
        "Uploading file",
        "Reading document",
        "Detecting document type",
        "Detecting language",
        "Understanding content",
        "Generating report",
        "Final review",
      ]
    : isPrescriptionMode
      ? [
          "Uploading prescription",
          "Reading prescription",
          "Checking medicine text",
          "Checking dosage details",
          "Building safety explanation",
          "Generating report",
          "Final review",
        ]
      : [
          "Uploading file",
          "Reading document",
          "Detecting language",
          "Understanding content",
          "Identifying risks",
          "Generating report",
          "Final review",
        ];

  const SHIELD_STAGES = [
    "Uploading message",
    "Reading content",
    "Checking known fraud patterns",
    "Analysing links & language",
    "Generating verdict",
    "Final review",
  ];

  const [stageIndex, setStageIndex] = React.useState(0);

  React.useEffect(() => {
    if (status !== "uploading") {
      setStageIndex(0);
      return;
    }

    const stages = isPhishingMode ? SHIELD_STAGES : CLARITY_STAGES;
    const interval = setInterval(() => {
      setStageIndex((previous) =>
        previous < stages.length - 1 ? previous + 1 : previous
      );
    }, 900);

    return () => clearInterval(interval);
  }, [status, isPhishingMode, CLARITY_STAGES.length]);

  const analyse = React.useCallback(
    async (file?: File) => {
      setStatus("uploading");
      setErrorMsg("");

      try {
        // Auto Detect is an explicit document mode, not an absence of a selection.
        const docType = isAutoDetectMode
          ? "auto-detect"
          : selectedType?.label ?? "auto-detect";

        const endpoint = isPhishingMode ? "/api/shield" : "/api/explain";

        let payload: Record<string, string>;

        if (file) {
          if (file.size > 10 * 1024 * 1024) {
            setErrorMsg("File must be under 10 MB.");
            setStatus("error");
            return;
          }

          const supportedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "application/pdf",
          ];

          if (!supportedTypes.includes(file.type)) {
            setErrorMsg("Please upload a JPG, PNG, WebP, GIF, or PDF.");
            setStatus("error");
            return;
          }

          const base64 = await readAsBase64(file);

          payload = {
            fileData: base64,
            fileType: file.type,
            docType,
            language,
          };
        } else if (pasteText.trim().length >= 10) {
          payload = {
            text: pasteText,
            docType,
            language,
          };
        } else {
          setErrorMsg("Please add text or upload a file first.");
          setStatus("error");
          return;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          if (data.maintenance) {
            setErrorMsg(
              data.error ??
                "Klarium is temporarily undergoing scheduled maintenance."
            );
            setStatus("maintenance");
          } else {
            setErrorMsg(
              data.error ?? "Something went wrong. Please try again."
            );
            setStatus("error");
          }
          return;
        }

        setResult({
          explanation: data.explanation ?? data.result ?? "",
          verdict: data.verdict,
          confidence: data.confidence,
          slug: data.slug,
          isPhishing: !!isPhishingMode,
          detectedType: data.detectedType,
        });

        setStatus("done");
        setOpen(true);
      } catch {
        setErrorMsg(
          "Connection error. Please check your internet connection."
        );
        setStatus("error");
      }
    },
    [
      selectedType,
      isAutoDetectMode,
      isPhishingMode,
      pasteText,
      language,
    ]
  );

  const askFollowUp = React.useCallback(async () => {
    if (!followUpQ.trim() || !result?.explanation || followUpLoading) return;

    const question = followUpQ.trim();
    const historySnapshot = chatMessages;

    setChatMessages((previous) => [
      ...previous,
      { role: "user", text: question },
    ]);
    setFollowUpLoading(true);
    setFollowUpQ("");

    try {
      const response = await fetch("/api/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalExplanation: result.explanation,
          history: historySnapshot,
          question,
          language,
        }),
      });

      const data = await response.json();
      const answer =
        data.answer ??
        "Sorry, I couldn't answer that. Please try rephrasing your question.";

      setChatMessages((previous) => [
        ...previous,
        { role: "assistant", text: answer },
      ]);
    } catch {
      setChatMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setFollowUpLoading(false);
    }
  }, [followUpQ, result, language, followUpLoading, chatMessages]);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) analyse(file);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) analyse(file);
  };

  const handleClick = () => {
    if (inputMode === "text") {
      analyse(undefined);
    } else {
      fileRef.current?.click();
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMsg("");
    setPasteText("");
    setFeedback(null);
    setFollowUpQ("");
    setChatMessages([]);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const accent = isPhishingMode ? "#B91C1C" : "#0066CC";
  const accentDk = isPhishingMode ? "#7F1D1D" : "#1E3A8A";
  const accentBg = isPhishingMode ? "#FEF2F2" : "#EFF6FF";
  const accentBr = isPhishingMode ? "#FECDD3" : "#BFDBFE";

  const resultBlocks = React.useMemo(() => {
    if (!result) return [];

    return result.explanation
      .split("\n")
      .filter(
        (line) =>
          !line.startsWith("VERDICT:") &&
          !line.startsWith("CONFIDENCE:") &&
          line.trim()
      );
  }, [result]);

  return (
    <Section id="upload" className="py-20 sm:py-24 lg:py-28">
      <div className="container-premium">
        <SectionHeading
          eyebrow={t.up_eyebrow}
          title={
            <>
              {t.up_title_1} <span className="text-brand">{t.up_title_2}</span>
            </>
          }
          description={t.up_description}
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-premium-xs">
            <span className="text-xs font-semibold text-muted-foreground">
              Language:
            </span>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-7 w-36 border-0 bg-transparent p-0 text-xs font-semibold shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGS.map((item) => (
                  <SelectItem key={item} value={item} className="text-xs">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-premium-xs">
            {(["file", "text"] as InputMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setInputMode(mode)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all",
                  inputMode === mode
                    ? "bg-navy text-white shadow-premium-xs dark:bg-white dark:text-navy"
                    : "text-muted-foreground hover:text-navy"
                )}
              >
                {mode === "file" ? "Upload file" : "Paste text"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-premium-lg">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              aria-hidden="true"
              onChange={handleFileInput}
            />

            {inputMode === "text" && (
              <div className="flex flex-col gap-3 p-4">
                <Textarea
                  value={pasteText}
                  onChange={(event) => setPasteText(event.target.value)}
                  placeholder={
                    isPhishingMode
                      ? "Paste the suspicious message here — include sender, subject, full body and any links…"
                      : "Paste your document text here — contract clause, medical report, bank letter, legal notice…"
                  }
                  className="min-h-[220px] resize-none text-sm leading-relaxed"
                />

                <Button
                  onClick={() => analyse(undefined)}
                  disabled={
                    status === "uploading" || pasteText.trim().length < 10
                  }
                  className="w-full"
                  style={{ background: accent }}
                >
                  {status === "uploading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analysing…
                    </>
                  ) : isPhishingMode ? (
                    "🛡 Check for Fraud"
                  ) : (
                    "✦ Explain This Document"
                  )}
                </Button>
              </div>
            )}

            {inputMode === "file" && (
              <div
                ref={dropRef}
                role="button"
                tabIndex={0}
                aria-label={
                  isPhishingMode
                    ? "Upload suspicious message screenshot"
                    : "Upload document"
                }
                onClick={handleClick}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleClick();
                  }
                }}
                className={cn(
                  "relative flex min-h-[340px] flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer sm:min-h-[420px]",
                  status === "done"
                    ? "border-success/50 bg-success/5"
                    : status === "error"
                      ? "border-destructive/50 bg-destructive/5"
                      : status === "maintenance"
                        ? "border-border bg-muted/40"
                        : dragging
                          ? "border-brand bg-brand/5"
                          : "border-border bg-muted/30 hover:border-brand/50 hover:bg-brand/5"
                )}
              >
                <AnimatePresence mode="wait">
                  {status === "uploading" && (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex w-full max-w-[280px] flex-col items-center gap-4"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white dark:bg-white dark:text-navy">
                        <Loader2 className="h-7 w-7 animate-spin" />
                      </div>

                      <div className="flex w-full flex-col gap-1.5">
                        {(isPhishingMode
                          ? SHIELD_STAGES
                          : CLARITY_STAGES
                        ).map((stage, index) => (
                          <div
                            key={stage}
                            className="flex items-center gap-2.5"
                          >
                            <span
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-colors",
                                index < stageIndex
                                  ? "bg-success text-white"
                                  : index === stageIndex
                                    ? "bg-brand text-white"
                                    : "bg-muted text-muted-foreground"
                              )}
                            >
                              {index < stageIndex ? "✓" : ""}
                            </span>

                            <span
                              className={cn(
                                "text-xs transition-colors",
                                index <= stageIndex
                                  ? "font-medium text-navy dark:text-white"
                                  : "text-muted-foreground/50"
                              )}
                            >
                              {stage}
                            </span>

                            {index === stageIndex && (
                              <span className="ml-auto flex gap-0.5">
                                <span
                                  className="h-1 w-1 animate-bounce rounded-full bg-brand"
                                  style={{ animationDelay: "0ms" }}
                                />
                                <span
                                  className="h-1 w-1 animate-bounce rounded-full bg-brand"
                                  style={{ animationDelay: "150ms" }}
                                />
                                <span
                                  className="h-1 w-1 animate-bounce rounded-full bg-brand"
                                  style={{ animationDelay: "300ms" }}
                                />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Processing privately · never stored
                      </p>
                    </motion.div>
                  )}

                  {status === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 text-success">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>

                      <p className="text-lg font-semibold text-navy dark:text-white">
                        Analysis complete
                      </p>

                      <Button
                        size="sm"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpen(true);
                        }}
                        style={{ background: accent }}
                      >
                        View Explanation
                      </Button>

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          handleReset();
                        }}
                        className="text-xs text-muted-foreground underline underline-offset-2"
                      >
                        Analyse another
                      </button>
                    </motion.div>
                  )}

                  {status === "maintenance" && (
                    <motion.div
                      key="maintenance"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-4 px-2 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white dark:bg-white dark:text-navy">
                        <ShieldCheck className="h-7 w-7" />
                      </div>

                      <div>
                        <p className="text-base font-semibold text-navy dark:text-white">
                          We'll be right back
                        </p>
                        <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
                          {errorMsg}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                        Service temporarily paused
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleReset();
                        }}
                      >
                        Check again
                      </Button>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                        <AlertTriangle className="h-8 w-8" />
                      </div>

                      <p className="text-base font-semibold text-navy dark:text-white">
                        Something went wrong
                      </p>

                      <p className="max-w-[260px] text-sm text-muted-foreground">
                        {errorMsg}
                      </p>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleReset();
                        }}
                      >
                        Try again
                      </Button>
                    </motion.div>
                  )}

                  {status === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-5"
                    >
                      <div
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-premium transition-transform",
                          dragging ? "scale-110" : ""
                        )}
                        style={{ background: accent }}
                      >
                        {isPhishingMode ? (
                          <ShieldCheck className="h-7 w-7" />
                        ) : (
                          <Upload className="h-7 w-7" />
                        )}
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-navy dark:text-white">
                          {t.up_dropHere}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t.up_browse}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                        {["PDF", "JPG", "PNG", "Screenshot"].map((extension) => (
                          <span
                            key={extension}
                            className="rounded-md border border-border bg-background px-2 py-1"
                          >
                            {extension}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/5 px-3 py-1.5 text-xs font-medium text-success">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t.up_encrypted}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-premium">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-navy dark:text-white">
                  {t.up_categories}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {FILE_TYPES.length}
                </span>
              </div>

              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {FILE_TYPES.map((fileType, index) => {
                  const active = selected === index;

                  return (
                    <li key={fileType.label}>
                      <button
                        type="button"
                        onClick={() => setSelected(index)}
                        aria-pressed={active}
                        className={cn(
                          "group flex min-h-[52px] w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-start transition-all",
                          active
                            ? "border-brand/40 bg-brand/5 shadow-premium-xs"
                            : "border-transparent bg-muted/30 hover:bg-muted"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors",
                            active
                              ? "bg-brand/10 text-brand"
                              : "bg-background text-muted-foreground group-hover:text-navy dark:group-hover:text-white"
                          )}
                        >
                          <fileType.icon className="h-4 w-4" aria-hidden />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-navy dark:text-white">
                            {fileType.label}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {fileType.hint}
                          </span>
                        </span>

                        <AnimatePresence>
                          {active && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.6 }}
                              transition={{ duration: 0.15 }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-brand" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-navy p-5 text-white shadow-premium dark:bg-navy-deep">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>

                <div className="text-sm leading-relaxed">
                  <p className="font-medium">{t.up_privacyTitle}</p>
                  <p className="mt-1 text-white/70">{t.up_privacyDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {result?.isPhishing ? (
                  <ShieldCheck style={{ width: 13, height: 13, color: "#fff" }} />
                ) : (
                  <CheckCircle2 style={{ width: 13, height: 13, color: "#fff" }} />
                )}
              </span>

              {result?.isPhishing
                ? "Klarium Shield — Fraud Analysis"
                : result?.detectedType?.toLowerCase().includes("prescription")
                  ? "Klarium — Doctor's Prescription"
                  : "Klarium — Document Explanation"}
            </DialogTitle>

            {!result?.isPhishing && (
              <DialogDescription className="text-xs">
                Explained in {language}
              </DialogDescription>
            )}
          </DialogHeader>

          {result && (
            <div>
              {result.detectedType && (
                <div
                  style={{
                    padding: "13px 15px",
                    borderRadius: 10,
                    marginBottom: 14,
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Sparkles style={{ width: 16, height: 16, color: accent, flexShrink: 0 }} />
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#64748B",
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                      }}
                    >
                      Document detected
                    </p>
                    <p style={{ marginTop: 2, fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
                      {result.detectedType}
                    </p>
                  </div>
                </div>
              )}

              {(isPrescriptionMode ||
                result.detectedType?.toLowerCase().includes("prescription")) && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    marginBottom: 14,
                    background: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <AlertTriangle
                    style={{
                      width: 17,
                      height: 17,
                      color: "#B45309",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 13, color: "#78350F" }}>
                      Prescription safety
                    </p>
                    <p
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        lineHeight: 1.55,
                        color: "#92400E",
                      }}
                    >
                      Klarium only explains what can be read from the prescription.
                      It never guesses an unclear medicine name, strength or dosage.
                      Confirm unclear information with your doctor or pharmacist
                      before taking or changing medication.
                    </p>
                  </div>
                </div>
              )}

              {result.isPhishing && result.verdict && (
                <div
                  style={{
                    padding: "16px 18px",
                    borderRadius: 12,
                    marginBottom: 16,
                    background:
                      result.verdict === "SCAM" ? "#FEF2F2" : "#F0FDF4",
                    border:
                      result.verdict === "SCAM"
                        ? "1.5px solid #FECDD3"
                        : "1.5px solid #86EFAC",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 26, lineHeight: 1 }}>
                    {result.verdict === "SCAM" ? "⚠️" : "✅"}
                  </span>

                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color:
                          result.verdict === "SCAM" ? "#7F1D1D" : "#14532D",
                      }}
                    >
                      {result.verdict === "SCAM"
                        ? "This message shows signs of fraud"
                        : "This message appears legitimate"}
                    </p>

                    {result.confidence && (
                      <p
                        style={{
                          fontSize: 12,
                          color:
                            result.verdict === "SCAM" ? "#B91C1C" : "#15803D",
                          fontWeight: 600,
                          marginTop: 3,
                        }}
                      >
                        Confidence: {result.confidence}
                      </p>
                    )}

                    {result.verdict === "SCAM" && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#7F1D1D",
                          marginTop: 8,
                          lineHeight: 1.5,
                        }}
                      >
                        Do not click any links · Do not reply · Contact your bank
                        directly
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: 12,
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                }}
              >
                {resultBlocks.map((line, index) => (
                  <ResultBlock
                    key={index}
                    line={line}
                    accent={accent}
                    accentDk={accentDk}
                  />
                ))}
              </div>

              <p
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  marginTop: 12,
                  lineHeight: 1.5,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 5,
                }}
              >
                <span>🔒</span>
                {result.isPhishing
                  ? "For suspected fraud, report to your bank and local cybercrime authorities immediately."
                  : "For legal, medical, or financial decisions, always consult a qualified professional."}
              </p>

              {result.slug && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "10px 14px",
                    borderRadius: 8,
                    background: accentBg,
                    border: `1px solid ${accentBr}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      color: accentDk,
                      fontWeight: 500,
                    }}
                  >
                    This explanation has a permanent page you can share or revisit.
                  </p>

                  <a
                    href={`/explain/${result.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      color: accent,
                      fontWeight: 600,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      marginLeft: 12,
                    }}
                  >
                    Open page <ExternalLink style={{ width: 11, height: 11 }} />
                  </a>
                </div>
              )}

              <div
                style={{
                  marginTop: 14,
                  padding: "14px 16px",
                  borderRadius: 10,
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    marginBottom: 8,
                  }}
                >
                  💬 Chat about this document
                </p>

                {chatMessages.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginBottom: 10,
                      maxHeight: 260,
                      overflowY: "auto",
                    }}
                  >
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent:
                            message.role === "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "80%",
                            padding: "8px 12px",
                            borderRadius:
                              message.role === "user"
                                ? "12px 12px 2px 12px"
                                : "12px 12px 12px 2px",
                            background:
                              message.role === "user" ? accent : "#fff",
                            color:
                              message.role === "user" ? "#fff" : "#1D1D1F",
                            border:
                              message.role === "user"
                                ? "none"
                                : "1px solid #E5E7EB",
                            fontSize: 13,
                            lineHeight: 1.5,
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}

                    {followUpLoading && (
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div
                          style={{
                            padding: "8px 12px",
                            borderRadius: "12px 12px 12px 2px",
                            background: "#fff",
                            border: "1px solid #E5E7EB",
                            fontSize: 13,
                            color: "#9CA3AF",
                          }}
                        >
                          Typing…
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="text"
                    value={followUpQ}
                    onChange={(event) => setFollowUpQ(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") askFollowUp();
                    }}
                    placeholder={
                      chatMessages.length === 0
                        ? "Ask anything about this document…"
                        : "Ask another question…"
                    }
                    disabled={followUpLoading}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 7,
                      border: "1px solid #D1D5DB",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />

                  <button
                    onClick={askFollowUp}
                    disabled={followUpLoading || !followUpQ.trim()}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 7,
                      border: "none",
                      background:
                        followUpLoading || !followUpQ.trim()
                          ? "#D1D5DB"
                          : accent,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor:
                        followUpLoading || !followUpQ.trim()
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {followUpLoading ? "…" : "Ask"}
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: 14,
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {feedback === null ? (
                  <>
                    <p style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>
                      Was this explanation helpful?
                    </p>

                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => setFeedback("yes")}
                        style={{
                          padding: "5px 14px",
                          borderRadius: 6,
                          border: "1px solid #D1D5DB",
                          background: "#fff",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#374151",
                          cursor: "pointer",
                        }}
                      >
                        👍 Yes
                      </button>

                      <button
                        onClick={() => setFeedback("no")}
                        style={{
                          padding: "5px 14px",
                          borderRadius: 6,
                          border: "1px solid #D1D5DB",
                          background: "#fff",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#374151",
                          cursor: "pointer",
                        }}
                      >
                        👎 No
                      </button>
                    </div>
                  </>
                ) : (
                  <p
                    style={{
                      fontSize: 12,
                      color: "#15803D",
                      fontWeight: 600,
                    }}
                  >
                    {feedback === "yes" ? feedbackMsg.yes : feedbackMsg.no}
                  </p>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setOpen(false);
                    handleReset();
                  }}
                >
                  Analyse another
                </Button>

                <Button
                  className="flex-1"
                  style={{ background: accent }}
                  onClick={() => setOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
