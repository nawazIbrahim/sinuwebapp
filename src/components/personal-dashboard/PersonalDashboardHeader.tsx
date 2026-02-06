'use client';

interface PersonalDashboardHeaderProps {
  onSave: () => void;
  onBack: () => void;
}

export function PersonalDashboardHeader({ onSave, onBack }: PersonalDashboardHeaderProps) {
  return (
    <header className="flex-shrink-0 bg-[#94a3b8] border-b border-white/10 shadow-sm px-4 h-16 flex items-center justify-between">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-[6px] border border-white/10 p-px transition-all hover:bg-white/20 active:scale-95 touch-manipulation z-10"
        aria-label="Go back"
      >
        <span className="material-icons text-white text-2xl pointer-events-none">arrow_back</span>
      </button>

      {/* Title */}
      <h1 className="text-lg font-bold text-white">Personal Settings</h1>

      {/* Save Button */}
      <button
        type="button"
        onClick={onSave}
        className="px-6 py-2 bg-white text-[#136dec] rounded-lg font-semibold hover:bg-white/90 active:scale-95 transition-all touch-manipulation shadow-lg"
        aria-label="Save changes"
      >
        Save
      </button>
    </header>
  );
}
