"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Wand2 } from "lucide-react";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [selectedRatio, setSelectedRatio] = useState("square");
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = ["Cinematic", "Anime", "Realistic", "3D Render", "Watercolor"];
  const ratios = [
    { name: "Square", value: "square", width: 512, height: 512 },
    { name: "Portrait", value: "portrait", width: 512, height: 768 },
    { name: "Landscape", value: "landscape", width: 768, height: 512 },
  ];

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    try {
      const ratio = ratios.find(r => r.value === selectedRatio);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${ratio.width}&height=${ratio.height}&nologo=true&seed=${Date.now()}`;

      const newMedia = {
        id: Date.now(),
        prompt: prompt,
        style: selectedStyle,
        ratio: selectedRatio,
        type: "image",
        date: new Date().toLocaleDateString(),
        url: imageUrl,
        thumbnail: imageUrl
      };
      
      const oldMedia = JSON.parse(localStorage.getItem('bmy_videos') || '[]');
      oldMedia.unshift(newMedia);
      localStorage.setItem('bmy_videos', JSON.stringify(oldMedia));
      
      window.location.href = '/library';
    } catch (error) {
      alert("Failed: " + error.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">      <h1 className="text-2xl font-bold text-yt-text mb-6 flex items-center gap-2">
        <Wand2 className="text-yt-red" /> Create AI Image
      </h1>

      <div className="mb-6">
        <label className="text-yt-textSec text-sm mb-2 block">Describe your image:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A beautiful sunset over mountains..."
          className="w-full h-32 bg-yt-surface text-yt-text p-4 rounded-xl border border-yt-border focus:outline-none focus:border-yt-red resize-none"
        />
      </div>

      <div className="mb-6">
        <label className="text-yt-textSec text-sm mb-2 block">Choose Style:</label>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium ${
                selectedStyle === style ? "bg-yt-red text-white" : "bg-yt-surface text-yt-text"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="text-yt-textSec text-sm mb-2 block">Aspect Ratio:</label>
        <div className="flex gap-3">
          {ratios.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => setSelectedRatio(ratio.value)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium border ${
                selectedRatio === ratio.value ? "bg-yt-red text-white border-yt-red" : "bg-yt-surface text-yt-text border-yt-border"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <div className={`border-2 ${selectedRatio === ratio.value ? 'border-white' : 'border-yt-textSec'} rounded-sm ${
                  ratio.value === 'square' ? 'w-6 h-6' : ratio.value === 'portrait' ? 'w-4 h-6' : 'w-6 h-4'
                }`}></div>
                <span>{ratio.name}</span>
              </div>
            </button>
          ))}        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt}
        className="w-full bg-yt-red text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isGenerating ? (
          <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Generating...</>
        ) : (
          <><Sparkles className="w-5 h-5" />Generate Image</>
        )}
      </button>
    </div>
  );
}
