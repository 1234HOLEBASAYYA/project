import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Button } from '../components/common/Button';
import {
  User,
  Sliders,
  Bell,
  Key,
  Shield,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Building,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { userSettings, updateUserSettings, resetAllData } = useTrip();

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSliderChange = (key: string, value: number) => {
    updateUserSettings({ [key]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System Settings & AI Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Customize autonomous recovery algorithm objective weights, notification triggers, and traveler identity.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings & AI weights successfully updated in local engine.</span>
        </div>
      )}

      {/* Traveler Profile Section */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <User className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Traveler Profile & Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={userSettings.name}
                onChange={(e) => updateUserSettings({ name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={userSettings.email}
                onChange={(e) => updateUserSettings({ email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Phone / SMS</label>
              <input
                type="tel"
                value={userSettings.phone}
                onChange={(e) => updateUserSettings({ phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default Travel Preference</label>
              <select
                value={userSettings.preference}
                onChange={(e) => updateUserSettings({ preference: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Balanced">Balanced (Pareto Optimal)</option>
                <option value="Budget">Budget Saver</option>
                <option value="Fastest">Fastest (Speed Priority)</option>
                <option value="Lowest Risk">Lowest Risk Margin</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Multi-Objective Weighting Sliders */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">AI Multi-Objective Function Weights</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 uppercase">Utility Optimization</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Tune how the ReRoute scoring formula prioritizes competing objectives during real-time disruption events:
          </p>

          <div className="space-y-5">
            {/* Slider 1: Budget Weight */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>Cost Economy Weight</span>
                <span className="font-mono text-cyan-400">{userSettings.budgetWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={userSettings.budgetWeight}
                onChange={(e) => handleSliderChange('budgetWeight', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 2: Time Weight */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>Schedule Punctuality Weight</span>
                <span className="font-mono text-cyan-400">{userSettings.timeWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={userSettings.timeWeight}
                onChange={(e) => handleSliderChange('timeWeight', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 3: Comfort Weight */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>Convenience & Comfort Weight</span>
                <span className="font-mono text-cyan-400">{userSettings.comfortWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={userSettings.comfortWeight}
                onChange={(e) => handleSliderChange('comfortWeight', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Slider 4: Connection Safety */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>Connection Buffer Safety</span>
                <span className="font-mono text-cyan-400">{userSettings.safetyWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={userSettings.safetyWeight}
                onChange={(e) => handleSliderChange('safetyWeight', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Real-time Telemetry & API Keys Simulator */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
            <Key className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Connected Telemetry Providers</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-bold text-slate-200">DGCA & FlightAware Radar Live Feed</p>
                <p className="text-[10px] text-slate-500 font-mono">Status: Connected • 250ms polling</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-bold text-slate-200">MakeMyTrip & Uber Mobility Sync</p>
                <p className="text-[10px] text-slate-500 font-mono">Status: Connected • Auto-driver alert enabled</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-bold text-slate-200">Ocean View Hotel PMS Keycard API</p>
                <p className="text-[10px] text-slate-500 font-mono">Status: Connected • Mobile key token active</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={resetAllData}
            icon={<RotateCcw className="w-4 h-4" />}
            className="text-slate-400 hover:text-red-400"
          >
            Reset Demo Environment
          </Button>

          <Button type="submit" variant="primary">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
