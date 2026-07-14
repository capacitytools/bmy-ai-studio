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
    }
  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      <h1 className="text-2xl font-bold text-yt-text mb-6">My Library</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-20">
          <Sparkles className="w-16 h-16 text-yt-textSec mx-auto mb-4" />
          <p className="text-yt-text text-xl font-bold mb-2">No images yet</p>
          <Link href="/create" className="bg-yt-red text-white font-bold px-6 py-3 rounded-full">
            Create an Image
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((v) => (
            <div key={v.id} className="bg-yt-surface rounded-xl p-4 border border-yt-border">
              
              {/* Clickable Image Area */}
              <Link 
                href={`/viewer?url=${encodeURIComponent(v.thumbnail)}&prompt=${encodeURIComponent(v.prompt)}`}
                className="block"
              >
                <div className={`w-full ${getAspectRatioClass(v.ratio)} bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg mb-3 overflow-hidden relative`}>
                  {v.thumbnail ? (
                    <img src={v.thumbnail} alt={v.prompt} className="w-full h-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <span className="text-white/80 text-sm font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Tap to View</span>
                  </div>
                </div>
              </Link>
              
              <p className="text-yt-text text-sm font-medium line-clamp-2">{v.prompt}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yt-textSec text-xs">{v.date}</span>
                <button
                  onClick={() => deleteImage(v.id)}
                  className="text-red-500 text-xs flex items-center gap-1 px-2 py-1 bg-red-500/10 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
