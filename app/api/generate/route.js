import { NextResponse } from 'next/server';
import Replicate from "replicate";

export async function POST(request) {
  try {
    const { prompt, mode } = await request.json();
    
    // Initialize the AI brain with your secret key
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    let output;

    if (mode === 'video') {
      // Using the Wan 2.1 model from your business plan!
      output = await replicate.run(
        "lucataco/wan-2.1:1234567890abcdef", // We will use a standard video model
        { input: { prompt: prompt } }
      );
    } else {
      // Fallback to image if needed
      output = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    }

    return NextResponse.json({ url: output });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
