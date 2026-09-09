import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Plane, AlertTriangle, CloudRain, Train, Hotel, XCircle, Clock, Zap, CheckCircle2 } from 'lucide-react';

export const SimulateDisruptionModal: React.FC = () => {
  const { showDisruptionModal, setShowDisruptionModal, triggerDisruption, activeTrip } = useTrip();

  const [disruptionType, setDisruptionType] = useState<'FLIGHT_DELAY' | 'FLIGHT_CANCELLED' | 'TRAIN_DELAY' | 'HOTEL_ISSUE' | 'WEATHER_ALERT'>('FLIGHT_DELAY');
  const [delayDurationHours, setDelayDurationHours] = useState<number>(3); // default 3 hours

  const disruptionOptions = [
    {
      id: 'FLIGHT_DELAY',
      title: 'Flight Delay (Primary Demo)',
      description: 'Simulate departure/arrival delay on Air India AI-604 (BLR → BOM)',
      icon: Plane,
      badge: 'RECOMMENDED',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      id: 'FLIGHT_CANCELLED',
      title: 'Flight Cancellation',
      description: 'Entire flight cancelled due to aircraft technical snag',
      icon: XCircle,
      badge: 'CRITICAL',
      badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    },
    {
      id: 'WEATHER_ALERT',
      title: 'Monsoon / Weather Alert',
      description: 'Heavy rainfall in Mumbai causing ATC holding patterns & cab road floods',
      icon: CloudRain,
      badge: 'WEATHER',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      id: 'TRAIN_DELAY',
      title: 'Connecting Train Delay',
      description: 'Express rail connection delayed by 2.5 hours',
      icon: Train,
      badge: 'TRANSIT',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'HOTEL_ISSUE',
      title: 'Hotel Overbooking Issue',
      description: 'Ocean View Hotel releases non-guaranteed room after cutoff window',
      icon: Hotel,
      badge: 'STAY',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
  ];

  const delayHoursOptions = [
    { hours: 1, label: '1 Hour Delay', impact: 'Minor transfer buffer squeeze' },
    { hours: 2, label: '2 Hours Delay', impact: 'Cab missed, hotel check-in at risk' },
    { hours: 3, label: '3 Hours Delay (Standard Hackathon Story)', impact: 'Cab missed, hotel at risk, heritage tour conflicted' },
    { hours: 5, label: '5 Hours Delay', impact: 'Severe multi-booking collapse' },
  ];

  const handleRunSimulation = () => {
    triggerDisruption({
      type: disruptionType,
      delayMinutes: delayDurationHours * 60,
      bookingId: 'bk-flight-604',
    });
  };

  return (
    <Modal
      isOpen={showDisruptionModal}
      onClose={() => setShowDisruptionModal(false)}
      title="⚡ Simulate Disruption Event"
      subtitle="Test how ReRoute AI analyzes cascading dependencies and optimizes recovery."
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Active Trip Target Banner */}
        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Target Journey</span>
            <p className="text-sm font-bold text-white">{activeTrip.name}</p>
            <p className="text-xs text-slate-400">{activeTrip.origin} → {activeTrip.destination} • 5 Bookings Connected</p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700">
            Sep 15
          </span>
        </div>

        {/* Disruption Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            Select Disruption Scenario
          </label>
          <div className="space-y-2">
            {disruptionOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = disruptionType === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setDisruptionType(opt.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-950/40 to-slate-900 border-red-500/60 shadow-glow-danger'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">{opt.title}</p>
                        {opt.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${opt.badgeColor}`}>
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{opt.description}</p>
                    </div>
                  </div>

                  <div className="shrink-0 ml-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-red-500 bg-red-500' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delay Duration Selector (if Flight Delay or Weather) */}
        {(disruptionType === 'FLIGHT_DELAY' || disruptionType === 'WEATHER_ALERT') && (
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Delay Duration
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {delayHoursOptions.map((opt) => {
                const isSelected = delayDurationHours === opt.hours;
                return (
                  <button
                    key={opt.hours}
                    type="button"
                    onClick={() => setDelayDurationHours(opt.hours)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-sm'
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-xs text-white">
                      <span>{opt.label}</span>
                      {opt.hours === 3 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          Judge Story
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{opt.impact}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Expected Cascading Cascade Preview */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <div className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-cyan-400">
            <Zap className="w-3 h-3 text-amber-400" />
            Cascading Logic Preview:
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Flight arrival shifts from <span className="text-slate-200 font-mono">11:00 AM</span> →{' '}
            <span className="text-red-400 font-mono font-bold">02:00 PM</span>. Because Airport Cab is scheduled at 12:00 PM, the engine will mark Cab as <span className="text-red-400 font-bold">MISSED</span>, Ocean View Hotel as <span className="text-amber-400 font-bold">AT RISK</span>, and Mumbai Heritage Tour as <span className="text-amber-400 font-bold">AT RISK</span>.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={() => setShowDisruptionModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={handleRunSimulation}
            icon={<Zap className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Simulate & Analyze Recovery →
          </Button>
        </div>
      </div>
    </Modal>
  );
};
