'use client';

import { useRouter } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';

interface ProfileHeaderProps {
  displayName: string;
  profession: string;
  profilePhotoUrl: string;
  onSettingsClick?: () => void;
  onMenuClick?: () => void;
}

export function ProfileHeader({
  displayName,
  profession,
  profilePhotoUrl,
  onSettingsClick,
  onMenuClick,
}: ProfileHeaderProps) {
  const router = useRouter();

  const handleSettings = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      router.push('/profile/dashboard');
    }
  };

  const handleMenu = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      // Placeholder for future menu functionality
      console.log('Menu clicked');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#136dec] to-[#4b94f7] rounded-b-[56px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-white rounded-full blur-[32px]" />
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-72 h-72 bg-[#93c5fd] rounded-full blur-[32px] mix-blend-overlay" />
      </div>

      {/* Header icons */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-end px-6 pt-12 pb-6 z-10">
        {/* Settings & Hamburger Menu */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSettings}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-[6px] border border-white/10 p-px transition-all hover:bg-white/20 active:scale-95 touch-manipulation"
            aria-label="Settings"
          >
            <span className="material-icons text-white text-2xl pointer-events-none">settings</span>
          </button>
          <button
            type="button"
            onClick={handleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-[6px] border border-white/10 p-px transition-all hover:bg-white/20 active:scale-95 touch-manipulation"
            aria-label="Menu"
          >
            <span className="material-icons text-white text-2xl pointer-events-none">menu</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center px-6 pb-8 pt-20 min-h-[524px]">
        {/* Avatar */}
        <div className="mb-4 z-20">
          <ProfileAvatar
            src={profilePhotoUrl}
            alt={displayName}
            size={288}
            showOnlineStatus
          />
        </div>

        {/* Name and profession */}
        <div className="flex flex-col items-center gap-1 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-[30px] font-bold leading-9 tracking-[-0.75px] text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              {displayName}
            </h1>
            <span className="material-icons text-white text-2xl">verified</span>
          </div>
          <p className="text-[#eff6ff] text-lg font-medium leading-7 tracking-[0.45px] text-center">
            {profession}
          </p>
        </div>
      </div>
    </div>
  );
}
