import Link from 'next/link';

export default function QuestLogPage() {
  
  // --- LEADERSHIP & INVOLVEMENT DATA ---
  // NOTE: Ensure you have these images in your /public/images/ folder!
  const leadershipQuests = [
    // --- TOP TIER: STUDENT GOVERNMENT ---
    {
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Co-Director of Communications and Digital Presence",
      org: "Better Blender Brothers",
      date: "Feb 2026 - present",
      desc: "Leading the charge in shaping and sharing the organization's narrative. Managing social media, crafting press releases, and ensuring our message resonates across campus.",
      loot: ["Leadership", "Budgeting", "Crisis Mgmt", "Public Speaking"],
      image: "/images/sga-team.jpg" 
    },
        {
      levels: ["CURRENT", "MEMBER_POSITION"],
      title: "Active Member",
      org: "M.A.L.E.S.",
      date: "January 2026 - present",
      desc: "Engaging in initiatives that promote general holisticness, academic excellence and cultural awareness among male students on campus.",
      loot: ["Leadership", "Budgeting", "Crisis Mgmt", "Public Speaking"],
      image: "/images/sga-team.jpg" 
    },
    {
      levels: ["CURRENT", "AMBASSADOR", "SPECIAL_UNIT"],
      title: "UNCF Student Ambassador",
      org: "United Negro College Fund",
      date: "November 2025 - present",
      desc: "Selected to represent the university student body. Organizing campus events and driving scholarship awareness to help peers secure funding.",
      loot: ["Networking", "Event Planning", "Advocacy", "Fundraising"],
      image: "/images/uncf-ambassador.jpg"
    },
    {
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Chaplain",
      org: "Student Veterans of America, VU Chapter",
      date: "Oct 2025",
      desc: "Selected for the top-tier leadership summit in Washington D.C. Focused on advocacy, policy, and organizational management for student veterans.",
      loot: ["Policy", "Federal Advocacy", "Team Building"],
      image: "/images/sva-dc-trip.jpg",
      
      subRoles: [
        { 
          levels: ["DELEGATE", "TRAVEL_QUEST"],
          title: "SVA Leadership Institute Fellow", 
          date: "Oct 2025",
          desc: "Selected for the top-tier leadership summit in Washington D.C. Focused on advocacy, policy, and organizational management for student veterans." 
        }
      ]
    },
    {
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Senior Class Vice President",
      org: "Student Government Association (SGA)",
      date: "Sep 2025 - Present",
      desc: "Serving as the strategic voice for the senior class. Bridging the gap between the student body and administration. Partnering with the President to orchestrate senior-focused events and manage budgets.",
      loot: ["Leadership", "Budgeting", "Crisis Mgmt", "Public Speaking"],
      image: "/images/sga-team.jpg",
      
      // --- NEW: PREVIOUS ROLES / SUB-LEVELS ---
      subRoles: [
        { 
          levels: ["MEMBER"],
          title: "Judicial Board - Student Representative", 
          date: "Jan 2024 - May 2025",
          desc: "Served on the disciplinary hearing panel to ensure fair due process for students." 
        }
      ]
    },
    {
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Multimedia Manager",
      org: "VU President's Student Advisory Board",
      date: "September 2025 - present",
      desc: "Managing multimedia content creation and distribution for the President's Student Advisory Board. Collaborating with the President's office to produce engaging visual and audio materials.",
      loot: ["Leadership", "Budgeting", "Crisis Mgmt", "Public Speaking"],
      image: "/images/sga-team.jpg" 
    },
    {
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Scholar - Year I",
      org: "Center for Financial Advancement (CFA)",
      date: "September 2025 - present",
      desc: "Receiving financial literacy training and mentorship through the CFA program.",
      loot: ["Finance", "Professionalism"],
      image: null
    },
    {
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Collegiate Member at-Large | Southern Region",
      org: "National Association of Black Accountants (NABA)",
      date: "July 2024 - Present",
      desc: "Participating in financial literacy workshops and professional development conferences.",
      loot: ["Finance", "Professionalism"],
      image: null
    },
    {
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Collegiate Member at-Large | Region II",
      org: "National Society of Black Engineers (NSBE)",
      date: "June 2024 - Present",
      desc: "Engaging in STEM outreach and engineering networking events.",
      loot: ["Engineering", "STEM Outreach"],
      image: null
    }
    ,
    {
      levels: ["OFFICER_POSITION"],
      title: "Recording Secretary",
      org: "W. Franklin Evans Honors Student Association",
      date: "May 2024 - May 2025",
      desc: "Coordinated communication between the executive board and the general body. Assisted the Dean in planning workshops and service projects that promoted academic excellence.",
      loot: ["Documentation", "Communication", "Logistics", "Canva"],
      image: null 
    },
    {
      levels: ["OFFICER_POSITION", "MENTOR"],
      title: "Peer Tutor & Recording Secretary",
      org: "VU A.C.E. Peer Tutoring Program",
      date: "Aug 2023 - Apr 2025",
      desc: "Delivered personalized academic support to 30+ CS/Cybersecurity students. Maintained accurate records of all tutoring operations and hours for the department.",
      loot: ["Mentorship", "Pedagogy", "Data Entry", "Record Keeping"],
      image: "/images/ace-tutoring.jpg"
    },
    
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#007474]/40 pb-20 p-4 md:p-12">
      
      {/* HEADER */}
      <header className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
                QUEST LOG <span className="text-blue-500">.lead</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm">
                LOADING LEADERSHIP_HISTORY & INVOLVEMENT...
            </p>
        </div>

        <Link href="/" className="group flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-700 rounded hover:border-green-500 transition-all">
            <span className="text-slate-400 group-hover:text-green-400 text-sm font-mono">&lt; RETURN_TO_BASE</span>
        </Link>
      </header>

      {/* TIMELINE CONTENT */}
      <section className="max-w-4xl mx-auto">
        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12 pb-4">
          {leadershipQuests.map((quest, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              
              {/* THE NODE (Blue Nodes) */}
              <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-slate-900 ${
                  index === 0 ? "bg-blue-500 animate-pulse" : "bg-slate-600 group-hover:bg-blue-500"
              } transition-colors z-10`}></div>

              {/* CARD CONTAINER */}
              <div className="flex flex-col md:flex-row gap-6 bg-slate-900/30 p-6 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-slate-900/60 items-center md:items-start">
                
                {/* LEFT SIDE: TEXT CONTENT */}
                <div className="flex-1 w-full">
                  {/* TAGS / LEVELS LOOP */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {quest.levels.map((lvl, i) => (
                      <span key={i} className="text-[10px] font-mono text-blue-500 border border-blue-500/30 px-1 rounded uppercase tracking-wider">
                        {lvl}
                      </span>
                    ))}
                    <span className="text-xs text-slate-500 font-mono ml-1">
                      {quest.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {quest.title}
                  </h3>
                  <div className="text-sm text-green-500 font-mono mb-3">
                    @{quest.org}
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
                    {quest.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {quest.loot.map((item, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-black border border-slate-700 text-slate-500 font-mono group-hover:border-blue-500/30 group-hover:text-blue-500/70 transition-colors">
                        +{item}
                      </span>
                    ))}
                  </div>

                  {/* --- NEW: SUB-ROLES WITH LEVELS --- */}
                  {quest.subRoles && (
                    <div className="mt-4 pt-4 border-t border-slate-800/50 w-full">
                        <div className="text-[10px] text-slate-600 font-mono uppercase mb-3 tracking-widest">Previous Rank / Roles:</div>
                        <div className="space-y-3">
                            {quest.subRoles.map((role, j) => (
                                <div key={j} className="flex items-center gap-3 relative pl-4">
                                    {/* Tree Branch Lines */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-slate-600"></div>
                                    <div className="absolute left-0 top-0 bottom-1/2 w-[1px] bg-slate-600"></div>

                                    {/* The Role Box */}
                                    <div className="flex flex-col gap-1 bg-black/40 px-3 py-2 rounded border border-slate-800 w-full hover:border-blue-500/30 transition-colors">
                                        
                                        {/* Row 1: Levels & Date */}
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                                            {/* Sub-Levels Loop */}
                                            <div className="flex items-center gap-1">
                                                {role.levels && role.levels.map((lvl, k) => (
                                                    <span key={k} className="text-[8px] font-mono text-blue-400 border border-blue-500/20 px-1 rounded uppercase tracking-wider">
                                                        {lvl}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-[9px] text-slate-600 font-mono">{role.date}</span>
                                        </div>

                                        {/* Row 2: Title */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-500 text-xs">🔹</span>
                                            <span className="text-xs text-slate-300 font-bold group-hover:text-blue-200 transition-colors">
                                                {role.title}
                                            </span>
                                        </div>

                                        {/* Row 3: Desc */}
                                        {role.desc && (
                                            <p className="text-[10px] text-slate-500 pl-5 leading-tight mt-1">
                                                {role.desc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  )}

                </div>

                 {/* RIGHT SIDE: SPINNING BADGE */}
                 {quest.image && (
                  <div className="shrink-0 relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-slate-800 to-slate-950 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 rounded-full border-[2px] border-blue-500/10 border-t-blue-500/80 animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative z-10">
                          <img 
                            src={quest.image} 
                            alt={quest.title} 
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