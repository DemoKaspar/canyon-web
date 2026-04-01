"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({ children, activeSection }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F0E0DB", fontFamily: "'Outfit', sans-serif" }}>
      <Header activeSection={activeSection} />
      {children}
      <Footer />
    </div>
  );
}
