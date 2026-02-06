'use client';

import { ToggleSwitch } from './ToggleSwitch';

interface ProfileModuleCardProps {
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onSettings: () => void;
  draggableProps?: any;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function ProfileModuleCard({
  label,
  description,
  icon,
  iconColor,
  enabled,
  onToggle,
  onSettings,
  draggableProps,
  dragHandleProps,
  isDragging = false,
}: ProfileModuleCardProps) {
  return (
    <div 
      {...draggableProps}
      className={`bg-white rounded-[20px] p-4 shadow-[0px_8px_30px_0px_rgba(0,0,0,0.04)] relative flex flex-col items-center text-center min-h-[140px] transition-shadow ${
        isDragging ? 'shadow-[0px_16px_48px_0px_rgba(0,0,0,0.12)]' : ''
      }`}
    >
      {/* Toggle Switch */}
      <div className="absolute top-3 left-3">
        <div className="transform scale-75">
          <ToggleSwitch
            checked={enabled}
            onChange={onToggle}
            size="sm"
          />
        </div>
      </div>

      {/* Settings Icon */}
      <div className="absolute top-3 right-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSettings();
          }}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all active:scale-90 touch-manipulation"
          aria-label="Module settings"
        >
          <span className="material-icons text-base pointer-events-none">settings</span>
        </button>
      </div>

      {/* Drag Handle - 3 dots indicator */}
      <div 
        {...dragHandleProps}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing transition-colors"
        aria-label="Drag to reorder"
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </div>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center mb-3 mt-4 pointer-events-none">
        <span className="material-symbols-outlined text-3xl" style={{ color: iconColor }}>
          {icon}
        </span>
      </div>

      {/* Content */}
      <h4 className="font-bold text-gray-900 text-sm pointer-events-none">{label}</h4>
      <p className="text-[11px] text-gray-500 mt-1 pointer-events-none">{description}</p>
    </div>
  );
}
