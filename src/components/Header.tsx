import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Plus,
  RefreshCw,
  Shield,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { ScreenId, UserRole } from '../types/water';

interface HeaderProps {
  currentScreen: ScreenId;
  userRole: UserRole;
  onOpenRecordModal: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  userRole,
  onOpenRecordModal,
  onOpenNotifications,
  unreadCount = 2,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const [selectedCommunity, setSelectedCommunity] = useState('Green Valley Community (Phase 1-4)');
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  const communities = [
    'Green Valley Community (Phase 1-4)',
    'Desert Springs Eco-District',
    'Verde Mesa Master Association',
  ];

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#DFE7EF] sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger + Community Selector & Cycle */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-[#62748A] hover:text-[#172B4D] hover:bg-[#F4F8FB] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {/* Community Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F4F8FB] hover:bg-[#EBF3F9] border border-[#DFE7EF] rounded-lg text-xs md:text-sm font-semibold text-[#172B4D] transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#00A6C7] shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-[260px]">{selectedCommunity}</span>
            <ChevronDown className="w-4 h-4 text-[#62748A] shrink-0" />
          </button>

          {isCommunityDropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-72 bg-white rounded-xl shadow-lg border border-[#DFE7EF] py-1 z-50">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#62748A] uppercase tracking-wider border-b border-[#DFE7EF]/60">
                Registered Communities
              </div>
              {communities.map((comm) => (
                <button
                  key={comm}
                  onClick={() => {
                    setSelectedCommunity(comm);
                    setIsCommunityDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-[#F4F8FB] transition-colors ${
                    comm === selectedCommunity ? 'text-[#00A6C7] font-semibold bg-[#F4F8FB]/50' : 'text-[#172B4D]'
                  }`}
                >
                  {comm}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Cycle Pill (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-[#F4F8FB] rounded-lg text-xs text-[#62748A] border border-[#DFE7EF]/60">
          <Calendar className="w-3.5 h-3.5 text-[#00A6C7]" />
          <span className="font-medium text-[#172B4D]">Current Cycle: July 1 – July 31, 2025</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Sensor Live Sync status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#F4F8FB] rounded-full border border-[#DFE7EF]/60 text-xs text-[#62748A]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6C7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6C7]"></span>
          </span>
          <span className="font-medium text-[12px]">Sensors Synced (12m ago)</span>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-[#62748A] hover:text-[#172B4D] hover:bg-[#F4F8FB] rounded-lg transition-colors"
          title="View Alerts & Notifications"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D64545] text-white text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Primary Action Button: Record Reading */}
        <button
          onClick={onOpenRecordModal}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#0B3C5D] hover:bg-[#082C44] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-[0.99]"
        >
          <Plus className="w-4 h-4 text-[#00A6C7]" />
          <span className="whitespace-nowrap">Record Reading</span>
        </button>

        {/* Role Indicator Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F8FB] rounded-lg border border-[#DFE7EF] text-[11px] font-semibold text-[#62748A]">
          <Shield className="w-3.5 h-3.5 text-[#0B3C5D]" />
          <span className="uppercase tracking-wider">{userRole === 'admin' ? 'Admin' : 'Viewer'}</span>
        </div>
      </div>
    </header>
  );
};
