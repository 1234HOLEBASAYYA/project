import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { WHAT_IF_ALTERNATIVES } from '../data/seedData';
import { WhatIfAlternative } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Sparkles,
  Plane,
  Train,
  Building,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Clock,
  IndianRupee,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatIfSimulator: React.FC = () => {
  const { activeTrip, applySelectedPlan, setCurrentView } = useTrip();

  const [selectedAltId, setSelectedAltId] = useState<string>('alt-keep-delay');
  const selectedAlt = WHAT_IF_ALTERNATIVES.find((a) => a.id === selectedAltId) || WHAT_IF_ALTERNATIVES[0];

  const getIcon = (type: string) => {
    switch (type) {
      case 'KEEP_DELAY':
        return Plane;
      case 'ALT_FLIGHT':
        return Zap;
      case 'EXPRESS_TRAIN':
        return Train;
      case 'CHANGE_HOTEL':
        return Building;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              SCENARIO SANDBOX
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              🔮 What-If Simulator
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            "What happens if I choose this alternative?"
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Experiment with intervention models in real-time to forecast downstream schedule, financial, and risk impacts.
          </p>
        </div>
      </div>

      {/* 4 Selectable Alternative Decision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {WHAT_IF_ALTERNATIVES.map((alt) => {
          const Icon = getIcon(alt.type);
          const isSelected = selectedAltId === alt.id;

          return (
            <div
              key={alt.id}
              onClick={() => setSelectedAltId(alt.id)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-gradient-to-b from-slate-900 via-cyan-950/40 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-2 ring-cyan-500/50'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    -{alt.impactReductionPercent}% Impact
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">{alt.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alt.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Extra: +₹{alt.extraCost}</span>
                <span className="text-cyan-400 font-bold">Arr: {alt.estimatedArrival}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Before vs After Impact Simulation Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              DYNAMIC IMPACT FORECAST
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Simulated Result: {selectedAlt.title}
            </h3>
          </div>

          {/* Impact Reduction Meter */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-extrabold font-mono text-emerald-300 text-lg">
              {selectedAlt.impactReductionPercent}%
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Impact Mitigation</span>
              <span className="text-xs font-bold text-emerald-400">Schedule Stabilized</span>
            </div>
          </div>
        </div>

        {/* Before vs After Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BEFORE CARD */}
          <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
              <span className="text-xs font-mono font-bold text-red-400 uppercase">
                STATUS QUO (NO ACTION)
              </span>
              <Badge status="DISRUPTED" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Affected Bookings</span>
                <span className="text-lg font-bold font-mono text-red-400 mt-1 block">3 Bookings</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Extra Outlay</span>
                <span className="text-lg font-bold font-mono text-slate-300 mt-1 block">₹0</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Arrival Time</span>
                <span className="text-lg font-bold font-mono text-red-400 mt-1 block">02:00 PM</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Cab is missed; hotel room cancelled after standard cutoff; heritage tour non-refundable fee lost.
            </p>
          </div>

          {/* AFTER CARD */}
          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                AFTER SIMULATING {selectedAlt.type}
              </span>
              <Badge status="RECOVERED" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Affected Bookings</span>
                <span className="text-lg font-bold font-mono text-emerald-300 mt-1 block">
                  {selectedAlt.affectedCount} Booking
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Extra Outlay</span>
                <span className="text-lg font-bold font-mono text-cyan-300 mt-1 block">
                  +₹{selectedAlt.extraCost}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Arrival Time</span>
                <span className="text-lg font-bold font-mono text-emerald-300 mt-1 block">
                  {selectedAlt.estimatedArrival}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedAlt.pros}. <span className="text-slate-400">Trade-off: {selectedAlt.cons}.</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Simulated under ReRoute AI Multi-Objective Utility Model v2.4
          </div>
          <Button
            size="lg"
            variant="glow"
            onClick={() => {
              applySelectedPlan('PLAN_C');
            }}
            icon={<Zap className="w-4 h-4" />}
          >
            Apply This Intervention (Plan C) →
          </Button>
        </div>
      </div>
    </div>
  );
};
