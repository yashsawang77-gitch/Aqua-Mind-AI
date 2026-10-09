export type ScreenId = 'overview' | 'water-budget' | 'forecasts' | 'ai-insights' | 'reports' | 'settings';

export type UserRole = 'admin' | 'viewer';

export interface SectorAllocation {
  id: string;
  name: string;
  category: string;
  allocated: number; // liters/day
  minBaseline?: number;
  maxCap?: number;
  percentage: number;
  description: string;
  isLocked?: boolean;
  notes?: string;
  complianceRule?: string;
}

export interface BudgetState {
  totalAvailable: number; // 100,000 L/day
  residential: number; // 52,000
  commercial: number; // 20,000
  facilities: number; // 12,000
  landscaping: number; // 7,500
  reserveLocked: number; // 10,000
  activePreset: 'standard' | 'conservation' | 'custom';
}

export interface ForecastPoint {
  date: string;
  label: string;
  actual?: number;
  forecast?: number;
  baseline: number; // 100,000 L
  ciLower?: number;
  ciUpper?: number;
  weatherTemp?: number;
  isPeak?: boolean;
  isBreach?: boolean;
}

export interface HistoricalReportPoint {
  day: number;
  dateStr: string;
  actual: number;
  budgetCeiling: number; // 100,000 L
  baseline30d: number; // 76,500 L
  isSpike?: boolean;
  spikeReason?: string;
}

export interface AlertItem {
  id: string;
  code: string;
  severity: 'critical' | 'warning' | 'budget_exceeded' | 'info';
  categoryLabel: string;
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  impactVolume: number; // e.g. 12000
  impactUnit: string; // e.g. 'L/day'
  breachWindow: string;
  confidence: number; // e.g. 94.8
  status: 'active' | 'acknowledged' | 'resolved';
  shapDrivers: Array<{
    name: string;
    impactLiters: number;
    percentage: number;
    icon: string;
    description: string;
  }>;
  prescribedMitigations: Array<{
    id: string;
    title: string;
    impactLiters: number;
    impactPercentage: number;
    description: string;
    isDefaultSelected: boolean;
  }>;
  regulatoryNotice?: string;
}

export interface MeterLedgerRow {
  id: string;
  substation: string;
  zoneName: string;
  meterArchitecture: string;
  allocatedQuota: number;
  recordedUsage: number;
  adherenceDelta: number;
  percentageDelta: number;
  complianceStatus: 'compliant' | 'over_quota' | 'protected';
}

export interface CommunityProfile {
  id: string;
  name: string;
  phase: string;
  units: number;
  population: number;
  commercialNodes: number;
  parklandHectares: number;
  authority: string;
  officerName: string;
  emergencyPhone: string;
  dailyYieldCap: number;
  emergencyReserveFloor: number;
  perCapitaBaseline: number;
  heatAdvisoryMultiplier: number;
}
