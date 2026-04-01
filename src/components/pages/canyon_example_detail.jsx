"use client";
import Link from "next/link";

const CRIMSON = "#FF4444";
const CYAN = "#8BE9FD";
const GREEN = "#50FA7B";

const FUNCTION_COLORS = { Operations: "#FFB464", Finance: "#64B4FF", Sales: "#E078F0", "Customer Success": "#50FA7B", People: "#E078F0", "Data & IT": "#8BE9FD", Government: "#FFB464" };

const EXAMPLES = {
  "defect-monitor": { name: "Real-time defect rate monitor", fn: "Operations", sources: ["SAP HANA", "IoT sensors", "MES"], outcome: "Replaced weeks of manual reconciliation across 12 factories", customer: "Global manufacturer", mock: "line", color: "#FF6B6B", values: [3.2, 2.8, 3.5, 2.1, 1.8, 2.4, 1.9], detail: "A shift lead described the tool in natural language. Canyon identified SAP HANA and IoT sensor feeds as data sources, applied the certified defect rate definition, and scoped access to the lead's plant. Deployed to the plant's AWS environment, SSO-authenticated, in under 10 minutes.", layers: ["Data Layer", "Agent Orchestration", "Deployment"], metrics: [{ label: "Defect Rate", value: "1.9%", trend: "down" }, { label: "Lines Monitored", value: "12", trend: "neutral" }, { label: "Alert Threshold", value: "3.0%", trend: "neutral" }] },
  "shift-planner": { name: "Shift planning & capacity tool", fn: "Operations", sources: ["SAP HANA", "BambooHR", "MES"], outcome: "31% less overtime vs manual planning", mock: "grid", color: "#FFB464", values: [1,1,0,1,1,0,0, 1,0,1,1,1,0,0, 1,1,1,0,1,1,0], detail: "Operations manager needed to match headcount to production targets weekly. Canyon pulls from HR system for availability, MES for production schedule, and applies labor compliance rules per region.", layers: ["Data Layer", "Agent Orchestration", "Deployment"], metrics: [{ label: "Overtime Reduction", value: "31%", trend: "down" }, { label: "Shifts Planned", value: "84/wk", trend: "neutral" }, { label: "Coverage", value: "98.2%", trend: "up" }] },
  "partner-onboarding": { name: "Partner onboarding tracker", fn: "Operations", sources: ["Salesforce", "DocuSign", "SAP"], outcome: "Onboarding time from 23 days to 8 days", mock: "bar", color: CYAN, values: [40, 28, 35, 22, 15, 8], detail: "Partner ops team managed onboarding across 3 countries with different compliance requirements. Canyon maps Salesforce for partner data, DocuSign for document status, and applies country-specific checklist rules.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Avg Days", value: "8", trend: "down" }, { label: "Active Partners", value: "142", trend: "up" }, { label: "Completion Rate", value: "96%", trend: "up" }] },
  "sla-monitor": { name: "Delivery SLA monitor", fn: "Operations", sources: ["Fleet API", "Salesforce"], mock: "gauge", color: GREEN, values: [97.8], detail: "Carrier ops manager needs real-time SLA compliance across carriers and regions. Canyon connects to fleet telemetry API and Salesforce contracts, applies certified SLA definitions.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "SLA Compliance", value: "97.8%", trend: "up" }, { label: "Carriers", value: "24", trend: "neutral" }, { label: "Regions", value: "6", trend: "neutral" }] },
  "maintenance-scheduler": { name: "Preventive maintenance scheduler", fn: "Operations", sources: ["SAP PM", "IoT data"], mock: "grid", color: CRIMSON, values: [0,1,0,0,1,0,0, 0,0,1,0,0,0,1, 1,0,0,1,0,0,0], detail: "Maintenance lead needed to schedule preventive work based on IoT sensor predictions rather than fixed intervals.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Predicted Failures", value: "7", trend: "neutral" }, { label: "Downtime Avoided", value: "18hrs", trend: "down" }, { label: "Assets Tracked", value: "340", trend: "neutral" }] },
  "board-pnl": { name: "Board P&L report generator", fn: "Finance", sources: ["SAP", "Snowflake", "Legacy ERP"], outcome: "3-day reconciliation cycle eliminated", mock: "bar", color: "#64B4FF", values: [82, 91, 78, 95, 88, 102], detail: "FP&A lead needed a single board-ready P&L that reconciles across 3 ERPs and a data warehouse. Canyon's semantic layer ensures revenue, COGS, and margin use one certified definition each.", layers: ["Data Layer", "Agent Orchestration"], metrics: [{ label: "Revenue (Q4)", value: "$102M", trend: "up" }, { label: "Sources Reconciled", value: "3", trend: "neutral" }, { label: "Report Time", value: "< 1min", trend: "down" }] },
  "budget-variance": { name: "Budget variance monitor", fn: "Finance", sources: ["ERP", "Budget DB"], mock: "bar", color: "#FF6B6B", values: [5, -3, 8, -2, 12, -1], detail: "Finance controller needed real-time variance visibility instead of monthly reports.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Cost Centers", value: "24", trend: "neutral" }, { label: "Over Budget", value: "3", trend: "down" }, { label: "Max Variance", value: "+12%", trend: "neutral" }] },
  "metric-reconciliation": { name: "Cross-system metric reconciliation", fn: "Finance", sources: ["Multiple sources", "Semantic layer"], mock: "grid", color: GREEN, values: [1,1,1,0,1,1,0, 1,0,1,1,1,1,0, 1,1,0,1,1,1,1], detail: "Data analyst needed to find where different systems define the same metric differently.", layers: ["Data Layer"], metrics: [{ label: "Metrics Audited", value: "47", trend: "neutral" }, { label: "Conflicts Found", value: "8", trend: "neutral" }, { label: "Resolved", value: "100%", trend: "up" }] },
  "pipeline-health": { name: "Pipeline health dashboard", fn: "Sales", sources: ["Salesforce", "Snowflake"], mock: "bar", color: "#E078F0", values: [72, 85, 64, 91, 78, 88], detail: "Sales ops needed pipeline visibility that updates in real time, not weekly CRM exports.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Pipeline Coverage", value: "3.2x", trend: "up" }, { label: "Avg Deal Velocity", value: "18 days", trend: "down" }, { label: "Reps Tracked", value: "48", trend: "neutral" }] },
  "partner-incentive": { name: "Partner incentive calculator", fn: "Sales", sources: ["Operations DB", "Contracts"], mock: "line", color: "#FFB464", values: [4.2, 4.5, 4.1, 4.7, 4.3, 4.6, 4.8], detail: "Partner manager needed automated incentive calculations instead of quarterly spreadsheet exercises.", layers: ["Data Layer", "Agent Orchestration", "Deployment"], metrics: [{ label: "Partners", value: "38", trend: "neutral" }, { label: "Avg Score", value: "4.6", trend: "up" }, { label: "Payout Accuracy", value: "100%", trend: "neutral" }] },
  "campaign-roi": { name: "Campaign ROI tracker", fn: "Sales", sources: ["Marketing DB", "Revenue DB"], mock: "line", color: GREEN, values: [1.8, 2.1, 1.5, 2.4, 2.8, 3.1, 2.9], detail: "Commercial team needed to see ROI by channel in real time.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Avg ROI", value: "2.9x", trend: "up" }, { label: "Channels", value: "6", trend: "neutral" }, { label: "Spend Tracked", value: "$1.2M", trend: "neutral" }] },
  "account-health": { name: "Account health scorecard", fn: "Customer Success", sources: ["CRM", "Product usage", "Support DB"], mock: "gauge", color: GREEN, values: [82.5], detail: "CS lead needed a single health score per account instead of checking 3 systems.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Health Score", value: "82.5%", trend: "up" }, { label: "Accounts", value: "215", trend: "neutral" }, { label: "At Risk", value: "12", trend: "down" }] },
  "churn-risk": { name: "Churn risk monitor", fn: "Customer Success", sources: ["CRM", "Usage DB", "NPS"], mock: "line", color: "#FF6B6B", values: [4, 6, 5, 8, 12, 15, 18], detail: "CS ops needed to detect churn risk before customers self-report.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "At Risk", value: "18", trend: "up" }, { label: "Saved (Q4)", value: "7", trend: "up" }, { label: "Detection Lead", value: "42 days", trend: "up" }] },
  "headcount-tracker": { name: "Headcount vs plan tracker", fn: "People", sources: ["HR system", "Finance DB"], mock: "line", color: "#E078F0", values: [180, 182, 185, 183, 190, 188, 192], detail: "People ops needed real-time headcount vs approved plan visibility.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Headcount", value: "192", trend: "up" }, { label: "vs Plan", value: "+2", trend: "neutral" }, { label: "Open Roles", value: "14", trend: "neutral" }] },
  "attrition-monitor": { name: "Attrition monitor", fn: "People", sources: ["HR system", "Exit data"], mock: "bar", color: "#FF6B6B", values: [8, 12, 10, 15, 11, 14], detail: "People analytics needed to surface attrition patterns before quarterly reports.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Attrition Rate", value: "14%", trend: "up" }, { label: "Highest Dept", value: "Engineering", trend: "neutral" }, { label: "Avg Tenure", value: "2.1yr", trend: "down" }] },
  "app-inventory": { name: "Central app inventory", fn: "Data & IT", sources: ["Canyon audit log"], mock: "grid", color: CYAN, values: [1,1,0,1,1,1,0, 1,0,1,1,1,0,1, 1,1,1,0,1,1,0], detail: "IT ops needed a single pane of glass for everything deployed through Canyon.", layers: ["Data Layer"], metrics: [{ label: "Active Apps", value: "47", trend: "up" }, { label: "Builders", value: "23", trend: "up" }, { label: "Data Sources", value: "12", trend: "neutral" }] },
  "shadow-ai": { name: "Shadow AI elimination", fn: "Data & IT", sources: ["Canyon logs", "Network data"], mock: "bar", color: CRIMSON, values: [45, 38, 28, 22, 15, 8], detail: "CISO needed visibility into ungoverned AI tool usage on enterprise data.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "Ungoverned Tools", value: "8", trend: "down" }, { label: "Migrated", value: "37", trend: "up" }, { label: "Risk Reduction", value: "82%", trend: "up" }] },
  "service-delivery": { name: "Service delivery dashboard", fn: "Government", sources: ["Case management", "Operational DB"], mock: "bar", color: "#FFB464", values: [85, 78, 92, 81, 88, 95], detail: "Service delivery lead needed real-time visibility for ministerial reporting.", layers: ["Data Layer", "Deployment"], metrics: [{ label: "SLA Met", value: "95%", trend: "up" }, { label: "Avg Resolution", value: "3.2 days", trend: "down" }, { label: "Regions", value: "6", trend: "neutral" }] },
  "audit-viewer": { name: "Data access audit viewer", fn: "Government", sources: ["Canyon audit log", "Identity system"], mock: "line", color: "#FFB464", values: [320, 345, 310, 368, 355, 378, 390], detail: "Data protection officer needed a queryable audit trail for FOI requests.", layers: ["Data Layer"], metrics: [{ label: "Events/Day", value: "390", trend: "up" }, { label: "FOI Requests", value: "12", trend: "neutral" }, { label: "Compliance", value: "100%", trend: "neutral" }] },
};

