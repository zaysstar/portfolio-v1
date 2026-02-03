"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Standard Next.js Link component

// --- OOP SKILL: Project Data ---
class Project {
  constructor(title, description, techStack, link) {
    this.title = title;
    this.description = description;
    this.techStack = techStack;
    this.link = link;
  }
}

// --- YOUR REAL PORTFOLIO DATA ---
const myProjects = [
  new Project(
    "Crewmate Creator",
    "A full-stack character creation tool using React and Firebase. Features custom asset selection and real-time state management.",
    ["React", "Firebase", "Vite"],
    "https://github.com/zaysstar/codepath-crewmate-creator" // Hypothetical link based on username
  ),
  new Project(
    "Python Security API",
    "The backend powering this portfolio. Uses Pandas to analyze simulated threat logs and server diagnostics in real-time.",
    ["Python", "Pandas", "Next.js API"],
    "https://github.com/zaysstar/portfolio-v1"
  ),
  new Project(
    "React Flashcards",
    "Interactive study application designed for rapid memory retention. Built with component-based architecture.",
    ["React.js", "CSS Modules", "State Management"],
    "https://github.com/zaysstar/flipcard" 
  ),
];

export default function Home() {
  const [systemStatus, setSystemStatus] = useState(null);

  // Load Python Data
  useEffect(() => {
    fetch('/api/index')
      .then((res) => res.json())
      .then((data) => setSystemStatus(data))
      .catch((err) => console.error("Failed to fetch python data", err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500/30 pb-20">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
        
        {/* LIVE PYTHON STATUS INDICATOR */}
        <div className="mb-8 p-4 bg-black/40 border border-green-900/50 rounded-lg max-w-sm w-full backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.05)]">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-3">Server Status</p>
          {systemStatus ? (
            <div className="flex justify-between items-center font-mono text-xs">
              <span className="flex items-center gap-2 text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {systemStatus.status}
              </span>
              <span className="text-slate-400 tracking-tighter">{systemStatus.system_time}</span>
            </div>
          ) : (
            <div className="animate-pulse text-xs text-green-900 font-mono italic">ESTABLISHING SECURE UPLINK...</div>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          Izayah <span className="text-slate-600 font-light">Rahming</span>
        </h1>
        <p className="max-w-xl text-slate-400 text-lg md:text-xl mb-8">
          Computer Science & Cybersecurity Student.
        </p>

        {/* Cleaned Tech Stack*/}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-green-900/20 border border-green-700/40 text-green-400 rounded text-sm font-mono hover:bg-green-900/40 transition">React.js</span>
            <span className="px-4 py-2 bg-blue-900/20 border border-blue-700/40 text-blue-400 rounded text-sm font-mono hover:bg-blue-900/40 transition">Python</span>
            <span className="px-4 py-2 bg-indigo-900/20 border border-indigo-700/40 text-indigo-400 rounded text-sm font-mono hover:bg-indigo-900/40 transition">Pandas</span>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 italic">
          <span className="w-1 h-6 bg-green-500"></span>
          SELECTED_REPOS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myProjects.map((project, index) => (
            <Link href={project.link} key={index} target="_blank" className="group p-6 bg-slate-900/40 border border-slate-800 rounded-xl hover:border-green-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] block">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-green-400 transition-colors">{project.title}</h3>
                <span className="text-[9px] text-green-500 font-mono bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                   {/* We assume these sync with the backend */}
                  {systemStatus ? `SYNC: ${systemStatus.last_sync}` : "..."}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 h-16 overflow-hidden">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="text-[9px] font-mono py-0.5 px-2 rounded bg-slate-950 text-slate-500 border border-slate-800 uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </Link>
          ))}
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
                    THREAT SCORE: <span className={systemStatus.analytics.threat_score > 50 ? "text-red-500" : "text-green-500"}>
                        {systemStatus.analytics.threat_score}%
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
                    {systemStatus ? systemStatus.security_logs.map((log, i) => (
                        <div key={i} className="flex gap-2 text-xs">
                            <span className="text-slate-600">[{log.timestamp}]</span>
                            <span className={
                                log.type === 'CRITICAL' ? 'text-red-500 font-bold' : 
                                log.type === 'WARN' ? 'text-yellow-500' : 
                                'text-green-500'
                            }>{log.type}</span>
                            <span className="text-slate-400 truncate">{log.msg}</span>
                        </div>
                    )) : <div className="text-slate-600 animate-pulse">Loading DataFrame...</div>}
                </div>

                {/* Column 2: The Aggregated Stats */}
                <div>
                     <div className="text-xs text-slate-500 mb-4 uppercase tracking-wider">Event Distribution (Value_Counts)</div>
                     {systemStatus ? Object.entries(systemStatus.analytics.distribution).map(([type, count]) => (
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
                     )) : null}
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}