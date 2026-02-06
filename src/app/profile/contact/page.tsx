'use client';

import { useEffect, useState } from 'react';
import { ContactApiService } from '@/services/contact-api.service';
import { ContactAdapter } from '@/adapters/contact.adapter';
import { ContactHeader } from '@/components/contact/ContactHeader';
import { ContactGroupCard } from '@/components/contact/ContactGroupCard';
import type { AdaptedContactData } from '@/types/contact';

export default function ContactPage() {
  const [contactData, setContactData] = useState<AdaptedContactData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  const loadContact = async () => {
    console.log('=== CONTACT PAGE LOADING ===');
    setIsLoading(true);
    
    try {
      const apiResponse = await ContactApiService.getContactData();
      console.log('API Response - fieldList:', apiResponse.data.fieldList.length);
      const adapted = ContactAdapter.adapt(apiResponse);
      console.log('Adapted - contacts count:', adapted.contacts.length);
      setContactData(adapted);
    } catch (error) {
      console.error('Error loading contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, [refreshKey]);

  useEffect(() => {
    const checkForUpdates = () => {
      const shouldRefresh = sessionStorage.getItem('contact-data-updated');
      if (shouldRefresh === 'true') {
        console.log('=== CONTACT DATA UPDATED - REFETCHING ===');
        sessionStorage.removeItem('contact-data-updated');
        setRefreshKey(prev => prev + 1);
      }
    };
    checkForUpdates();
    const interval = setInterval(checkForUpdates, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) setRefreshKey(prev => prev + 1);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (isLoading || !contactData) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
      <ContactHeader />

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 pt-6 pb-8">
        <ContactGroupCard contacts={contactData.contacts} />
      </main>
    </div>
  );
}
