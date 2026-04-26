"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [aktifSekme, setAktifSekme] = useState<"fotograf" | "icerik">("fotograf");

  const handleCikis = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "white" }}>
      <header style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", background: "linear-gradient(135deg, #22c55e, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Admin Paneli
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Göktuğ Görgülü Portfolyo</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button onClick={() => router.push("/")} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: "0.875rem" }}>
            Siteyi Gör
          </button>
          <button onClick={handleCikis} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: "0.875rem" }}>
            Çıkış Yap
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { id: "fotograf", label: "📷 Fotoğraf Yönetimi" },
            { id: "icerik", label: "✏️ İçerik Yönetimi" },
          ].map((sekme) => (
            <button
              key={sekme.id}
              onClick={() => setAktifSekme(sekme.id as "fotograf" | "icerik")}
              style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, background: aktifSekme === sekme.id ? "linear-gradient(135deg, #16a34a, #2563eb)" : "rgba(255,255,255,0.05)", color: aktifSekme === sekme.id ? "white" : "#9ca3af" }}
            >
              {sekme.label}
            </button>
          ))}
        </div>

        {aktifSekme === "fotograf" && <FotografYonetimi />}
        {aktifSekme === "icerik" && <IcerikYonetimi />}
      </div>
    </div>
  );
}

