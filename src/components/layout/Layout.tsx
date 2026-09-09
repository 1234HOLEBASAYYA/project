import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SimulateDisruptionModal } from '../features/SimulateDisruptionModal';
import { RecoverySuccessModal } from '../features/RecoverySuccessModal';
import { BookingDetailModal } from '../features/BookingDetailModal';
import { LandingPage } from '../../pages/LandingPage';
import { Dashboard } from '../../pages/Dashboard';
import { MyTrips } from '../../pages/MyTrips';
import { TripDetails } from '../../pages/TripDetails';
import { DisruptionCenter } from '../../pages/DisruptionCenter';
import { RecoveryPlans } from '../../pages/RecoveryPlans';
import { ImpactMap } from '../../pages/ImpactMap';
import { WhatIfSimulator } from '../../pages/WhatIfSimulator';
import { Settings } from '../../pages/Settings';

export const Layout: React.FC = () => {
  const { currentView } = useTrip();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on landing page, display the dedicated full-screen landing view
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
        <LandingPage />
        <SimulateDisruptionModal />
        <RecoverySuccessModal />
        <BookingDetailModal />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'my-trips':
        return <MyTrips />;
      case 'trip-details':
        return <TripDetails />;
      case 'disruption-center':
        return <DisruptionCenter />;
      case 'recovery-plans':
        return <RecoveryPlans />;
      case 'impact-map':
        return <ImpactMap />;
      case 'what-if':
        return <WhatIfSimulator />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Header onOpenMobileMenu={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Action Modals */}
      <SimulateDisruptionModal />
      <RecoverySuccessModal />
      <BookingDetailModal />
    </div>
  );
};
