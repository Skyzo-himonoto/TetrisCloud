export default function Home() {
  const features = [
    { title: "All Downloader", desc: "Unduh dari berbagai platform", icon: "⬇️" },
    { title: "AI Image", desc: "Generate gambar dari teks", icon: "🎨" },
    { title: "AI Coding", desc: "Tulis kode dengan bantuan AI", icon: "💻" },
    { title: "Private Chat", desc: "Ruang obrolan pribadi", icon: "💬" },
  ];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Tetris<span className="text-blue-500">Cloud</span>
          </h1>
          <p className="text-slate-300">Satu Platform, Semua Kebutuhan Digital Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
