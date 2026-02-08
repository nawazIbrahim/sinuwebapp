/**
 * Skills Page
 * 
 * Displays user's skills with levels and duration
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import SkillsHeader from '@/components/skills/SkillsHeader';
import SkillsCard from '@/components/skills/SkillsCard';
import { SkillsApiService } from '@/services/skills-api.service';
import { SkillsAdapter } from '@/adapters/skills.adapter';
import { AdaptedSkillsData } from '@/types/skills';

export default function SkillsPage() {
  const [skillsData, setSkillsData] = useState<AdaptedSkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Extracted fetch function for reuse
  const fetchData = async () => {
    try {
      console.log('=== SKILLS PAGE LOADING ===');
      const response = await SkillsApiService.getSkillsData();
      console.log('[SkillsPage] API Response:', response);
      
      const adapted = SkillsAdapter.toUI(response);
      console.log('[SkillsPage] Adapted Data:', adapted);
      
      setSkillsData(adapted);
    } catch (error) {
      console.error('[SkillsPage] Error fetching skills data:', error);
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
      const shouldRefresh = sessionStorage.getItem('skills-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== SKILLS DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('skills-data-updated');
        setRefreshKey((prev) => prev + 1);
      }
    }, 500); // Poll every 500ms

    return () => clearInterval(interval);
  }, []);

  // Also refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const shouldRefresh = sessionStorage.getItem('skills-data-updated');
        if (shouldRefresh === 'true') {
          console.log('=== PAGE VISIBLE - REFETCHING SKILLS DATA ===');
          sessionStorage.removeItem('skills-data-updated');
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
        <SkillsHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!skillsData || skillsData.skills.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <SkillsHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">No skills available</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD]">
      <SkillsHeader />
      
      <main className="p-4">
        <SkillsCard skills={skillsData.skills} />
      </main>
    </div>
  );
}
