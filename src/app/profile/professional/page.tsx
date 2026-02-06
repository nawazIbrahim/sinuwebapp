'use client';

import { useEffect, useState } from 'react';
import { ProfessionalApiService } from '@/services/professional-api.service';
import { ProfessionalAdapter } from '@/adapters/professional.adapter';
import { ProfessionalHeader } from '@/components/professional/ProfessionalHeader';
import { ProfessionalCard } from '@/components/professional/ProfessionalCard';
import type { AdaptedProfessionalData } from '@/types/professional';

export default function ProfessionalPage() {
  const [professionalData, setProfessionalData] = useState<AdaptedProfessionalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const loadProfessional = async () => {
      console.log('=== PROFESSIONAL PAGE LOADING ===');
      setIsLoading(true);
      
      try {
        // Fetch data from API
        const apiResponse = await ProfessionalApiService.getProfessionalData();
        console.log('API Response - fieldList:', apiResponse.data.fieldList.length);
        
        // Adapt API data to UI-ready format
        const adapted = ProfessionalAdapter.adapt(apiResponse);
        console.log('Adapted - fields count:', adapted.fields.length);
        
        setProfessionalData(adapted);
      } catch (error) {
        console.error('Error loading professional:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfessional();
  }, []); // Refetch on mount

  if (isLoading || !professionalData) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
      <ProfessionalHeader />

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-6 pb-8">
        <ProfessionalCard fields={professionalData.fields} />
      </main>
    </div>
  );
}
