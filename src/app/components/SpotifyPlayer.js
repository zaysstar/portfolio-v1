export default function SpotifyPlayer() {
  // REPLACE THIS with your specific playlist ID
  // Example: https://open.spotify.com/playlist/37i9dQZF1DX0SM0LYsmbMT
  // The ID is the part after /playlist/
  const playlistId = "4dqhQirfTOwN3lNY8TbUP6"; 

  return (
    <div className="fixed top-8 right-10 z-50 transition-all duration-300 hover:scale-105 opacity-50 hover:opacity-100">
      
      {/* THE SPEECH BUBBLE */}
      {/* 'hidden md:block' hides it on mobile so it doesn't cover the screen */}
      <div className="hidden md:block center bg-slate-900/90 border border-green-500/40 text-green-400 text-[5px] font-mono py-2 px-3 rounded shadow-[0_0_10px_rgba(34,197,94,0.2)]">
        <span className="animate-pulse">●</span> Coding mode: ON. Press PLAY to begin.
      </div>  
      <br></br>

      {/* The Glow Effect */}
      <div className="absolute -inset-1 bg-[#007474]/30 rounded-[15px] blur-md"></div>
      
      <iframe 
        style={{ borderRadius: "10px" }} 
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`} 
        width="350" 
        height="155" 
        frameBorder="0" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        className="fixed block border border-teal-900/20 shadow-xl bg-black"
      ></iframe>

    </div>
  );
}