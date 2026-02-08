/**
 * Links Page
 *
 * Displays user's links. Linked from Profile screen, navigates back to Profile.
 * Refreshes when returning from Link Settings (dashboard) or when tab becomes visible.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import LinkHeader from '@/components/link/LinkHeader';
import LinkCard from '@/components/link/LinkCard';
import { LinkApiService } from '@/services/link-api.service';
import { LinkAdapter } from '@/adapters/link.adapter';
import { AdaptedLinkData } from '@/types/link';

export default function LinksPage() {
  const [linkData, setLinkData] = useState<AdaptedLinkData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      console.log('[LinksPage] Fetching link data...');
      const response = await LinkApiService.getLinkData();
      const adapted = LinkAdapter.toUI(response);
      setLinkData(adapted);
    } catch (error) {
      console.error('[LinksPage] Error fetching link data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh when returning from Link Settings (dashboard)
  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStorage.getItem('links-data-updated') === 'true') {
        sessionStorage.removeItem('links-data-updated');
        fetchData();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Refresh when tab becomes visible (e.g. returning from another tab)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <LinkHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!linkData || linkData.links.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <LinkHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">No links available</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD]">
      <LinkHeader />
      
      <main className="p-4">
        <LinkCard links={linkData.links} />
      </main>
    </div>
  );
}
