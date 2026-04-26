"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl" />
      </div>

      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-primary-400 text-sm font-medium tracking-widest uppercase mb-4">
          Spor Fotoğrafçısı
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Anı Yakala,
          <br />
          <span className="text-gradient">Hikayeyi Anlat</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Voleybol ve basketbol sahalarındaki en güçlü anları, en ince
          detayları ve en derin duyguları fotoğraflıyorum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              document
                .querySelector("#galeri")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all duration-200 hover:scale-105"
          >
            Çalışmalarımı Gör
          </button>
          <button
            onClick={() => {
              document
                .querySelector("#iletisim")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full glass text-white font-medium transition-all duration-200 hover:scale-105"
          >
            İletişime Geç
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-12">
          {[
            { sayi: "500+", etiket: "Fotoğraf" },
            { sayi: "50+", etiket: "Proje" },
            { sayi: "20+", etiket: "Takım" },
          ].map((item) => (
            <div key={item.etiket} className="text-center">
              <div className="text-3xl font-bold text-gradient">{item.sayi}</div>
              <div className="text-gray-400 text-sm mt-1">{item.etiket}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-0.5 h-12 bg-gradient-to-b from-primary-400 to-transparent mx-auto" />
      </div>
    </section>
  );
}