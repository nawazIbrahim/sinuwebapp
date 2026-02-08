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
  const [refreshKey, setRefreshKey] = useState(0);

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

  useEffect(() => {
    loadProfessional();
  }, [refreshKey]);

  // Check for updates from dashboard
  useEffect(() => {
    const checkForUpdates = () => {
      const shouldRefresh = sessionStorage.getItem('professional-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== PROFESSIONAL DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('professional-data-updated');
        setRefreshKey(prev => prev + 1);
      }
    };
    checkForUpdates();
    const interval = setInterval(checkForUpdates, 500);
    return () => clearInterval(interval);
  }, []);

  // Refresh on page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) setRefreshKey(prev => prev + 1);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

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
