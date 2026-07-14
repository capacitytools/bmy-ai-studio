import { NextResponse } from 'next/server';
import Replicate from "replicate";

export async function POST(request) {
  try {
    const { prompt, mode } = await request.json();
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    let output;

    if (mode === 'video') {
      // Using a fast, reliable video model
      output = await replicate.run(
        "fofr/mini-vidu:8b3b2d3e4f5a6b7c8d9e0f1a2b3c4d5e", 
        { input: { prompt: prompt } }
      );
    } else {
      output = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    }

    return NextResponse.json({ url: output });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
