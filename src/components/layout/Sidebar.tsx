import React from 'react';
import { useTrip } from '../../context/TripContext';
import {
  LayoutDashboard,
  Compass,
  CalendarDays,
  AlertTriangle,
  Sparkles,
  GitFork,
  Sliders,
  Settings,
  Zap,
  Plane,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const {
    currentView,
    setCurrentView,
    activeTrip,
    setShowDisruptionModal,
    resetAllData,
    activeDisruption,
    userSettings,
  } = useTrip();

  const isDisrupted = activeTrip?.status === 'DISRUPTED';
  const isRecovered = activeTrip?.status === 'RECOVERED';

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'my-trips',
      label: 'My Trips',
      icon: Compass,
      badge: '2 Active',
    },
    {
      id: 'trip-details',
      label: 'Trip Details',
      icon: CalendarDays,
      badge: isDisrupted ? 'Disrupted' : isRecovered ? 'Recovered' : 'On Track',
      badgeStatus: isDisrupted ? 'danger' : isRecovered ? 'success' : 'info',
    },
    {
      id: 'disruption-center',
      label: 'Disruption Center',
      icon: AlertTriangle,
      badge: isDisrupted ? '1 Alert' : null,
      badgeStatus: 'danger',
      pulse: isDisrupted,
    },
    {
      id: 'recovery-plans',
      label: 'Recovery Plans',
      icon: Sparkles,
      badge: isDisrupted ? '3 Ready' : null,
      badgeStatus: 'cyan',
    },
    {
      id: 'impact-map',
      label: 'Impact Map',
      icon: GitFork,
      badge: 'Live Graph',
    },
    {
      id: 'what-if',
      label: 'What-If Simulator',
      icon: Sliders,
      badge: 'Interactive',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#0C1220] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">ReRoute</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Recovery Engine • Hack Bros
              </p>
            </div>
          </div>
        </div>

        {/* Active Trip Quick Badge */}
        <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Active Context
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">BLR → BOM</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-200 font-medium truncate">
            <span className="truncate">{activeTrip.name}</span>
            {isDisrupted && (
              <span className="shrink-0 ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                DELAYED
              </span>
            )}
            {isRecovered && (
              <span className="shrink-0 ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                RECOVERED
              </span>
            )}
            {!isDisrupted && !isRecovered && (
              <span className="shrink-0 ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                ON TRACK
              </span>
            )}
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-900/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      item.badgeStatus === 'danger'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : item.badgeStatus === 'cyan'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                        : item.badgeStatus === 'success'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    } ${item.pulse ? 'animate-pulse' : ''}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Demo Controls Card */}
        <div className="p-3 mx-3 mb-3 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Demo Simulator
            </span>
            <span className="text-[10px] text-slate-400 font-mono">PS-2</span>
          </div>
          <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
            Test the live cascade impact & recovery engine on Bangalore Business Trip.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowDisruptionModal(true)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-sm shadow-red-900/30 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
            >
              <Zap className="w-3 h-3" />
              Simulate
            </button>
            <button
              onClick={resetAllData}
              title="Reset state to baseline on-track demo"
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {/* User Profile Mini Footer */}
        <div className="p-3.5 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
              AM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">{userSettings.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{userSettings.email}</p>
            </div>
          </div>
          <span title="Protected by ReRoute AI">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          </span>
        </div>
      </aside>
    </>
  );
};
