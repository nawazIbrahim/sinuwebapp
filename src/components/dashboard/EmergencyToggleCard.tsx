'use client';

import { ToggleSwitch } from './ToggleSwitch';

interface EmergencyToggleCardProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function EmergencyToggleCard({ enabled, onChange }: EmergencyToggleCardProps) {
  return (
    <div className="bg-red-50 rounded-[20px] p-5 border border-red-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-2xl">emergency</span>
        </div>
        <div>
          <h4 className="font-bold text-red-900">Emergency Info</h4>
          <p className="text-xs text-red-700">Display critical health info</p>
        </div>
      </div>
      <ToggleSwitch
        checked={enabled}
        onChange={onChange}
        variant="emergency"
      />
    </div>
  );
}
