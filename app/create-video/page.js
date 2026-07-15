"use client";

import { useState } from "react";
import { Sparkles, Video, Wand2 } from "lucide-react";

export default function CreateVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = ["Cinematic", "Anime", "Realistic", "3D Render", "Cartoon"];

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    try {
      // Using FREE video API
      const encodedPrompt = encodeURIComponent(prompt);
      const seed = Date.now();
      const videoUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=576&height=320&nologo=true&seed=${seed}&model=flux`;

      const newVideo = {
        id: Date.now(),
        prompt: prompt,
        style: selectedStyle,
        type: "video",
        date: new Date().toLocaleDateString(),
        url: videoUrl,
        thumbnail: videoUrl
      };
      
      const oldVideos = JSON.parse(localStorage.getItem('bmy_videos') || '[]');
      oldVideos.unshift(newVideo);
      localStorage.setItem('bmy_videos', JSON.stringify(oldVideos));
      
      window.location.href = '/library';
    } catch (error) {
      alert("Failed to generate video: " + error.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-yt-bg pb-24 pt-16 px-4">
      <h1 className="text-2xl font-bold text-yt-text mb-6 flex items-center gap-2">
        <Video className="text-yt-red w-7 h-7" /> AI Video Generator
      </h1>

      {/* Prompt Text Area */}      <div className="mb-6">
        <label className="text-yt-textSec text-sm mb-2 block">Describe your video:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cinematic drone shot flying over a futuristic cyberpunk city at night with neon lights..."
          className="w-full h-32 bg-yt-surface text-yt-text p-4 rounded-xl border border-yt-border focus:outline-none focus:border-yt-red resize-none"
        />
      </div>

      {/* Style Selection */}
      <div className="mb-8">
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

      {/* Info Box */}
      <div className="bg-yt-surface/50 border border-yt-border rounded-xl p-4 mb-8">
        <p className="text-yt-textSec text-sm">
          💡 <strong>Tip:</strong> Be specific in your description for better results. Include details about lighting, camera angles, and mood.
        </p>
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
            Generating Video...
          </>
        ) : (
          <>            <Sparkles className="w-5 h-5" />
            Generate Video
          </>
        )}
      </button>

      {isGenerating && (
        <div className="mt-8 w-full aspect-video bg-yt-surface rounded-xl flex items-center justify-center border border-yt-border">
          <div className="text-center">
            <Video className="w-12 h-12 text-yt-textSec mx-auto mb-2 animate-pulse" />
            <p className="text-yt-textSec text-sm">AI is creating your video...</p>
          </div>
        </div>
      )}
    </div>
  );
}
