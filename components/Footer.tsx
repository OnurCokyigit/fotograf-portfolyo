export default function Footer() {
  const sosyaller = ["Instagram", "Twitter", "LinkedIn"];
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold text-gradient">LENS & MOMENT</div>
        <p className="text-gray-500 text-sm">2025 Tüm hakları saklıdır.</p>
        <div className="flex gap-6">
          {sosyaller.map((sosyal) => (
            <span key={sosyal} className="text-gray-500 text-sm cursor-pointer hover:text-white">
              {sosyal}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}