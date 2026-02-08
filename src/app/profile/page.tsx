'use client';

import { useEffect, useState } from 'react';
import { ProfileApiService } from '@/services/profile-api.service';
import { ProfileAdapter } from '@/adapters/profile.adapter';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ActionIconsRow } from '@/components/profile/ActionIconsRow';
import { ProfileSectionsGrid } from '@/components/profile/ProfileSectionsGrid';
import { ShareProfileButton } from '@/components/profile/ShareProfileButton';
import type { AdaptedProfileData } from '@/types/profile';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<AdaptedProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load profile data
  const loadProfile = async () => {
    console.log('=== PROFILE PAGE LOADING ===');
    setIsLoading(true);
    
    try {
      // Fetch data from API
      const apiResponse = await ProfileApiService.getProfileData();
      console.log('API Response - contactIcons:', apiResponse.data.contactIcons.map(i => ({ field: i.field, isVisible: i.isVisible })));
      console.log('API Response - groupList:', apiResponse.data.groupList.map(g => ({ group: g.group, isVisible: g.isVisible })));
      console.log('API Response - profile:', {
        name: apiResponse.data.profile.fullname,
        title: apiResponse.data.profile.title,
        profession: apiResponse.data.profile.profession,
        profileIntro: apiResponse.data.profile.profileIntro,
        photoUrl: apiResponse.data.profile.profilePhotoUrl,
      });
      
      // Adapt API data to UI-ready format
      const adapted = ProfileAdapter.adapt(apiResponse);
      console.log('Adapted - contactIcons count:', adapted.contactIcons.length);
      console.log('Adapted - groups count:', adapted.groups.length);
      console.log('Adapted - profile:', {
        displayName: adapted.profile.displayName,
        profession: adapted.profile.profession,
        photoUrl: adapted.profile.profilePhotoUrl,
      });
      
      setProfileData(adapted);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and when refreshKey changes
  useEffect(() => {
    loadProfile();
  }, [refreshKey]);

  // Refetch data when page becomes visible (user navigates back from Dashboard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('=== PAGE VISIBLE - REFETCHING DATA ===');
        setRefreshKey(prev => prev + 1);
      }
    };

    const handleFocus = () => {
      console.log('=== WINDOW FOCUSED - REFETCHING DATA ===');
      setRefreshKey(prev => prev + 1);
    };

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Check for data updates from Dashboard (via sessionStorage flag)
  useEffect(() => {
    const checkForUpdates = () => {
      const shouldRefresh = sessionStorage.getItem('profile-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== PROFILE DATA UPDATED FLAG DETECTED - REFETCHING ===');
        sessionStorage.removeItem('profile-data-updated');
        setRefreshKey(prev => prev + 1);
      }
    };

    // Check immediately on mount
    checkForUpdates();

    // Also check periodically (in case of race conditions)
    const interval = setInterval(checkForUpdates, 500);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen bg-[#94a3b8] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  const { profile, contactIcons, groups } = profileData;

  return (
    <div className="min-h-screen bg-[#94a3b8]">
      <div className="max-w-md mx-auto relative">
        {/* Header Section */}
        <ProfileHeader
          displayName={profile.displayName}
          profession={profile.profession}
          profilePhotoUrl={profile.profilePhotoUrl}
        />

        {/* Action Icons Row */}
        <ActionIconsRow icons={contactIcons} />

        {/* Main Content */}
        <div className="mt-10 pb-8 flex flex-col gap-8">
          {/* Profile Sections Grid */}
          <div className="px-6">
            <ProfileSectionsGrid groups={groups} />
          </div>

          {/* Share Profile Button */}
          {profile.enableShareButton && (
            <div className="px-6">
              <ShareProfileButton
                shareLink={profile.shareLink}
                displayName={profile.displayName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
