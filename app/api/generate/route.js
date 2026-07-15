import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt, mode } = await request.json();

    let output;

    if (mode === 'video') {
      // FREE video generation
      const encodedPrompt = encodeURIComponent(prompt);
      const seed = Date.now();
      output = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=576&height=320&nologo=true&seed=${seed}`;
    } else {
      // Image generation
      output = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    }

    return NextResponse.json({ url: output, mode: mode });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
