'use client';

import { useEffect, useState } from 'react';
import { PersonalApiService } from '@/services/personal-api.service';
import { PersonalAdapter } from '@/adapters/personal.adapter';
import { PersonalHeader } from '@/components/personal/PersonalHeader';
import { PersonalCard } from '@/components/personal/PersonalCard';
import type { AdaptedPersonalData } from '@/types/personal';

export default function PersonalPage() {
  const [personalData, setPersonalData] = useState<AdaptedPersonalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load personal data
  const loadPersonal = async () => {
    console.log('=== PERSONAL PAGE LOADING ===');
    setIsLoading(true);
    
    try {
      // Fetch data from API
      const apiResponse = await PersonalApiService.getPersonalData();
      console.log('API Response - fieldList:', apiResponse.data.fieldList.length);
      console.log('API Response - fields:', apiResponse.data.fieldList.map(f => ({ 
        field: f.field, 
        value: f.value.substring(0, 30), 
        isVisible: f.isVisible 
      })));
      
      // Adapt API data to UI-ready format
      const adapted = PersonalAdapter.adapt(apiResponse);
      console.log('Adapted - fields count:', adapted.fields.length);
      
      setPersonalData(adapted);
    } catch (error) {
      console.error('Error loading personal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on mount and when refreshKey changes
  useEffect(() => {
    loadPersonal();
  }, [refreshKey]);

  // Check for data updates from Personal Dashboard (via sessionStorage flag)
  useEffect(() => {
    const checkForUpdates = () => {
      const shouldRefresh = sessionStorage.getItem('personal-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== PERSONAL DATA UPDATED FLAG DETECTED - REFETCHING ===');
        sessionStorage.removeItem('personal-data-updated');
        setRefreshKey(prev => prev + 1);
      }
    };

    // Check immediately on mount
    checkForUpdates();

    // Also check periodically (in case of race conditions)
    const interval = setInterval(checkForUpdates, 500);

    return () => clearInterval(interval);
  }, []);

  // Refetch data when page becomes visible (user navigates back from Dashboard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('=== PERSONAL PAGE VISIBLE - REFETCHING DATA ===');
        setRefreshKey(prev => prev + 1);
      }
    };

    const handleFocus = () => {
      console.log('=== WINDOW FOCUSED - REFETCHING PERSONAL DATA ===');
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

  if (isLoading || !personalData) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
      <PersonalHeader />

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-6 pb-8">
        <PersonalCard fields={personalData.fields} />
      </main>
    </div>
  );
}
