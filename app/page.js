import Link from "next/link";
import { Search, Mic, Sparkles, Home, PlusSquare, Library, User, Video, Mic2, FileText, Captions, Image, Music, Wand2, Palette } from "lucide-react";

const tools = [
  { title: "Cinematic Text to Video", badge: "Free", color: "from-blue-900 to-purple-900", icon: Video, link: "/create" },
  { title: "Ultra-Realistic Voice Clone", badge: "Pro", color: "from-red-900 to-orange-900", icon: Mic2, link: "/create" },
  { title: "AI YouTube Script Writer", badge: "Free", color: "from-green-900 to-teal-900", icon: FileText, link: "/create" },
  { title: "Auto Subtitle Generator", badge: "Free", color: "from-yellow-900 to-red-900", icon: Captions, link: "/create" },
  { title: "AI Thumbnail Maker", badge: "Free", color: "from-pink-900 to-rose-900", icon: Image, link: "/create" },
  { title: "Background Music AI", badge: "Creator", color: "from-indigo-900 to-blue-900", icon: Music, link: "/create" },
  { title: "AI Prompt Enhancer", badge: "Free", color: "from-cyan-900 to-blue-900", icon: Wand2, link: "/create" },
  { title: "AI Image Generator", badge: "Free", color: "from-violet-900 to-purple-900", icon: Palette, link: "/create" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-yt-bg pb-20">
      
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-yt-bg flex items-center justify-between px-4 z-50 border-b border-yt-border">
        <div className="flex items-center gap-2">
          <div className="bg-yt-red text-white p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-yt-text">BMY AI</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-yt-surface rounded-full"><Search className="w-5 h-5 text-yt-text" /></button>
          <button className="p-2 bg-yt-surface rounded-full"><Mic className="w-5 h-5 text-yt-text" /></button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-16 px-4">
        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {["All", "Text to Video", "Voice Clone", "Scripts", "Images"].map((cat, i) => (
            <button key={cat} className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium ${i === 0 ? "bg-white text-black" : "bg-yt-surface text-yt-text"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool, i) => {
            const IconComponent = tool.icon;
            return (
              <Link key={i} href={tool.link} className="flex flex-col gap-2 active:scale-95 transition-transform">
                <div className={`w-full aspect-[9/16] rounded-xl bg-gradient-to-br ${tool.color} flex flex-col items-center justify-center relative p-4`}>
                  <IconComponent className="w-12 h-12 text-white/80 mb-3" />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{tool.badge}</span>
                </div>
                <h3 className="text-yt-text text-sm font-semibold line-clamp-2">{tool.title}</h3>
                <p className="text-yt-textSec text-xs">BMY Studio</p>
              </Link>
            );
          })}
        </div>
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-yt-bg border-t border-yt-border flex items-center justify-around z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-yt-text">
          <Home className="w-6 h-6" />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/create" className="flex flex-col items-center gap-1 text-yt-textSec">
          <PlusSquare className="w-6 h-6" />
          <span className="text-[10px]">Create</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center gap-1 text-yt-textSec">
          <Library className="w-6 h-6" />
          <span className="text-[10px]">Library</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-yt-textSec">
          <User className="w-6 h-6" />
          <span className="text-[10px]">Profile</span>
        </Link>
      </nav>

    </div>
  );
}
