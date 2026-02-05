import { useState, useEffect } from 'react';

export default function ProjectModal({ project, isOpen, onClose }) {
  // 1. State for the animated title
  const [displayedTitle, setDisplayedTitle] = useState("");

  // 2. The Typewriter Logic
  useEffect(() => {
    let timer;
    
    if (isOpen && project) {
      setDisplayedTitle(""); // Clear previous text immediately
      let i = 0;
      const text = project.title;
      
      // We use a local variable to track the current string 
      // instead of relying solely on the state 'prev' to avoid race conditions
      let currentText = ""; 

      timer = setInterval(() => {
        if (i < text.length) {
          currentText += text.charAt(i);
          setDisplayedTitle(currentText);
          i++;
        } else {
          clearInterval(timer);
        }
      }, 40);
    }

    // CLEANUP: This stops the "shuffling" by killing the old timer 
    // before a new one starts.
    return () => {
      if (timer) clearInterval(timer);
      setDisplayedTitle(""); 
    };
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all" onClick={onClose}>
      
      <div 
        className="relative w-full max-w-2xl bg-slate-900/90 border border-green-500/30 rounded-xl shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <h2 className="text-xl font-bold text-slate-100 font-mono tracking-tight ml-2">
                    ./{project.repoId.substring(0, 100)}
                </h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-red-400 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
            
            {/* HERO IMAGE */}
            <div className="w-full h-48 bg-slate-950 border border-slate-800 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
                {project.image ? (
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                   <div className="text-green-500/40 font-mono text-4xl font-bold">NO_SIGNAL</div>
                )}
            </div>

            {/* TITLE & SYNC STATUS */}
            <div className="flex justify-between items-start mb-4">
                {/* 3. ANIMATED TITLE HERE */}
                <h3 className="text-3xl font-bold text-white font-mono">
                    {displayedTitle}
                    <span className="animate-pulse text-green-500">_</span>
                </h3>
                
                <span className="text-xs font-mono text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-500/30">
                    STATUS: ACTIVE
                </span>
            </div>

            {/* LONG DESCRIPTION */}
            <div className="prose prose-invert max-w-none mb-6">
                <p className="text-slate-300 leading-relaxed">
                    {project.longDescription || project.description}
                </p>
            </div>

            {/* TECH STACK */}
            <div className="mb-8">
                <h4 className="text-sm font-mono text-slate-500 mb-2 uppercase tracking-wider">Tech_Stack_Manifest:</h4>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-800 text-blue-300 text-xs rounded border border-blue-500/20 font-mono">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-700/50 bg-slate-900 flex justify-end gap-3">
            <a 
                href={project.link} 
                target="_blank" 
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded text-sm font-mono transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
                INITIALIZE_REPO &rarr;
            </a>
        </div>

      </div>
    </div>
  );
}