'use client';

import { useRouter } from 'next/navigation';

export function ContactHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/profile');
  };

  const handleSettings = () => {
    router.push('/profile/contact/dashboard');
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-200 border-b border-gray-200 shadow-sm px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors touch-manipulation z-10"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined text-gray-800 pointer-events-none text-2xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-icons text-[#136DEC] text-2xl" aria-hidden>contact_phone</span>
          <h1 className="text-lg font-bold text-gray-900">Contact Details</h1>
        </div>
      </div>
      
      {/* Settings Button */}
      <button
        type="button"
        onClick={handleSettings}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors active:scale-95 touch-manipulation"
        aria-label="Settings"
      >
        <span className="material-symbols-outlined text-gray-800 pointer-events-none text-2xl">settings</span>
      </button>
    </header>
  );
}
