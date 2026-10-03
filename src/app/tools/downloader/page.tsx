'use client';

import { useState } from 'react';

export default function DownloaderPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url) return;
    setIsLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch('/api/downloader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Gagal mengunduh');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>
            All <span style={{ color: '#0066FF' }}>Downloader</span>
          </h1>
          <p style={{ color: '#94a3b8' }}>Tempel link video, AI akan mengunduhnya untuk Anda.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
          <input
            type="text"
            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: 'white', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }}
            placeholder="Tempel link YouTube / TikTok / Instagram di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleDownload}
            disabled={isLoading}
            style={{ marginTop: '16px', background: isLoading ? '#1e40af' : '#0066FF', color: 'white', padding: '14px 28px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', width: '100%' }}
          >
            {isLoading ? '⏳ Memproses...' : '⬇️ Download'}
          </button>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', borderRadius: '16px', padding: '20px', color: '#fca5a5' }}>
            ❌ {error}
          </div>
        )}

        {result && (
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>Hasil:</h3>
            <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '12px', color: '#4ade80', fontSize: '12px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>← Kembali ke Beranda</a>
        </div>

      </div>
    </main>
  );
}
