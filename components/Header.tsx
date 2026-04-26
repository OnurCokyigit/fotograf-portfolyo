"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "Ben Kimim", href: "#hakkinda" },
  { label: "Çalışmalarım", href: "#galeri" },
  { label: "İstatistikler", href: "#istatistikler" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.7)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      transition: "all 0.3s",
    }}>
      <div style={{
        width: "100%", maxWidth: "1200px", margin: "0 auto",
        padding: "0 3rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "72px",
      }}>
        {/* Sol: Ad Soyad */}
        <button
        onClick={() => handleNav("#hero")}
        style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.2rem", fontWeight: "700", letterSpacing: "0.02em",
            backgroundImage: "linear-gradient(135deg, #22c55e, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        }}
        >
          Göktuğ Görgülü
        </button>

        {/* Orta + Sağ: Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "0.6rem",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#d1d5db",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.color = "#d1d5db";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#iletisim")}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: "0.6rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "white",
              background: "linear-gradient(135deg, #16a34a, #2563eb)",
              border: "none",
              cursor: "pointer",
              marginLeft: "0.5rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            İletişime Geç
          </button>
        </nav>

        {/* Mobil hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            flexDirection: "column", gap: "5px",
            background: "none", border: "none", cursor: "pointer", padding: "0.5rem",
          }}
          className="mobile-menu-btn"
        >
          <div style={{ width: "24px", height: "2px", background: "white", borderRadius: "2px" }} />
          <div style={{ width: "24px", height: "2px", background: "white", borderRadius: "2px" }} />
          <div style={{ width: "24px", height: "2px", background: "white", borderRadius: "2px" }} />
        </button>
      </div>

      {/* Mobil menü */}
      {menuOpen && (
        <div style={{
          background: "rgba(10,10,15,0.98)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1rem 2rem",
        }}>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.875rem 1rem", marginBottom: "0.5rem",
                borderRadius: "0.6rem",
                fontSize: "1rem", fontWeight: 500, color: "#d1d5db",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}