function MockChart({ mock, color, values }) {
  const h = 80, w = 200;
  if (mock === "line") {
    const max = Math.max(...values), min = Math.min(...values), range = max - min || 1;
    const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`).join(" ");
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" /><polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity="0.08" /></svg>);
  }
  if (mock === "bar") {
    const max = Math.max(...values.map(Math.abs)), barW = w / values.length - 4;
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>{values.map((v, i) => (<rect key={i} x={i * (w / values.length) + 2} y={h - (Math.abs(v) / max) * (h - 10)} width={barW} height={(Math.abs(v) / max) * (h - 10)} rx="3" fill={v < 0 ? "#FF6B6B" : color} opacity="0.5" />))}</svg>);
  }
  if (mock === "gauge") {
    const pct = values[0] / 100;
    return (<svg viewBox="0 0 100 60" style={{ width: "100%", height: 70 }}><path d="M15 55 A35 35 0 0 1 85 55" fill="none" stroke="rgba(240,224,219,0.08)" strokeWidth="6" strokeLinecap="round" /><path d={`M15 55 A35 35 0 0 1 ${15 + 70 * pct} ${55 - Math.sin(Math.PI * pct) * 35}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.7" /><text x="50" y="50" textAnchor="middle" fill="rgba(240,224,219,0.7)" fontSize="14" fontWeight="700" fontFamily="Outfit">{values[0]}%</text></svg>);
  }
  if (mock === "grid") {
    const cols = 7;
    return (<svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }}>{values.map((v, i) => (<rect key={i} x={(i % cols) * 28 + 4} y={Math.floor(i / cols) * 24 + 4} width="22" height="18" rx="3" fill={v ? color : "rgba(240,224,219,0.05)"} opacity={v ? 0.5 : 1} />))}</svg>);
  }
  return null;
}

