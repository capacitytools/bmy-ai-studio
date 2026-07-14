"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Mic, Sparkles, Home, PlusSquare, Library, User, Video, Mic2, FileText, Captions, Image, Music, Wand2, Palette, Menu, X } from "lucide-react";

const tools = [
  { title: "AI Image Generator", badge: "Free", color: "from-blue-900 to-purple-900", icon: Image, link: "/create" },
  { title: "Text to Video", badge: "Coming Soon", color: "from-red-900 to-orange-900", icon: Video, link: "/create" },
  { title: "Voice Clone", badge: "Pro", color: "from-green-900 to-teal-900", icon: Mic2, link: "/create" },
  { title: "Script Writer", badge: "Free", color: "from-yellow-900 to-red-900", icon: FileText, link: "/create" },
  { title: "Subtitle Generator", badge: "Free", color: "from-pink-900 to-rose-900", icon: Captions, link: "/create" },
  { title: "Thumbnail Maker", badge: "Free", color: "from-indigo-900 to-blue-900", icon: Image, link: "/create" },
  { title: "Background Music", badge: "Creator", color: "from-cyan-900 to-blue-900", icon: Music, link: "/create" },
  { title: "AI Art Generator", badge: "Free", color: "from-violet-900 to-purple-900", icon: Palette, link: "/create" },
];

export default function HomePage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-yt-bg pb-20">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-yt-bg flex items-center justify-between px-4 z-50 border-b border-yt-border">
        <div className="flex items-center gap-2">
          <div className="bg-yt-red text-white p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-yt-text">BMY AI</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-yt-surface rounded-full">
            <Search className="w-5 h-5 text-yt-text" />
          </button>
          <button className="p-2 bg-yt-surface rounded-full">
            <Mic className="w-5 h-5 text-yt-text" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 px-4">
        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {["All", "Images", "Video", "Audio", "Writing", "Tools"].map((cat, i) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium ${
                i === 0 ? "bg-white text-black" : "bg-yt-surface text-yt-text"
              }`}
            >              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, i) => {
            const IconComponent = tool.icon;
            return (
              <Link key={i} href={tool.link} className="flex flex-col gap-2 active:scale-95 transition-transform">
                <div className={`w-full aspect-[9/16] rounded-xl bg-gradient-to-br ${tool.color} flex flex-col items-center justify-center relative p-4`}>
                  <IconComponent className="w-8 h-8 text-white/80 mb-2" />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-yt-text text-sm font-semibold line-clamp-2">{tool.title}</h3>
                <p className="text-yt-textSec text-xs">BMY Studio</p>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-yt-bg border-t border-yt-border flex items-center justify-around z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-yt-text">
          <Home className="w-6 h-6" />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/create" className="flex flex-col items-center gap-1 text-yt-textSec">
          <PlusSquare className="w-6 h-6" />
          <span className="text-[10px]">Create</span>
        </Link>
        <button 
          onClick={() => setShowMenu(true)}
          className="flex flex-col items-center gap-1 text-yt-textSec"
        >
          <Menu className="w-6 h-6" />
          <span className="text-[10px]">Menu</span>
        </button>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-yt-textSec">
          <User className="w-6 h-6" />
          <span className="text-[10px]">Profile</span>
        </Link>
      </nav>

      {/* Dropdown Menu Modal */}
      {showMenu && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">          {/* Dark Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowMenu(false)}
          ></div>
          
          {/* Menu Content */}
          <div className="relative w-full bg-yt-surface rounded-t-3xl p-6 border-t border-yt-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-yt-text text-xl font-bold">Menu</h2>
              <button 
                onClick={() => setShowMenu(false)}
                className="p-2 bg-yt-hover rounded-full"
              >
                <X className="w-5 h-5 text-yt-text" />
              </button>
            </div>
            
            <div className="space-y-3">
              <Link 
                href="/library" 
                className="flex items-center gap-4 p-4 bg-yt-bg rounded-xl active:bg-yt-hover transition"
                onClick={() => setShowMenu(false)}
              >
                <Library className="w-6 h-6 text-yt-text" />
                <div>
                  <p className="text-yt-text font-medium">My Library</p>
                  <p className="text-yt-textSec text-xs">View your creations</p>
                </div>
              </Link>
              
              <Link 
                href="/create" 
                className="flex items-center gap-4 p-4 bg-yt-bg rounded-xl active:bg-yt-hover transition"
                onClick={() => setShowMenu(false)}
              >
                <PlusSquare className="w-6 h-6 text-yt-red" />
                <div>
                  <p className="text-yt-text font-medium">Create New</p>
                  <p className="text-yt-textSec text-xs">Generate AI content</p>
                </div>
              </Link>
              
              <Link 
                href="/profile" 
                className="flex items-center gap-4 p-4 bg-yt-bg rounded-xl active:bg-yt-hover transition"
                onClick={() => setShowMenu(false)}
              >
                <User className="w-6 h-6 text-yt-text" />
                <div>                  <p className="text-yt-text font-medium">Profile</p>
                  <p className="text-yt-textSec text-xs">Account settings</p>
                </div>
              </Link>
              
              <div className="border-t border-yt-border my-2"></div>
              
              <button className="w-full flex items-center gap-4 p-4 bg-yt-bg rounded-xl active:bg-yt-hover transition text-left">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-yt-text font-medium">Upgrade to Pro</p>
                  <p className="text-yt-textSec text-xs">Unlock all features</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
