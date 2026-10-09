import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Droplets, MapPin, X } from 'lucide-react';

interface RecordReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (readingData: { zone: string; meterId: string; volume: number; date: string }) => void;
}

export const RecordReadingModal: React.FC<RecordReadingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [zone, setZone] = useState('Block A Residential (MTR-104)');
  const [volume, setVolume] = useState('11200');
  const [readingType, setReadingType] = useState('24h_cycle');
  const [operatorNotes, setOperatorNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onSuccess({
        zone,
        meterId: zone.includes('MTR-104') ? 'MTR-104' : 'MTR-202',
        volume: Number(volume),
        date: new Date().toISOString(),
      });
      setIsSubmitted(false);
      onClose();
    }, 600);
  };

  const parsedVolume = Number(volume) || 0;
  const isHigh = parsedVolume > 15000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B3C5D]/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#DFE7EF] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-5 border-b border-[#DFE7EF]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E1F5FE] text-[#00677D] flex items-center justify-center">
              <Droplets className="w-5 h-5 text-[#00A6C7]" />
            </div>
            <div>
              <h3 className="font-bold text-[#0B3C5D] text-base">Record Meter Reading</h3>
              <p className="text-xs text-[#62748A]">Log manual calibrated ultrasonic or mechanical reading</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#62748A] hover:text-[#172B4D] hover:bg-[#F4F8FB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#62748A] uppercase tracking-wider mb-1">
              Select Zone / Sub-Meter
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full h-10 px-3 bg-[#F4F8FB] border border-[#DFE7EF] rounded-lg text-sm text-[#172B4D] font-medium focus:outline-none focus:border-[#00A6C7]"
            >
              <option value="Block A Residential (MTR-104)">Block A Residential (MTR-104 • Sub-Station 1)</option>
              <option value="Block B Residential (MTR-105)">Block B Residential (MTR-105 • Sub-Station 1)</option>
              <option value="Clubhouse & Aquatic Facility (MTR-202)">Clubhouse & Aquatic Facility (MTR-202)</option>
              <option value="Commercial Retail Plaza (MTR-301)">Commercial Retail Plaza (MTR-301)</option>
              <option value="Phase 2 Turf & Sprinklers (MTR-408)">Phase 2 Turf & Sprinklers (MTR-408)</option>
              <option value="Emergency Fire Ring (MTR-501)">Central Fire Hydrant Ring (MTR-501)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#62748A] uppercase tracking-wider mb-1">
                Measured Flow (Liters)
              </label>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                min="0"
                step="100"
                required
                className="w-full h-10 px-3 bg-[#F4F8FB] border border-[#DFE7EF] rounded-lg text-sm text-[#172B4D] font-bold tabular-nums focus:outline-none focus:border-[#00A6C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#62748A] uppercase tracking-wider mb-1">
                Reading Mode
              </label>
              <select
                value={readingType}
                onChange={(e) => setReadingType(e.target.value)}
                className="w-full h-10 px-3 bg-[#F4F8FB] border border-[#DFE7EF] rounded-lg text-sm text-[#172B4D] font-medium focus:outline-none focus:border-[#00A6C7]"
              >
                <option value="24h_cycle">24-Hour Cycle Sum</option>
                <option value="instantaneous">Instantaneous Flow Check</option>
                <option value="calibration">Sensor Calibration Check</option>
              </select>
            </div>
          </div>

          {/* Real-time Validation Feedback */}
          <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            isHigh ? 'bg-[#FFF8E1] border-[#F4B942]/40 text-[#875E03]' : 'bg-[#E8F5E9] border-[#18A999]/30 text-[#0D685E]'
          }`}>
            {isHigh ? (
              <AlertTriangle className="w-4 h-4 text-[#F4B942] shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#18A999] shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-semibold">{isHigh ? 'Approaching Zone Advisory Ceiling' : 'Within Statutory Zone Quota'}</span>
              <p className="mt-0.5 text-[11px] opacity-90">
                {isHigh
                  ? 'This volume represents +12% above rolling 7-day average for this meter.'
                  : 'Telemetry conforms to expected safe consumption profile.'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#62748A] uppercase tracking-wider mb-1">
              Field Technician Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Acoustic test corroborated normal pressure at 4.1 Bar."
              value={operatorNotes}
              onChange={(e) => setOperatorNotes(e.target.value)}
              className="w-full h-10 px-3 bg-[#F4F8FB] border border-[#DFE7EF] rounded-lg text-xs text-[#172B4D] focus:outline-none focus:border-[#00A6C7]"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#DFE7EF]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#62748A] hover:text-[#172B4D] rounded-lg hover:bg-[#F4F8FB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitted}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0B3C5D] hover:bg-[#082C44] rounded-lg shadow-xs transition-all disabled:opacity-50"
            >
              {isSubmitted ? 'Logging Reading...' : 'Commit to Telemetry Ledger'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
