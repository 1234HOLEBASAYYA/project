import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import {
  Menu,
  Zap,
  Bell,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Shield,
  Search,
} from 'lucide-react';
import { Button } from '../common/Button';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    currentView,
    setCurrentView,
    activeTrip,
    trips,
    setActiveTripId,
    setShowDisruptionModal,
    resetAllData,
    activityLogs,
  } = useTrip();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showTripMenu, setShowTripMenu] = useState(false);

  const isDisrupted = activeTrip?.status === 'DISRUPTED';
  const isRecovered = activeTrip?.status === 'RECOVERED';

  const viewTitles: Record<string, { title: string; subtitle: string }> = {
    landing: { title: 'ReRoute AI', subtitle: 'Intelligent Travel Disruption Recovery Engine' },
    dashboard: { title: 'Operations Dashboard', subtitle: 'Live Multi-Booking Telemetry & Risk Monitor' },
    'my-trips': { title: 'My Journeys', subtitle: 'Manage active, upcoming and recovered itineraries' },
    'trip-details': { title: activeTrip.name, subtitle: `${activeTrip.origin} → ${activeTrip.destination} • ${activeTrip.displayDates}` },
    'disruption-center': { title: 'Disruption Center', subtitle: 'Incident Telemetry, Cascading Impact Diagnostics' },
    'recovery-plans': { title: 'Recovery Optimization', subtitle: 'Pareto-Optimal Multi-Strategy Recovery Plans' },
    'impact-map': { title: 'Impact Map & Dependency Graph', subtitle: 'Interactive Topological Cascade Tree' },
    'what-if': { title: 'What-If Simulation Sandbox', subtitle: 'Test alternative intervention models & evaluate trade-offs' },
    settings: { title: 'Preferences & AI Weights', subtitle: 'Tune recovery algorithm objective functions' },
  };

  const currentInfo = viewTitles[currentView] || { title: 'ReRoute AI', subtitle: 'Intelligent Recovery Platform' };

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate flex items-center gap-2">
              {currentInfo.title}
              {isDisrupted && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  DISRUPTED
                </span>
              )}
              {isRecovered && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  RECOVERED
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block truncate">{currentInfo.subtitle}</p>
          </div>
        </div>

        {/* Center: Disruption Warning Banner Ticker (if disrupted) */}
        {isDisrupted && (
          <div
            onClick={() => setCurrentView('disruption-center')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold cursor-pointer hover:bg-rose-500/20 transition-colors animate-pulse"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="truncate">Flight AI-604 Delayed by 3h • 3 Cascading Impacts Detected</span>
            <span className="underline ml-1 font-bold text-rose-200">Resolve →</span>
          </div>
        )}

        {/* Right: Trip Switcher + Quick Actions + Notifications */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Active Trip Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowTripMenu(!showTripMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="hidden sm:inline font-mono">{activeTrip.origin.split(' ')[0]} → {activeTrip.destination.split(' ')[0]}</span>
              <span className="sm:hidden font-mono">Trip</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showTripMenu && (
              <div
                className="absolute right-0 mt-2 w-64 bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setShowTripMenu(false)}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
                  Select Active Journey
                </div>
                {trips.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTripId(t.id);
                      setShowTripMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      t.id === activeTrip.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-200">{t.name}</p>
                      <p className="text-[10px] text-slate-400">{t.displayDates}</p>
                    </div>
                    {t.status === 'DISRUPTED' ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">
                        DELAYED
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                        {t.status}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Simulate Disruption Button */}
          <Button
            size="sm"
            variant="danger"
            onClick={() => setShowDisruptionModal(true)}
            icon={<Zap className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex shadow-sm shadow-red-900/30"
          >
            Simulate Disruption
          </Button>

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white relative transition-colors"
              aria-label="Activity Feed"
            >
              <Bell className="w-4 h-4" />
              {activityLogs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl p-4 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">Live Disruption & Event Feed</h4>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar pr-1">
                  {activityLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs flex gap-2.5"
                    >
                      <div className="mt-0.5 shrink-0">
                        {log.type === 'ALERT' ? (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        ) : log.type === 'SUCCESS' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Shield className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-slate-200">{log.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{log.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
