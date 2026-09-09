import React from 'react';
import { useTrip } from '../context/TripContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Plane,
  Car,
  Hotel,
  Ticket,
  Utensils,
  Train,
  MapPin,
  Clock,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  GitFork,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const TripDetails: React.FC = () => {
  const {
    activeTrip,
    setSelectedBooking,
    setCurrentView,
    setShowDisruptionModal,
  } = useTrip();

  const isDisrupted = activeTrip.status === 'DISRUPTED';
  const isRecovered = activeTrip.status === 'RECOVERED';

  const getIcon = (type: string) => {
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
      case 'train':
        return Train;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              ITINERARY OVERVIEW
            </span>
            <Badge status={activeTrip.status} pulse={isDisrupted} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            {activeTrip.name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1.5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {activeTrip.origin} → {activeTrip.destination}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {activeTrip.displayDates}
            </span>
            <span>•</span>
            <span className="font-mono text-slate-300">
              {activeTrip.bookings.length} Synchronized Bookings
            </span>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentView('impact-map')}
            icon={<GitFork className="w-4 h-4" />}
          >
            Impact Map
          </Button>

          {isDisrupted ? (
            <Button
              size="sm"
              variant="danger"
              onClick={() => setCurrentView('disruption-center')}
              icon={<Zap className="w-4 h-4" />}
            >
              Analyze Disruption →
            </Button>
          ) : (
            <Button
              size="sm"
              variant="danger"
              onClick={() => setShowDisruptionModal(true)}
              icon={<Zap className="w-4 h-4" />}
            >
              Simulate Disruption
            </Button>
          )}
        </div>
      </div>

      {/* Disruption / Recovery Notice Bar */}
      {isDisrupted && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-xs text-rose-300">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              <strong>Disruption Active:</strong> Flight AI-604 is delayed by 3 hours. 3 downstream bookings are affected.
            </span>
          </div>
          <Button
            size="sm"
            variant="glow"
            onClick={() => setCurrentView('disruption-center')}
          >
            Open Recovery Plans
          </Button>
        </div>
      )}

      {isRecovered && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Itinerary Restored:</strong> Smart ReRoute Plan applied. All bookings synchronized with zero cancellations.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
            Health: 92/100
          </span>
        </div>
      )}

      {/* Vertical Interactive Timeline */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Chronological Journey Timeline</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any booking card to inspect telemetry, live status, and cancellation terms.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 uppercase bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            September 15, 2026
          </span>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-emerald-500">
          {activeTrip.bookings.map((booking, index) => {
            const Icon = getIcon(booking.type);
            const isMissed = booking.status === 'MISSED' || booking.status === 'DELAYED';
            const isAtRisk = booking.status === 'AT_RISK';
            const isBookingRecovered = booking.status === 'RECOVERED';

            return (
              <div key={booking.id} className="relative group">
                {/* Timeline node icon on the line */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-4 -translate-x-1/2 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${
                    isMissed
                      ? 'bg-red-950 border-red-500 text-red-400 shadow-glow-danger'
                      : isAtRisk
                      ? 'bg-amber-950 border-amber-500 text-amber-400'
                      : isBookingRecovered
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-glow-emerald'
                      : 'bg-slate-900 border-cyan-500 text-cyan-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Booking Timeline Card */}
                <div
                  onClick={() => setSelectedBooking(booking)}
                  className={`p-5 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                    isMissed
                      ? 'bg-red-950/30 border-red-500/50 hover:bg-red-950/40'
                      : isAtRisk
                      ? 'bg-amber-950/30 border-amber-500/50 hover:bg-amber-950/40'
                      : isBookingRecovered
                      ? 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/40'
                      : 'bg-slate-800/60 border-slate-700/70 hover:border-cyan-500/50 hover:bg-slate-800/90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
                        {booking.displayStartTime}
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {booking.provider}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge status={booking.status} pulse={isMissed} />
                      <span className="text-xs font-mono font-bold text-slate-200">
                        ₹{booking.cost.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">{booking.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {booking.location}
                  </p>

                  {/* Diagnostic Alert Box */}
                  {booking.impactReason && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                      <AlertTriangle
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isMissed ? 'text-red-400' : isAtRisk ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      />
                      <span>{booking.impactReason}</span>
                    </div>
                  )}

                  {/* Card Footer info */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Ref: {booking.bookingRef}</span>
                    <span className="text-cyan-400 font-sans group-hover:underline">Click for details →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
