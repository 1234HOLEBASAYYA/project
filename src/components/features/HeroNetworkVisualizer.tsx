import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Car, Hotel, Ticket, Train, AlertTriangle, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

export const HeroNetworkVisualizer: React.FC = () => {
  const [phase, setPhase] = useState<'NORMAL' | 'DISRUPTED' | 'RECOVERING' | 'RECOVERED'>('NORMAL');

  // Auto-cycle through states for an awe-inspiring hero visual
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('DISRUPTED'), 3500);
    const timer2 = setTimeout(() => setPhase('RECOVERING'), 7000);
    const timer3 = setTimeout(() => setPhase('RECOVERED'), 9500);
    const timer4 = setTimeout(() => setPhase('NORMAL'), 14000);

    const interval = setInterval(() => {
      setPhase('NORMAL');
      setTimeout(() => setPhase('DISRUPTED'), 3500);
      setTimeout(() => setPhase('RECOVERING'), 7000);
      setTimeout(() => setPhase('RECOVERED'), 9500);
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
    };
  }, []);

  const nodes = [
    {
      id: 'flight',
      title: 'Flight AI-604',
      subtitle: 'BLR → BOM',
      icon: Plane,
      normal: { status: 'ON TIME', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300 shadow-glow-blue' },
      disrupted: { status: 'DELAYED +3H', color: 'border-red-500/80 bg-red-950/60 text-red-300 shadow-glow-danger' },
      recovered: { status: 'RESCHEDULED', color: 'border-emerald-500/80 bg-emerald-950/50 text-emerald-300 shadow-glow-emerald' },
      x: '10%',
      y: '50%',
    },
    {
      id: 'cab',
      title: 'Airport Transfer',
      subtitle: 'BOM T2 → Hotel',
      icon: Car,
      normal: { status: 'CONFIRMED', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
      disrupted: { status: 'MISSED PICKUP', color: 'border-amber-500/80 bg-amber-950/60 text-amber-300' },
      recovered: { status: 'METRO REROUTE', color: 'border-emerald-500/80 bg-emerald-950/50 text-emerald-300 shadow-glow-emerald' },
      x: '32%',
      y: '25%',
    },
    {
      id: 'hotel',
      title: 'Ocean View Hotel',
      subtitle: 'Marine Drive',
      icon: Hotel,
      normal: { status: 'GUARANTEED', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
      disrupted: { status: 'AT RISK (LATE)', color: 'border-yellow-500/80 bg-yellow-950/60 text-yellow-300' },
      recovered: { status: 'KEY SYNCED', color: 'border-emerald-500/80 bg-emerald-950/50 text-emerald-300 shadow-glow-emerald' },
      x: '55%',
      y: '65%',
    },
    {
      id: 'activity',
      title: 'Heritage Tour',
      subtitle: 'Gateway of India',
      icon: Ticket,
      normal: { status: 'CONFIRMED', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
      disrupted: { status: 'CONFLICTED', color: 'border-amber-500/80 bg-amber-950/60 text-amber-300' },
      recovered: { status: 'SUNSET SLOT', color: 'border-cyan-500/80 bg-cyan-950/50 text-cyan-300 shadow-glow-cyan' },
      x: '75%',
      y: '30%',
    },
    {
      id: 'train',
      title: 'Return Express',
      subtitle: 'Mumbai Central',
      icon: Train,
      normal: { status: 'ON TRACK', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
      disrupted: { status: 'MONITORED', color: 'border-slate-600/80 bg-slate-900/60 text-slate-300' },
      recovered: { status: 'STABILIZED', color: 'border-emerald-500/80 bg-emerald-950/50 text-emerald-300' },
      x: '92%',
      y: '55%',
    },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[380px] sm:h-[420px] rounded-3xl bg-[#0F172A]/90 border border-slate-700/80 shadow-2xl p-6 overflow-hidden select-none">
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                phase === 'DISRUPTED' ? 'bg-red-400' : phase === 'RECOVERED' ? 'bg-emerald-400' : 'bg-cyan-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                phase === 'DISRUPTED' ? 'bg-red-500' : phase === 'RECOVERED' ? 'bg-emerald-500' : 'bg-cyan-500'
              }`}
            />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            LIVE ITINERARY TOPOLOGY GRAPH
          </span>
        </div>

        {/* Phase State Indicator */}
        <div className="flex items-center gap-2">
          {phase === 'NORMAL' && (
            <span className="px-3 py-1 text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> All 5 Bookings Synchronized
            </span>
          )}
          {phase === 'DISRUPTED' && (
            <span className="px-3 py-1 text-xs font-bold text-red-300 bg-red-500/15 border border-red-500/40 rounded-full flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" /> Flight Delayed • 3 Cascading Risks
            </span>
          )}
          {phase === 'RECOVERING' && (
            <span className="px-3 py-1 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin" /> AI Rerouting Dependencies...
            </span>
          )}
          {phase === 'RECOVERED' && (
            <span className="px-3 py-1 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Recovery Plan Applied (92/100)
            </span>
          )}

          {/* Manual Trigger Buttons */}
          <div className="flex gap-1 ml-2">
            <button
              onClick={() => setPhase('DISRUPTED')}
              className="px-2 py-1 text-[11px] font-bold rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 transition-colors"
            >
              Simulate Delay
            </button>
            <button
              onClick={() => setPhase('RECOVERED')}
              className="px-2 py-1 text-[11px] font-bold rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 transition-colors"
            >
              ReRoute AI
            </button>
          </div>
        </div>
      </div>

      {/* SVG Connecting Paths with dynamic animations */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineNormal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="lineDisrupted" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="lineRecovered" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Path 1: Flight -> Cab */}
        <motion.path
          d="M 120 220 C 180 220, 240 130, 310 130"
          stroke={phase === 'DISRUPTED' ? 'url(#lineDisrupted)' : phase === 'RECOVERED' ? 'url(#lineRecovered)' : 'url(#lineNormal)'}
          strokeWidth="3"
          strokeDasharray={phase === 'DISRUPTED' ? '6 6' : 'none'}
          fill="transparent"
          animate={{ strokeDashoffset: phase === 'DISRUPTED' ? [0, -24] : 0 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />

        {/* Path 2: Cab -> Hotel */}
        <motion.path
          d="M 360 140 C 440 140, 480 280, 540 280"
          stroke={phase === 'DISRUPTED' ? 'url(#lineDisrupted)' : phase === 'RECOVERED' ? 'url(#lineRecovered)' : 'url(#lineNormal)'}
          strokeWidth="3"
          strokeDasharray={phase === 'DISRUPTED' ? '6 6' : 'none'}
          fill="transparent"
          animate={{ strokeDashoffset: phase === 'DISRUPTED' ? [0, -24] : 0 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />

        {/* Path 3: Hotel -> Activity */}
        <motion.path
          d="M 600 270 C 660 270, 700 150, 750 150"
          stroke={phase === 'DISRUPTED' ? 'url(#lineDisrupted)' : phase === 'RECOVERED' ? 'url(#lineRecovered)' : 'url(#lineNormal)'}
          strokeWidth="3"
          strokeDasharray={phase === 'DISRUPTED' ? '6 6' : 'none'}
          fill="transparent"
          animate={{ strokeDashoffset: phase === 'DISRUPTED' ? [0, -24] : 0 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />

        {/* Path 4: Activity -> Train */}
        <motion.path
          d="M 800 160 C 850 160, 880 240, 920 240"
          stroke={phase === 'RECOVERED' ? 'url(#lineRecovered)' : 'url(#lineNormal)'}
          strokeWidth="3"
          fill="transparent"
        />
      </svg>

      {/* Interactive Travel Nodes */}
      <div className="relative z-10 h-full w-full">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          let nodeState = node.normal;
          if (phase === 'DISRUPTED') nodeState = node.disrupted;
          if (phase === 'RECOVERED') nodeState = node.recovered;

          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              style={{ left: node.x, top: node.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              <div
                className={`p-3 sm:p-4 rounded-2xl border backdrop-blur-md transition-all duration-500 flex flex-col items-center gap-2 ${nodeState.color} hover:scale-105`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                </div>
                <div className="text-center min-w-[90px]">
                  <p className="text-xs font-bold text-white tracking-tight">{node.title}</p>
                  <p className="text-[10px] text-slate-400">{node.subtitle}</p>
                  <span className="mt-1.5 inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-current">
                    {nodeState.status}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Bottom Explainer Bar */}
      <div className="absolute bottom-3 left-6 right-6 z-20 flex items-center justify-between text-xs text-slate-400 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 backdrop-blur-md">
        <span className="font-mono text-[11px] text-slate-300">
          {phase === 'NORMAL' && 'All travel dependencies intact. Normal 45m buffer maintained.'}
          {phase === 'DISRUPTED' && '🚨 Flight delay violates cab pickup buffer (02:00 PM > 12:00 PM) → Propagates into hotel & tour.'}
          {phase === 'RECOVERING' && '⚡ Synthesizing multi-modal alternatives: Metro Link + Tour sunset slot.'}
          {phase === 'RECOVERED' && '✨ Recovery Plan C applied: 100% activities preserved, zero missed check-in penalties.'}
        </span>
        <span className="text-[10px] text-cyan-400 font-mono hidden sm:inline">Engine: PS-2 Graph Solver</span>
      </div>
    </div>
  );
};
