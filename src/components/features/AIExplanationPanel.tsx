import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, HelpCircle, ChevronRight, CheckCircle2, ShieldCheck, Scale, Zap } from 'lucide-react';
import { generatePlanExplanation, AIExplanation } from '../../engine/explainableAI';
import { RecoveryPlan } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface AIExplanationPanelProps {
  plans: RecoveryPlan[];
  selectedPlanId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C';
}

export const AIExplanationPanel: React.FC<AIExplanationPanelProps> = ({
  plans,
  selectedPlanId,
}) => {
  const [showDetailedModal, setShowDetailedModal] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const explanation: AIExplanation = generatePlanExplanation(plans, selectedPlanId);

  // Animated typing effect simulation for AI feel
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let currentIndex = 0;
    const fullText = explanation.narrative;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 3));
        currentIndex += 3;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [selectedPlanId, explanation.narrative]);

  return (
    <>
      {/* AI Assistant Banner Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-cyan-950/60 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">
                  🤖 ReRoute AI Assistant
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Explainable Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{explanation.headline}</p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDetailedModal(true)}
            icon={<HelpCircle className="w-3.5 h-3.5" />}
          >
            Why this plan?
          </Button>
        </div>

        {/* AI Typing Narrative */}
        <div className="relative z-10 mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />}
          </p>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {explanation.verdict}
            </span>
            <span className="text-slate-500">Confidence: 98.4% • Model: Multi-Objective Utility</span>
          </div>
        </div>
      </div>

      {/* "Why this plan?" Deep Dive Explainability Modal */}
      <Modal
        isOpen={showDetailedModal}
        onClose={() => setShowDetailedModal(false)}
        title="🤖 Explainable AI Decision Engine"
        subtitle="Transparent algorithmic breakdown of why Plan C outperforms alternatives."
        maxWidth="3xl"
      >
        <div className="space-y-6">
          {/* Executive Rationale */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-cyan-300 block font-bold mb-1">Pareto Optimization Summary:</strong>
            {explanation.narrative}
          </div>

          {/* Trade-off Matrix */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              Trade-Off Comparison Breakdown
            </h4>
            <div className="space-y-2.5">
              {explanation.tradeoffBreakdown.map((item, index) => (
                <div key={index} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <p className="font-bold text-white text-sm">{item.title}</p>
                  <p className="text-slate-400">{item.description}</p>
                  <p className="text-cyan-300 font-semibold flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {item.advantage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Objective Function Weighting Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Multi-Objective Scoring Formula
            </h4>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-3 font-mono">
              <div className="text-cyan-300 text-center font-bold pb-2 border-b border-slate-800">
                Score = (Cost × 0.25) + (Time × 0.25) + (Convenience × 0.20) + (BookingsSaved × 0.15) + (LowRisk × 0.15)
              </div>
              <div className="space-y-2 font-sans">
                {explanation.scoringFactors.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-white">{f.label} ({f.weight}): </span>
                      <span className="text-slate-400">{f.impactDescription}</span>
                    </div>
                    <span className="font-mono font-bold text-cyan-400 ml-2">{f.score}/100</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" onClick={() => setShowDetailedModal(false)}>
              Got it, thanks!
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
