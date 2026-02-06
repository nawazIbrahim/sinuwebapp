/**
 * Emergency Page
 * 
 * Displays emergency contact information
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import EmergencyHeader from '@/components/emergency/EmergencyHeader';
import EmergencyCard from '@/components/emergency/EmergencyCard';
import { EmergencyApiService } from '@/services/emergency-api.service';
import { EmergencyAdapter } from '@/adapters/emergency.adapter';
import { AdaptedEmergencyData } from '@/types/emergency';

export default function EmergencyPage() {
  const [emergencyData, setEmergencyData] = useState<AdaptedEmergencyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('[EmergencyPage] Fetching emergency data...');
        const response = await EmergencyApiService.getEmergencyData();
        console.log('[EmergencyPage] API Response:', response);
        
        const adapted = EmergencyAdapter.toUI(response);
        console.log('[EmergencyPage] Adapted Data:', adapted);
        
        setEmergencyData(adapted);
      } catch (error) {
        console.error('[EmergencyPage] Error fetching emergency data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <EmergencyHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!emergencyData || emergencyData.fields.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <EmergencyHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">No emergency contact available</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD]">
      <EmergencyHeader />
      
      <main className="p-4">
        <EmergencyCard fields={emergencyData.fields} />
      </main>
    </div>
  );
}
