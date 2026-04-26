"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const kategoriler = ["Tümü", "Voleybol", "Basketbol", "Portre", "Aksiyon"];

interface Fotograf {
  id: string;
  url: string;
  baslik: string;
  kategori: string;
  aciklama: string;
}

export default function Galeri() {
  const [aktifKategori, setAktifKategori] = useState("Tümü");
  const [secilenFoto, setSecilenFoto] = useState<Fotograf | null>(null);
  const [fotograflar, setFotograflar] = useState<Fotograf[]>([]);

  useEffect(() => {
    fetch("/api/icerik")
      .then((r) => r.json())
      .then((data) => {
        if (data.fotograflar) setFotograflar(data.fotograflar);
      });
  }, []);

  const filtrelenmis = aktifKategori === "Tümü"
    ? fotograflar
    : fotograflar.filter((f) => f.kategori === aktifKategori);

  return (
    <section id="galeri" style={{ width: "100%", padding: "8rem 0" }}>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#4ade80", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Çalışmalarım
          </p>
          <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
            <span className="text-gradient">Fotoğraf Galerim</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "1.125rem" }}>Sahalardan derlediğim en özel anlar</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginBottom: "3rem" }}>
          {kategoriler.map((kat) => (
            <button
              key={kat}
              onClick={() => setAktifKategori(kat)}
              style={{
                padding: "0.5rem 1.5rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", border: "none",
                background: aktifKategori === kat ? "#16a34a" : "rgba(255,255,255,0.05)",
                color: aktifKategori === kat ? "white" : "#9ca3af",
              }}
            >
              {kat}
            </button>
          ))}
        </div>

        {filtrelenmis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📷</div>
            <p style={{ color: "#9ca3af", fontSize: "1.125rem" }}>
              {fotograflar.length === 0
                ? "Henüz fotoğraf yüklenmemiş. Admin panelinden fotoğraf ekleyebilirsiniz."
                : "Bu kategoride fotoğraf bulunmuyor."}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {filtrelenmis.map((foto) => (
              <div
                key={foto.id}
                onClick={() => setSecilenFoto(foto)}
                style={{
                  aspectRatio: "1", borderRadius: "1rem", overflow: "hidden",
                  cursor: "pointer", position: "relative", transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Image
                  src={foto.url}
                  alt={foto.baslik}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                  display: "flex", alignItems: "flex-end", padding: "1.5rem",
                }}>
                  <div>
                    <p style={{ color: "white", fontWeight: 600 }}>{foto.baslik}</p>
                    <p style={{ color: "#4ade80", fontSize: "0.875rem" }}>{foto.kategori}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {secilenFoto && (
        <div
          onClick={() => setSecilenFoto(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem", maxWidth: "600px", width: "100%" }}
          >
            <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "1rem", overflow: "hidden", marginBottom: "1.5rem" }}>
              <Image src={secilenFoto.url} alt={secilenFoto.baslik} fill style={{ objectFit: "cover" }} />
            </div>
            <h3 style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>{secilenFoto.baslik}</h3>
            <p style={{ color: "#4ade80", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{secilenFoto.kategori}</p>
            <p style={{ color: "#9ca3af" }}>{secilenFoto.aciklama}</p>
            <button
              onClick={() => setSecilenFoto(null)}
              style={{ marginTop: "1.5rem", padding: "0.5rem 1.5rem", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", color: "white", border: "none", cursor: "pointer" }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </section>
  );
}