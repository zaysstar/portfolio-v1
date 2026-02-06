"use client";
import { useState } from 'react';

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  const playlistId = "4dqhQirfTOwN3lNY8TbUP6"; 

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      
      {/* THE PLAYER (Only shows when open) */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-slate-900 border border-green-500/50 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)] p-2 w-80">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] font-mono text-green-500 animate-pulse">
              ● AUDIO_STREAM_ACTIVE
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              VOL: 100%
            </span>
          </div>

          {/* Spotify Iframe */}
          <iframe 
            style={{ borderRadius: "12px" }} 
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" 
            loading="lazy"
            className="shadow-inner"
          ></iframe>
        </div>
      </div>

      {/* THE TOGGLE BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 bg-slate-900 border border-slate-700 hover:border-green-500 text-slate-300 px-4 py-2 rounded-full shadow-lg transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:-translate-y-1"
      >
        <div className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-slate-500"}`}></div>
        <span className="text-xs font-mono font-bold tracking-wider group-hover:text-green-400">
          {isOpen ? "CLOSE_PLAYER" : "MUSIC_PLAYER"}
        </span>
        
        {/* Simple Icon */}
        <svg className="w-4 h-4 text-slate-400 group-hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      </button>

    </div>
  );
}