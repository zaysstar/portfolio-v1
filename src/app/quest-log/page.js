"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function QuestLogPage() {

  // --- TYPEWRITER STATE ---
  const [typedText, setTypedText] = useState("");
  const fullText = "> LOADING LEADERSHIP_HISTORY & INVOLVEMENT...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); 

    return () => clearInterval(interval);
  }, []);
  
  // --- LEADERSHIP & INVOLVEMENT DATA ---
  const leadershipQuests = [
    // --- 2026 START ---
    {
      id: "bbb-01",
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Co-Director of Communications and Digital Presence",
      org: "Better Blender Brothers",
      date: "Feb 2026 - present",
      desc: "Leading the charge in shaping and sharing the organization's narrative. Managing social media, crafting press releases, and ensuring our message resonates across campus.",
      loot: ["Leadership", "Communications", "Public Speaking"],
      image: "/528451364_17872792683407398_4384365415726032581_n.jpg",
      previousRoles: [],
      subRoles: []
    },
    {
      id: "males-01",
      levels: ["CURRENT", "MEMBER_POSITION"],
      title: "Member",
      org: "M.A.L.E.S.",
      date: "Jan 2026 - present",
      desc: "Engaging in initiatives that promote general holisticness, academic excellence and cultural awareness among male students on campus.",
      loot: ["Mentorship", "Community Service"],
      image: "/IMG5653385041973313516.jpg",
      previousRoles: [],
      subRoles: []
    },
    // --- 2025 START ---
    {
      id: "uncf-ambassador-01",
      levels: ["CURRENT", "AMBASSADOR"],
      title: "UNCF Student Ambassador",
      org: "United Negro College Fund",
      date: "Nov 2025 - present",
      desc: "Selected to represent the university student body. Organizing campus events and driving scholarship awareness to help peers secure funding.",
      loot: ["Networking", "Event Planning", "Advocacy"],
      image: "/images/uncf-ambassador.jpg",
      previousRoles: [],
      subRoles: []
    },
{
      id: "pac-uncf-01",
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Acting President",
      org: "Pre-Alumni Council, VU",
      date: "Sep 2023 - Present",
      desc: "Leading the bridge between current students and alumni. Spearheading fundraising initiatives and fostering school pride through the UNCF network.",
      loot: ["Leadership", "Fundraising", "Alumni Relations"],
      image: null,
      previousRoles: [],
      // EDIT: Added 'General Member' as an active sub-routine
      subRoles: [
        {
            levels: ["MEMBER"],
            title: "General Member",
            date: "Sep 2023 - Present",
            desc: "Active participant in general body meetings and volunteer initiatives."
        }
      ]
    },
    {
      id: "sga-01",
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Senior Class Vice President",
      org: "Student Government Association",
      date: "Sep 2025 - Present",
      desc: "Serving as the strategic voice for the senior class. Partnering with the President to orchestrate senior-focused events and manage budgets.",
      loot: ["Leadership", "Budgeting", "Crisis Mgmt"],
      image: "/452301774_1562940110923259_3701710326811625647_n.jpg",
      previousRoles: [
        { 
          levels: ["FORMER", "MEMBER"],
          title: "Judicial Board - Student Representative", 
          date: "Jan 2024 - May 2025",
          desc: "Served on the disciplinary hearing panel to ensure fair due process for students." 
        }
      ],
      subRoles: []
    },
    {
      id: "vu-board-01",
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Multimedia Manager",
      org: "VU President's Student Advisory Board",
      date: "Sep 2025 - present",
      desc: "Managing multimedia content creation and distribution for the President's Student Advisory Board. Collaborating with the President's office to produce engaging visual materials.",
      loot: ["Content Creation", "Media Mgmt", "Public Relations"],
      image: "/images/sga-team.jpg",
      previousRoles: [],
      subRoles: []
    },
    // --- ACADEMIC & PROFESSIONAL ORGS ---
    {
      id: "cfa-01",
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Scholar - Year I",
      org: "Center for Financial Advancement",
      date: "Sep 2025 - present",
      desc: "Receiving financial literacy training and mentorship through the CFA program.",
      loot: ["Finance", "Professionalism"],
      image: null,
      previousRoles: [],
      subRoles: []
    },
    {
      id: "naba-01",
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Collegiate Member at-Large",
      org: "NABA (Southern Region)",
      date: "July 2025 - Present",
      desc: "Participating in financial literacy workshops and professional development conferences.",
      loot: ["Finance", "Professionalism"],
      image: null,
      previousRoles: [],
      subRoles: []
    },
    {
      id: "nsbe-01",
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Collegiate Member at-Large",
      org: "NSBE (Region II)",
      date: "June 2025 - Present",
      desc: "Engaging in STEM outreach and engineering networking events.",
      loot: ["Engineering", "STEM Outreach"],
      image: null,
      previousRoles: [],
      subRoles: []
    },
    {
      id: "sva-01",
      levels: ["CURRENT", "OFFICER_POSITION"],
      title: "Chaplain",
      org: "Student Veterans of America",
      date: "Apr 2025 - Present",
      desc: "Selected for the top-tier leadership summit in Washington D.C. Focused on advocacy and organizational management for student veterans.",
      loot: ["Policy", "Federal Advocacy"],
      image: "/images/sva-dc-trip.jpg",
      previousRoles: [],
      subRoles: [
        { 
          levels: ["DELEGATE", "TRAVEL_QUEST"],
          title: "SVA Leadership Institute Fellow", 
          date: "Oct 2025",
          desc: "Selected for the top-tier leadership summit in Washington D.C." 
        }
      ]
    },
    {
      id: "ctrl-dev-01",
      levels: ["CURRENT", "GUILD_MEMBER"],
      title: "Member",
      org: "CTRL-DEV Technology Club",
      date: "Jan 2025 - Present",
      desc: "Collaborating with peers on software development projects, participating in coding workshops, and keeping up with emerging tech trends.",
      loot: ["Software Dev", "Networking", "Tech Trends"],
      image: null, // Placeholder will generate 'C'
      previousRoles: [],
      subRoles: []
    },
    // --- 2024 START ---
    {
      id: "honors-01",
      levels: ["CURRENT", "MEMBER_POSITION"],
      title: "Member",
      org: "W. Franklin Evans Honors Student Association",
      date: "May 2024 - December 2025",
      desc: "Participating in academic excellence workshops and community service projects tailored for honors students.",
      loot: ["Academics", "Service"],
      image: null,
      previousRoles: [
        {
          levels: ["FORMER", "OFFICER"],
          title: "Recording Secretary",
          date: "May 2024 - May 2025",
          desc: "Coordinated communication between the executive board and the general body."
        }
      ],
      subRoles: [] 
    },
    {
      id: "stem-club-01",
      levels: ["FORMER", "CHAIR_POSITION"],
      title: "Graphic Design Chair",
      org: "STEM Club Committee",
      date: "Jan 2024 - May 2024",
      desc: "Spearheaded visual communications for the STEM Club. Designed flyers, digital assets, and event branding to increase student engagement in STEM initiatives.",
      loot: ["Graphic Design", "Branding", "Promotion"],
      image: null,
      previousRoles: [
        {
          levels: ["MEMBER"],
          title: "General Member",
          date: "Jan 2024 - May 2024",
          desc: "Participated in planning and executing STEM awareness events on campus."
        }
      ],
      subRoles: []
    },
    {
      id: "hcasc-01",
      levels: ["CURRENT", "CAPTAIN"],
      title: "Team Captain ('26)",
      org: "Honda Campus All Star Challenge",
      date: "Feb 2024 - Present",
      desc: "Leading the varsity academic quiz bowl team. Analyzing competition strategies and competing in National Qualifying Tournaments.",
      loot: ["Trivia", "Strategy", "Quick Thinking"],
      image: null,
      previousRoles: [],
      subRoles: [
        {
          levels: ["COMPETITOR"],
          title: "NQT Traveling Member (3x)",
          date: "Feb 2024 - present",
          desc: "Represented the university at three separate qualifying tournaments."
        }
      ]
    },
    // --- 2023 START ---
    {
      id: "isa-01",
      levels: ["CURRENT", "MEMBER_POSITION"],
      title: "Member",
      org: "International Students Association",
      date: "Jan 2023 - Present",
      desc: "Supporting international student integration and cultural exchange events.",
      loot: ["Culture", "Networking"],
      image: null,
      previousRoles: [
        {
          levels: ["FORMER", "ROYALTY"],
          title: "Mister ISA",
          date: "August 2024 - May 2025",
          desc: "Served as the representative face of the organization for campus events."
        }
      ],
      subRoles: []
    },
    {
      id: "choir-01",
      levels: ["CURRENT", "MEMBER_POSITION"],
      title: "Member (Tenor)",
      org: "VU Choir / Singing Tigers",
      date: "Jan 2023 - Present",
      desc: "Performing as a Tenor in the university's premier vocal ensemble. Representing the institution at cultural and formal events.",
      loot: ["Performance", "Teamwork"],
      image: null,
      previousRoles: [
        {
          levels: ["FORMER", "ROYALTY"],
          title: "Mister Choir",
          date: "September 2023 - May 2024",
          desc: "Student representative for the choir."
        }
      ],
      subRoles: [
        {
          levels: ["ENSEMBLE"],
          title: "Tigeraires",
          date: "February 2024 - Present",
          desc: "Member of the specialized vocal ensemble group."
        }
      ]
    },
    {
      id: "ace-01",
      levels: ["OFFICER_POSITION", "MENTOR"],
      title: "Peer Tutor & Recording Secretary",
      org: "VU A.C.E. Peer Tutoring Program",
      date: "Aug 2023 - Apr 2025",
      desc: "Delivered personalized academic support to 30+ CS/Cybersecurity students. Maintained accurate records of all tutoring operations.",
      loot: ["Mentorship", "Pedagogy", "Data Entry"],
      image: "/images/ace-tutoring.jpg",
      previousRoles: [],
      subRoles: []
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
            
            {/* TYPEWRITER EFFECT */}
            <p className="text-slate-500 font-mono text-sm h-5 flex items-center">
                {typedText}
                <span className="animate-pulse text-blue-500 ml-1">_</span>
            </p>
        </div>

        <Link href="/" className="group flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-700 rounded hover:border-green-500 transition-all">
            <span className="text-slate-400 group-hover:text-green-400 text-sm font-mono">&lt; RETURN_TO_BASE</span>
        </Link>
      </header>

      {/* TIMELINE CONTENT */}
      <section className="max-w-4xl mx-auto">
        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-0 space-y-12 pb-8">
          {leadershipQuests.map((quest, index) => {
            // Check if current role is active (Online) or past (Offline)
            const isOnline = quest.date.toLowerCase().includes("present");

            return (
                <div key={index} className="relative pl-8 md:pl-9 group">
                
                {/* THE NODE (Blue Nodes) */}
                <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-slate-900 bg-blue-500 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all z-10`}></div>

                {/* CARD CONTAINER */}
                <div className="flex flex-col md:flex-row gap-6 bg-slate-900/30 p-6 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-slate-900/60 items-center md:items-start">
                    
                    {/* LEFT SIDE: TEXT CONTENT */}
                    <div className="flex-1 w-full order-2 md:order-1">
                    
                    {/* TAGS / LEVELS LOOP */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        {quest.levels.map((lvl, i) => (
                        <span key={i} className="text-[10px] font-mono text-blue-500 border border-blue-500/30 bg-blue-500/5 px-2 py-0.5 rounded uppercase tracking-wider">
                            {lvl.replace("_", " ")}
                        </span>
                        ))}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {quest.title}
                    </h3>
                    
                    <div className="text-blue-600/80 font-mono text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-4 mt-1">
                        <span className="font-bold">{quest.org}</span>
                        <span className="hidden sm:inline text-slate-700">|</span>
                        <span className="text-slate-500">{quest.date}</span>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                        {quest.desc}
                    </p>

                    {/* --- PREVIOUS ROLES (Legacy/History) --- */}
                    {quest.previousRoles && quest.previousRoles.length > 0 && (
                        <div className="mb-6 p-4 rounded border-l-2 border-slate-800 bg-slate-950/30">
                            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                                Legacy Data (Previous Ranks)
                            </h4>
                            <div className="space-y-3">
                                {quest.previousRoles.map((role, idx) => (
                                    <div key={idx} className="relative pl-2 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                            <span className="text-sm font-bold text-slate-500 decoration-slate-600 decoration-2">
                                                {role.title}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-600 border border-slate-800 px-1 rounded">
                                                {role.date}
                                            </span>
                                        </div>
                                        {role.desc && (
                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                {role.desc}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- SUB-ROLES (Active) --- */}
                    {quest.subRoles && quest.subRoles.length > 0 && (
                        <div className="mb-6 p-4 rounded border border-blue-900/30 bg-blue-500/5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/50"></div>
                            <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                Active Sub-Routines
                            </h4>
                            <div className="space-y-3">
                                {quest.subRoles.map((role, idx) => (
                                    <div key={idx}>
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="text-sm font-bold text-slate-200">
                                                {role.title}
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-600 border border-slate-800 px-1 rounded">
                                                {role.date}
                                            </span>
                                            {role.levels && role.levels.includes("TRAVEL_QUEST") && (
                                                <span className="text-[9px] bg-purple-900/30 border border-purple-500/30 text-purple-300 px-1.5 rounded">
                                                    TRAVEL QUEST
                                                </span>
                                            )}
                                        </div>
                                        {role.desc && (
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                {role.desc}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* LOOT */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-slate-800/50">
                        {quest.loot.map((item, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-500 font-mono group-hover:border-blue-500/30 group-hover:text-blue-500/70 transition-colors">
                            +{item}
                        </span>
                        ))}
                    </div>

                    </div>

                    {/* RIGHT SIDE: SQUARE TECH BADGE (Order-1 on Mobile) */}
                    <div className="order-1 md:order-2 shrink-0 relative w-24 h-24 md:w-28 md:h-28 self-center md:self-start">
                        
                        {/* 1. STATUS DOT (Online/Offline) */}
                        <div className={`absolute -top-1 -right-1 z-20 w-4 h-4 rounded-full border-2 border-slate-900 transition-colors duration-500 ${
                            isOnline 
                            ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" 
                            : "bg-slate-500 border-slate-800"
                        }`}></div>

                        {/* 2. MAIN CONTAINER (Rounded Square) */}
                        <div className="w-full h-full rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group-hover:border-blue-500/50 transition-colors">
                            
                            {/* 3. RADAR SWEEP EFFECT (The Rotating Border) */}
                            <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.5)_90deg,transparent_180deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* 4. IMAGE MASK (Slightly smaller to reveal border) */}
                            <div className="absolute inset-[2px] rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center">
                                {quest.image ? (
                                    <img 
                                        src={quest.image} 
                                        alt={quest.title} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-slate-700 group-hover:text-blue-500 transition-colors">{quest.org.charAt(0)}</span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}