"use client";

import { useEffect, useState } from "react";

interface HeroIcerik {
  unvan: string;
  baslik: string;
  baslikGradient: string;
  aciklama: string;
  istatistikler: { sayi: string; etiket: string }[];
}

export default function Hero() {
  const [icerik, setIcerik] = useState<HeroIcerik>({
    unvan: "Spor Fotoğrafçısı",
    baslik: "Anı Yakala,",
    baslikGradient: "Hikayeyi Anlat",
    aciklama: "Voleybol ve basketbol sahalarındaki en güçlü anları fotoğraflıyorum.",
    istatistikler: [
      { sayi: "500+", etiket: "Fotoğraf" },
      { sayi: "50+", etiket: "Proje" },
      { sayi: "20+", etiket: "Takım" },
    ],
  });

  useEffect(() => {
    fetch("/api/icerik")
      .then((r) => r.json())
      .then((data) => { if (data.hero) setIcerik(data.hero); });
  }, []);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0a0a0f, #111118, #0a0a0f)" }} />
        <div style={{ position: "absolute", top: "25%", left: "25%", width: "24rem", height: "24rem", background: "rgba(22,163,74,0.15)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "25%", right: "25%", width: "24rem", height: "24rem", background: "rgba(37,99,235,0.15)", borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem" }}>
        <p style={{ color: "#4ade80", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
          {icerik.unvan}
        </p>

        <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: "bold", marginBottom: "1.5rem", lineHeight: 1.1 }}>
          {icerik.baslik}<br />
          <span className="text-gradient">{icerik.baslikGradient}</span>
        </h1>

        <p style={{ color: "#9ca3af", fontSize: "1.125rem", maxWidth: "40rem", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          {icerik.aciklama}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "4rem" }}>
          <button
            onClick={() => document.querySelector("#galeri")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "1rem 2rem", borderRadius: "9999px", background: "#16a34a", color: "white", fontWeight: 500, border: "none", cursor: "pointer", fontSize: "1rem" }}
          >
            Çalışmalarımı Gör
          </button>
          <button
            onClick={() => document.querySelector("#iletisim")?.scrollIntoView({ behavior: "smooth" })}
            style={{ padding: "1rem 2rem", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontWeight: 500, cursor: "pointer", fontSize: "1rem" }}
          >
            İletişime Geç
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
          {icerik.istatistikler.map((item) => (
            <div key={item.etiket} style={{ textAlign: "center" }}>
              <div className="text-gradient" style={{ fontSize: "2rem", fontWeight: "bold" }}>{item.sayi}</div>
              <div style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.25rem" }}>{item.etiket}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}>
        <div style={{ width: "2px", height: "3rem", background: "linear-gradient(to bottom, #4ade80, transparent)", margin: "0 auto" }} />
      </div>
    </section>
  );
}