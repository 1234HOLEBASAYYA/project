import React from 'react';
import { useTrip } from '../../context/TripContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Plane,
  Car,
  Hotel,
  Ticket,
  Train,
  Utensils,
  MapPin,
  Clock,
  IndianRupee,
  ShieldAlert,
  GitFork,
  FileText,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const BookingDetailModal: React.FC = () => {
  const { selectedBooking, setSelectedBooking, setCurrentView, activeTrip } = useTrip();

  if (!selectedBooking) return null;

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
      case 'train':
        return Train;
      case 'dining':
        return Utensils;
      default:
        return MapPin;
    }
  };

  const Icon = getIcon(selectedBooking.type);

  // Find upstream dependency names
  const upstreamBookings = activeTrip.bookings.filter((b) =>
    selectedBooking.dependencies.includes(b.id)
  );

  // Find downstream bookings that depend on this
  const downstreamBookings = activeTrip.bookings.filter((b) =>
    b.dependencies.includes(selectedBooking.id)
  );

  return (
    <Modal
      isOpen={!!selectedBooking}
      onClose={() => setSelectedBooking(null)}
      title="Booking Telemetry & Dependency Inspector"
      subtitle={`Reference: ${selectedBooking.bookingRef}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedBooking.provider}
                </span>
                <Badge status={selectedBooking.status} pulse={selectedBooking.status === 'MISSED' || selectedBooking.status === 'DELAYED'} />
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{selectedBooking.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {selectedBooking.location}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-400 uppercase">Total Fare</span>
            <p className="text-xl font-extrabold font-mono text-white">₹{selectedBooking.cost.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Impact Diagnostic Alert if affected */}
        {selectedBooking.impactReason && (
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
              selectedBooking.status === 'MISSED' || selectedBooking.status === 'DELAYED'
                ? 'bg-red-500/10 border-red-500/40 text-red-300'
                : selectedBooking.status === 'AT_RISK'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Diagnostic Status:</strong>
              <p className="mt-0.5 leading-relaxed">{selectedBooking.impactReason}</p>
            </div>
          </div>
        )}

        {/* Schedule & Timing Comparison */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Start / Departure Window
            </span>
            <p className="text-base font-bold font-mono text-white mt-0.5">
              {selectedBooking.displayStartTime}
            </p>
            {selectedBooking.originalStartTime && selectedBooking.originalStartTime !== selectedBooking.displayStartTime && (
              <p className="text-[10px] text-slate-400 line-through">Original: {selectedBooking.originalStartTime}</p>
            )}
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              End / Arrival Window
            </span>
            <p className="text-base font-bold font-mono text-white mt-0.5">
              {selectedBooking.displayEndTime}
            </p>
            {selectedBooking.originalEndTime && selectedBooking.originalEndTime !== selectedBooking.displayEndTime && (
              <p className="text-[10px] text-slate-400 line-through">Original: {selectedBooking.originalEndTime}</p>
            )}
          </div>
        </div>

        {/* Cancellation Policy & Notes */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-1">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cancellation & Reschedule Policy</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{selectedBooking.cancellationPolicy}</p>
          </div>

          {selectedBooking.notes && (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Booking Metadata & Notes
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedBooking.notes}</p>
            </div>
          )}
        </div>

        {/* Dependency Relationship Graph */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <GitFork className="w-3.5 h-3.5 text-cyan-400" />
              Connected Itinerary Dependencies
            </span>
            <button
              onClick={() => {
                setSelectedBooking(null);
                setCurrentView('impact-map');
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Open Full Graph →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Upstream */}
            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                Preceding Dependencies (Must Arrive First)
              </span>
              {upstreamBookings.length > 0 ? (
                <ul className="space-y-1">
                  {upstreamBookings.map((b) => (
                    <li key={b.id} className="text-slate-200 font-medium flex items-center justify-between">
                      <span className="truncate">{b.title}</span>
                      <Badge status={b.status} size="xs" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">Root itinerary node (no prior dependencies)</p>
              )}
            </div>

            {/* Downstream */}
            <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                Downstream Bookings (Affected if Delayed)
              </span>
              {downstreamBookings.length > 0 ? (
                <ul className="space-y-1">
                  {downstreamBookings.map((b) => (
                    <li key={b.id} className="text-slate-200 font-medium flex items-center justify-between">
                      <span className="truncate">{b.title}</span>
                      <Badge status={b.status} size="xs" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">Terminal itinerary item</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            onClick={() => setSelectedBooking(null)}
          >
            Close Inspector
          </Button>
          {selectedBooking.status === 'MISSED' || selectedBooking.status === 'AT_RISK' ? (
            <Button
              variant="glow"
              onClick={() => {
                setSelectedBooking(null);
                setCurrentView('recovery-plans');
              }}
              icon={<ShieldAlert className="w-4 h-4" />}
            >
              Analyze Recovery Plans →
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedBooking(null);
                setCurrentView('impact-map');
              }}
            >
              View in Impact Map
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
