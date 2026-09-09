import React, { useState, useEffect } from 'react';
import { useTrip } from '../context/TripContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  AlertTriangle,
  Plane,
  Car,
  Hotel,
  Ticket,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  GitFork,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DisruptionCenter: React.FC = () => {
  const {
    activeTrip,
    activeDisruption,
    impactResult,
    runAnalysisSequence,
    isAnalyzing,
    setCurrentView,
    setShowDisruptionModal,
  } = useTrip();

  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);

  const analysisSteps = [
    'Connecting to DGCA radar & flight telemetry...',
    'Evaluating connected travel dependency graph...',
    'Calculating cascading arrival buffers & road traffic...',
    'Evaluating multi-modal alternatives (IndiGo 6E-512, Mumbai Metro Express)...',
    'Optimizing Pareto recovery plans (Cheapest, Fastest, Balanced)...',
  ];

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisStepIndex((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setAnalysisStepIndex(0);
    }
  }, [isAnalyzing]);

  const isDisrupted = activeTrip.status === 'DISRUPTED';

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-rose-950 border-2 border-red-500/60 shadow-glow-danger relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/50 flex items-center justify-center shrink-0 animate-pulse">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-widest">
                  🚨 DISRUPTION INCIDENT ACTIVE
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                  SEVERITY: CRITICAL
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Air India AI-604 Delayed by 3 Hours
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Bangalore (BLR) → Mumbai (BOM) • ATC departure hold propagated arrival from 11:00 AM to 02:00 PM.
              </p>
            </div>
          </div>

          {/* Time Shift Indicator Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4 text-xs shrink-0">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Original Arrival</span>
              <span className="text-base font-bold font-mono text-slate-300 line-through">11:00 AM</span>
            </div>
            <ArrowRight className="w-4 h-4 text-red-400" />
            <div>
              <span className="text-[10px] text-red-400 uppercase block font-mono">New Expected Arrival</span>
              <span className="text-base font-bold font-mono text-red-400">02:00 PM (+3h)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Cascading Impact Summary</h3>
            <p className="text-xs text-slate-400">
              ReRoute AI detected 3 downstream bookings impacted by the 3-hour flight delay.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentView('impact-map')}
            icon={<GitFork className="w-3.5 h-3.5" />}
          >
            View Graph
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Affected Card 1: Cab */}
          <div className="p-5 rounded-3xl bg-red-950/40 border border-red-500/50 flex flex-col justify-between space-y-4 shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <Car className="w-5 h-5 text-red-400" />
                </div>
                <Badge status="MISSED" pulse />
              </div>
              <h4 className="text-base font-bold text-white">Airport Transfer (Sedan)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Mumbai Airport → Ocean View Hotel</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                Failure Diagnostic:
              </span>
              <p className="text-slate-300">
                Flight AI-604 lands at 02:00 PM, 2 hours after scheduled pickup time of 12:00 PM. Chauffeur waiting limit expired.
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Pickup: 12:00 PM</span>
              <span className="text-red-400 font-bold">Driver Released</span>
            </div>
          </div>

          {/* Affected Card 2: Hotel */}
          <div className="p-5 rounded-3xl bg-amber-950/40 border border-amber-500/50 flex flex-col justify-between space-y-4 shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Hotel className="w-5 h-5 text-amber-400" />
                </div>
                <Badge status="AT_RISK" pulse />
              </div>
              <h4 className="text-base font-bold text-white">Ocean View Hotel Check-in</h4>
              <p className="text-xs text-slate-400 mt-0.5">Marine Drive, Nariman Point</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Failure Diagnostic:
              </span>
              <p className="text-slate-300">
                Arrival delayed from 01:00 PM to ~03:45 PM. Hotel policy releases unverified rooms after standard check-in window.
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Expected: 03:45 PM</span>
              <span className="text-amber-400 font-bold">Needs Hold Alert</span>
            </div>
          </div>

          {/* Affected Card 3: Tour */}
          <div className="p-5 rounded-3xl bg-amber-950/40 border border-amber-500/50 flex flex-col justify-between space-y-4 shadow-lg">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-amber-400" />
                </div>
                <Badge status="AT_RISK" pulse />
              </div>
              <h4 className="text-base font-bold text-white">Mumbai Heritage City Tour</h4>
              <p className="text-xs text-slate-400 mt-0.5">Gateway of India Meeting Point</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Failure Diagnostic:
              </span>
              <p className="text-slate-300">
                04:00 PM tour departure conflicts with 03:45 PM estimated hotel arrival. Guide check-in cutoff missed.
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Tour Start: 04:00 PM</span>
              <span className="text-amber-400 font-bold">Buffer Collapse</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recovery Optimization Execution Section */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-6">
        {!isAnalyzing ? (
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-glow-cyan">
              <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Synthesize Optimal Recovery Plans</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                ReRoute AI will evaluate multi-modal transport, airline inventory, and schedule shifts to generate 3 Pareto-optimal recovery plans.
              </p>
            </div>

            <Button
              size="lg"
              variant="glow"
              onClick={() => runAnalysisSequence()}
              icon={<Zap className="w-5 h-5" />}
              className="px-8 py-4 text-base shadow-glow-cyan"
            >
              ANALYZE RECOVERY OPTIONS →
            </Button>
          </div>
        ) : (
          /* Multi-Stage Animated Loader */
          <div className="max-w-md mx-auto py-4 space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <Sparkles className="w-8 h-8 text-cyan-400 absolute animate-pulse" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white animate-pulse">
                Analyzing your itinerary...
              </h4>
              <p className="text-xs font-mono text-cyan-300 min-h-[20px] transition-all">
                {analysisSteps[analysisStepIndex]}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
