"use client"; // This is required for fetching data in Next.js App Router

import { useState, useEffect } from 'react';

// --- OOP SKILL: Project Data ---
class Project {
  constructor(title, description, techStack) {
    this.title = title;
    this.description = description;
    this.techStack = techStack;
  }
}

const myProjects = [
  new Project("Cybersecurity Dashboard", "A real-time dashboard tracking network anomalies.", ["Python", "React"]),
  new Project("High-Performance Calc", "Logic module compiled to WebAssembly.", ["C++", "Wasm"]),
  new Project("Portfolio V1", "Personal website deployed via Vercel.", ["Next.js", "Tailwind"]),
];

export default function Home() {
  // --- REACT STATE SKILL ---
  // Store the Python data here
  const [systemStatus, setSystemStatus] = useState(null);

  // Fetch data from Python API when the page loads
  useEffect(() => {
    fetch('/api/index')
      .then((res) => res.json())
      .then((data) => setSystemStatus(data))
      .catch((err) => console.error("Failed to fetch python data", err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500/30">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
        
        {/* LIVE PYTHON STATUS INDICATOR */}
        <div className="mb-8 p-4 bg-black/40 border border-green-900 rounded-lg max-w-sm w-full backdrop-blur-sm">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Server Status (Python API)</p>
          
          {systemStatus ? (
            <div className="flex justify-between items-center font-mono text-sm">
              <span className="text-green-400">● {systemStatus.status}</span>
              <span className="text-slate-400">{systemStatus.system_time}</span>
            </div>
          ) : (
            <div className="animate-pulse text-xs text-green-900">ESTABLISHING UPLINK...</div>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          Izayah <span className="text-slate-600">Rahming</span>
        </h1>
        <p className="max-w-xl text-slate-400 text-lg md:text-xl mb-8">
          Computer Science & Cybersecurity Student.
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-green-900/20 border border-green-700/50 text-green-400 rounded text-sm font-mono">React.js</span>
            <span className="px-4 py-2 bg-blue-900/20 border border-blue-700/50 text-blue-400 rounded text-sm font-mono">Python</span>
            <span className="px-4 py-2 bg-purple-900/20 border border-purple-700/50 text-purple-400 rounded text-sm font-mono">C++</span>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
          <span className="w-2 h-8 bg-green-500 rounded-sm"></span>
          Selected Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myProjects.map((project, index) => (
            <div key={index} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-green-500/50 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
              <p className="mt-2 text-slate-400 text-sm h-16">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="text-[10px] font-mono py-1 px-2 rounded bg-slate-950 text-slate-400 border border-slate-800">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}