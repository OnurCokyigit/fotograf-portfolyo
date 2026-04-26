"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [aktifSekme, setAktifSekme] = useState<"fotograf" | "profil">("fotograf");

  const handleCikis = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      <header style={{
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", background: "linear-gradient(135deg, #22c55e, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Admin Paneli
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Göktuğ Görgülü Portfolyo</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={() => router.push("/")}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: "0.875rem" }}
          >
            Siteyi Gör
          </button>
          <button
            onClick={handleCikis}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: "0.875rem" }}
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { id: "fotograf", label: "📷 Fotoğraf Yönetimi" },
            { id: "profil", label: "👤 Profil Ayarları" },
          ].map((sekme) => (
            <button
              key={sekme.id}
              onClick={() => setAktifSekme(sekme.id as "fotograf" | "profil")}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
                background: aktifSekme === sekme.id ? "linear-gradient(135deg, #16a34a, #2563eb)" : "rgba(255,255,255,0.05)",
                color: aktifSekme === sekme.id ? "white" : "#9ca3af",
              }}
            >
              {sekme.label}
            </button>
          ))}
        </div>

        {aktifSekme === "fotograf" && <FotografYonetimi />}
        {aktifSekme === "profil" && <ProfilAyarlari />}
      </div>
    </div>
  );
}

function FotografYonetimi() {
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState("");

  const handleYukle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dosya = e.target.files?.[0];
    if (!dosya) return;

    setYukleniyor(true);
    setMesaj("");

    const formData = new FormData();
    formData.append("file", dosya);

    try {
      const res = await fetch("/api/admin/fotograf-yukle", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMesaj("✅ Fotoğraf başarıyla yüklendi!");
      } else {
        setMesaj("❌ Yükleme başarısız oldu.");
      }
    } catch {
      setMesaj("❌ Bir hata oluştu.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "2px dashed rgba(255,255,255,0.15)",
        borderRadius: "1.5rem",
        padding: "3rem",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📸</div>
        <h3 style={{ color: "white", fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Fotoğraf Yükle
        </h3>
        <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          JPG, PNG veya WebP formatında fotoğraf yükleyin
        </p>
        <label style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          borderRadius: "0.75rem",
          background: "linear-gradient(135deg, #16a34a, #2563eb)",
          color: "white",
          fontWeight: 500,
          cursor: "pointer",
          fontSize: "0.875rem",
        }}>
          {yukleniyor ? "Yükleniyor..." : "Fotoğraf Seç"}
          <input type="file" accept="image/*" onChange={handleYukle} style={{ display: "none" }} disabled={yukleniyor} />
        </label>
        {mesaj && (
          <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: mesaj.includes("✅") ? "#4ade80" : "#f87171" }}>
            {mesaj}
          </p>
        )}
      </div>
    </div>
  );
}

function ProfilAyarlari() {
  const [form, setForm] = useState({
    ad: "Göktuğ Görgülü",
    unvan: "Spor Fotoğrafçısı",
    biyografi: "Voleybol ve basketbol dünyasında yıllar içinde edindiğim deneyimle, sporcuların en güçlü anlarını ölümsüzleştiriyorum.",
    email: "fotograf@email.com",
    telefon: "+90 555 000 0000",
    instagram: "",
    twitter: "",
  });
  const [mesaj, setMesaj] = useState("");

  const handleKaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    setMesaj("✅ Profil bilgileri kaydedildi!");
    setTimeout(() => setMesaj(""), 3000);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    color: "white",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem" }}>
      <h3 style={{ color: "white", fontSize: "1.125rem", fontWeight: 600, marginBottom: "1.5rem" }}>Profil Bilgileri</h3>
      <form onSubmit={handleKaydet} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>Ad Soyad</label>
            <input value={form.ad} onChange={(e) => setForm({ ...form, ad: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>Ünvan</label>
            <input value={form.unvan} onChange={(e) => setForm({ ...form, unvan: e.target.value })} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>Biyografi</label>
          <textarea rows={4} value={form.biyografi} onChange={(e) => setForm({ ...form, biyografi: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>E-posta</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>Telefon</label>
            <input value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>Instagram</label>
            <input placeholder="@kullaniciadi" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.5rem" }}>Twitter</label>
            <input placeholder="@kullaniciadi" value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} style={inputStyle} />
          </div>
        </div>

        {mesaj && <p style={{ color: "#4ade80", fontSize: "0.875rem" }}>{mesaj}</p>}

        <button type="submit" style={{ padding: "0.875rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, #16a34a, #2563eb)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "1rem" }}>
          Kaydet
        </button>
      </form>
    </div>
  );
}