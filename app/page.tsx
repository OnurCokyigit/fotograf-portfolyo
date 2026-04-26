import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hakkinda from "@/components/Hakkinda";
import Galeri from "@/components/Galeri";
import Istatistikler from "@/components/Istatistikler";
import Iletisim from "@/components/Iletisim";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
      <Header />
      <Hero />
      <Hakkinda />
      <Galeri />
      <Istatistikler />
      <Iletisim />
      <Footer />
    </main>
  );
}