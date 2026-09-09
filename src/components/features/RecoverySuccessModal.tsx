import React from 'react';
import { useTrip } from '../../context/TripContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Clock, IndianRupee, Calendar } from 'lucide-react';

export const RecoverySuccessModal: React.FC = () => {
  const {
    showSuccessModal,
    setShowSuccessModal,
    lastRecoveredPlan,
    setCurrentView,
    activeTrip,
  } = useTrip();

  if (!lastRecoveredPlan) return null;

  return (
    <Modal
      isOpen={showSuccessModal}
      onClose={() => setShowSuccessModal(false)}
      maxWidth="xl"
    >
      <div className="text-center py-4 space-y-6">
        {/* Animated Celebration Icon */}
        <div className="relative inline-flex">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto shadow-glow-emerald animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
        </div>

        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            DISRUPTION RESOLVED
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
            Journey Successfully Recovered!
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
            ReRoute AI has executed <strong className="text-cyan-300">{lastRecoveredPlan.name}</strong>. All downstream schedule conflicts have been resolved.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
              <span>Net Extra Cost</span>
            </div>
            <p className="text-xl font-bold font-mono text-cyan-300 mt-1">₹{lastRecoveredPlan.extraCost}</p>
            <p className="text-[10px] text-emerald-400 mt-0.5">Saved ₹1,850 vs full rebook</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Schedule Drift</span>
            </div>
            <p className="text-xl font-bold font-mono text-amber-300 mt-1">{lastRecoveredPlan.displayTimeLost}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">All activities preserved</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Health Score</span>
            </div>
            <p className="text-xl font-bold font-mono text-emerald-300 mt-1">{lastRecoveredPlan.score} / 100</p>
            <p className="text-[10px] text-emerald-400 mt-0.5">Optimal Pareto score</p>
          </div>
        </div>

        {/* Key Recovery Highlights */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-left space-y-2">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Automated ReRoute Execution Log:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {lastRecoveredPlan.bulletPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentView('dashboard');
            }}
            className="w-full sm:w-auto"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="glow"
            size="lg"
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentView('trip-details');
            }}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            View Updated Itinerary Timeline
          </Button>
        </div>
      </div>
    </Modal>
  );
};
