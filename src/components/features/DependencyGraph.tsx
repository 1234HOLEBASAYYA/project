import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Car,
  Hotel,
  Ticket,
  Utensils,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  MapPin,
  IndianRupee,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DependencyGraph: React.FC = () => {
  const { activeTrip, setSelectedBooking } = useTrip();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('bk-cab-pickup');

  const bookings = activeTrip.bookings;
  const selectedBooking = bookings.find((b) => b.id === selectedNodeId) || bookings[1];

  // Node position coordinates for SVG diagram
  const graphNodes = [
    {
      id: 'bk-flight-604',
      booking: bookings[0],
      x: 350,
      y: 60,
      icon: Plane,
      title: 'Flight AI-604',
      role: 'Root Origin Disruption',
    },
    {
      id: 'bk-cab-pickup',
      booking: bookings[1],
      x: 180,
      y: 200,
      icon: Car,
      title: 'Airport Cab Transfer',
      role: 'Direct Upstream Dependency',
    },
    {
      id: 'bk-hotel-ocean',
      booking: bookings[2],
      x: 520,
      y: 200,
      icon: Hotel,
      title: 'Hotel Check-in',
      role: 'Stay & Basecamp Anchor',
    },
    {
      id: 'bk-tour-city',
      booking: bookings[3],
      x: 350,
      y: 340,
      icon: Ticket,
      title: 'Heritage City Tour',
      role: 'Downstream Activity Window',
    },
    {
      id: 'bk-dinner-table',
      booking: bookings[4],
      x: 350,
      y: 470,
      icon: Utensils,
      title: 'Dinner at The Table',
      role: 'Evening Milestone',
    },
  ];

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'MISSED':
      case 'DELAYED':
        return {
          border: 'border-red-500',
          bg: 'bg-red-950/70',
          text: 'text-red-300',
          stroke: '#EF4444',
          shadow: 'shadow-glow-danger',
          dot: 'bg-red-500',
        };
      case 'AT_RISK':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-950/70',
          text: 'text-amber-300',
          stroke: '#F59E0B',
          shadow: 'shadow-amber-500/20',
          dot: 'bg-amber-500',
        };
      case 'RECOVERED':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-950/70',
          text: 'text-emerald-300',
          stroke: '#10B981',
          shadow: 'shadow-glow-emerald',
          dot: 'bg-emerald-500',
        };
      default:
        return {
          border: 'border-blue-500/60',
          bg: 'bg-slate-900/80',
          text: 'text-cyan-300',
          stroke: '#06B6D4',
          shadow: 'shadow-cyan-500/10',
          dot: 'bg-cyan-400',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none">
      {/* Interactive SVG Graph Canvas */}
      <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl relative min-h-[580px] overflow-hidden flex flex-col justify-between">
        {/* Ambient Graph Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Legend Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              TOPOLOGICAL DEPENDENCY GRAPH
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Safe / Recovered
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> At Risk
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Missed / Delayed
            </span>
          </div>
        </div>

        {/* Interactive SVG Graph Area */}
        <div className="relative w-full h-[480px] flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
              </marker>
            </defs>

            {/* Flight -> Cab Link */}
            <motion.path
              d="M 350 90 C 350 140, 200 140, 200 170"
              stroke={getNodeColor(bookings[1]?.status || 'CONFIRMED').stroke}
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={bookings[1]?.status === 'MISSED' ? '5 5' : 'none'}
              animate={{ strokeDashoffset: bookings[1]?.status === 'MISSED' ? [0, -20] : 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />

            {/* Flight -> Hotel Link */}
            <motion.path
              d="M 350 90 C 350 140, 500 140, 500 170"
              stroke={getNodeColor(bookings[2]?.status || 'CONFIRMED').stroke}
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={bookings[2]?.status === 'AT_RISK' ? '5 5' : 'none'}
              animate={{ strokeDashoffset: bookings[2]?.status === 'AT_RISK' ? [0, -20] : 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />

            {/* Cab -> Tour Link */}
            <motion.path
              d="M 200 230 C 200 290, 350 290, 350 310"
              stroke={getNodeColor(bookings[3]?.status || 'CONFIRMED').stroke}
              strokeWidth="2.5"
              fill="transparent"
            />

            {/* Hotel -> Tour Link */}
            <motion.path
              d="M 500 230 C 500 290, 350 290, 350 310"
              stroke={getNodeColor(bookings[3]?.status || 'CONFIRMED').stroke}
              strokeWidth="2.5"
              fill="transparent"
            />

            {/* Tour -> Dinner Link */}
            <motion.path
              d="M 350 370 L 350 440"
              stroke={getNodeColor(bookings[4]?.status || 'CONFIRMED').stroke}
              strokeWidth="2.5"
              fill="transparent"
            />
          </svg>

          {/* Graph Nodes */}
          {graphNodes.map((gn) => {
            const booking = gn.booking;
            if (!booking) return null;
            const Icon = gn.icon;
            const colors = getNodeColor(booking.status);
            const isSelected = selectedNodeId === booking.id;

            return (
              <div
                key={gn.id}
                onClick={() => setSelectedNodeId(booking.id)}
                style={{
                  position: 'absolute',
                  left: `${(gn.x / 700) * 100}%`,
                  top: `${(gn.y / 540) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`cursor-pointer transition-all duration-300 z-10 ${
                  isSelected ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl border-2 backdrop-blur-md flex items-center gap-3 shadow-lg ${
                    colors.border
                  } ${colors.bg} ${isSelected ? colors.shadow + ' ring-2 ring-cyan-400' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="min-w-[120px]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-white tracking-tight">{gn.title}</p>
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    </div>
                    <p className="text-[10px] text-slate-400">{booking.displayStartTime}</p>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block mt-0.5 ${colors.text}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom instructions */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
          <span>Click any node in the graph to inspect upstream causes and cascade effects.</span>
          <span className="font-mono text-cyan-400">Directed Acyclic Graph (DAG)</span>
        </div>
      </div>

      {/* Right: Selected Node Telemetry Inspector */}
      <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-900/90 border border-slate-700 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                NODE INSPECTOR
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedBooking.title}</h3>
            </div>
            <Badge status={selectedBooking.status} pulse={selectedBooking.status === 'MISSED'} />
          </div>

          {/* Diagnostic Reason Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Dependency Diagnostic
            </span>
            <p className="text-slate-300 leading-relaxed">
              {selectedBooking.impactReason || 'This booking has zero temporal conflicts with scheduled dependencies.'}
            </p>
          </div>

          {/* Key Node Metrics */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" /> Start Time
              </span>
              <p className="text-sm font-bold font-mono text-white mt-1">{selectedBooking.displayStartTime}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase flex items-center gap-1">
                <IndianRupee className="w-3 h-3 text-emerald-400" /> Total Cost
              </span>
              <p className="text-sm font-bold font-mono text-white mt-1">₹{selectedBooking.cost}</p>
            </div>
          </div>

          {/* Upstream & Downstream Flow */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                Upstream Root
              </span>
              <p className="text-slate-200 font-semibold">
                {selectedBooking.dependencies.length > 0
                  ? activeTrip.bookings.find((b) => b.id === selectedBooking.dependencies[0])?.title || 'Flight AI-604'
                  : 'Root Trigger (Independent)'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-0.5">
                Downstream Impact Risk
              </span>
              <p className="text-slate-200 font-semibold">
                {selectedBooking.status === 'MISSED' || selectedBooking.status === 'AT_RISK'
                  ? 'High propagation into Ocean View Hotel & Heritage Tour'
                  : 'Stabilized; zero downstream risk'}
              </p>
            </div>
          </div>
        </div>

        {/* View Details Action */}
        <button
          onClick={() => setSelectedBooking(selectedBooking)}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-slate-700 transition-colors"
        >
          Open Full Booking Modal →
        </button>
      </div>
    </div>
  );
};
