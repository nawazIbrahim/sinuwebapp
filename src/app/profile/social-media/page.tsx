/**
 * Social Media Page
 * 
 * Displays user's social media profiles grouped by category
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import SocialMediaHeader from '@/components/socialMedia/SocialMediaHeader';
import SocialMediaGroupCard from '@/components/socialMedia/SocialMediaGroupCard';
import { SocialMediaApiService } from '@/services/socialMedia-api.service';
import { SocialMediaAdapter } from '@/adapters/socialMedia.adapter';
import { AdaptedSocialMediaData } from '@/types/socialMedia';

export default function SocialMediaPage() {
  const [socialMediaData, setSocialMediaData] = useState<AdaptedSocialMediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Extracted fetch function for reuse
  const fetchData = async () => {
    try {
      console.log('=== SOCIAL MEDIA PAGE LOADING ===');
      const response = await SocialMediaApiService.getSocialMediaData();
      console.log('[SocialMediaPage] API Response:', response);
      
      const adapted = SocialMediaAdapter.toUI(response);
      console.log('[SocialMediaPage] Adapted Data:', adapted);
      
      setSocialMediaData(adapted);
    } catch (error) {
      console.error('[SocialMediaPage] Error fetching social media data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and refresh on refreshKey change
  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  // Auto-refresh mechanism - polls sessionStorage for updates
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldRefresh = sessionStorage.getItem('social-media-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== SOCIAL MEDIA DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('social-media-data-updated');
        setRefreshKey((prev) => prev + 1);
      }
    }, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  // Also refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const shouldRefresh = sessionStorage.getItem('social-media-data-updated');
        if (shouldRefresh === 'true') {
          console.log('=== PAGE VISIBLE - REFETCHING SOCIAL MEDIA DATA ===');
          sessionStorage.removeItem('social-media-data-updated');
          setRefreshKey((prev) => prev + 1);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <SocialMediaHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!socialMediaData || socialMediaData.groups.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <SocialMediaHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">No social media profiles available</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD] flex flex-col">
      <SocialMediaHeader />
      
      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex flex-col gap-6">
          {socialMediaData.groups.map((group) => (
            <SocialMediaGroupCard key={group.category} group={group} />
          ))}
        </div>
      </main>
    </div>
  );
}
