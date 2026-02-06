import Link from 'next/link';

export default function AchievementsPage() {
  
  // --- ACHIEVEMENT DATA ---
  // NOTE: Add your certificate/medal images to /public/images/ for the badges to work!
  const achievements = [
    // --- COMPETITIVE WINS ---
    {
      levels: ["1ST_PLACE_TROPHY 🏆", "CYBER_SECURITY"],
      title: "ADMI Symposium 2025 Champion",
      org: "ADMI (Association of Computer Science Departments at Minority Institutions)",
      date: "March 18th, 2025",
      desc: "Secured 1st Place in the Team Cybersecurity Competition against multiple universities (FAMU, NCCU, Spelman). Demonstrated advanced threat detection and defense strategies under time pressure.",
      loot: ["Gold Medal", "Cyber Defense", "Teamwork"],
      image: "/images/admi-medal.jpg" 
    },

    // --- ACADEMIC HONORS ---
    {
      levels: ["ACADEMIC_EXCELLENCE", "MAX_STATS"],
      title: "University Scholastic Honors",
      org: "Voorhees University",
      date: "2023 - Present",
      desc: "Consistently recognized for superior academic performance. Maintained a 3.73 Major GPA while balancing leadership roles.",
      loot: ["President's List (1x)", "Dean's List (5x)", "Academic Medals (2x)"],
      image: "/images/academic-awards.jpg"
    },
    {
      levels: ["HONOR_SOCIETY", "ELITE_MEMBER"],
      title: "Alpha Kappa Mu Honors Society | Mu Epsilon Chapter",
      org: "W. Franklin Evans Honors College",
      date: "March 2025",
      desc: "Inducted into the prestigious national honor society for juniors and seniors with a GPA of 3.3 or higher. Represents the top tier of scholarly achievement.",
      loot: ["Scholastic Discipline", "High GPA"],
      image: null
    },

    // --- TECHNICAL CERTIFICATIONS (CODEPATH) ---
    {
      levels: ["CERTIFICATION", "DISTINCTION"],
      title: "CodePath Web Development Honors",
      org: "CodePath",
      date: "Fall 2025",
      desc: "Awarded 'Honors' distinction for Intro to Web Development (WEB101). Completed multiple rigorous technical tracks to master modern software development standards.",
      loot: ["React Certificate", "Android Certificate", "Honors Status"],
      image: "/images/codepath-cert.jpg",
      
      // --- UPDATED SUB-QUESTS WITH LINKS ---
      // Replace the '#' with your actual certificate URLs
      subQuests: [
        { 
            title: "WEB101: Intro to Web Development (HONORS)", 
            date: "Certified",
            url: "https://www.codepath.org/" // <--- PASTE REAL LINK HERE
        },
        { 
            title: "TIP102: Intermediate Technical Interview Prep", 
            date: "Certified",
            url: "#" 
        },
        { 
            title: "WEB102: Intermediate Web Development", 
            date: "Certified",
            url: "#" 
        },
        { 
            title: "AND101: Intro to Android Development", 
            date: "Certified",
            url: "#" 
        }
      ]
    },

    // --- EXTERNSHIPS ---
    {
      levels: ["INDUSTRY_SELECTION", "RARE_DROP"],
      title: "Epic Games Externship",
      org: "Epic Games / HBCU Direct",
      date: "Aug 2025 - Oct 2025",
      desc: "Selected from a competitive national pool of HBCU students for specialized training in Unreal Engine 5 and 3D Interactive Design.",
      loot: ["Unreal Engine 5", "World Building", "Asset Pipeline"],
      image: "/epic.svg"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#007474]/40 pb-20 p-4 md:p-12">
      
      {/* HEADER */}
      <header className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
                ACHIEVEMENTS <span className="text-yellow-500">.log</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm">
                DECRYPTING TROPHY_CASE & AWARDS...
            </p>
        </div>

        <Link href="/" className="group flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-700 rounded hover:border-green-500 transition-all">
            <span className="text-slate-400 group-hover:text-green-400 text-sm font-mono">&lt; RETURN_TO_BASE</span>
        </Link>
      </header>

      {/* TIMELINE CONTENT */}
      <section className="max-w-4xl mx-auto">
        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12 pb-4">
          {achievements.map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              
              {/* THE NODE (Gold for Trophies) */}
              <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-slate-900 bg-yellow-500 group-hover:bg-yellow-400 group-hover:shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all z-10`}></div>

              {/* CARD CONTAINER */}
              <div className="flex flex-col md:flex-row gap-6 bg-slate-900/30 p-6 rounded-lg border border-slate-800 hover:border-yellow-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-slate-900/60 items-center md:items-start">
                
                {/* LEFT SIDE: TEXT CONTENT */}
                <div className="flex-1 w-full">
                  
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {item.levels.map((lvl, i) => (
                      <span key={i} className="text-[10px] font-mono text-yellow-500 border border-yellow-500/30 px-1 rounded uppercase tracking-wider">
                        {lvl}
                      </span>
                    ))}
                    <span className="text-xs text-slate-500 font-mono ml-1">
                      {item.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-sm text-green-500 font-mono mb-3">
                    @{item.org}
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.loot.map((lootItem, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-black border border-slate-700 text-slate-500 font-mono group-hover:border-yellow-500/30 group-hover:text-yellow-500/70 transition-colors">
                        {lootItem}
                      </span>
                    ))}
                  </div>

                  {/* --- UPDATED SUB-QUESTS RENDER LOGIC --- */}
                  {item.subQuests && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50 w-full">
                        <div className="text-[10px] text-slate-600 font-mono uppercase mb-3 tracking-widest">Unlocked Certificates:</div>
                        <div className="space-y-3">
                            {item.subQuests.map((sub, j) => {
                                
                                // Internal Content (Reused for Link or Div)
                                const content = (
                                  <>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-500 text-xs">📜</span>
                                        <span className="text-xs text-slate-300 font-mono group-hover/sub:text-yellow-200 transition-colors">
                                            {sub.title}
                                        </span>
                                        {/* External Link Icon (Only shows if url exists) */}
                                        {sub.url && (
                                            <svg className="w-3 h-3 text-slate-600 group-hover/sub:text-yellow-500 opacity-0 group-hover/sub:opacity-100 transition-all -translate-x-2 group-hover/sub:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-600 sm:ml-auto">{sub.date}</span>
                                  </>
                                );

                                // Styling classes
                                const baseClasses = "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 bg-black/40 px-3 py-2 rounded border border-slate-800 w-full transition-colors group/sub z-10 relative";
                                const hoverClasses = sub.url ? "hover:border-yellow-500/50 hover:bg-slate-900 cursor-pointer" : "hover:border-green-500/30";

                                return (
                                    <div key={j} className="flex items-center gap-3 relative pl-4">
                                        {/* Connector Lines */}
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-slate-600"></div>
                                        <div className="absolute left-0 top-0 bottom-1/2 w-[1px] bg-slate-600"></div>

                                        {/* Render as Link if URL exists, otherwise Div */}
                                        {sub.url ? (
                                            <a href={sub.url} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${hoverClasses}`}>
                                                {content}
                                            </a>
                                        ) : (
                                            <div className={`${baseClasses} ${hoverClasses}`}>
                                                {content}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                  )}

                </div>

                 {/* RIGHT SIDE: SPINNING BADGE */}
                 {item.image && (
                  <div className="shrink-0 relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-slate-800 to-slate-950 border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 rounded-full border-[2px] border-yellow-500/10 border-t-yellow-500/80 animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative z-10">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                          />
                      </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}