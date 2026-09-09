import React from 'react';
import { useTrip } from '../context/TripContext';
import { CircularProgress } from '../components/common/CircularProgress';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Compass,
  CalendarDays,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  IndianRupee,
  Plane,
  Car,
  Hotel,
  Ticket,
  Utensils,
  ArrowRight,
  Zap,
  ChevronRight,
  Activity,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    activeTrip,
    trips,
    setCurrentView,
    setShowDisruptionModal,
    activityLogs,
    userSettings,
  } = useTrip();

  const isDisrupted = activeTrip.status === 'DISRUPTED';
  const isRecovered = activeTrip.status === 'RECOVERED';

  const stats = [
    {
      label: 'Upcoming Trips',
      value: trips.length.toString(),
      subtext: 'Next: Bangalore → Mumbai',
      icon: Compass,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      label: 'Active Bookings',
      value: activeTrip.bookings.length.toString(),
      subtext: 'Flight, Cab, Hotel, Tour, Dinner',
      icon: CalendarDays,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      label: 'Potential Risks',
      value: isDisrupted ? '3 Critical' : isRecovered ? '0 Risks' : '1 Minor Buffer',
      subtext: isDisrupted ? 'Immediate action required' : 'All timelines protected',
      icon: AlertTriangle,
      color: isDisrupted
        ? 'text-red-400 bg-red-500/10 border-red-500/30'
        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      label: 'Recovery Saved',
      value: `₹${activeTrip.totalSaved.toLocaleString('en-IN')}`,
      subtext: 'Disruption & fee mitigation',
      icon: TrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Greeting & Travel Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good Morning, {userSettings.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            ReRoute AI is actively monitoring your travel telemetry across all synchronized providers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            onClick={() => setShowDisruptionModal(true)}
            icon={<Zap className="w-4 h-4" />}
          >
            Simulate Disruption
          </Button>
        </div>
      </div>

      {/* Disruption Alert / On Track Status Banner */}
      {isDisrupted ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900 to-rose-950/80 border border-red-500/50 shadow-glow-danger flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
                  DISRUPTION TELEMETRY DETECTED
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
                  ACTION REQUIRED
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Flight AI-604 Delayed by 3h • 3 Downstream Bookings Cascaded
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Airport transfer missed; Ocean View Hotel and Heritage City Tour at severe schedule risk.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="glow"
              onClick={() => setCurrentView('disruption-center')}
              icon={<Zap className="w-4 h-4" />}
            >
              Open Disruption Center →
            </Button>
          </div>
        </div>
      ) : isRecovered ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 shadow-glow-emerald flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                ITINERARY STABILIZED & RECOVERED
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                ReRoute Plan Active • All 5 Bookings Synchronized
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Metro transfer active; hotel arrival pushed to 03:30 PM; Heritage Tour shifted to 05:00 PM sunset slot.
              </p>
            </div>
          </div>

          <Button
            variant="emerald"
            onClick={() => setCurrentView('trip-details')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            View Itinerary
          </Button>
        </div>
      ) : (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  TRAVEL STATUS: 🟢 EVERYTHING ON TRACK
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                No active disruptions detected across Bangalore → Mumbai route. All radar telemetry nominal.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentView('trip-details')}
          >
            View Itinerary Details
          </Button>
        </div>
      )}

      {/* 4 Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {st.label}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${st.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-mono text-white tracking-tight">{st.value}</p>
                <p className="text-xs text-slate-400 mt-1">{st.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Upcoming Trip Timeline + Travel Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upcoming Trip Progress Timeline (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  PRIMARY ACTIVE TRIP
                </span>
                <Badge status={activeTrip.status} />
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{activeTrip.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeTrip.origin} → {activeTrip.destination} • {activeTrip.displayDates}
              </p>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => setCurrentView('trip-details')}
              icon={<ChevronRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Full Details
            </Button>
          </div>

          {/* Horizontal / Progress Timeline */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
              Journey Flow & Transit Anchors
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
              {activeTrip.bookings.map((booking, idx) => {
                const getMiniIcon = (type: string) => {
                  switch (type) {
                    case 'flight':
                      return Plane;
                    case 'cab':
                      return Car;
                    case 'hotel':
                      return Hotel;
                    case 'activity':
                      return Ticket;
                    case 'dining':
                      return Utensils;
                    default:
                      return Clock;
                  }
                };
                const Icon = getMiniIcon(booking.type);

                return (
                  <div
                    key={booking.id}
                    onClick={() => setCurrentView('trip-details')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      booking.status === 'MISSED' || booking.status === 'DELAYED'
                        ? 'bg-red-950/40 border-red-500/50 hover:bg-red-900/30'
                        : booking.status === 'AT_RISK'
                        ? 'bg-amber-950/40 border-amber-500/50 hover:bg-amber-900/30'
                        : booking.status === 'RECOVERED'
                        ? 'bg-emerald-950/40 border-emerald-500/50 hover:bg-emerald-900/30'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-900/80 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{booking.displayStartTime}</span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">{booking.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge status={booking.status} size="xs" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">
              Total Itinerary Value: <strong className="text-white font-mono">₹{activeTrip.totalCost.toLocaleString('en-IN')}</strong>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('impact-map')}
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Inspect Dependency Graph →
              </button>
            </div>
          </div>
        </div>

        {/* Right: Travel Health Score (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                JOURNEY RESILIENCE
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">Travel Health Score</h3>
            </div>
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
          </div>

          {/* Circular Progress Gauge */}
          <div className="flex justify-center py-2">
            <CircularProgress
              value={activeTrip.healthScore}
              size={150}
              strokeWidth={12}
              label={isDisrupted ? 'AT RISK' : isRecovered ? 'OPTIMAL' : 'EXCELLENT'}
            />
          </div>

          {/* 4 Category Breakdown */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Schedule Reliability</span>
              <span className="font-mono font-bold text-white">
                {activeTrip.healthBreakdown.scheduleReliability}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${activeTrip.healthBreakdown.scheduleReliability}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Cost Risk Margin</span>
              <span className="font-mono font-bold text-white">
                {activeTrip.healthBreakdown.costRisk}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${activeTrip.healthBreakdown.costRisk}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Connection Safety</span>
              <span className="font-mono font-bold text-white">
                {activeTrip.healthBreakdown.connectionSafety}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${activeTrip.healthBreakdown.connectionSafety}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Booking Flexibility</span>
              <span className="font-mono font-bold text-white">
                {activeTrip.healthBreakdown.bookingFlexibility}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${activeTrip.healthBreakdown.bookingFlexibility}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Audit Feed */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Recent Journey Activity & Telemetry</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Live Event Stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {activityLogs.slice(0, 3).map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex flex-col justify-between space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-slate-200">{log.title}</span>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{log.timestamp}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">{log.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
