import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  Droplets,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Shield,
  Sliders,
  Sparkles,
  TrendingUp,
  Wind,
  Zap,
} from 'lucide-react';
import { ScreenId, UserRole } from '../types/water';

interface DashboardOverviewProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenSimulation: () => void;
  onOpenExport: () => void;
  userRole: UserRole;
  onApplyPreset: () => void;
  hasAppliedPreset: boolean;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onOpenSimulation,
  onOpenExport,
  userRole,
  onApplyPreset,
  hasAppliedPreset,
}) => {
  const [activeHorizon, setActiveHorizon] = useState<'7d' | '14d' | '30d'>('7d');
  const [unitMode, setUnitMode] = useState<'liters' | 'kl'>('liters');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'custom'>('today');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(4); // default highlight Friday
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const handleApplyPresetClick = () => {
    onApplyPreset();
    setFeedbackToast('5,000 L Conservation Preset successfully applied to active cycle.');
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-[1680px] mx-auto pb-12">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B3C5D] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#00A6C7]/40 animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-[#18A999]" />
          <span className="text-sm font-medium">{feedbackToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Header Action Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E1F5FE] text-[#00677D] text-[11px] font-bold uppercase tracking-wider">
              Hydro-Telemetric Grid
            </span>
            <span className="text-[#62748A] text-xs">•</span>
            <span className="text-xs font-semibold text-[#00A6C7]">Zone 04 District Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B3C5D] tracking-tight">Water Overview</h1>
          <p className="text-sm text-[#62748A] mt-0.5">
            Monitor availability, understand demand, and plan ahead with explainable neural telemetry.
          </p>
        </div>

        {/* Period Segmented Controls & Snapshot Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex p-1 bg-white border border-[#DFE7EF] rounded-xl shadow-2xs">
            <button
              onClick={() => setSelectedPeriod('today')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === 'today'
                  ? 'bg-[#E1F5FE] text-[#00677D] shadow-xs'
                  : 'text-[#62748A] hover:text-[#172B4D]'
              }`}
            >
              Today (Jul 24)
            </button>
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === 'week'
                  ? 'bg-[#E1F5FE] text-[#00677D] shadow-xs'
                  : 'text-[#62748A] hover:text-[#172B4D]'
              }`}
            >
              This Week (Jul 20–26)
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`hidden sm:block px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPeriod === 'month'
                  ? 'bg-[#E1F5FE] text-[#00677D] shadow-xs'
                  : 'text-[#62748A] hover:text-[#172B4D]'
              }`}
            >
              Month-to-Date (Jul 2025)
            </button>
            <button
              onClick={() => setSelectedPeriod('custom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                selectedPeriod === 'custom'
                  ? 'bg-[#E1F5FE] text-[#00677D] shadow-xs'
                  : 'text-[#62748A] hover:text-[#172B4D]'
              }`}
            >
              <span>Custom</span>
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F4F8FB] border border-[#DFE7EF] rounded-xl text-xs font-semibold text-[#0B3C5D] shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-[#00A6C7]" />
            <span>Export Snapshot</span>
          </button>
        </div>
      </div>

      {/* Role-based Informational Banner for Viewer */}
      {userRole === 'viewer' && (
        <div className="bg-[#EBF7FD] border border-[#00A6C7]/30 p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs text-[#004E5F]">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#00A6C7] text-white font-bold text-[10px]">VIEWER MODE</span>
            <span>You are viewing the community overview as a resident. Administrative actions require admin sign-in.</span>
          </div>
          <span className="font-semibold text-[#00A6C7]">Safe Water Target: 94% Met</span>
        </div>
      )}

      {/* Section A: 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Available Water */}
        <div className="bg-white rounded-xl p-5 border border-[#DFE7EF] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#62748A] uppercase tracking-wider">Available Water</span>
              <div className="w-8 h-8 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#00A6C7]">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-[#0B3C5D] tabular-nums">100,000</span>
              <span className="text-sm font-medium text-[#62748A]">L</span>
            </div>
            <p className="text-xs text-[#62748A] mt-1">Available for current planning period.</p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#DFE7EF]/70">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#62748A] font-medium">Capacity Utilized</span>
              <span className="text-[#0B3C5D] font-bold">72%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E8EDFF] overflow-hidden">
              <div className="h-full bg-[#00A6C7] rounded-full transition-all" style={{ width: '72%' }} />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E1F5FE] text-[#00677D] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6C7]" />
                Optimal Capacity
              </span>
              <span className="font-semibold text-[#62748A] tabular-nums">28,000 L Reserve</span>
            </div>
          </div>
        </div>

        {/* Card 2: Consumption Today */}
        <div className="bg-white rounded-xl p-5 border border-[#DFE7EF] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#62748A] uppercase tracking-wider">Consumption Today</span>
              <div className="w-8 h-8 rounded-full bg-[#F4F8FB] border border-[#DFE7EF] flex items-center justify-center text-[#0B3C5D]">
                <Zap className="w-4 h-4 text-[#00A6C7]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-[#0B3C5D] tabular-nums">72,000</span>
              <span className="text-sm font-medium text-[#62748A]">L</span>
            </div>
            <p className="text-xs text-[#62748A] mt-1">Recorded consumption today across 4 zones.</p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#DFE7EF]/70">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFEBEE] text-[#D64545] text-[11px] font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                +4.2% vs Yesterday
              </span>
              <span className="text-[11px] text-[#62748A]">Synced 12m ago</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs">
              <span className="text-[#62748A]">Daily Baseline Limit</span>
              <span className="text-[#0B3C5D] font-bold tabular-nums">75,000 L</span>
            </div>
          </div>
        </div>

        {/* Card 3: Forecast Demand */}
        <div className="bg-white rounded-xl p-5 border border-[#DFE7EF] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#62748A] uppercase tracking-wider">Forecast Demand</span>
              <div className="w-8 h-8 rounded-full bg-[#CEE5FF] flex items-center justify-center text-[#0B3C5D]">
                <Sparkles className="w-4 h-4 text-[#0B3C5D]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-[#0B3C5D] tabular-nums">105,000</span>
              <span className="text-sm font-medium text-[#62748A]">L/day</span>
            </div>
            <p className="text-xs text-[#62748A] mt-1">Predicted demand for tomorrow (Jul 25).</p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#DFE7EF]/70">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#CEE5FF] text-[#00263F] text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-[#00A6C7]" />
                AI Forecast 98.4% Conf.
              </span>
            </div>
            <div className="mt-2 text-[11px] text-[#62748A] font-medium truncate">
              Peaks: 06:30–09:30 & 18:00–21:00
            </div>
          </div>
        </div>

        {/* Card 4: Projected Deficit */}
        <div className="bg-white rounded-xl p-5 border border-[#D64545]/30 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#D64545]/5 rounded-bl-full pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#D64545] uppercase tracking-wider">Projected Deficit</span>
              <div className="w-8 h-8 rounded-full bg-[#FFEBEE] flex items-center justify-center text-[#D64545]">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold text-[#D64545] tabular-nums">
                {hasAppliedPreset ? '0' : '5,000'}
              </span>
              <span className="text-sm font-medium text-[#D64545]">L/day</span>
            </div>
            <p className="text-xs text-[#62748A] mt-1">
              {hasAppliedPreset
                ? 'Deficit eliminated via approved conservation levers.'
                : 'Potential shortfall if current inflow is unchanged.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D64545]/20">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  hasAppliedPreset ? 'bg-[#E0F2F1] text-[#0D685E]' : 'bg-[#D64545] text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {hasAppliedPreset ? 'Deficit Resolved' : 'Deficit Watch — Action Needed'}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-[#62748A] flex items-center justify-between font-medium">
              <span>Threshold Status</span>
              <span className={`font-bold ${hasAppliedPreset ? 'text-[#18A999]' : 'text-[#D64545]'}`}>
                {hasAppliedPreset ? 'Protected' : '+5.0% over supply'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section B: Main Analytics Row (8 cols vs 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8 cols): Water Supply vs. Demand Interactive Chart Card */}
        <div className="lg:col-span-8 bg-white rounded-xl p-5 sm:p-6 border border-[#DFE7EF] shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DFE7EF]/60">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#0B3C5D]">Water Supply vs. Demand</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#E1F5FE] text-[#00677D] text-[10px] font-bold uppercase tracking-wider">
                    Predictive Model v4.2
                  </span>
                </div>
                <p className="text-xs text-[#62748A] mt-0.5">
                  Historical telemetry (solid aqua), forecast demand (dashed navy), and 100k L safe operating ceiling.
                </p>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="inline-flex p-0.5 bg-[#F4F8FB] border border-[#DFE7EF] rounded-lg text-xs">
                  <button
                    onClick={() => setActiveHorizon('7d')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      activeHorizon === '7d' ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-[#62748A]'
                    }`}
                  >
                    7-Day View
                  </button>
                  <button
                    onClick={() => setActiveHorizon('14d')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      activeHorizon === '14d' ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-[#62748A]'
                    }`}
                  >
                    14-Day View
                  </button>
                  <button
                    onClick={() => setActiveHorizon('30d')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      activeHorizon === '30d' ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-[#62748A]'
                    }`}
                  >
                    30-Day Trend
                  </button>
                </div>

                <div className="inline-flex p-0.5 bg-[#F4F8FB] border border-[#DFE7EF] rounded-lg text-xs">
                  <button
                    onClick={() => setUnitMode('liters')}
                    className={`px-2 py-1 rounded-md font-semibold ${
                      unitMode === 'liters' ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-[#62748A]'
                    }`}
                  >
                    Liters
                  </button>
                  <button
                    onClick={() => setUnitMode('kl')}
                    className={`px-2 py-1 rounded-md font-semibold ${
                      unitMode === 'kl' ? 'bg-white text-[#0B3C5D] shadow-xs' : 'text-[#62748A]'
                    }`}
                  >
                    kL
                  </button>
                </div>
              </div>
            </div>

            {/* Legend Ribbon */}
            <div className="flex flex-wrap items-center gap-4 py-2 mt-2 px-3 bg-[#F4F8FB] rounded-lg text-xs text-[#172B4D]">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 rounded-full bg-[#00A6C7]" />
                <span className="font-medium">Actual Consumption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0 border-t-2 border-dashed border-[#0B3C5D]" />
                <span className="font-medium">Forecast Demand (AI)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0 border-t-2 border-dotted border-[#18A999]" />
                <span className="font-medium">Available Baseline (100k L)</span>
              </div>
              <div className="flex items-center gap-1.5 sm:ml-auto">
                <span className="w-3 h-3 rounded-xs bg-[#FFEBEE] border border-[#D64545]/40" />
                <span className="text-[#D64545] font-semibold text-[11px]">Deficit Breach Range</span>
              </div>
            </div>

            {/* Interactive SVG Chart Container */}
            <div className="relative w-full h-72 sm:h-80 bg-[#FAFCFE] rounded-xl p-3 sm:p-4 mt-3 border border-[#DFE7EF] overflow-hidden select-none">
              {/* Deficit Zone Backing Rectangle (Fri-Sun above 100k) */}
              <div className="absolute top-6 right-6 left-[46%] h-24 bg-[#FFEBEE]/40 border-l border-dashed border-[#D64545]/30 rounded-r-lg pointer-events-none" />

              <svg className="w-full h-full overflow-visible" viewBox="0 0 760 250" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="actualFlowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00A6C7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00A6C7" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="aiConfidenceBand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A3CBF2" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A3CBF2" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Horizontal Gridlines */}
                <line x1="50" y1="20" x2="740" y2="20" stroke="#DFE7EF" strokeDasharray="3 3" />
                <text x="15" y="24" fill="#62748A" fontSize="11" fontFamily="Inter">
                  {unitMode === 'liters' ? '120k L' : '120 kL'}
                </text>

                {/* 100k L Baseline Safe Yield Cap */}
                <line x1="50" y1="75" x2="740" y2="75" stroke="#00413A" strokeDasharray="6 4" strokeWidth="2" />
                <text x="15" y="79" fill="#00413A" fontSize="11" fontWeight="700" fontFamily="Inter">
                  {unitMode === 'liters' ? '100k L' : '100 kL'}
                </text>
                <g transform="translate(620, 62)">
                  <rect x="0" y="0" width="120" height="20" rx="4" fill="#0B3C5D" />
                  <text x="60" y="14" fill="#FFFFFF" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Inter">
                    Supply Ceiling 100k L
                  </text>
                </g>

                {/* 80k L */}
                <line x1="50" y1="130" x2="740" y2="130" stroke="#DFE7EF" strokeDasharray="3 3" />
                <text x="15" y="134" fill="#62748A" fontSize="11" fontFamily="Inter">
                  {unitMode === 'liters' ? '80k L' : '80 kL'}
                </text>

                {/* 60k L */}
                <line x1="50" y1="185" x2="740" y2="185" stroke="#DFE7EF" strokeDasharray="3 3" />
                <text x="15" y="189" fill="#62748A" fontSize="11" fontFamily="Inter">
                  {unitMode === 'liters' ? '60k L' : '60 kL'}
                </text>

                {/* Shaded AI Confidence Interval Band for Friday-Sunday */}
                <polygon
                  points="370,72 510,64 670,80 670,58 510,42 370,50"
                  fill="url(#aiConfidenceBand)"
                />

                {/* Area fill under Actual Historical Consumption */}
                <polygon points="70,163 170,154 270,146 370,152 370,220 70,220" fill="url(#actualFlowGrad)" />

                {/* Historical Actual Line */}
                <polyline
                  points="70,163 170,154 270,146 370,152"
                  fill="none"
                  stroke="#00A6C7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Historical Points */}
                <circle cx="70" cy="163" r="5" fill="#FFFFFF" stroke="#00A6C7" strokeWidth="2.5" />
                <circle cx="170" cy="154" r="5" fill="#FFFFFF" stroke="#00A6C7" strokeWidth="2.5" />
                <circle cx="270" cy="146" r="5" fill="#FFFFFF" stroke="#00A6C7" strokeWidth="2.5" />
                <circle cx="370" cy="152" r="6" fill="#00A6C7" stroke="#FFFFFF" strokeWidth="2" />

                {/* Vertical Timeline Divider for Today */}
                <line x1="370" y1="20" x2="370" y2="220" stroke="#0B3C5D" strokeDasharray="3 3" opacity="0.6" strokeWidth="1.5" />

                {/* Forecast Line (Dashed Navy) */}
                <polyline
                  points="370,152 450,61 530,53 670,72"
                  fill="none"
                  stroke="#0B3C5D"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                />

                {/* Forecast Points */}
                <circle
                  cx="450"
                  cy="61"
                  r={hoveredPoint === 4 ? 7.5 : 6}
                  fill="#D64545"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(4)}
                />
                <circle
                  cx="530"
                  cy="53"
                  r={hoveredPoint === 5 ? 7.5 : 5.5}
                  fill="#0B3C5D"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(5)}
                />
                <circle
                  cx="670"
                  cy="72"
                  r={hoveredPoint === 6 ? 7.5 : 5.5}
                  fill="#0B3C5D"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(6)}
                />

                {/* Active Tooltip Popover over Friday Jul 25 */}
                {hoveredPoint === 4 && (
                  <g transform="translate(365, 8)">
                    <rect x="0" y="0" width="195" height="46" rx="8" fill="#0B3C5D" opacity="0.96" />
                    <polygon points="85,46 90,52 95,46" fill="#0B3C5D" />
                    <text x="12" y="19" fill="#00A6C7" fontSize="11" fontWeight="700" fontFamily="Inter">
                      FRI JUL 25: 105,000 L (+5k Deficit)
                    </text>
                    <text x="12" y="36" fill="#EDF0FF" fontSize="10" fontFamily="Inter">
                      95% Neural Conf: ±3,800 L
                    </text>
                  </g>
                )}

                {/* X-Axis Dates */}
                <text x="70" y="238" fill="#62748A" fontSize="11" textAnchor="middle" fontFamily="Inter">
                  Mon Jul 21
                </text>
                <text x="170" y="238" fill="#62748A" fontSize="11" textAnchor="middle" fontFamily="Inter">
                  Tue Jul 22
                </text>
                <text x="270" y="238" fill="#62748A" fontSize="11" textAnchor="middle" fontFamily="Inter">
                  Wed Jul 23
                </text>
                <text x="370" y="238" fill="#0B3C5D" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Inter">
                  Thu (Today)
                </text>
                <text x="450" y="238" fill="#D64545" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Inter">
                  Fri Jul 25 ★
                </text>
                <text x="530" y="238" fill="#0B3C5D" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter">
                  Sat Jul 26
                </text>
                <text x="670" y="238" fill="#0B3C5D" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter">
                  Sun Jul 27
                </text>
              </svg>
            </div>
          </div>

          {/* Metric Footer Bar inside Chart */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 mt-3 border-t border-[#DFE7EF]/70">
            <div className="p-2.5 bg-[#F4F8FB] rounded-lg">
              <span className="text-[10px] font-bold text-[#62748A] uppercase tracking-wider block">7-Day Mean</span>
              <span className="text-base font-bold text-[#0B3C5D] tabular-nums">71,250 L</span>
            </div>
            <div className="p-2.5 bg-[#F4F8FB] rounded-lg">
              <span className="text-[10px] font-bold text-[#62748A] uppercase tracking-wider block">Expected Peak</span>
              <span className="text-base font-bold text-[#D64545] tabular-nums">108,000 L</span>
            </div>
            <div className="p-2.5 bg-[#F4F8FB] rounded-lg">
              <span className="text-[10px] font-bold text-[#62748A] uppercase tracking-wider block">Confidence Index</span>
              <span className="text-base font-bold text-[#00A6C7] tabular-nums">94.8% Acc</span>
            </div>
            <div className="p-2.5 bg-[#F4F8FB] rounded-lg">
              <span className="text-[10px] font-bold text-[#62748A] uppercase tracking-wider block">Variance Span</span>
              <span className="text-base font-bold text-[#0B3C5D] tabular-nums">±3.8k L</span>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Water Availability Outlook & Shortage Risk Panel */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 sm:p-6 border border-[#DFE7EF] shadow-2xs flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#00A6C7] uppercase tracking-wider">Predictive Advisory</span>
                <h2 className="text-xl font-bold text-[#0B3C5D] mt-0.5">Water Availability Outlook</h2>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FFEBEE] text-[#D64545] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>

            {/* Alert Callout Banner */}
            <div className="bg-[#FFEBEE]/60 border border-[#D64545]/20 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-[#D64545] font-bold text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>WARNING: Deficit Anticipated in 28 Hours</span>
              </div>
              <p className="text-xs text-[#172B4D] mt-1.5 leading-relaxed">
                Supply buffer projected to drop below mandatory reserve margin by Friday evening peak.
              </p>
            </div>

            {/* Structured Outlook Metrics */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4F8FB] text-xs">
                <span className="text-[#62748A]">Current Supply Status</span>
                <span className="font-bold text-[#0B3C5D]">Constrained (100k L / 24h)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4F8FB] text-xs">
                <span className="text-[#62748A]">Forecast Horizon</span>
                <span className="font-semibold text-[#172B4D]">Jul 25 – Jul 28 (4 Days)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4F8FB] text-xs">
                <span className="text-[#62748A]">Expected Cumulative Deficit</span>
                <span className="font-bold text-[#D64545] tabular-nums">14,500 L</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F4F8FB] text-xs">
                <span className="text-[#62748A]">Estimated Breach Timestamp</span>
                <span className="font-semibold text-[#172B4D]">Fri, Jul 25 at 18:30</span>
              </div>
            </div>

            {/* Root Cause Detected */}
            <div className="p-3 rounded-xl bg-[#F4F8FB] border border-[#DFE7EF]">
              <div className="flex items-center gap-1.5 text-[#00A6C7] text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Primary Root Cause Detected</span>
              </div>
              <p className="text-xs text-[#172B4D] leading-relaxed">
                Elevated residential peak usage coinciding with planned municipal line pressure reduction and warm weekend
                temperatures (+4°C ambient lift).
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-[#DFE7EF]/60">
            <button
              onClick={() => onNavigate('water-budget')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0B3C5D] hover:bg-[#082C44] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              <span>Review Water Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSimulation}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#F4F8FB] hover:bg-[#EBF3F9] text-[#0B3C5D] border border-[#DFE7EF] rounded-lg text-xs font-semibold transition-colors"
            >
              <Sliders className="w-4 h-4 text-[#00A6C7]" />
              <span>Simulate Conservation Scenarios</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section C: Bottom Row (5 cols vs 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (5 cols): Water Allocation Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 sm:p-6 border border-[#DFE7EF] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-[#62748A] uppercase tracking-wider">Quota Monitoring</span>
                <h2 className="text-xl font-bold text-[#0B3C5D]">Water Allocation Breakdown</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E1F5FE] text-[#00677D] text-[10px] font-bold uppercase">
                Active Cycle
              </span>
            </div>

            {/* Donut Chart and Distribution */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#F4F8FB] rounded-xl border border-[#DFE7EF]">
              {/* SVG Donut */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                  {/* Residential 60% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#0B3C5D"
                    strokeWidth="12"
                    strokeDasharray="143.25 238.76"
                    strokeDashoffset="0"
                  />
                  {/* Commercial 25% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#00A6C7"
                    strokeWidth="12"
                    strokeDasharray="59.69 238.76"
                    strokeDashoffset="-143.25"
                  />
                  {/* Institutional 15% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#18A999"
                    strokeWidth="12"
                    strokeDasharray="35.81 238.76"
                    strokeDashoffset="-202.94"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-[#0B3C5D] tabular-nums">100k</span>
                  <span className="text-[10px] font-bold text-[#62748A] uppercase">L Total</span>
                </div>
              </div>

              {/* Breakdown Legend List */}
              <div className="flex flex-col gap-2.5 w-full text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-xs bg-[#0B3C5D]" />
                    <span className="font-semibold text-[#172B4D]">Residential</span>
                  </div>
                  <span className="font-bold text-[#0B3C5D]">60% (60,000 L)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-xs bg-[#00A6C7]" />
                    <span className="font-semibold text-[#172B4D]">Commercial</span>
                  </div>
                  <span className="font-bold text-[#0B3C5D]">25% (25,000 L)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-xs bg-[#18A999]" />
                    <span className="font-semibold text-[#172B4D]">Institutional</span>
                  </div>
                  <span className="font-bold text-[#0B3C5D]">15% (15,000 L)</span>
                </div>
              </div>
            </div>

            {/* Sub-Zone Quota Meters */}
            <div className="mt-4 space-y-2.5">
              <div className="p-3 rounded-lg bg-[#F4F8FB] border border-[#DFE7EF]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-[#172B4D]">Sector B (Residential Units 121–240)</span>
                  <span className="text-[#D64545] font-bold text-[11px]">+3.5% Over Target</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div className="h-full bg-[#D64545] rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F4F8FB] border border-[#DFE7EF]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-[#172B4D]">Commercial Retail Center & Plaza</span>
                  <span className="text-[#00A6C7] font-bold text-[11px]">Within Quota (-1.2%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div className="h-full bg-[#00A6C7] rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#DFE7EF]/60">
            <button
              onClick={() => onNavigate('water-budget')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A6C7] hover:text-[#0B3C5D] transition-colors"
            >
              <span>Manage Allocations & Quotas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right (7 cols): Aqua Mind AI Insights */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-6 border border-[#DFE7EF] shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E1F5FE] text-[#00677D] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#00A6C7]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0B3C5D]">Aqua Mind AI Insights</h2>
                  <span className="text-[10px] font-bold text-[#62748A] uppercase tracking-wider">
                    Explainable Constraint Prescriptions
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#CEE5FF] text-[#0B3C5D] text-[10px] font-bold uppercase tracking-wider">
                Autonomous Monitor
              </span>
            </div>

            {/* Strategic Insight Alert Banner */}
            <div className="bg-[#F4F8FB] p-4 rounded-xl border border-[#DFE7EF] flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#00A6C7] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#0B3C5D] block">
                  Projected Demand Exceeds Supply Ceiling Tomorrow
                </span>
                <p className="text-xs text-[#172B4D] mt-1 leading-relaxed">
                  Projected demand may exceed available supply by{' '}
                  <strong className="text-[#D64545] font-bold">5,000 L/day</strong> tomorrow. Review planned allocations
                  and investigate immediate opportunities to reduce non-essential consumption while safeguarding essential
                  water services.
                </p>
              </div>
            </div>

            {/* Optimization Levers */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-[#62748A] uppercase tracking-wider block">
                Actionable Optimization Levers
              </span>

              {/* Lever 1 */}
              <div className="p-3.5 rounded-xl bg-[#FAFCFE] border border-[#DFE7EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E1F5FE] text-[#00A6C7] flex items-center justify-center shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B3C5D]">Irrigation & Common Area Landscape</h4>
                    <p className="text-xs text-[#62748A] mt-0.5">
                      Allocated 8,500 L. Reducing sprinkler cycles by 35% yields immediate relief.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#0D685E] text-xs font-bold rounded-lg shrink-0 self-end sm:self-center">
                  +3,000 L/day Saved
                </span>
              </div>

              {/* Lever 2 */}
              <div className="p-3.5 rounded-xl bg-[#FAFCFE] border border-[#DFE7EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#CEE5FF] text-[#0B3C5D] flex items-center justify-center shrink-0">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B3C5D]">Commercial HVAC Pre-Cooling Operations</h4>
                    <p className="text-xs text-[#62748A] mt-0.5">
                      Shift cooling tower cycle to off-peak morning hours (04:00–06:00).
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#0D685E] text-xs font-bold rounded-lg shrink-0 self-end sm:self-center">
                  +2,000 L/day Saved
                </span>
              </div>
            </div>

            {/* Combined Potential Banner */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#E0F2F1] border border-[#18A999]/30 text-xs">
              <span className="font-semibold text-[#004E5F]">Combined Conservation Potential:</span>
              <span className="font-bold text-[#0D685E] tabular-nums">5,000 L/day (100% of Expected Deficit)</span>
            </div>
          </div>

          {/* Action Buttons & Human-in-the-loop Notice */}
          <div className="pt-4 mt-3 border-t border-[#DFE7EF]/60 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate('ai-insights')}
                className="px-4 py-2 bg-[#0B3C5D] hover:bg-[#082C44] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
              >
                View Recommendation Details
              </button>
              {userRole === 'admin' ? (
                <button
                  onClick={handleApplyPresetClick}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#00A6C7] hover:bg-[#008FA8] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{hasAppliedPreset ? 'Preset Active (5,000 L)' : 'Apply 5,000 L Conservation Preset'}</span>
                </button>
              ) : (
                <span className="text-xs text-[#62748A] italic">Admin access required to apply presets.</span>
              )}
            </div>
            <p className="text-[11px] text-[#62748A] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00A6C7] shrink-0" />
              <span>
                All recommendations are explainable and constraint-aware. No automated flow interventions executed
                without administrative sign-off.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
