import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { AIExplanationPanel } from '../components/features/AIExplanationPanel';
import { PlanComparisonChart } from '../components/features/PlanComparisonChart';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { generateRecoveryPlans } from '../engine/recoveryEngine';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Layers,
  HelpCircle,
  Car,
  Plane,
  Hotel,
  Ticket,
} from 'lucide-react';

export const RecoveryPlans: React.FC = () => {
  const {
    activeTrip,
    recoveryPlans: contextPlans,
    selectedPlanId,
    setSelectedPlanId,
    applySelectedPlan,
    setCurrentView,
  } = useTrip();

  // If plans not yet calculated in context, generate them dynamically from trip
  const plans = contextPlans.length > 0 ? contextPlans : generateRecoveryPlans(activeTrip, 180);

  const [activeTab, setActiveTab] = useState<'plans' | 'compare'>('plans');

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              AI RECOVERY PIPELINE
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
              3 Optimal Solutions Generated
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Synthesized Recovery Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare multi-objective trade-offs across cost, punctuality, and itinerary integrity.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'plans'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Plan Cards (3)
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'compare'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Visual Metrics Comparison
          </button>
        </div>
      </div>

      {/* AI Assistant Explanation Banner Component */}
      <AIExplanationPanel
        plans={plans}
        selectedPlanId={selectedPlanId}
      />

      {/* Main Tab Content */}
      {activeTab === 'plans' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isRecommended = plan.isAiRecommended;
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden cursor-pointer ${
                  isRecommended
                    ? 'bg-gradient-to-b from-slate-900 via-[#0F172A] to-slate-900 border-cyan-400/60 shadow-2xl shadow-cyan-950/50 ring-2 ring-cyan-500/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* AI Recommended Top Ribbon */}
                {isRecommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 text-[10px] font-extrabold font-mono uppercase px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span className="text-white">⭐ AI RECOMMENDED</span>
                  </div>
                )}

                <div>
                  {/* Plan Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Score: <strong className="text-cyan-400 text-sm">{plan.score}/100</strong>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.tagline}</p>

                  {/* Core KPI Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-mono">Extra Cost</span>
                      <span className="font-extrabold font-mono text-cyan-300 text-sm">
                        +₹{plan.extraCost}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-mono">Time Lost</span>
                      <span className="font-extrabold font-mono text-amber-300 text-sm">
                        {plan.displayTimeLost}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-mono">Risk Level</span>
                      <span className={`font-bold text-xs uppercase ${plan.risk === 'Low' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {plan.risk}
                      </span>
                    </div>
                  </div>

                  {/* Action Steps Checklist */}
                  <div className="mt-5 space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Recovery Protocol:
                    </span>
                    <ul className="space-y-2">
                      {plan.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span className="leading-snug">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Plan Selection Button */}
                <div className="pt-4 border-t border-slate-800">
                  <Button
                    size="lg"
                    variant={isRecommended ? 'glow' : 'secondary'}
                    onClick={(e) => {
                      e.stopPropagation();
                      applySelectedPlan(plan.id);
                    }}
                    icon={<Zap className="w-4 h-4" />}
                    className="w-full shadow-md font-bold"
                  >
                    SELECT {plan.badge} PLAN →
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Visual Recharts Comparison Section */
        <PlanComparisonChart
          plans={plans}
          selectedPlanId={selectedPlanId}
          onSelectPlan={setSelectedPlanId}
        />
      )}
    </div>
  );
};
