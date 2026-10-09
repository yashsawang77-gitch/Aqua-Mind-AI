import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExportModal } from './components/modals/ExportModal';
import { RecordReadingModal } from './components/modals/RecordReadingModal';
import { SimulateScenarioModal } from './components/modals/SimulateScenarioModal';
import { Sidebar } from './components/Sidebar';
import { defaultCommunityProfile, initialBudgetState } from './data/mockData';
import { AiInsights } from './screens/AiInsights';
import { BudgetPlanner } from './screens/BudgetPlanner';
import { DashboardOverview } from './screens/DashboardOverview';
import { DemandForecasts } from './screens/DemandForecasts';
import { ReportsAnalytics } from './screens/ReportsAnalytics';
import { SettingsConfig } from './screens/SettingsConfig';
import { BudgetState, CommunityProfile, ScreenId, UserRole } from './types/water';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('overview');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [budgetState, setBudgetState] = useState<BudgetState>(initialBudgetState);
  const [communityProfile, setCommunityProfile] = useState<CommunityProfile>(defaultCommunityProfile);
  const [hasAppliedPreset, setHasAppliedPreset] = useState<boolean>(false);

  // Modals state
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Role toggle
  const handleToggleRole = () => {
    setUserRole((prev) => (prev === 'admin' ? 'viewer' : 'admin'));
  };

  // Preset applied from overview or forecast
  const handleApplyPreset = () => {
    setBudgetState((prev) => ({
      ...prev,
      residential: 52000,
      commercial: 18000,
      facilities: 12000,
      landscaping: 4500,
      activePreset: 'conservation',
    }));
    setHasAppliedPreset(true);
  };

  // Scenario applied from simulation modal
  const handleApplyScenario = (scenario: {
    residential: number;
    commercial: number;
    facilities: number;
    landscaping: number;
  }) => {
    setBudgetState((prev) => ({
      ...prev,
      ...scenario,
      activePreset: 'custom',
    }));
    setHasAppliedPreset(true);
    setCurrentScreen('water-budget');
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-[#F4F8FB] text-[#172B4D] antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          currentScreen={currentScreen}
          onSelectScreen={handleNavigate}
          userRole={userRole}
          onToggleRole={handleToggleRole}
          unreadCount={2}
        />
      </div>

      {/* Mobile Off-Canvas Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0B3C5D]/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white z-10 shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-200">
            <Sidebar
              currentScreen={currentScreen}
              onSelectScreen={handleNavigate}
              userRole={userRole}
              onToggleRole={handleToggleRole}
              unreadCount={2}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentScreen={currentScreen}
          userRole={userRole}
          onOpenRecordModal={() => setIsRecordModalOpen(true)}
          onOpenNotifications={() => handleNavigate('ai-insights')}
          unreadCount={2}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentScreen === 'overview' && (
            <DashboardOverview
              onNavigate={handleNavigate}
              onOpenSimulation={() => setIsSimulationModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              userRole={userRole}
              onApplyPreset={handleApplyPreset}
              hasAppliedPreset={hasAppliedPreset}
            />
          )}

          {currentScreen === 'water-budget' && (
            <BudgetPlanner
              userRole={userRole}
              onOpenExport={() => setIsExportModalOpen(true)}
              budgetState={budgetState}
              onUpdateBudget={setBudgetState}
            />
          )}

          {currentScreen === 'forecasts' && (
            <DemandForecasts
              onNavigate={handleNavigate}
              onOpenSimulation={() => setIsSimulationModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              userRole={userRole}
            />
          )}

          {currentScreen === 'ai-insights' && (
            <AiInsights
              onNavigate={handleNavigate}
              onOpenSimulation={() => setIsSimulationModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              userRole={userRole}
              onMitigationApplied={handleApplyPreset}
            />
          )}

          {currentScreen === 'reports' && (
            <ReportsAnalytics
              userRole={userRole}
              onOpenExport={() => setIsExportModalOpen(true)}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsConfig
              userRole={userRole}
              communityProfile={communityProfile}
              onUpdateProfile={setCommunityProfile}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <RecordReadingModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onSuccess={() => {
          // Toast or state update
        }}
      />

      <SimulateScenarioModal
        isOpen={isSimulationModalOpen}
        onClose={() => setIsSimulationModalOpen(false)}
        onApplyScenario={handleApplyScenario}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
