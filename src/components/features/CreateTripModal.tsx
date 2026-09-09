import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { TripPreference } from '../../types';
import { Compass, Calendar, MapPin, Sparkles, Sliders } from 'lucide-react';

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTripModal: React.FC<CreateTripModalProps> = ({ isOpen, onClose }) => {
  const { createNewTrip } = useTrip();

  const [name, setName] = useState('Bangalore → Goa Retreat');
  const [origin, setOrigin] = useState('Bangalore (BLR)');
  const [destination, setDestination] = useState('Goa (GOI)');
  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-14');
  const [preference, setPreference] = useState<TripPreference>('Balanced');

  const preferences: { type: TripPreference; desc: string; icon: string }[] = [
    { type: 'Balanced', desc: 'Optimal trade-off between price and speed', icon: '⚖️' },
    { type: 'Budget', desc: 'Prioritize lowest possible recovery outlays', icon: '💰' },
    { type: 'Fastest', desc: 'Preserve 100% of schedule regardless of cost', icon: '⚡' },
    { type: 'Lowest Risk', desc: 'Maximum schedule buffers & flexible bookings', icon: '🛡️' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewTrip({
      name,
      origin,
      destination,
      startDate,
      endDate,
      displayDates: 'Nov 10 - Nov 14',
      preference,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Journey"
      subtitle="Initialize an AI-monitored multi-booking trip itinerary."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Trip Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Bangalore Business Trip"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Origin
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Recovery Preference Profile
          </label>
          <div className="grid grid-cols-2 gap-2">
            {preferences.map((p) => {
              const isSelected = preference === p.type;
              return (
                <div
                  key={p.type}
                  onClick={() => setPreference(p.type)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span>{p.icon}</span>
                    <span>{p.type}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" icon={<Sparkles className="w-4 h-4" />}>
            Create & Monitor Journey
          </Button>
        </div>
      </form>
    </Modal>
  );
};
