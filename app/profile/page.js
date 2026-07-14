"use client";

import { useState, useEffect } from "react";
import { User, Crown, Settings, LogOut, Video, Sparkles, ChevronRight, Bell, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  const [videoCount, setVideoCount] = useState(0);

  // This counts your saved videos automatically!
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bmy_videos') || '[]');
    setVideoCount(saved.length);
  }, []);

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      
      {/* User Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold text-white">
          B
        </div>
        <div>
          <h1 className="text-xl font-bold text-yt-text">BMY Creator</h1>
          <p className="text-yt-textSec text-sm">Free Plan</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-yt-surface rounded-xl p-4 border border-yt-border">
          <Video className="w-5 h-5 text-yt-red mb-2" />
          <p className="text-2xl font-bold text-yt-text">{videoCount}</p>
          <p className="text-yt-textSec text-xs">Videos Created</p>
        </div>
        <div className="flex-1 bg-yt-surface rounded-xl p-4 border border-yt-border">
          <Sparkles className="w-5 h-5 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold text-yt-text">0</p>
          <p className="text-yt-textSec text-xs">Pro Features</p>
        </div>
      </div>

      {/* Upgrade to Pro Banner */}
      <div className="bg-gradient-to-r from-yt-red to-red-900 rounded-xl p-5 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <h2 className="text-white font-bold text-lg">Upgrade to Pro</h2>
          </div>
          <p className="text-white/80 text-sm mb-4">Get 4K videos, no watermarks, and unlimited generations.</p>
          <button className="bg-white text-yt-red font-bold px-4 py-2 rounded-full text-sm active:scale-95 transition">
            Upgrade Now
          </button>
        </div>
        {/* Decorative circle */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
      </div>

      {/* Settings Menu */}
      <div className="bg-yt-surface rounded-xl border border-yt-border overflow-hidden">
        {[
          { icon: User, label: "Account Settings" },
          { icon: Bell, label: "Notifications" },
          { icon: HelpCircle, label: "Help & Support" },
          { icon: Settings, label: "App Settings" },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between p-4 border-b border-yt-border last:border-b-0 active:bg-yt-hover transition">
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-yt-textSec" />
              <span className="text-yt-text font-medium">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-yt-textSec" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button className="w-full mt-6 flex items-center justify-center gap-2 p-4 text-red-500 font-medium active:bg-yt-surface rounded-xl transition">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>

    </div>
  );
        }
