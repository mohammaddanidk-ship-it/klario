"use client";

import * as React from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  FileCheck2,
  Flag,
  Info,
  ListChecks,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import type { DocumentReport, ReportItem } from "@/lib/document-report";

type Props = {
  report: DocumentReport;
  accent: string;
};

function ItemList({ items, accent }: { items: ReportItem[]; accent: string }) {
  if (!items.length) return null;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          style={{
            padding: "10px 12px",
            borderRadius: 9,
            background: "#fff",
            border: "1px solid #E5E7EB",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: accent,
                marginTop: 6,
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>
                {item.label}
              </p>
              <p style={{ marginTop: 2, fontSize: 13, lineHeight: 1.55, color: "#1D1D1F" }}>
                {item.value}
              </p>
              {item.evidence && (
                <p style={{ marginTop: 5, fontSize: 10, lineHeight: 1.45, color: "#64748B" }}>
                  {item.evidence.confidence === "low"
                    ? "Uncertain — verify this detail."
                    : item.evidence.source === "document"
                      ? "Found in the document."
                      : "Contextual interpretation."}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
  tone = "neutral",
}: {
  title: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  children: React.ReactNode;
  tone?: "neutral" | "attention" | "uncertain" | "action";
}) {
  const palette = {
    neutral: { bg: "#F8FAFC", border: "#E2E8F0", icon: "#334155" },
    attention: { bg: "#FFFBEB", border: "#FDE68A", icon: "#B45309" },
    uncertain: { bg: "#F8FAFC", border: "#CBD5E1", icon: "#475569" },
    action: { bg: "#F0FDF4", border: "#BBF7D0", icon: "#166534" },
  }[tone];

  return (
    <section
      style={{
        padding: 14,
        borderRadius: 12,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Icon style={{ width: 16, height: 16, color: palette.icon, flexShrink: 0 }} />
        <h3 style={{ fontSize: 12, fontWeight: 750, color: "#0F172A", letterSpacing: ".01em" }}>
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function StringList({ items, accent }: { items: string[]; accent: string }) {
  if (!items.length) return null;
  return (
    <div style={{ display: "grid", gap: 7 }}>
      {items.map((item, index) => (
        <div key={`${item}-${index}`} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <ArrowRight style={{ width: 14, height: 14, color: accent, marginTop: 2, flexShrink: 0 }} />
          <span style={{ fontSize: 13, lineHeight: 1.55, color: "#1D1D1F" }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function TruthReportCards({ report, accent }: Props) {
  const sections = [
    report.verifiedFacts.length,
    report.datesAndDeadlines.length,
    report.amountsAndEntities.length,
    report.obligationsAndRequests.length,
    report.attention.length,
    report.uncertainty.length,
    report.nextSteps.length,
    report.questionsToVerify.length,
  ].reduce((sum, value) => sum + value, 0);

  return (
    <div
      style={{
        padding: 14,
        borderRadius: 14,
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <ShieldCheck style={{ width: 18, height: 18, color: accent }} />
            <h2 style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Klarium Truth Layer</h2>
          </div>
          <p style={{ marginTop: 3, fontSize: 11, lineHeight: 1.5, color: "#64748B" }}>
            Evidence-first structure from the same document analysis.
          </p>
        </div>
        <span
          style={{
            padding: "4px 7px",
            borderRadius: 999,
            background: "#F1F5F9",
            color: "#475569",
            fontSize: 9,
            fontWeight: 750,
            whiteSpace: "nowrap",
          }}
        >
          {sections} signals
        </span>
      </div>

      <div style={{ display: "grid", gap: 9 }}>
        <Card title="Quick understanding" icon={Info}>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "#1D1D1F" }}>
            {report.quickUnderstanding || "Klarium could not produce a short summary from the available text."}
          </p>
        </Card>

        {report.verifiedFacts.length > 0 && (
          <Card title="Verified facts" icon={FileCheck2}>
            <ItemList items={report.verifiedFacts} accent={accent} />
          </Card>
        )}

        {report.datesAndDeadlines.length > 0 && (
          <Card title="Dates & deadlines" icon={CalendarDays}>
            <ItemList items={report.datesAndDeadlines} accent={accent} />
          </Card>
        )}

        {report.amountsAndEntities.length > 0 && (
          <Card title="Amounts & entities" icon={WalletCards}>
            <ItemList items={report.amountsAndEntities} accent={accent} />
          </Card>
        )}

        {report.obligationsAndRequests.length > 0 && (
          <Card title="Obligations & requests" icon={ListChecks}>
            <ItemList items={report.obligationsAndRequests} accent={accent} />
          </Card>
        )}

        {report.attention.length > 0 && (
          <Card title="What needs attention" icon={Flag} tone="attention">
            <ItemList items={report.attention} accent={accent} />
          </Card>
        )}

        {report.uncertainty.length > 0 && (
          <Card title="What is uncertain" icon={CircleHelp} tone="uncertain">
            <ItemList items={report.uncertainty} accent={accent} />
          </Card>
        )}

        {report.nextSteps.length > 0 && (
          <Card title="What to do next" icon={ArrowRight} tone="action">
            <StringList items={report.nextSteps} accent={accent} />
          </Card>
        )}

        {report.questionsToVerify.length > 0 && (
          <Card title="What to ask / verify" icon={CheckCircle2}>
            <StringList items={report.questionsToVerify} accent={accent} />
          </Card>
        )}

        {report.simpleConclusion && (
          <div style={{ padding: "12px 13px", borderRadius: 10, background: "#F8FAFC", border: "1px dashed #CBD5E1" }}>
            <p style={{ fontSize: 10, fontWeight: 750, color: "#64748B", textTransform: "uppercase", letterSpacing: ".08em" }}>
              In simple words
            </p>
            <p style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: "#0F172A" }}>{report.simpleConclusion}</p>
          </div>
        )}

        {report.safety.highStakes && report.safety.disclaimer && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 12px", borderRadius: 9, background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <AlertTriangle style={{ width: 15, height: 15, color: "#64748B", marginTop: 1, flexShrink: 0 }} />
            <p style={{ fontSize: 10.5, lineHeight: 1.5, color: "#475569" }}>{report.safety.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
