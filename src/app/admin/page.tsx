"use client";

import * as React from "react";

interface Stats {
  today: { requests: number; failed: number; costCents: number };
  month: { requests: number; failed: number; costCents: number };
  allTime: { requests: number; costCents: number };
  totals: { explanations: number; phishingChecks: number };
  recentFailures: { endpoint: string; errorMessage: string | null; createdAt: string }[];
  recentRequests: { endpoint: string; success: boolean; costCents: number; createdAt: string }[];
}

// Set your own monthly budget here to trigger the low-credit alert (in USD)
const MONTHLY_BUDGET_USD = 5;

export default function AdminPage() {
  const [password, setPassword] = React.useState("");
  const [authed, setAuthed] = React.useState(false);
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) {
        setError("Incorrect password.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setStats(data);
      setAuthed(true);
    } catch {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const refresh = React.useCallback(async () => {
    if (!authed) return;
    const res = await fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${password}` } });
    if (res.ok) setStats(await res.json());
  }, [authed, password]);

  React.useEffect(() => {
    if (!authed) return;
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [authed, refresh]);

  const fmt = (cents: number) => `$${(cents / 100).toFixed(3)}`;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: 340, boxShadow: "0 20px 60px rgba(0,0,0,.4)" }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Klarium Admin</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 20 }}>Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Password"
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 14, marginBottom: 12 }}
          />
          {error && <p style={{ color: "#DC2626", fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <button onClick={login} disabled={loading} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "none", background: "#0066CC", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            {loading ? "Checking…" : "Enter Dashboard"}
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const monthCostUSD = stats.month.costCents / 100;
  const budgetPercent = (monthCostUSD / MONTHLY_BUDGET_USD) * 100;
  const isLowCredit = budgetPercent >= 70;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "Inter,system-ui,sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Klarium Admin Dashboard</h1>
          <button onClick={refresh} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid #D1D5DB", background: "#fff", cursor: "pointer" }}>
            ↻ Refresh
          </button>
        </div>

        {isLowCredit && (
          <div style={{ padding: "14px 18px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECDD3", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <p style={{ fontSize: 13, color: "#B91C1C", fontWeight: 600 }}>
              You've used {budgetPercent.toFixed(0)}% of your estimated ${MONTHLY_BUDGET_USD} monthly budget this month. Consider checking your Anthropic console balance directly.
            </p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Today's Requests", value: stats.today.requests, sub: `${stats.today.failed} failed` },
            { label: "Today's Est. Cost", value: fmt(stats.today.costCents), sub: "" },
            { label: "This Month", value: stats.month.requests, sub: `${stats.month.failed} failed` },
            { label: "Month Est. Cost", value: fmt(stats.month.costCents), sub: `of $${MONTHLY_BUDGET_USD} budget` },
          ].map(card => (
            <div key={card.label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px" }}>
              <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>{card.label}</p>
              <p style={{ fontSize: 22, fontWeight: 800 }}>{card.value}</p>
              {card.sub && <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{card.sub}</p>}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px" }}>
            <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Total Document Explanations</p>
            <p style={{ fontSize: 22, fontWeight: 800 }}>{stats.totals.explanations}</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px" }}>
            <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Total Scam Checks</p>
            <p style={{ fontSize: 22, fontWeight: 800 }}>{stats.totals.phishingChecks}</p>
          </div>
        </div>

        {stats.recentFailures.length > 0 && (
          <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px", marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Recent Failed Requests</p>
            {stats.recentFailures.map((f, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < stats.recentFailures.length - 1 ? "1px solid #F3F4F6" : "none", fontSize: 12 }}>
                <span style={{ fontWeight: 600, color: "#B91C1C" }}>{f.endpoint}</span>
                {" — "}
                <span style={{ color: "#6B7280" }}>{f.errorMessage ?? "Unknown error"}</span>
                <span style={{ color: "#9CA3AF", marginLeft: 8 }}>{new Date(f.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "16px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Recent Requests</p>
          {stats.recentRequests.map((r, i) => (
            <div key={i} style={{ padding: "6px 0", borderBottom: i < stats.recentRequests.length - 1 ? "1px solid #F3F4F6" : "none", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
              <span>
                <span style={{ color: r.success ? "#15803D" : "#B91C1C", fontWeight: 700 }}>{r.success ? "✓" : "✕"}</span>
                {" "}{r.endpoint}
              </span>
              <span style={{ color: "#6B7280" }}>{fmt(r.costCents)}</span>
              <span style={{ color: "#9CA3AF" }}>{new Date(r.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
