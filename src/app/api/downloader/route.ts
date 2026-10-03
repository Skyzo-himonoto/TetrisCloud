import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL kosong' }, { status: 400 });
    }

    // Validasi URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'URL tidak valid' }, { status: 400 });
    }

    // Deteksi platform
    let platform = 'unknown';
    if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'youtube';
    else if (url.includes('tiktok.com')) platform = 'tiktok';
    else if (url.includes('instagram.com')) platform = 'instagram';

    // Untuk YouTube, pakai Vevioz API
    if (platform === 'youtube') {
      // Ambil video ID
      const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) {
        return NextResponse.json({ error: 'Video ID YouTube tidak ditemukan' }, { status: 400 });
      }

      // Return link download dari Vevioz
      const mp3Url = `https://api.vevioz.com/api/button/mp3/${videoId}`;
      const mp4Url = `https://api.vevioz.com/api/button/mp4/${videoId}`;

      return NextResponse.json({
        success: true,
        platform: 'youtube',
        videoId: videoId,
        title: 'YouTube Video',
        download: {
          audio: mp3Url,
          video: mp4Url,
        },
        message: 'Klik link di atas untuk mengunduh. Link akan membuka halaman download Vevioz.',
      });
    }

    // Untuk platform lain, return pesan belum didukung
    return NextResponse.json({
      success: false,
      error: `Platform "${platform}" belum didukung. Saat ini hanya YouTube.`,
    }, { status: 400 });

  } catch (error) {
    console.error('Downloader Error:', error);
    return NextResponse.json({ error: 'Gagal menghubungi server downloader' }, { status: 500 });
  }
}
