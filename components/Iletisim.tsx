"use client";

import { useState } from "react";

export default function Iletisim() {
  const [form, setForm] = useState({ ad: "", email: "", konu: "", mesaj: "" });
  const [durum, setDurum] = useState<"bos" | "gonderiliyor" | "basarili" | "hata">("bos");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDurum("gonderiliyor");
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setDurum("basarili"); setForm({ ad: "", email: "", konu: "", mesaj: "" }); }
      else setDurum("hata");
    } catch { setDurum("hata"); }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    color: "white",
    fontSize: "1rem",
    outline: "none",
  };

  return (
    <section id="iletisim" style={{ width: "100%", padding: "8rem 0" }}>
      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#4ade80", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
            İletişim
          </p>
          <h2 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
            <span className="text-gradient">Birlikte Çalışalım</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "1.125rem" }}>
            Takımınız veya etkinliğiniz için fotoğraf çekimi hakkında benimle iletişime geçin.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
          {[
            { ikon: "📧", baslik: "E-posta", deger: "fotograf@email.com" },
            { ikon: "📱", baslik: "Telefon", deger: "+90 555 000 0000" },
            { ikon: "📍", baslik: "Konum", deger: "Türkiye" },
          ].map((item) => (
            <div key={item.baslik} className="glass" style={{ borderRadius: "1rem", padding: "1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.ikon}</div>
              <div style={{ color: "white", fontWeight: 500, marginBottom: "0.25rem" }}>{item.baslik}</div>
              <div style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{item.deger}</div>
            </div>
          ))}
        </div>

        <div className="glass" style={{ borderRadius: "1.5rem", padding: "2rem" }}>
          {durum === "basarili" ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Mesajınız İletildi!</h3>
              <p style={{ color: "#9ca3af" }}>En kısa sürede size dönüş yapacağım.</p>
              <button onClick={() => setDurum("bos")} style={{ marginTop: "1.5rem", padding: "0.5rem 1.5rem", borderRadius: "9999px", background: "#16a34a", color: "white", border: "none", cursor: "pointer" }}>
                Yeni Mesaj
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ color: "#9ca3af", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>Adınız</label>
                  <input type="text" required value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} style={inputStyle} placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label style={{ color: "#9ca3af", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>E-posta</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="email@example.com" />
                </div>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>Konu</label>
                <input type="text" required value={form.konu} onChange={(e) => setForm({ ...form, konu: e.target.value })} style={inputStyle} placeholder="Fotoğraf çekimi hakkında..." />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>Mesajınız</label>
                <textarea required rows={5} value={form.mesaj} onChange={(e) => setForm({ ...form, mesaj: e.target.value })} style={{ ...inputStyle, resize: "none" }} placeholder="Etkinliğiniz ve ihtiyaçlarınız hakkında bilgi verin..." />
              </div>
              {durum === "hata" && <p style={{ color: "#f87171", fontSize: "0.875rem" }}>Bir hata oluştu. Lütfen tekrar deneyin.</p>}
              <button type="submit" disabled={durum === "gonderiliyor"} style={{ width: "100%", padding: "1rem", borderRadius: "0.75rem", background: "#16a34a", color: "white", fontWeight: 500, border: "none", cursor: "pointer", fontSize: "1rem" }}>
                {durum === "gonderiliyor" ? "Gönderiliyor..." : "Mesaj Gönder"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}