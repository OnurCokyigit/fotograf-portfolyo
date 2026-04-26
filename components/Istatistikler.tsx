"use client";

import { useEffect, useRef, useState } from "react";

interface IstatistikItem {
  sayi: number;
  suffix: string;
  etiket: string;
  ikon: string;
}

function SayacAnimasyonu({ hedef, suffix }: { hedef: number; suffix: string }) {
  const [sayi, setSayi] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const basladi = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !basladi.current) {
        basladi.current = true;
        let baslangic = 0;
        const adim = hedef / 60;
        const interval = setInterval(() => {
          baslangic += adim;
          if (baslangic >= hedef) { setSayi(hedef); clearInterval(interval); }
          else setSayi(Math.floor(baslangic));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hedef]);

  return <span ref={ref}>{sayi}{suffix}</span>;
}

export default function Istatistikler() {
  const [istatistikler, setIstatistikler] = useState<IstatistikItem[]>([
    { sayi: 500, suffix: "+", etiket: "Çekilen Fotoğraf", ikon: "📷" },
    { sayi: 50, suffix: "+", etiket: "Tamamlanan Proje", ikon: "🏆" },
    { sayi: 20, suffix: "+", etiket: "Çalışılan Takım", ikon: "🏀" },
    { sayi: 3, suffix: "+", etiket: "Yıllık Deneyim", ikon: "⭐" },
  ]);

  useEffect(() => {
    fetch("/api/icerik")
      .then((r) => r.json())
      .then((data) => { if (data.istatistikler) setIstatistikler(data.istatistikler); });
  }, []);

  return (
    <section id="istatistikler" style={{ width: "100%", padding: "8rem 0", background: "rgba(17,17,24,0.5)" }}>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#4ade80", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Rakamlarla
          </p>
          <h2 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            <span className="text-gradient">İstatistiklerim</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {istatistikler.map((item) => (
            <div
              key={item.etiket}
              className="glass"
              style={{ borderRadius: "1.5rem", padding: "2rem", textAlign: "center", transition: "transform 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{item.ikon}</div>
              <div className="text-gradient" style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
                <SayacAnimasyonu hedef={item.sayi} suffix={item.suffix} />
              </div>
              <div style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{item.etiket}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}