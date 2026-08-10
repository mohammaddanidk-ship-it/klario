"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquareWarning, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/brand/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  { value: "general",           label: "General feedback" },
  { value: "bug",                label: "Something isn't working" },
  { value: "incorrect-result",   label: "An explanation seemed wrong" },
  { value: "privacy",            label: "Privacy concern" },
  { value: "other",              label: "Other" },
];

export function ComplaintForm() {
  const [email, setEmail]     = React.useState("");
  const [message, setMessage] = React.useState("");
  const [category, setCategory] = React.useState("general");
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone]       = React.useState(false);
  const [error, setError]     = React.useState("");

  const submit = async () => {
    if (message.trim().length < 10) {
      setError("Please provide a bit more detail (at least 10 characters).");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined, message, category }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Failed to submit. Please try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="complaints" className="py-20 sm:py-24">
      <div className="container-premium">
        <SectionHeading
          eyebrow="We're listening"
          title="Something not right? Tell us."
          description="Report a bug, an incorrect result, a privacy concern, or anything else. We read every submission."
        />

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card p-6 shadow-premium sm:p-8">
          {done ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <p className="text-base font-semibold text-navy dark:text-white">Thank you</p>
              <p className="max-w-[280px] text-sm text-muted-foreground">
                Your message has been received. We review every submission.
              </p>
              <Button size="sm" variant="outline" onClick={() => { setDone(false); setMessage(""); setEmail(""); }}>
                Submit another
              </Button>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MessageSquareWarning className="h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Optional email lets us follow up — otherwise submit anonymously.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Message
                </label>
                <Textarea
                  value={message}
                  onChange={e => { setMessage(e.target.value); setError(""); }}
                  placeholder="Tell us what happened, as much detail as you can..."
                  className="min-h-[120px] resize-none text-sm"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}

              <Button onClick={submit} disabled={submitting || message.trim().length < 10} className="w-full">
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
