"use client";

import { useState } from "react";

const kategoriler = ["Tümü", "Voleybol", "Basketbol", "Portre", "Aksiyon"];

interface Fotograf {
  id: number;
  baslik: string;
  kategori: string;
  aciklama: string;
}

const ornekFotograflar: Fotograf[] = [
  { id: 1, baslik: "Smaç Anı", kategori: "Voleybol", aciklama: "Voleybol maçından güçlü bir smaç anı" },
  { id: 2, baslik: "Basketbol Şutu", kategori: "Basketbol", aciklama: "Üç sayılık atış anı" },
  { id: 3, baslik: "Sporcu Portresi", kategori: "Portre", aciklama: "Maç öncesi konsantre bir sporcu" },
  { id: 4, baslik: "Blok", kategori: "Voleybol", aciklama: "Mükemmel bir blok anı" },
  { id: 5, baslik: "Hava Topu", kategori: "Basketbol", aciklama: "Havada kapışan iki sporcu" },
  { id: 6, baslik: "Aksiyon", kategori: "Aksiyon", aciklama: "Sahadan dinamik bir an" },
];

export default function Galeri() {
  const [aktifKategori, setAktifKategori] = useState("Tümü");
  const [secilenFoto, setSecilenFoto] = useState<Fotograf | null>(null);

  const filtrelenmis = aktifKategori === "Tümü"
    ? ornekFotograflar
    : ornekFotograflar.filter((f) => f.kategori === aktifKategori);

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
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                background: aktifKategori === kat ? "#16a34a" : "rgba(255,255,255,0.05)",
                color: aktifKategori === kat ? "white" : "#9ca3af",
                transition: "all 0.2s",
              }}
            >
              {kat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {filtrelenmis.map((foto) => (
            <div
              key={foto.id}
              onClick={() => setSecilenFoto(foto)}
              style={{
                aspectRatio: "1",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, rgba(22,163,74,0.2), rgba(37,99,235,0.2))",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-end",
                padding: "1.5rem",
                transition: "transform 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -70%)", fontSize: "3rem" }}>📸</div>
              <div>
                <p style={{ color: "white", fontWeight: 600 }}>{foto.baslik}</p>
                <p style={{ color: "#4ade80", fontSize: "0.875rem" }}>{foto.kategori}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {secilenFoto && (
        <div
          onClick={() => setSecilenFoto(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{ borderRadius: "1.5rem", padding: "2rem", maxWidth: "32rem", width: "100%", textAlign: "center" }}
          >
            <div style={{ aspectRatio: "1", borderRadius: "1rem", background: "linear-gradient(135deg, rgba(22,163,74,0.3), rgba(37,99,235,0.3))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", fontSize: "4rem" }}>
              📸
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