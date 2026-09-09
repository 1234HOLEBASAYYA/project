export type BookingType = 'flight' | 'cab' | 'hotel' | 'activity' | 'train' | 'dining';

export type BookingStatus = 'CONFIRMED' | 'DELAYED' | 'MISSED' | 'AT_RISK' | 'RECOVERED' | 'CANCELLED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TripPreference = 'Budget' | 'Balanced' | 'Fastest' | 'Lowest Risk';

export interface Booking {
  id: string;
  type: BookingType;
  title: string;
  provider: string;
  bookingRef: string;
  origin?: string;
  destination?: string;
  location: string;
  startTime: string; // e.g. "2026-09-15T09:00:00" or "09:00 AM"
  endTime: string;   // e.g. "2026-09-15T11:00:00" or "11:00 AM"
  displayStartTime: string;
  displayEndTime: string;
  cost: number; // in INR
  status: BookingStatus;
  originalStartTime?: string;
  originalEndTime?: string;
  dependencies: string[]; // IDs of bookings that must happen before this
  riskLevel: RiskLevel;
  cancellationPolicy: string;
  impactReason?: string;
  notes?: string;
  recoveredBy?: string; // ID of recovery plan or option
  alternativeOptions?: {
    id: string;
    title: string;
    cost: number;
    time: string;
    provider: string;
  }[];
}

export interface Trip {
  id: string;
  name: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  displayDates: string;
  status: 'ON_TRACK' | 'DISRUPTED' | 'RECOVERED';
  preference: TripPreference;
  coverGradient: string;
  bookings: Booking[];
  healthScore: number;
  healthBreakdown: {
    scheduleReliability: number;
    costRisk: number;
    connectionSafety: number;
    bookingFlexibility: number;
  };
  totalCost: number;
  totalSaved: number;
}

export interface DisruptionEvent {
  id: string;
  tripId: string;
  bookingId: string;
  type: 'FLIGHT_DELAY' | 'FLIGHT_CANCELLED' | 'TRAIN_DELAY' | 'HOTEL_ISSUE' | 'WEATHER_ALERT';
  severity: 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  delayMinutes: number;
  reportedAt: string;
  originalTime: string;
  newTime: string;
}

export interface RecoveryAction {
  bookingId: string;
  actionType: 'KEEP' | 'REBOOK' | 'RESCHEDULE' | 'CANCEL' | 'SUBSTITUTE_MODE' | 'NOTIFY_LATE';
  title: string;
  description: string;
  costDelta: number;
  timeDeltaMinutes: number;
  newStatus: BookingStatus;
  newStartTime?: string;
  newEndTime?: string;
  newProvider?: string;
}

export interface RecoveryPlan {
  id: 'PLAN_A' | 'PLAN_B' | 'PLAN_C';
  code: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  isAiRecommended: boolean;
  score: number; // 0-100
  extraCost: number;
  timeLostMinutes: number;
  displayTimeLost: string;
  affectedBookingsCount: number;
  bookingsSavedCount: number;
  risk: 'Low' | 'Medium' | 'High';
  riskScore: number;
  convenienceScore: number;
  changesCount: number;
  summary: string;
  bulletPoints: string[];
  actions: RecoveryAction[];
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
  scoreBreakdown: {
    costScore: number;
    timeScore: number;
    convenienceScore: number;
    bookingsSavedScore: number;
    riskScore: number;
  };
}

export interface ImpactNode {
  id: string;
  title: string;
  type: BookingType;
  status: BookingStatus;
  time: string;
  location: string;
  impactReason?: string;
  upstreamBookingId?: string;
  downstreamIds: string[];
  level: number; // 0, 1, 2, 3 in cascade tree
}

export interface WhatIfAlternative {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'KEEP_DELAY' | 'ALT_FLIGHT' | 'EXPRESS_TRAIN' | 'CHANGE_HOTEL';
  affectedCount: number;
  extraCost: number;
  estimatedArrival: string;
  impactReductionPercent: number;
  risk: 'Low' | 'Medium' | 'High';
  pros: string;
  cons: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
  title: string;
  description: string;
  tripId: string;
}
