"use client";

import { useState, useEffect } from "react";
import { Library, Trash2, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bmy_videos') || '[]');
    setVideos(saved);
  }, []);

  const deleteVideo = (id) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('bmy_videos', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      <h1 className="text-2xl font-bold text-yt-text mb-6 flex items-center gap-2">
        <Library className="text-yt-red" /> My Library
      </h1>

      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="w-20 h-20 bg-yt-surface rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-yt-textSec" />
          </div>
          <h2 className="text-yt-text text-xl font-bold mb-2">No videos yet</h2>
          <p className="text-yt-textSec mb-6">Create your first AI video to see it here!</p>
          <Link href="/create" className="bg-yt-red text-white font-bold px-6 py-3 rounded-full active:scale-95 transition">
            Create a Video
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-yt-surface rounded-xl p-4 border border-yt-border">
              {/* The Real AI Generated Image */}
              <div className="w-full aspect-video bg-yt-bg rounded-lg overflow-hidden relative mb-3">
                {video.thumbnail ? (
                  <img 
                    src={video.thumbnail} 
                    alt={video.prompt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white/50" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-5 h-5 text-white ml-1" fill="white" />
                  </div>
                </div>
                <span className="absolute top-2 right-2 bg-yt-red text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  {video.style}
                </span>
              </div>

              <p className="text-yt-text text-sm font-medium line-clamp-2 mb-1">
                {video.prompt}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-yt-textSec text-xs">{video.date}</span>
                <button 
                  onClick={() => deleteVideo(video.id)}
                  className="p-2 text-red-500 active:scale-90 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