function FotografYonetimi() {
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [baslik, setBaslik] = useState("");
  const [kategori, setKategori] = useState("Voleybol");
  const [aciklama, setAciklama] = useState("");
  const [fotograflar, setFotograflar] = useState<{id: string; url: string; baslik: string; kategori: string; aciklama: string}[]>([]);
  const [siliniyor, setSiliniyor] = useState<string | null>(null);
  const [duzenle, setDuzenle] = useState<string | null>(null);

  const kategoriler = ["Voleybol", "Basketbol", "Portre", "Aksiyon"];

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "0.5rem",
    padding: "0.6rem 0.875rem",
    color: "white",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  useEffect(() => {
    fetch("/api/icerik")
      .then((r) => r.json())
      .then((data) => { if (data.fotograflar) setFotograflar(data.fotograflar); });
  }, []);

  const handleYukle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    setYukleniyor(true);
    setMesaj("");

    const formData = new FormData();
    formData.append("file", dosya);
    formData.append("baslik", baslik || dosya.name);
    formData.append("kategori", kategori);
    formData.append("aciklama", aciklama);

    try {
      const res = await fetch("/api/admin/fotograf-yukle", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setMesaj("✅ Fotoğraf başarıyla yüklendi!");
        setBaslik("");
        setAciklama("");
        setFotograflar((prev) => [...prev, data.fotograf]);
      } else {
        setMesaj("❌ Yükleme başarısız oldu.");
      }
    } catch {
      setMesaj("❌ Bir hata oluştu.");
    } finally {
      setYukleniyor(false);
    }
  };

  const handleSil = async (foto: {id: string; publicId?: string; baslik: string}) => {
    if (!confirm(`"${foto.baslik}" fotoğrafını silmek istediğinize emin misiniz?`)) return;
    setSiliniyor(foto.id);
    try {
      const res = await fetch("/api/admin/fotograf-sil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fotografId: foto.id, publicId: foto.publicId }),
      });
      if (res.ok) {
        setFotograflar((prev) => prev.filter((f) => f.id !== foto.id));
        setMesaj("✅ Fotoğraf silindi!");
      } else {
        setMesaj("❌ Silme başarısız.");
      }
    } catch {
      setMesaj("❌ Bir hata oluştu.");
    } finally {
      setSiliniyor(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem" }}>
        <h3 style={{ color: "white", fontWeight: 600, marginBottom: "1.5rem" }}>Yeni Fotoğraf Yükle</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.4rem" }}>Başlık</label>
            <input style={inputStyle} value={baslik} onChange={(e) => setBaslik(e.target.value)} placeholder="Fotoğraf başlığı..." />
          </div>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.4rem" }}>Kategori</label>
            <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {kategoriler.map((k) => (
                <option key={k} value={k} style={{ background: "#1a1a24" }}>{k}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.4rem" }}>Açıklama</label>
            <input style={inputStyle} value={aciklama} onChange={(e) => setAciklama(e.target.value)} placeholder="Fotoğraf açıklaması..." />
          </div>
        </div>
        <div style={{ border: "2px dashed rgba(255,255,255,0.15)", borderRadius: "1rem", padding: "2rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📸</div>
          <label style={{ display: "inline-block", padding: "0.75rem 2rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, #16a34a, #2563eb)", color: "white", fontWeight: 500, cursor: "pointer", fontSize: "0.875rem" }}>
            {yukleniyor ? "Yükleniyor..." : "Fotoğraf Seç"}
            <input type="file" accept="image/*" onChange={handleYukle} style={{ display: "none" }} disabled={yukleniyor} />
          </label>
        </div>
        {mesaj && <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: mesaj.includes("✅") ? "#4ade80" : "#f87171", textAlign: "center" }}>{mesaj}</p>}
      </div>

      {fotograflar.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem" }}>
          <h3 style={{ color: "white", fontWeight: 600, marginBottom: "1.5rem" }}>Yüklenen Fotoğraflar ({fotograflar.length})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            {fotograflar.map((foto) => (
              <div key={foto.id} style={{ position: "relative", borderRadius: "0.75rem", overflow: "hidden", aspectRatio: "1", background: "rgba(255,255,255,0.05)" }}>
                <img src={foto.url} alt={foto.baslik} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0.75rem" }}>
                  <p style={{ color: "white", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.25rem" }}>{foto.baslik}</p>
                  <p style={{ color: "#4ade80", fontSize: "0.7rem", marginBottom: "0.5rem" }}>{foto.kategori}</p>
                  <button
                    onClick={() => handleSil(foto as {id: string; publicId?: string; baslik: string})}
                    disabled={siliniyor === foto.id}
                    style={{ padding: "0.3rem 0.75rem", borderRadius: "0.4rem", background: "rgba(239,68,68,0.8)", color: "white", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    {siliniyor === foto.id ? "Siliniyor..." : "Sil"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IcerikYonetimi() {
  const [icerik, setIcerik] = useState<any>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [aktifBolum, setAktifBolum] = useState("hero");

  useEffect(() => {
    fetch("/api/icerik")
      .then((r) => r.json())
      .then((data) => { setIcerik(data); setYukleniyor(false); });
  }, []);

  const handleKaydet = async () => {
    setKaydediliyor(true);
    try {
      const res = await fetch("/api/admin/icerik-guncelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(icerik),
      });
      if (res.ok) setMesaj("✅ İçerik kaydedildi!");
      else setMesaj("❌ Kaydetme başarısız.");
    } catch { setMesaj("❌ Bir hata oluştu."); }
    finally { setKaydediliyor(false); setTimeout(() => setMesaj(""), 3000); }
  };

  if (yukleniyor) return <div style={{ textAlign: "center", color: "#9ca3af", padding: "3rem" }}>Yükleniyor...</div>;

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", padding: "0.6rem 0.875rem", color: "white", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { color: "#9ca3af", fontSize: "0.75rem", display: "block", marginBottom: "0.4rem" };

  const bolumler = ["hero", "hakkinda", "istatistikler", "iletisim", "footer"];

  return (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      <div style={{ width: "160px", flexShrink: 0 }}>
        {bolumler.map((b) => (
          <button key={b} onClick={() => setAktifBolum(b)} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.6rem 1rem", marginBottom: "0.5rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, background: aktifBolum === b ? "rgba(22,163,74,0.2)" : "rgba(255,255,255,0.03)", color: aktifBolum === b ? "#4ade80" : "#9ca3af" }}>
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: "1rem", padding: "1.5rem" }}>
        {aktifBolum === "hero" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 600, marginBottom: "0.5rem" }}>Hero Bölümü</h3>
            <div><label style={labelStyle}>Ünvan</label><input style={inputStyle} value={icerik.hero.unvan} onChange={(e) => setIcerik({ ...icerik, hero: { ...icerik.hero, unvan: e.target.value } })} /></div>
            <div><label style={labelStyle}>Başlık</label><input style={inputStyle} value={icerik.hero.baslik} onChange={(e) => setIcerik({ ...icerik, hero: { ...icerik.hero, baslik: e.target.value } })} /></div>
            <div><label style={labelStyle}>Başlık (Gradient)</label><input style={inputStyle} value={icerik.hero.baslikGradient} onChange={(e) => setIcerik({ ...icerik, hero: { ...icerik.hero, baslikGradient: e.target.value } })} /></div>
            <div><label style={labelStyle}>Açıklama</label><textarea style={{ ...inputStyle, resize: "none" }} rows={3} value={icerik.hero.aciklama} onChange={(e) => setIcerik({ ...icerik, hero: { ...icerik.hero, aciklama: e.target.value } })} /></div>
            <h4 style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.5rem" }}>İstatistikler</h4>
            {icerik.hero.istatistikler.map((ist: any, i: number) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div><label style={labelStyle}>Sayı {i + 1}</label><input style={inputStyle} value={ist.sayi} onChange={(e) => { const yeni = [...icerik.hero.istatistikler]; yeni[i] = { ...yeni[i], sayi: e.target.value }; setIcerik({ ...icerik, hero: { ...icerik.hero, istatistikler: yeni } }); }} /></div>
                <div><label style={labelStyle}>Etiket {i + 1}</label><input style={inputStyle} value={ist.etiket} onChange={(e) => { const yeni = [...icerik.hero.istatistikler]; yeni[i] = { ...yeni[i], etiket: e.target.value }; setIcerik({ ...icerik, hero: { ...icerik.hero, istatistikler: yeni } }); }} /></div>
              </div>
            ))}
          </div>
        )}

        {aktifBolum === "hakkinda" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 600, marginBottom: "0.5rem" }}>Hakkında Bölümü</h3>
            <div><label style={labelStyle}>Başlık</label><input style={inputStyle} value={icerik.hakkinda.baslik} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, baslik: e.target.value } })} /></div>
            <div><label style={labelStyle}>Başlık (Gradient)</label><input style={inputStyle} value={icerik.hakkinda.baslikGradient} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, baslikGradient: e.target.value } })} /></div>
            <div><label style={labelStyle}>Biyografi 1</label><textarea style={{ ...inputStyle, resize: "none" }} rows={3} value={icerik.hakkinda.biyografi1} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, biyografi1: e.target.value } })} /></div>
            <div><label style={labelStyle}>Biyografi 2</label><textarea style={{ ...inputStyle, resize: "none" }} rows={3} value={icerik.hakkinda.biyografi2} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, biyografi2: e.target.value } })} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div><label style={labelStyle}>Uzmanlık</label><input style={inputStyle} value={icerik.hakkinda.uzmanlik} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, uzmanlik: e.target.value } })} /></div>
              <div><label style={labelStyle}>Odak</label><input style={inputStyle} value={icerik.hakkinda.odak} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, odak: e.target.value } })} /></div>
              <div><label style={labelStyle}>Deneyim</label><input style={inputStyle} value={icerik.hakkinda.deneyim} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, deneyim: e.target.value } })} /></div>
              <div><label style={labelStyle}>Konum</label><input style={inputStyle} value={icerik.hakkinda.konum} onChange={(e) => setIcerik({ ...icerik, hakkinda: { ...icerik.hakkinda, konum: e.target.value } })} /></div>
            </div>
          </div>
        )}

        {aktifBolum === "istatistikler" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 600, marginBottom: "0.5rem" }}>İstatistikler</h3>
            {icerik.istatistikler.map((ist: any, i: number) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.75rem" }}>
                <div><label style={labelStyle}>İkon</label><input style={inputStyle} value={ist.ikon} onChange={(e) => { const yeni = [...icerik.istatistikler]; yeni[i] = { ...yeni[i], ikon: e.target.value }; setIcerik({ ...icerik, istatistikler: yeni }); }} /></div>
                <div><label style={labelStyle}>Sayı</label><input type="number" style={inputStyle} value={ist.sayi} onChange={(e) => { const yeni = [...icerik.istatistikler]; yeni[i] = { ...yeni[i], sayi: Number(e.target.value) }; setIcerik({ ...icerik, istatistikler: yeni }); }} /></div>
                <div><label style={labelStyle}>Etiket</label><input style={inputStyle} value={ist.etiket} onChange={(e) => { const yeni = [...icerik.istatistikler]; yeni[i] = { ...yeni[i], etiket: e.target.value }; setIcerik({ ...icerik, istatistikler: yeni }); }} /></div>
              </div>
            ))}
          </div>
        )}

        {aktifBolum === "iletisim" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 600, marginBottom: "0.5rem" }}>İletişim Bölümü</h3>
            <div><label style={labelStyle}>Başlık</label><input style={inputStyle} value={icerik.iletisim.baslik} onChange={(e) => setIcerik({ ...icerik, iletisim: { ...icerik.iletisim, baslik: e.target.value } })} /></div>
            <div><label style={labelStyle}>Açıklama</label><textarea style={{ ...inputStyle, resize: "none" }} rows={2} value={icerik.iletisim.aciklama} onChange={(e) => setIcerik({ ...icerik, iletisim: { ...icerik.iletisim, aciklama: e.target.value } })} /></div>
            <div><label style={labelStyle}>E-posta</label><input style={inputStyle} value={icerik.iletisim.email} onChange={(e) => setIcerik({ ...icerik, iletisim: { ...icerik.iletisim, email: e.target.value } })} /></div>
            <div><label style={labelStyle}>Telefon</label><input style={inputStyle} value={icerik.iletisim.telefon} onChange={(e) => setIcerik({ ...icerik, iletisim: { ...icerik.iletisim, telefon: e.target.value } })} /></div>
            <div><label style={labelStyle}>Konum</label><input style={inputStyle} value={icerik.iletisim.konum} onChange={(e) => setIcerik({ ...icerik, iletisim: { ...icerik.iletisim, konum: e.target.value } })} /></div>
          </div>
        )}

        {aktifBolum === "footer" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 600, marginBottom: "0.5rem" }}>Footer</h3>
            <div><label style={labelStyle}>Site Adı</label><input style={inputStyle} value={icerik.footer.sitAdi} onChange={(e) => setIcerik({ ...icerik, footer: { ...icerik.footer, sitAdi: e.target.value } })} /></div>
            <div><label style={labelStyle}>Instagram URL</label><input style={inputStyle} value={icerik.footer.instagram} onChange={(e) => setIcerik({ ...icerik, footer: { ...icerik.footer, instagram: e.target.value } })} /></div>
            <div><label style={labelStyle}>Twitter URL</label><input style={inputStyle} value={icerik.footer.twitter} onChange={(e) => setIcerik({ ...icerik, footer: { ...icerik.footer, twitter: e.target.value } })} /></div>
            <div><label style={labelStyle}>LinkedIn URL</label><input style={inputStyle} value={icerik.footer.linkedin} onChange={(e) => setIcerik({ ...icerik, footer: { ...icerik.footer, linkedin: e.target.value } })} /></div>
          </div>
        )}

        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={handleKaydet} disabled={kaydediliyor} style={{ padding: "0.75rem 2rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, #16a34a, #2563eb)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
            {kaydediliyor ? "Kaydediliyor..." : "Kaydet"}
          </button>
          {mesaj && <p style={{ fontSize: "0.875rem", color: mesaj.includes("✅") ? "#4ade80" : "#f87171" }}>{mesaj}</p>}
        </div>
      </div>
    </div>
  );
}