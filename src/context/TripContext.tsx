import React, { createContext, useContext, useState, useEffect } from 'react';
import { Trip, DisruptionEvent, RecoveryPlan, ActivityLog, Booking, TripPreference } from '../types';
import { INITIAL_TRIPS, INITIAL_ACTIVITY_LOGS } from '../data/seedData';
import { analyzeDisruptionImpact, ImpactAnalysisResult } from '../engine/impactAnalyzer';
import { generateRecoveryPlans, applyRecoveryPlanToTrip } from '../engine/recoveryEngine';
import confetti from 'canvas-confetti';

interface TripContextType {
  trips: Trip[];
  activeTripId: string;
  activeTrip: Trip;
  currentView: string;
  activeDisruption: DisruptionEvent | null;
  impactResult: ImpactAnalysisResult | null;
  recoveryPlans: RecoveryPlan[];
  selectedPlanId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C';
  activityLogs: ActivityLog[];
  showDisruptionModal: boolean;
  showSuccessModal: boolean;
  selectedBooking: Booking | null;
  isAnalyzing: boolean;
  userSettings: {
    name: string;
    email: string;
    phone: string;
    preference: TripPreference;
    autoRecoverThreshold: number;
    budgetWeight: number;
    timeWeight: number;
    comfortWeight: number;
    safetyWeight: number;
    notificationsEnabled: boolean;
    smsAlerts: boolean;
  };
  setCurrentView: (view: string) => void;
  setActiveTripId: (id: string) => void;
  triggerDisruption: (options?: {
    type?: 'FLIGHT_DELAY' | 'FLIGHT_CANCELLED' | 'TRAIN_DELAY' | 'HOTEL_ISSUE' | 'WEATHER_ALERT';
    delayMinutes?: number;
    bookingId?: string;
  }) => void;
  runAnalysisSequence: (onComplete?: () => void) => void;
  applySelectedPlan: (planId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C') => void;
  resetAllData: () => void;
  createNewTrip: (tripData: Partial<Trip>) => void;
  setShowDisruptionModal: (open: boolean) => void;
  setShowSuccessModal: (open: boolean) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  setSelectedPlanId: (planId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C') => void;
  updateUserSettings: (newSettings: Partial<TripContextType['userSettings']>) => void;
  lastRecoveredPlan: RecoveryPlan | null;
}

const STORAGE_KEY_TRIPS = 'reroute_ai_trips_v1';
const STORAGE_KEY_LOGS = 'reroute_ai_logs_v1';
const STORAGE_KEY_SETTINGS = 'reroute_ai_settings_v1';

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TRIPS);
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [activeTripId, setActiveTripId] = useState<string>('trip-blr-bom');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [activeDisruption, setActiveDisruption] = useState<DisruptionEvent | null>(null);
  const [impactResult, setImpactResult] = useState<ImpactAnalysisResult | null>(null);
  const [recoveryPlans, setRecoveryPlans] = useState<RecoveryPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<'PLAN_A' | 'PLAN_B' | 'PLAN_C'>('PLAN_C');
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  const [showDisruptionModal, setShowDisruptionModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [lastRecoveredPlan, setLastRecoveredPlan] = useState<RecoveryPlan | null>(null);

  const [userSettings, setUserSettings] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@techinnovate.io',
    phone: '+91 98450 12345',
    preference: 'Balanced' as TripPreference,
    autoRecoverThreshold: 85,
    budgetWeight: 25,
    timeWeight: 25,
    comfortWeight: 20,
    safetyWeight: 30,
    notificationsEnabled: true,
    smsAlerts: true,
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      setUserSettings(JSON.parse(saved));
    }
  }, []);

  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0];

  // Helper to add activity log
  const addLog = (type: ActivityLog['type'], title: string, description: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      type,
      title,
      description,
      tripId: activeTripId,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Trigger simulated disruption
  const triggerDisruption = (options?: {
    type?: 'FLIGHT_DELAY' | 'FLIGHT_CANCELLED' | 'TRAIN_DELAY' | 'HOTEL_ISSUE' | 'WEATHER_ALERT';
    delayMinutes?: number;
    bookingId?: string;
  }) => {
    const delayMinutes = options?.delayMinutes ?? 180;
    const targetBookingId = options?.bookingId ?? 'bk-flight-604';
    const disruptionType = options?.type ?? 'FLIGHT_DELAY';

    const disruption: DisruptionEvent = {
      id: `disrupt-${Date.now()}`,
      tripId: activeTripId,
      bookingId: targetBookingId,
      type: disruptionType,
      severity: delayMinutes >= 180 ? 'CRITICAL' : 'HIGH',
      title: `Air India AI-604 Delayed by ${Math.round(delayMinutes / 60)} Hours`,
      description: `Flight AI-604 (BLR → BOM) delayed due to ATC congestion. New estimated arrival: 02:00 PM (originally 11:00 AM).`,
      delayMinutes,
      reportedAt: '11:23 AM IST',
      originalTime: '11:00 AM',
      newTime: '02:00 PM',
    };

    // Run impact detection engine
    const analysis = analyzeDisruptionImpact(activeTrip, targetBookingId, delayMinutes);
    const plans = generateRecoveryPlans(activeTrip, delayMinutes);

    // Update active trip state with disrupted bookings
    setTrips((prevTrips) =>
      prevTrips.map((t) => {
        if (t.id === activeTripId) {
          return {
            ...t,
            status: 'DISRUPTED',
            healthScore: 61,
            healthBreakdown: {
              scheduleReliability: 45,
              costRisk: 68,
              connectionSafety: 40,
              bookingFlexibility: 82,
            },
            bookings: analysis.updatedBookings,
          };
        }
        return t;
      })
    );

    setActiveDisruption(disruption);
    setImpactResult(analysis);
    setRecoveryPlans(plans);
    setSelectedPlanId('PLAN_C');
    setShowDisruptionModal(false);

    addLog(
      'ALERT',
      'Disruption Cascade Detected',
      `Flight AI-604 delay (+${Math.round(delayMinutes / 60)}h) impacted ${analysis.affectedCount} connected bookings.`
    );

    // Transition to Disruption Center
    setCurrentView('disruption-center');
  };

  // Run animated multi-stage recovery analysis sequence
  const runAnalysisSequence = (onComplete?: () => void) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      addLog('INFO', 'AI Recovery Optimization Complete', 'Synthesized 3 Pareto-optimal recovery plans.');
      if (onComplete) {
        onComplete();
      } else {
        setCurrentView('recovery-plans');
      }
    }, 2800);
  };

  // Apply selected recovery plan
  const applySelectedPlan = (planId: 'PLAN_A' | 'PLAN_B' | 'PLAN_C') => {
    const selectedPlan = recoveryPlans.find((p) => p.id === planId) || recoveryPlans[2];
    if (!selectedPlan) return;

    const restoredTrip = applyRecoveryPlanToTrip(activeTrip, selectedPlan);

    setTrips((prevTrips) =>
      prevTrips.map((t) => (t.id === activeTripId ? restoredTrip : t))
    );

    setLastRecoveredPlan(selectedPlan);
    setActiveDisruption(null);
    setShowSuccessModal(true);

    addLog(
      'SUCCESS',
      `Recovery Applied: ${selectedPlan.name}`,
      `Restored 100% trip connectivity with ₹${selectedPlan.extraCost} adjustment.`
    );

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Reset demo to fresh initial state
  const resetAllData = () => {
    setTrips(INITIAL_TRIPS);
    setActiveTripId('trip-blr-bom');
    setActiveDisruption(null);
    setImpactResult(null);
    setRecoveryPlans([]);
    setSelectedPlanId('PLAN_C');
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setShowDisruptionModal(false);
    setShowSuccessModal(false);
    setSelectedBooking(null);
    localStorage.removeItem(STORAGE_KEY_TRIPS);
    localStorage.removeItem(STORAGE_KEY_LOGS);
    addLog('INFO', 'System Reset', 'Demo environment restored to baseline on-track state.');
  };

  // Create new trip
  const createNewTrip = (tripData: Partial<Trip>) => {
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      name: tripData.name || 'New Journey',
      origin: tripData.origin || 'Bangalore (BLR)',
      destination: tripData.destination || 'Goa (GOI)',
      startDate: tripData.startDate || '2026-11-10',
      endDate: tripData.endDate || '2026-11-14',
      displayDates: tripData.displayDates || 'Nov 10 - Nov 14',
      status: 'ON_TRACK',
      preference: tripData.preference || 'Balanced',
      coverGradient: 'from-cyan-600/30 via-blue-500/20 to-teal-600/30',
      totalCost: 12000,
      totalSaved: 0,
      healthScore: 95,
      healthBreakdown: {
        scheduleReliability: 96,
        costRisk: 92,
        connectionSafety: 95,
        bookingFlexibility: 97,
      },
      bookings: [
        {
          id: `bk-fl-${Date.now()}`,
          type: 'flight',
          title: `Flight (${tripData.origin || 'BLR'} → ${tripData.destination || 'GOI'})`,
          provider: 'Akasa Air',
          bookingRef: 'QP-7712',
          location: 'Terminal 1',
          startTime: '08:00 AM',
          endTime: '09:30 AM',
          displayStartTime: '08:00 AM',
          displayEndTime: '09:30 AM',
          cost: 4500,
          status: 'CONFIRMED',
          dependencies: [],
          riskLevel: 'LOW',
          cancellationPolicy: 'Standard refundable fee applies',
        },
        {
          id: `bk-ht-${Date.now()}`,
          type: 'hotel',
          title: 'Resort Stay',
          provider: 'Taj Exotica Resort',
          bookingRef: 'TAJ-GOA-199',
          location: 'Benaulim, South Goa',
          startTime: '11:00 AM',
          endTime: '12:00 PM (+3 days)',
          displayStartTime: '11:00 AM',
          displayEndTime: '3 Nights',
          cost: 7500,
          status: 'CONFIRMED',
          dependencies: [`bk-fl-${Date.now()}`],
          riskLevel: 'LOW',
          cancellationPolicy: 'Free cancellation up to 48 hours',
        }
      ]
    };

    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    addLog('SUCCESS', 'New Trip Created', `Initialized itinerary for ${newTrip.name}.`);
  };

  const updateUserSettings = (newSettings: Partial<TripContextType['userSettings']>) => {
    setUserSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        activeTripId,
        activeTrip,
        currentView,
        activeDisruption,
        impactResult,
        recoveryPlans,
        selectedPlanId,
        activityLogs,
        showDisruptionModal,
        showSuccessModal,
        selectedBooking,
        isAnalyzing,
        userSettings,
        lastRecoveredPlan,
        setCurrentView,
        setActiveTripId,
        triggerDisruption,
        runAnalysisSequence,
        applySelectedPlan,
        resetAllData,
        createNewTrip,
        setShowDisruptionModal,
        setShowSuccessModal,
        setSelectedBooking,
        setSelectedPlanId,
        updateUserSettings,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