export default function ExampleDetail({ id }) {
  const ex = EXAMPLES[id];

  if (!ex) {
    return (
      <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.3 }}>?</div>
          <div style={{ fontSize: 18, color: "rgba(240,224,219,0.5)" }}>Example not found.</div>
          <Link href="/examples" style={{ display: "inline-block", marginTop: 16, color: CYAN, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Back to examples</Link>
        </div>
      </div>
    );
  }

  const accentColor = FUNCTION_COLORS[ex.fn] || "#DDBAB1";

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:0px}
        @media(max-width:768px){.grid-2{grid-template-columns:1fr !important}.grid-3{grid-template-columns:1fr 1fr !important}}
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 20, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(66,59,87,0.2)", background: "rgba(13,13,15,0.85)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}><img src="/logo.png" alt="Canyon" style={{ height: 20 }} /></Link>
        <Link href="/examples" style={{ fontSize: 13, color: "rgba(240,224,219,0.4)", textDecoration: "none" }}>Back to examples</Link>
        <Link href="#" style={{ background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", color: "#F0E0DB", padding: "7px 18px", borderRadius: 7, fontSize: 11, fontWeight: 600, textDecoration: "none" }}>Book a Demo</Link>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          <Link href="/examples" style={{ fontSize: 12, color: "rgba(240,224,219,0.35)", textDecoration: "none" }}>Examples</Link>
          <span style={{ fontSize: 10, color: "rgba(240,224,219,0.2)" }}>/</span>
          <span style={{ fontSize: 12, color: accentColor, fontWeight: 600 }}>{ex.fn}</span>
          <span style={{ fontSize: 10, color: "rgba(240,224,219,0.2)" }}>/</span>
          <span style={{ fontSize: 12, color: "rgba(240,224,219,0.5)" }}>{ex.name}</span>
        </div>

        <section style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 5, background: `${accentColor}12`, color: accentColor, marginBottom: 12, display: "inline-block" }}>{ex.fn}</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 24px" }}>{ex.name}</h1>

          <div style={{ background: "#0D0D0F", borderRadius: 14, border: "1px solid #2A1F1C", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "10px 14px", borderBottom: "1px solid rgba(42,31,28,0.3)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(240,224,219,0.1)" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(240,224,219,0.1)" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(240,224,219,0.1)" }} />
              <span style={{ marginLeft: 12, fontSize: 11, color: "rgba(240,224,219,0.2)", fontFamily: "'JetBrains Mono', monospace" }}>canyon.internal/{id}</span>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: 160, borderRight: "1px solid rgba(42,31,28,0.2)", padding: "16px 12px", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.5)", marginBottom: 12 }}>{ex.fn}</div>
                {["Overview", "Details", "History", "Settings"].map((item, i) => (
                  <div key={i} style={{ fontSize: 12, color: i === 0 ? accentColor : "rgba(240,224,219,0.25)", padding: "6px 8px", borderRadius: 5, background: i === 0 ? `${accentColor}10` : "transparent", marginBottom: 2 }}>{item}</div>
                ))}
              </div>
              <div style={{ flex: 1, padding: "20px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.85)", marginBottom: 4 }}>{ex.name}</div>
                <div style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>{ex.sources.join(" · ")}</div>
                <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {(ex.metrics || []).map((m, i) => {
                    const trendColor = m.trend === "up" ? GREEN : m.trend === "down" ? "#FF6B6B" : "rgba(240,224,219,0.3)";
                    const arrow = m.trend === "up" ? "↑" : m.trend === "down" ? "↓" : "–";
                    return (
                      <div key={i} style={{ background: "#0D0D0F", border: "1px solid #2A1F1C", borderRadius: 10, padding: "16px", textAlign: "center" }}>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "rgba(240,224,219,0.95)", marginBottom: 4 }}>{m.value}</div>
                        <div style={{ fontSize: 12, color: "rgba(240,224,219,0.35)" }}>{m.label} <span style={{ color: trendColor }}>{arrow}</span></div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ background: "rgba(54,50,72,0.1)", borderRadius: 10, padding: "12px 12px 0", border: "1px solid rgba(42,31,28,0.15)" }}>
                  <MockChart mock={ex.mock} color={ex.color} values={ex.values} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "rgba(240,224,219,0.85)", margin: "0 0 12px" }}>How it works</h2>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.5)", lineHeight: 1.7, margin: 0 }}>{ex.detail}</p>
        </section>

        <section className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Data Sources</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ex.sources.map(s => (<span key={s} style={{ fontSize: 13, padding: "6px 12px", borderRadius: 6, background: "#18181B", border: "1px solid #2A1F1C", color: CYAN, fontFamily: "'JetBrains Mono', monospace" }}>{s}</span>))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(240,224,219,0.35)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Canyon Layers Used</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ex.layers.map(l => (<span key={l} style={{ fontSize: 13, padding: "6px 12px", borderRadius: 6, background: "#18181B", border: "1px solid #2A1F1C", color: "rgba(240,224,219,0.6)" }}>{l}</span>))}
            </div>
          </div>
        </section>

        {ex.outcome && (
          <section style={{ marginBottom: 40 }}>
            <div style={{ padding: "20px 24px", background: "rgba(80,250,123,0.04)", border: "1px solid rgba(80,250,123,0.12)", borderRadius: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Outcome</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(240,224,219,0.85)" }}>{ex.outcome}</div>
              {ex.customer && <div style={{ fontSize: 14, color: "rgba(240,224,219,0.35)", marginTop: 4 }}>↳ {ex.customer}</div>}
            </div>
          </section>
        )}

        <section style={{ textAlign: "center", paddingBottom: 60 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "rgba(240,224,219,0.9)", marginBottom: 8 }}>This looks relevant?</div>
          <div style={{ fontSize: 15, color: "rgba(240,224,219,0.4)", marginBottom: 20 }}>30 minutes. We will show this on your data.</div>
          <Link href="#" style={{ display: "inline-block", background: `linear-gradient(135deg, ${CRIMSON}, #532E25)`, border: "none", borderRadius: 10, padding: "14px 28px", color: "#F0E0DB", fontSize: 15, fontWeight: 700, textDecoration: "none" }}>Book a Demo</Link>
        </section>
      </main>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.25)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.25)", textDecoration: "none" }}>Imprint</Link>
        </div>
      </footer>
    </div>
  );
}
