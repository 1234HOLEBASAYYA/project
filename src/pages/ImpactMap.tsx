import React from 'react';
import { useTrip } from '../context/TripContext';
import { DependencyGraph } from '../components/features/DependencyGraph';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { GitFork, AlertTriangle, CheckCircle2, Zap, ArrowRight, Layers, Sparkles } from 'lucide-react';

export const ImpactMap: React.FC = () => {
  const { activeTrip, setCurrentView, setShowDisruptionModal } = useTrip();

  const isDisrupted = activeTrip.status === 'DISRUPTED';
  const isRecovered = activeTrip.status === 'RECOVERED';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              GRAPH TOPOLOGY & CASCADE ANALYZER
            </span>
            <Badge status={activeTrip.status} pulse={isDisrupted} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Impact Map & Dependency Tree
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visual topological representation of all interconnected bookings and temporal propagation paths.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {isDisrupted ? (
            <Button
              variant="glow"
              onClick={() => setCurrentView('recovery-plans')}
              icon={<Zap className="w-4 h-4" />}
            >
              View Recovery Plans →
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => setShowDisruptionModal(true)}
              icon={<Zap className="w-4 h-4" />}
            >
              Simulate Disruption
            </Button>
          )}
        </div>
      </div>

      {/* Main Interactive Graph Component */}
      <DependencyGraph />

      {/* Explanatory Context Footer */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-1.5">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Dependency Modeling
          </span>
          <p className="text-slate-400 leading-relaxed">
            Bookings are represented as vertices in a Directed Acyclic Graph (DAG). Edges encapsulate minimum transfer buffers and contractual check-in windows.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Cascading Fault Propagation
          </span>
          <p className="text-slate-400 leading-relaxed">
            When upstream arrival times exceed scheduled downstream pickup gates (02:00 PM &gt; 12:00 PM), the engine dynamically updates risk scores across all successor nodes.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Autonomous Stabilization
          </span>
          <p className="text-slate-400 leading-relaxed">
            Applying a recovery plan injects multi-modal substitutions (e.g. Airport Metro Express) to truncate the propagation chain and restore system equilibrium.
          </p>
        </div>
      </div>
    </div>
  );
};
