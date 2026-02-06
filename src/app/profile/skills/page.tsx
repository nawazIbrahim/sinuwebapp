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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[SkillsPage] Fetching skills data...');
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

    fetchData();
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
