"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "Ben Kimim", href: "#hakkinda" },
  { label: "Çalışmalarım", href: "#galeri" },
  { label: "İstatistikler", href: "#istatistikler" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <button
          onClick={() => handleNav("#hero")}
          className="text-lg font-bold text-white hover:text-gradient transition-all duration-200"
        >
          Göktuğ Görgülü
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-sm text-gray-300 hover:text-white transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#iletisim")}
            className="px-5 py-2 rounded-full text-sm font-medium border border-primary-600 text-primary-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
          >
            İletişime Geç
          </button>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-2xl p-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}