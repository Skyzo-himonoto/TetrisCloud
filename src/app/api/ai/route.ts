import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt kosong' }, { status: 400 });
    }

    // Panggil API Clouvia
    const response = await fetch(`${process.env.AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model:'coding-high-flash', // Model default. Bisa diganti sesuai Clouvia
        messages: [
          { 
            role: 'system', 
            content: 'Kamu adalah asisten coding senior. Jawab dengan kode yang rapi dan penjelasan singkat dalam Bahasa Indonesia.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Clouvia Error: ${response.status} - ${errorData}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json({ error: 'Gagal menghubungi server AI' }, { status: 500 });
  }
}
