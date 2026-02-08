/**
 * Address Page
 * 
 * Displays user's address information
 * Linked from Profile screen, navigates back to Profile
 */

'use client';

import { useEffect, useState } from 'react';
import AddressHeader from '@/components/address/AddressHeader';
import AddressCard from '@/components/address/AddressCard';
import { AddressApiService } from '@/services/address-api.service';
import { AddressAdapter } from '@/adapters/address.adapter';
import { AdaptedAddressData } from '@/types/address';

export default function AddressPage() {
  const [addressData, setAddressData] = useState<AdaptedAddressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = async () => {
    console.log('=== ADDRESS PAGE LOADING ===');
    setLoading(true);
    
    try {
      const response = await AddressApiService.getAddressData();
      console.log('[AddressPage] API Response:', response);
      
      const adapted = AddressAdapter.toUI(response);
      console.log('[AddressPage] Adapted Data:', adapted);
      
      setAddressData(adapted);
    } catch (error) {
      console.error('[AddressPage] Error fetching address data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  // Check for updates from dashboard
  useEffect(() => {
    const checkForUpdates = () => {
      const shouldRefresh = sessionStorage.getItem('address-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== ADDRESS DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('address-data-updated');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <AddressHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!addressData || addressData.fields.length === 0) {
    return (
      <div className="min-h-screen bg-[#D4D8DD]">
        <AddressHeader />
        <main className="p-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-[#617289]">No address data available</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D4D8DD]">
      <AddressHeader />
      
      <main className="p-4">
        <AddressCard fields={addressData.fields} />
      </main>
    </div>
  );
}
