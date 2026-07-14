"use client";

import { useState, useEffect } from "react";
import { Library, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bmy_videos');
    if (saved) {
      setVideos(JSON.parse(saved));
    }
  }, []);

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
          <p className="text-yt-text">No videos yet</p>
          <Link href="/create" className="bg-yt-red text-white px-4 py-2 rounded mt-4 inline-block">
            Create
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((v) => (
            <div key={v.id} className="bg-yt-surface rounded-xl p-4 border border-yt-border">
              <div className={`w-full ${getAspectRatioClass(v.ratio)} bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg mb-3 overflow-hidden`}>
                {v.thumbnail ? (
                  <img src={v.thumbnail} alt={v.prompt} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <p className="text-yt-text text-sm font-medium">{v.prompt}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yt-textSec text-xs">{v.date}</span>
                <span className="bg-yt-red/20 text-yt-red text-[10px] px-2 py-0.5 rounded uppercase">{v.ratio || 'square'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
