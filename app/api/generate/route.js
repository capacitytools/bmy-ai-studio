import { NextResponse } from 'next/server';
import Replicate from "replicate";

export async function POST(request) {
  try {
    const { prompt, mode } = await request.json();
    
    console.log('Received request:', { prompt, mode });
    
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    let output;

    if (mode === 'video') {
      // Using Zeroscope - a reliable free video model
      console.log('Generating video...');
      output = await replicate.run(
        "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec089380cd6e31f3b1f",
        {
          input: {
            prompt: prompt,
            num_frames: 24,
            fps: 8,
            width: 576,
            height: 320
          }
        }
      );
      console.log('Video generated:', output);
    } else {
      console.log('Generating image...');
      output = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true`;
    }

    return NextResponse.json({ url: output, mode: mode });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ 
      error: error.message,
      mode: 'video' 
    }, { status: 500 });
  }
}
