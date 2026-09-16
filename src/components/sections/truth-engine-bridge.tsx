"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import type { DocumentReport } from "@/lib/document-report";
import { TruthReportCards } from "@/components/sections/truth-report-cards";

/**
 * Connects the structured Truth Layer to the current upload dialog.
 * The report is rendered as a real React component in the dialog instead of
 * being appended to the human-readable explanation string.
 */
export function TruthEngineBridge() {
  const [report, setReport] = React.useState<DocumentReport | null>(null);
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    const wrappedFetch: typeof window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      try {
        const input = args[0];
        const url =
          typeof input === "string"
            ? input
            : input instanceof Request
              ? input.url
              : input?.url;

        if (url?.includes("/api/explain") && response.ok) {
          const source = await response.clone().json();
          if (typeof source?.explanation !== "string" || !source.explanation.trim()) {
            return response;
          }

          const reportResponse = await originalFetch("/api/document-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              explanation: source.explanation,
              detectedType: source.detectedType ?? "document",
            }),
          });

          if (reportResponse.ok) {
            const reportData = await reportResponse.json();
            setReport(reportData?.report ?? null);
          } else {
            setReport(null);
          }
        }
      } catch {
        setReport(null);
      }

      return response;
    };

    window.fetch = wrappedFetch;
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  React.useEffect(() => {
    if (!report) {
      setMountNode(null);
      return;
    }

    let node: HTMLElement | null = null;

    const findDialog = () => {
      const dialogs = Array.from(
        document.querySelectorAll<HTMLElement>('[role="dialog"]')
      );
      const dialog = dialogs[dialogs.length - 1];
      if (!dialog) return false;

      if (!node || !document.body.contains(node)) {
        node = document.createElement("div");
        node.setAttribute("data-klarium-truth-layer", "true");
        node.style.marginTop = "14px";
        dialog.insertBefore(node, dialog.firstChild?.nextSibling ?? null);
        setMountNode(node);
      }

      return true;
    };

    if (findDialog()) return;

    const observer = new MutationObserver(findDialog);
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      if (node?.parentNode) node.parentNode.removeChild(node);
    };
  }, [report]);

  if (!report || !mountNode) return null;

  return createPortal(
    <TruthReportCards report={report} accent="#0066CC" />,
    mountNode
  );
}
