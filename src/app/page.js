// OOP: Simple class to structure your user data
class Developer {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

export default function Home() {
  // Instantiating the object
  const me = new Developer("Izayah", "CS & Cybersecurity Student");

  return (
    // Tailwind classes explained:
    // min-h-screen: Height takes up 100% of the viewport
    // flex-col: Stack items vertically
    // bg-slate-950: Very dark blue/black background
    // text-green-400: Hacker-green text
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-green-400 p-24 font-mono">
      
      {/* Container with a border and glow effect */}
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex border border-green-800 p-10 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.15)] bg-black/50">
        
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold mb-4 tracking-tighter">
            {me.name}
          </h1>
          <h2 className="text-xl mb-6 text-slate-300">
            {me.role}
          </h2>
          
          <div className="flex justify-center gap-4">
            <span className="px-4 py-2 bg-green-900/30 rounded border border-green-700 hover:bg-green-800/50 cursor-pointer transition">
              React
            </span>
            <span className="px-4 py-2 bg-blue-900/30 rounded border border-blue-700 hover:bg-blue-800/50 cursor-pointer transition">
              Python
            </span>
             <span className="px-4 py-2 bg-purple-900/30 rounded border border-purple-700 hover:bg-purple-800/50 cursor-pointer transition">
              C++
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}