import { useState } from 'react';

export default function ContactTerminal() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' });
        // Reset after 3 seconds
        setTimeout(() => setStatus('IDLE'), 3000);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mb-20">
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 italic">
        <span className="w-1 h-6 bg-green-500"></span>
        ESTABLISH UPLINK
      </h2>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 font-mono relative overflow-hidden">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="relative z-10 max-w-lg mx-auto space-y-6">
            
            {/* Input: Name */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-green-500 uppercase tracking-widest">Operator Name</label>
                <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-black/50 border border-slate-700 text-slate-200 p-3 rounded focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-slate-700"
                    placeholder="ENTER_ID"
                />
            </div>

            {/* Input: Email */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-green-500 uppercase tracking-widest">Comms Frequency (Email)</label>
                <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-black/50 border border-slate-700 text-slate-200 p-3 rounded focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-slate-700"
                    placeholder="name@server.com"
                />
            </div>

            {/* Input: Message */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-green-500 uppercase tracking-widest">Mission Briefing</label>
                <textarea 
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-black/50 border border-slate-700 text-slate-200 p-3 rounded focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-slate-700"
                    placeholder="Awaiting input..."
                ></textarea>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={status === 'SENDING' || status === 'SUCCESS'}
                className={`w-full py-4 rounded font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2
                    ${status === 'SUCCESS' ? 'bg-green-500 text-black' : 
                      status === 'ERROR' ? 'bg-red-500 text-white' : 
                      'bg-slate-800 text-green-500 border border-green-500/30 hover:bg-green-500/10 hover:border-green-500'}`}
            >
                {status === 'IDLE' && <span>[ TRANSMIT DATA ]</span>}
                {status === 'SENDING' && <span className="animate-pulse">UPLOADING PACKETS...</span>}
                {status === 'SUCCESS' && <span>✓ TRANSMISSION COMPLETE</span>}
                {status === 'ERROR' && <span>⚠ UPLINK FAILED</span>}
            </button>

        </form>
      </div>
    </section>
  );
}