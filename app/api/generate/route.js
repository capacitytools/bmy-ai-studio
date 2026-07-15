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
      // Using a simpler, working video model
      output = await replicate.run(
        "fofr/mini-vidu:4061b6876984e67092d85ce0f2d8e8d6a1c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2",
        {
          input: {
            prompt: prompt
          }
        }
      );
    } else {
      output = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    }

    return NextResponse.json({ url: output, mode: mode });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
