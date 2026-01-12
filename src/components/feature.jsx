"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Zap, Lock, Terminal, Cpu, Activity, Fingerprint, Crosshair, Box } from "lucide-react";

const features = [
  {
    id: "threat",
    icon: ShieldAlert,
    title: "THREAT DETECTION",
    desc: "Real-time AI behavioral analysis and anomaly spotting.",
    detail: "Analyzing 4.2TB/s of ingress traffic using neural pattern matching.",
    stats: { status: "ACTIVE", latency: "1.2ms", load: "14%" },
    logs: ["[INFO] Pattern match: SQLi attempts", "[WARN] Heuristic deviation", "[OK] Neural nodes synced"]
  },
  {
    id: "zero",
    icon: Lock,
    title: "ZERO TRUST ARCH",
    desc: "Identity-centric security protocols for every request.",
    detail: "MFA-based cryptographic handshakes enforced at the edge.",
    stats: { status: "ENFORCING", latency: "0.4ms", load: "22%" },
    logs: ["[AUTH] Token validated", "[INFO] Session rotation", "[OK] Identity verified"]
  },
  {
    id: "rapid",
    icon: Zap,
    title: "RAPID RESPONSE",
    desc: "Automated mitigation within 200ms of detection.",
    detail: "Automatic IP shunning and container isolation protocols.",
    stats: { status: "STANDBY", latency: "198ms", load: "2%" },
    logs: ["[FIREWALL] Rule #402 updated", "[CLEAN] Isolated node #X-4", "[INFO] Mitigation ready"]
  },
];

export default function SecurityLab() {
  const [activeTab, setActiveTab] = useState(features[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="min-h-screen bg-[#020202] text-slate-200 py-20 px-6 font-mono selection:bg-orange-500/30 overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#331a00,transparent)] opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 container px-4 md:px-8 mx-auto max-w-screen-2xl mb-32 ">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-400 mb-4">
              <span className="w-8 h-[1px] bg-orange-500" />
              <span className="text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">System Status: Secure</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron  text-white">
              CYBER<span className="text-orange-500 ">LABS</span>
            </h2>
          </div>
          <div className="flex gap-8 border-l border-white/10 pl-8 md:flex">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Global Node</p>
              <p className="text-sm font-bold text-white uppercase">US-EAST-01</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase mb-1">Encryption</p>
              <p className="text-sm font-bold text-white uppercase">AES-256-GCM</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Navigation Cards */}
          <div className="lg:col-span-4 space-y-3">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTab(f)}
                className={`w-full text-left group relative p-5 rounded-sm border transition-all duration-500 ${
                  activeTab.id === f.id 
                  ? "bg-orange-500/10 border-orange-500/50" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/20"
                }`}
              >
                {activeTab.id === f.id && (
                  <motion.div layoutId="activeGlow" className="absolute inset-0 bg-orange-500/5 blur-xl" />
                )}
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-2 transition-colors ${activeTab.id === f.id ? "text-orange-500" : "text-zinc-600"}`}>
                    <f.icon size={20} />
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold tracking-widest uppercase transition-colors ${activeTab.id === f.id ? "text-white" : "text-zinc-500"}`}>
                      {f.title}
                    </h3>
                  </div>
                  {activeTab.id === f.id && (
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="ml-auto">
                      <Crosshair size={14} className="text-orange-500 animate-spin-slow" />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT: The Intelligence Panel */}
          <div className="lg:col-span-8 group">
            <div className="relative h-[500px] rounded-sm border border-white/10 bg-zinc-950/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
              
              {/* Decorative Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/30" />

              {/* Scanline Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div 
                  animate={{ translateY: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-full h-[2px] bg-black-500/50 shadow-[0_0_15px_#f97316]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Box size={14} className="text-orange-500" />
                        <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Protocol Active</span>
                      </div>
                      <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter">{activeTab.title}</h4>
                    </div>
                    <div className="text-right bg-white/5 p-3 rounded-sm border border-white/10">
                      <div className="text-[10px] text-zinc-500 uppercase mb-1 font-bold">Node Health</div>
                      <div className="flex items-center gap-2 text-green-400">
                        <Activity size={14} />
                        <span className="text-sm font-black uppercase tracking-tighter">99.98%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-6">
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                        {activeTab.detail}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-l-2 border-orange-500/50 pl-4 py-1">
                          <span className="block text-[10px] uppercase text-zinc-500 mb-1">Latency</span>
                          <span className="text-xl font-black text-white uppercase">{activeTab.stats.latency}</span>
                        </div>
                        <div className="border-l-2 border-orange-500/50 pl-4 py-1">
                          <span className="block text-[10px] uppercase text-zinc-500 mb-1">Load Factor</span>
                          <span className="text-xl font-black text-white uppercase">{activeTab.stats.load}</span>
                        </div>
                      </div>
                    </div>

                    {/* Animated Radar Visual */}
                    <div className="relative flex items-center justify-center border border-white/5 rounded-full aspect-square w-48 mx-auto opacity-40">
                       <div className="absolute inset-0 border border-orange-500/20 rounded-full animate-ping" />
                       <div className="absolute inset-4 border border-zinc-800 rounded-full" />
                       <div className="absolute inset-12 border border-zinc-800 rounded-full" />
                       <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute w-full h-full rounded-full border-t-2 border-orange-500/40" 
                       />
                       <Fingerprint size={48} className="text-orange-500/50" />
                    </div>
                  </div>

                  {/* Terminal Log Output */}
                  <div className="mt-auto bg-black/80 rounded-sm p-5 border border-white/5 font-mono text-[10px] relative">
                    <div className="absolute top-2 right-4 flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-orange-500/50" />
                      <div className="w-1 h-1 rounded-full bg-orange-500/50" />
                    </div>
                    <div className="text-zinc-600 mb-3 flex items-center gap-2 uppercase tracking-widest font-bold">
                      <Terminal size={12} /> Live Telemetry
                    </div>
                    <div className="space-y-1.5">
                      {activeTab.logs.map((log, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <span className="text-orange-500/30 font-bold w-12">{`0${i + 1}`}</span>
                          <span className="text-zinc-500">[{isMounted ? new Date().toLocaleTimeString() : "00:00:00"}]</span>
                          <span className={log.includes("WARN") ? "text-orange-400 font-bold" : "text-zinc-300"}>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}