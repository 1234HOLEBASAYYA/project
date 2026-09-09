import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { CreateTripModal } from '../components/features/CreateTripModal';
import {
  Plus,
  Compass,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const MyTrips: React.FC = () => {
  const { trips, activeTripId, setActiveTripId, setCurrentView, setShowDisruptionModal } = useTrip();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header with Title and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Travel Journeys
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage active, scheduled, and recovered multi-booking itineraries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="glow"
            onClick={() => setShowCreateModal(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            + Create New Trip
          </Button>
        </div>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip) => {
          const isActive = trip.id === activeTripId;
          const isDisrupted = trip.status === 'DISRUPTED';
          const isRecovered = trip.status === 'RECOVERED';

          return (
            <div
              key={trip.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900/95 border-cyan-500/50 shadow-2xl shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top cover ambient gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
                  isDisrupted
                    ? 'from-red-500 to-rose-600'
                    : isRecovered
                    ? 'from-emerald-500 to-cyan-500'
                    : 'from-blue-600 via-cyan-500 to-purple-600'
                }`}
              />

              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {trip.preference} Mode
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        ACTIVE CONTEXT
                      </span>
                    )}
                  </div>
                  <Badge status={trip.status} pulse={isDisrupted} />
                </div>

                {/* Trip Title & Route */}
                <h3 className="text-xl font-bold text-white tracking-tight">{trip.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{trip.origin} → {trip.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{trip.displayDates}</span>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Bookings</span>
                    <span className="font-bold text-slate-200 font-mono text-sm">{trip.bookings.length} Linked</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Health</span>
                    <span className="font-bold text-cyan-400 font-mono text-sm">{trip.healthScore}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Total Value</span>
                    <span className="font-bold text-slate-200 font-mono text-sm">₹{trip.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <Button
                  size="sm"
                  variant={isActive ? 'primary' : 'secondary'}
                  onClick={() => {
                    setActiveTripId(trip.id);
                    setCurrentView('trip-details');
                  }}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  View Itinerary
                </Button>

                {isDisrupted ? (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setActiveTripId(trip.id);
                      setCurrentView('disruption-center');
                    }}
                    icon={<Zap className="w-3.5 h-3.5" />}
                  >
                    Resolve Disruption
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setActiveTripId(trip.id);
                      setShowDisruptionModal(true);
                    }}
                    className="text-xs text-slate-400 hover:text-red-400"
                  >
                    Simulate Incident
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CreateTripModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};
