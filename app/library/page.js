"use client";

import { useState, useEffect } from "react";
import { Library, Download, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bmy_videos');
    if (saved) {
      setVideos(JSON.parse(saved));
    }
  }, []);

  const downloadImage = async (imageUrl, prompt) => {
    try {
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bmy-ai-${prompt.slice(0, 30).replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const deleteImage = (id) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('bmy_videos', JSON.stringify(updated));
  };

  const getAspectRatioClass = (ratio) => {
    switch(ratio) {
      case 'portrait': return 'aspect-[3/4]';
      case 'landscape': return 'aspect-video';
      default: return 'aspect-square';
    }  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      <h1 className="text-2xl font-bold text-yt-text mb-6">My Library</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-20">
          <Sparkles className="w-16 h-16 text-yt-textSec mx-auto mb-4" />
          <p className="text-yt-text text-xl font-bold mb-2">No images yet</p>
          <p className="text-yt-textSec mb-6">Create your first AI image to see it here!</p>
          <Link href="/create" className="bg-yt-red text-white font-bold px-6 py-3 rounded-full active:scale-95 transition">
            Create an Image
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((v) => (
            <div key={v.id} className="bg-yt-surface rounded-xl p-4 border border-yt-border">
              <div className={`w-full ${getAspectRatioClass(v.ratio)} bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg mb-3 overflow-hidden relative`}>
                {v.thumbnail ? (
                  <img src={v.thumbnail} alt={v.prompt} className="w-full h-full object-cover" />
                ) : null}
                
                {/* Download Button Overlay */}
                <button
                  onClick={() => downloadImage(v.thumbnail, v.prompt)}
                  className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm p-2 rounded-lg text-white active:scale-90 transition"
                >
                  <Download className="w-5 h-5" />
                </button>
                
                {/* Delete Button */}
                <button
                  onClick={() => deleteImage(v.id)}
                  className="absolute top-2 right-2 bg-red-600/80 backdrop-blur-sm p-2 rounded-lg text-white active:scale-90 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-yt-text text-sm font-medium line-clamp-2">{v.prompt}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yt-textSec text-xs">{v.date}</span>
                <div className="flex gap-2">
                  <span className="bg-yt-red/20 text-yt-red text-[10px] px-2 py-0.5 rounded uppercase">
                    {v.ratio || 'square'}
                  </span>
                  <button
                    onClick={() => downloadImage(v.thumbnail, v.prompt)}                    className="text-yt-textSec hover:text-yt-text text-xs flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
