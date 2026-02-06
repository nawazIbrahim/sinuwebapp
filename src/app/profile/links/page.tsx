/**
 * Links Page
 * 
 * Displays user's links/social media profiles
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import LinkHeader from '@/components/link/LinkHeader';
import LinkCard from '@/components/link/LinkCard';
import { LinkApiService } from '@/services/link-api.service';
import { LinkAdapter } from '@/adapters/link.adapter';
import { AdaptedLinkData } from '@/types/link';

export default function LinksPage() {
  const [linkData, setLinkData] = useState<AdaptedLinkData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[LinksPage] Fetching link data...');
        const response = await LinkApiService.getLinkData();
        console.log('[LinksPage] API Response:', response);
        
        const adapted = LinkAdapter.toUI(response);
        console.log('[LinksPage] Adapted Data:', adapted);
        
        setLinkData(adapted);
      } catch (error) {
        console.error('[LinksPage] Error fetching link data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
