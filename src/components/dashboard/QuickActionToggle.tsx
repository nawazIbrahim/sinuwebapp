'use client';

import { ToggleSwitch } from './ToggleSwitch';

interface QuickActionToggleProps {
  label: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function QuickActionToggle({
  label,
  icon,
  iconBgColor,
  iconColor,
  enabled,
  onChange,
}: QuickActionToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-b-0">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          <span className="material-symbols-outlined text-xl" style={{ color: iconColor }}>
            {icon}
          </span>
        </div>
        <span className="font-semibold text-gray-700 text-base">{label}</span>
      </div>
      <ToggleSwitch checked={enabled} onChange={onChange} />
    </div>
  );
}
