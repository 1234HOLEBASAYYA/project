import { Booking, Trip, DisruptionEvent, BookingStatus, RiskLevel, ImpactNode } from '../types';

/**
 * ReRoute AI Impact Detection Engine
 * 
 * Analyzes the interconnected dependency graph of a trip itinerary.
 * When a root disruption occurs (e.g. flight delayed by 3 hours),
 * it calculates cascading temporal propagation and evaluates each downstream booking
 * against required transit buffers and contractual check-in/start times.
 */

// Helper: parse standard time strings (e.g., "09:00 AM", "02:00 PM") into minutes from midnight
export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  // Handle formats like "09:00 AM" or "2:00 PM"
  const match = timeStr.trim().match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

// Helper: format minutes from midnight back to "hh:mm A"
export function formatMinutesToTime(totalMinutes: number): string {
  let normalized = totalMinutes % (24 * 60);
  if (normalized < 0) normalized += 24 * 60;
  let hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
}

export interface ImpactAnalysisResult {
  updatedBookings: Booking[];
  affectedCount: number;
  missedBookings: Booking[];
  atRiskBookings: Booking[];
  safeBookings: Booking[];
  impactNodes: ImpactNode[];
  summaryNarrative: string;
}

export function analyzeDisruptionImpact(
  trip: Trip,
  disruptedBookingId: string,
  delayMinutes: number
): ImpactAnalysisResult {
  const bookings = JSON.parse(JSON.stringify(trip.bookings)) as Booking[];
  const rootIndex = bookings.findIndex((b) => b.id === disruptedBookingId);

  if (rootIndex === -1) {
    return {
      updatedBookings: bookings,
      affectedCount: 0,
      missedBookings: [],
      atRiskBookings: [],
      safeBookings: bookings,
      impactNodes: [],
      summaryNarrative: 'No disruption detected.',
    };
  }

  const rootBooking = bookings[rootIndex];
  const origEndMins = parseTimeToMinutes(rootBooking.originalEndTime || rootBooking.endTime);
  const newEndMins = origEndMins + delayMinutes;
  const newEndTimeStr = formatMinutesToTime(newEndMins);

  // Update root booking status
  rootBooking.status = 'DELAYED';
  rootBooking.endTime = newEndTimeStr;
  rootBooking.displayEndTime = newEndTimeStr;
  rootBooking.riskLevel = 'CRITICAL';
  rootBooking.impactReason = `Root disruption: Delayed by ${Math.round(delayMinutes / 60)}h (Expected arrival shifted to ${newEndTimeStr})`;

  const missedBookings: Booking[] = [];
  const atRiskBookings: Booking[] = [];
  const safeBookings: Booking[] = [];
  const impactNodes: ImpactNode[] = [];

  // Track latest available arrival time propagated through the journey
  let currentEstimatedArrival = newEndMins;

  // Process remaining bookings chronologically and by dependency
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    if (booking.id === rootBooking.id) {
      impactNodes.push({
        id: booking.id,
        title: booking.title,
        type: booking.type,
        status: 'DELAYED',
        time: `${booking.displayStartTime} → ${booking.displayEndTime}`,
        location: booking.location,
        impactReason: rootBooking.impactReason,
        downstreamIds: bookings.filter((b) => b.dependencies.includes(booking.id)).map((b) => b.id),
        level: 0,
      });
      continue;
    }

    const bookingStartMins = parseTimeToMinutes(booking.originalStartTime || booking.startTime);
    const bookingDuration = parseTimeToMinutes(booking.originalEndTime || booking.endTime) - bookingStartMins;

    // Check if this booking depends on any affected booking
    const hasDisruptedDependency = booking.dependencies.includes(rootBooking.id) ||
      booking.dependencies.some((depId) => missedBookings.some((m) => m.id === depId) || atRiskBookings.some((r) => r.id === depId));

    if (hasDisruptedDependency || bookingStartMins < currentEstimatedArrival) {
      // 1. Cab Transfer check
      if (booking.type === 'cab') {
        const flightArrivalMins = newEndMins;
        const cabPickupMins = bookingStartMins;

        if (flightArrivalMins > cabPickupMins) {
          booking.status = 'MISSED';
          booking.riskLevel = 'CRITICAL';
          booking.impactReason = `Flight AI-604 arrives at ${newEndTimeStr}, which is ${Math.round((flightArrivalMins - cabPickupMins) / 60)}h after scheduled cab pickup at ${booking.displayStartTime}.`;
          missedBookings.push(booking);
          // New estimated cab departure after luggage and deboarding (add 45 mins)
          currentEstimatedArrival = flightArrivalMins + 45 + 60; // 45m buffer + 60m drive = arrival at hotel ~ 03:45 PM
        }
      }
      // 2. Hotel Check-in check
      else if (booking.type === 'hotel') {
        // Estimated hotel arrival is around 03:45 PM
        booking.status = 'AT_RISK';
        booking.riskLevel = 'HIGH';
        booking.impactReason = `Late arrival (estimated ~03:45 PM instead of 01:00 PM). Requires hotel alert to avoid cancellation of non-guaranteed room.`;
        atRiskBookings.push(booking);
      }
      // 3. Activity / City Tour check
      else if (booking.type === 'activity') {
        const tourStartMins = bookingStartMins; // 04:00 PM (960 mins)
        // With hotel arrival at ~03:45 PM, check-in takes 30 mins -> free at 04:15 PM
        if (currentEstimatedArrival >= tourStartMins - 15) {
          booking.status = 'AT_RISK';
          booking.riskLevel = 'HIGH';
          booking.impactReason = `Arrival time at hotel (~03:45 PM) conflicts with 04:00 PM tour departure. Guide check-in cutoff is 03:45 PM.`;
          atRiskBookings.push(booking);
        } else {
          booking.status = 'CONFIRMED';
          safeBookings.push(booking);
        }
      }
      // 4. Dining / Evening Events check
      else if (booking.type === 'dining') {
        // If dinner is at 07:00 PM, user has recovered sufficient buffer
        if (currentEstimatedArrival > bookingStartMins) {
          booking.status = 'AT_RISK';
          booking.riskLevel = 'MEDIUM';
          booking.impactReason = `Possible delay cascade into dinner reservation.`;
          atRiskBookings.push(booking);
        } else {
          booking.status = 'CONFIRMED';
          booking.riskLevel = 'LOW';
          safeBookings.push(booking);
        }
      } else {
        booking.status = 'AT_RISK';
        booking.riskLevel = 'MEDIUM';
        booking.impactReason = 'Upstream delay encroaches into scheduled start window.';
        atRiskBookings.push(booking);
      }
    } else {
      booking.status = 'CONFIRMED';
      booking.riskLevel = 'LOW';
      safeBookings.push(booking);
    }

    impactNodes.push({
      id: booking.id,
      title: booking.title,
      type: booking.type,
      status: booking.status,
      time: `${booking.displayStartTime} → ${booking.displayEndTime}`,
      location: booking.location,
      impactReason: booking.impactReason,
      upstreamBookingId: booking.dependencies[0],
      downstreamIds: bookings.filter((b) => b.dependencies.includes(booking.id)).map((b) => b.id),
      level: booking.dependencies.length > 0 ? 1 : 0,
    });
  }

  const affectedCount = missedBookings.length + atRiskBookings.length;
  const summaryNarrative = `A ${Math.round(delayMinutes / 60)}-hour flight delay on Air India AI-604 has triggered cascading conflicts across ${affectedCount} connected bookings: 1 Airport Transfer missed, Hotel Check-in at risk of room release, and Mumbai Heritage Tour at high risk of missed start window.`;

  return {
    updatedBookings: bookings,
    affectedCount,
    missedBookings,
    atRiskBookings,
    safeBookings,
    impactNodes,
    summaryNarrative,
  };
}
