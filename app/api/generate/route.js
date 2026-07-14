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
      // Using a reliable, fast video model (Mini Vidu)
      output = await replicate.run(
        "fofr/mini-vidu:734637916380471234567890abcdef", 
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
