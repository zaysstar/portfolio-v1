"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Standard Next.js Link component
import ProjectModal from './components/ProjectModal';
import ContactTerminal from './components/ContactTerminal';

// --- OOP SKILL: Project Data ---
class Project {
  constructor(title, description, longDescription, techStack, link, repoId, image, gallery = []) {
    this.title = title;
    this.description = description;
    this.longDescription = longDescription;
    this.techStack = techStack;
    this.link = link;
    this.repoId = repoId;
    this.image = image;
    this.gallery = gallery; // <--- The new key
  }
}

// --- YOUR REAL PORTFOLIO DATA ---
const myProjects = [
  new Project(
    "Crewmate Creator",
    "A full-stack character creation tool, based on the characters and various colors in the popular video game, 'Among Us'. Features custom asset selection and real-time state management.",
    "Mission Objective: Create a highly interactive character editor. I reverse-engineered the Among Us art style to build a vector-based asset system. Key challenges included managing complex state updates for color layering and implementing real-time preview rendering.",
    ["ReactJS", "Vite", "Firebase"],
    "https://github.com/zaysstar/codepath-crewmate-creator",
    "codepath-crewmate-creator",
    "/crewmate-gameplay.gif",
  ),

  new Project(
    "React Flashcards",
    "Interactive study application (currently based on general knowledge about food and nutrition) designed for rapid memory retention. Built with component-based architecture.",
    "Mission Objective: Develop a flashcard app that allows users to create, review, and test themselves on various topics. Implemented spaced repetition algorithms to optimize learning efficiency and integrated local storage for persistent user data.",
    ["ReactJS", "CSS Modules", "State Management"],
    "https://github.com/zaysstar/flipcard",
    "flipcard"
  ),

  new Project(
    "Python Security API",
    "The backend powering this portfolio. Uses Pandas to analyze simulated threat logs and server diagnostics in real-time.",
    "Mission Objective: Build a secure API that processes and analyzes system logs to identify potential security threats. Leveraged Pandas for data manipulation and analysis, and implemented RESTful endpoints to serve processed data to the frontend.",
    ["Python", "Pandas", "NextJS"],
    "https://github.com/zaysstar/portfolio-v1",
    "portfolio-v1"
  ),

  new Project(
    "Epic Games Externship",
    "Selected for the intensive Epic Games Externship. Focused on environment design and Unreal Engine 5 workflows.",
    "I was selected for this highly competitive externship program where I worked directly with Unreal Engine 5. My primary focus was on 'World Building' and level design. I utilized Blueprints for gameplay logic and Lumen for real-time global illumination. I collaborated with a team to prototype a playable environment, learning industry-standard version control (Perforce) and asset pipeline management along the way.",
    ["Unreal Engine 5", "Blueprints", "C++", "Level Design"],
    "https://www.epicgames.com", // Link to Epic or your specific showcase
    "epic-externship", // No GitHub repo for this, date will show "OFFLINE" or "N/A"
    "/epic.svg", // <--- Main Hero Image (Put this in public folder)
    [
        "/epic.svg", // <--- Gallery Image 1 (Put in public folder)
        "/extern.jpg", // <--- Gallery Image 2 (Put in public folder)
    ]
  ),

];


