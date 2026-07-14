"use client";

import { useState, useEffect } from "react";
import { Library, Trash2, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('bmy_videos') || '[]');
      setVideos(saved);
    }
  }, []);

  const deleteVideo = (id) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('bmy_videos', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      <h1 className="text-2xl font-bold text-yt-text mb-6">My Library</h1>

      {videos.length === 0 ? (
        <div className="text-center mt-20">
          <Sparkles className="w-16 h-16 text-yt-textSec mx-auto mb-4" />
          <p className="text-yt-text text-xl font-bold mb-2">No videos yet</p>
          <Link href="/create" className="bg-yt-red text-white px-6 py-3 rounded-full">
            Create a Video
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-yt-surface rounded-xl p-4 border border-yt-border">
              <div className="w-full aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg mb-3 flex items-center justify-center">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt="AI" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Play className="w-12 h-12 text-white" fill="white" />
                )}
              </div>
              <p className="text-yt-text text-sm font-medium">{video.prompt}</p>
              <p className="text-yt-textSec text-xs mt-1">{video.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
