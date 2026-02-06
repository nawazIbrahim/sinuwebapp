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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[SocialMediaPage] Fetching social media data...');
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

    fetchData();
  }, []);

  const handleSave = () => {
    console.log('[SocialMediaPage] Save button clicked');
    // Placeholder for save functionality
    alert('Social network links saved!');
  };

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
      <main className="flex-1 p-4 pb-28">
        <div className="flex flex-col gap-6">
          {socialMediaData.groups.map((group) => (
            <SocialMediaGroupCard key={group.category} group={group} />
          ))}
        </div>
      </main>

      {/* Fixed Footer with Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#D4D8DD] px-6 py-6">
        <button
          onClick={handleSave}
          className="w-full h-14 bg-gradient-to-r from-[#136DEC] to-[#3B82F6] text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5"
        >
          <span className="material-icons" style={{ fontSize: '24px' }}>
            save
          </span>
          <span>Save Social Network Links</span>
        </button>
      </div>
    </div>
  );
}
