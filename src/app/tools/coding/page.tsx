'use client';

import { useState } from 'react';

export default function CodingPage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult(data.choices?.[0]?.message?.content || 'Tidak ada respon dari AI.');
      }
    } catch (error) {
      setResult('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            AI <span className="text-purple-500">Coding</span> Assistant
          </h1>
          <p className="text-slate-400 mt-2">Tanya apa saja tentang kode, AI akan menjawab.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <textarea
            className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            rows={5}
            placeholder="Contoh: Buatkan fungsi JavaScript untuk validasi email..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white px-6 py-3 rounded-xl font-semibold transition-all w-full md:w-auto"
          >
            {isLoading ? '⏳ Memproses...' : '✨ Generate Kode'}
          </button>
        </div>

        {result && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-3">Hasil:</h3>
            <pre className="bg-black/50 p-4 rounded-xl text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
              <code>{result}</code>
            </pre>
          </div>
        )}

        <div className="text-center mt-8">
          <a href="/" className="text-slate-400 hover:text-white transition-colors">
            ← Kembali ke Beranda
          </a>
        </div>

      </div>
    </main>
  );
}
