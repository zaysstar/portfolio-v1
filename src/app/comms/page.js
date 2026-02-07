"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CommsPage() {
  const [copied, setCopied] = useState(false);
  const email = "irahming204278@voorhees.edu"; 
  
  // --- TYPEWRITER STATE ---
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const fullSubtitle = "> ESTABLISHING SECURE UPLINK...";

  // --- DATABASE CONNECTION STATES ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  // --- ANIMATION EFFECT ---
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullSubtitle.length) {
        setTypedSubtitle(fullSubtitle.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40); // 40ms speed

    return () => clearInterval(typingInterval);
  }, []);

  // --- HANDLE INPUT CHANGES ---
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // --- SUBMIT TO DATABASE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // --- COPY EMAIL FUNCTION ---
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-[#007474]/40 pb-20 p-4 md:p-12">
      
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
                COMMS RELAY <span className="text-purple-500">.net</span>
            </h1>
            
            {/* TYPEWRITER SUBTITLE */}
            <p className="text-slate-500 font-mono text-sm h-5 flex items-center">
                {typedSubtitle}
                <span className="animate-pulse text-purple-500 ml-1">_</span>
            </p>
        </div>

        <Link href="/" className="group flex items-center gap-2 px-5 py-2 bg-slate-900 border border-slate-700 rounded hover:border-green-500 transition-all">
            <span className="text-slate-400 group-hover:text-green-400 text-sm font-mono">&lt; RETURN_TO_BASE</span>
        </Link>
      </header>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT COLUMN: THE TRANSMISSION FORM */}
        <div className="bg-slate-900/50 border border-purple-500/30 p-8 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-8 border-b border-purple-500/20 pb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${status === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <h2 className="text-sm font-mono text-purple-400 tracking-widest uppercase">ESTABLISH UPLINK // SEND MESSAGE</h2>
            </div>

            {/* --- FORM START --- */}
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                
                {/* NAME INPUT */}
                <div className="group">
                    <label className="block text-[10px] font-mono text-purple-500 uppercase tracking-wider mb-2 group-focus-within:text-white transition-colors">
                        Operator Name
                    </label>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        type="text" 
                        placeholder="ENTER ID..." 
                        className="w-full bg-slate-950/50 border border-slate-700 text-white p-3 rounded focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] font-mono text-sm transition-all"
                    />
                </div>

                {/* EMAIL INPUT */}
                <div className="group">
                    <label className="block text-[10px] font-mono text-purple-500 uppercase tracking-wider mb-2 group-focus-within:text-white transition-colors">
                        Comms Frequency (Email)
                    </label>
                    <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email" 
                        placeholder="ENTER FREQUENCY..." 
                        className="w-full bg-slate-950/50 border border-slate-700 text-white p-3 rounded focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] font-mono text-sm transition-all"
                    />
                </div>

                {/* MESSAGE INPUT */}
                <div className="group">
                    <label className="block text-[10px] font-mono text-purple-500 uppercase tracking-wider mb-2 group-focus-within:text-white transition-colors">
                        Mission Briefing
                    </label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="INPUT TRANSMISSION DATA..." 
                        className="w-full bg-slate-950/50 border border-slate-700 text-white p-3 rounded focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] font-mono text-sm transition-all resize-none"
                    ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                    type="submit" 
                    disabled={status === 'loading' || status === 'success'}
                    className={`w-full py-4 border font-mono text-sm tracking-widest transition-all uppercase group flex items-center justify-center gap-2 ${
                        status === 'success' 
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : "bg-purple-600/10 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    }`}
                >
                    {status === 'loading' ? (
                        <span>TRANSMITTING...</span>
                    ) : status === 'success' ? (
                        <span>✓ UPLINK ESTABLISHED</span>
                    ) : (
                        <>
                            <span>[ TRANSMIT DATA ]</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </>
                    )}
                </button>
                
                {status === 'error' && (
                    <p className="text-red-500 font-mono text-xs text-center">⚠ TRANSMISSION FAILED. RETRY.</p>
                )}

            </form>
        </div>

        {/* RIGHT COLUMN: RADAR & LINKS */}
        <div className="space-y-6">
            
            {/* RADAR VISUAL */}
            <div className="flex justify-center items-center relative h-48 bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="relative w-32 h-32 rounded-full border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,85,247,0.3)_360deg)] animate-[spin_4s_linear_infinite]"></div>
                    <div className="absolute w-20 h-20 rounded-full border border-purple-500/20"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-2 right-4 font-mono text-[9px] text-purple-400 text-right leading-tight opacity-70">
                    <p>SIGNAL: STRONG</p>
                    <p>PORT: 8080</p>
                </div>
            </div>

            {/* EMAIL COPY CARD */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg group hover:border-purple-500/50 transition-all">
                <div className="text-xs font-mono text-purple-500 mb-2 uppercase tracking-widest">Direct Frequency</div>
                <h3 className="text-lg md:text-xl text-white font-bold mb-4 break-all font-mono">{email}</h3>
                
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-purple-600 text-slate-300 hover:text-white text-xs font-bold rounded transition-colors w-full justify-center border border-slate-700 hover:border-purple-500"
                >
                    {copied ? (
                        <><span>✓</span> COPIED</>
                    ) : (
                        <><span>📋</span> COPY ADDRESS</>
                    )}
                </button>
            </div>

            {/* SOCIAL LINKS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* LINKEDIN BUTTON */}
                <a 
                  href="https://www.linkedin.com/in/izayah-rahming-8b6400281/" 
                  target="_blank"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-all"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                     <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                     </svg>
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-300 group-hover:text-blue-300 tracking-wide">
                    LINKEDIN
                  </span>
                </a>

                {/* GITHUB BUTTON */}
                <a 
                  href="https://github.com/zaysstar" 
                  target="_blank"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-all"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-mono text-sm font-bold text-slate-300 group-hover:text-blue-300 tracking-wide">
                    GITHUB
                  </span>
                </a>

            </div>

            {/* RESUME BUTTON */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="/resume.pdf" 
                  download="Izayah_Rahming_Resume.pdf"
                  className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden hover:border-green-500/50 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                >
                  <div className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  <span className="relative font-mono text-sm font-bold text-slate-300 group-hover:text-green-300 tracking-wide">
                    DOWNLOAD RESUME
                  </span>
                </a>
            </div>

        </div>

      </section>
    </main>
  );
}