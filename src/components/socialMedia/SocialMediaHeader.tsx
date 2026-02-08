/**
 * Social Media Header Component
 * 
 * Header for the Social Media screen with back navigation and settings
 */

'use client';

import { useRouter } from 'next/navigation';

export default function SocialMediaHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/profile');
  };

  const handleSettings = () => {
    router.push('/profile/social-media/dashboard');
  };

  return (
    <header className="bg-[#E5E7EB] border-b border-[#E5E7EB] flex items-center justify-between px-4 py-3 shadow-sm sticky top-0 z-50">
      {/* Left: Back Button and Title */}
      <div className="flex items-center gap-4">
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

        <h1 className="text-lg font-bold text-[#111418]">
          Social Network
        </h1>
      </div>

      {/* Right: Settings Button */}
      <button
        type="button"
        onClick={handleSettings}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors touch-manipulation"
        aria-label="Settings"
      >
        <span className="material-symbols-outlined text-gray-700 pointer-events-none" style={{ fontSize: '24px' }}>
          settings
        </span>
      </button>
    </header>
  );
}
