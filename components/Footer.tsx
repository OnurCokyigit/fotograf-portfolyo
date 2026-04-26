"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [icerik, setIcerik] = useState({
    sitAdi: "LENS & MOMENT",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  });

  useEffect(() => {
    fetch("/api/icerik")
      .then((r) => r.json())
      .then((data) => { if (data.footer) setIcerik(data.footer); });
  }, []);

  const sosyaller = [
    { label: "Instagram", href: icerik.instagram },
    { label: "Twitter", href: icerik.twitter },
    { label: "LinkedIn", href: icerik.linkedin },
  ];

  return (
    <footer style={{ width: "100%", padding: "3rem 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 3rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <div className="text-gradient" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          {icerik.sitAdi}
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>© 2025 Tüm hakları saklıdır.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {sosyaller.map((s) => (
            <span
                key={s.label}
                onClick={() => { if (s.href !== "#") window.open(s.href, "_blank"); }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                style={{ color: "#6b7280", fontSize: "0.875rem", cursor: "pointer" }}
            >
                {s.label}
            </span>
            ))}
        </div>
      </div>
    </footer>
  );
}