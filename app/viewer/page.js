"use client";

import { Download, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

export default function ViewerPage() {
  // Get the image URL and prompt from the link we clicked
  const params = new URLSearchParams(window.location.search);
  const imageUrl = params.get('url');
  const prompt = params.get('prompt');

  const downloadImage = async () => {
    if (!imageUrl) return;
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bmy-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 z-50 border-b border-white/10">
        <Link href="/library" className="p-2 bg-white/10 rounded-full active:scale-90 transition">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <span className="text-white font-bold text-sm">Image Viewer</span>
        <button onClick={downloadImage} className="p-2 bg-yt-red rounded-full active:scale-90 transition">
          <Download className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* Full Screen Image */}
      <main className="flex-1 flex items-center justify-center pt-14 pb-20 px-2">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={prompt} 
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <p className="text-white/50">No image found</p>
        )}
      </main>

      {/* Bottom Info */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md p-4 border-t border-white/10 pb-8">
        <p className="text-white text-sm text-center line-clamp-3">
          {prompt}
        </p>
        <button 
          onClick={downloadImage}
          className="w-full mt-4 bg-yt-red text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <Download className="w-5 h-5" />
          Save to Device
        </button>
      </div>
    </div>
  );
}
