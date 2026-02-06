"use client"; // Required for animations
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CharacterStatsPage() {
  
  // --- STATE FOR ANIMATIONS ---
  const [typedName, setTypedName] = useState("");
  const [chartLoaded, setChartLoaded] = useState(false);
  
  const fullName = "IZAYAH ANTHONY RAHMING";

  // --- CHARACTER STATS DATA ---
  const stats = [
    { label: "CODING", value: 90 },     
    { label: "DESIGN", value: 85 },     
    { label: "WRITING", value: 95 },    
    { label: "LEADERSHIP", value: 80 }, 
    { label: "TEAMWORK", value: 88 },   
    { label: "STRATEGY", value: 75 }    
  ];

  // --- ANIMATION EFFECTS ---
  useEffect(() => {
    setTimeout(() => setChartLoaded(true), 100);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setTypedName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const getPoint = (value, index, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = (value / 100) * 100;
    const x = 128 + radius * Math.cos(angle);
    const y = 128 + radius * Math.sin(angle);
    return `${x},${y}`;
  };

  const statPoints = stats.map((s, i) => getPoint(s.value, i, stats.length)).join(" ");
  const fullPoints = stats.map((s, i) => getPoint(100, i, stats.length)).join(" ");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#007474]/40 pb-20 p-4 md:p-12">
      
      {/* HEADER */}
      <header className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
                PLAYER PROFILE <span className="text-red-500">.bio</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm">
                ANALYZING SOUL_DATA & CORE_ATTRIBUTES...
            </p>
        </div>

        <Link href="/" className="group flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-700 rounded hover:border-green-500 transition-all">
            <span className="text-slate-400 group-hover:text-green-400 text-sm font-mono">&lt; RETURN_TO_BASE</span>
        </Link>
      </header>

      {/* CONTENT GRID */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: THE RADAR CHART */}
        <div className="relative flex justify-center items-center">
            {/* Background Glow */}
            <div className={`absolute w-64 h-64 bg-red-500/10 blur-[50px] rounded-full pointer-events-none transition-opacity duration-1000 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="relative w-80 h-80 md:w-96 md:h-96">
                <svg viewBox="0 0 256 256" className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                    {/* Background Grid */}
                    <polygon points={fullPoints} fill="none" stroke="#334155" strokeWidth="1" />
                    <polygon points={stats.map((s, i) => getPoint(66, i, stats.length)).join(" ")} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                    <polygon points={stats.map((s, i) => getPoint(33, i, stats.length)).join(" ")} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* ANIMATED STAT SHAPE */}
                    <g className={`origin-center transition-all duration-[1500ms] ease-out ${chartLoaded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                        <polygon 
                            points={statPoints} 
                            fill="rgba(239, 68, 68, 0.2)" 
                            stroke="#ef4444" 
                            strokeWidth="2" 
                            className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                        />
                        {stats.map((s, i) => {
                            const [x, y] = getPoint(s.value, i, stats.length).split(",");
                            return <circle key={i} cx={x} cy={y} r="3" fill="#ef4444" />;
                        })}
                    </g>

                    {/* LABELS */}
                    {stats.map((stat, i) => {
                        const [x, y] = getPoint(115, i, stats.length).split(",");
                        return (
                            <g key={i} className={`transition-opacity duration-700 delay-500 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
                                <text x={x} y={y} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle" className="uppercase tracking-widest font-bold">{stat.label}</text>
                                <text x={x} y={parseFloat(y) + 12} fill="#ef4444" fontSize="9" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">{stat.value}/100</text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>

        {/* RIGHT COLUMN: THE LORE (BIO) */}
        <div className="space-y-6">
            
            {/* LORE ENTRY CARD */}
            <div className="bg-slate-900/50 border border-red-500/30 p-6 rounded-lg relative overflow-hidden group hover:bg-slate-900/80 transition-colors">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-red-500/30"></div>

                <div className="flex items-center gap-4 mb-4">
                     
                     {/* --- UPDATED: PROFILE IMAGE PLACEHOLDER --- */}
                     {/* Replace '/images/profile-headshot.jpg' with your real file */}
                     <div className="w-14 h-14 bg-black rounded border border-red-500/50 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        <img 
                            src="/izayah-rahming.jpg" 
                            alt="Profile" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                     </div>

                     <div>
                        {/* TYPEWRITER NAME */}
                        <h2 className="text-xl font-bold text-white tracking-wide h-6 flex items-center">
                            {typedName}
                            <span className="animate-pulse text-red-500 ml-1">_</span>
                        </h2>
                        
                        <div className={`flex gap-2 text-[10px] font-mono uppercase text-red-400 transition-opacity duration-1000 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
                            <span>Lv. 21 Architect</span>
                            <span>•</span>
                            <span>Region: Bahamas / USA</span>
                        </div>
                     </div>
                </div>

                <div className={`transition-opacity duration-1000 delay-300 ${chartLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-slate-300 leading-relaxed font-light mb-4">
                        A specialized unit hailing from the Grand Bahama server, currently deployed in the South Carolina sector. Equipped with high-level <strong className="text-red-400">Creative Writing</strong> modules and core <strong className="text-red-400">Programming Logic</strong>.
                    </p>
                    <p className="text-slate-300 leading-relaxed font-light">
                        Primary objective: The synthesis of narrative design and software engineering. Whether compiling C++ code or drafting sci-fi manuscripts, the mission remains the same—to build worlds that immerse and inspire.
                    </p>
                </div>
            </div>

            {/* TRAIT TAGS */}
            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-500 ${chartLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded flex items-center gap-3 hover:border-red-500/30 transition-colors">
                    <span className="text-2xl">📚</span>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Specialty</div>
                        <div className="text-sm text-slate-200">Sci-Fi & Fantasy Writing</div>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded flex items-center gap-3 hover:border-red-500/30 transition-colors">
                    <span className="text-2xl">🎮</span>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Hobby</div>
                        <div className="text-sm text-slate-200">RPG & FPS Gaming</div>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded flex items-center gap-3 hover:border-red-500/30 transition-colors">
                    <span className="text-2xl">🇧🇸</span>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Origin</div>
                        <div className="text-sm text-slate-200">The Bahamas</div>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded flex items-center gap-3 hover:border-red-500/30 transition-colors">
                    <span className="text-2xl">🍳</span>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Side Skill</div>
                        <div className="text-sm text-slate-200">Fusion Cooking</div>
                    </div>
                </div>
            </div>

        </div>
      </section>

    </main>
  );
}