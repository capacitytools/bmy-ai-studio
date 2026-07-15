"use client";

import { useState } from "react";
import { Sparkles, Video, Image as ImageIcon, Wand2 } from "lucide-react";

export default function CreatePage() {
  const [mode, setMode] = useState("image");
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
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: prompt, 
          mode: mode 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok || data.error) {
        alert(`Error: ${data.error || 'Failed to generate'}`);
        setIsGenerating(false);
        return;
      }

      const newMedia = {
        id: Date.now(),
        prompt: prompt,
        style: selectedStyle,
        ratio: selectedRatio,
        type: mode,
        date: new Date().toLocaleDateString(),
        url: data.url,
        thumbnail: data.url      };
      
      const oldMedia = JSON.parse(localStorage.getItem('bmy_videos') || '[]');
      oldMedia.unshift(newMedia);
      localStorage.setItem('bmy_videos', JSON.stringify(oldMedia));
      
      window.location.href = '/library';
    } catch (error) {
      alert("Failed to connect: " + error.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      <h1 className="text-2xl font-bold text-yt-text mb-6 flex items-center gap-2">
        <Wand2 className="text-yt-red" /> Create AI Content
      </h1>

      {/* Mode Selector */}
      <div className="mb-6">
        <label className="text-yt-textSec text-sm mb-2 block">Select Mode:</label>
        <div className="flex gap-3">
          <button
            onClick={() => setMode("image")}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition active:scale-95 border flex items-center justify-center gap-2 ${
              mode === "image"
                ? "bg-yt-red text-white border-yt-red"
                : "bg-yt-surface text-yt-text border-yt-border"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Image
          </button>
          <button
            onClick={() => setMode("video")}
            className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition active:scale-95 border flex items-center justify-center gap-2 ${
              mode === "video"
                ? "bg-yt-red text-white border-yt-red"
                : "bg-yt-surface text-yt-text border-yt-border"
            }`}
          >
            <Video className="w-5 h-5" />
            Video
          </button>
        </div>
      </div>

      {/* Prompt Text Area */}
      <div className="mb-6">        <label className="text-yt-textSec text-sm mb-2 block">
          Describe your {mode}:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            mode === "video"
              ? "A cinematic drone shot flying over a futuristic city..."
              : "A beautiful sunset over mountains..."
          }
          className="w-full h-32 bg-yt-surface text-yt-text p-4 rounded-xl border border-yt-border focus:outline-none focus:border-yt-red resize-none"
        />
      </div>

      {/* Style Selection */}
      <div className="mb-6">
        <label className="text-yt-textSec text-sm mb-2 block">Choose Style:</label>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition active:scale-95 ${
                selectedStyle === style
                  ? "bg-yt-red text-white"
                  : "bg-yt-surface text-yt-text"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Aspect Ratio Selection */}
      <div className="mb-8">
        <label className="text-yt-textSec text-sm mb-2 block">Aspect Ratio:</label>
        <div className="flex gap-3">
          {ratios.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => setSelectedRatio(ratio.value)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition active:scale-95 border ${
                selectedRatio === ratio.value
                  ? "bg-yt-red text-white border-yt-red"
                  : "bg-yt-surface text-yt-text border-yt-border"
              }`}
            >
              <div className="flex flex-col items-center gap-1">                <div className={`border-2 ${selectedRatio === ratio.value ? 'border-white' : 'border-yt-textSec'} rounded-sm ${
                  ratio.value === 'square' ? 'w-6 h-6' : 
                  ratio.value === 'portrait' ? 'w-4 h-6' : 'w-6 h-4'
                }`}></div>
                <span>{ratio.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt}
        className="w-full bg-yt-red text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition disabled:opacity-50 disabled:active:scale-100"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {mode === "video" ? "Generating Video..." : "Generating Image..."}
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate {mode === "video" ? "Video" : "Image"}
          </>
        )}
      </button>

      {isGenerating && (
        <div className="mt-8 w-full aspect-video bg-yt-surface rounded-xl flex items-center justify-center border border-yt-border">
          <div className="text-center">
            {mode === "video" ? (
              <Video className="w-12 h-12 text-yt-textSec mx-auto mb-2 animate-pulse" />
            ) : (
              <ImageIcon className="w-12 h-12 text-yt-textSec mx-auto mb-2 animate-pulse" />
            )}
            <p className="text-yt-textSec text-sm">
              {mode === "video" 
                ? "AI is creating your video (30-60 sec)..." 
                : "AI is creating your image..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
