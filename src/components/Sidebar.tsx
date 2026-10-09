import React from 'react';
import {
  BarChart3,
  Brain,
  Droplets,
  Layers,
  LineChart,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { ScreenId, UserRole } from '../types/water';

interface SidebarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  userRole,
  onToggleRole,
  unreadCount = 2,
}) => {
  const navItems: Array<{ id: ScreenId; label: string; icon: React.ReactNode; badge?: string | number }> = [
    { id: 'overview', label: 'Overview', icon: <Layers className="w-5 h-5" /> },
    { id: 'water-budget', label: 'Water Budget', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'forecasts', label: 'Forecasts', icon: <TrendingUp className="w-5 h-5" /> },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: <Brain className="w-5 h-5" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { id: 'reports', label: 'Reports', icon: <LineChart className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 xl:w-72 bg-white border-r border-[#DFE7EF] flex flex-col justify-between shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#DFE7EF]/60">
          <div className="flex items-center gap-3">
            {/* Logo: Water droplet + neural nodes */}
            <div className="w-10 h-10 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center shadow-md relative overflow-hidden group">
              <svg className="w-6 h-6 text-[#00A6C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="rgba(0, 166, 199, 0.2)" stroke="#00A6C7" />
                <circle cx="12" cy="11" r="1.5" fill="#FFFFFF" />
                <circle cx="9" cy="15" r="1.5" fill="#FFFFFF" />
                <circle cx="15" cy="15" r="1.5" fill="#FFFFFF" />
                <line x1="12" y1="11" x2="9" y2="15" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 1" />
                <line x1="12" y1="11" x2="15" y2="15" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 1" />
                <line x1="9" y1="15" x2="15" y2="15" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#0B3C5D] text-[17px] tracking-tight">Aqua Mind AI</span>
              </div>
              <span className="text-[10px] font-semibold text-[#00A6C7] tracking-wider uppercase">Hydro-Telemetry</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-[#62748A] font-medium">Think Smarter. Save Every Drop.</p>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#E1F5FE] text-[#00677D] font-semibold shadow-xs relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-[#00A6C7] before:rounded-r'
                    : 'text-[#62748A] hover:bg-[#F4F8FB] hover:text-[#172B4D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#00A6C7]' : 'text-[#62748A]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#D64545] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Community Status & User Profile Role Switcher */}
      <div className="p-4 space-y-3 border-t border-[#DFE7EF]/60 bg-[#FAFCFE]">
        {/* Community Status Pill */}
        <div className="bg-[#F4F8FB] p-3 rounded-xl border border-[#DFE7EF]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#62748A]">Green Valley Status</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#E1F5FE] text-[#00677D]">
              94% Compliant
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#18A999] animate-pulse" />
            <span className="text-xs text-[#172B4D] font-medium truncate">Summer Conservation Cycle</span>
          </div>
        </div>

        {/* Role Toggle Switcher */}
        <div className="bg-white p-2.5 rounded-xl border border-[#DFE7EF] shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {userRole === 'admin' ? 'DA' : 'ER'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#172B4D] truncate">
                  {userRole === 'admin' ? 'David Adeleke' : 'Elena Rostova'}
                </span>
                <span className="text-[11px] text-[#62748A] flex items-center gap-1">
                  {userRole === 'admin' ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-[#00A6C7]" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3 text-[#18A999]" />
                      <span>Resident Viewer</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={onToggleRole}
              title={`Switch to ${userRole === 'admin' ? 'Viewer' : 'Admin'} Mode`}
              className="px-2 py-1 text-[11px] font-semibold rounded-md border border-[#DFE7EF] bg-[#F4F8FB] hover:bg-[#E1F5FE] hover:text-[#00677D] text-[#62748A] transition-colors shrink-0"
            >
              Switch
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
