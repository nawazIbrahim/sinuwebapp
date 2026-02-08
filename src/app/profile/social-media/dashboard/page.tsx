'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialMediaApiService } from '@/services/socialMedia-api.service';
import { SocialMediaDashboardAdapter, SocialMediaDashboardData, SocialMediaDashboardField } from '@/adapters/socialMedia-dashboard.adapter';
import { SocialMediaDashboardHeader } from '@/components/social-media-dashboard/SocialMediaDashboardHeader';
import { SocialMediaFieldsSection } from '@/components/social-media-dashboard/SocialMediaFieldsSection';

interface SocialMediaDashboardState {
  fields: Record<string, { enabled: boolean; value: string }>;
  fieldsOrder: string[];
}

export default function SocialMediaDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<SocialMediaDashboardData | null>(null);
  const [originalApiResponse, setOriginalApiResponse] = useState<any>(null);
  const [state, setState] = useState<SocialMediaDashboardState>({
    fields: {},
    fieldsOrder: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      console.log('=== SOCIAL MEDIA DASHBOARD LOADING ===');

      // Fetch from SAME API as Social Media Screen
      const apiResponse = await SocialMediaApiService.getSocialMediaData();
      
      // Store original API response for updates
      setOriginalApiResponse(apiResponse);
      
      // Transform to dashboard format
      const dashboardData = SocialMediaDashboardAdapter.toDashboard(apiResponse);
      setData(dashboardData);

      // Initialize state
      const fieldsState: Record<string, { enabled: boolean; value: string }> = {};
      const fieldsOrder: string[] = [];

      dashboardData.fields.forEach((field) => {
        fieldsState[field.id] = {
          enabled: field.enabled,
          value: field.value,
        };
        fieldsOrder.push(field.id);
      });

      setState({
        fields: fieldsState,
        fieldsOrder: fieldsOrder,
      });

      console.log('Social media dashboard loaded:', { fieldsCount: dashboardData.fields.length });
    };
    loadData();
  }, []);

  // Handlers
  const handleFieldToggle = (id: string, enabled: boolean) => {
    console.log(`Toggle field ${id}:`, enabled);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          enabled,
        },
      },
    }));
  };

  const handleFieldValueChange = (id: string, value: string) => {
    console.log(`Update field ${id} value:`, value);
    setState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [id]: {
          ...prev.fields[id],
          value,
        },
      },
    }));
  };

  const handleFieldsReorder = (reorderedFields: SocialMediaDashboardField[]) => {
    const newOrder = reorderedFields.map((f) => f.id);
    console.log('Reorder fields:', newOrder);
    setState((prev) => ({
      ...prev,
      fieldsOrder: newOrder,
    }));
  };

  const handleSave = async () => {
    if (!data || !originalApiResponse) return;

    console.log('=== SAVING SOCIAL MEDIA CHANGES ===');
    console.log('Social media dashboard state:', state);

    // Convert dashboard state back to API format
    const apiUpdate = SocialMediaDashboardAdapter.toApiUpdate(data, state);
    console.log('API Update payload:', apiUpdate);

    // Save to API (updates mock data to persist changes)
    await SocialMediaApiService.updateSocialMediaData(apiUpdate);
    console.log('Social media data saved to API service');

    // Set flag to notify Social Media page to refresh
    sessionStorage.setItem('social-media-data-updated', 'true');
    console.log('Set social-media-data-updated flag in sessionStorage');

    alert('Social media settings saved successfully!');
  };

  const handleBack = () => {
    router.push('/profile/social-media');
  };

  // Loading state
  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#94a3b8]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Apply field state to data
  const fieldsWithState = state.fieldsOrder
    .map((id) => {
      const field = data.fields.find((f) => f.id === id);
      if (!field) return null;
      const fieldState = state.fields[id];
      return {
        ...field,
        enabled: fieldState?.enabled ?? field.enabled,
        value: fieldState?.value ?? field.value,
      };
    })
    .filter((f) => f !== null) as SocialMediaDashboardField[];

  return (
    <div className="h-screen flex flex-col bg-[#94a3b8]">
      {/* Sticky Header */}
      <SocialMediaDashboardHeader onSave={handleSave} onBack={handleBack} />

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 pt-6 pb-8">
          {/* Social Media Fields Section */}
          <SocialMediaFieldsSection
            fields={fieldsWithState}
            onToggle={handleFieldToggle}
            onValueChange={handleFieldValueChange}
            onReorder={handleFieldsReorder}
            getFieldDescription={SocialMediaDashboardAdapter.getFieldDescription}
          />
        </div>
      </main>
    </div>
  );
}