export default function Home() {
  const [systemStatus, setSystemStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeProject, setActiveProject] = useState(null);

  // --- TYPEWRITER LOGIC ---
  const [displayText, setDisplayText] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const names = ["video game developer", "software developer", "business analyst"];
  const typingSpeed = isDeleting ? 30 : 100;

  useEffect(() => {
    const handleTyping = () => {
      const currentName = names[nameIndex];
      if (!isDeleting) {
        setDisplayText(currentName.substring(0, displayText.length + 1));
        if (displayText === currentName) {
          setTimeout(() => setIsDeleting(true), 500); // Pause at end
        }
      } else {
        setDisplayText(currentName.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setNameIndex((prev) => (prev + 1) % names.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, nameIndex, typingSpeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // Updates 'currentTime' every second
    }, 1000);

    // Cleanup: Stop the timer if the user leaves the page
    return () => clearInterval(timer);
  }, []);

  // TIME HELPER: Formats UTC to Viewer's Local Date & Time
  const formatTime = (dateObj) => {
    if (!dateObj) return "SYNCING...";
    
    return dateObj.toLocaleString(undefined, { 
      weekday: "long",
      day: '2-digit',
      month: 'long', 
      year: 'numeric',
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit', // <--- Added seconds!
      hour12: true,

      timeZoneName: 'short' 
    });
  };

  // Load Python Data
  useEffect(() => {
    fetch('/api/index')
      .then((res) => res.json())
      .then((data) => setSystemStatus(data))
      .catch((err) => console.error("Failed to fetch python data", err));
  }, []);

  const marqueeStyle = (
    <style jsx global>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-scroll {
        animation: scroll 30s linear infinite;
      }
    `}</style>
  );

  const footerMessages = [
    "Welcome to Zay's Terminal!",
    "New Project Available: Epic Games Externship",
    "Current Location: Denmark, SC",
    "Status: ONLINE",
    "Enjoy the coding vibes!",
    "Contact me for collaborations!",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#007474]/40 pb-20">
      
      {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center pt-24 pb-12 px-4">
          
          {/* LIVE STATUS BOX (Stays at the very top center) */}
          <div className="mb-12 p-4 bg-black/40 border border-green-900/50 rounded-lg max-w-lg w-full backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.05)]">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-3 text-center">System Metrics</p>
            {systemStatus ? (
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="flex items-center gap-2 text-green-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {systemStatus.status}
                </span>
                <span className="text-slate-400 tracking-tighter tabular-nums">
                  {formatTime(currentTime)}
                </span>
              </div>
            ) : (
              <div className="animate-pulse text-xs text-green-900 font-mono italic text-center">ESTABLISHING SECURE UPLINK...</div>
            )}
          </div>

          {/* MAIN CONTENT WRAPPER: This creates the Side-by-Side layout */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl w-full justify-center">
            
            {/* LEFT: CIRCULAR IMAGE AREA */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-900">
                <img 
                  src="/izayah-rahming.jpg" 
                  alt="Izayah Rahming"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* RIGHT: TEXT & TECH STACK AREA */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
                izayah <span className="text-slate-600 font-light">rahming.</span>
              </h1>
              
              <div className="max-w-xl mb-8">
                <p className="text-slate-200 text-lg md:text-xl font-medium mb-2">
                  cs + cyber student @ voorhees university
                </p>
                
                <p className="text-slate-200 text-lg md:text-xl font-medium mb-2">
                  <span className="text-white-400 font-mono"> aspiring |{displayText}<span className="blinking-cursor">|</span></span>
                </p>

                <p className="text-slate-500 text-sm md:text-base lowercase font-mono">
                  colorstack || codepath || extern || NSBE || NABA
                </p>
              </div>

            {/* --- RESTORED 3DS TECH STACK --- */}
          {/* 'p-4' adds headroom so the jump animation doesn't get cut off. '-ml-4' realigns it to the left. */}
          <div className="w-full pb-4 mb-8 custom-scrollbar p-4 -ml-4">
             <div className="flex gap-3">
               {[
                 // Systems & Game Dev (Red/Orange)
                 { name: "C++", color: "bg-red-900 border-red-500" },
                 { name: "UE5", color: "bg-orange-800 border-orange-500" },
                 
                 // Backend & Data (Amber/Yellow/Green)
                 { name: "Postgres", color: "bg-amber-800 border-amber-500" },
                 { name: "Python", color: "bg-yellow-700 border-yellow-400" },
                 { name: "Pandas", color: "bg-lime-800 border-lime-500" },
                 { name: "TensorFlow", color: "bg-green-800 border-green-500" },
                 
                 // Frontend & Web (Teal/Cyan/Blue)
                 { name: "ReactJS", color: "bg-teal-800 border-teal-400" },
                 { name: "NextJS", color: "bg-cyan-900 border-cyan-500" },
                 { name: "Tailwind", color: "bg-sky-800 border-sky-400" },
                 
                 // Typed Languages (Blue/Indigo)
                 { name: "TypeScript", color: "bg-blue-800 border-blue-500" },
                 { name: "Kotlin", color: "bg-indigo-800 border-indigo-400" }
               ].map((skill, i) => (
                 <div key={i} className="group relative flex-shrink-0 w-20 h-20 cursor-pointer">
                   
                   {/* The Cartridge / App Icon */}
                   <div className={`w-full h-full rounded-lg border-t-1 border-l-1 border-r-1 border-b-2 ${skill.color} shadow-lg flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shadow-[0_4px_0_rgba(0,0,0,0.5)] transition-transform duration-200 group-hover:-translate-y-2 group-hover:shadow-[0_8px_0_rgba(0,0,0,0.5)] z-10 relative`}>
                     <span className="drop-shadow-md text-center px-1">{skill.name}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>

            </div>
          </div>
        </section>

      
      {/* PROJECTS GRID */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 italic">
          <span className="w-1 h-6 bg-green-500"></span>
          PROJECT SHOWCASE
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {myProjects.map((project, index) => (
            // 5. CHANGE Link TO div + onClick
            <div 
                key={index} 
                onClick={() => setActiveProject(project)} // <--- Open Modal
                className="group cursor-pointer p-6 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-green-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] block"
            >
              {/* ... (Keep card content exactly the same) ... */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-green-400 transition-colors">{project.title}</h3>
                <span className="text-[9px] text-green-500 font-mono bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                  {systemStatus ? (systemStatus.repo_dates?.[project.repoId] || "OFFLINE") : "SYNC..."}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 h-16 overflow-hidden">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="text-[9px] font-mono py-0.5 px-2 rounded bg-slate-950 text-slate-500 border border-slate-700 uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    
    {/* NAVIGATION GRID (The 4 Colored Cards) */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        
        {/* GRID: 1 col mobile, 2 cols tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          
          {/* 1. RED CARD (Stats) - MOVED TO FIRST POSITION */}
          <Link href="/bio-statss" className="group block relative overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-red-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              <div className="w-14 h-14 bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform duration-300 relative z-10">
                 <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div className="text-center z-10">
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-red-400 tracking-tight">CHARACTER STATS</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Bio, Skills & Traits</p>
              </div>
          </Link>

          {/* 2. BLUE CARD (Leadership) */}
          <Link href="/quest-log" className="group block relative overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              <div className="w-14 h-14 bg-blue-900/20 rounded-full flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform duration-300 relative z-10">
                 <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div className="text-center z-10">
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 tracking-tight">LEADERSHIP LOG</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Officer Roles & Involvement</p>
              </div>
          </Link>

          {/* 3. YELLOW CARD (Achievements) */}
          <Link href="/achievements" className="group block relative overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-yellow-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              <div className="w-14 h-14 bg-yellow-900/20 rounded-full flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform duration-300 relative z-10">
                 <svg className="w-7 h-7 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <div className="text-center z-10">
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-yellow-400 tracking-tight">ACHIEVEMENTS</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Honors, Awards & Medals</p>
              </div>
          </Link>

          {/* 4. PURPLE CARD (Comms) */}
          <Link href="/comms" className="group block relative overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center gap-4 transition-all hover:border-purple-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              {/* Purple Grid BG */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
              
              <div className="w-14 h-14 bg-purple-900/20 rounded-full flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition-transform duration-300 relative z-10">
                 {/* Satellite Icon */}
                 <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                 </svg>
              </div>

              <div className="text-center z-10">
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-purple-400 tracking-tight">COMMS RELAY</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Connect & Socials</p>
              </div>
          </Link>

        </div>
      </section>

  {/* PANDAS ANALYTICS & LOGS */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        
        {/* Analytics Header */}
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <span className="text-blue-500">pandas</span> DataFrames Analysis
            </h3>
            {systemStatus && (
                 <div className="text-xs font-mono text-slate-500">
                    THREAT SCORE: 
                    <span className={systemStatus?.analytics?.threat_score > 50 ? "text-red-500" : "text-green-500"}>
                    {systemStatus?.analytics?.threat_score || 0}%
                    </span>
                 </div>
            )}
        </div>

        
        {/* The Terminal */}
        <div className="bg-black border border-slate-800 rounded-lg overflow-hidden font-mono text-sm shadow-2xl">
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="ml-2 text-xs text-slate-500">df_analysis.py</span>
                </div>
            </div>
            
            <div className="p-4 grid md:grid-cols-2 gap-8">
                {/* Column 1: The Raw Logs */}
                <div className="space-y-2 h-40 overflow-y-auto pr-2 border-r border-slate-900">
                    <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Recent DataFrame Head(5)</div>
                    
                    {/* CRITICAL FIX: The safety check (|| []) prevents the crash */}
                    {(systemStatus?.security_logs || []).length > 0 ? (
                        systemStatus.security_logs.map((log, i) => (
                            <div key={i} className="flex gap-2 text-xs">
                                <span className="text-slate-600">[{log.timestamp}]</span>
                                <span className={
                                    log.type === 'CRITICAL' ? 'text-red-500 font-bold' : 
                                    log.type === 'WARN' ? 'text-yellow-500' : 
                                    'text-green-500'
                                }>{log.type}</span>
                                <span className="text-slate-400 truncate">{log.msg}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-slate-600 animate-pulse text-xs">
                           {systemStatus ? "Backend Error: Check logs" : "Loading..."}
                        </div>
                    )}
                </div>

                {/* Column 2: The Aggregated Stats */}
                <div>
                     <div className="text-xs text-slate-500 mb-4 uppercase tracking-wider">Event Distribution (Value_Counts)</div>
                     {systemStatus?.analytics?.distribution ? Object.entries(systemStatus.analytics.distribution).map(([type, count]) => (
                        <div key={type} className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-300">{type}</span>
                                <span className="text-slate-500">{count} events</span>
                            </div>
                            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${
                                        type === 'CRITICAL' ? 'bg-red-500' : 
                                        type === 'WARN' ? 'bg-yellow-500' : 
                                        'bg-blue-500'
                                    }`} 
                                    style={{ width: `${(count / 20) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                     )) : <div className="text-xs text-slate-500">Waiting for data...</div>}
                </div>
            </div>
        </div>
      </section>

    {/* 6. RENDER THE MODAL AT THE BOTTOM */}
      <ProjectModal 
        project={activeProject} 
        isOpen={!!activeProject} 
        onClose={() => setActiveProject(null)} 
      />

    {/* E-SHOP MARQUEE FOOTER */}
      {marqueeStyle}
      
      <div className="fixed bottom-0 left-0 w-full h-8 bg-slate-900 border-t border-green-500/30 flex items-center overflow-hidden z-50">
        <div className="animate-scroll whitespace-nowrap flex gap-8 text-xs font-mono text-green-500/70 uppercase tracking-widest">
            
            {/* The Magic: We spread the array twice to create the seamless loop */}
            {[...footerMessages, ...footerMessages].map((msg, index) => (
                <span key={index} className="flex items-center gap-8">
                    {msg}
                    <span className="text-green-900">///</span>
                </span>
            ))}

        </div>
      </div>

        </main>
      );
    }