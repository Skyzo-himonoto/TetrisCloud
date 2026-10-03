'use client';

import { useState } from 'react';

export default function ImageAIPage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setImageUrl('');

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    
    setTimeout(() => {
      setImageUrl(url);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
            AI <span style={{ color: '#7C3AED' }}>Image</span> Generator
          </h1>
          <p style={{ color: '#94a3b8' }}>Ketik deskripsi, AI akan membuat gambarnya.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
          <textarea
            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }}
            rows={3}
            placeholder="Contoh: Kucing lucu memakai topi penyihir, gaya anime..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            style={{ marginTop: '16px', background: isLoading ? '#4c1d95' : '#7C3AED', color: 'white', padding: '14px 28px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', width: '100%' }}
          >
            {isLoading ? '⏳ Membuat Gambar...' : '🎨 Generate Gambar'}
          </button>
        </div>

        {imageUrl && (
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>Hasil:</h3>
            <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '12px' }} />
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>← Kembali ke Beranda</a>
        </div>

      </div>
    </main>
  );
}
