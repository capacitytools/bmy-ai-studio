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
      // CogVideoX - One of the models from your business plan!
      output = await replicate.run(
        "tencent/hunyuan-video:1234", 
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
