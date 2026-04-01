"use client";
import PageHeader from "@/components/PageHeader";
const CRIMSON = "#FF4444";

const EVENTS = [
  { date: "Apr 8-10, 2026", title: "PlatformCon 2026", location: "Virtual", type: "Conference", desc: "Canyon's Luca Galante hosts the world's largest platform engineering conference. 280,000+ community members.", cta: "Register free" },
  { date: "Apr 15, 2026", title: "Enterprise Vibe Coding: From Prompt to Production", location: "Webinar", type: "Webinar", desc: "Live demo: building a governed internal app from natural language in under 10 minutes. Q&A with Kaspar von Grunberg.", cta: "Reserve your spot" },
  { date: "May 6-8, 2026", title: "Data Council Europe", location: "Berlin", type: "Conference", desc: "Canyon on stage: 'The semantic layer AI actually needs.' Meet the team at booth E12.", cta: "Get tickets" },
  { date: "May 20, 2026", title: "Canyon for Manufacturing: Customer Panel", location: "Webinar", type: "Webinar", desc: "Cimpress Vistaprint and Fortescue share their experience deploying Canyon in production environments.", cta: "Register" },
  { date: "Jun 3, 2026", title: "AI in the Enterprise Roundtable", location: "Munich", type: "Meetup", desc: "Intimate dinner for CDOs and Heads of Data at European enterprises. 20 seats. By invitation.", cta: "Request an invite" },
];

export default function CanyonEvents() {
  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box}
        @media(max-width:768px){}
      `}</style>

      <PageHeader activeSection={"Resources"} />


      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
        <section style={{ paddingTop: 48, paddingBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.8, color: "rgba(240,224,219,0.97)", margin: "0 0 8px" }}>Events</h1>
          <p style={{ fontSize: 16, color: "rgba(240,224,219,0.45)", margin: "0 0 32px" }}>Conferences, webinars, and meetups. Come see Canyon in action.</p>
        </section>

        <section style={{ paddingBottom: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {EVENTS.map((ev, i) => (
              <div key={i} style={{ background: "#18181B", border: "1px solid #2A1F1C", borderRadius: 12, padding: "24px", display: "flex", gap: 20, alignItems: "flex-start", cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#532E25"} onMouseLeave={e => e.currentTarget.style.borderColor = "#2A1F1C"}>
                <div style={{ flexShrink: 0, width: 80, textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: CRIMSON }}>{ev.date.split(",")[0]}</div>
                  <div style={{ fontSize: 11, color: "rgba(240,224,219,0.35)" }}>{ev.date.split(",")[1]}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "rgba(240,224,219,0.95)" }}>{ev.title}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: ev.type === "Conference" ? "rgba(139,233,253,0.08)" : ev.type === "Webinar" ? "rgba(255,68,68,0.08)" : "rgba(80,250,123,0.08)", color: ev.type === "Conference" ? "#8BE9FD" : ev.type === "Webinar" ? CRIMSON : "#50FA7B" }}>{ev.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(240,224,219,0.35)", marginBottom: 6 }}>{ev.location}</div>
                  <div style={{ fontSize: 14, color: "rgba(240,224,219,0.5)", lineHeight: 1.6 }}>{ev.desc}</div>
                  <div style={{ marginTop: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: CRIMSON, cursor: "pointer" }}>{ev.cta} →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ padding: "40px 28px 24px", borderTop: "1px solid rgba(66,59,87,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1000, margin: "0 auto" }}>
        <span style={{ fontSize: 11, color: "rgba(240,224,219,0.3)" }}>© 2026 PlatCo Group</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: 11, color: "rgba(240,224,219,0.3)", textDecoration: "none" }}>Imprint</a>
        </div>
      </footer>
    </div>
  );
}
