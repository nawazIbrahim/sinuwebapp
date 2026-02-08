/**
 * Address Header Component
 * 
 * Header for the Address screen with back navigation and settings
 */

'use client';

import { useRouter } from 'next/navigation';

export default function AddressHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/profile');
  };

  const handleSettings = () => {
    router.push('/profile/address/dashboard');
  };

  return (
    <header className="bg-[#E5E7EB] border-b border-[#E5E7EB] flex items-center justify-between px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors touch-manipulation z-10"
          aria-label="Go back"
        >
          <span className="material-icons text-gray-700 pointer-events-none" style={{ fontSize: '24px' }}>
            arrow_back
          </span>
        </button>

        {/* Title */}
        <h1 className="text-lg font-bold text-[#111418]">
          Address
        </h1>
      </div>

      {/* Settings Button */}
      <button
        type="button"
        onClick={handleSettings}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors active:scale-95 touch-manipulation"
        aria-label="Settings"
      >
        <span className="material-symbols-outlined text-gray-800 pointer-events-none">settings</span>
      </button>
    </header>
  );
}
