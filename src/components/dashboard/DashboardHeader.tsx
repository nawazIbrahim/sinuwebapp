'use client';

import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  onSave: () => void;
  onBack?: () => void;
}

export function DashboardHeader({ onSave, onBack }: DashboardHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-gray-800">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Profile Dashboard</h1>
      </div>
      <button
        onClick={onSave}
        className="bg-[#136dec] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors"
      >
        Save
      </button>
    </header>
  );
}
