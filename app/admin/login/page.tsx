"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setYukleniyor(true);
    setHata("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sifre }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setHata("Hatalı şifre. Lütfen tekrar deneyin.");
      }
    } catch {
      setHata("Bir hata oluştu.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1.5rem",
        padding: "2.5rem",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Admin Girişi
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
            Devam etmek için şifrenizi girin
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.875rem", display: "block", marginBottom: "0.5rem" }}>
              Şifre
            </label>
            <input
              type="password"
              required
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              placeholder="Admin şifrenizi girin"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {hata && (
            <p style={{ color: "#f87171", fontSize: "0.875rem", textAlign: "center" }}>
              {hata}
            </p>
          )}

          <button
            type="submit"
            disabled={yukleniyor}
            style={{
              width: "100%",
              padding: "0.875rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #16a34a, #2563eb)",
              color: "white",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}