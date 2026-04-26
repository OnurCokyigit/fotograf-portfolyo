"use client";

export default function Hakkinda() {
  return (
    <section id="hakkinda" style={{width: "100%", padding: "8rem 0", position: "relative"}}>
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center"
      }}>
        <div>
          <p style={{color: "#4ade80", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem"}}>
            Ben Kimim
          </p>
          <h2 style={{fontSize: "3rem", fontWeight: "bold", lineHeight: 1.2, marginBottom: "1.5rem"}}>
            Sahada Bir<br/>
            <span className="text-gradient">Hikaye Anlatıcısı</span>
          </h2>
          <p style={{color: "#9ca3af", fontSize: "1.125rem", lineHeight: 1.8, marginBottom: "1.5rem"}}>
            Voleybol ve basketbol dünyasında yıllar içinde edindiğim deneyimle, sporcuların en güçlü anlarını ölümsüzleştiriyorum.
          </p>
          <p style={{color: "#9ca3af", fontSize: "1.125rem", lineHeight: 1.8, marginBottom: "2.5rem"}}>
            Bireysel performans fotoğraflarından takım dinamiklerine kadar, her kareden en iyi hikayeyi çıkarmak için çalışıyorum.
          </p>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
            {[
              {baslik: "Uzmanlık", deger: "Spor Fotoğrafçılığı"},
              {baslik: "Odak", deger: "Voleybol & Basketbol"},
              {baslik: "Deneyim", deger: "3+ Yıl"},
              {baslik: "Konum", deger: "Türkiye"},
            ].map((item) => (
              <div key={item.baslik} className="glass" style={{borderRadius: "1rem", padding: "1rem"}}>
                <div style={{color: "#4ade80", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem"}}>
                  {item.baslik}
                </div>
                <div style={{color: "white", fontWeight: 500}}>{item.deger}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{position: "relative"}}>
          <div className="glass" style={{borderRadius: "1.5rem", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{textAlign: "center", padding: "2rem"}}>
              <div style={{width: "8rem", height: "8rem", borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #2563eb)", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem"}}>
                📷
              </div>
              <p style={{color: "#9ca3af", fontSize: "0.875rem"}}>Profil fotoğrafı admin panelinden yüklenebilir</p>
            </div>
          </div>
          <div className="glass" style={{position: "absolute", bottom: "-1.5rem", right: "-1.5rem", borderRadius: "1rem", padding: "1rem", textAlign: "center"}}>
            <div className="text-gradient" style={{fontSize: "1.5rem", fontWeight: "bold"}}>500+</div>
            <div style={{color: "#9ca3af", fontSize: "0.75rem"}}>Fotoğraf</div>
          </div>
          <div className="glass" style={{position: "absolute", top: "-1.5rem", left: "-1.5rem", borderRadius: "1rem", padding: "1rem", textAlign: "center"}}>
            <div className="text-gradient" style={{fontSize: "1.5rem", fontWeight: "bold"}}>20+</div>
            <div style={{color: "#9ca3af", fontSize: "0.75rem"}}>Takım</div>
          </div>
        </div>
      </div>
    </section>
  );
}