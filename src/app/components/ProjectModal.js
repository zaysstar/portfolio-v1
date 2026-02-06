import { useState, useEffect } from 'react';

// --- HELPER: Typewriter Component ---
const TypewriterText = ({ text, speed = 50, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let timer;
    let startTimeout;
    setDisplayedText("");
    
    startTimeout = setTimeout(() => {
      let i = 0;
      let currentText = "";
      timer = setInterval(() => {
        if (i < text.length) {
          currentText += text.charAt(i);
          setDisplayedText(currentText);
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay]);

  return <span className={className}>{displayedText}</span>;
};

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all" onClick={onClose}>
      
      <div 
        className="relative w-full max-w-4xl bg-slate-900/95 border border-green-500/30 rounded-xl shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <h2 className="text-xl font-bold text-slate-100 font-mono tracking-tight ml-2">
                    ./{project.repoId.substring(0, 50)}
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
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                
                {/* LEFT: Main Content */}
                <div className="md:w-3/5">
                    
                    {/* Hero Image Banner */}
                    <div className="w-full h-48 bg-slate-950 border border-slate-800 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden group shadow-lg">
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none"></div>
                        {project.image ? (
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                           <div className="text-green-500/40 font-mono text-4xl font-bold">
                             <TypewriterText text="NO_SIGNAL" speed={100} delay={200} />
                             <span className="animate-pulse">_</span>
                           </div>
                        )}
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-bold text-white font-mono leading-tight">
                            <TypewriterText text={project.title} speed={40} />
                            <span className="animate-pulse text-green-500">_</span>
                        </h3>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {project.longDescription || project.description}
                        </p>
                    </div>
                </div>

                {/* RIGHT: Evidence Gallery (Spinning Badges in Grid) */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="md:w-2/5 flex flex-col gap-4 pt-2">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                             <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Visual Evidence</h4>
                             <span className="text-[10px] font-mono text-green-500/50">{project.gallery.length} BADGES</span>
                        </div>
                        
                        {/* FIXES:
                           1. 'overflow-y-auto': Scrollbar only shows if content exceeds max-h.
                           2. 'p-4': Added padding inside the scroll area so badges don't touch edges.
                           3. 'max-h-[500px]': Defines the limit.  max-h-full p-4 custom-scrollbar place-items-center
                        */}
                        <div className="grid grid-cols-2 gap-6 p-4 place-items-center">
                            {project.gallery.map((imgUrl, idx) => (
                                <div key={idx} className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-br from-slate-800 to-slate-950 border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)] flex items-center justify-center group shrink-0 cursor-pointer transition-transform hover:scale-105">
                                    {/* Spinning Ring Effect */}
                                    <div className="absolute inset-0 rounded-full border-[2px] border-green-500/10 border-t-green-500/80 animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                    
                                    {/* The Image inside the circle */}
                                    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative z-10">
                                        <img src={imgUrl} alt={`Evidence ${idx}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* TECH STACK */}
            <div className="mb-2 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-mono text-slate-500 mb-3 uppercase tracking-wider">Tech_Stack_Manifest:</h4>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-900/50 text-green-400 text-xs rounded border border-green-900/30 font-mono tracking-wide">
                            [{tech}]
                        </span>
                    ))}
                </div>
            </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-700/50 bg-slate-900 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-mono">
                [CLOSE_WINDOW]
            </button>
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