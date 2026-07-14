import { NextResponse } from 'next/server';
import Replicate from "replicate";

export async function POST(request) {
  try {
    const { prompt, mode } = await request.json();
    
    // Initialize the AI brain
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    let output;

    if (mode === 'video') {
      // Using a reliable video model (Mini Vidu)
      // Note: If this specific model ID changes, we can update it later.
      output = await replicate.run(
        "fofr/mini-vidu:8b3b2d3e4f5a6b7c8d9e0f1a2b3c4d5e", 
        { input: { prompt: prompt } }
      );
    } else {
      // Fallback to free image API
      output = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    }

    return NextResponse.json({ url: output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
